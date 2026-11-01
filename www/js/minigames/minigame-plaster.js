/**
 * Jack's Fixer Uper - Minigame: 1,100-lb Dead Load Plaster Sledgehammer
 */
(function() {
    if (typeof UIController === "undefined") return;

    UIController.prototype.startDiyPlasterMinigame = function(taskId) {
        const g = window.Game;
        const task = g.getTask(taskId);
        if (!task) return;

        this.cancelMinigame();

        const wallSections = [
            { id: 0, name: "Upper Lath Crown", weight: 190, currentWeight: 190, cracks: 0 },
            { id: 1, name: "Middle Parlor Partition", weight: 220, currentWeight: 220, cracks: 0 },
            { id: 2, name: "Lower Baseboard Bay", weight: 180, currentWeight: 180, cracks: 0 },
            { id: 3, name: "Pocket Door Cavity Lath", weight: 210, currentWeight: 210, cracks: 0 },
            { id: 4, name: "Diagonal Shear Brace Plaster", weight: 160, currentWeight: 160, cracks: 0 },
            { id: 5, name: "Central Stud Bay Lime Coat", weight: 140, currentWeight: 140, cracks: 0 }
        ];

        this.activeMinigame = {
            type: 'diy_plaster',
            taskId: taskId,
            task: task,
            sections: wallSections,
            initialWeight: 1100,
            weightRemaining: 1100,
            totalSwings: 0,
            pos: 15,
            dir: 1,
            animFrameId: null,
            isLocked: false,
            lastTime: performance.now()
        };

        const modal = document.getElementById('minigame-modal-overlay');
        const title = document.getElementById('minigame-title');
        if (!modal) return;
        if (title) title.innerHTML = `🔨 1,100-lb Plaster Wall Sledgehammer Demo &bull; ${task.name}`;

        this.renderDiyPlasterScreen();
        modal.style.display = 'flex';
        if (window.Sound) window.Sound.playClick();

        this.bindMinigameKeyboard();
        this.startDiyPlasterLoop();
    }

    UIController.prototype.renderDiyPlasterScreen = function() {
        const mg = this.activeMinigame;
        if (!mg || mg.type !== 'diy_plaster') return;
        const task = mg.task;
        const body = document.getElementById('minigame-modal-body');
        if (!body) return;

        const weightShed = mg.initialWeight - mg.weightRemaining;
        const pctShed = Math.round((weightShed / mg.initialWeight) * 100);

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

                <!-- 1,100-lb Dead Load Shed Banner -->
                <div class="plaster-load-banner">
                    <div>
                        <div style="font-size:0.75rem; color:#94a3b8; text-transform:uppercase; letter-spacing:0.5px;">60-Ton Frame Dead Load Shed:</div>
                        <strong class="plaster-weight-readout">${mg.weightRemaining} LBS REMAINING</strong>
                    </div>
                    <div style="text-align:right;">
                        <span style="font-size:0.85rem; color:#10b981; font-weight:800;">-${weightShed} LBS SHED (${pctShed}%)</span>
                        <div class="rate-bar-bg" style="width:160px; margin-top:4px;">
                            <div class="rate-bar-fill" style="width:${pctShed}%; background:#10b981;"></div>
                        </div>
                    </div>
                </div>

                <!-- Timing Gauge for Sledgehammer Swing -->
                <div class="stage-instructions-banner">
                    <strong>10-lb Sledgehammer Swing Timing:</strong> Hit the center green zone for maximum impact that shatters full lath keys without damaging studs!
                </div>

                <div class="diy-gauge-area" onclick="UI.handlePlasterSledgeSwing()">
                    <div class="diy-meter-track">
                        <div class="zone-segment zone-rough-l"><span>Glancing (25)</span></div>
                        <div class="zone-segment zone-standard-l"><span>Solid (55)</span></div>
                        <div class="zone-segment zone-bullseye"><span>💥 DIRECT SLEDGE HIT (100)</span></div>
                        <div class="zone-segment zone-standard-r"><span>Solid (55)</span></div>
                        <div class="zone-segment zone-rough-r"><span>Glancing (25)</span></div>

                        <div class="diy-meter-needle" id="plaster-needle" style="left:${mg.pos}%;">
                            <div class="needle-tip-top">▼</div>
                            <div class="needle-line"></div>
                            <div class="needle-tip-bottom">▲</div>
                        </div>
                    </div>
                </div>

                <!-- 6 Wall Plaster & Lath Partition Sections -->
                <div class="plaster-wall-grid">
                    ${mg.sections.map((sec, idx) => {
                        const isShattered = sec.currentWeight <= 0;
                        const crackClass = isShattered ? 'shattered' : (sec.cracks > 0 ? 'cracked-1' : '');
                        return `
                            <div class="plaster-section-card ${crackClass}" onclick="UI.handlePlasterSledgeSwing(${idx})">
                                <div class="plaster-section-name">${isShattered ? '🪵 ' + sec.name : '🧱 ' + sec.name}</div>
                                <div class="plaster-section-mass">
                                    ${isShattered ? '0 lbs (100% Shed)' : `${sec.currentWeight} lbs Lime Plaster`}
                                </div>
                                ${isShattered ? '<div class="plaster-stud-reveal-text">✓ Virgin Fir Stud Exposed</div>' : ''}
                            </div>
                        `;
                    }).join('')}
                </div>

                <!-- Mobile / Touch Controls -->
                <div class="mobile-minigame-touchpad">
                    <button class="btn-touch-action btn-touch-primary" onclick="UI.handlePlasterSledgeSwing()" style="width:100%; max-width:420px; font-size:1rem;">
                        🔨 Swing 10-lb Sledgehammer [TAP / SPACEBAR]
                    </button>
                </div>

                <!-- Controls -->
                <div class="diy-controls-row">
                    <button id="btn-plaster-swing" class="btn-diy-strike" onclick="UI.handlePlasterSledgeSwing()">
                        🔨 SWING 10-LB SLEDGEHAMMER [SPACEBAR]
                    </button>
                    <button class="btn-skip-minigame" onclick="UI.autoFinishMinigame('${task.id}', true)">
                        ⚡ Auto-Finish (Standard 50% Rate)
                    </button>
                </div>
            </div>
        `;
    }

    UIController.prototype.startDiyPlasterLoop = function() {
        const loop = (currentTime) => {
            if (!this.activeMinigame || this.activeMinigame.type !== 'diy_plaster') return;
            const mg = this.activeMinigame;

            if (!mg.isLocked) {
                const dt = Math.min(0.05, (currentTime - mg.lastTime) / 1000);
                mg.lastTime = currentTime;

                mg.pos += mg.dir * 2.2 * 45 * dt;
                if (mg.pos >= 100) {
                    mg.pos = 100;
                    mg.dir = -1;
                } else if (mg.pos <= 0) {
                    mg.pos = 0;
                    mg.dir = 1;
                }

                const needleEl = document.getElementById('plaster-needle');
                if (needleEl) needleEl.style.left = `${mg.pos}%`;
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

    UIController.prototype.handlePlasterSledgeSwing = function(targetIdx = null) {
        const mg = this.activeMinigame;
        if (!mg || mg.type !== 'diy_plaster' || mg.isLocked) return;

        let target = null;
        if (targetIdx !== null && mg.sections[targetIdx] && mg.sections[targetIdx].currentWeight > 0) {
            target = mg.sections[targetIdx];
        } else {
            target = mg.sections.find(s => s.currentWeight > 0);
        }
        if (!target) return;

        mg.totalSwings++;

        const dist = Math.abs(mg.pos - 50);
        let weightDrop = 90;
        if (dist <= 10) {
            weightDrop = target.currentWeight;
            if (window.Sound) {
                window.Sound.playSledge();
                window.Sound.playBullseye();
            }
        } else if (dist <= 25) {
            weightDrop = Math.min(target.currentWeight, Math.round(target.weight * 0.6));
            if (window.Sound) window.Sound.playSledge();
        } else {
            weightDrop = Math.min(target.currentWeight, Math.round(target.weight * 0.35));
            if (window.Sound) window.Sound.playHammer();
        }

        target.currentWeight = Math.max(0, target.currentWeight - weightDrop);
        target.cracks++;

        mg.weightRemaining = mg.sections.reduce((sum, s) => sum + s.currentWeight, 0);

        if (mg.weightRemaining <= 0) {
            mg.isLocked = true;
            if (window.Sound) {
                window.Sound.playThud();
                window.Sound.playBullseye();
            }
            this.renderDiyPlasterScreen();
            setTimeout(() => {
                this.finishDiyPlasterMinigame();
            }, 500);
            return;
        }

        this.renderDiyPlasterScreen();
    }

    UIController.prototype.finishDiyPlasterMinigame = function() {
        const mg = this.activeMinigame;
        if (!mg || mg.type !== 'diy_plaster') return;

        let score = 55;
        let label = "🟡 Standard Plaster Demo (1,100 lbs Shed)";
        if (mg.totalSwings <= 8) {
            score = 100;
            label = "🌟 Surgical Plaster Demo (1,100 lbs Shed, Pristine Old-Growth Studs!)";
        } else if (mg.totalSwings <= 11) {
            score = 80;
            label = "🟢 High-Efficiency Lath Stripping";
        }

        this.renderMinigameResults('diy', mg.taskId, [{ score: score, label: label }]);
    }

})();
