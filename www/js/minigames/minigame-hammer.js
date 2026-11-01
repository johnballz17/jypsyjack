/**
 * Jack's Fixer Uper - Minigame: Tactile Framing Hammer & Nails
 */
(function() {
    if (typeof UIController === "undefined") return;

    UIController.prototype.startDiyHammerMinigame = function(taskId) {
        const g = window.Game;
        const task = g.getTask(taskId);
        if (!task) return;

        this.cancelMinigame();

        this.activeMinigame = {
            type: 'diy_hammer',
            taskId: taskId,
            task: task,
            activeNail: 0,
            nails: [
                { depth: 0, flush: false },
                { depth: 0, flush: false },
                { depth: 0, flush: false },
                { depth: 0, flush: false }
            ],
            totalStrikes: 0,
            swingPower: 15,
            swingDir: 1,
            animFrameId: null,
            lastTime: performance.now(),
            isLocked: false
        };

        const modal = document.getElementById('minigame-modal-overlay');
        const title = document.getElementById('minigame-title');
        if (!modal) return;
        if (title) title.innerHTML = `🔨 Drive Framing Nails &bull; ${task.name}`;

        this.renderDiyHammerScreen();
        modal.style.display = 'flex';
        if (window.Sound) window.Sound.playClick();

        this.bindMinigameKeyboard();
        this.startDiyHammerLoop();
    }

    UIController.prototype.renderDiyHammerScreen = function() {
        const mg = this.activeMinigame;
        if (!mg || mg.type !== 'diy_hammer') return;
        const task = mg.task;
        const body = document.getElementById('minigame-modal-body');
        if (!body) return;

        const currentNailIdx = mg.activeNail;

        body.innerHTML = `
            <div class="minigame-wrapper">
                <div class="minigame-task-banner">
                    <div class="banner-title-col">
                        <span class="banner-room-tag">${GAME_DATA.ROOMS[task.room]?.icon || '🏠'} ${GAME_DATA.ROOMS[task.room]?.name || task.room}</span>
                        <h3>${task.name}</h3>
                        <p class="banner-desc">${task.desc}</p>
                    </div>
                    <div class="banner-costs-col">
                        <div class="cost-badge"><span>Materials:</span> <strong>$${task.matCost.toLocaleString()}</strong></div>
                        <div class="cost-badge"><span>Stamina:</span> <strong>${task.apCost} ⚡</strong></div>
                        <div class="cost-badge arv"><span>Base ARV:</span> <strong>+$${task.value.toLocaleString()}</strong></div>
                    </div>
                </div>

                <div class="stage-instructions-banner">
                    <strong>Tactile Framing Hammer:</strong> Strike when hammer power is high in the green/gold zone to sink nails flush into the vintage white pine beam!
                    <br><small style="color:var(--text-dim);">Driving all 4 framing spikes with solid strikes earns Masterpiece rating!</small>
                </div>

                <!-- Swing Power Meter -->
                <div class="hammer-power-container">
                    <div class="hammer-power-header">
                        <span>STRIKE SWING POWER:</span>
                        <strong id="hammer-power-label">${Math.round(mg.swingPower)}%</strong>
                    </div>
                    <div class="hammer-power-track">
                        <div class="power-zone low">TAP</div>
                        <div class="power-zone mid">SOLID</div>
                        <div class="power-zone max">💥 MAX POWER</div>
                        <div class="hammer-power-needle" id="hammer-power-needle" style="left:${mg.swingPower}%;"></div>
                    </div>
                </div>

                <!-- Timber Beam with 4 Nails -->
                <div class="timber-beam-area" onclick="UI.strikeDiyHammer()">
                    <div class="timber-beam-wood">
                        ${mg.nails.map((n, idx) => {
                            const isCurrent = idx === currentNailIdx;
                            const exposedHeight = Math.max(0, 100 - n.depth);
                            return `
                                <div class="nail-column ${isCurrent ? 'active' : ''} ${n.flush ? 'flush' : ''}">
                                    ${isCurrent ? '<div class="hammer-hover-icon">🔨</div>' : ''}
                                    <div class="nail-shank-wrapper">
                                        <div class="nail-head" style="bottom:${exposedHeight}%;"></div>
                                        <div class="nail-shank" style="height:${exposedHeight}%;"></div>
                                    </div>
                                    <div class="nail-base-hole"></div>
                                    <span class="nail-tag">
                                        ${n.flush ? '✓ FLUSH' : `Nail ${idx + 1} (${n.depth}%)`}
                                    </span>
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>

                <!-- Hit Feedback -->
                <div class="diy-feedback-box" id="hammer-feedback-msg">
                    <span class="hint-text">Nail ${currentNailIdx + 1} of 4 &bull; Total Strikes: ${mg.totalStrikes}</span>
                </div>

                <!-- Strike Button -->
                <div class="diy-controls-row">
                    <button id="btn-diy-hammer-strike" class="btn-diy-strike" onclick="UI.strikeDiyHammer()">
                        🔨 SWING HAMMER &amp; DRIVE NAIL [SPACEBAR]
                    </button>
                    <button class="btn-skip-minigame" onclick="UI.autoFinishMinigame('${task.id}', true)">
                        ⚡ Auto-Finish (Standard 50% Rate)
                    </button>
                </div>
            </div>
        `;
    }

    UIController.prototype.startDiyHammerLoop = function() {
        const loop = (currentTime) => {
            if (!this.activeMinigame || this.activeMinigame.type !== 'diy_hammer') return;
            const mg = this.activeMinigame;

            if (!mg.isLocked) {
                const dt = Math.min(0.05, (currentTime - mg.lastTime) / 1000);
                mg.lastTime = currentTime;

                // Power oscillates from 0 to 100
                mg.swingPower += mg.swingDir * 80 * dt;
                if (mg.swingPower >= 100) {
                    mg.swingPower = 100;
                    mg.swingDir = -1;
                } else if (mg.swingPower <= 0) {
                    mg.swingPower = 0;
                    mg.swingDir = 1;
                }

                const needleEl = document.getElementById('hammer-power-needle');
                const labelEl = document.getElementById('hammer-power-label');
                if (needleEl) needleEl.style.left = `${mg.swingPower}%`;
                if (labelEl) labelEl.textContent = `${Math.round(mg.swingPower)}%`;
            } else {
                mg.lastTime = currentTime;
            }

            mg.animFrameId = requestAnimationFrame(loop);
        };

        if (this.activeMinigame) {
            this.activeMinigame.lastTime = performance.now();
            this.activeMinigame.animFrameId = requestAnimationFrame(loop);
        }
    }

    UIController.prototype.strikeDiyHammer = function() {
        const mg = this.activeMinigame;
        if (!mg || mg.type !== 'diy_hammer' || mg.isLocked) return;

        mg.totalStrikes++;
        const currentNail = mg.nails[mg.activeNail];
        const p = mg.swingPower;

        let depthGain = 12;
        let label = "⚠️ Weak Tap";
        let badgeClass = "badge-rough";

        if (p >= 72) {
            depthGain = 38;
            label = "💥 SOLID CRUNCH! -38% DEPTH!";
            badgeClass = "badge-bullseye";
            if (window.Sound) {
                window.Sound.playHammer();
                window.Sound.playCash();
            }
        } else if (p >= 36) {
            depthGain = 24;
            label = "🔨 GOOD STRIKE! -24% DEPTH";
            badgeClass = "badge-high";
            if (window.Sound) window.Sound.playHammer();
        } else {
            depthGain = 12;
            label = "⚠️ LIGHT TAP -12% DEPTH";
            badgeClass = "badge-standard";
            if (window.Sound) window.Sound.playClick();
        }

        currentNail.depth = Math.min(100, currentNail.depth + depthGain);

        const feedbackEl = document.getElementById('hammer-feedback-msg');
        if (feedbackEl) {
            feedbackEl.className = `diy-feedback-box ${badgeClass}`;
            feedbackEl.innerHTML = `<strong>${label}</strong> &bull; Total Strikes: ${mg.totalStrikes}`;
        }

        if (currentNail.depth >= 100) {
            currentNail.flush = true;
            if (window.Sound) window.Sound.playBullseye();

            if (mg.activeNail < 3) {
                mg.activeNail++;
            } else {
                // All 4 nails driven flush!
                mg.isLocked = true;
                setTimeout(() => {
                    let score = 25;
                    let perfLabel = "Rough Framing";
                    if (mg.totalStrikes <= 11) {
                        score = 100;
                        perfLabel = "🌟 Masterpiece Framing!";
                    } else if (mg.totalStrikes <= 14) {
                        score = 80;
                        perfLabel = "🟢 Professional Timber Framing";
                    } else if (mg.totalStrikes <= 18) {
                        score = 55;
                        perfLabel = "🟡 Standard Workmanship";
                    }

                    this.renderMinigameResults('diy', mg.taskId, [{ score: score, label: perfLabel }]);
                }, 400);
                return;
            }
        }

        this.renderDiyHammerScreen();
    }

    // ------------------------------------------
    // DIY MINIGAME 5: COLLECT ALL THE NAILS (MAGNETIC SWEEP)
    // ------------------------------------------

})();
