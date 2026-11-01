/**
 * Jack's Fixer Uper - Minigame: Heritage Paint Roller Wall Boards
 */
(function() {
    if (typeof UIController === "undefined") return;

    UIController.prototype.startDiyPaintMinigame = function(taskId) {
        const g = window.Game;
        const task = g.getTask(taskId);
        if (!task) return;

        this.cancelMinigame();

        this.activeMinigame = {
            type: 'diy_paint',
            taskId: taskId,
            task: task,
            boards: [
                { id: 0, name: "Upper Fascia Plank", painted: false },
                { id: 1, name: "Gable Crown Board", painted: false },
                { id: 2, name: "Center Shiplap Section #1", painted: false },
                { id: 3, name: "Center Shiplap Section #2", painted: false },
                { id: 4, name: "Lower Water Table", painted: false },
                { id: 5, name: "Baseboard Molding", painted: false }
            ],
            paintedCount: 0,
            timeLeft: 8.0,
            totalTime: 8.0,
            timerInterval: null
        };

        const modal = document.getElementById('minigame-modal-overlay');
        const title = document.getElementById('minigame-title');
        if (!modal) return;
        if (title) title.innerHTML = `🖌️ Paint Roller Heritage Coverage &bull; ${task.name}`;

        this.renderDiyPaintScreen();
        modal.style.display = 'flex';
        if (window.Sound) window.Sound.playClick();

        this.bindMinigameKeyboard();

        const startTime = Date.now();
        this.activeMinigame.timerInterval = setInterval(() => {
            if (!this.activeMinigame || this.activeMinigame.type !== 'diy_paint') {
                clearInterval(this.activeMinigame?.timerInterval);
                return;
            }
            const elapsed = (Date.now() - startTime) / 1000;
            const remaining = Math.max(0, 8.0 - elapsed);
            this.activeMinigame.timeLeft = remaining;

            const timeBar = document.getElementById('paint-timer-bar-fill');
            const timeText = document.getElementById('paint-timer-text');
            if (timeBar) timeBar.style.width = `${(remaining / 8.0) * 100}%`;
            if (timeText) timeText.textContent = `${remaining.toFixed(1)}s remaining`;

            if (remaining <= 0) {
                clearInterval(this.activeMinigame.timerInterval);
                this.finishDiyPaintMinigame();
            }
        }, 100);
    }

    UIController.prototype.renderDiyPaintScreen = function() {
        const mg = this.activeMinigame;
        if (!mg || mg.type !== 'diy_paint') return;
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
                        <span><strong>Smooth Paint Roller:</strong> Click or swipe all 6 wall boards to roll a rich, even coat of Heritage Green!</span>
                        <strong id="paint-timer-text" class="sub-timer-clock">${mg.timeLeft.toFixed(1)}s remaining</strong>
                    </div>
                    <div class="sub-timer-bar-bg">
                        <div class="sub-timer-bar-fill" id="paint-timer-bar-fill" style="width:${(mg.timeLeft / mg.totalTime) * 100}%;"></div>
                    </div>
                </div>

                <!-- 6 Wall Boards Grid -->
                <div class="paint-wall-grid">
                    ${mg.boards.map(b => `
                        <div class="paint-wall-board ${b.painted ? 'painted' : 'unpainted'}" 
                             onclick="UI.rollPaintBoard(${b.id})"
                             onmouseover="UI.rollPaintBoard(${b.id})">
                            <span class="board-title">${b.name}</span>
                            <span class="board-status">${b.painted ? '✓ 100% EVEN COAT' : '🖌️ ROLL COAT'}</span>
                        </div>
                    `).join('')}
                </div>

                <!-- Mobile / Touch Controls -->
                <div class="mobile-minigame-touchpad">
                    <button class="btn-touch-action btn-touch-primary" onclick="UI.rollNextPaintBoard()" style="width:100%; max-width:420px; font-size:1rem;">
                        🖌️ Roll Next Wall Board [TAP / SPACEBAR]
                    </button>
                </div>

                <div class="sub-controls-row">
                    <div class="sub-audit-summary">
                        <span>Coverage: <strong>${mg.paintedCount} / 6 Boards Rolled</strong></span>
                    </div>
                    <button class="btn-skip-minigame" onclick="UI.autoFinishMinigame('${task.id}', true)">
                        ⚡ Auto-Finish (Standard 50% Rate)
                    </button>
                </div>
            </div>
        `;
    }

    UIController.prototype.rollPaintBoard = function(idx) {
        const mg = this.activeMinigame;
        if (!mg || mg.type !== 'diy_paint') return;
        const b = mg.boards[idx];
        if (!b || b.painted) return;

        b.painted = true;
        mg.paintedCount++;
        if (window.Sound) window.Sound.playSwoosh();

        this.renderDiyPaintScreen();

        if (mg.paintedCount >= 6) {
            if (window.Sound) window.Sound.playBullseye();
            clearInterval(mg.timerInterval);
            setTimeout(() => {
                this.finishDiyPaintMinigame();
            }, 350);
        }
    }

    UIController.prototype.rollNextPaintBoard = function() {
        const mg = this.activeMinigame;
        if (!mg || mg.type !== 'diy_paint') return;
        const unpainted = mg.boards.find(b => !b.painted);
        if (unpainted) this.rollPaintBoard(unpainted.id);
    }

    UIController.prototype.finishDiyPaintMinigame = function() {
        const mg = this.activeMinigame;
        if (!mg || mg.type !== 'diy_paint') return;
        clearInterval(mg.timerInterval);

        const count = mg.paintedCount;
        let score = 25;
        let label = "🔴 Thin Uneven Paint Coat";

        if (count >= 6) {
            score = 100;
            label = "🌟 Masterpiece Flawless Heritage Sheen!";
        } else if (count >= 5) {
            score = 80;
            label = "🟢 High-Quality Even Coverage";
        } else if (count >= 4) {
            score = 55;
            label = "🟡 Standard Base Coat";
        }

        this.renderMinigameResults('diy', mg.taskId, [{ score: score, label: label }]);
    }

    // ------------------------------------------
    // DIY MINIGAME 8: 20-TON HYDRAULIC JACK LEVELING & BALANCE
    // ------------------------------------------

})();
