/**
 * Jack's Fixer Uper - Minigame: High-Pressure Garnet Sandblaster
 */
(function() {
    if (typeof UIController === "undefined") return;

    UIController.prototype.startDiySandblastMinigame = function(taskId) {
        const g = window.Game;
        const task = g.getTask(taskId);
        if (!task) return;

        this.cancelMinigame();

        const tiles = [];
        const types = [
            { icon: '🟤', label: 'Calcified Rust' },
            { icon: '⬛', label: '1910 Lead Paint' },
            { icon: '🪵', label: 'Centennial Grime' }
        ];
        for (let i = 0; i < 24; i++) {
            const t = types[i % types.length];
            tiles.push({
                id: i,
                icon: t.icon,
                label: t.label,
                cleaned: false
            });
        }

        this.activeMinigame = {
            type: 'diy_sandblast',
            taskId: taskId,
            task: task,
            tiles: tiles,
            cleanedCount: 0,
            timeLeft: 8.0,
            totalTime: 8.0,
            timerInterval: null
        };

        const modal = document.getElementById('minigame-modal-overlay');
        const title = document.getElementById('minigame-title');
        if (!modal) return;
        if (title) title.innerHTML = `💨 Pneumatic Sandblaster & Media Hopper &bull; ${task.name}`;

        this.renderDiySandblastScreen();
        modal.style.display = 'flex';
        if (window.Sound) window.Sound.playClick();

        this.bindMinigameKeyboard();

        const startTime = Date.now();
        this.activeMinigame.timerInterval = setInterval(() => {
            if (!this.activeMinigame || this.activeMinigame.type !== 'diy_sandblast') {
                clearInterval(this.activeMinigame?.timerInterval);
                return;
            }
            const elapsed = (Date.now() - startTime) / 1000;
            const remaining = Math.max(0, 8.0 - elapsed);
            this.activeMinigame.timeLeft = remaining;

            const timeBar = document.getElementById('blast-timer-bar-fill');
            const timeText = document.getElementById('blast-timer-text');
            if (timeBar) timeBar.style.width = `${(remaining / 8.0) * 100}%`;
            if (timeText) timeText.textContent = `${remaining.toFixed(1)}s media remaining`;

            if (remaining <= 0) {
                clearInterval(this.activeMinigame.timerInterval);
                this.finishDiySandblastMinigame();
            }
        }, 100);
    }

    UIController.prototype.renderDiySandblastScreen = function() {
        const mg = this.activeMinigame;
        if (!mg || mg.type !== 'diy_sandblast') return;
        const task = mg.task;
        const body = document.getElementById('minigame-modal-body');
        if (!body) return;

        const pctClean = Math.round((mg.cleanedCount / 24) * 100);

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
                        <span><strong>High-Pressure Garnet Sandblaster:</strong> Sweep nozzle across all 24 ironwork sections to blast rust down to bare metal!</span>
                        <strong id="blast-timer-text" class="sub-timer-clock">${mg.timeLeft.toFixed(1)}s media remaining</strong>
                    </div>
                    <div class="sub-timer-bar-bg">
                        <div class="sub-timer-bar-fill" id="blast-timer-bar-fill" style="width:${(mg.timeLeft / mg.totalTime) * 100}%;"></div>
                    </div>
                </div>

                <div class="sandblast-arena-box">
                    <div style="display:flex; justify-content:space-between; align-items:center; font-size:0.85rem;">
                        <span>CAST IRON BALUSTRADE RESTORATION:</span>
                        <strong style="color:#38bdf8; font-size:1.1rem;">${mg.cleanedCount} / 24 RESTORED (${pctClean}%)</strong>
                    </div>

                    <div class="sandblast-tiles-grid">
                        ${mg.tiles.map(tile => `
                            <div class="sandblast-tile ${tile.cleaned ? 'cleaned' : 'crusted'}" 
                                 onclick="UI.blastSandblastTile(${tile.id})"
                                 onmouseover="UI.blastSandblastTile(${tile.id})">
                                <span class="tile-icon">${tile.cleaned ? '✨' : tile.icon}</span>
                                <span class="tile-label">${tile.cleaned ? 'Restored Iron' : tile.label}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <!-- Mobile / Touch Controls -->
                <div class="mobile-minigame-touchpad">
                    <button class="btn-touch-action btn-touch-primary" onclick="UI.blastNextSandblastTile()" style="width:100%; max-width:420px; font-size:1rem;">
                        💨 Sweep Blast Nozzle / Next Section [TAP / SPACEBAR]
                    </button>
                </div>

                <div class="sub-controls-row">
                    <div class="sub-audit-summary">
                        <span>Hover or sweep mouse to blast &bull; Press [SPACEBAR] to blast next section</span>
                    </div>
                    <button class="btn-skip-minigame" onclick="UI.autoFinishMinigame('${task.id}', true)">
                        ⚡ Auto-Finish (Standard 50% Rate)
                    </button>
                </div>
            </div>
        `;
    }

    UIController.prototype.blastSandblastTile = function(idx) {
        const mg = this.activeMinigame;
        if (!mg || mg.type !== 'diy_sandblast') return;
        const tile = mg.tiles[idx];
        if (!tile || tile.cleaned) return;

        tile.cleaned = true;
        mg.cleanedCount++;
        if (window.Sound) window.Sound.playBlast();

        this.renderDiySandblastScreen();

        if (mg.cleanedCount >= 24) {
            clearInterval(mg.timerInterval);
            if (window.Sound) window.Sound.playBullseye();
            setTimeout(() => {
                this.finishDiySandblastMinigame();
            }, 350);
        }
    }

    UIController.prototype.blastNextSandblastTile = function() {
        const mg = this.activeMinigame;
        if (!mg || mg.type !== 'diy_sandblast') return;
        const uncleaned = mg.tiles.find(t => !t.cleaned);
        if (uncleaned) {
            this.blastSandblastTile(uncleaned.id);
        }
    }

    UIController.prototype.finishDiySandblastMinigame = function() {
        const mg = this.activeMinigame;
        if (!mg || mg.type !== 'diy_sandblast') return;
        clearInterval(mg.timerInterval);

        const count = mg.cleanedCount;
        let score = 25;
        let label = "🔴 Rushed Sandblasting (Rust Remaining)";

        if (count >= 22) {
            score = 100;
            label = "🌟 Mirror-Polished Architectural Cast Iron (Masterpiece!)";
        } else if (count >= 18) {
            score = 80;
            label = "🟢 High-Purity Garnet Media Stripping";
        } else if (count >= 13) {
            score = 55;
            label = "🟡 Standard Blasting Profile";
        }

        this.renderMinigameResults('diy', mg.taskId, [{ score: score, label: label }]);
    }

    // ------------------------------------------
    // DIY MINIGAME 10: 1,100-LB PLASTER SLEDGEHAMMER DEMO
    // ------------------------------------------

})();
