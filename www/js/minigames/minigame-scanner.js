/**
 * Jack's Fixer Uper - Minigame: Digital Stud Finder & Drill
 */
(function() {
    if (typeof UIController === "undefined") return;

    UIController.prototype.startDiyScannerMinigame = function(taskId) {
        const g = window.Game;
        const task = g.getTask(taskId);
        if (!task) return;

        this.cancelMinigame();

        this.activeMinigame = {
            type: 'diy_scanner',
            taskId: taskId,
            task: task,
            round: 0,
            rounds: [
                { name: "Structural Anchor Lag #1", desc: "Locate virgin white oak stud behind lath & plaster" },
                { name: "Structural Anchor Lag #2", desc: "Pinpoint companion wall timber for seismic load tie" }
            ],
            studPos: Math.floor(Math.random() * 46) + 27,
            scannerPos: 12,
            scores: [],
            isLocked: false
        };

        const modal = document.getElementById('minigame-modal-overlay');
        const title = document.getElementById('minigame-title');
        if (!modal) return;

        if (title) {
            title.innerHTML = `📡 Stud Finder & Anchor Drill &bull; ${task.name}`;
        }

        this.renderDiyScannerScreen();
        modal.style.display = 'flex';
        if (window.Sound) window.Sound.playClick();

        this.bindMinigameKeyboard();
    }

    UIController.prototype.renderDiyScannerScreen = function() {
        const mg = this.activeMinigame;
        if (!mg || mg.type !== 'diy_scanner') return;
        const task = mg.task;
        const currentRound = mg.rounds[mg.round] || { name: 'Drilling', desc: 'Anchor drilling' };
        const body = document.getElementById('minigame-modal-body');
        if (!body) return;

        const roundsHtml = mg.rounds.map((r, idx) => {
            let statusClass = '';
            let scoreTag = '';
            if (idx === mg.round) statusClass = 'active';
            else if (idx < mg.round) {
                statusClass = 'completed';
                const recorded = mg.scores[idx];
                scoreTag = recorded ? ` (${recorded.score} pts)` : '';
            }
            return `
                <div class="diy-stage-pill ${statusClass}">
                    <span class="pill-num">Step ${idx + 1} of 2</span>
                    <span class="pill-name">${r.name}${scoreTag}</span>
                </div>
            `;
        }).join('');

        const dist = Math.abs(mg.scannerPos - mg.studPos);
        let bars = 1;
        let signalLabel = "⚪ HOLLOW CAVITY (NO TIMBER)";
        let signalClass = "sig-1";
        if (dist <= 4) { bars = 5; signalLabel = "🔴 PEAK DENSITY: SOLID 1910 VIRGIN OLD-GROWTH OAK STUD!"; signalClass = "sig-5"; }
        else if (dist <= 10) { bars = 4; signalLabel = "🟠 HIGH DENSITY: STUD EDGE DETECTED"; signalClass = "sig-4"; }
        else if (dist <= 18) { bars = 3; signalLabel = "🟡 MEDIUM DENSITY: DENSE LATH & WIRE"; signalClass = "sig-3"; }
        else if (dist <= 28) { bars = 2; signalLabel = "🟢 LOW DENSITY: PLASTER BACKING"; signalClass = "sig-2"; }

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

                <div class="diy-stages-row" style="grid-template-columns: repeat(2, 1fr);">
                    ${roundsHtml}
                </div>

                <div class="stage-instructions-banner">
                    <strong>Step ${mg.round + 1}: ${currentRound.name}</strong> — ${currentRound.desc}.
                    <br><small style="color:var(--text-dim);">Slide the digital sensor along the wall to find peak density (5 bars), then drill!</small>
                </div>

                <!-- Stud Finder Display Unit -->
                <div class="scanner-unit-box">
                    <div class="scanner-screen">
                        <div class="scanner-screen-header">
                            <span>SENSITIVITY: HORSEHAIR PLASTER 1-INCH DEEP</span>
                            <span id="scanner-sig-text" class="scanner-sig-text ${signalClass}">${signalLabel}</span>
                        </div>
                        <div class="scanner-led-meter" id="scanner-led-meter">
                            <div class="led-bar ${bars >= 1 ? 'lit g' : ''}"></div>
                            <div class="led-bar ${bars >= 2 ? 'lit g' : ''}"></div>
                            <div class="led-bar ${bars >= 3 ? 'lit y' : ''}"></div>
                            <div class="led-bar ${bars >= 4 ? 'lit o' : ''}"></div>
                            <div class="led-bar ${bars >= 5 ? 'lit r pulse' : ''}"></div>
                        </div>
                    </div>

                    <!-- Wall Track with Sensor Cursor -->
                    <div class="wall-track-area" id="wall-track-area" onclick="UI.onWallTrackClick(event)">
                        <div class="wall-stud-reveal" id="stud-reveal" style="left:${mg.studPos}%; display:${mg.isLocked ? 'block' : 'none'};">
                            <span>SOLID STUD</span>
                        </div>
                        <div class="wall-scanner-head" id="scanner-head" style="left:${mg.scannerPos}%;">
                            <div class="scanner-sensor-glow"></div>
                            <span class="scanner-head-tag">SENSOR</span>
                        </div>
                    </div>
                </div>

                <!-- Slide Buttons & Range -->
                <div class="scanner-nav-row">
                    <button class="btn-scan-nav" onclick="UI.slideDiyScanner(-8)">◀ Slide Left [A / ←]</button>
                    <input type="range" min="5" max="95" value="${mg.scannerPos}" class="scanner-slider" oninput="UI.setDiyScannerPos(this.value)">
                    <button class="btn-scan-nav" onclick="UI.slideDiyScanner(8)">Slide Right [D / →] ▶</button>
                </div>

                <!-- Feedback Display -->
                <div class="diy-feedback-box" id="scanner-feedback-msg">
                    <span class="hint-text">Find the 5-bar peak signal and drill directly into the virgin timber!</span>
                </div>

                <!-- Drill Button -->
                <div class="diy-controls-row">
                    <button id="btn-diy-drill" class="btn-diy-strike" onclick="UI.handleDiyScannerDrill()">
                        ⚡ DRILL &amp; DRIVE STRUCTURAL ANCHOR [SPACEBAR]
                    </button>
                    <button class="btn-skip-minigame" onclick="UI.autoFinishMinigame('${task.id}', true)">
                        ⚡ Auto-Finish (Standard 50% Rate)
                    </button>
                </div>
            </div>
        `;
    }

    UIController.prototype.slideDiyScanner = function(delta) {
        const mg = this.activeMinigame;
        if (!mg || mg.type !== 'diy_scanner' || mg.isLocked) return;
        this.setDiyScannerPos(mg.scannerPos + delta);
    }

    UIController.prototype.onWallTrackClick = function(e) {
        const mg = this.activeMinigame;
        if (!mg || mg.type !== 'diy_scanner' || mg.isLocked) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const clickPct = ((e.clientX - rect.left) / rect.width) * 100;
        this.setDiyScannerPos(clickPct);
    }

    UIController.prototype.setDiyScannerPos = function(pos) {
        const mg = this.activeMinigame;
        if (!mg || mg.type !== 'diy_scanner' || mg.isLocked) return;

        mg.scannerPos = Math.max(5, Math.min(95, parseFloat(pos)));

        const dist = Math.abs(mg.scannerPos - mg.studPos);
        let bars = 1;
        let signalLabel = "⚪ HOLLOW CAVITY (NO TIMBER)";
        let signalClass = "sig-1";
        let beepFreq = 300;

        if (dist <= 4) { bars = 5; signalLabel = "🔴 PEAK DENSITY: SOLID 1910 VIRGIN OLD-GROWTH OAK STUD!"; signalClass = "sig-5"; beepFreq = 950; }
        else if (dist <= 10) { bars = 4; signalLabel = "🟠 HIGH DENSITY: STUD EDGE DETECTED"; signalClass = "sig-4"; beepFreq = 780; }
        else if (dist <= 18) { bars = 3; signalLabel = "🟡 MEDIUM DENSITY: DENSE LATH & WIRE"; signalClass = "sig-3"; beepFreq = 600; }
        else if (dist <= 28) { bars = 2; signalLabel = "🟢 LOW DENSITY: PLASTER BACKING"; signalClass = "sig-2"; beepFreq = 450; }

        if (window.Sound) window.Sound.playBeep(beepFreq);

        const headEl = document.getElementById('scanner-head');
        const textEl = document.getElementById('scanner-sig-text');
        const meterEl = document.getElementById('scanner-led-meter');

        if (headEl) headEl.style.left = `${mg.scannerPos}%`;
        if (textEl) {
            textEl.className = `scanner-sig-text ${signalClass}`;
            textEl.textContent = signalLabel;
        }
        if (meterEl) {
            meterEl.innerHTML = `
                <div class="led-bar ${bars >= 1 ? 'lit g' : ''}"></div>
                <div class="led-bar ${bars >= 2 ? 'lit g' : ''}"></div>
                <div class="led-bar ${bars >= 3 ? 'lit y' : ''}"></div>
                <div class="led-bar ${bars >= 4 ? 'lit o' : ''}"></div>
                <div class="led-bar ${bars >= 5 ? 'lit r pulse' : ''}"></div>
            `;
        }
    }

    UIController.prototype.handleDiyScannerDrill = function() {
        const mg = this.activeMinigame;
        if (!mg || mg.type !== 'diy_scanner' || mg.isLocked) return;

        mg.isLocked = true;
        const dist = Math.abs(mg.scannerPos - mg.studPos);

        let score = 25;
        let label = "Hollow Lath Blunder";
        let badgeClass = "badge-rough";

        if (dist <= 4) {
            score = 100;
            label = "🌟 DEAD-CENTER SOLID STUD!";
            badgeClass = "badge-bullseye";
            if (window.Sound) window.Sound.playBullseye();
        } else if (dist <= 10) {
            score = 80;
            label = "🟢 SOLID TIMBER BITE!";
            badgeClass = "badge-high";
            if (window.Sound) window.Sound.playCash();
        } else if (dist <= 22) {
            score = 55;
            label = "🟡 STUD EDGE ANCHOR";
            badgeClass = "badge-standard";
            if (window.Sound) window.Sound.playHammer();
        } else {
            score = 25;
            label = "🔴 HOLLOW LATH BLUNDER";
            badgeClass = "badge-rough";
            if (window.Sound) window.Sound.playMiss();
        }

        mg.scores.push({
            stage: mg.round,
            stageName: mg.rounds[mg.round].name,
            pos: Math.round(mg.scannerPos),
            score: score,
            label: label
        });

        const studEl = document.getElementById('stud-reveal');
        if (studEl) studEl.style.display = 'block';

        const feedbackEl = document.getElementById('scanner-feedback-msg');
        if (feedbackEl) {
            feedbackEl.className = `diy-feedback-box ${badgeClass}`;
            feedbackEl.innerHTML = `<strong>${label}</strong> &bull; Scored ${score} Points!`;
        }

        setTimeout(() => {
            if (!this.activeMinigame || this.activeMinigame !== mg) return;
            if (mg.round < 1) {
                mg.round++;
                mg.studPos = Math.floor(Math.random() * 46) + 27;
                mg.scannerPos = 12;
                mg.isLocked = false;
                this.renderDiyScannerScreen();
            } else {
                this.renderMinigameResults('diy', mg.taskId, mg.scores);
            }
        }, 650);
    }

    // ------------------------------------------
    // DIY MINIGAME 4: TACTILE FRAMING NAIL DRIVING
    // ------------------------------------------

})();
