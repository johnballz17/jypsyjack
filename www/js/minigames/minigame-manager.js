/**
 * Jack's Fixer Uper - Minigame: Minigame Manager, Keyboard & Modal Flow
 */
(function() {
    if (typeof UIController === "undefined") return;

    UIController.prototype.startRandomDiyMinigame = function(taskId) {
        // Direct thematic matchups for signature restoration tasks
        if (taskId === 'found_jack') {
            this.startDiyHydraulicMinigame(taskId);
            return;
        }
        if (taskId === 'ext_sandblast_ironwork') {
            this.startDiySandblastMinigame(taskId);
            return;
        }
        if (taskId === 'found_gut_plaster' || taskId === 'kit_demo' || taskId === 'bath_gut') {
            this.startDiyPlasterMinigame(taskId);
            return;
        }

        // Expanded 10-game random pool for variety!
        const types = ['hydraulic', 'sandblast', 'plaster', 'hammer', 'nails', 'saw', 'paint', 'level', 'scanner', 'timing'];
        const chosen = types[Math.floor(Math.random() * types.length)];
        if (chosen === 'hydraulic') {
            this.startDiyHydraulicMinigame(taskId);
        } else if (chosen === 'sandblast') {
            this.startDiySandblastMinigame(taskId);
        } else if (chosen === 'plaster') {
            this.startDiyPlasterMinigame(taskId);
        } else if (chosen === 'hammer') {
            this.startDiyHammerMinigame(taskId);
        } else if (chosen === 'nails') {
            this.startDiyNailsMinigame(taskId);
        } else if (chosen === 'saw') {
            this.startDiySawMinigame(taskId);
        } else if (chosen === 'paint') {
            this.startDiyPaintMinigame(taskId);
        } else if (chosen === 'level') {
            this.startDiyLevelMinigame(taskId);
        } else if (chosen === 'scanner') {
            this.startDiyScannerMinigame(taskId);
        } else {
            this.startDiyMinigame(taskId);
        }
    }

    UIController.prototype.startRandomSubMinigame = function(taskId) {
        const types = ['audit', 'blueprint', 'haggle', 'haul'];
        const chosen = types[Math.floor(Math.random() * types.length)];
        if (chosen === 'audit') {
            this.startSubMinigame(taskId);
        } else if (chosen === 'blueprint') {
            this.startSubBlueprintMinigame(taskId);
        } else if (chosen === 'haggle') {
            this.startSubHaggleMinigame(taskId);
        } else {
            this.startSubCrewHaulMinigame(taskId);
        }
    }

    UIController.prototype.renderMinigameResults = function(type, taskId, scoreData) {
        const g = window.Game;
        const task = g.getTask(taskId);
        if (!task) return;

        this.cancelMinigameTimeouts();

        const isDIY = type === 'diy';
        let successRatePct = 100;
        let successLabel = "Certified Municipal Code Pass";
        let qualityRatePct = 55;
        let qualityLabel = "Standard Workmanship";
        let progressRatePct = 50;
        let progressLabel = "Standard Efficiency";
        let valueBonusPct = 0;
        let cashRebate = 0;
        let refundAP = 0;
        let clutterDelta = 14;
        let qualityTag = "";

        let precisionBonus = 0;
        const effectiveMatCost = g.getMaterialCost ? g.getMaterialCost(taskId).cost : task.matCost;

        if (isDIY) {
            const scores = scoreData;
            const rawAvg = Math.round(scores.reduce((sum, s) => sum + s.score, 0) / Math.max(1, scores.length));
            // Organized, calibrated tools = Craftsmanship Precision bonus
            if (g.toolsOrganized) precisionBonus = Math.min(10, 100 - rawAvg);
            const avg = rawAvg + precisionBonus;

            if (avg >= 88) {
                successRatePct = 100;
                successLabel = "Historic Heritage Certified";
                qualityRatePct = 100;
                qualityLabel = "🌟 Masterpiece Craftsmanship";
                progressRatePct = 100;
                progressLabel = "Maximum Efficiency (Zero Waste)";
                valueBonusPct = 0.25;
                cashRebate = Math.round(effectiveMatCost * 0.15);
                refundAP = 1;
                clutterDelta = 0;
                qualityTag = "🌟 Masterpiece (100%)";
            } else if (avg >= 70) {
                successRatePct = 100;
                successLabel = "Code Compliance Certified";
                qualityRatePct = 80;
                qualityLabel = "🟢 Professional Heritage Grade";
                progressRatePct = 80;
                progressLabel = "High Workmanship Pace";
                valueBonusPct = 0.12;
                cashRebate = Math.round(effectiveMatCost * 0.08);
                refundAP = 0;
                clutterDelta = 5;
                qualityTag = "🟢 Professional (80%)";
            } else if (avg >= 45) {
                successRatePct = 100;
                successLabel = "Standard Code Pass";
                qualityRatePct = 55;
                qualityLabel = "🟡 Standard Workmanship";
                progressRatePct = 55;
                progressLabel = "Standard Pace";
                valueBonusPct = 0;
                cashRebate = 0;
                refundAP = 0;
                clutterDelta = 14;
                qualityTag = "🟡 Standard (55%)";
            } else {
                successRatePct = 90;
                successLabel = "Conditional Pass (Punch-List Items)";
                qualityRatePct = 25;
                qualityLabel = "🔴 Rough Finish";
                progressRatePct = 30;
                progressLabel = "Sluggish Pace";
                valueBonusPct = 0;
                cashRebate = 0;
                refundAP = 0;
                clutterDelta = 20;
                qualityTag = "🔴 Rough (25%)";
            }
        } else {
            const checkpoints = scoreData;
            const checkedCount = checkpoints.filter(c => c.checked).length;

            if (checkedCount === 4) {
                successRatePct = 100;
                successLabel = "100% Certified Inspection";
                qualityRatePct = 100;
                qualityLabel = "🌟 Flawless Contractor Execution";
                progressRatePct = 100;
                progressLabel = "Turnkey Masterclass (Clean Site)";
                valueBonusPct = 0.20;
                cashRebate = Math.round(task.subCost * 0.15);
                refundAP = 0;
                clutterDelta = 0;
                qualityTag = "🌟 Flawless GC Audit (100%)";
            } else if (checkedCount === 3) {
                successRatePct = 100;
                successLabel = "Code Passed & Approved";
                qualityRatePct = 80;
                qualityLabel = "🟢 Solid Reputable Contractor";
                progressRatePct = 80;
                progressLabel = "Controlled Job Site";
                valueBonusPct = 0.10;
                cashRebate = Math.round(task.subCost * 0.08);
                refundAP = 0;
                clutterDelta = 5;
                qualityTag = "🟢 Verified Contractor (80%)";
            } else if (checkedCount === 2) {
                successRatePct = 100;
                successLabel = "Standard Inspection Pass";
                qualityRatePct = 55;
                qualityLabel = "🟡 Standard Turnkey Delivery";
                progressRatePct = 55;
                progressLabel = "Standard Pace";
                valueBonusPct = 0;
                cashRebate = 0;
                refundAP = 0;
                clutterDelta = 14;
                qualityTag = "🟡 Standard Contract (55%)";
            } else {
                successRatePct = 85;
                successLabel = "Minimum Municipal Pass";
                qualityRatePct = 30;
                qualityLabel = "🔴 Rushed Unsupervised Crew";
                progressRatePct = 35;
                progressLabel = "Padded Markups Incurred";
                valueBonusPct = 0;
                cashRebate = 0;
                refundAP = 0;
                clutterDelta = 22;
                qualityTag = "🔴 Unsupervised (30%)";
            }
        }

        const baseVal = task.value;
        const finalVal = Math.round(baseVal * (1 + valueBonusPct));
        const valBonusAmt = finalVal - baseVal;

        const baseCost = isDIY ? effectiveMatCost : task.subCost;
        const finalCost = Math.max(0, baseCost - cashRebate);

        const baseAP = isDIY ? task.apCost : 0;
        const finalAP = Math.max(0, baseAP - refundAP);

        const modifiers = {
            valueBonusPct: valueBonusPct,
            cashRebate: cashRebate,
            refundAP: refundAP,
            clutterDelta: clutterDelta,
            qualityRating: qualityTag
        };

        this.pendingMinigameModifiers = {
            taskId: taskId,
            isDIY: isDIY,
            modifiers: modifiers
        };

        const body = document.getElementById('minigame-modal-body');
        const title = document.getElementById('minigame-title');
        if (title) {
            title.innerHTML = `🏆 Renovation Quality Inspection &bull; ${task.name}`;
        }
        if (!body) return;

        body.innerHTML = `
            <div class="results-screen-card">
                <div class="results-header-banner">
                    <span class="results-stamp-icon">${qualityRatePct >= 80 ? '🌟' : '📋'}</span>
                    <div>
                        <span class="results-mini-tag">${isDIY ? 'DIY HANDS-ON CRAFTSMANSHIP' : 'GENERAL CONTRACTOR OVERSIGHT'}</span>
                        <h3>${task.name}</h3>
                        <p>Restoration complete! Review your project performance rates below:</p>
                    </div>
                </div>

                ${precisionBonus > 0 ? `
                    <div class="results-precision-note">🧰 <strong>Craftsmanship Precision:</strong> your organized, calibrated tools added +${precisionBonus} to this score.</div>
                ` : ''}

                <!-- 3 RATES AS EXPLICITLY REQUESTED BY USER -->
                <div class="rates-trio-row">
                    <!-- 1. Success Rate -->
                    <div class="rate-gauge-box success">
                        <span class="rate-gauge-title">🎯 SUCCESS RATE</span>
                        <div class="rate-gauge-value">${successRatePct}%</div>
                        <span class="rate-gauge-desc">${successLabel}</span>
                        <div class="rate-bar-bg"><div class="rate-bar-fill" style="width:${successRatePct}%;"></div></div>
                    </div>

                    <!-- 2. Job Well Done Rate -->
                    <div class="rate-gauge-box quality">
                        <span class="rate-gauge-title">🌟 JOB WELL DONE RATE</span>
                        <div class="rate-gauge-value">${qualityRatePct}%</div>
                        <span class="rate-gauge-desc">${qualityLabel}</span>
                        <div class="rate-bar-bg"><div class="rate-bar-fill" style="width:${qualityRatePct}%;"></div></div>
                        ${valBonusAmt > 0 ? `
                            <span class="rate-perk-tag">+${Math.round(valueBonusPct * 100)}% ARV Bonus (+$${valBonusAmt.toLocaleString()})</span>
                        ` : ''}
                    </div>

                    <!-- 3. Overall Progress Rate -->
                    <div class="rate-gauge-box progress">
                        <span class="rate-gauge-title">⚡ OVERALL PROGRESS RATE</span>
                        <div class="rate-gauge-value">${progressRatePct}%</div>
                        <span class="rate-gauge-desc">${progressLabel}</span>
                        <div class="rate-bar-bg"><div class="rate-bar-fill" style="width:${progressRatePct}%;"></div></div>
                        ${cashRebate > 0 || refundAP > 0 ? `
                            <span class="rate-perk-tag">${cashRebate > 0 ? `+$${cashRebate.toLocaleString()} Rebate ` : ''}${refundAP > 0 ? `+${refundAP}⚡ AP ` : ''}</span>
                        ` : ''}
                    </div>
                </div>

                <!-- Financial & Property Impact Summary -->
                <div class="results-impact-ledger">
                    <div class="impact-ledger-row">
                        <span>Property Appraisal Gain:</span>
                        <strong style="color:var(--accent-green);">
                            +$${finalVal.toLocaleString()} 
                            ${valBonusAmt > 0 ? `<small style="color:var(--accent-gold);">(+$${valBonusAmt.toLocaleString()} Craftsmanship Bonus!)</small>` : ''}
                        </strong>
                    </div>
                    <div class="impact-ledger-row">
                        <span>Final Outlay:</span>
                        <strong>
                            $${finalCost.toLocaleString()}
                            ${cashRebate > 0 ? `<small style="color:var(--accent-green);">(-$${cashRebate.toLocaleString()} Rebate Saved)</small>` : ''}
                        </strong>
                    </div>
                    <div class="impact-ledger-row">
                        <span>Stamina Used:</span>
                        <strong>
                            ${finalAP} Stamina ⚡
                            ${refundAP > 0 ? `<small style="color:var(--accent-blue);">(Refunded 1 ⚡ Energy!)</small>` : ''}
                        </strong>
                    </div>
                    <div class="impact-ledger-row">
                        <span>Job Site Clutter:</span>
                        <strong style="color:${clutterDelta === 0 ? 'var(--accent-green)' : 'var(--text-main)'};">
                            ${clutterDelta === 0 ? '✨ 0 Clutter (Immaculate Zero-Waste Work)' : `+${clutterDelta}% Clutter`}
                        </strong>
                    </div>
                </div>

                <!-- Final Claim Button -->
                <div class="results-confirm-row">
                    <button class="btn-claim-project" onclick="UI.claimPendingMinigame()">
                        ✅ Apply Upgrades &amp; Update Whispering Pines
                    </button>
                </div>
            </div>
        `;

        if (qualityRatePct >= 80) {
            if (window.Sound) window.Sound.playBullseye();
        } else {
            if (window.Sound) window.Sound.playHammer();
        }
    }

    UIController.prototype.claimPendingMinigame = function() {
        if (!this.pendingMinigameModifiers) return;
        const { taskId, isDIY, modifiers } = this.pendingMinigameModifiers;
        this.pendingMinigameModifiers = null;
        this.cancelMinigame();

        if (this.activeDiyLumberType) {
            modifiers.useLumberType = this.activeDiyLumberType;
            this.activeDiyLumberType = null;
        }

        window.Game.performTask(taskId, isDIY, modifiers);

        if (window.Game.lastHazardIncident) {
            this.showHazardIncidentModal(window.Game.lastHazardIncident);
        }
    }

    UIController.prototype.autoFinishMinigame = function(taskId, isDIY) {
        this.cancelMinigame();
        const modifiers = {
            valueBonusPct: 0,
            cashRebate: 0,
            refundAP: 0,
            clutterDelta: 14,
            qualityRating: 'Auto-Finished (Standard 50%)',
            useLumberType: this.activeDiyLumberType || null
        };
        this.activeDiyLumberType = null;
        window.Game.performTask(taskId, isDIY, modifiers);

        if (window.Game.lastHazardIncident) {
            this.showHazardIncidentModal(window.Game.lastHazardIncident);
        }
    }

    UIController.prototype.cancelMinigame = function() {
        this.cancelMinigameTimeouts();
        this.unbindMinigameKeyboard();
        this.activeMinigame = null;
        this.pendingMinigameModifiers = null;

        const modal = document.getElementById('minigame-modal-overlay');
        if (modal) modal.style.display = 'none';
    }

    UIController.prototype.cancelMinigameTimeouts = function() {
        if (this.activeMinigame) {
            if (this.activeMinigame.animFrameId) {
                cancelAnimationFrame(this.activeMinigame.animFrameId);
                this.activeMinigame.animFrameId = null;
            }
            if (this.activeMinigame.timerInterval) {
                clearInterval(this.activeMinigame.timerInterval);
                this.activeMinigame.timerInterval = null;
            }
        }
    }

    UIController.prototype.bindMinigameKeyboard = function() {
        this.unbindMinigameKeyboard();
        this.minigameKeyHandler = (e) => {
            const mg = this.activeMinigame;
            if (!mg) return;

            if (e.key === 'Escape') {
                this.cancelMinigame();
                return;
            }

            if (e.code === 'Space' || e.key === ' ') {
                if (mg.type === 'diy' && !mg.isLocked) {
                    e.preventDefault();
                    this.handleDiyStrike();
                } else if (mg.type === 'diy_hammer' && !mg.isLocked) {
                    e.preventDefault();
                    this.strikeDiyHammer();
                } else if (mg.type === 'diy_nails') {
                    e.preventDefault();
                    const uncollected = mg.nails.find(n => !n.collected);
                    if (uncollected) this.collectNailItem(uncollected.id);
                } else if (mg.type === 'diy_saw') {
                    e.preventDefault();
                    const nextDir = mg.lastStrokeDir === 'push' ? 'pull' : 'push';
                    this.strokeDiySaw(nextDir);
                } else if (mg.type === 'diy_paint') {
                    e.preventDefault();
                    const unpainted = mg.boards.find(b => !b.painted);
                    if (unpainted) this.rollPaintBoard(unpainted.id);
                } else if (mg.type === 'diy_level' && !mg.isLocked) {
                    e.preventDefault();
                    this.handleDiyLevelLock();
                } else if (mg.type === 'diy_scanner' && !mg.isLocked) {
                    e.preventDefault();
                    this.handleDiyScannerDrill();
                } else if (mg.type === 'diy_hydraulic' && !mg.isLocked) {
                    e.preventDefault();
                    this.syncPumpLowestJack();
                } else if (mg.type === 'diy_sandblast') {
                    e.preventDefault();
                    this.blastNextSandblastTile();
                } else if (mg.type === 'diy_plaster' && !mg.isLocked) {
                    e.preventDefault();
                    this.handlePlasterSledgeSwing();
                } else if (mg.type === 'sub_haggle') {
                    e.preventDefault();
                    this.handleSubHaggleLock();
                } else if (mg.type === 'sub_crew_haul') {
                    e.preventDefault();
                    const unhauled = mg.debris.find(d => !d.hauled);
                    if (unhauled) this.haulCrewItem(unhauled.id);
                } else if (mg.type === 'sub') {
                    e.preventDefault();
                    const unchecked = mg.checkpoints.find(c => !c.checked);
                    if (unchecked) this.auditSubCheckpoint(unchecked.id);
                    else this.finishSubMinigame();
                } else if (mg.type === 'sub_blueprint') {
                    e.preventDefault();
                    const uninspectedFlaw = mg.items.find(i => i.isFlaw && !mg.caughtDefects.has(i.id));
                    if (uninspectedFlaw) this.auditBlueprintItem(uninspectedFlaw.id);
                    else this.finishSubBlueprintMinigame();
                }
            } else if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
                if (mg.type === 'diy_level' && !mg.isLocked) {
                    e.preventDefault();
                    this.tiltDiyLevel(-1);
                } else if (mg.type === 'diy_scanner' && !mg.isLocked) {
                    e.preventDefault();
                    this.slideDiyScanner(-8);
                } else if (mg.type === 'diy_saw') {
                    e.preventDefault();
                    this.strokeDiySaw('pull');
                }
            } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
                if (mg.type === 'diy_level' && !mg.isLocked) {
                    e.preventDefault();
                    this.tiltDiyLevel(1);
                } else if (mg.type === 'diy_scanner' && !mg.isLocked) {
                    e.preventDefault();
                    this.slideDiyScanner(8);
                } else if (mg.type === 'diy_saw') {
                    e.preventDefault();
                    this.strokeDiySaw('push');
                }
            } else if ((e.key === '1' || e.key === '2' || e.key === '3' || e.key === '4') && mg.type === 'diy_hydraulic' && !mg.isLocked) {
                e.preventDefault();
                const jackIdx = parseInt(e.key, 10) - 1;
                this.pumpHydraulicJack(jackIdx);
            }
        };
        if (typeof window !== 'undefined' && window.addEventListener) {
            window.addEventListener('keydown', this.minigameKeyHandler);
        }
    }

    UIController.prototype.unbindMinigameKeyboard = function() {
        if (this.minigameKeyHandler) {
            if (typeof window !== 'undefined' && window.removeEventListener) {
                window.removeEventListener('keydown', this.minigameKeyHandler);
            }
            this.minigameKeyHandler = null;
        }
    }
})();
