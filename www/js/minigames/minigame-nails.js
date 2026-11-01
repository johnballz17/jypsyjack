/**
 * Jack's Fixer Uper - Minigame: Floor Magnet Nail & Screw Sweep
 */
(function() {
    if (typeof UIController === "undefined") return;

    UIController.prototype.startDiyNailsMinigame = function(taskId) {
        const g = window.Game;
        const task = g.getTask(taskId);
        if (!task) return;

        this.cancelMinigame();

        const icons = ['📍', '🔩', '🪛', '📌', '📎'];
        const nailItems = [];
        for (let i = 0; i < 10; i++) {
            nailItems.push({
                id: i,
                icon: icons[i % icons.length],
                x: Math.floor(Math.random() * 80) + 10,
                y: Math.floor(Math.random() * 68) + 16,
                collected: false
            });
        }

        this.activeMinigame = {
            type: 'diy_nails',
            taskId: taskId,
            task: task,
            timeLeft: 8.0,
            totalTime: 8.0,
            timerInterval: null,
            nails: nailItems,
            collectedCount: 0
        };

        const modal = document.getElementById('minigame-modal-overlay');
        const title = document.getElementById('minigame-title');
        if (!modal) return;
        if (title) title.innerHTML = `🧲 Magnetic Nail Cleanup &bull; ${task.name}`;

        this.renderDiyNailsScreen();
        modal.style.display = 'flex';
        if (window.Sound) window.Sound.playClick();

        this.bindMinigameKeyboard();

        const startTime = Date.now();
        const totalDuration = this.activeMinigame.totalTime;

        this.activeMinigame.timerInterval = setInterval(() => {
            if (!this.activeMinigame || this.activeMinigame.type !== 'diy_nails') {
                clearInterval(this.activeMinigame?.timerInterval);
                return;
            }

            const elapsed = (Date.now() - startTime) / 1000;
            const remaining = Math.max(0, totalDuration - elapsed);
            this.activeMinigame.timeLeft = remaining;

            const timeBar = document.getElementById('nails-timer-bar-fill');
            const timeText = document.getElementById('nails-timer-text');
            if (timeBar) timeBar.style.width = `${(remaining / totalDuration) * 100}%`;
            if (timeText) timeText.textContent = `${remaining.toFixed(1)}s remaining`;

            if (remaining <= 0) {
                clearInterval(this.activeMinigame.timerInterval);
                this.finishDiyNailsMinigame();
            }
        }, 100);
    }

    UIController.prototype.renderDiyNailsScreen = function() {
        const mg = this.activeMinigame;
        if (!mg || mg.type !== 'diy_nails') return;
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
                        <span><strong>Floor Magnet Sweep:</strong> Click or sweep over all 10 scattered sharp nails & screws before the cats step on them!</span>
                        <strong id="nails-timer-text" class="sub-timer-clock">${mg.timeLeft.toFixed(1)}s remaining</strong>
                    </div>
                    <div class="sub-timer-bar-bg">
                        <div class="sub-timer-bar-fill" id="nails-timer-bar-fill" style="width:${(mg.timeLeft / mg.totalTime) * 100}%;"></div>
                    </div>
                </div>

                <!-- Subfloor Nail Arena -->
                <div class="nail-floor-arena" id="nail-floor-arena">
                    <div class="magnetic-collector-tray">
                        <span>🧲 HEAVY-DUTY ROLLING ROOFING MAGNET &bull; COLLECTED: <strong>${mg.collectedCount} / 10</strong></span>
                    </div>

                    ${mg.nails.map(n => `
                        <div class="scattered-nail-item ${n.collected ? 'collected' : ''}" 
                             style="left:${n.x}%; top:${n.y}%;" 
                             onclick="UI.collectNailItem(${n.id})"
                             onmouseover="UI.collectNailItem(${n.id})">
                            <span class="nail-glyph">${n.icon}</span>
                        </div>
                    `).join('')}
                </div>

                <!-- Mobile / Touch Controls -->
                <div class="mobile-minigame-touchpad">
                    <button class="btn-touch-action btn-touch-primary" onclick="UI.collectNextNailItem()" style="width:100%; max-width:420px; font-size:1rem;">
                        🧲 Roll Heavy Magnet Sweep [TAP / SPACEBAR]
                    </button>
                </div>

                <div class="sub-controls-row">
                    <div class="sub-audit-summary">
                        <span>Scrap Cleared: <strong>${mg.collectedCount} / 10 Nails Collected</strong></span>
                    </div>
                    <button class="btn-skip-minigame" onclick="UI.autoFinishMinigame('${task.id}', true)">
                        ⚡ Auto-Finish (Standard 50% Rate)
                    </button>
                </div>
            </div>
        `;
    }

    UIController.prototype.collectNailItem = function(idx) {
        const mg = this.activeMinigame;
        if (!mg || mg.type !== 'diy_nails') return;
        const nail = mg.nails[idx];
        if (!nail || nail.collected) return;

        nail.collected = true;
        mg.collectedCount++;
        if (window.Sound) window.Sound.playClink();

        this.renderDiyNailsScreen();

        if (mg.collectedCount >= 10) {
            if (window.Sound) window.Sound.playBullseye();
            clearInterval(mg.timerInterval);
            setTimeout(() => {
                this.finishDiyNailsMinigame();
            }, 350);
        }
    }

    UIController.prototype.collectNextNailItem = function() {
        const mg = this.activeMinigame;
        if (!mg || mg.type !== 'diy_nails') return;
        const uncollected = mg.nails.find(n => !n.collected);
        if (uncollected) this.collectNailItem(uncollected.id);
    }

    UIController.prototype.finishDiyNailsMinigame = function() {
        const mg = this.activeMinigame;
        if (!mg || mg.type !== 'diy_nails') return;
        clearInterval(mg.timerInterval);

        const count = mg.collectedCount;
        let score = 25;
        let label = "🔴 Rushed Sweep (Nails Missed)";
        if (count >= 10) {
            score = 100;
            label = "🌟 100% Nail-Free Floor (Zero Hazards!)";
        } else if (count >= 8) {
            score = 80;
            label = "🟢 High-Clean Sweep";
        } else if (count >= 6) {
            score = 55;
            label = "🟡 Standard Sweep";
        }

        this.renderMinigameResults('diy', mg.taskId, [{ score: score, label: label }]);
    }

    // ------------------------------------------
    // DIY MINIGAME 6: RHYTHM HANDSAW TIMBER CUTTING
    // ------------------------------------------

})();
