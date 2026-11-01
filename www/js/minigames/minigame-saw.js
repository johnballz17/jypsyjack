/**
 * Jack's Fixer Uper - Minigame: Rhythm Handsaw Timber Cutting
 */
(function() {
    if (typeof UIController === "undefined") return;

    UIController.prototype.startDiySawMinigame = function(taskId) {
        const g = window.Game;
        const task = g.getTask(taskId);
        if (!task) return;

        this.cancelMinigame();

        this.activeMinigame = {
            type: 'diy_saw',
            taskId: taskId,
            task: task,
            cutDepth: 0,
            lastStrokeDir: null,
            strokeCount: 0,
            timeLeft: 10.0,
            totalTime: 10.0,
            timerInterval: null
        };

        const modal = document.getElementById('minigame-modal-overlay');
        const title = document.getElementById('minigame-title');
        if (!modal) return;
        if (title) title.innerHTML = `🪚 Rhythm Handsaw Cutting &bull; ${task.name}`;

        this.renderDiySawScreen();
        modal.style.display = 'flex';
        if (window.Sound) window.Sound.playClick();

        this.bindMinigameKeyboard();

        const startTime = Date.now();
        this.activeMinigame.timerInterval = setInterval(() => {
            if (!this.activeMinigame || this.activeMinigame.type !== 'diy_saw') {
                clearInterval(this.activeMinigame?.timerInterval);
                return;
            }
            const elapsed = (Date.now() - startTime) / 1000;
            const remaining = Math.max(0, 10.0 - elapsed);
            this.activeMinigame.timeLeft = remaining;

            const timeBar = document.getElementById('saw-timer-bar-fill');
            const timeText = document.getElementById('saw-timer-text');
            if (timeBar) timeBar.style.width = `${(remaining / 10.0) * 100}%`;
            if (timeText) timeText.textContent = `${remaining.toFixed(1)}s remaining`;

            if (remaining <= 0) {
                clearInterval(this.activeMinigame.timerInterval);
                this.finishDiySawMinigame();
            }
        }, 100);
    }

    UIController.prototype.renderDiySawScreen = function() {
        const mg = this.activeMinigame;
        if (!mg || mg.type !== 'diy_saw') return;
        const task = mg.task;
        const body = document.getElementById('minigame-modal-body');
        if (!body) return;

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

                <div class="sub-timer-container">
                    <div class="sub-timer-header">
                        <span><strong>2x8 Timber Crosscut:</strong> Alternate Push and Pull strokes in smooth rhythm to saw through the beam!</span>
                        <strong id="saw-timer-text" class="sub-timer-clock">${mg.timeLeft.toFixed(1)}s remaining</strong>
                    </div>
                    <div class="sub-timer-bar-bg">
                        <div class="sub-timer-bar-fill" id="saw-timer-bar-fill" style="width:${(mg.timeLeft / mg.totalTime) * 100}%;"></div>
                    </div>
                </div>

                <!-- Handsaw Workbench Graphic -->
                <div class="saw-workbench-box">
                    <div class="saw-cutline-indicator">
                        <span>TIMBER KERF DEPTH:</span>
                        <strong style="color:#38bdf8; font-size:1.1rem;">${Math.round(mg.cutDepth)}% SEVERED</strong>
                    </div>

                    <div class="saw-timber-visual">
                        <div class="saw-timber-fixed">
                            <span class="timber-label">2x8 STRUCTURAL TIMBER BEAM</span>
                        </div>
                        <div class="saw-blade-kerf" style="height:${mg.cutDepth}%;">
                            <div class="saw-teeth-blade ${mg.lastStrokeDir || 'idle'}">🪚</div>
                        </div>
                        <div class="saw-timber-offcut ${mg.cutDepth >= 100 ? 'dropped' : ''}">
                            <span class="timber-label">OFF-CUT</span>
                        </div>
                    </div>
                </div>

                <!-- Mobile / Touch Alternating Stroke Control -->
                <div class="mobile-minigame-touchpad">
                    <button class="btn-touch-action btn-touch-primary" onclick="UI.strokeDiySaw(UI.activeMinigame?.lastStrokeDir === 'push' ? 'pull' : 'push')" style="width:100%; max-width:420px; font-size:1rem;">
                        🪚 Tap to Alternate Stroke (Push ⇄ Pull)
                    </button>
                </div>

                <!-- Alternating Stroke Controls -->
                <div class="saw-controls-row">
                    <button class="btn-saw-stroke ${mg.lastStrokeDir === 'push' ? 'next-pulse' : ''}" onclick="UI.strokeDiySaw('pull')">
                        ◀ PULL SAW STROKE [A / ←]
                    </button>
                    <button class="btn-saw-stroke ${mg.lastStrokeDir === 'pull' || !mg.lastStrokeDir ? 'next-pulse' : ''}" onclick="UI.strokeDiySaw('push')">
                        PUSH SAW STROKE [D / →] ▶
                    </button>
                </div>

                <div class="diy-controls-row" style="margin-top:6px;">
                    <div style="font-size:0.85rem; color:#94a3b8;">
                        Total Strokes: <strong>${mg.strokeCount}</strong>
                    </div>
                    <button class="btn-skip-minigame" onclick="UI.autoFinishMinigame('${task.id}', true)">
                        ⚡ Auto-Finish (Standard 50% Rate)
                    </button>
                </div>
            </div>
        `;
    }

    UIController.prototype.strokeDiySaw = function(dir) {
        const mg = this.activeMinigame;
        if (!mg || mg.type !== 'diy_saw') return;

        mg.strokeCount++;
        let gain = 10;
        if (mg.lastStrokeDir !== dir) {
            gain = 12; // Clean alternation!
            mg.lastStrokeDir = dir;
            if (window.Sound) window.Sound.playSaw();
        } else {
            gain = 4; // Binding!
            if (window.Sound) window.Sound.playClick();
        }

        mg.cutDepth = Math.min(100, mg.cutDepth + gain);

        if (mg.cutDepth >= 100) {
            clearInterval(mg.timerInterval);
            if (window.Sound) {
                window.Sound.playThud();
                window.Sound.playBullseye();
            }
            this.renderDiySawScreen();
            setTimeout(() => {
                this.finishDiySawMinigame();
            }, 450);
            return;
        }

        this.renderDiySawScreen();
    }

    UIController.prototype.finishDiySawMinigame = function() {
        const mg = this.activeMinigame;
        if (!mg || mg.type !== 'diy_saw') return;
        clearInterval(mg.timerInterval);

        let score = 25;
        let label = "🔴 Slow Rough Cut";

        if (mg.cutDepth >= 100) {
            if (mg.timeLeft >= 5.5) {
                score = 100;
                label = "🌟 Masterpiece Crosscut (Fast & Flush!)";
            } else if (mg.timeLeft >= 2.5) {
                score = 80;
                label = "🟢 Crisp Clean Timber Cut";
            } else {
                score = 55;
                label = "🟡 Standard Timber Cut";
            }
        }

        this.renderMinigameResults('diy', mg.taskId, [{ score: score, label: label }]);
    }

    // ------------------------------------------
    // DIY MINIGAME 7: PAINT ROLLER WALL COVERAGE
    // ------------------------------------------

})();
