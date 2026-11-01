/**
 * Jack's Fixer Uper - Minigame: Spirit Level & Bubble Balancer
 */
(function() {
    if (typeof UIController === "undefined") return;

    UIController.prototype.startDiyLevelMinigame = function(taskId) {
        const g = window.Game;
        const task = g.getTask(taskId);
        if (!task) return;

        this.cancelMinigame();

        this.activeMinigame = {
            type: 'diy_level',
            taskId: taskId,
            task: task,
            round: 0,
            rounds: [
                { name: "Floor Joist Leveling", desc: "Level the sagging 116-year parlor old-growth timber joists with oak shims" },
                { name: "Pocket Door Plumb", desc: "Plumb the ornate Victorian walnut pocket door frame" }
            ],
            bubblePos: 24,
            bubbleVel: 0.16,
            timeLeft: 8.0,
            totalTime: 8.0,
            scores: [],
            timerInterval: null,
            animFrameId: null,
            isLocked: false,
            lastTime: performance.now()
        };

        const modal = document.getElementById('minigame-modal-overlay');
        const title = document.getElementById('minigame-title');
        if (!modal) return;

        if (title) {
            title.innerHTML = `⚖️ Victorian Spirit Level & Balancer &bull; ${task.name}`;
        }

        this.renderDiyLevelScreen();
        modal.style.display = 'flex';
        if (window.Sound) window.Sound.playClick();

        this.bindMinigameKeyboard();
        this.startDiyLevelLoop();
    }

    UIController.prototype.renderDiyLevelScreen = function() {
        const mg = this.activeMinigame;
        if (!mg || mg.type !== 'diy_level') return;
        const task = mg.task;
        const currentRound = mg.rounds[mg.round] || { name: 'Leveling', desc: 'Precision leveling' };
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

        const tiltDeg = ((mg.bubblePos - 50) * 0.08).toFixed(1);

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
                    <br><small style="color:var(--text-dim);">Tap shims or use Left/Right arrows to center the green bubble between the black lines!</small>
                </div>

                <!-- Spirit Level Casing -->
                <div class="spirit-level-container">
                    <div class="spirit-level-brass-trim">
                        <span class="spirit-logo">WHISPERING PINES &bull; BRASS NO. 4 LEVEL</span>
                        <span id="spirit-angle-text" class="spirit-tilt-readout">${tiltDeg}° Pitch</span>
                    </div>
                    <div class="spirit-vial-frame">
                        <div class="spirit-vial">
                            <!-- Target Hairlines -->
                            <div class="vial-hairline left"></div>
                            <div class="vial-target-zone">CENTER</div>
                            <div class="vial-hairline right"></div>

                            <!-- Floating Spirit Bubble -->
                            <div class="spirit-bubble" id="spirit-bubble" style="left:${mg.bubblePos}%;">
                                <div class="bubble-shine"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Live Feedback Display -->
                <div class="diy-feedback-box" id="level-feedback-msg">
                    <span class="hint-text">Center the bubble inside the center goal markers before time expires!</span>
                </div>

                <!-- Controls -->
                <div class="level-controls-grid">
                    <button class="btn-level-shim left" onclick="UI.tiltDiyLevel(-1)">
                        ◀ Tap Left Shim / Jack [A / ←]
                    </button>
                    <button class="btn-level-lock" onclick="UI.handleDiyLevelLock()">
                        ⚖️ LOCK IN LEVEL [SPACEBAR]
                    </button>
                    <button class="btn-level-shim right" onclick="UI.tiltDiyLevel(1)">
                        Tap Right Shim / Jack [D / →] ▶
                    </button>
                </div>

                <div class="diy-controls-row" style="margin-top:6px;">
                    <div style="font-size:0.85rem; color:#94a3b8;">
                        Time remaining: <strong id="level-clock-text" style="color:#38bdf8; font-family:monospace;">${mg.timeLeft.toFixed(1)}s</strong>
                    </div>
                    <button class="btn-skip-minigame" onclick="UI.autoFinishMinigame('${task.id}', true)">
                        ⚡ Auto-Finish (Standard 50% Rate)
                    </button>
                </div>
            </div>
        `;
    }

    UIController.prototype.startDiyLevelLoop = function() {
        const loop = (currentTime) => {
            if (!this.activeMinigame || this.activeMinigame.type !== 'diy_level') return;
            const mg = this.activeMinigame;

            if (!mg.isLocked) {
                const dt = Math.min(0.05, (currentTime - mg.lastTime) / 1000);
                mg.lastTime = currentTime;

                mg.timeLeft = Math.max(0, mg.timeLeft - dt);
                mg.bubblePos += mg.bubbleVel * 22 * dt;

                if (mg.bubblePos >= 94) {
                    mg.bubblePos = 94;
                    mg.bubbleVel = -Math.abs(mg.bubbleVel);
                } else if (mg.bubblePos <= 6) {
                    mg.bubblePos = 6;
                    mg.bubbleVel = Math.abs(mg.bubbleVel);
                }

                const bubbleEl = document.getElementById('spirit-bubble');
                const angleEl = document.getElementById('spirit-angle-text');
                const clockEl = document.getElementById('level-clock-text');

                if (bubbleEl) bubbleEl.style.left = `${mg.bubblePos}%`;
                if (angleEl) angleEl.textContent = `${((mg.bubblePos - 50) * 0.08).toFixed(1)}° Pitch`;
                if (clockEl) clockEl.textContent = `${mg.timeLeft.toFixed(1)}s`;

                if (mg.timeLeft <= 0) {
                    this.handleDiyLevelLock();
                    return;
                }
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

    UIController.prototype.tiltDiyLevel = function(dir) {
        const mg = this.activeMinigame;
        if (!mg || mg.type !== 'diy_level' || mg.isLocked) return;

        mg.bubblePos = Math.max(6, Math.min(94, mg.bubblePos + dir * 6.5));
        mg.bubbleVel += dir * 0.08;
        if (window.Sound) window.Sound.playClick();

        const bubbleEl = document.getElementById('spirit-bubble');
        const angleEl = document.getElementById('spirit-angle-text');
        if (bubbleEl) bubbleEl.style.left = `${mg.bubblePos}%`;
        if (angleEl) angleEl.textContent = `${((mg.bubblePos - 50) * 0.08).toFixed(1)}° Pitch`;
    }

    UIController.prototype.handleDiyLevelLock = function() {
        const mg = this.activeMinigame;
        if (!mg || mg.type !== 'diy_level' || mg.isLocked) return;

        mg.isLocked = true;
        const pos = mg.bubblePos;
        const dist = Math.abs(pos - 50);

        let score = 25;
        let label = "Off-Bubble Sag";
        let badgeClass = "badge-rough";

        if (dist <= 4.5) {
            score = 100;
            label = "🌟 DEAD-NUTS LEVEL!";
            badgeClass = "badge-bullseye";
            if (window.Sound) window.Sound.playBullseye();
        } else if (dist <= 12) {
            score = 80;
            label = "🟢 CRISP HERITAGE PLUMB!";
            badgeClass = "badge-high";
            if (window.Sound) window.Sound.playCash();
        } else if (dist <= 26) {
            score = 55;
            label = "🟡 ACCEPTABLE LEVEL";
            badgeClass = "badge-standard";
            if (window.Sound) window.Sound.playHammer();
        } else {
            score = 25;
            label = "🔴 OFF-BUBBLE SAG";
            badgeClass = "badge-rough";
            if (window.Sound) window.Sound.playMiss();
        }

        mg.scores.push({
            stage: mg.round,
            stageName: mg.rounds[mg.round].name,
            pos: Math.round(pos),
            score: score,
            label: label
        });

        const feedbackEl = document.getElementById('level-feedback-msg');
        if (feedbackEl) {
            feedbackEl.className = `diy-feedback-box ${badgeClass}`;
            feedbackEl.innerHTML = `<strong>${label}</strong> &bull; Scored ${score} Points!`;
        }

        setTimeout(() => {
            if (!this.activeMinigame || this.activeMinigame !== mg) return;
            if (mg.round < 1) {
                mg.round++;
                mg.bubblePos = 78;
                mg.bubbleVel = -0.22;
                mg.timeLeft = 8.0;
                mg.isLocked = false;
                this.renderDiyLevelScreen();
            } else {
                this.renderMinigameResults('diy', mg.taskId, mg.scores);
            }
        }, 600);
    }

    // ------------------------------------------
    // DIY MINIGAME 3: DIGITAL STUD FINDER & DRILL
    // ------------------------------------------

})();
