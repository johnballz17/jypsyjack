/**
 * Jack's Fixer Uper - Minigame: 20-Ton Hydraulic Jack Leveling & Manifold
 */
(function() {
    if (typeof UIController === "undefined") return;

    UIController.prototype.startDiyHydraulicMinigame = function(taskId) {
        const g = window.Game;
        const task = g.getTask(taskId);
        if (!task) return;

        this.cancelMinigame();

        this.activeMinigame = {
            type: 'diy_hydraulic',
            taskId: taskId,
            task: task,
            jacks: [
                { id: 'nw', name: "Jack #1: NW Corner", room: "Parlor Hearth", height: 0.0, psi: 2800 },
                { id: 'ne', name: "Jack #2: NE Corner", room: "Country Kitchen", height: 0.0, psi: 2900 },
                { id: 'sw', name: "Jack #3: SW Corner", room: "Solarium Pier", height: 0.0, psi: 3100 },
                { id: 'se', name: "Jack #4: SE Corner", room: "Center Carrier", height: 0.0, psi: 3200 }
            ],
            targetHeight: 3.5,
            maxShearStress: 0.0,
            stressWarnings: 0,
            isLocked: false,
            totalPumps: 0
        };

        const modal = document.getElementById('minigame-modal-overlay');
        const title = document.getElementById('minigame-title');
        if (!modal) return;
        if (title) title.innerHTML = `🧱 20-Ton Hydraulic Jack Leveling &bull; ${task.name}`;

        this.renderDiyHydraulicScreen();
        modal.style.display = 'flex';
        if (window.Sound) window.Sound.playClick();

        this.bindMinigameKeyboard();
    }

    UIController.prototype.renderDiyHydraulicScreen = function() {
        const mg = this.activeMinigame;
        if (!mg || mg.type !== 'diy_hydraulic') return;
        const task = mg.task;
        const body = document.getElementById('minigame-modal-body');
        if (!body) return;

        const heights = mg.jacks.map(j => j.height);
        const minH = Math.min(...heights);
        const maxH = Math.max(...heights);
        const currentDiff = maxH - minH;
        const avgH = heights.reduce((a, b) => a + b, 0) / 4;
        const pctDone = Math.min(100, Math.round((avgH / mg.targetHeight) * 100));

        let statusLabel = "✓ BALANCED BEDROCK LIFT";
        let statusClass = "status-balanced";
        if (currentDiff > 0.5) {
            statusLabel = "⚠️ DANGER: 60-TON FRAME SHEAR / RACKING!";
            statusClass = "status-danger";
        } else if (currentDiff > 0.3) {
            statusLabel = "⚠️ WARNING: TILT SKEW DETECTED (>0.30\")";
            statusClass = "status-warning";
        }

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

                <!-- Structural Manifold Monitor -->
                <div class="hydraulic-manifold-banner">
                    <div>
                        <div style="font-size:0.75rem; color:#94a3b8; text-transform:uppercase; letter-spacing:0.5px;">60-Ton Center Beam Elevation:</div>
                        <strong style="font-size:1.25rem; color:#f8fafc;">${avgH.toFixed(2)}" / ${mg.targetHeight.toFixed(2)}" Lifted (${pctDone}%)</strong>
                    </div>
                    <div style="text-align:center;">
                        <div style="font-size:0.75rem; color:#94a3b8; text-transform:uppercase;">Corner Shear Delta:</div>
                        <strong style="font-size:1.2rem; color:${currentDiff > 0.5 ? '#ef4444' : currentDiff > 0.3 ? '#f59e0b' : '#10b981'};">±${currentDiff.toFixed(2)}"</strong>
                    </div>
                    <div>
                        <span class="hydraulic-balance-badge ${statusClass}">${statusLabel}</span>
                    </div>
                </div>

                <!-- 4 Synchronized 20-Ton Hydraulic Jacks -->
                <div class="hydraulic-jacks-grid">
                    ${mg.jacks.map((jack, idx) => {
                        const isAtTarget = jack.height >= mg.targetHeight;
                        const pistonHeightPct = Math.round((jack.height / mg.targetHeight) * 65);
                        return `
                            <div class="hydraulic-jack-card ${isAtTarget ? 'at-target' : ''}">
                                <div class="hydraulic-corner-label">${jack.name}</div>
                                <div class="hydraulic-room-label">${jack.room}</div>
                                
                                <div class="hydraulic-ram-visual">
                                    <div class="hydraulic-piston-stem" style="height:${Math.max(6, pistonHeightPct)}%;"></div>
                                    <div class="hydraulic-base-cylinder">20T</div>
                                </div>

                                <div class="hydraulic-height-readout">${jack.height.toFixed(2)}"</div>
                                <div class="hydraulic-psi-readout">${jack.psi.toLocaleString()} PSI</div>

                                <button class="btn-pump-jack" ${isAtTarget || mg.isLocked ? 'disabled' : ''} onclick="UI.pumpHydraulicJack(${idx})">
                                    ${isAtTarget ? '✓ Level' : `+0.25" Pump [${idx + 1}]`}
                                </button>
                            </div>
                        `;
                    }).join('')}
                </div>

                <!-- Mobile / Quick Touch Controls -->
                <div class="mobile-minigame-touchpad">
                    <button class="btn-touch-action" onclick="UI.pumpHydraulicJack(0)">[1] NW Jack</button>
                    <button class="btn-touch-action" onclick="UI.pumpHydraulicJack(1)">[2] NE Jack</button>
                    <button class="btn-touch-action" onclick="UI.pumpHydraulicJack(2)">[3] SW Jack</button>
                    <button class="btn-touch-action" onclick="UI.pumpHydraulicJack(3)">[4] SE Jack</button>
                    <button class="btn-touch-action btn-touch-primary" onclick="UI.syncPumpLowestJack()">⚡ Sync Pump</button>
                </div>

                <!-- Controls Row -->
                <div class="diy-controls-row">
                    <button id="btn-sync-pump" class="btn-diy-strike" onclick="UI.syncPumpLowestJack()">
                        ⚡ SYNC-PUMP LOWEST JACK [SPACEBAR]
                    </button>
                    <button class="btn-skip-minigame" onclick="UI.autoFinishMinigame('${task.id}', true)">
                        ⚡ Auto-Finish (Standard 50% Rate)
                    </button>
                </div>
            </div>
        `;
    }

    UIController.prototype.pumpHydraulicJack = function(idx) {
        const mg = this.activeMinigame;
        if (!mg || mg.type !== 'diy_hydraulic' || mg.isLocked) return;
        const jack = mg.jacks[idx];
        if (!jack || jack.height >= mg.targetHeight) return;

        mg.totalPumps++;
        jack.height = Math.min(mg.targetHeight, parseFloat((jack.height + 0.25).toFixed(2)));
        jack.psi = Math.round(2600 + (jack.height / mg.targetHeight) * 4800 + Math.random() * 200);

        const heights = mg.jacks.map(j => j.height);
        const diff = Math.max(...heights) - Math.min(...heights);
        mg.maxShearStress = Math.max(mg.maxShearStress, diff);

        if (diff > 0.5) {
            mg.stressWarnings++;
            if (window.Sound) window.Sound.playError();
        } else {
            if (window.Sound) window.Sound.playHydraulic();
        }

        const allLeveled = mg.jacks.every(j => j.height >= mg.targetHeight);
        if (allLeveled) {
            mg.isLocked = true;
            if (window.Sound) window.Sound.playBullseye();
            this.renderDiyHydraulicScreen();
            setTimeout(() => {
                this.finishDiyHydraulicMinigame();
            }, 500);
            return;
        }

        this.renderDiyHydraulicScreen();
    }

    UIController.prototype.syncPumpLowestJack = function() {
        const mg = this.activeMinigame;
        if (!mg || mg.type !== 'diy_hydraulic' || mg.isLocked) return;

        let lowestIdx = -1;
        let lowestHeight = Infinity;
        mg.jacks.forEach((j, idx) => {
            if (j.height < mg.targetHeight && j.height < lowestHeight) {
                lowestHeight = j.height;
                lowestIdx = idx;
            }
        });

        if (lowestIdx >= 0) {
            this.pumpHydraulicJack(lowestIdx);
        }
    }

    UIController.prototype.finishDiyHydraulicMinigame = function() {
        const mg = this.activeMinigame;
        if (!mg || mg.type !== 'diy_hydraulic') return;

        let score = 55;
        let label = "🟡 Rough Hydraulic Lift (Structural Groaning)";
        if (mg.maxShearStress <= 0.35 && mg.stressWarnings === 0) {
            score = 100;
            label = "🌟 True Bedrock Level! (0.0° Frame Racking, Perfect Balance)";
        } else if (mg.maxShearStress <= 0.55 && mg.stressWarnings <= 2) {
            score = 80;
            label = "🟢 High-Precision 3.5-Inch Bedrock Lift";
        }

        this.renderMinigameResults('diy', mg.taskId, [{ score: score, label: label }]);
    }

    // ------------------------------------------
    // DIY MINIGAME 9: HIGH-PRESSURE SANDBLASTER & MEDIA HOPPER
    // ------------------------------------------

})();
