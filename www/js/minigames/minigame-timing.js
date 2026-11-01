/**
 * Jack's Fixer Uper - Minigame: Timing & Craftsmanship Gauge
 */
(function() {
    if (typeof UIController === "undefined") return;

    UIController.prototype.startDiyMinigame = function(taskId) {
        const g = window.Game;
        const task = g.getTask(taskId);
        if (!task) return;

        this.cancelMinigame();

        this.activeMinigame = {
            type: 'diy',
            taskId: taskId,
            task: task,
            stage: 0,
            stages: [
                { name: "Measure & Mark", desc: "Laser plumb, calibrate joist lines & scribe trim", speed: 1.5 },
                { name: "Cut & Joinery", desc: "Miter cuts, mortise joints & table saw precision", speed: 2.1 },
                { name: "Fasten & Finish", desc: "Drive structural lags, flush sand & seal coats", speed: 2.7 }
            ],
            scores: [],
            pos: 10,
            dir: 1,
            animFrameId: null,
            isLocked: false,
            lastTime: performance.now()
        };

        const modal = document.getElementById('minigame-modal-overlay');
        const title = document.getElementById('minigame-title');
        if (!modal) return;

        if (title) {
            title.innerHTML = `🔨 DIY Hands-On Craftsmanship &bull; ${task.name}`;
        }

        this.renderDiyScreen();
        modal.style.display = 'flex';
        if (window.Sound) window.Sound.playClick();

        this.bindMinigameKeyboard();
        this.startDiyLoop();
    }

    UIController.prototype.renderDiyScreen = function() {
        const mg = this.activeMinigame;
        if (!mg || mg.type !== 'diy') return;
        const task = mg.task;
        const currentStageInfo = mg.stages[mg.stage] || { name: 'Crafting', desc: 'Precision work' };
        const body = document.getElementById('minigame-modal-body');
        if (!body) return;

        // Stage progress pills
        const stagesHtml = mg.stages.map((st, idx) => {
            let statusClass = '';
            let scoreTag = '';
            if (idx === mg.stage) {
                statusClass = 'active';
            } else if (idx < mg.stage) {
                statusClass = 'completed';
                const recorded = mg.scores[idx];
                scoreTag = recorded ? ` (${recorded.score} pts)` : '';
            }
            return `
                <div class="diy-stage-pill ${statusClass}">
                    <span class="pill-num">Step ${idx + 1}</span>
                    <span class="pill-name">${st.name}${scoreTag}</span>
                </div>
            `;
        }).join('');

        body.innerHTML = `
            <div class="minigame-wrapper">
                <!-- Task Header Banner -->
                <div class="minigame-task-banner">
                    <div class="banner-title-col">
                        <span class="banner-room-tag">${GAME_DATA.ROOMS[task.room]?.icon || '🏠'} ${GAME_DATA.ROOMS[task.room]?.name || task.room}</span>
                        <h3>${task.name}</h3>
                        <p class="banner-desc">${task.desc}</p>
                    </div>
                    <div class="banner-costs-col">
                        <div class="cost-badge"><span>Materials:</span> <strong>$${task.matCost.toLocaleString()}</strong></div>
                        <div class="cost-badge"><span>Stamina:</span> <strong>${task.apCost} ⚡</strong></div>
                        <div class="cost-badge arv"><span>Base ARV Gain:</span> <strong>+$${task.value.toLocaleString()}</strong></div>
                    </div>
                </div>

                <!-- Stage Sequence Header -->
                <div class="diy-stages-row">
                    ${stagesHtml}
                </div>

                <div class="stage-instructions-banner">
                    <strong>Phase ${mg.stage + 1}: ${currentStageInfo.name}</strong> — ${currentStageInfo.desc}.
                    <br><small style="color:var(--text-dim);">Hit the Gold Bullseye in the center for Masterpiece rating (+25% value & stamina refund)!</small>
                </div>

                <!-- Timing Bar -->
                <div class="diy-gauge-area" onclick="UI.handleDiyStrike()">
                    <div class="diy-meter-track" id="diy-meter-track">
                        <!-- Zones -->
                        <div class="zone-segment zone-rough-l" title="Rough: 25 pts"><span>Rough (25)</span></div>
                        <div class="zone-segment zone-standard-l" title="Standard: 55 pts"><span>Standard (55)</span></div>
                        <div class="zone-segment zone-high-l" title="High Quality: 80 pts"><span>High Quality (80)</span></div>
                        <div class="zone-segment zone-bullseye" title="Masterpiece: 100 pts"><span>🌟 BULLSEYE (100)</span></div>
                        <div class="zone-segment zone-high-r" title="High Quality: 80 pts"><span>High Quality (80)</span></div>
                        <div class="zone-segment zone-standard-r" title="Standard: 55 pts"><span>Standard (55)</span></div>
                        <div class="zone-segment zone-rough-r" title="Rough: 25 pts"><span>Rough (25)</span></div>

                        <!-- Needle -->
                        <div class="diy-meter-needle" id="diy-needle" style="left:${mg.pos}%;">
                            <div class="needle-tip-top">▼</div>
                            <div class="needle-line"></div>
                            <div class="needle-tip-bottom">▲</div>
                        </div>
                    </div>
                </div>

                <!-- Feedback Display -->
                <div class="diy-feedback-box" id="diy-feedback-msg">
                    <span class="hint-text">Watch the oscillating pointer &amp; strike when aligned with the gold center!</span>
                </div>

                <!-- Controls -->
                <div class="diy-controls-row">
                    <button id="btn-diy-strike" class="btn-diy-strike" onclick="UI.handleDiyStrike()">
                        🔨 STRIKE &amp; LOCK IN [SPACEBAR]
                    </button>
                    <button class="btn-skip-minigame" onclick="UI.autoFinishMinigame('${task.id}', true)">
                        ⚡ Auto-Finish (Standard 50% Rate)
                    </button>
                </div>

                <!-- Previous Hits Summary -->
                ${mg.scores.length > 0 ? `
                    <div class="previous-hits-row">
                        <strong>Completed Phases:</strong>
                        ${mg.scores.map(s => `
                            <span class="hit-chip ${s.score >= 100 ? 'gold' : s.score >= 80 ? 'green' : s.score >= 55 ? 'yellow' : 'red'}">
                                ${s.stageName}: ${s.score} pts (${s.label})
                            </span>
                        `).join('')}
                    </div>
                ` : ''}
            </div>
        `;
    }

    UIController.prototype.startDiyLoop = function() {
        const loop = (currentTime) => {
            if (!this.activeMinigame || this.activeMinigame.type !== 'diy') return;
            const mg = this.activeMinigame;

            if (!mg.isLocked) {
                const dt = Math.min(0.05, (currentTime - mg.lastTime) / 1000);
                mg.lastTime = currentTime;

                const stageInfo = mg.stages[mg.stage] || { speed: 1.8 };
                // Oscillate between 0% and 100%
                mg.pos += mg.dir * stageInfo.speed * 42 * dt;

                if (mg.pos >= 100) {
                    mg.pos = 100;
                    mg.dir = -1;
                } else if (mg.pos <= 0) {
                    mg.pos = 0;
                    mg.dir = 1;
                }

                const needleEl = document.getElementById('diy-needle');
                if (needleEl) {
                    needleEl.style.left = `${mg.pos}%`;
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

    UIController.prototype.handleDiyStrike = function() {
        const mg = this.activeMinigame;
        if (!mg || mg.type !== 'diy' || mg.isLocked) return;

        mg.isLocked = true;
        const pos = mg.pos;
        const dist = Math.abs(pos - 50);

        let score = 25;
        let label = "Rough Alignment";
        let badgeClass = "badge-rough";

        if (dist <= 4.5) {
            score = 100;
            label = "🌟 MASTERPIECE BULLSEYE!";
            badgeClass = "badge-bullseye";
            if (window.Sound) window.Sound.playBullseye();
        } else if (dist <= 12) {
            score = 80;
            label = "🟢 CRISP HIGH QUALITY!";
            badgeClass = "badge-high";
            if (window.Sound) window.Sound.playCash();
        } else if (dist <= 28) {
            score = 55;
            label = "🟡 STANDARD CRAFTSMANSHIP";
            badgeClass = "badge-standard";
            if (window.Sound) window.Sound.playHammer();
        } else {
            score = 25;
            label = "🔴 ROUGH EDGE";
            badgeClass = "badge-rough";
            if (window.Sound) window.Sound.playMiss();
        }

        mg.scores.push({
            stage: mg.stage,
            stageName: mg.stages[mg.stage].name,
            pos: Math.round(pos),
            score: score,
            label: label
        });

        const feedbackEl = document.getElementById('diy-feedback-msg');
        if (feedbackEl) {
            feedbackEl.className = `diy-feedback-box ${badgeClass}`;
            feedbackEl.innerHTML = `<strong>${label}</strong> &bull; Scored ${score} Points!`;
        }

        setTimeout(() => {
            if (!this.activeMinigame || this.activeMinigame !== mg) return;
            if (mg.stage < 2) {
                mg.stage++;
                mg.isLocked = false;
                this.renderDiyScreen();
            } else {
                this.renderMinigameResults('diy', mg.taskId, mg.scores);
            }
        }, 600);
    }

    // ------------------------------------------
    // DIY MINIGAME 2: SPIRIT LEVEL & BUBBLE BALANCER
    // ------------------------------------------

})();
