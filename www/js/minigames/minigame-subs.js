/**
 * Jack's Fixer Uper - Minigame: Subcontractor Inspection, Haggle & Haul
 */
(function() {
    if (typeof UIController === "undefined") return;

    UIController.prototype.startSubMinigame = function(taskId) {
        const g = window.Game;
        const task = g.getTask(taskId);
        if (!task) return;

        this.cancelMinigame();

        this.activeMinigame = {
            type: 'sub',
            taskId: taskId,
            task: task,
            totalTime: 8.0,
            timeLeft: 8.0,
            timerInterval: null,
            checkpoints: [
                {
                    id: 'plumb',
                    icon: '📐',
                    title: 'Laser Plumb & Level Verification',
                    desc: 'Audit framing slopes, bubble levels & joinery square before dry-in.',
                    checked: false
                },
                {
                    id: 'code',
                    icon: '📋',
                    title: 'Municipal Building Code Spec',
                    desc: 'Inspect fastener spacing, structural load points & fire stops.',
                    checked: false
                },
                {
                    id: 'invoice',
                    icon: '🧾',
                    title: 'Line-Item Invoice Markup Audit',
                    desc: 'Dispute padded supply-chain surcharges & redundant equipment fees.',
                    checked: false
                },
                {
                    id: 'cleanup',
                    icon: '🧹',
                    title: 'Crew Scrap & Sweep Mandate',
                    desc: 'Mandate crew to haul away scrap off the lawn and sweep sawdust clean.',
                    checked: false
                }
            ]
        };

        const modal = document.getElementById('minigame-modal-overlay');
        const title = document.getElementById('minigame-title');
        if (!modal) return;

        if (title) {
            title.innerHTML = `👷 Subcontractor Site Audit & Oversight &bull; ${task.name}`;
        }

        this.renderSubScreen();
        modal.style.display = 'flex';
        if (window.Sound) window.Sound.playClick();

        const startTime = Date.now();
        const totalDuration = this.activeMinigame.totalTime;

        this.activeMinigame.timerInterval = setInterval(() => {
            if (!this.activeMinigame || this.activeMinigame.type !== 'sub') {
                clearInterval(this.activeMinigame?.timerInterval);
                return;
            }

            const elapsed = (Date.now() - startTime) / 1000;
            const remaining = Math.max(0, totalDuration - elapsed);
            this.activeMinigame.timeLeft = remaining;

            const timeBar = document.getElementById('sub-timer-bar-fill');
            const timeText = document.getElementById('sub-timer-text');
            if (timeBar) {
                timeBar.style.width = `${(remaining / totalDuration) * 100}%`;
            }
            if (timeText) {
                timeText.textContent = `${remaining.toFixed(1)}s remaining`;
            }

            if (remaining <= 0) {
                clearInterval(this.activeMinigame.timerInterval);
                this.finishSubMinigame();
            }
        }, 100);
    }

    UIController.prototype.renderSubScreen = function() {
        const mg = this.activeMinigame;
        if (!mg || mg.type !== 'sub') return;
        const task = mg.task;
        const body = document.getElementById('minigame-modal-body');
        if (!body) return;

        const checkedCount = mg.checkpoints.filter(c => c.checked).length;

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
                        <div class="cost-badge"><span>Turnkey Fee:</span> <strong>$${task.subCost.toLocaleString()}</strong></div>
                        <div class="cost-badge"><span>Stamina Needed:</span> <strong>0 ⚡ (Turnkey)</strong></div>
                        <div class="cost-badge arv"><span>Base ARV Gain:</span> <strong>+$${task.value.toLocaleString()}</strong></div>
                    </div>
                </div>

                <!-- Timer & Instructions -->
                <div class="sub-timer-container">
                    <div class="sub-timer-header">
                        <span><strong>General Contractor Oversight:</strong> Click each checkpoint to audit the crew before they leave!</span>
                        <strong id="sub-timer-text" class="sub-timer-clock">${mg.timeLeft.toFixed(1)}s remaining</strong>
                    </div>
                    <div class="sub-timer-bar-bg">
                        <div class="sub-timer-bar-fill" id="sub-timer-bar-fill" style="width:${(mg.timeLeft / mg.totalTime) * 100}%;"></div>
                    </div>
                </div>

                <!-- 4 Interactive Checkpoint Cards -->
                <div class="sub-checkpoints-grid">
                    ${mg.checkpoints.map(cp => `
                        <div class="sub-checkpoint-card ${cp.checked ? 'audited' : ''}" onclick="UI.auditSubCheckpoint('${cp.id}')">
                            <div class="cp-top">
                                <span class="cp-icon">${cp.icon}</span>
                                <div class="cp-titles">
                                    <h4>${cp.title}</h4>
                                    <small>${cp.desc}</small>
                                </div>
                            </div>
                            <div class="cp-status">
                                ${cp.checked ? `
                                    <span class="stamp-audited">✓ AUDITED &amp; APPROVED</span>
                                ` : `
                                    <button class="btn-audit-stamp">🔍 Click to Audit</button>
                                `}
                            </div>
                        </div>
                    `).join('')}
                </div>

                <!-- Mobile / Touch Controls -->
                <div class="mobile-minigame-touchpad">
                    <button class="btn-touch-action btn-touch-primary" onclick="UI.auditNextCheckpoint()" style="width:100%; max-width:420px; font-size:1rem;">
                        📋 Inspect Next Code Checkpoint [TAP / SPACEBAR]
                    </button>
                </div>

                <!-- Oversight Bottom Bar -->
                <div class="sub-controls-row">
                    <div class="sub-audit-summary">
                        <span>Audited: <strong>${checkedCount} / 4 Checkpoints</strong></span>
                    </div>
                    <button class="btn-skip-minigame" onclick="UI.autoFinishMinigame('${task.id}', false)">
                        ⚡ Auto-Finish (Standard 50% Rate)
                    </button>
                </div>
            </div>
        `;
    }

    UIController.prototype.auditSubCheckpoint = function(cpId) {
        const mg = this.activeMinigame;
        if (!mg || mg.type !== 'sub') return;

        const cp = mg.checkpoints.find(c => c.id === cpId);
        if (!cp || cp.checked) return;

        cp.checked = true;
        if (window.Sound) window.Sound.playCash();

        this.renderSubScreen();

        const allChecked = mg.checkpoints.every(c => c.checked);
        if (allChecked) {
            if (window.Sound) window.Sound.playBullseye();
            clearInterval(mg.timerInterval);
            setTimeout(() => {
                this.finishSubMinigame();
            }, 350);
        }
    }

    UIController.prototype.auditNextCheckpoint = function() {
        const mg = this.activeMinigame;
        if (!mg || mg.type !== 'sub') return;
        const unchecked = mg.checkpoints.find(c => !c.checked);
        if (unchecked) this.auditSubCheckpoint(unchecked.id);
        else this.finishSubMinigame();
    }

    UIController.prototype.finishSubMinigame = function() {
        const mg = this.activeMinigame;
        if (!mg || mg.type !== 'sub') return;
        clearInterval(mg.timerInterval);
        this.renderMinigameResults('sub', mg.taskId, mg.checkpoints);
    }

    // ------------------------------------------
    // SUBCONTRACTOR MINIGAME 2: CODE DEFECT SPOTTER
    // ------------------------------------------

    UIController.prototype.startSubBlueprintMinigame = function(taskId) {
        const g = window.Game;
        const task = g.getTask(taskId);
        if (!task) return;

        this.cancelMinigame();

        const defectPool = [
            { id: 'd1', title: '🚨 Unprotected PEX Line Against Flue', desc: 'Hot chimney exhaust will melt plastic water line. Violates mechanical clearance code!', isFlaw: true },
            { id: 'd2', title: '🚨 Missing Steel Nail Plates on Studs', desc: 'Wiring routed through studs lacks 16-gauge steel strike plate protection from drywall screws.', isFlaw: true },
            { id: 'd3', title: '🚨 Ungrounded 2-Prong Outlet Near Sink', desc: 'Wet zone installation lacks essential GFCI ground-fault shock interrupt breaker.', isFlaw: true },
            { id: 'd4', title: '🚨 Floor Joist Notched Past 1/3 Depth', desc: 'Subcontractor cut structural floor beam without installing steel sistering headers.', isFlaw: true },
            { id: 'd5', title: '🚨 Sewer Cleanout Omitted at Stack', desc: 'Drain stack lacks threaded 4-inch sewer cleanout tee for pipe inspection camera access.', isFlaw: true }
        ];

        const compliantPool = [
            { id: 'c1', title: '✅ 16-Inch On-Center Framing Anchors', desc: 'Framing passes deflection criteria under current national building codes.', isFlaw: false },
            { id: 'c2', title: '✅ 3/4-Inch PEX-A Home-Run Manifold', desc: 'Commercial multiport water manifold with individual brass quarter-turn shutoffs.', isFlaw: false },
            { id: 'c3', title: '✅ UL-Listed Tamper-Resistant 20A Outlets', desc: 'Safety internal shutters prevent child foreign object insertion.', isFlaw: false }
        ];

        const pickedDefects = defectPool.sort(() => 0.5 - Math.random()).slice(0, 3);
        const pickedCompliant = compliantPool.sort(() => 0.5 - Math.random()).slice(0, 2);
        const allItems = [...pickedDefects, ...pickedCompliant].sort(() => 0.5 - Math.random());

        this.activeMinigame = {
            type: 'sub_blueprint',
            taskId: taskId,
            task: task,
            totalTime: 10.0,
            timeLeft: 10.0,
            timerInterval: null,
            caughtDefects: new Set(),
            items: allItems
        };

        const modal = document.getElementById('minigame-modal-overlay');
        const title = document.getElementById('minigame-title');
        if (!modal) return;

        if (title) {
            title.innerHTML = `📐 City Code Defect Spotter &bull; ${task.name}`;
        }

        this.renderSubBlueprintScreen();
        modal.style.display = 'flex';
        if (window.Sound) window.Sound.playClick();

        const startTime = Date.now();
        const totalDuration = this.activeMinigame.totalTime;

        this.activeMinigame.timerInterval = setInterval(() => {
            if (!this.activeMinigame || this.activeMinigame.type !== 'sub_blueprint') {
                clearInterval(this.activeMinigame?.timerInterval);
                return;
            }

            const elapsed = (Date.now() - startTime) / 1000;
            const remaining = Math.max(0, totalDuration - elapsed);
            this.activeMinigame.timeLeft = remaining;

            const timeBar = document.getElementById('bp-timer-bar-fill');
            const timeText = document.getElementById('bp-timer-text');
            if (timeBar) timeBar.style.width = `${(remaining / totalDuration) * 100}%`;
            if (timeText) timeText.textContent = `${remaining.toFixed(1)}s remaining`;

            if (remaining <= 0) {
                clearInterval(this.activeMinigame.timerInterval);
                this.finishSubBlueprintMinigame();
            }
        }, 100);
    }

    UIController.prototype.renderSubBlueprintScreen = function() {
        const mg = this.activeMinigame;
        if (!mg || mg.type !== 'sub_blueprint') return;
        const task = mg.task;
        const body = document.getElementById('minigame-modal-body');
        if (!body) return;

        const caughtCount = mg.caughtDefects.size;

        body.innerHTML = `
            <div class="minigame-wrapper">
                <div class="minigame-task-banner">
                    <div class="banner-title-col">
                        <span class="banner-room-tag">${GAME_DATA.ROOMS[task.room]?.icon || '🏠'} ${GAME_DATA.ROOMS[task.room]?.name || task.room}</span>
                        <h3>${task.name}</h3>
                        <p class="banner-desc">${task.desc}</p>
                    </div>
                    <div class="banner-costs-col">
                        <div class="cost-badge"><span>Turnkey Fee:</span> <strong>$${task.subCost.toLocaleString()}</strong></div>
                        <div class="cost-badge"><span>Stamina:</span> <strong>0 ⚡ (Turnkey)</strong></div>
                        <div class="cost-badge arv"><span>Base ARV:</span> <strong>+$${task.value.toLocaleString()}</strong></div>
                    </div>
                </div>

                <div class="sub-timer-container">
                    <div class="sub-timer-header">
                        <span><strong>Blueprint Code Audit:</strong> Click the 3 illegal trade defects before signing off!</span>
                        <strong id="bp-timer-text" class="sub-timer-clock">${mg.timeLeft.toFixed(1)}s remaining</strong>
                    </div>
                    <div class="sub-timer-bar-bg">
                        <div class="sub-timer-bar-fill" id="bp-timer-bar-fill" style="width:${(mg.timeLeft / mg.totalTime) * 100}%;"></div>
                    </div>
                </div>

                <div class="blueprint-sheet-grid">
                    ${mg.items.map(item => {
                        const isRedlined = mg.caughtDefects.has(item.id);
                        return `
                            <div class="blueprint-card ${isRedlined ? 'redlined' : ''}" onclick="UI.auditBlueprintItem('${item.id}')">
                                <div class="bp-card-top">
                                    <span class="bp-icon">${isRedlined ? '❌' : item.isFlaw ? '⚠️' : '📐'}</span>
                                    <div>
                                        <h4>${item.title}</h4>
                                        <p>${item.desc}</p>
                                    </div>
                                </div>
                                <div class="bp-card-action">
                                    ${isRedlined ? `
                                        <span class="stamp-redlined">REDLINE REJECTED &bull; CREW MUST REBUILD!</span>
                                    ` : `
                                        <button class="btn-redline-inspect">🔍 Inspect &amp; Redline</button>
                                    `}
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>

                <!-- Mobile / Touch Controls -->
                <div class="mobile-minigame-touchpad">
                    <button class="btn-touch-action btn-touch-primary" onclick="UI.auditNextBlueprintFlaw()" style="width:100%; max-width:420px; font-size:1rem;">
                        🔍 Audit Next Blueprint Detail [TAP / SPACEBAR]
                    </button>
                </div>

                <div class="sub-controls-row">
                    <div class="sub-audit-summary">
                        <span>Violations Redlined: <strong>${caughtCount} / 3 Violations Caught</strong></span>
                    </div>
                    <button class="btn-skip-minigame" onclick="UI.autoFinishMinigame('${task.id}', false)">
                        ⚡ Auto-Finish (Standard 50% Rate)
                    </button>
                </div>
            </div>
        `;
    }

    UIController.prototype.auditBlueprintItem = function(itemId) {
        const mg = this.activeMinigame;
        if (!mg || mg.type !== 'sub_blueprint') return;

        const item = mg.items.find(i => i.id === itemId);
        if (!item || mg.caughtDefects.has(itemId)) return;

        if (item.isFlaw) {
            mg.caughtDefects.add(itemId);
            if (window.Sound) window.Sound.playStamp();
            this.renderSubBlueprintScreen();

            if (mg.caughtDefects.size >= 3) {
                if (window.Sound) window.Sound.playBullseye();
                clearInterval(mg.timerInterval);
                setTimeout(() => {
                    this.finishSubBlueprintMinigame();
                }, 350);
            }
        } else {
            if (window.Sound) window.Sound.playClick();
            alert("✓ This item is 100% building code compliant! Look for the dangerous installation flaws.");
        }
    }

    UIController.prototype.auditNextBlueprintFlaw = function() {
        const mg = this.activeMinigame;
        if (!mg || mg.type !== 'sub_blueprint') return;
        const uninspectedFlaw = mg.items.find(i => i.isFlaw && !mg.caughtDefects.has(i.id));
        if (uninspectedFlaw) this.auditBlueprintItem(uninspectedFlaw.id);
        else this.finishSubBlueprintMinigame();
    }

    UIController.prototype.finishSubBlueprintMinigame = function() {
        const mg = this.activeMinigame;
        if (!mg || mg.type !== 'sub_blueprint') return;
        clearInterval(mg.timerInterval);

        const count = mg.caughtDefects.size;
        let mappedCheckpoints = [];
        if (count === 3) {
            mappedCheckpoints = [{ checked: true }, { checked: true }, { checked: true }, { checked: true }];
        } else if (count === 2) {
            mappedCheckpoints = [{ checked: true }, { checked: true }, { checked: true }, { checked: false }];
        } else if (count === 1) {
            mappedCheckpoints = [{ checked: true }, { checked: true }, { checked: false }, { checked: false }];
        } else {
            mappedCheckpoints = [{ checked: true }, { checked: false }, { checked: false }, { checked: false }];
        }

        this.renderMinigameResults('sub', mg.taskId, mappedCheckpoints);
    }

    // ------------------------------------------
    // SUBCONTRACTOR MINIGAME 3: BID & MARKUP NEGOTIATION
    // ------------------------------------------

    UIController.prototype.startSubHaggleMinigame = function(taskId) {
        const g = window.Game;
        const task = g.getTask(taskId);
        if (!task) return;

        this.cancelMinigame();

        this.activeMinigame = {
            type: 'sub_haggle',
            taskId: taskId,
            task: task,
            timeLeft: 9.0,
            totalTime: 9.0,
            timerInterval: null,
            currentMarkupPct: 24,
            playedTactics: new Set(),
            tactics: [
                { id: 'supplies', icon: '🗣️', name: 'Quote Big-Box Supply Prices', desc: 'Dispute 40% contractor supply padding against local lumber yard retail receipts.', drop: 8 },
                { id: 'permit', icon: '📜', name: 'Brandish Historic Building Permit', desc: 'Point out strict City Heritage code requires certified itemized accounting.', drop: 9 },
                { id: 'suite', icon: '☕', name: 'Offer Whispering Pines B&B Stay', desc: 'Throw in a complimentary weekend getaway in the restored timber baron master suite!', drop: 10 },
                { id: 'cash', icon: '💵', name: 'Guarantee Immediate Same-Day Settlement', desc: 'Promise instant cash payment the moment the city inspector signs off the permit.', drop: 11 }
            ]
        };

        const modal = document.getElementById('minigame-modal-overlay');
        const title = document.getElementById('minigame-title');
        if (!modal) return;

        if (title) {
            title.innerHTML = `🤝 Contractor Bid Negotiation &bull; ${task.name}`;
        }

        this.renderSubHaggleScreen();
        modal.style.display = 'flex';
        if (window.Sound) window.Sound.playClick();

        this.bindMinigameKeyboard();

        const startTime = Date.now();
        const totalDuration = this.activeMinigame.totalTime;

        this.activeMinigame.timerInterval = setInterval(() => {
            if (!this.activeMinigame || this.activeMinigame.type !== 'sub_haggle') {
                clearInterval(this.activeMinigame?.timerInterval);
                return;
            }

            const elapsed = (Date.now() - startTime) / 1000;
            const remaining = Math.max(0, totalDuration - elapsed);
            this.activeMinigame.timeLeft = remaining;

            this.activeMinigame.currentMarkupPct = Math.min(30, this.activeMinigame.currentMarkupPct + 0.12);

            const timeBar = document.getElementById('haggle-timer-bar-fill');
            const timeText = document.getElementById('haggle-timer-text');
            const gaugeNeedle = document.getElementById('haggle-needle');
            const readout = document.getElementById('haggle-markup-readout');

            if (timeBar) timeBar.style.width = `${(remaining / totalDuration) * 100}%`;
            if (timeText) timeText.textContent = `${remaining.toFixed(1)}s remaining`;
            if (gaugeNeedle && readout) {
                const pct = Math.max(0, Math.min(100, ((this.activeMinigame.currentMarkupPct - (-18)) / (30 - (-18))) * 100));
                gaugeNeedle.style.left = `${pct}%`;
                const val = this.activeMinigame.currentMarkupPct;
                readout.innerHTML = val <= 0 
                    ? `<strong style="color:var(--accent-green); font-size:1.15rem;">-${Math.abs(val).toFixed(0)}% Contractor Discount (Rebate Zone)</strong>`
                    : `<strong style="color:var(--accent-red); font-size:1.15rem;">+${val.toFixed(0)}% Padded Subcontractor Markup</strong>`;
            }

            if (remaining <= 0) {
                clearInterval(this.activeMinigame.timerInterval);
                this.handleSubHaggleLock();
            }
        }, 100);
    }

    UIController.prototype.renderSubHaggleScreen = function() {
        const mg = this.activeMinigame;
        if (!mg || mg.type !== 'sub_haggle') return;
        const task = mg.task;
        const body = document.getElementById('minigame-modal-body');
        if (!body) return;

        const needlePct = Math.max(0, Math.min(100, ((mg.currentMarkupPct - (-18)) / (30 - (-18))) * 100));

        body.innerHTML = `
            <div class="minigame-wrapper">
                <div class="minigame-task-banner">
                    <div class="banner-title-col">
                        <span class="banner-room-tag">${GAME_DATA.ROOMS[task.room]?.icon || '🏠'} ${GAME_DATA.ROOMS[task.room]?.name || task.room}</span>
                        <h3>${task.name}</h3>
                        <p class="banner-desc">${task.desc}</p>
                    </div>
                    <div class="banner-costs-col">
                        <div class="cost-badge"><span>Quote Base:</span> <strong>$${task.subCost.toLocaleString()}</strong></div>
                        <div class="cost-badge"><span>Stamina:</span> <strong>0 ⚡ (Turnkey)</strong></div>
                        <div class="cost-badge arv"><span>Base ARV:</span> <strong>+$${task.value.toLocaleString()}</strong></div>
                    </div>
                </div>

                <div class="sub-timer-container">
                    <div class="sub-timer-header">
                        <span><strong>Contract Negotiation:</strong> Play leverage cards to push price into the green discount zone!</span>
                        <strong id="haggle-timer-text" class="sub-timer-clock">${mg.timeLeft.toFixed(1)}s remaining</strong>
                    </div>
                    <div class="sub-timer-bar-bg">
                        <div class="sub-timer-bar-fill" id="haggle-timer-bar-fill" style="width:${(mg.timeLeft / mg.totalTime) * 100}%;"></div>
                    </div>
                </div>

                <!-- Negotiation Gauge -->
                <div class="haggle-gauge-card">
                    <div class="haggle-gauge-header">
                        <span>Current Contract Terms:</span>
                        <div id="haggle-markup-readout">
                            ${mg.currentMarkupPct <= 0
                                ? `<strong style="color:var(--accent-green); font-size:1.15rem;">-${Math.abs(mg.currentMarkupPct).toFixed(0)}% Contractor Discount (Rebate Zone)</strong>`
                                : `<strong style="color:var(--accent-red); font-size:1.15rem;">+${mg.currentMarkupPct.toFixed(0)}% Padded Subcontractor Markup</strong>`
                            }
                        </div>
                    </div>
                    <div class="haggle-track">
                        <div class="haggle-zone gold" title="15% Rebate Sweet Spot"><span>🌟 15% DEAL</span></div>
                        <div class="haggle-zone green" title="8% Rebate Zone"><span>🟢 DISCOUNT</span></div>
                        <div class="haggle-zone yellow" title="Standard Turnkey"><span>🟡 STANDARD</span></div>
                        <div class="haggle-zone red" title="Overpaid Markup"><span>🔴 MARKUP</span></div>

                        <div class="haggle-needle" id="haggle-needle" style="left:${needlePct}%;">
                            <div class="needle-tip-top">▼</div>
                            <div class="needle-line"></div>
                        </div>
                    </div>
                </div>

                <!-- 4 Negotiation Action Cards -->
                <div class="haggle-cards-grid">
                    ${mg.tactics.map(t => {
                        const played = mg.playedTactics.has(t.id);
                        return `
                            <button class="btn-haggle-tactic ${played ? 'played' : ''}" ${played ? 'disabled' : ''} onclick="UI.playSubHaggleTactic('${t.id}')">
                                <span class="tactic-icon">${t.icon}</span>
                                <div class="tactic-info">
                                    <strong>${t.name} (-${t.drop}%)</strong>
                                    <small>${t.desc}</small>
                                </div>
                            </button>
                        `;
                    }).join('')}
                </div>

                <!-- Lock In Contract -->
                <div class="diy-controls-row">
                    <button class="btn-diy-strike" onclick="UI.handleSubHaggleLock()">
                        🤝 SHAKE HANDS &amp; SIGN CONTRACT [SPACEBAR]
                    </button>
                    <button class="btn-skip-minigame" onclick="UI.autoFinishMinigame('${task.id}', false)">
                        ⚡ Auto-Finish (Standard 50% Rate)
                    </button>
                </div>
            </div>
        `;
    }

    UIController.prototype.playSubHaggleTactic = function(tacticId) {
        const mg = this.activeMinigame;
        if (!mg || mg.type !== 'sub_haggle' || mg.playedTactics.has(tacticId)) return;

        const tactic = mg.tactics.find(t => t.id === tacticId);
        if (!tactic) return;

        mg.playedTactics.add(tacticId);
        mg.currentMarkupPct = Math.max(-18, mg.currentMarkupPct - tactic.drop);
        if (window.Sound) window.Sound.playCash();

        this.renderSubHaggleScreen();
    }

    UIController.prototype.handleSubHaggleLock = function() {
        const mg = this.activeMinigame;
        if (!mg || mg.type !== 'sub_haggle') return;
        clearInterval(mg.timerInterval);

        const val = mg.currentMarkupPct;
        let mappedCheckpoints = [];

        if (val <= -11) {
            mappedCheckpoints = [{ checked: true }, { checked: true }, { checked: true }, { checked: true }];
            if (window.Sound) window.Sound.playBullseye();
        } else if (val <= -2) {
            mappedCheckpoints = [{ checked: true }, { checked: true }, { checked: true }, { checked: false }];
            if (window.Sound) window.Sound.playCash();
        } else if (val <= 6) {
            mappedCheckpoints = [{ checked: true }, { checked: true }, { checked: false }, { checked: false }];
            if (window.Sound) window.Sound.playHammer();
        } else {
            mappedCheckpoints = [{ checked: true }, { checked: false }, { checked: false }, { checked: false }];
            if (window.Sound) window.Sound.playMiss();
        }

        this.renderMinigameResults('sub', mg.taskId, mappedCheckpoints);
    }

    // ------------------------------------------
    // SUBCONTRACTOR MINIGAME 4: SITE DEBRIS & DUMPSTER HAUL
    // ------------------------------------------

    UIController.prototype.startSubCrewHaulMinigame = function(taskId) {
        const g = window.Game;
        const task = g.getTask(taskId);
        if (!task) return;

        this.cancelMinigame();

        const debrisItems = [
            { id: 0, name: "Rusty Lead Pipe Segments", weight: "85 lbs", icon: "🚰", hauled: false },
            { id: 1, name: "Cracked Victorian Chimney Bricks", weight: "120 lbs", icon: "🧱", hauled: false },
            { id: 2, name: "Rotted Subfloor Joist Scrap", weight: "95 lbs", icon: "🪵", hauled: false },
            { id: 3, name: "Shattered Asbestos Tile Shards", weight: "60 lbs", icon: "⚠️", hauled: false },
            { id: 4, name: "Bent Framing Spikes & BX Armor", weight: "45 lbs", icon: "⛓️", hauled: false },
            { id: 5, name: "Crushed Plaster & Wire Lath Sacks", weight: "110 lbs", icon: "📦", hauled: false }
        ];

        this.activeMinigame = {
            type: 'sub_crew_haul',
            taskId: taskId,
            task: task,
            debris: debrisItems,
            hauledCount: 0,
            timeLeft: 8.0,
            totalTime: 8.0,
            timerInterval: null
        };

        const modal = document.getElementById('minigame-modal-overlay');
        const title = document.getElementById('minigame-title');
        if (!modal) return;
        if (title) title.innerHTML = `🚛 Site Debris & Dumpster Haul &bull; ${task.name}`;

        this.renderSubCrewHaulScreen();
        modal.style.display = 'flex';
        if (window.Sound) window.Sound.playClick();

        this.bindMinigameKeyboard();

        const startTime = Date.now();
        this.activeMinigame.timerInterval = setInterval(() => {
            if (!this.activeMinigame || this.activeMinigame.type !== 'sub_crew_haul') {
                clearInterval(this.activeMinigame?.timerInterval);
                return;
            }
            const elapsed = (Date.now() - startTime) / 1000;
            const remaining = Math.max(0, 8.0 - elapsed);
            this.activeMinigame.timeLeft = remaining;

            const timeBar = document.getElementById('haul-timer-bar-fill');
            const timeText = document.getElementById('haul-timer-text');
            if (timeBar) timeBar.style.width = `${(remaining / 8.0) * 100}%`;
            if (timeText) timeText.textContent = `${remaining.toFixed(1)}s remaining`;

            if (remaining <= 0) {
                clearInterval(this.activeMinigame.timerInterval);
                this.finishSubCrewHaulMinigame();
            }
        }, 100);
    }

    UIController.prototype.renderSubCrewHaulScreen = function() {
        const mg = this.activeMinigame;
        if (!mg || mg.type !== 'sub_crew_haul') return;
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
                        <div class="cost-badge"><span>Quote Base:</span> <strong>$${task.subCost.toLocaleString()}</strong></div>
                        <div class="cost-badge"><span>Stamina:</span> <strong>0 ⚡ (Turnkey)</strong></div>
                        <div class="cost-badge arv"><span>Base ARV:</span> <strong>+$${task.value.toLocaleString()}</strong></div>
                    </div>
                </div>

                <div class="sub-timer-container">
                    <div class="sub-timer-header">
                        <span><strong>Crew Site Cleanup:</strong> Direct the subcontractor crew to heave all 6 demo piles into the roll-off dumpster!</span>
                        <strong id="haul-timer-text" class="sub-timer-clock">${mg.timeLeft.toFixed(1)}s remaining</strong>
                    </div>
                    <div class="sub-timer-bar-bg">
                        <div class="sub-timer-bar-fill" id="haul-timer-bar-fill" style="width:${(mg.timeLeft / mg.totalTime) * 100}%;"></div>
                    </div>
                </div>

                <!-- Dumpster & Staging Visual -->
                <div class="haul-dumpster-container">
                    <div class="dumpster-header">
                        <span>30-YARD ROLL-OFF DUMPSTER CAPACITY: <strong>${mg.hauledCount} / 6 LOADS CLEARED</strong></span>
                    </div>
                    <div class="haul-dumpster-grid">
                        ${mg.debris.map((item, idx) => `
                            <div class="haul-debris-card ${item.hauled ? 'hauled' : ''}" 
                                 onclick="UI.haulCrewItem(${idx})">
                                <div class="haul-icon">${item.icon}</div>
                                <div class="haul-details">
                                    <strong>${item.name}</strong>
                                    <small>${item.weight} &bull; ${item.hauled ? '✓ LOADED IN DUMPSTER' : 'Click or Press Space to Heave'}</small>
                                </div>
                                <div class="haul-badge ${item.hauled ? 'in-dumpster' : 'on-site'}">
                                    ${item.hauled ? '🚛 IN DUMPSTER' : '💪 HEAVE!'}
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <!-- Mobile / Touch Controls -->
                <div class="mobile-minigame-touchpad">
                    <button class="btn-touch-action btn-touch-primary" onclick="UI.haulNextCrewItem()" style="width:100%; max-width:420px; font-size:1rem;">
                        🚜 Haul Next Debris Load [TAP / SPACEBAR]
                    </button>
                </div>

                <div class="sub-controls-row">
                    <div class="sub-audit-summary">
                        <span>Cleared: <strong>${mg.hauledCount} / 6 Demo Piles</strong> &bull; Press Spacebar to Heave Next Load</span>
                    </div>
                    <button class="btn-skip-minigame" onclick="UI.autoFinishMinigame('${task.id}', false)">
                        ⚡ Auto-Finish (Standard 50% Rate)
                    </button>
                </div>
            </div>
        `;
    }

    UIController.prototype.haulCrewItem = function(idx) {
        const mg = this.activeMinigame;
        if (!mg || mg.type !== 'sub_crew_haul') return;
        const item = mg.debris[idx];
        if (!item || item.hauled) return;

        item.hauled = true;
        mg.hauledCount++;
        if (window.Sound) {
            window.Sound.playThud();
            window.Sound.playClink();
        }

        this.renderSubCrewHaulScreen();

        if (mg.hauledCount >= 6) {
            if (window.Sound) window.Sound.playBullseye();
            clearInterval(mg.timerInterval);
            setTimeout(() => {
                this.finishSubCrewHaulMinigame();
            }, 350);
        }
    }

    UIController.prototype.haulNextCrewItem = function() {
        const mg = this.activeMinigame;
        if (!mg || mg.type !== 'sub_crew_haul') return;
        const unhauled = mg.debris.find(d => !d.hauled);
        if (unhauled) this.haulCrewItem(unhauled.id);
    }

    UIController.prototype.finishSubCrewHaulMinigame = function() {
        const mg = this.activeMinigame;
        if (!mg || mg.type !== 'sub_crew_haul') return;
        clearInterval(mg.timerInterval);

        const count = mg.hauledCount;
        let mappedCheckpoints = [];

        if (count >= 6) {
            mappedCheckpoints = [{ checked: true }, { checked: true }, { checked: true }, { checked: true }];
            if (window.Sound) window.Sound.playBullseye();
        } else if (count >= 5) {
            mappedCheckpoints = [{ checked: true }, { checked: true }, { checked: true }, { checked: false }];
            if (window.Sound) window.Sound.playCash();
        } else if (count >= 4) {
            mappedCheckpoints = [{ checked: true }, { checked: true }, { checked: false }, { checked: false }];
            if (window.Sound) window.Sound.playHammer();
        } else {
            mappedCheckpoints = [{ checked: true }, { checked: false }, { checked: false }, { checked: false }];
            if (window.Sound) window.Sound.playMiss();
        }

        this.renderMinigameResults('sub', mg.taskId, mappedCheckpoints);
    }

})();
