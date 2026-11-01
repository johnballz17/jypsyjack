/**
 * ============================================================================
 * REWORKED DUAL LIVE MICROPHONE INDICATOR SYSTEM (ZERO JITTER / ROCK SOLID)
 * Displays two cleanly separated glowing indicator capsules:
 * - Green Capsule: Jack (Host)
 * - Purple Capsule: Johnny (Friend / Collaborator)
 *
 * ANTI-SHAKE & VIBRATION FIXES:
 * 1. Fixed, rigid layout dimensions: elements have exact locked widths with
 *    CSS contain: layout size. Text changes or speaking toggles can NEVER resize,
 *    push, pull, or vibrate either capsule.
 * 2. Generous separation (gap: 16px) with an elegant vertical studio divider.
 * 3. GPU-accelerated VU bars: uses transform: scaleY() with will-change: transform.
 *    Does NOT modify element heights or trigger DOM reflows.
 * 4. Asymmetric Attack/Decay audio smoothing + Schmitt trigger hysteresis
 *    (16% on / 7% off with 350ms hold) eliminates rapid on/off flickering.
 * ============================================================================
 */

(function () {
    'use strict';

    class DualLiveMicOverlay {
        constructor() {
            this.audioCtx = null;
            this.analyser = null;
            this.micStream = null;
            this.sourceNode = null;
            this.animFrameId = null;
            this.isActive = false;

            // Audio Smoothing & Hysteresis
            this.smoothedVolume = 0;
            this.speechThresholdOn = 16;   // Activate speaking when volume >= 16%
            this.speechThresholdOff = 7;   // Only deactivate when volume drops < 7%
            this.speechHoldTimer = 0;      // Hold speaking status for 350ms to bridge word pauses
            this.isSpeaking = false;
            this._lastReportedSpeaking = null;
            this._lastBroadcastTime = 0;

            // Identity
            const urlParams = new URLSearchParams(window.location.search);
            const userParam = urlParams.get('user') || urlParams.get('role');
            let storedRole = localStorage.getItem('my_mic_role');
            if (userParam) {
                storedRole = (userParam === 'friend' || userParam === '2' || userParam === 'purple') ? 'user_2' : 'user_1';
                localStorage.setItem('my_mic_role', storedRole);
            }
            this.myUserId = storedRole || 'user_1'; // user_1 = Green (Jack), user_2 = Purple (Johnny)

            this.syncTimer = null;
            this.isSyncing = false;

            this.init();
        }

        init() {
            if (typeof document === 'undefined') return;
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', () => this.buildOverlay());
            } else {
                this.buildOverlay();
            }
        }

        buildOverlay() {
            if (document.getElementById('live-mic-discord-dock')) return;

            // Styles for Discord-style dual voice dock
            const style = document.createElement('style');
            style.id = 'dual-mic-discord-style';
            style.textContent = `
                /* DUAL DISCORD VOICE OVERLAY - SPACED, ROCK SOLID & ANTI-VIBRATION */
                #live-mic-discord-dock {
                    display: inline-flex;
                    align-items: center;
                    gap: 16px;
                    user-select: none;
                    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
                    margin: 0 4px;
                    contain: layout;
                }

                .voice-dock-divider {
                    width: 1px;
                    height: 24px;
                    background: rgba(255, 255, 255, 0.16);
                    flex-shrink: 0;
                }

                /* RIGID, LOCKED CAPSULE DIMENSIONS - ZERO REFLOW / ZERO SHAKE */
                .discord-voice-capsule {
                    width: 142px;
                    min-width: 142px;
                    max-width: 142px;
                    height: 36px;
                    min-height: 36px;
                    box-sizing: border-box;
                    flex-shrink: 0;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    background: rgba(15, 23, 42, 0.94);
                    backdrop-filter: blur(10px);
                    -webkit-backdrop-filter: blur(10px);
                    border: 1.5px solid rgba(255, 255, 255, 0.13);
                    border-radius: 18px;
                    padding: 0 8px 0 6px;
                    color: #f8fafc;
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
                    cursor: pointer;
                    contain: layout size;
                    transition: border-color 0.18s ease, background-color 0.18s ease, box-shadow 0.18s ease;
                }

                .discord-voice-capsule:hover {
                    background-color: rgba(30, 41, 59, 0.98);
                }

                /* COLOR THEME 1: GREEN (Host / Jack) */
                .discord-voice-capsule.theme-green {
                    border-color: rgba(34, 197, 94, 0.35);
                }
                .discord-voice-capsule.theme-green.live-on {
                    border-color: rgba(34, 197, 94, 0.65);
                    background-color: rgba(14, 34, 24, 0.95);
                }
                .discord-voice-capsule.theme-green.speaking {
                    border-color: #22c55e !important;
                    background-color: rgba(20, 83, 45, 0.95) !important;
                    box-shadow: 0 0 14px rgba(34, 197, 94, 0.75), 0 2px 8px rgba(0, 0, 0, 0.6);
                }
                .discord-voice-capsule.theme-green.speaking .capsule-ring {
                    border-color: #22c55e !important;
                    box-shadow: 0 0 8px rgba(34, 197, 94, 0.85);
                    background: rgba(34, 197, 94, 0.25);
                }

                /* COLOR THEME 2: PURPLE (Friend / Johnny) */
                .discord-voice-capsule.theme-purple {
                    border-color: rgba(168, 85, 247, 0.35);
                }
                .discord-voice-capsule.theme-purple.live-on {
                    border-color: rgba(168, 85, 247, 0.65);
                    background-color: rgba(32, 16, 48, 0.95);
                }
                .discord-voice-capsule.theme-purple.speaking {
                    border-color: #a855f7 !important;
                    background-color: rgba(88, 28, 135, 0.95) !important;
                    box-shadow: 0 0 14px rgba(168, 85, 247, 0.75), 0 2px 8px rgba(0, 0, 0, 0.6);
                }
                .discord-voice-capsule.theme-purple.speaking .capsule-ring {
                    border-color: #c084fc !important;
                    box-shadow: 0 0 8px rgba(168, 85, 247, 0.85);
                    background: rgba(168, 85, 247, 0.25);
                }

                /* AVATAR RING & STATUS DOT */
                .capsule-ring {
                    width: 24px;
                    min-width: 24px;
                    height: 24px;
                    border-radius: 50%;
                    background: #1e293b;
                    border: 1.5px solid #475569;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    position: relative;
                    font-size: 0.72rem;
                    flex-shrink: 0;
                    transition: border-color 0.18s ease, background 0.18s ease, box-shadow 0.18s ease;
                }

                .capsule-dot {
                    position: absolute;
                    bottom: -1px;
                    right: -1px;
                    width: 7px;
                    height: 7px;
                    border-radius: 50%;
                    border: 1px solid #0f172a;
                    background-color: #64748b;
                }

                .is-muted .capsule-dot {
                    background-color: #ef4444 !important;
                    box-shadow: 0 0 4px #ef4444 !important;
                }
                .theme-green.live-on .capsule-dot {
                    background-color: #22c55e;
                    box-shadow: 0 0 6px #22c55e;
                }
                .theme-green.speaking .capsule-dot {
                    background-color: #4ade80;
                    box-shadow: 0 0 10px #4ade80;
                }

                .theme-purple.live-on .capsule-dot {
                    background-color: #a855f7;
                    box-shadow: 0 0 6px #a855f7;
                }
                .theme-purple.speaking .capsule-dot {
                    background-color: #c084fc;
                    box-shadow: 0 0 10px #c084fc;
                }

                /* TEXT LABELS (LOCKED 66PX WIDTH - PREVENTS ANY SHIFTING) */
                .capsule-text {
                    display: flex;
                    flex-direction: column;
                    width: 66px;
                    min-width: 66px;
                    max-width: 66px;
                    overflow: hidden;
                    text-align: left;
                    margin-left: 6px;
                    margin-right: auto;
                    flex-shrink: 0;
                }

                .capsule-title {
                    font-size: 0.74rem;
                    font-weight: 800;
                    letter-spacing: 0.4px;
                    color: #f1f5f9;
                    line-height: 1.1;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }

                .theme-green.speaking .capsule-title { color: #86efac; }
                .theme-purple.speaking .capsule-title { color: #d8b4fe; }

                .capsule-sub {
                    font-size: 0.58rem;
                    font-weight: 600;
                    color: #94a3b8;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    line-height: 1.1;
                    margin-top: 1px;
                    text-transform: uppercase;
                    letter-spacing: 0.3px;
                }

                .theme-green.live-on .capsule-sub { color: #86efac; }
                .theme-green.speaking .capsule-sub { color: #4ade80; font-weight: 700; }
                .theme-purple.live-on .capsule-sub { color: #d8b4fe; }
                .theme-purple.speaking .capsule-sub { color: #c084fc; font-weight: 700; }

                /* VU EQUALIZER METERS (GPU ACCELERATED SCALING - ZERO REFLOW) */
                .capsule-vu-meter {
                    display: flex;
                    align-items: flex-end;
                    justify-content: flex-end;
                    gap: 2px;
                    width: 16px;
                    min-width: 16px;
                    height: 14px;
                    flex-shrink: 0;
                }

                .capsule-vu-bar {
                    width: 3px;
                    height: 14px;
                    background: #334155;
                    border-radius: 1.5px;
                    transform-origin: bottom;
                    transform: scaleY(0.18);
                    transition: transform 0.08s ease-out, background-color 0.15s ease;
                    will-change: transform;
                }

                .theme-green.speaking .capsule-vu-bar {
                    background: #22c55e;
                    box-shadow: 0 0 3px #22c55e;
                }

                .theme-purple.speaking .capsule-vu-bar {
                    background: #a855f7;
                    box-shadow: 0 0 3px #a855f7;
                }

                /* ROLE SWITCH PILL */
                .btn-switch-voice-role {
                    background: rgba(255, 255, 255, 0.08);
                    border: 1px solid rgba(255, 255, 255, 0.15);
                    color: #cbd5e1;
                    font-size: 0.64rem;
                    font-weight: 600;
                    cursor: pointer;
                    padding: 4px 8px;
                    border-radius: 14px;
                    display: inline-flex;
                    align-items: center;
                    gap: 5px;
                    white-space: nowrap;
                    flex-shrink: 0;
                    transition: all 0.15s ease;
                }
                .btn-switch-voice-role:hover {
                    color: #38bdf8;
                    border-color: #38bdf8;
                    background: rgba(56, 189, 248, 0.15);
                }
            `;
            document.head.appendChild(style);

            // Container Dock
            const dock = document.createElement('div');
            dock.id = 'live-mic-discord-dock';
            dock.innerHTML = `
                <!-- 1. GREEN INDICATOR (User 1 / Jack / Host) -->
                <div class="discord-voice-capsule theme-green is-muted" id="capsule-user-1" title="Click to Connect / Mute Green Microphone (Jack)">
                    <div class="capsule-ring">
                        <span id="capsule-icon-1">🎙️</span>
                        <span class="capsule-dot"></span>
                    </div>
                    <div class="capsule-text">
                        <span class="capsule-title">
                            <span id="capsule-name-1">JACK</span>
                        </span>
                        <span class="capsule-sub" id="capsule-sub-1">Mic Off</span>
                    </div>
                    <div class="capsule-vu-meter">
                        <div class="capsule-vu-bar" id="vu-1-a"></div>
                        <div class="capsule-vu-bar" id="vu-1-b"></div>
                        <div class="capsule-vu-bar" id="vu-1-c"></div>
                    </div>
                </div>

                <!-- SEPARATION DIVIDER -->
                <div class="voice-dock-divider"></div>

                <!-- 2. PURPLE INDICATOR (User 2 / Johnny / Friend) -->
                <div class="discord-voice-capsule theme-purple is-muted" id="capsule-user-2" title="Click to Connect / Mute Purple Microphone (Johnny)">
                    <div class="capsule-ring">
                        <span id="capsule-icon-2">🎙️</span>
                        <span class="capsule-dot"></span>
                    </div>
                    <div class="capsule-text">
                        <span class="capsule-title">
                            <span id="capsule-name-2">JOHNNY</span>
                        </span>
                        <span class="capsule-sub" id="capsule-sub-2">Mic Off</span>
                    </div>
                    <div class="capsule-vu-meter">
                        <div class="capsule-vu-bar" id="vu-2-a"></div>
                        <div class="capsule-vu-bar" id="vu-2-b"></div>
                        <div class="capsule-vu-bar" id="vu-2-c"></div>
                    </div>
                </div>

                <!-- ROLE TOGGLE -->
                <button type="button" class="btn-switch-voice-role" id="btn-switch-role" title="Switch which microphone your computer controls">
                    ⇄ Controlling: <span id="current-role-badge" style="color:${this.myUserId === 'user_1' ? '#4ade80' : '#c084fc'}; font-weight:700;">${this.myUserId === 'user_1' ? 'JACK' : 'JOHNNY'}</span>
                </button>
            `;

            // Mount directly into anchor in Real-Life Project Builder toolbar
            const anchor = document.getElementById('live-mic-mount-anchor');
            if (anchor) {
                anchor.appendChild(dock);
            } else {
                const brand = document.querySelector('.toolbar-brand-badge') || document.querySelector('.real-life-toolbar') || document.body;
                brand.appendChild(dock);
            }

            // Bind click events
            document.getElementById('capsule-user-1').addEventListener('click', () => {
                if (this.myUserId === 'user_1') {
                    this.toggleMyMic();
                } else {
                    this.switchRole('user_1');
                    this.startMyMic();
                }
            });

            document.getElementById('capsule-user-2').addEventListener('click', () => {
                if (this.myUserId === 'user_2') {
                    this.toggleMyMic();
                } else {
                    this.switchRole('user_2');
                    this.startMyMic();
                }
            });

            document.getElementById('btn-switch-role').addEventListener('click', (e) => {
                e.stopPropagation();
                this.switchRole(this.myUserId === 'user_1' ? 'user_2' : 'user_1');
            });

            // Start telemetry poll
            this.startTelemetrySync();

            // Auto-reconnect if previously active
            if (localStorage.getItem('discord_mic_active') === 'true') {
                this.startMyMic(true);
            }
        }

        switchRole(newRole) {
            this.myUserId = newRole;
            localStorage.setItem('my_mic_role', newRole);
            const badge = document.getElementById('current-role-badge');
            if (badge) {
                badge.style.color = this.myUserId === 'user_1' ? '#4ade80' : '#c084fc';
                badge.textContent = this.myUserId === 'user_1' ? 'JACK' : 'JOHNNY';
            }
            this.broadcastMyState();
        }

        async toggleMyMic() {
            if (!this.isActive) {
                await this.startMyMic();
            } else {
                this.stopMyMic();
            }
        }

        async startMyMic(silent = false) {
            try {
                if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
                    if (!silent) alert('Microphone access is not supported on this browser.');
                    return;
                }

                const stream = await navigator.mediaDevices.getUserMedia({
                    audio: {
                        echoCancellation: true,
                        noiseSuppression: true,
                        autoGainControl: true
                    }
                });

                this.micStream = stream;
                this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
                this.analyser = this.audioCtx.createAnalyser();
                this.analyser.fftSize = 64;
                this.analyser.smoothingTimeConstant = 0.8; // High smoothing prevents rapid micro-spikes

                this.sourceNode = this.audioCtx.createMediaStreamSource(stream);
                this.sourceNode.connect(this.analyser);

                this.isActive = true;
                localStorage.setItem('discord_mic_active', 'true');

                this.renderCapsuleDOM(this.myUserId, true, false, 0);
                this.startVisualizer();
                this.broadcastMyState();
            } catch (err) {
                console.warn('Microphone permission rejected:', err);
                if (!silent) alert('Please click Allow to enable your live microphone indicator.');
            }
        }

        stopMyMic() {
            if (this.micStream) {
                this.micStream.getTracks().forEach(track => track.stop());
                this.micStream = null;
            }
            if (this.audioCtx) {
                this.audioCtx.close().catch(() => {});
                this.audioCtx = null;
            }
            if (this.animFrameId) {
                cancelAnimationFrame(this.animFrameId);
                this.animFrameId = null;
            }

            this.isActive = false;
            this.isSpeaking = false;
            this.smoothedVolume = 0;
            localStorage.setItem('discord_mic_active', 'false');

            this.renderCapsuleDOM(this.myUserId, false, false, 0);
            this.broadcastMyState();
        }

        /**
         * Rock-solid, zero-reflow capsule DOM renderer
         */
        renderCapsuleDOM(userId, isLive, isSpeaking, volume) {
            const num = userId === 'user_1' ? '1' : '2';
            const capsule = document.getElementById(`capsule-user-${num}`);
            if (!capsule) return;

            // Update classes
            capsule.classList.toggle('live-on', isLive);
            capsule.classList.toggle('is-muted', !isLive);
            capsule.classList.toggle('speaking', isSpeaking);

            // Icon and status label
            const icon = document.getElementById(`capsule-icon-${num}`);
            const sub = document.getElementById(`capsule-sub-${num}`);
            if (icon) icon.textContent = isLive ? '🎙️' : '🔇';
            if (sub) {
                sub.textContent = isSpeaking ? 'Speaking' : (isLive ? 'Mic On' : 'Mic Off');
            }

            // GPU scale for VU bars
            const bars = [
                document.getElementById(`vu-${num}-a`),
                document.getElementById(`vu-${num}-b`),
                document.getElementById(`vu-${num}-c`)
            ];
            bars.forEach((b, i) => {
                if (!b) return;
                if (isSpeaking) {
                    const norm = Math.min(1.0, Math.max(0.18, (volume / 100) * (0.8 + i * 0.2)));
                    b.style.transform = `scaleY(${norm.toFixed(2)})`;
                } else {
                    b.style.transform = 'scaleY(0.18)';
                }
            });
        }

        startVisualizer() {
            const dataArray = new Uint8Array(this.analyser.frequencyBinCount);
            let lastFrameTime = performance.now();

            const loop = (currentTime) => {
                if (!this.isActive || !this.analyser) return;

                const dt = (currentTime - lastFrameTime) / 1000;
                lastFrameTime = currentTime;

                this.analyser.getByteFrequencyData(dataArray);

                let sum = 0;
                for (let i = 0; i < dataArray.length; i++) sum += dataArray[i];
                let rawVolume = Math.min(100, Math.round((sum / dataArray.length / 128) * 100));

                // Noise Gate: ignore room floor noise below 4%
                if (rawVolume < 4) rawVolume = 0;

                // Asymmetric Attack/Decay audio filter (fast attack 0.45, smooth gentle decay 0.85)
                if (rawVolume > this.smoothedVolume) {
                    this.smoothedVolume = (this.smoothedVolume * 0.45) + (rawVolume * 0.55);
                } else {
                    this.smoothedVolume = (this.smoothedVolume * 0.85) + (rawVolume * 0.15);
                }

                // Strict Schmitt Trigger (Speech Hysteresis)
                const prevSpeaking = this.isSpeaking;
                if (this.smoothedVolume >= this.speechThresholdOn) {
                    this.isSpeaking = true;
                    this.speechHoldTimer = 0.35; // Hold speaking for 350ms to bridge word pauses
                } else if (this.speechHoldTimer > 0) {
                    this.speechHoldTimer -= dt;
                    this.isSpeaking = true;
                } else if (this.smoothedVolume < this.speechThresholdOff) {
                    this.isSpeaking = false;
                }

                this.renderCapsuleDOM(this.myUserId, true, this.isSpeaking, Math.round(this.smoothedVolume));

                // If speaking state toggled, broadcast quickly to friend
                if (this.isSpeaking !== prevSpeaking) {
                    const now = performance.now();
                    if (now - this._lastBroadcastTime > 300) {
                        this._lastBroadcastTime = now;
                        this.broadcastMyState();
                    }
                }

                this.animFrameId = requestAnimationFrame(loop);
            };

            this.animFrameId = requestAnimationFrame(loop);
        }

        async broadcastMyState() {
            if (this.isSyncing) return;
            this.isSyncing = true;
            try {
                const payload = {
                    userId: this.myUserId,
                    userName: this.myUserId === 'user_1' ? 'Jack' : 'Johnny',
                    color: this.myUserId === 'user_1' ? 'green' : 'purple',
                    isMicOn: this.isActive,
                    isSpeaking: this.isSpeaking,
                    volume: Math.round(this.smoothedVolume)
                };

                const res = await fetch('/api/voice-status', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });
                if (res.ok) {
                    const data = await res.json();
                    if (Array.isArray(data.voiceUsers)) {
                        data.voiceUsers.forEach(u => {
                            if (u.userId !== this.myUserId) {
                                this.renderCapsuleDOM(u.userId, !!u.isMicOn, !!u.isSpeaking, u.volume || 0);
                            }
                        });
                    }
                }
            } catch(e) {
                // Silently handle transient network drop
            } finally {
                this.isSyncing = false;
            }
        }

        startTelemetrySync() {
            if (this.syncTimer) clearInterval(this.syncTimer);
            this.syncTimer = setInterval(async () => {
                await this.broadcastMyState();
            }, 1800); // 1.8s steady network cadence
        }
    }

    // Attach to window
    window.DualLiveMicOverlay = new DualLiveMicOverlay();
})();
