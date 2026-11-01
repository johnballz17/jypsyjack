// Jumper's Fixer Upper - Web Audio API Procedural Sound Effects Engine
// 100% self-contained, no external MP3/WAV files required.

class SoundEngine {
    constructor() {
        this.ctx = null;
        this.isMuted = false;
        this.volume = 0.5;
    }

    init() {
        if (!this.ctx) {
            const AudioCtx = window.AudioContext || window.webkitAudioContext;
            if (AudioCtx) {
                this.ctx = new AudioCtx();
            }
        }
        if (this.ctx && this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }

    toggleMute() {
        this.isMuted = !this.isMuted;
        return this.isMuted;
    }

    setVolume(val) {
        this.volume = Math.max(0, Math.min(1, val));
    }

    // Nail Hammer sound: impact click + wood body resonance
    playHammer() {
        if (this.isMuted) return;
        this.init();
        if (!this.ctx) return;

        const now = this.ctx.currentTime;
        // White noise transient
        const bufferSize = this.ctx.sampleRate * 0.05;
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (this.ctx.sampleRate * 0.01));
        }

        const noise = this.ctx.createBufferSource();
        noise.buffer = buffer;

        // Wood resonance oscillator
        const osc = this.ctx.createOscillator();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(320, now);
        osc.frequency.exponentialRampToValueAtTime(140, now + 0.08);

        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(0.4 * this.volume, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

        noise.connect(gain);
        osc.connect(gain);
        gain.connect(this.ctx.destination);

        noise.start(now);
        osc.start(now);
        osc.stop(now + 0.1);
    }

    // Electric Saw sound: modulated buzz
    playSaw() {
        if (this.isMuted) return;
        this.init();
        if (!this.ctx) return;

        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(160, now);
        osc.frequency.linearRampToValueAtTime(220, now + 0.15);
        osc.frequency.linearRampToValueAtTime(180, now + 0.3);

        const filter = this.ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(1200, now);

        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(0.25 * this.volume, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.32);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.35);
    }

    // Cash Register / Coin ding: dual sine chime
    playCashRegister() {
        if (this.isMuted) return;
        this.init();
        if (!this.ctx) return;

        const now = this.ctx.currentTime;
        const freqs = [987.77, 1318.51, 1760.00]; // B5, E6, A6

        freqs.forEach((freq, i) => {
            const osc = this.ctx.createOscillator();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, now + i * 0.04);

            const gain = this.ctx.createGain();
            gain.gain.setValueAtTime(0.3 * this.volume, now + i * 0.04);
            gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.04 + 0.4);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start(now + i * 0.04);
            osc.stop(now + i * 0.04 + 0.45);
        });
    }

    playCash() {
        this.playCashRegister();
    }

    // UI Click
    playClick() {
        if (this.isMuted) return;
        this.init();
        if (!this.ctx) return;

        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(600, now);
        osc.frequency.exponentialRampToValueAtTime(200, now + 0.03);

        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(0.15 * this.volume, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.04);
    }

    // Advance Day chime
    playAdvanceDay() {
        if (this.isMuted) return;
        this.init();
        if (!this.ctx) return;

        const now = this.ctx.currentTime;
        const notes = [261.63, 329.63, 392.00, 523.25]; // C4, E4, G4, C5
        notes.forEach((freq, idx) => {
            const osc = this.ctx.createOscillator();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(freq, now + idx * 0.06);

            const gain = this.ctx.createGain();
            gain.gain.setValueAtTime(0.2 * this.volume, now + idx * 0.06);
            gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.06 + 0.35);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start(now + idx * 0.06);
            osc.stop(now + idx * 0.06 + 0.4);
        });
    }

    // Error / Buzzer
    playError() {
        if (this.isMuted) return;
        this.init();
        if (!this.ctx) return;

        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(140, now);
        osc.frequency.setValueAtTime(110, now + 0.1);

        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(0.25 * this.volume, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.25);
    }

    // Success / Flip Celebration Fanfare
    playSuccess() {
        if (this.isMuted) return;
        this.init();
        if (!this.ctx) return;

        const now = this.ctx.currentTime;
        const chord = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
        chord.forEach((freq, idx) => {
            const osc = this.ctx.createOscillator();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, now + idx * 0.08);

            const gain = this.ctx.createGain();
            gain.gain.setValueAtTime(0.25 * this.volume, now + idx * 0.08);
            gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.08 + 0.8);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start(now + idx * 0.08);
            osc.stop(now + idx * 0.08 + 0.85);
        });
    }

    // Cat Meow: Frequency modulated pitch glide (m-e-o-w)
    playCatMeow() {
        if (this.isMuted) return;
        this.init();
        if (!this.ctx) return;

        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(450, now);
        osc.frequency.exponentialRampToValueAtTime(750, now + 0.12);
        osc.frequency.exponentialRampToValueAtTime(520, now + 0.35);

        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(0.01, now);
        gain.gain.linearRampToValueAtTime(0.3 * this.volume, now + 0.06);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.38);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.4);
    }

    // Cat Purr: Low frequency rhythmic rumble
    playCatPurr() {
        if (this.isMuted) return;
        this.init();
        if (!this.ctx) return;

        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(45, now);

        // Amplitude modulation for purring flutter
        const lfo = this.ctx.createOscillator();
        lfo.type = 'sine';
        lfo.frequency.setValueAtTime(25, now);

        const lfoGain = this.ctx.createGain();
        lfoGain.gain.setValueAtTime(0.5, now);

        const mainGain = this.ctx.createGain();
        mainGain.gain.setValueAtTime(0.25 * this.volume, now);
        mainGain.gain.linearRampToValueAtTime(0.001, now + 0.5);

        lfo.connect(lfoGain.gain);
        osc.connect(mainGain);
        mainGain.connect(this.ctx.destination);

        osc.start(now);
        lfo.start(now);
        osc.stop(now + 0.5);
        lfo.stop(now + 0.5);
    }

    // Junkyard / Scrap Metal Rummage: series of short metallic impacts
    playScrapClatter() {
        if (this.isMuted) return;
        this.init();
        if (!this.ctx) return;

        const now = this.ctx.currentTime;
        const freqs = [320, 680, 440, 890, 520, 1100];
        freqs.forEach((freq, idx) => {
            const osc = this.ctx.createOscillator();
            osc.type = 'square';
            osc.frequency.setValueAtTime(freq, now + idx * 0.04);

            const gain = this.ctx.createGain();
            gain.gain.setValueAtTime(0.12 * this.volume, now + idx * 0.04);
            gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.04 + 0.1);

            const filter = this.ctx.createBiquadFilter();
            filter.type = 'bandpass';
            filter.frequency.setValueAtTime(freq, now + idx * 0.04);

            osc.connect(filter);
            filter.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start(now + idx * 0.04);
            osc.stop(now + idx * 0.04 + 0.12);
        });
    }

    // Grumpy Neighbor Grumble
    playNeighborGrumble() {
        if (this.isMuted) return;
        this.init();
        if (!this.ctx) return;

        const now = this.ctx.currentTime;
        const notes = [120, 95, 110, 80];
        notes.forEach((freq, idx) => {
            const osc = this.ctx.createOscillator();
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(freq, now + idx * 0.08);

            const gain = this.ctx.createGain();
            gain.gain.setValueAtTime(0.2 * this.volume, now + idx * 0.08);
            gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.12);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start(now + idx * 0.08);
            osc.stop(now + idx * 0.08 + 0.14);
        });
    }

    // Bullseye Golden Chime
    playBullseye() {
        if (this.isMuted) return;
        this.init();
        if (!this.ctx) return;

        const now = this.ctx.currentTime;
        const notes = [587.33, 880, 1174.66, 1760]; // D5, A5, D6, A6 arpeggio
        notes.forEach((freq, idx) => {
            const osc = this.ctx.createOscillator();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, now + idx * 0.05);

            const gain = this.ctx.createGain();
            gain.gain.setValueAtTime(0.3 * this.volume, now + idx * 0.05);
            gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.05 + 0.35);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start(now + idx * 0.05);
            osc.stop(now + idx * 0.05 + 0.38);
        });
    }

    // Minigame Off-Target Wood Clank
    playMiss() {
        if (this.isMuted) return;
        this.init();
        if (!this.ctx) return;

        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(140, now);
        osc.frequency.exponentialRampToValueAtTime(70, now + 0.12);

        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(0.25 * this.volume, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.15);
    }

    // Minigame Scanner Beep
    playBeep(freq = 600) {
        if (this.isMuted) return;
        this.init();
        if (!this.ctx) return;
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);
        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(0.12 * this.volume, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.09);
    }

    // Minigame Stamp / Thud Sound
    playStamp() {
        if (this.isMuted) return;
        this.init();
        if (!this.ctx) return;
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        osc.type = 'square';
        osc.frequency.setValueAtTime(120, now);
        osc.frequency.exponentialRampToValueAtTime(40, now + 0.15);
        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(0.25 * this.volume, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.18);
    }

    // Metallic Nail Clink (for collecting nails / magnetic sweep)
    playClink() {
        if (this.isMuted) return;
        this.init();
        if (!this.ctx) return;
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        osc.type = 'sine';
        const pitch = 1800 + Math.random() * 600;
        osc.frequency.setValueAtTime(pitch, now);
        osc.frequency.exponentialRampToValueAtTime(pitch * 1.5, now + 0.05);
        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(0.2 * this.volume, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.09);
    }

    // Paint Roller Swoosh
    playSwoosh() {
        if (this.isMuted) return;
        this.init();
        if (!this.ctx) return;
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(280, now);
        osc.frequency.exponentialRampToValueAtTime(140, now + 0.14);
        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(0.18 * this.volume, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.16);
    }

    // Heavy Timber Thud / Dumpster Dump
    playThud() {
        if (this.isMuted) return;
        this.init();
        if (!this.ctx) return;
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(90, now);
        osc.frequency.exponentialRampToValueAtTime(30, now + 0.22);
        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(0.35 * this.volume, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.24);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.25);
    }

    // 20-Ton Hydraulic Bottle Jack Groan & Pressurized Fluid Lift
    playHydraulic() {
        if (this.isMuted) return;
        this.init();
        if (!this.ctx) return;
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(65, now);
        osc.frequency.linearRampToValueAtTime(85, now + 0.18);
        osc.frequency.exponentialRampToValueAtTime(45, now + 0.35);

        const filter = this.ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(320, now);

        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(0.35 * this.volume, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.38);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.4);
    }

    // High-Pressure Sandblaster & Pneumatic Garnet Blast
    playBlast() {
        if (this.isMuted) return;
        this.init();
        if (!this.ctx) return;
        const now = this.ctx.currentTime;
        const bufferSize = Math.floor(this.ctx.sampleRate * 0.12);
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (this.ctx.sampleRate * 0.08));
        }
        const noise = this.ctx.createBufferSource();
        noise.buffer = buffer;

        const filter = this.ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(2200, now);
        filter.Q.setValueAtTime(1.2, now);

        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(0.3 * this.volume, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx.destination);
        noise.start(now);
    }

    // 1,100-lb Plaster Wall Sledgehammer Impact & Lath Crunch
    playSledge() {
        if (this.isMuted) return;
        this.init();
        if (!this.ctx) return;
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(110, now);
        osc.frequency.exponentialRampToValueAtTime(35, now + 0.18);

        const bufferSize = Math.floor(this.ctx.sampleRate * 0.15);
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (this.ctx.sampleRate * 0.05));
        }
        const noise = this.ctx.createBufferSource();
        noise.buffer = buffer;

        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(0.45 * this.volume, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

        osc.connect(gain);
        noise.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        noise.start(now);
        osc.stop(now + 0.25);
    }

    // Steampunk Steam Release / Valve Hiss
    playSteamHiss() {
        if (this.isMuted) return;
        this.init();
        if (!this.ctx) return;
        const now = this.ctx.currentTime;
        const dur = 0.35;
        const bufferSize = Math.floor(this.ctx.sampleRate * dur);
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (this.ctx.sampleRate * 0.14));
        }
        const noise = this.ctx.createBufferSource();
        noise.buffer = buffer;
        const filter = this.ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(2400, now);
        filter.Q.setValueAtTime(1.8, now);
        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(this.volume * 0.45, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + dur);
        noise.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx.destination);
        noise.start(now);
    }

    // Steampunk Clockwork Gear Click
    playGearClick() {
        if (this.isMuted) return;
        this.init();
        if (!this.ctx) return;
        const now = this.ctx.currentTime;
        [0, 0.035, 0.07].forEach((offset, idx) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(750 + idx * 280, now + offset);
            gain.gain.setValueAtTime(this.volume * 0.28, now + offset);
            gain.gain.exponentialRampToValueAtTime(0.001, now + offset + 0.035);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start(now + offset);
            osc.stop(now + offset + 0.04);
        });
    }
}

window.Sound = new SoundEngine();

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { SoundEngine };
}

