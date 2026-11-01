// Jack's Fixer Uper - Core Game State & Economic Simulation Engine

class JacksGame {
    constructor() {
        this.currentHouseIndex = 0;
        this.currentHouse = null;
        this.currentMoney = 0;
        this.propertyValue = 0;
        this.loanDebt = 0;
        this.currentDay = 1;
        this.currentWeatherKey = 'Sunny';
        this.actionPoints = 5; // 5 Stamina Bolts max
        this.maxActionPoints = 5;
        this.dailyEnergyRoll = 5;
        this.completedTaskIDs = new Set();
        this.highlightedTaskIDs = new Set();
        this.ownedToolIDs = new Set();
        this.totalSpentOnRehab = 0;
        this.totalHoldingCostsPaid = 0;
        this.activityLog = [];
        this.careerStats = {
            housesFlipped: 0,
            totalProfit: 0,
            bestFlip: 0
        };

        // NEW SYSTEMS: Clutter, Neighbors, Cats, Junkyard Salvage, and Dilemmas
        this.siteClutter = 15; // 0 to 100%
        this.neighborRelation = 55; // 0 to 100%
        this.cats = JSON.parse(JSON.stringify(GAME_DATA.CATS));
        const defaultRooms = {
            barnaby: 'LivingRoom',
            mochi: 'Exterior',
            rusty: 'Basement',
            jumper: 'RoofAttic'
        };
        this.cats.forEach(c => {
            if (!c.currentRoom) {
                c.currentRoom = defaultRooms[c.id] || 'LivingRoom';
            }
        });
        this.isCatTowerOwned = false;
        this.salvageInventory = [];
        this.unlockedSalvageTaskIDs = new Set();
        this.pendingDilemma = null;
        this.selectedBreakfastMenu = 'continental';
        this.guestReviews = [];
        this.manorRating = 5.0;
        this.toolsOrganized = false;
        this.toolsOrganizedDays = 0;
        this.materialsInventory = {
            modernLumber: 0,
            oldGrowthLumber: 0,
            salvageLogs: 2
        };
        this.stopWorkOrders = {};
        this.lastHazardIncident = null;
        this.tutorialCompleted = true;
        this.saveVersion = 3;

        // Real-Life House Project Editable Engine State
        this.propertyInfo = {
            name: "1910 Whispering Pines Manor",
            subtitle: "116-Year-Old Historic Craftsman B&B (60 Tons)",
            address: "1910 Vance Ridge Road, Timber Basin, WA",
            purchasePrice: 65000,
            startingCash: 12500,
            targetARV: 240000,
            holdingCostPerDay: 50,
            notes: "Historic 60-ton Craftsman estate under active structural restoration."
        };
        this.customRooms = {};
        this.customTasks = [];
        this.customPhotos = [];
        this.customVideos = [];
        this.customProgress = [];
        this.realLifeExpenses = [];
        this.realLifeMode = true;
        this.customTools = [];
        this.deletedToolIds = new Set();

        // Public Dream Building & Project Spec State
        this.donationSettings = { ...(GAME_DATA.DONATION_DEFAULTS || {}) };
        this.taskChecklists = {};
        this.taskMaterials = {};
        this.taskTools = {};
        this.taskPriorities = {};
        this.taskDonations = {};

        // Community Crowdsourcing & Supporter Knowledge
        this.communityTips = [];
        this.communityChallenges = [];
        this.communityUpvotedTipIds = new Set();

        // Supporter Commemorative Plaques & Backer Hall of Fame
        this.hallOfFameBackers = [];

        // Dynamic Center Workspace Tabs Management
        this.customTabs = [];
        this.deletedTabIds = [];
        this.tabOrder = [];
        this.tabOverrides = {};

        // Editable Starting Point ("The Before") State
        // Editable Starting Point ("The Before") State
        // Fast Tabs (Quick-jump forensic finding cards)
        this.historyFastTabs = [
            {
                id: 'ft_deadload',
                icon: '⚖️',
                label: 'Structural Dead Load',
                value: '60 Tons',
                sub: 'Unreinforced fieldstone foundation & center timber beam',
                targetPostId: 'spp_foundation',
                color: '#f59e0b'
            },
            {
                id: 'ft_deflection',
                icon: '📐',
                label: 'Floor Joist Deflection',
                value: '-3.5 Inches Sag',
                sub: 'Main salon & hearth joists require calibrated screw-jacks',
                targetPostId: 'history-section-leveling',
                color: '#ef4444'
            },
            {
                id: 'ft_salvage',
                icon: '🪵',
                label: 'Initial Salvage Reserve',
                value: 'Green & Salvage',
                sub: 'Wood corral drying station active on site',
                targetPostId: 'history-section-salvage',
                color: '#38bdf8'
            },
            {
                id: 'ft_acquisition',
                icon: '💵',
                label: 'Baseline Acquisition',
                value: '$165,000',
                sub: 'Original purchase condition before capital rehab',
                targetPostId: 'spn_discovery',
                color: '#10b981'
            }
        ];

        // Standalone Forensic Picture Galleries Hub
        
        this.customHistorySections = [
            {
                id: 'chs_attic_survey',
                title: "Attic Framing, Knob-and-Tube Wiring & Gable Vents",
                subtitle: "Initial 1910 upper envelope forensic survey prior to insulation",
                icon: "⚡",
                badge: "FORENSIC SURVEY",
                color: "#f59e0b",
                date: "Survey Day 2",
                blocks: [
                    {
                        id: 'blk_p1',
                        type: 'paragraph',
                        text: "Accessing the uninsulated attic crawlspace via the corridor hatch revealed true-dimension 2x6 hemlock ceiling joists in sound condition, alongside early knob-and-tube electrical conductors. The roof deck displays original 1x8 tongue-and-groove white pine sheathing with evidence of historic chimney flashing staining that has since dried."
                    },
                    {
                        id: 'blk_note1',
                        type: 'note',
                        title: "Field Electrician Datum",
                        text: "Knob-and-tube cleats are de-energized on panel circuit 3; all ungrounded cloth runs must be abated before new mineral wool batts are laid."
                    },
                    {
                        id: 'blk_gal1',
                        type: 'gallery',
                        title: "Attic Rafters & Porcelain Cleats",
                        subtitle: "Upper envelope photographic evidence",
                        activePhotoIndex: 0,
                        photos: [
                            { url: "jackshousepenicldrawing.jpg", caption: "Gable vent framing & cedar rafter birdsmouths", badge: "ROOFLINE" },
                            { url: "steampunk109.jpg", caption: "Porcelain knob-and-tube cleat detail along hemlock joist", badge: "WIRING DETAIL" }
                        ]
                    },
                    {
                        id: 'blk_stat1',
                        type: 'stats',
                        stats: [
                            { label: "Rafter Spacing", value: '24" O.C.', sub: "2x6 Hemlock" },
                            { label: "Sheathing Deck", value: "1x8 Pine", sub: "Dry & Sound" }
                        ]
                    },
                    {
                        id: 'blk_fn1',
                        type: 'footnote',
                        marker: "[1]",
                        title: "1910 Roofline Survey",
                        text: "Matched to original facade elevation blueprint sheet #1.",
                        url: ""
                    }
                ]
            }
        ];
    
        this.standaloneGalleries = [
            {
                id: 'sg_crawlspace',
                title: 'Fieldstone Crawlspace & Pier Staging Gallery',
                category: 'STRUCTURAL',
                room: 'Basement',
                date: 'Day 1 Discovery',
                desc: 'High-resolution photo survey of fieldstone pier 1 through 6 dry-stack mortar conditions.',
                activePhotoIndex: 0,
                photos: [
                    { url: 'jackshousepenicldrawing.jpg', caption: 'Foundation trench blueprint survey overlay', badge: 'SURVEY MAP' },
                    { url: 'steampunk109.jpg', caption: 'Pier 3 center upright tilt angle (4 degrees under 60T dead load)', badge: 'DEFLECTION' }
                ]
            },
            {
                id: 'sg_salon_millwork',
                title: 'Grand Salon Historic Millwork & Mantle Detail Gallery',
                category: 'SALVAGE',
                room: 'LivingRoom',
                date: 'Day 2 Survey',
                desc: 'Forensic macro photography of 1910 quarter-sawn red oak grain, lead varnish checking, and mahogany carving.',
                activePhotoIndex: 0,
                photos: [
                    { url: 'steampunk109.jpg', caption: 'Mahogany mantle hand-tooled pilasters and shelf', badge: 'MILLWORK MACRO' }
                ]
            }
        ];

        this.startingPointHero = {
            title: "History (The Before) - 108 Riverside Manor",
            subtitle: "Condition When Discovered Forensic Site Baseline Prior to Restoration",
            metric1: { label: "⚖️ Structural Dead Load", value: "60 Tons", sub: "Unreinforced fieldstone foundation & center timber beam" },
            metric2: { label: "📐 Floor Joist Deflection", value: "-3.5 Inches Sag", sub: "Main salon & hearth joists require calibrated screw-jacks" },
            metric3: { label: "🪵 Initial Salvage Reserve", value: "Green & Salvage", sub: "Wood corral drying station active on site" },
            metric4: { label: "💵 Baseline Acquisition", value: "$165,000", sub: "Original purchase condition before capital rehab" }
        };

        // Multi-Sheet Architectural Blueprint & Survey Vault with Hotspots
        this.blueprintSheets = [
            {
                id: 'bps_elevation',
                title: "📐 Original Architectural Pencil Blueprint & Elevation Sketch",
                tag: "Historic 1910 Manor Facade Survey",
                imageUrl: "jackshousepenicldrawing.jpg",
                provenanceNotes: "The original front facade showing the left porch where the observation tower will rise, and the corner 2nd-floor window where the Master En-Suite bath is situated.",
                footerCaption: "Historic survey pencil rendering dating to original construction.",
                hotspots: [
                    { id: 'hs_tower', x: 22, y: 35, title: 'Observation Tower Porch', desc: 'Left porch structure where 40-ft observation tower frame will tie into main roofline.', icon: '🗼', color: '#f59e0b' },
                    { id: 'hs_foundation', x: 48, y: 82, title: 'Center Timber & Pier 3 Sag (-3.5")', desc: 'Dry-stack fieldstone foundation bearing central 60-ton dead load.', icon: '⚖️', color: '#ef4444' },
                    { id: 'hs_salon', x: 44, y: 55, title: 'Grand Salon & Hearth', desc: 'Hearth settling deflected joists -3.5 inches toward chimney flue.', icon: '🔥', color: '#38bdf8' },
                    { id: 'hs_master', x: 74, y: 38, title: '2nd-Floor Master En-Suite', desc: 'Old-growth white pine framing sound; ready for tile reinforcement.', icon: '🛏️', color: '#10b981' }
                ]
            },
            {
                id: 'bps_trench',
                title: "🏗️ Foundation Pier Datum & Crawlspace Shoring Trench",
                tag: "Laser Transit Survey Oct 12",
                imageUrl: "jackshousepenicldrawing.jpg",
                provenanceNotes: "Laser datum survey across dry-stack fieldstone crawlspace marking Pier 1 through 6 datum elevations.",
                footerCaption: "Engineering Laser Survey & Calibration Datum #108-F.",
                hotspots: [
                    { id: 'hs_pier1', x: 18, y: 50, title: 'Pier 1: North Sill Plate', desc: 'Localized dry rot on sill plate; sistering required.', icon: '⚠️', color: '#f59e0b' },
                    { id: 'hs_pier3', x: 50, y: 52, title: 'Pier 3: Center Deflection Apex', desc: '-3.50" deflection point carrying 60 tons.', icon: '🔴', color: '#ef4444' }
                ]
            },
            {
                id: 'bps_plat',
                title: "📜 1910 County Tax Assessment Plat & Sanborn Fire Map",
                tag: "County Registry Deed #4418",
                imageUrl: "jackshousepenicldrawing.jpg",
                provenanceNotes: "County tax assessment parcel survey documenting original riparian boundary along Riverside Manor drive.",
                footerCaption: "County Tax Assessment Archive Ledger Vol. 14, Page 209.",
                hotspots: []
            }
        ];
        this.activeBlueprintSheetIndex = 0;

        // Interactive Before vs. Now Comparison Pairs
        this.beforeAfterComparisons = [
            {
                id: 'bac_hearth',
                title: 'Grand Salon Hearth & Hand-Carved Mantle',
                room: 'LivingRoom',
                beforeUrl: 'steampunk109.jpg',
                afterUrl: 'steampunk109.jpg',
                beforeLabel: '1910 Baseline Discovery',
                afterLabel: 'Current Renovation State',
                desc: 'Quarter-sawn red oak leveling and lead varnish remediation over hearth settling.'
            },
            {
                id: 'bac_foundation',
                title: 'Pier 3 Fieldstone Foundation & Shoring',
                room: 'Basement',
                beforeUrl: 'jackshousepenicldrawing.jpg',
                afterUrl: 'jackshousepenicldrawing.jpg',
                beforeLabel: 'Day 1 Settled Trench (-3.50")',
                afterLabel: 'Calibrated Screw-Jacks Active',
                desc: 'Fieldstone dry-stack stabilized with 20-ton screw jacks bearing 60-ton dead load.'
            }
        ];
        this.activeBeforeAfterIndex = 0;

        // Laser Datum & Screw-Jack Leveling Log
        this.levelingLogs = [
            { id: 'll_1', date: 'Oct 12', pier: 'Pier 3 Center', turn: 'Baseline 0"', remainingSag: '-3.50"', moisture: '18.2%', status: 'Laser Datum Established', tech: 'Jack S.' },
            { id: 'll_2', date: 'Oct 13', pier: 'Pier 3 (East Jack)', turn: '+1/16"', remainingSag: '-3.44"', moisture: '18.0%', status: 'Shoring Bottle Jacks Set', tech: 'Jack S.' },
            { id: 'll_3', date: 'Oct 14', pier: 'Pier 3 (West Jack)', turn: '+1/16"', remainingSag: '-3.38"', moisture: '17.8%', status: 'Mortar Inspection Stable', tech: 'Crew A' },
            { id: 'll_4', date: 'Oct 15', pier: 'Pier 3 Center Screw', turn: '+1/8"', remainingSag: '-3.25"', moisture: '17.4%', status: 'Leveling Progressing Nicely', tech: 'Jack S.' }
        ];

        // Historic Timber & Salvage Reserve Inventory Ledger
        this.salvageInventory = [
            { id: 'sal_1', name: 'Old-Growth White Pine Joists', qty: '1,200 Bd-Ft', spec: '2x10 Rough Sawn (True Dimension)', moisture: '14.2%', status: 'Wood Corral Drying', location: 'Station A (Yard Tarped)' },
            { id: 'sal_2', name: 'Heart-Pine Salon Subflooring', qty: '650 Bd-Ft', spec: '1x6 Tongue & Groove', moisture: '12.0%', status: 'Acclimating Indoors', location: 'Grand Salon Drying Racks' },
            { id: 'sal_3', name: 'Hand-Carved Mahogany Mantlepiece', qty: '1 Set', spec: '1910 Hand-Tooled Solid Mahogany', moisture: '8.5%', status: 'Lead Varnish Stripping', location: 'Pro Millwork Bench' },
            { id: 'sal_4', name: 'Original Cast-Iron Fireplace Damper', qty: '1 Assembly', spec: '1910 Stamped Iron Rotary Flue Damper', moisture: 'N/A', status: 'Cleaned & Wire-Brushed', location: 'Hearth Staging Area' },
            { id: 'sal_5', name: 'Antique Wavy Cylinder Window Panes', qty: '14 Panes', spec: 'Original Blown Glass 18x24"', moisture: 'N/A', status: 'Boxed & Cradled', location: 'Pantry Glazing Crate' }
        ];

        this.startingPointBlueprint = this.blueprintSheets[0];
        this.startingPointNarratives = [
            {
                id: 'spn_discovery',
                header: "The Discovery: October Morning Initial Walkthrough",
                subheader: "Assessing 116 Years of Unchecked Weather & Settling",
                paragraph: "When we first unlocked the warped solid fir front door, dust motes hung in the cold morning light. The central timber carrier beam had sagged 3.5 inches toward the hearth, pulling interior plaster off the lath. Yet behind the crumbling wallpaper stood pristine old-growth white pine framing and intact heart-pine joists ready for revitalization.",
                notes: "Laser transit survey confirms center foundation settled 3.5\"; no active termites detected; dry rot localized to north exterior sill plate.",
                footnotes: "Survey conducted October 12; archival blueprint matched to 1910 county tax assessment registry #4418."
            }
        ];
        this.startingPointPosts = [
            {
                id: 'spp_foundation',
                title: "Fieldstone Foundation & Center Timber Beam Sag",
                subtitle: "Critical Structural Forensic Assessment",
                date: "Survey Day 1",
                badge: "STRUCTURAL CRITICAL",
                paragraph: "The unreinforced dry-stack fieldstone crawlspace is carrying an estimated 60-ton dead load. Three timber uprights have tilted 4 degrees. Calibration screw-jacks must be installed before any 2nd-floor framing commences.",
                notes: "Temporary 20-ton bottle jacks staged at pier 3. Moisture content in timber measures 18%.",
                footnotes: "Structural engineering approval required before raising beam beyond 1/8 inch per 24-hour cycle.",
                activePhotoIndex: 0,
                photos: [
                    { url: "jackshousepenicldrawing.jpg", caption: "Original elevation pencil survey marking foundation trench.", badge: "ARCHIVAL SKETCH" }
                ]
            },
            {
                id: 'spp_salon',
                title: "Grand Salon Hardwoods & Fireplace Mantle",
                subtitle: "Historic Millwork & Floor Joist Deflection",
                date: "Survey Day 2",
                badge: "HISTORIC SALVAGE",
                paragraph: "Quarter-sawn red oak flooring has buckled near the chimney stack due to historic hearth settling. The hand-carved mahogany fireplace mantle remains remarkably intact, though coated in five layers of lead varnish.",
                notes: "Carefully number and remove floorboards with cat's paw prybars. Store in wood corral.",
                footnotes: "Original 1910 iron damper intact; chimney flue requires steel liner before first test burn.",
                activePhotoIndex: 0,
                photos: [
                    { url: "steampunk109.jpg", caption: "Grand Salon fireplace with hand-carved mahogany mantle.", badge: "SALON BEFORE" }
                ]
            }
        ];

        // Editable Chaos & Chores State
        this.chaosChores = [
            { id: 'chore_organize', name: '🧰 Organize & Calibrate Pro Tools', costAp: 1, costMoney: 0, clutterReduction: 20, desc: '-20% Clutter, +Craftsmanship Precision status (2 days), 50% chance to find loose hardware & cash!' },
            { id: 'chore_sweep', name: '🧹 Deep-Clean & Sweep Job Site', costAp: 1, costMoney: 0, clutterReduction: 100, desc: 'Cuts clutter to 0%, 45% chance to find lost coins/bills in the sawdust.' },
            { id: 'chore_debris', name: '📦 Move Front Debris to Backyard [Ordinance]', costAp: 1, costMoney: 0, clutterReduction: 30, desc: '-30% Clutter, +20% Neighbor Relations (prevents $250 citation).' },
            { id: 'chore_mow', name: '🌿 Mow Overgrown Lawn & Edge Curbs', costAp: 1, costMoney: 0, clutterReduction: 15, desc: '-15% Clutter, +15% Neighbor Relations, chance to uncover lawn coins.' },
            { id: 'chore_mulcher', name: '🪵 Run Branch Mulcher', costAp: 1, costMoney: 0, clutterReduction: 35, desc: '-35% Clutter, +$150 Value (Requires branch mulcher built)' }
        ];

        // Editable Neighbor Data & Grievances
        this.neighborData = {
            name: "Mr. Henderson",
            avatar: "👴🏻",
            role: "Next-Door Retired Aerospace Inspector",
            desc: "Owns a laser-level lawn ruler and keeps a logbook of every delivery truck, saw noise, and overhanging leaf.",
            relationScore: 50,
            grievances: [
                "Front yard construction staging in street view (City Ordinance Sec. 14-8)",
                "Uncut dandelions and overgrown lawn along front curb",
                "Overhanging oak tree branches over fence line",
                "Property boundary line dispute (2.3 inches)",
                "Tile saw buzzing before 8:00 AM",
                "Dumpster delivery truck parking close to mailbox"
            ]
        };

        this.listeners = [];
    }

    setBreakfastMenu(menuId) {
        if (GAME_DATA.BREAKFAST_MENUS && GAME_DATA.BREAKFAST_MENUS.some(m => m.id === menuId)) {
            this.selectedBreakfastMenu = menuId;
            this.notify();
        }
    }

    subscribe(fn) {
        this.listeners.push(fn);
    }

    notify() {
        this.listeners.forEach(fn => fn(this));
    }

    getProjectStartDate() {
        if (this.propertyInfo && this.propertyInfo.startDate) {
            return this.propertyInfo.startDate;
        }
        if (Array.isArray(this.activityLog) && this.activityLog.length > 0) {
            let earliest = Infinity;
            this.activityLog.forEach(l => {
                const ts = Number(l.timestamp);
                if (ts && ts < earliest) earliest = ts;
            });
            if (earliest < Infinity) {
                const d = new Date(earliest);
                const iso = d.toISOString().slice(0, 10);
                if (!this.propertyInfo) this.propertyInfo = {};
                this.propertyInfo.startDate = iso;
                return iso;
            }
        }
        const defaultStart = '2026-10-18';
        if (!this.propertyInfo) this.propertyInfo = {};
        this.propertyInfo.startDate = defaultStart;
        return defaultStart;
    }

    setProjectStartDate(dateStr) {
        if (!dateStr) return false;
        if (!this.propertyInfo) this.propertyInfo = {};
        this.propertyInfo.startDate = dateStr;
        this.updateDaysFromCalendar();
        this.saveGame();
        this.notify();
        this.publishToCloud().catch(() => {});
        return true;
    }

    calculateDayForDate(timestampOrDate) {
        const startStr = this.getProjectStartDate();
        const startDate = new Date(startStr + 'T00:00:00');
        let targetDate = new Date();
        if (timestampOrDate) {
            targetDate = new Date(timestampOrDate);
        }
        const startMid = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate()).getTime();
        const targetMid = new Date(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate()).getTime();
        const diffDays = Math.floor((targetMid - startMid) / (1000 * 60 * 60 * 24));
        return Math.max(1, diffDays + 1);
    }

    formatCentralTimestamp(dateInput, includeSeconds = true) {
        const d = dateInput ? new Date(dateInput) : new Date();
        if (isNaN(d.getTime())) return new Date().toLocaleString('en-US', { timeZone: 'America/Chicago' });
        const opts = {
            timeZone: 'America/Chicago',
            month: '2-digit',
            day: '2-digit',
            year: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
            timeZoneName: 'short'
        };
        if (includeSeconds) opts.second = '2-digit';
        return d.toLocaleString('en-US', opts);
    }

    updateDaysFromCalendar() {
        const calendarDay = this.calculateDayForDate(Date.now());
        if (calendarDay > (this.currentDay || 1)) {
            this.currentDay = calendarDay;
        }
        if (Array.isArray(this.activityLog)) {
            this.activityLog.forEach(entry => {
                if (entry && entry.timestamp) {
                    const exactDay = this.calculateDayForDate(entry.timestamp);
                    entry.day = exactDay;
                    entry.time = this.formatCentralTimestamp(entry.timestamp, true);
                }
            });
        }
    }

    advanceProjectDay() {
        this.currentDay = (Number(this.currentDay) || 1) + 1;
        this.log(`🌅 Day ${this.currentDay} Begins: Project work resumed on site.`, 'day');
        this.saveGame();
        this.notify();
        this.publishToCloud().catch(() => {});
        return this.currentDay;
    }

    init(houseIndex = 0) {
        const saved = this.loadGame();
        if (saved) {
            this.updateDaysFromCalendar();
            this.notify();
            this.syncWithCloud(false).catch(() => {});
            return;
        }
        this.startHouse(houseIndex);
        this.updateDaysFromCalendar();
        this.syncWithCloud(true).catch(() => {});
    }

    startHouse(houseIndex, carriedProfit = 0) {
        this.currentHouseIndex = Math.min(houseIndex, GAME_DATA.HOUSES.length - 1);
        this.currentHouse = GAME_DATA.HOUSES[this.currentHouseIndex];

        // Carry over a percentage of past flip profits as bonus working capital
        const profitBonus = Math.max(0, Math.round(carriedProfit * 0.5));
        this.currentMoney = this.currentHouse.startingCash + profitBonus;
        this.propertyValue = this.currentHouse.purchasePrice;
        this.loanDebt = 0;
        this.currentDay = 1;
        this.currentWeatherKey = 'Sunny';
        this.actionPoints = this.maxActionPoints;
        this.completedTaskIDs = new Set();
        this.totalSpentOnRehab = 0;
        this.totalHoldingCostsPaid = 0;
        this.activityLog = [];

        // Reset house chaos meters
        this.siteClutter = 20;
        this.neighborRelation = 55;
        this.cats = JSON.parse(JSON.stringify(GAME_DATA.CATS));
        this.isCatTowerOwned = false;
        this.salvageInventory = [];
        this.unlockedSalvageTaskIDs = new Set();
        this.pendingDilemma = null;
        this.toolsOrganized = false;
        this.toolsOrganizedDays = 0;
        this.materialsInventory = {
            modernLumber: 0,
            oldGrowthLumber: 0,
            salvageLogs: 2
        };
        this.stopWorkOrders = {};
        this.lastHazardIncident = null;

        // Random welcome & cat warning notes removed per user request
        this.saveGame();
    }

    log(message, type = 'normal', meta = {}) {
        if (!message) return;

        // Strictly filter out non-important UI, layout, and reordering noise from running log book
        const lower = message.toLowerCase();
        if (
            type === 'welcome' ||
            lower.includes('acquired 1910') ||
            lower.includes('watch out: your 4 cats') ||
            lower.includes('exploring the job site') ||
            lower.includes('watching from his porch') ||
            lower.includes("let's start flipping") ||
            lower.includes('moved task') ||
            lower.includes('task moved') ||
            lower.includes('copied task') ||
            lower.includes('renamed floor') ||
            lower.includes('renamed level') ||
            lower.includes('reordered floor') ||
            lower.includes('reordered rooms') ||
            lower.includes('reordered tasks') ||
            lower.includes('moved room') ||
            lower.includes('duplicated room') ||
            lower.includes('steampunk mode engaged') ||
            lower.includes('blueprint mode:') ||
            lower.includes('need $')
        ) {
            return; // Ignore trivial management / layout reordering noise
        }

        const isAccomplishment = meta.isAccomplishment ||
            type === 'accomplishment' ||
            type === 'task' ||
            type === 'milestone' ||
            lower.includes('finished') ||
            lower.includes('completed') ||
            lower.includes('masterpiece') ||
            lower.includes('certified') ||
            lower.includes('restoration complete');

        const now = new Date();
        const centralFull = this.formatCentralTimestamp(now, true);
        const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const dateStr = now.toLocaleDateString([], { month: 'short', day: 'numeric' });
        const entryDay = this.calculateDayForDate ? this.calculateDayForDate(Date.now()) : (this.currentDay || 1);
        this.currentDay = Math.max(this.currentDay || 1, entryDay);

        const entry = {
            id: 'log_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
            day: this.currentDay,
            message: message,
            type: isAccomplishment ? 'accomplishment' : type,
            isAccomplishment: !!isAccomplishment,
            time: centralFull,
            dateStr: dateStr,
            timeStr: timeStr,
            timestamp: Date.now(),
            ...meta
        };

        if (!Array.isArray(this.activityLog)) this.activityLog = [];
        this.activityLog.unshift(entry);

        // Keep a healthy running log book history of up to 500 items
        if (this.activityLog.length > 500) {
            this.activityLog.pop();
        }
    }

    getTools() {
        const baseTools = (GAME_DATA.TOOLS || []).filter(t => !this.deletedToolIds || !this.deletedToolIds.has(t.id));
        const custom = (this.customTools || []).filter(t => !t.isDeleted && (!this.deletedToolIds || !this.deletedToolIds.has(t.id)));
        return [...baseTools, ...custom];
    }

    getTool(toolId) {
        return this.getTools().find(t => t.id === toolId);
    }

    canAffordTool(toolId) {
        const tool = this.getTool(toolId);
        return tool && !this.ownedToolIDs.has(toolId) && this.currentMoney >= tool.cost;
    }

    buyTool(toolId) {
        const tool = this.getTool(toolId);
        if (!tool || this.ownedToolIDs.has(toolId) || this.currentMoney < tool.cost) {
            if (window.Sound) window.Sound.playError();
            return false;
        }

        this.currentMoney -= tool.cost;
        this.ownedToolIDs.add(toolId);
        if (window.Sound) window.Sound.playCashRegister();
        this.log(`Purchased tool: ${tool.name} (-$${tool.cost.toLocaleString()})`, 'deal');
        this.saveGame();
        this.notify();
        return true;
    }

    addCustomTool(toolData) {
        if (!this.customTools) this.customTools = [];
        const id = 'tool_custom_' + Date.now();
        const newTool = {
            id,
            name: toolData.name || 'Custom Tool',
            icon: toolData.icon || '🔧',
            cost: Number(toolData.cost) || 100,
            desc: toolData.desc || 'Professional equipment for renovation projects.',
            isCustom: true
        };
        this.customTools.push(newTool);
        if (toolData.isOwned) {
            if (!this.ownedToolIDs) this.ownedToolIDs = new Set();
            this.ownedToolIDs.add(id);
        }
        this.saveGame();
        this.notify();
        return newTool;
    }

    deleteTool(toolId) {
        if (!this.deletedToolIds) this.deletedToolIds = new Set();
        this.deletedToolIds.add(toolId);
        if (this.customTools) {
            const idx = this.customTools.findIndex(t => t.id === toolId);
            if (idx > -1) {
                this.customTools.splice(idx, 1);
            }
        }
        if (this.ownedToolIDs) {
            this.ownedToolIDs.delete(toolId);
        }
        this.saveGame();
        this.notify();
    }

    getTask(taskId) {
        let t = GAME_DATA.TASKS.find(x => x.id === taskId);
        if (!t && GAME_DATA.SALVAGE_TASKS) {
            t = GAME_DATA.SALVAGE_TASKS.find(x => x.id === taskId);
        }
        if (!t && this.customTasks) {
            t = this.customTasks.find(x => x.id === taskId && !x.isDeleted);
        }
        if (t && this.customTasks) {
            const override = this.customTasks.find(x => x.id === taskId);
            if (override) return { ...t, ...override };
        }
        return t;
    }

    getTaskPrerequisiteStatus(taskId) {
        if (!GAME_DATA.TASK_PREREQUISITES || !GAME_DATA.TASK_PREREQUISITES[taskId]) {
            return { available: true, unmetPrereqs: [] };
        }
        const reqs = GAME_DATA.TASK_PREREQUISITES[taskId];
        const unmet = [];
        for (const req of reqs) {
            if (!this.completedTaskIDs.has(req.prereqId)) {
                const reqTask = this.getTask(req.prereqId);
                unmet.push({
                    id: req.prereqId,
                    prereqId: req.prereqId,
                    name: reqTask ? reqTask.name : req.prereqId,
                    room: reqTask ? reqTask.room : null,
                    reason: req.reason
                });
            }
        }
        return {
            available: unmet.length === 0,
            unmetPrereqs: unmet
        };
    }

    isTaskAvailable(taskId) {
        if (this.completedTaskIDs.has(taskId)) return false;
        const task = this.getTask(taskId);
        if (!task) return false;

        // Check if room is halted under a Municipal Safety Inspector Stop-Work Order
        if (this.stopWorkOrders && this.stopWorkOrders[task.room]) {
            return false;
        }

        // If it's a salvage task, must have scavenged the item first
        if (task.id.startsWith('salvage_') && !this.unlockedSalvageTaskIDs.has(task.id)) {
            return false;
        }

        // Check weather restriction for exterior paint/shingles
        const weather = GAME_DATA.WEATHER[this.currentWeatherKey];
        if (task.room === 'Exterior' && !weather.allowedExterior && (task.id === 'ext_paint' || task.id === 'ext_landscaping')) {
            return false;
        }
        if (task.room === 'RoofAttic' && (this.currentWeatherKey === 'Stormy' || this.currentWeatherKey === 'Rainy') && task.id === 'roof_shingles') {
            return false;
        }

        // Historic Restoration Roadmap Prerequisites (inter-room dependencies)
        const prereqStatus = this.getTaskPrerequisiteStatus(taskId);
        if (!prereqStatus.available) {
            return false;
        }

        return true;
    }

    canDoDIY(taskId) {
        const task = this.getTask(taskId);
        if (!task || this.completedTaskIDs.has(taskId)) return false;
        if (!this.isTaskAvailable(taskId)) return false;

        // Check tool
        if (task.toolRequired && !this.ownedToolIDs.has(task.toolRequired)) return false;
        // Check energy AP
        if (this.actionPoints < task.apCost) return false;
        // Check material cost (after shop/shed perks & weather penalties)
        if (this.currentMoney < this.getMaterialCost(taskId).cost) return false;

        return true;
    }

    canHireSub(taskId) {
        const task = this.getTask(taskId);
        if (!task || this.completedTaskIDs.has(taskId)) return false;
        if (!this.isTaskAvailable(taskId)) return false;

        return this.currentMoney >= task.subCost;
    }

    // Woodworking / carpentry tasks benefit from the workshop and wood shed
    isCarpentryTask(task) {
        if (!task) return false;
        if (task.room === 'TempShop' || task.room === 'WoodShed') return false; // building the facilities themselves
        if (task.id === 'found_jack') return false; // jacking uses steel flitch plates & hydraulic steel hardware
        const text = `${task.name} ${task.desc}`.toLowerCase();
        return /\b(oak|walnut|maple|fir|pine|cedar|timber|lumber|wood|wooden|trim|moulding|molding|mantel|banquette|cabinet|joist|stud|framing|beam|baseboard|wainscot|shaker|carpentry)\b/.test(text);
    }

    isMetalworkTask(task) {
        if (!task) return false;
        if (task.room === 'TempShop' || task.room === 'WoodShed') return false;
        return task.id === 'found_jack' || task.id === 'ext_sandblast_ironwork' ||
            /\b(flitch|steel|iron|ironwork|welded|bracket)\b/.test(`${task.name} ${task.desc}`.toLowerCase());
    }

    // Effective DIY material cost with workshop / wood shed perks and wet-lumber penalty
    getMaterialCost(taskId) {
        const task = this.getTask(taskId);
        if (!task) return { base: 0, cost: 0, adjustments: [] };
        const base = task.matCost;
        let multiplier = 1;
        const adjustments = [];
        const has = id => this.completedTaskIDs.has(id);

        if (this.isCarpentryTask(task)) {
            if (has('shop_heavy_workbench') && has('shop_miter_station')) {
                multiplier -= 0.15;
                adjustments.push({ label: "In-house workshop milling (bench + miter station)", pct: -15 });
            }
            if (has('shed_stack_salvage_fir')) {
                multiplier -= 0.10;
                adjustments.push({ label: "Seasoned salvage fir from the wood shed", pct: -10 });
            }
            const wet = this.currentWeatherKey === 'Rainy' || this.currentWeatherKey === 'Stormy';
            const shedCovered = has('shed_timber_framing') && has('shed_corrugated_roof');
            if (wet && !shedCovered) {
                multiplier += 0.10;
                adjustments.push({ label: "Rain-soaked lumber (no covered wood shed)", pct: +10 });
            }
        }
        if (this.isMetalworkTask(task) && has('shop_metal_welding')) {
            multiplier -= 0.20;
            adjustments.push({ label: "Fabricated in your own welding station", pct: -20 });
        }

        return { base, cost: Math.max(0, Math.round(base * multiplier)), adjustments };
    }

    // Real room hazard built from actual site conditions (0-100)
    calculateRoomHazard(roomKey) {
        const factors = [];
        const add = (label, points) => { if (points > 0) factors.push({ label, points }); };
        const has = id => this.completedTaskIDs.has(id);
        const outdoor = ['Exterior', 'Garage', 'WoodShed'].includes(roomKey);

        const pct = this.calculateRoomCompletion(roomKey);
        add(`Unfinished restoration work (${100 - pct}% remaining)`, Math.round((100 - pct) * 0.5));

        if (!this.isFoundationRepaired()) {
            if (roomKey === 'Basement') add("60-ton frame sagging on rotted cedar footings", 30);
            else if (!outdoor) add("Whole house still unlevel (foundation not certified)", 15);
        }

        const roofSealed = has('roof_shingles') || has('roof_slate_copper');
        if (!roofSealed && ['RoofAttic', 'Bedroom', 'Bathroom'].includes(roomKey)) {
            add("Leaking roof overhead", 10);
            if (this.currentWeatherKey === 'Rainy' || this.currentWeatherKey === 'Stormy') add("Active rain coming through the roof", 10);
        }

        if (!has('plumb_lead') && ['Kitchen', 'Bathroom', 'PlumbingHVAC', 'BreakfastNook'].includes(roomKey)) {
            add("116-year-old lead supply lines", 10);
        }

        if (roomKey === 'TempShop') {
            if (!has('shop_dust_collection')) add("Fine sawdust with no dust collection", 8);
            if (has('shop_metal_welding') && !has('shop_exhaust_vent')) add("Weld fumes with no exhaust vent", 10);
        }

        const cats = this.getCatsInRoom ? this.getCatsInRoom(roomKey) : [];
        if (cats.length > 0) add(`${cats.length} cat${cats.length > 1 ? 's' : ''} underfoot`, cats.length * 4);

        if (this.siteClutter >= 70) add("Heavy job-site clutter (trip hazard)", 10);
        else if (this.siteClutter >= 40) add("Moderate job-site clutter", 5);

        const hazardPct = Math.min(100, factors.reduce((s, f) => s + f.points, 0));
        return { hazardPct, factors };
    }

    performTask(taskId, isDIY, modifiers = null) {
        const task = this.getTask(taskId);
        if (!task || this.completedTaskIDs.has(taskId)) return false;

        // Check active Stop-Work Order
        if (this.stopWorkOrders && this.stopWorkOrders[task.room]) {
            if (window.Sound) window.Sound.playError();
            this.log(`🛑 MUNICIPAL STOP-WORK ORDER ACTIVE: All renovation in ${GAME_DATA.ROOMS[task.room]?.name || task.room} is legally halted until safety violations are cleared or a re-inspection fee is paid!`, 'disaster');
            return false;
        }

        let matCost = this.getMaterialCost(taskId).cost;
        let subCost = task.subCost;
        let apCost = task.apCost;
        let taskValue = task.value;
        let clutterDelta = 14;

        if (modifiers) {
            if (modifiers.valueBonusPct) {
                taskValue = Math.round(taskValue * (1 + modifiers.valueBonusPct));
            }
            if (modifiers.cashRebate) {
                if (isDIY) matCost = Math.max(0, matCost - modifiers.cashRebate);
                else subCost = Math.max(0, subCost - modifiers.cashRebate);
            }
            if (modifiers.refundAP) {
                apCost = Math.max(0, apCost - modifiers.refundAP);
            }
            if (modifiers.clutterDelta !== undefined) {
                clutterDelta = modifiers.clutterDelta;
            }
        }

        // Custom Lumber & Materials Staging for Carpentry Tasks
        if (isDIY && this.isCarpentryTask(task)) {
            if (modifiers && modifiers.useLumberType === 'oldGrowth' && this.materialsInventory.oldGrowthLumber > 0) {
                this.materialsInventory.oldGrowthLumber--;
                taskValue = Math.round(taskValue * 1.25);
                matCost = Math.max(0, matCost - 100);
                clutterDelta = Math.max(0, clutterDelta - 5);
                this.log(`✨ Museum-Grade Craftsmanship! You executed '${task.name}' using authentic 1910 quarter-sawn virgin old-growth lumber (+25% Property Value Boost, -$100 material cost savings)!`, 'deal');
            } else if (modifiers && modifiers.useLumberType === 'modern' && this.materialsInventory.modernLumber > 0) {
                this.materialsInventory.modernLumber--;
                matCost = Math.max(0, matCost - 50);
                this.log(`🪵 Staged On-Site Lumber: Used 1 unit of modern dimensional lumber from your shed inventory (-$50 material cost savings).`, 'deal');
            }
        }

        if (isDIY) {
            if (task.toolRequired && !this.ownedToolIDs.has(task.toolRequired)) {
                if (window.Sound) window.Sound.playError();
                return false;
            }
            if (!this.isTaskAvailable(taskId) || this.currentMoney < matCost || this.actionPoints < apCost) {
                if (window.Sound) window.Sound.playError();
                return false;
            }
            this.currentMoney -= matCost;
            this.actionPoints = Math.max(0, this.actionPoints - apCost);
            this.totalSpentOnRehab += matCost;
            if (window.Sound) window.Sound.playHammer();

            // Triggerable Job-Site Hazards (Safety Order Matters!)
            const roomHazard = this.calculateRoomHazard(task.room).hazardPct;
            this.lastHazardIncident = null;
            if (roomHazard >= 50) {
                const triggerChance = Math.min(0.45, (roomHazard - 35) / 100);
                if (Math.random() < triggerChance) {
                    const roll = Math.random();
                    if (roll < 0.40) {
                        // 1. Job-Site Injury
                        const apLoss = this.actionPoints > 0 ? 1 : 0;
                        if (apLoss > 0) this.actionPoints -= apLoss;
                        const medicalCost = 50;
                        this.currentMoney -= medicalCost;
                        this.lastHazardIncident = {
                            type: 'injury',
                            title: '🩹 Job-Site Injury Incident!',
                            room: task.room,
                            hazardPct: roomHazard,
                            desc: `Working inside a ${roomHazard}% hazard zone, Jack stepped on a rusty 1910 horsehair plaster nail through his boot! Required urgent care tetanus shot (-1 ⚡ Stamina, -$${medicalCost}). Remediate structural foundation, roof, and clutter to work safely.`,
                            staminaLost: apLoss,
                            cashLost: medicalCost
                        };
                        this.log(this.lastHazardIncident.desc, 'disaster');
                    } else if (roll < 0.70) {
                        // 2. Structural Deflection & Ceiling Plaster Cave-In
                        const cleanupCost = 120;
                        this.currentMoney -= cleanupCost;
                        this.siteClutter = Math.min(100, this.siteClutter + 30);
                        this.lastHazardIncident = {
                            type: 'collapse',
                            title: '💥 Structural Deflection & Ceiling Cave-In!',
                            room: task.room,
                            hazardPct: roomHazard,
                            desc: `Vibrations from heavy tools caused 200 lbs of rotted horsehair lime plaster and loose lath to cave in overhead! Scattered debris everywhere (+30% Site Clutter, -$${cleanupCost} for emergency structural shoring cribs). Level the foundation and seal the roof first!`,
                            clutterGained: 30,
                            cashLost: cleanupCost
                        };
                        this.log(this.lastHazardIncident.desc, 'disaster');
                    } else {
                        // 3. Municipal Inspector Stop-Work Order (Shutdown)
                        this.stopWorkOrders[task.room] = true;
                        this.lastHazardIncident = {
                            type: 'shutdown',
                            title: '🛑 Municipal Inspector Stop-Work Order!',
                            room: task.room,
                            hazardPct: roomHazard,
                            desc: `City Inspector Henderson spotted dangerous code violations in ${GAME_DATA.ROOMS[task.room]?.name || task.room} (${roomHazard}% active hazards). An official Stop-Work Order has been posted! All construction is halted in this room until hazards are remediated or a $150 re-inspection fee is paid.`,
                            orderActive: true,
                            cashLost: 0
                        };
                        this.log(this.lastHazardIncident.desc, 'disaster');
                    }
                    if (window.Sound) window.Sound.playError();
                }
            }
        } else {
            if (!this.isTaskAvailable(taskId) || this.currentMoney < subCost) {
                if (window.Sound) window.Sound.playError();
                return false;
            }
            this.currentMoney -= subCost;
            this.totalSpentOnRehab += subCost;
            if (window.Sound) window.Sound.playSaw();
        }

        this.completedTaskIDs.add(taskId);
        this.propertyValue += taskValue;

        // Construction debris increases site clutter
        this.siteClutter = Math.min(100, Math.max(0, this.siteClutter + clutterDelta));

        const modeStr = isDIY ? "DIY Hands-On" : "Hired Subcontractor";
        this.log(`🏆 Physical Accomplishment: Completed '${task.name}' via ${modeStr}${qualityStr} (${costStr}, +$${taskValue.toLocaleString()} ARV)`, 'accomplishment', {
            taskId: task.id,
            taskName: task.name,
            roomKey: task.room,
            value: taskValue,
            isAccomplishment: true
        });

        const roomPct = this.calculateRoomCompletion ? this.calculateRoomCompletion(task.room) : 0;
        if (roomPct >= 100) {
            const roomName = this.getRoom ? (this.getRoom(task.room)?.name || task.room) : task.room;
            this.log(`🎉 Room Masterpiece: ${roomName} is 100% Fully Restored & Certified!`, 'accomplishment', { isAccomplishment: true });
        }

        // Demolition Tasks Yield Reclaimed Salvage Beams
        if (task.id === 'found_gut_plaster') {
            this.materialsInventory.salvageLogs += 3;
            this.log("🪵 Timber Salvage Jackpot: Carefully dismantled 1910 lath framework, salvaging 3 virgin old-growth framing timber beams! Mill them in the TempShop or season them in the Wood Shed.", 'deal');
        } else if (task.id === 'bath_gut') {
            this.materialsInventory.salvageLogs += 2;
            this.log("🪵 Salvaged 2 dense heart pine subfloor beams from bathroom tear-out!", 'deal');
        } else if (task.id === 'gar_clean_debris') {
            this.materialsInventory.salvageLogs += 2;
            this.log("🪵 Discovered 2 dry old-growth Douglas fir beams tucked in the carriage house rafters!", 'deal');
        } else if (task.id === 'kit_demo') {
            this.materialsInventory.salvageLogs += 1;
            this.log("🪵 Salvaged 1 reclaimed solid wood beam from old kitchen pantry framing.", 'deal');
        }

        // Specific task bonuses & interactive gameplay effects
        if (task.id === 'ext_move_debris_ordinance') {
            this.siteClutter = Math.max(0, this.siteClutter - 35);
            this.neighborRelation = Math.min(100, this.neighborRelation + 25);
            this.log("📜 Front lawn cleared! All building materials neatly stacked in the backyard. City ordinance Sec. 14-8 satisfied (+25% neighbor relations)!", 'deal');
        } else if (task.id === 'ext_mow_lawn') {
            this.siteClutter = Math.max(0, this.siteClutter - 15);
            this.neighborRelation = Math.min(100, this.neighborRelation + 20);
            this.log("🌿 Lawn neatly cut and edged! Henderson gave a rare thumbs-up across the fence (+20% neighbor relations)!", 'deal');
        } else if (task.id === 'ext_lawn_lights') {
            this.neighborRelation = Math.min(100, this.neighborRelation + 10);
            this.log("💡 Low-voltage brass pathway lanterns illuminated! Front grounds look spectacular at twilight.", 'deal');
        } else if (task.id === 'tool_mulcher_build') {
            this.siteClutter = Math.max(0, this.siteClutter - 25);
            this.log("🪵 High-torque branch mulcher constructed! You can now shred limbs and debris into free organic mulch.", 'deal');
        } else if (task.id === 'eco_solar') {
            this.log("☀️ 16 Monocrystalline solar panels active! Manor daily holding bills slashed by $18/day!", 'deal');
        } else if (task.id === 'eco_wind') {
            this.log("💨 Backyard wind generator online! Clean aero turbine generating power, saving $12/day in holding costs!", 'deal');
        } else if (task.id === 'plumb_lead') {
            this.log("🚰 Toxic 116-year lead supply line excavated and replaced with 1\" PEX-A main! Tap water certified 100% pure for B&B guests!", 'deal');
        }

        // Priority Sequencing warnings & checks
        if ((task.id === 'lr_paint' || task.id === 'bed_drywall') && !this.completedTaskIDs.has('roof_shingles')) {
            this.log("⚠️ Priority sequencing warning: You installed delicate interior finishes while the roof is still leaky! Heavy storms could cause water damage.", 'fee');
        }
        if (task.id === 'bath_shower' && !this.completedTaskIDs.has('plumb_pex')) {
            this.log("⚠️ Priority notice: High-end subway tile installed over 60-year-old galvanized supply lines.", 'fee');
        }

        // High clutter hazard: 25% chance of misplacing tools or making a mess
        if (this.siteClutter >= 75 && Math.random() < 0.3) {
            if (this.toolsOrganized) {
                this.log(`🛡️ Clutter Hazard Averted: Even though job site debris is high, your organized shadow-board tool racks kept all saws and drivers safe!`, 'deal');
            } else {
                const misplacedCost = 35;
                this.currentMoney -= misplacedCost;
                this.log(`⚠️ Clutter Chaos! Tripped over a pile of scrap 2x4s and spilled a tub of tile grout: -$${misplacedCost}`, 'disaster');
            }
        }

        this.saveGame();
        this.notify();
        return true;
    }

    liftStopWorkOrder(roomKey, payFee = true) {
        if (!this.stopWorkOrders || !this.stopWorkOrders[roomKey]) return false;
        if (payFee) {
            if (this.currentMoney < 150) {
                if (window.Sound) window.Sound.playError();
                this.log("Need $150 to pay the municipal expedited re-inspection fee.", 'fee');
                return false;
            }
            this.currentMoney -= 150;
            delete this.stopWorkOrders[roomKey];
            if (window.Sound) window.Sound.playSuccess();
            this.log(`🏛️ Stop-Work Order Lifted! Paid $150 municipal re-inspection fee for ${GAME_DATA.ROOMS[roomKey]?.name || roomKey}. Construction work may resume.`, 'deal');
            this.saveGame();
            this.notify();
            return true;
        } else {
            const h = this.calculateRoomHazard(roomKey).hazardPct;
            if (h <= 40) {
                delete this.stopWorkOrders[roomKey];
                if (window.Sound) window.Sound.playSuccess();
                this.log(`🏛️ Stop-Work Order Lifted! Municipal safety inspector verified hazards in ${GAME_DATA.ROOMS[roomKey]?.name || roomKey} reduced to ${h}%. Free signoff granted!`, 'deal');
                this.saveGame();
                this.notify();
                return true;
            } else {
                if (window.Sound) window.Sound.playError();
                this.log(`Cannot lift without fee: ${GAME_DATA.ROOMS[roomKey]?.name || roomKey} still has ${h}% hazard (must be 40% or lower for free signoff).`, 'fee');
                return false;
            }
        }
    }

    buyLumber(type = 'modern', count = 5) {
        const costPerUnit = type === 'oldGrowth' ? 45 : 15;
        const totalCost = costPerUnit * count;
        if (this.currentMoney < totalCost) {
            if (window.Sound) window.Sound.playError();
            this.log(`Need $${totalCost} to purchase ${count} units of ${type === 'oldGrowth' ? 'salvage timber' : 'modern SPF lumber'}.`, 'fee');
            return false;
        }
        this.currentMoney -= totalCost;
        if (type === 'oldGrowth') {
            this.materialsInventory.salvageLogs += count;
            this.log(`🪵 Purchased ${count} reclaimed rough salvage timber beams for $${totalCost}. Stage them in the Wood Shed or mill in TempShop.`, 'deal');
        } else {
            this.materialsInventory.modernLumber += count;
            this.log(`🪵 Purchased ${count} units of standard modern dimensional lumber from the building supply depot for $${totalCost}.`, 'deal');
        }
        if (window.Sound) window.Sound.playSaw();
        this.saveGame();
        this.notify();
        return true;
    }

    millSalvageLogs(count = 1) {
        if (!this.completedTaskIDs.has('shop_heavy_workbench') && !this.completedTaskIDs.has('shop_miter_station')) {
            if (window.Sound) window.Sound.playError();
            this.log("You need an active TempShop workbench or sliding miter saw station to mill lumber on site!", 'fee');
            return false;
        }
        if (this.materialsInventory.salvageLogs < count) {
            if (window.Sound) window.Sound.playError();
            this.log(`Need at least ${count} rough salvage timber beam(s) to mill. Find more at the junkyard or demo old rooms.`, 'fee');
            return false;
        }
        if (this.actionPoints < 1) {
            if (window.Sound) window.Sound.playError();
            this.log("Milling heavy timber requires 1 Stamina ⚡.", 'fee');
            return false;
        }
        this.actionPoints -= 1;
        this.materialsInventory.salvageLogs -= count;
        const yielded = count * 2;
        this.materialsInventory.oldGrowthLumber += yielded;
        this.siteClutter = Math.min(100, this.siteClutter + 4);
        if (window.Sound) window.Sound.playSaw();
        this.log(`🪚 TempShop Milling Success! Resawed and planed ${count} salvage beam(s) into ${yielded} boards of museum-grade 1910 virgin old-growth lumber!`, 'deal');
        this.saveGame();
        this.notify();
        return true;
    }

    // Organize & Calibrate Pro Tools Chore Action
    organizeTools() {
        if (this.actionPoints < 1) {
            if (window.Sound) window.Sound.playError();
            this.log("Need at least 1 Stamina ⚡ to organize and calibrate your tools.", 'fee');
            return false;
        }

        this.actionPoints -= 1;
        this.siteClutter = Math.max(0, this.siteClutter - 20);
        this.toolsOrganized = true;
        this.toolsOrganizedDays = 2; // Active for 2 full days

        if (window.Sound) {
            window.Sound.playClink();
            window.Sound.playHammer();
        }

        // 50% chance to find lost loose brass screws, specialty driver bits, or cash in toolboxes
        if (Math.random() < 0.5) {
            const foundBonus = Math.floor(Math.random() * 35) + 25;
            this.currentMoney += foundBonus;
            this.log(`🧰 Tools meticulously organized! Saws oiled, chisels honed, and pegboards stocked in the shop. Found +$${foundBonus} in spare brass hardware & cash tucked in a tool pouch (-20% Clutter, +Craftsmanship Precision)!`, 'deal');
        } else {
            this.log(`🧰 Tools meticulously organized! Saws oiled, blades trued, cordless batteries charged, and hand tools hung on shadow boards (-20% Clutter, +Craftsmanship Precision).`, 'deal');
        }

        this.saveGame();
        this.notify();
        return true;
    }

    // Clean & Organize Job Site
    cleanJobSite() {
        if (this.actionPoints < 1) {
            if (window.Sound) window.Sound.playError();
            this.log("Need at least 1 Stamina ⚡ to organize and clean the job site.", 'fee');
            return false;
        }

        this.actionPoints -= 1;
        this.siteClutter = 0;
        if (window.Sound) window.Sound.playCashRegister();

        // 45% chance to find lost loose change or screws in the sawdust!
        if (Math.random() < 0.45) {
            const foundMoney = Math.floor(Math.random() * 40) + 20;
            this.currentMoney += foundMoney;
            this.log(`✨ Job site swept and organized! While clearing drywall dust, you found +$${foundMoney} in lost bills and coins!`, 'deal');
        } else {
            this.log(`✨ Job site completely tidied! Tools organized on pegboards, cords coiled, clutter reduced to 0%.`, 'deal');
        }

        this.saveGame();
        this.notify();
        return true;
    }

    // Mow Overgrown Yard Action
    mowYard() {
        if (this.actionPoints < 1) {
            if (window.Sound) window.Sound.playError();
            this.log("Need at least 1 Stamina ⚡ to mow the lawn.", 'fee');
            return false;
        }

        this.actionPoints -= 1;
        this.siteClutter = Math.max(0, this.siteClutter - 15);
        this.neighborRelation = Math.min(100, this.neighborRelation + 15);
        if (window.Sound) window.Sound.playSaw();

        // 35% chance to find lost coins in the tall grass
        if (Math.random() < 0.35) {
            const foundMoney = Math.floor(Math.random() * 25) + 15;
            this.currentMoney += foundMoney;
            this.log(`🌿 Yard freshly mowed and edged! Found +$${foundMoney} in vintage coins hidden in the crabgrass (+15% neighbor relations).`, 'deal');
        } else {
            this.log(`🌿 Yard freshly mowed and edges trimmed! Lawn looks manicured (+15% neighbor relations, -15% clutter).`, 'deal');
        }

        this.saveGame();
        this.notify();
        return true;
    }

    // Move Construction Staging to Backyard (Ordinance Compliance)
    moveDebrisToBackyard() {
        if (this.actionPoints < 1) {
            if (window.Sound) window.Sound.playError();
            this.log("Need at least 1 Stamina ⚡ to move construction debris.", 'fee');
            return false;
        }

        this.actionPoints -= 1;
        this.siteClutter = Math.max(0, this.siteClutter - 30);
        this.neighborRelation = Math.min(100, this.neighborRelation + 20);
        if (window.Sound) window.Sound.playHammer();

        this.log(`📦 Relocated front yard scrap, lumber, and mortar tubs behind the backyard privacy fence! Front lawn is 100% compliant with municipal ordinances (+20% neighbor relations, -30% clutter).`, 'deal');

        this.saveGame();
        this.notify();
        return true;
    }

    // Run Branch Mulcher Action
    runMulcher() {
        if (!this.completedTaskIDs.has('tool_mulcher_build')) {
            if (window.Sound) window.Sound.playError();
            this.log("You must first build the branch mulcher in the Carriage House & Garage!", 'fee');
            return false;
        }

        if (this.actionPoints < 1) {
            if (window.Sound) window.Sound.playError();
            this.log("Need at least 1 Stamina ⚡ to run the branch mulcher.", 'fee');
            return false;
        }

        this.actionPoints -= 1;
        this.siteClutter = Math.max(0, this.siteClutter - 35);
        this.propertyValue += 150;
        if (window.Sound) window.Sound.playSaw();

        this.log(`🪵 Shredded scrap wood and pruned branches into fine organic garden mulch! Flowerbeds top-dressed (-35% clutter, +$150 property appraisal value).`, 'deal');

        this.saveGame();
        this.notify();
        return true;
    }

    // Care for the 4 Cats (Feeding & Affection)
    careForCats() {
        if (this.actionPoints < 1 && this.currentMoney < 20) {
            if (window.Sound) window.Sound.playError();
            this.log("Need 1 Stamina ⚡ or $20 to buy gourmet salmon treats for the cats.", 'fee');
            return false;
        }

        if (this.actionPoints >= 1) {
            this.actionPoints -= 1;
            this.log("🐱 Fed Barnaby, Mochi, Rusty, and Jumper high-protein wet food and spent quality time petting them.", 'welcome');
        } else {
            this.currentMoney -= 20;
            this.log("🐱 Bought a $20 bag of gourmet salmon treats and catnip for the 4 cats.", 'welcome');
        }

        this.cats.forEach(c => {
            c.hunger = 0;
            c.affection = 100;
        });

        if (window.Sound) {
            window.Sound.playCatMeow();
            setTimeout(() => window.Sound.playCatPurr(), 300);
        }

        this.saveGame();
        this.notify();
        return true;
    }

    // Scavenge at Lucky Lou's Auto & Scrap Salvage
    scavengeJunkyard() {
        const entranceFee = 35;
        if (this.actionPoints < 1) {
            if (window.Sound) window.Sound.playError();
            this.log("Need 1 Stamina ⚡ to go rummaging through junkyard scrap piles.", 'fee');
            return false;
        }
        if (this.currentMoney < entranceFee) {
            if (window.Sound) window.Sound.playError();
            this.log(`Need $${entranceFee} for Lucky Lou's junkyard gate & picker truck fee.`, 'fee');
            return false;
        }

        this.actionPoints -= 1;
        this.currentMoney -= entranceFee;
        if (window.Sound) window.Sound.playScrapClatter();

        // Roll from loot table
        const lootPool = GAME_DATA.JUNKYARD_LOOT;
        const found = lootPool[Math.floor(Math.random() * lootPool.length)];

        this.salvageInventory.unshift({
            ...found,
            foundDay: this.currentDay
        });

        if (found.isCashInstant) {
            this.currentMoney += found.scrapValue;
            this.log(`🚗 JUNKYARD JACKPOT! Found '${found.name}'. Sold immediately to the metal buyer for +$${found.scrapValue}!`, 'deal');
        } else if (found.isCatItem) {
            this.isCatTowerOwned = true;
            this.log(`🚗 JUNKYARD SALVAGE: Found '${found.name}'! Hauled it to the site. The 4 cats love it! Their daily mischief is pacified.`, 'deal');
        } else if (found.unlocksTask) {
            this.unlockedSalvageTaskIDs.add(found.unlocksTask);
            this.log(`🚗 RARE ARCHITECTURAL SALVAGE! Uncovered '${found.name}'! Unlocked special renovation project '${found.unlocksTask}' (+ $${found.installValue.toLocaleString()} potential value)!`, 'deal');
        } else {
            this.log(`🚗 JUNKYARD PICK: Found '${found.name}' (${found.rarity}). Stashed in your salvage inventory.`, 'deal');
        }

        this.saveGame();
        this.notify();
        return true;
    }

    // Trigger an interactive dilemma / problem modal
    triggerDilemma(dilemma) {
        this.pendingDilemma = dilemma;
        if (window.Sound) {
            if (dilemma.category === 'cats') window.Sound.playCatMeow();
            else if (dilemma.category === 'neighbor') window.Sound.playNeighborGrumble();
            else window.Sound.playError();
        }
        this.saveGame();
        this.notify();
    }

    // Resolve active dilemma choice
    resolveDilemma(choiceIndex) {
        if (!this.pendingDilemma) return;
        const dilemma = this.pendingDilemma;
        const choice = dilemma.choices[choiceIndex];
        if (!choice) return;

        // Apply costs & AP
        if (choice.cost) this.currentMoney -= choice.cost;
        if (choice.apCost) this.actionPoints = Math.max(0, this.actionPoints - choice.apCost);
        if (choice.relationDelta) this.neighborRelation = Math.max(0, Math.min(100, this.neighborRelation + choice.relationDelta));
        if (choice.clutterDelta) this.siteClutter = Math.max(0, Math.min(100, this.siteClutter + choice.clutterDelta));
        if (choice.valueDelta) this.propertyValue += choice.valueDelta;
        if (choice.hazardCash) this.currentMoney += choice.hazardCash;

        this.log(`[PROBLEM RESOLVED] ${choice.log}`, choice.hazardCash < 0 ? 'disaster' : 'deal');

        if (window.Sound) {
            if (choice.hazardCash < 0 || choice.cost > 100) window.Sound.playError();
            else window.Sound.playSuccess();
        }

        this.pendingDilemma = null;
        this.saveGame();
        this.notify();
    }

    getRenovationTimeline() {
        const totalDays = this.currentDay;
        const currentWeek = Math.floor((totalDays - 1) / 7) + 1;
        const currentMonth = Math.floor((totalDays - 1) / 30) + 1;

        const fullMonths = Math.floor(totalDays / 30);
        const remAfterMonths = totalDays % 30;
        const fullWeeks = Math.floor(remAfterMonths / 7);
        const remDays = remAfterMonths % 7;

        const parts = [];
        if (fullMonths > 0) parts.push(`${fullMonths} Mo${fullMonths > 1 ? 's' : ''}`);
        if (fullWeeks > 0) parts.push(`${fullWeeks} Wk${fullWeeks > 1 ? 's' : ''}`);
        if (remDays > 0 || parts.length === 0) parts.push(`${remDays} Day${remDays !== 1 ? 's' : ''}`);
        const elapsedBreakdown = parts.join(', ');

        return {
            day: totalDays,
            week: currentWeek,
            month: currentMonth,
            shortDisplay: `Day ${totalDays} • Wk ${currentWeek} • Mo ${currentMonth}`,
            detailedDisplay: `Day ${totalDays} (${elapsedBreakdown})`,
            elapsedBreakdown: elapsedBreakdown
        };
    }

    advanceDay() {
        this.currentDay++;

        // 3-5 random energy bolts a day based on rest & energy level (Max 5)
        const rolledBolts = Math.floor(Math.random() * 3) + 3; // 3, 4, or 5
        this.actionPoints = rolledBolts;
        this.dailyEnergyRoll = rolledBolts;

        // Holding costs (discounted by solar & wind generators)
        const rawHolding = this.currentHouse.holdingCostPerDay;
        let ecoSavings = 0;
        if (this.completedTaskIDs.has('eco_solar')) ecoSavings += 18;
        if (this.completedTaskIDs.has('eco_wind')) ecoSavings += 12;
        const netBaseHolding = Math.max(10, rawHolding - ecoSavings);

        const loanInterest = Math.round(this.loanDebt * 0.05);
        const totalHolding = netBaseHolding + loanInterest;

        this.currentMoney -= totalHolding;
        this.totalHoldingCostsPaid += totalHolding;

        const timeline = this.getRenovationTimeline();
        this.log(`🌅 ${timeline.shortDisplay} Begins: Carrying overhead -$${totalHolding} (${this.currentWeatherKey} weather)`, 'day');

        // Clutter creeps up slightly over time
        this.siteClutter = Math.min(100, this.siteClutter + 4);

        // Tools organized status countdown
        if (this.toolsOrganizedDays > 0) {
            this.toolsOrganizedDays--;
            if (this.toolsOrganizedDays === 0) {
                this.toolsOrganized = false;
            }
        }

        // Wood Shed lumber seasoning (if shed_stack_salvage_fir completed)
        if (this.completedTaskIDs.has('shed_stack_salvage_fir') && this.currentDay % 2 === 0) {
            this.materialsInventory.oldGrowthLumber += 1;
            this.log("🪵 Solar Kiln Seasoning: Your exterior wood shed solar circulation fans cured +1 board of virgin old-growth Douglas fir!", 'deal');
        }

        // Cats hunger increases and affection wanes if not cuddled
        this.cats.forEach(c => {
            c.hunger = Math.min(100, c.hunger + 22);
            c.affection = Math.max(0, c.affection - 12);
        });

        // Wandering cats explore different rooms of Whispering Pines Manor
        this.updateCatLocations();

        // Weather roll
        const weatherRoll = Math.random();
        if (weatherRoll < 0.42) this.currentWeatherKey = 'Sunny';
        else if (weatherRoll < 0.68) this.currentWeatherKey = 'Rainy';
        else if (weatherRoll < 0.82) this.currentWeatherKey = 'Stormy';
        else if (weatherRoll < 0.92) this.currentWeatherKey = 'Heatwave';
        else this.currentWeatherKey = 'FreezingCold';

        const weather = GAME_DATA.WEATHER[this.currentWeatherKey];

        // Weather Hazards (Lemonade Stand dynamic risk)
        if (this.currentWeatherKey === 'Stormy' && !this.completedTaskIDs.has('roof_shingles')) {
            const leakDamage = 280;
            this.currentMoney -= leakDamage;
            this.log(`⛈️ WATER INFILTRATION! The unpatched roof leaked during the storm. Emergency drywall drying: -$${leakDamage}`, 'disaster');
        } else if (this.currentWeatherKey === 'FreezingCold' && !this.completedTaskIDs.has('plumb_pex')) {
            const freezeCost = 210;
            this.currentMoney -= freezeCost;
            this.log(`❄️ PIPE FREEZE WARNING! Uninsulated galvanized lines froze and cracked a coupler. Repair: -$${freezeCost}`, 'disaster');
        } else if (this.currentWeatherKey === 'Heatwave') {
            this.currentMoney -= 35;
            this.log(`🔥 Scorching heat! Workers required commercial misting fans and electrolyte hydration: -$35`, 'fee');
        }

        // Cat mischief if neglected and no cat tower
        const avgHunger = this.cats.reduce((acc, c) => acc + c.hunger, 0) / this.cats.length;
        if (avgHunger > 65 && !this.isCatTowerOwned && Math.random() < 0.45) {
            const catMischiefs = [
                { title: "Barnaby's Sawdust Snooze", msg: "Barnaby took a 4-hour nap on the blueprint table, knocking over two coffee cups onto the floor plan!", cost: 25 },
                { title: "Mochi's Tile Grout Hop", msg: "Mochi walked across freshly set bathroom wall tiles, slightly misaligning two corner spacers!", cost: 40 },
                { title: "Rusty's Tape Heist", msg: "Rusty chewed through 3 fresh rolls of green painter's tape. Replacements purchased: -$22.", cost: 22 },
                { title: "Jumper's Flash Zoomies", msg: "Jumper had 2 AM zoomies through the crawlspace, knocking over a box of copper elbow fittings: -$30.", cost: 30 }
            ];
            const misch = catMischiefs[Math.floor(Math.random() * catMischiefs.length)];
            this.currentMoney -= misch.cost;
            this.log(`🐱 CAT MISCHIEF: ${misch.title} - ${misch.msg}`, 'disaster');
            if (window.Sound) window.Sound.playCatMeow();
        }

        // 45% chance to trigger an interactive DILEMMA problem modal!
        if (Math.random() < 0.48 && GAME_DATA.DILEMMAS && GAME_DATA.DILEMMAS.length > 0) {
            const randomDilemma = GAME_DATA.DILEMMAS[Math.floor(Math.random() * GAME_DATA.DILEMMAS.length)];
            this.triggerDilemma(randomDilemma);
        } else if (Math.random() < 0.35) {
            // Standard small event
            const ev = GAME_DATA.DAILY_EVENTS[Math.floor(Math.random() * GAME_DATA.DAILY_EVENTS.length)];
            this.currentMoney += ev.cashDelta;
            this.propertyValue += ev.valueDelta;
            this.log(`EVENT: ${ev.title} - ${ev.desc}`, ev.type);
        }

        if (window.Sound) window.Sound.playAdvanceDay();
        this.saveGame();
        this.notify();
    }

    takeEmergencyLoan() {
        const loanAmount = 2500;
        this.loanDebt += loanAmount;
        this.currentMoney += loanAmount;
        if (window.Sound) window.Sound.playCashRegister();
        this.log(`🏦 Took $2,500 Hard-Money Bridge Loan. Adds 5% ($125/day) daily carrying cost until repaid!`, 'disaster');
        this.saveGame();
        this.notify();
    }

    repayLoan() {
        if (this.loanDebt <= 0 || this.currentMoney < this.loanDebt) {
            if (window.Sound) window.Sound.playError();
            return false;
        }

        this.currentMoney -= this.loanDebt;
        this.log(`Cleared total loan debt of $${this.loanDebt.toLocaleString()}! Daily interest eliminated.`, 'deal');
        this.loanDebt = 0;
        if (window.Sound) window.Sound.playCashRegister();
        this.saveGame();
        this.notify();
        return true;
    }

    calculateTotalCompletion() {
        const rooms = Object.keys(this.getRooms ? this.getRooms() : (GAME_DATA.ROOMS || {}));
        if (rooms.length === 0) return 0;
        let sum = 0;
        rooms.forEach(r => {
            sum += this.calculateRoomCompletion(r);
        });
        return Math.round(sum / rooms.length);
    }

    calculateRoomCompletion(roomKey) {
        const roomTasks = this.getTasksForRoom ? this.getTasksForRoom(roomKey) : (GAME_DATA.TASKS || []).filter(t => t.room === roomKey);
        if (roomTasks.length === 0) return 100;
        const done = roomTasks.filter(t => this.completedTaskIDs.has(t.id)).length;
        return Math.round((done / roomTasks.length) * 100);
    }

    getRoomRenovationStage(pct) {
        if (pct === 100) {
            return {
                id: 'masterpiece',
                className: 'stage-masterpiece',
                badgeClass: 'badge-masterpiece',
                label: '🏆 Masterpiece',
                tag: 'HERITAGE MASTERPIECE',
                icon: '🏆',
                desc: 'Certified Victorian Heirloom Craftsmanship'
            };
        } else if (pct >= 80) {
            return {
                id: 'restored',
                className: 'stage-restored',
                badgeClass: 'badge-restored',
                label: '✨ Restored',
                tag: 'HERITAGE RESTORED',
                icon: '✨',
                desc: 'Refined Historic Finishes & Millwork'
            };
        } else if (pct >= 40) {
            return {
                id: 'roughin',
                className: 'stage-roughin',
                badgeClass: 'badge-roughin',
                label: '🔨 Rough-In',
                tag: 'ROUGH-IN FRAMING',
                icon: '🔨',
                desc: 'Structural Framing, Wiring & Rough Plumbing'
            };
        } else {
            return {
                id: 'condemned',
                className: 'stage-condemned',
                badgeClass: 'badge-condemned',
                label: '⚠️ Hazard',
                tag: 'CONDEMNED / DEMO',
                icon: '⚠️',
                desc: '116-Year Neglect & Critical Hazard Demo'
            };
        }
    }

    getCat(catId) {
        return this.cats.find(c => c.id === catId);
    }

    getCatsInRoom(roomKey) {
        return this.cats.filter(c => c.currentRoom === roomKey);
    }

    getCatAntic(catId, roomKey) {
        const cat = this.getCat(catId);
        const targetRoom = roomKey || (cat ? cat.currentRoom : 'LivingRoom');
        const antics = GAME_DATA.CAT_ROOM_ANTICS?.[catId];
        return (antics && antics[targetRoom]) || "Keeping watch over the historic manor restoration.";
    }

    updateCatLocations(force = false) {
        const allRooms = Object.keys(GAME_DATA.ROOMS);
        const favoriteHaunts = {
            barnaby: ['LivingRoom', 'Kitchen', 'BreakfastNook', 'Sunroom', 'Bedroom', 'RoofAttic', 'Basement'],
            mochi: ['Bathroom', 'Bedroom', 'BreakfastNook', 'Exterior', 'Sunroom', 'LivingRoom', 'Kitchen'],
            rusty: ['Basement', 'Garage', 'BreakfastNook', 'PlumbingHVAC', 'Sunroom', 'RoofAttic', 'LivingRoom'],
            jumper: ['RoofAttic', 'Sunroom', 'BreakfastNook', 'LivingRoom', 'Garage', 'Exterior', 'Bedroom']
        };

        const movements = [];
        this.cats.forEach(cat => {
            // If force is true, always move; otherwise 75% wander probability
            if (force || Math.random() < 0.75) {
                const favs = favoriteHaunts[cat.id] || allRooms;
                // 70% chance to pick a favorite haunt, 30% chance to roam anywhere
                const pool = (Math.random() < 0.70) ? favs : allRooms;
                const newRoomCandidates = pool.filter(r => r !== cat.currentRoom);
                const chosenRoom = newRoomCandidates.length > 0 
                    ? newRoomCandidates[Math.floor(Math.random() * newRoomCandidates.length)]
                    : cat.currentRoom;

                if (chosenRoom !== cat.currentRoom) {
                    const prevRoom = cat.currentRoom;
                    cat.currentRoom = chosenRoom;
                    const antic = this.getCatAntic(cat.id, chosenRoom);
                    movements.push({ cat, from: prevRoom, to: chosenRoom, antic });
                }
            }
        });

        return movements;
    }

    interactWithCat(catId, action, targetRoom = null) {
        const cat = this.getCat(catId);
        if (!cat) return { success: false, message: "Cat not found!" };

        if (action === 'pet') {
            cat.affection = Math.min(100, (cat.affection || 50) + 15);
            const msg = `🐾 Petted ${cat.name}! Affection rose to ${cat.affection}%. Warm purrs echo through ${GAME_DATA.ROOMS[cat.currentRoom]?.name || 'the manor'}!`;
            this.log(msg, 'deal');
            this.saveGame();
            this.notify();
            return {
                success: true,
                action: 'pet',
                message: msg,
                cat: cat
            };
        } else if (action === 'treat') {
            const treatCost = 8;
            if (this.currentMoney < treatCost) {
                return {
                    success: false,
                    action: 'treat',
                    message: `Need $${treatCost} to purchase a gourmet wild salmon fillet treat!`,
                    cat: cat
                };
            }
            this.currentMoney -= treatCost;
            cat.hunger = Math.max(0, (cat.hunger || 50) - 25);
            cat.affection = Math.min(100, (cat.affection || 50) + 10);
            const msg = `🐟 Gourmet Salmon Treat for ${cat.name}! (-$${treatCost}, Hunger: ${cat.hunger}%, Affection: ${cat.affection}%)`;
            this.log(msg, 'deal');
            this.saveGame();
            this.notify();
            return {
                success: true,
                action: 'treat',
                message: msg,
                cat: cat
            };
        } else if (action === 'move' && targetRoom && GAME_DATA.ROOMS[targetRoom]) {
            cat.currentRoom = targetRoom;
            const antic = this.getCatAntic(cat.id, targetRoom);
            const msg = `Moved ${cat.name} to ${GAME_DATA.ROOMS[targetRoom].name}.`;
            this.saveGame();
            this.notify();
            return {
                success: true,
                action: 'move',
                message: msg,
                cat: cat,
                antic: antic
            };
        } else if (action === 'roam') {
            const movements = this.updateCatLocations(true);
            const msg = `🐾 The resident cats explored the manor! ${movements.length} cats found new favorite spots.`;
            this.log(msg, 'day');
            this.saveGame();
            this.notify();
            return {
                success: true,
                action: 'roam',
                message: msg,
                movements: movements
            };
        }

        return { success: false, message: "Unknown action." };
    }

    isFoundationRepaired() {
        return this.completedTaskIDs.has('found_gut_plaster') &&
               this.completedTaskIDs.has('found_jack') &&
               this.completedTaskIDs.has('found_piers') &&
               this.completedTaskIDs.has('found_fieldstone');
    }

    getFoundationStatus() {
        const isGutPlaster = this.completedTaskIDs.has('found_gut_plaster');
        const isJacked = this.completedTaskIDs.has('found_jack');
        const isPiers = this.completedTaskIDs.has('found_piers');
        const isFieldstone = this.completedTaskIDs.has('found_fieldstone');

        if (isGutPlaster && isJacked && isPiers && isFieldstone) {
            return {
                isRepaired: true,
                statusText: "Reinforced & Level (B&B Certified)",
                badgeClass: "complete",
                details: "All 1910 sagging timber beams jacked level after stripping 1,100-lb plaster walls (shedding 12+ tons from the 60-ton frame) and bolted to reinforced concrete piers. Safe for guests!"
            };
        }

        const missing = [];
        if (!isGutPlaster) missing.push("Gut 1,100-lb Plaster Walls (Shed 12+ Tons Dead Load)");
        if (!isJacked) missing.push("Hydraulic Jacking & Center Beam Sistering");
        if (!isPiers) missing.push("Excavate & Pour Concrete Footing Piers");
        if (!isFieldstone) missing.push("Repoint 1910 Fieldstone Masonry");

        return {
            isRepaired: false,
            statusText: "Severe 3.5\" Sag (Condemned for Lodging)",
            badgeClass: "danger",
            missing: missing,
            details: `Settling causes sloping parlor floors and jammed doors in the 60-ton 1910 structure. Missing: ${missing.join(', ')}.`
        };
    }

    calculateGrade() {
        const pct = this.calculateTotalCompletion();
        const found = this.isFoundationRepaired();

        if (!found) {
            return { grade: "F", desc: "Condemned: Foundation Sinking (-3.5 in)" };
        }

        if (pct >= 90) return { grade: "5★", desc: "5-Star Luxury Heritage Bed & Breakfast" };
        if (pct >= 75) return { grade: "4★", desc: "4-Star Elegant Country Victorian Inn" };
        if (pct >= 55) return { grade: "3★", desc: "3-Star Charming Historic Guest House" };
        if (pct >= 35) return { grade: "2★", desc: "2-Star Rustic Traveler's Lodge" };
        return { grade: "1★", desc: "1-Star Basic Fixer-Upper Lodging" };
    }

    generateBnbWeekendBookings(menuId = null) {
        const found = this.isFoundationRepaired();
        if (!found) {
            return {
                canOpen: false,
                reason: "City Building Department DENIED Bed & Breakfast hospitality permit! The 116-year-old foundation has settled 3.5 inches under 60 tons of dead weight. You must complete all critical Foundation repairs in the '1910 Bad Foundation & 60-Ton Frame' room (including tearing out the 1,100-lb plaster walls before raising the house) before hosting paying overnight guests!",
                missing: this.getFoundationStatus().missing
            };
        }

        const activeMenuId = menuId || this.selectedBreakfastMenu || 'continental';
        const breakfastMenu = (GAME_DATA.BREAKFAST_MENUS && GAME_DATA.BREAKFAST_MENUS.find(m => m.id === activeMenuId)) || {
            id: 'continental', name: "Continental Porch Pastries & Drip Coffee", cost: 15, tipMultiplier: 1.0
        };

        const compPct = this.calculateTotalCompletion();
        const hasLeadPipesReplaced = this.completedTaskIDs.has('plumb_lead_pipes');
        const allArchetypes = [...(GAME_DATA.GUEST_ARCHETYPES || [])];
        const sampleSize = Math.min(5, allArchetypes.length);
        const shuffled = allArchetypes.sort(() => 0.5 - Math.random()).slice(0, sampleSize);

        const bookings = shuffled.map(guest => {
            let favBonus = 0;
            if (guest.favRooms && guest.favRooms.length > 0) {
                let sum = 0;
                guest.favRooms.forEach(rm => {
                    sum += this.calculateRoomCompletion(rm);
                });
                favBonus = (sum / guest.favRooms.length) / 100;
            }

            // Base satisfaction starts at 68
            let satisfaction = 68;
            satisfaction += (compPct / 100) * 16;
            satisfaction += favBonus * 12;

            // Lead pipes check
            let waterNote = "";
            if (hasLeadPipesReplaced) {
                satisfaction += 6;
                waterNote = "Water from the restored copper lines was pure mountain crispness.";
            } else {
                satisfaction -= 14;
                waterNote = "The ancient lead pipes left a metallic aftertaste in the tap water!";
            }

            // Clutter check
            let clutterNote = "";
            if (this.siteClutter > 35) {
                satisfaction -= 10;
                clutterNote = "Heavy construction debris piled in the front yard was an eyesore.";
            } else if (this.siteClutter <= 12) {
                satisfaction += 5;
                clutterNote = "The Victorian wrap-around grounds were immaculate and tidy.";
            }

            // Breakfast evaluation
            let breakfastNote = "";
            const isPreferred = guest.preferredBreakfast && guest.preferredBreakfast.includes(breakfastMenu.id);
            if (isPreferred) {
                satisfaction += 14;
                breakfastNote = `The morning ${breakfastMenu.name} was divine! Exactly what we desired.`;
            } else if (breakfastMenu.id === 'chef_barnaby_tuna') {
                if (guest.id === 'cat_fanatics' || guest.id === 'ghost_hunters') {
                    satisfaction += 20;
                    breakfastNote = "Chef Barnaby's tuna waffles were quirky, whimsical, and delicious!";
                } else if (guest.id === 'foodies') {
                    satisfaction -= 8;
                    breakfastNote = "Tuna tartare on sweet waffles? An eccentric dish that perplexed our palate.";
                } else {
                    satisfaction += 5;
                    breakfastNote = "The whimsical cat-themed breakfast waffle gave us quite a chuckle.";
                }
            } else {
                satisfaction += 4;
                breakfastNote = `Breakfast served was ${breakfastMenu.name}. A pleasant country start to the day.`;
            }

            // Cat interaction
            const randomCat = this.cats[Math.floor(Math.random() * this.cats.length)];
            let catQuote = "";
            const catHappiness = (randomCat.affection !== undefined) ? randomCat.affection : 60;
            if (catHappiness >= 55) {
                satisfaction += 6;
                const happyInteractions = [
                    `${randomCat.name} curled up beside our luggage and purred like an antique clock!`,
                    `${randomCat.name} politely greeted us on the veranda steps each morning.`,
                    `${randomCat.name} kept us company at the parlor fireplace for two cozy hours.`,
                    `${randomCat.name} performed an astonishing acrobat leap from the staircase bannister!`
                ];
                catQuote = happyInteractions[Math.floor(Math.random() * happyInteractions.length)];
            } else {
                satisfaction -= 4;
                const grumpyInteractions = [
                    `${randomCat.name} was having a moody morning and hissed when we admired the parlor rug.`,
                    `${randomCat.name} playfully swatted at our shoe laces and knocked over a teacup saucer.`,
                    `${randomCat.name} sat atop the doorframe glaring suspiciously down at us.`,
                    `${randomCat.name} sprinted through the hallway at 2 AM like a runaway timber wagon.`
                ];
                catQuote = grumpyInteractions[Math.floor(Math.random() * grumpyInteractions.length)];
            }

            // Clamped satisfaction (20-100)
            satisfaction = Math.max(20, Math.min(100, Math.round(satisfaction)));

            // Stars & Headline
            let stars = 3;
            let ratingTitle = "Pleasant Stay";
            if (satisfaction >= 88) {
                stars = 5;
                const titles5 = [
                    "Pure Victorian Magic & Heirloom Splendor!",
                    "A 5-Star Historic Sanctuary!",
                    "Unforgettable Charm & Purring Hosts!",
                    "Heirloom Craftsmanship at its Finest!"
                ];
                ratingTitle = titles5[Math.floor(Math.random() * titles5.length)];
            } else if (satisfaction >= 72) {
                stars = 4;
                const titles4 = [
                    "Charming Stay with Delightful Feline Antics",
                    "Wonderful Victorian Character & Warm Porches",
                    "Great Heritage Atmosphere in Whispering Pines",
                    "Cozy Antique Rooms with Character"
                ];
                ratingTitle = titles4[Math.floor(Math.random() * titles4.length)];
            } else if (satisfaction >= 50) {
                stars = 3;
                const titles3 = [
                    "Rustic Charm with a Few Creaks",
                    "Work in Progress with Good Potential",
                    "Quaint Old Manor, Minor Quirks",
                    "Pleasant But Rough Around the Edges"
                ];
                ratingTitle = titles3[Math.floor(Math.random() * titles3.length)];
            } else {
                stars = 2;
                const titles2 = [
                    "Drafty Rooms and Unfinished Renovations",
                    "Too Much Noise and Squeaking Floors",
                    "Needs More Polishing Before Primetime"
                ];
                ratingTitle = titles2[Math.floor(Math.random() * titles2.length)];
            }

            // Nightly rate and tips
            const [minRate, maxRate] = guest.nightlyRateRange || [260, 360];
            const rateMult = 0.88 + (compPct / 100) * 0.32 + favBonus * 0.15;
            const nightlyRate = Math.round((minRate + Math.random() * (maxRate - minRate)) * rateMult);
            const nights = 2;
            const roomRevenue = nightlyRate * nights;

            let tipAmount = 0;
            if (stars === 5) {
                tipAmount = Math.round(roomRevenue * (0.20 + Math.random() * 0.12) * breakfastMenu.tipMultiplier);
            } else if (stars === 4) {
                tipAmount = Math.round(roomRevenue * (0.08 + Math.random() * 0.07) * breakfastMenu.tipMultiplier);
            } else if (stars <= 2) {
                tipAmount = Math.round(-roomRevenue * 0.10);
            }

            const totalEarned = Math.max(100, roomRevenue + tipAmount);

            // Construct full review text
            const decorQuote = stars >= 4 
                ? (guest.reviewCompliments ? guest.reviewCompliments[Math.floor(Math.random() * guest.reviewCompliments.length)] : "The historic architecture was mesmerizing.")
                : (guest.reviewComplaints ? guest.reviewComplaints[Math.floor(Math.random() * guest.reviewComplaints.length)] : "The house felt somewhat unfinished.");

            const fullReviewText = `${decorQuote} ${breakfastNote} ${waterNote ? waterNote + ' ' : ''}${clutterNote ? clutterNote + ' ' : ''}`;

            return {
                id: guest.id,
                title: guest.title,
                avatar: guest.avatar,
                desc: guest.desc,
                quirk: guest.quirk,
                nightlyRate: nightlyRate,
                nights: nights,
                roomRevenue: roomRevenue,
                tipAmount: tipAmount,
                totalEarned: totalEarned,
                satisfaction: satisfaction,
                stars: stars,
                ratingTitle: ratingTitle,
                reviewText: fullReviewText,
                catQuote: catQuote,
                catName: randomCat.name
            };
        });

        const totalRoomRev = bookings.reduce((s, b) => s + b.roomRevenue, 0);
        const totalTips = bookings.reduce((s, b) => s + b.tipAmount, 0);
        const totalGrossRevenue = bookings.reduce((s, b) => s + b.totalEarned, 0);
        const breakfastTotalCost = breakfastMenu.cost * bookings.length;
        const netProfit = totalGrossRevenue - breakfastTotalCost;

        return {
            canOpen: true,
            selectedMenu: breakfastMenu,
            bookings: bookings,
            totalRoomRevenue: totalRoomRev,
            totalTips: totalTips,
            totalGrossRevenue: totalGrossRevenue,
            breakfastCost: breakfastTotalCost,
            netProfit: netProfit,
            totalRevenue: totalGrossRevenue
        };
    }

    hostBnbWeekend(totalRevenue, partyCount, weekendBookings = null, breakfastCost = 0) {
        let actualRevenue = totalRevenue;
        if (breakfastCost > 0) {
            this.currentMoney -= breakfastCost;
        }
        this.currentMoney += actualRevenue;

        if (this.loanDebt > 0) {
            const payDown = Math.min(this.loanDebt, Math.round(actualRevenue * 0.5));
            this.loanDebt -= payDown;
            this.currentMoney -= payDown;
            this.log(`Applied $${payDown.toLocaleString()} of B&B guest receipts toward hard-money bridge loan balance.`, 'deal');
        }

        this.careerStats.weekendsHosted = (this.careerStats.weekendsHosted || 0) + 1;
        this.careerStats.totalGuestRevenue = (this.careerStats.totalGuestRevenue || 0) + actualRevenue;

        // Save reviews
        if (weekendBookings && Array.isArray(weekendBookings)) {
            const dateStamp = `Weekend ${this.careerStats.weekendsHosted} (Day ${this.currentDay})`;
            weekendBookings.forEach(b => {
                this.guestReviews.unshift({
                    ...b,
                    dateStamp: dateStamp
                });
            });
            this.guestReviews = this.guestReviews.slice(0, 25);

            // Recompute rolling rating
            const starSum = this.guestReviews.reduce((sum, r) => sum + r.stars, 0);
            this.manorRating = parseFloat((starSum / Math.max(1, this.guestReviews.length)).toFixed(1));
        }

        // Special Chef Barnaby perk
        if (this.selectedBreakfastMenu === 'chef_barnaby_tuna') {
            this.cats.forEach(c => {
                c.affection = Math.min(100, (c.affection || 50) + 20);
                c.hunger = Math.max(0, (c.hunger || 50) - 20);
            });
            this.log("🐟 Chef Barnaby's Tuna Breakfast was an immense hit! All 4 cats gained +20 Affection and full bellies!", 'deal');
        }

        if (window.Sound) {
            window.Sound.playSuccess();
            setTimeout(() => window.Sound.playCashRegister(), 300);
        }

        const net = actualRevenue - breakfastCost;
        this.log(`🏨 B&B WEEKEND COMPLETE! Hosted ${partyCount} guest parties, netting +$${net.toLocaleString()} after pantry costs! Manor Rating: ${this.manorRating}★`, 'sale');

        // Advance 2 days for the weekend
        this.currentDay += 2;
        this.actionPoints = this.maxActionPoints;

        this.saveGame();
        this.notify();
        return {
            revenue: actualRevenue,
            netProfit: net,
            totalWeekends: this.careerStats.weekendsHosted,
            manorRating: this.manorRating,
            reviews: weekendBookings || []
        };
    }

    // Backward compatibility for existing UI calls
    generateBuyerOffers() {
        const bnb = this.generateBnbWeekendBookings();
        if (!bnb.canOpen) return [];
        return bnb.bookings.map(b => ({
            title: b.title,
            avatar: b.avatar,
            desc: b.desc,
            price: b.totalEarned,
            feedback: `${b.reviewComment} Cat moment: "${b.catQuote}" (${b.stars}★)`,
            estimatedProfit: b.totalEarned
        }));
    }

    sellHouse(offerPrice, netProfit) {
        return this.hostBnbWeekend(offerPrice, 4);
    }

    getExportState() {
        const CURRENT_SAVE_VERSION = 3;
        return {
            saveVersion: CURRENT_SAVE_VERSION,
            savedAt: Date.now(),
            tutorialCompleted: !!this.tutorialCompleted,
            currentHouseIndex: this.currentHouseIndex,
            currentMoney: this.currentMoney,
            propertyValue: this.propertyValue,
            loanDebt: this.loanDebt,
            currentDay: this.currentDay,
            currentWeatherKey: this.currentWeatherKey,
            actionPoints: this.actionPoints,
            completedTaskIDs: Array.from(this.completedTaskIDs),
            uncompletedTaskIDs: Array.from(this.uncompletedTaskIDs || []),
            ownedToolIDs: Array.from(this.ownedToolIDs),
            deletedTaskIds: this.deletedTaskIds || [],
            deletedRoomKeys: this.deletedRoomKeys || [],
            deletedPostIds: this.deletedPostIds || [],
            deletedExpenseIds: this.deletedExpenseIds || [],
            deletedLogIds: this.deletedLogIds || [],
            totalSpentOnRehab: this.totalSpentOnRehab,
            totalHoldingCostsPaid: this.totalHoldingCostsPaid,
            siteClutter: this.siteClutter,
            neighborRelation: this.neighborRelation,
            cats: this.cats,
            isCatTowerOwned: this.isCatTowerOwned,
            salvageInventory: this.salvageInventory,
            unlockedSalvageTaskIDs: Array.from(this.unlockedSalvageTaskIDs),
            pendingDilemma: this.pendingDilemma,
            selectedBreakfastMenu: this.selectedBreakfastMenu,
            guestReviews: (this.guestReviews || []).slice(0, 30),
            manorRating: this.manorRating,
            activityLog: (this.activityLog || []).slice(0, 500),
            toolsOrganized: this.toolsOrganized,
            toolsOrganizedDays: this.toolsOrganizedDays,
            materialsInventory: this.materialsInventory,
            stopWorkOrders: this.stopWorkOrders,
            careerStats: this.careerStats,
            propertyInfo: this.propertyInfo,
            customRooms: this.customRooms,
            customTasks: this.customTasks,
            customPhotos: this.customPhotos,
            customVideos: this.customVideos,
            customProgress: this.customProgress,
            realLifeExpenses: this.realLifeExpenses,
            realLifeMode: this.realLifeMode,
            donationSettings: this.donationSettings,
            taskChecklists: this.taskChecklists,
            taskMaterials: this.taskMaterials,
            taskTools: this.taskTools,
            taskPriorities: this.taskPriorities,
            taskDonations: this.taskDonations,
            communityTips: this.communityTips,
            communityChallenges: this.communityChallenges,
            communityUpvotedTipIds: Array.from(this.communityUpvotedTipIds || []),
            hallOfFameBackers: this.hallOfFameBackers,
            dailyMaintenanceTasks: this.dailyMaintenanceTasks || [],
            customLevels: this.customLevels || {},
            deletedLevelIds: this.deletedLevelIds || [],
            levelOrder: this.levelOrder || [],
            foldersLocked: this.isFoldersLocked(),
            taskOrder: this.taskOrder || {},
            undoStack: this.undoStack || [],
            highlightedTaskIDs: Array.from(this.highlightedTaskIDs || []),
            customTabs: this.customTabs || [],
            deletedTabIds: this.deletedTabIds || [],
            tabOrder: this.tabOrder || [],
            tabOverrides: this.tabOverrides || {},
            customTools: this.customTools || [],
            deletedToolIds: Array.from(this.deletedToolIds || []),
            startingPointHero: this.startingPointHero,
            historyFastTabs: this.historyFastTabs,
            startingPointBlueprint: this.startingPointBlueprint,
            startingPointNarratives: this.startingPointNarratives,
            startingPointPosts: this.startingPointPosts,
            standaloneGalleries: this.standaloneGalleries,
            customHistorySections: this.customHistorySections || [],
            blueprintSheets: this.blueprintSheets,
            activeBlueprintSheetIndex: this.activeBlueprintSheetIndex || 0,
            beforeAfterComparisons: this.beforeAfterComparisons,
            activeBeforeAfterIndex: this.activeBeforeAfterIndex || 0,
            levelingLogs: this.levelingLogs,
            salvageInventory: this.salvageInventory,
            chaosChores: this.chaosChores,
            neighborData: this.neighborData,
            subtaskLinks: this.subtaskLinks || [],
            dailyDataLog: (this.dailyDataLog || []).slice(0, 3000)
        };
    }

    exportStateJson() {
        return JSON.stringify(this.getExportState(), null, 2);
    }

    saveGame(label = 'Auto-Save') {
        try {
            // 📊 Daily Data Log: record everything that was added / changed / removed since the last save
            try { this.recordDailyDataChanges(label); } catch (dlErr) { console.warn('Daily Data Log notice:', dlErr); }
            const data = this.getExportState();
            this.lastSavedAt = data.savedAt;
            const saveJson = JSON.stringify(data);
            if (typeof localStorage !== 'undefined') {
                localStorage.setItem('shared_fixer_upper_save', saveJson);
                localStorage.setItem('jacks_fixer_uper_save', saveJson);
                localStorage.setItem('jumper_fixer_upper_save', saveJson);
            }
            // Always record rolling local backup snapshot on this computer
            this.saveLocalBackupSnapshot(label, false, data);
        } catch (e) {
            console.warn("Could not save to localStorage", e);
        }
        // Auto-save afterwards on every change in the house simulator
        this.scheduleCloudAutoSave();
    }

    // =====================================================================
    // 📊 DAILY DATA LOG — hidden running audit log of every update to the index
    // =====================================================================
    getDailyDataLog() {
        if (!Array.isArray(this.dailyDataLog)) {
            this.dailyDataLog = [];
            try {
                if (typeof localStorage !== 'undefined') {
                    const raw = localStorage.getItem('fixer_upper_daily_data_log');
                    const parsed = raw ? JSON.parse(raw) : [];
                    if (Array.isArray(parsed)) this.dailyDataLog = parsed;
                }
            } catch (e) { this.dailyDataLog = []; }
        }
        return this.dailyDataLog;
    }

    mergeDailyDataLog(incoming) {
        if (!Array.isArray(incoming) || incoming.length === 0) return;
        const log = this.getDailyDataLog();
        const seen = new Set(log.map(e => e.id));
        incoming.forEach(e => { if (e && e.id && !seen.has(e.id)) { log.push(e); seen.add(e.id); } });
        log.sort((a, b) => (b.ts || 0) - (a.ts || 0));
        if (log.length > 3000) log.length = 3000;
        this.persistDailyDataLog();
    }

    persistDailyDataLog() {
        try {
            if (typeof localStorage !== 'undefined') {
                localStorage.setItem('fixer_upper_daily_data_log', JSON.stringify((this.dailyDataLog || []).slice(0, 3000)));
            }
        } catch (e) { console.warn('Could not persist Daily Data Log', e); }
    }

    clearDailyDataLog() {
        this.dailyDataLog = [];
        this.persistDailyDataLog();
    }

    getDailyDataSectionName(key) {
        const names = {
            customTasks: 'Nested Tasks', customRooms: 'Subtasks', customLevels: 'Main Tasks',
            levelOrder: 'Main Task Order', taskOrder: 'Task Order', completedTaskIDs: 'Completed Tasks',
            uncompletedTaskIDs: 'Un-completed Tasks', highlightedTaskIDs: 'Highlighted Tasks',
            subtaskLinks: 'Task Links', taskChecklists: 'Task Checklists', taskMaterials: 'Task Materials',
            taskTools: 'Task Tools', taskPriorities: 'Task Priorities', taskDonations: 'Task Donations',
            activityLog: 'Log Entries', customPhotos: 'Photos', customVideos: 'Videos',
            realLifeExpenses: 'Expenses', propertyInfo: 'Property Info', customTabs: 'Tabs',
            tabOrder: 'Tab Order', tabOverrides: 'Tab Settings', customTools: 'Tools', ownedToolIDs: 'Owned Tools',
            startingPointHero: 'History Hero', historyFastTabs: 'History Fast Tabs',
            startingPointBlueprint: 'History Blueprint', startingPointNarratives: 'History Narratives',
            startingPointPosts: 'History Posts', standaloneGalleries: 'Galleries',
            customHistorySections: 'History Sections', blueprintSheets: 'Blueprint Sheets',
            beforeAfterComparisons: 'Before / After', levelingLogs: 'Leveling Logs',
            salvageInventory: 'Salvage Inventory', chaosChores: 'Chaos & Chores', neighborData: 'Neighbor Data',
            dailyMaintenanceTasks: 'Dailies', materialsInventory: 'Materials Inventory',
            donationSettings: 'Donation Settings', foldersLocked: 'Folder Lock', cats: 'Cats',
            deletedTaskIds: 'Deleted Tasks', deletedRoomKeys: 'Deleted Subtasks', deletedLevelIds: 'Deleted Main Tasks',
            deletedTabIds: 'Deleted Tabs', deletedLogIds: 'Deleted Log Entries', deletedPostIds: 'Deleted Posts',
            deletedExpenseIds: 'Deleted Expenses', deletedToolIds: 'Deleted Tools'
        };
        if (names[key]) return names[key];
        return String(key).replace(/([a-z])([A-Z])/g, '$1 $2').replace(/^./, s => s.toUpperCase());
    }

    describeDailyDataItem(v, fallback) {
        if (v && typeof v === 'object') {
            const txt = v.name || v.title || v.label || v.caption || v.heading || v.message || v.text || v.desc || v.description;
            if (txt) return String(txt).replace(/<[^>]*>/g, '').slice(0, 70);
            if (v.id !== undefined) return String(v.id);
            return String(fallback);
        }
        if (typeof v === 'string' && v.length < 120) {
            try {
                const t = this.getTask ? this.getTask(v) : null;
                if (t && t.name) return t.name;
                const r = this.getRoom ? this.getRoom(v) : null;
                if (r && r.name) return r.name;
                const l = this.getLevels ? this.getLevels().find(x => x.id === v) : null;
                if (l && l.name) return l.name;
            } catch (e) { /* ignore */ }
        }
        const s = (v === undefined) ? '—' : (typeof v === 'string' ? v : JSON.stringify(v));
        return String(s).slice(0, 70);
    }

    shortDailyDataValue(v) {
        if (v === undefined || v === null || v === '') return '(empty)';
        if (typeof v === 'string') {
            if (v.startsWith('data:')) return '(image/file data)';
            const s = v.replace(/<[^>]*>/g, '');
            return s.length > 40 ? s.slice(0, 40) + '…' : s;
        }
        if (typeof v === 'number' || typeof v === 'boolean') return String(v);
        if (Array.isArray(v)) return '[' + v.length + ' items]';
        return '{…}';
    }

    diffDailyDataFields(oldObj, newObj) {
        const out = [];
        if (!oldObj || !newObj || typeof oldObj !== 'object' || typeof newObj !== 'object') return out;
        const keys = new Set([...Object.keys(oldObj), ...Object.keys(newObj)]);
        keys.forEach(k => {
            if (k === 'updatedAt' || k === 'lastModified' || k === 'savedAt') return;
            const a = JSON.stringify(oldObj[k]);
            const b = JSON.stringify(newObj[k]);
            if (a === b) return;
            const ov = oldObj[k], nv = newObj[k];
            if ((ov === undefined || typeof ov !== 'object') && (nv === undefined || typeof nv !== 'object')) {
                out.push(k + ': ' + this.shortDailyDataValue(ov) + ' → ' + this.shortDailyDataValue(nv));
            } else {
                out.push(k + ' updated');
            }
        });
        return out;
    }

    diffDailyDataKey(key, oldVal, newVal) {
        const changes = [];
        const section = this.getDailyDataSectionName(key);
        const push = (action, target, details) => changes.push({ section, key, action, target: target || section, details: details || '' });

        const isIdArray = arr => Array.isArray(arr) && arr.length > 0 && arr.every(x => x && typeof x === 'object' && x.id !== undefined);
        const isPrimArray = arr => Array.isArray(arr) && arr.every(x => x === null || typeof x !== 'object');

        if (Array.isArray(oldVal) || Array.isArray(newVal)) {
            const a = Array.isArray(oldVal) ? oldVal : [];
            const b = Array.isArray(newVal) ? newVal : [];
            if ((isIdArray(a) || a.length === 0) && (isIdArray(b) || b.length === 0) && (a.length || b.length)) {
                const am = new Map(a.map(x => [String(x.id), x]));
                const bm = new Map(b.map(x => [String(x.id), x]));
                bm.forEach((v, id) => {
                    if (!am.has(id)) push('added', this.describeDailyDataItem(v, id));
                    else if (JSON.stringify(am.get(id)) !== JSON.stringify(v)) {
                        push('changed', this.describeDailyDataItem(v, id), this.diffDailyDataFields(am.get(id), v).slice(0, 6).join('; '));
                    }
                });
                am.forEach((v, id) => { if (!bm.has(id)) push('removed', this.describeDailyDataItem(v, id)); });
                if (changes.length === 0) push('changed', section, 'Order rearranged');
                return changes;
            }
            if (isPrimArray(a) && isPrimArray(b)) {
                const as = new Set(a.map(String)), bs = new Set(b.map(String));
                b.forEach(v => { if (!as.has(String(v))) push('added', this.describeDailyDataItem(v, key)); });
                a.forEach(v => { if (!bs.has(String(v))) push('removed', this.describeDailyDataItem(v, key)); });
                if (changes.length === 0) push('changed', section, 'Order rearranged');
                return changes;
            }
            const max = Math.max(a.length, b.length);
            for (let i = 0; i < max; i++) {
                if (i >= a.length) push('added', this.describeDailyDataItem(b[i], '#' + (i + 1)));
                else if (i >= b.length) push('removed', this.describeDailyDataItem(a[i], '#' + (i + 1)));
                else if (JSON.stringify(a[i]) !== JSON.stringify(b[i])) {
                    push('changed', this.describeDailyDataItem(b[i], '#' + (i + 1)), this.diffDailyDataFields(a[i], b[i]).slice(0, 6).join('; '));
                }
            }
            return changes;
        }

        const isObj = v => v && typeof v === 'object';
        if (isObj(oldVal) || isObj(newVal)) {
            const a = isObj(oldVal) ? oldVal : {};
            const b = isObj(newVal) ? newVal : {};
            const keys = new Set([...Object.keys(a), ...Object.keys(b)]);
            keys.forEach(k => {
                const sa = JSON.stringify(a[k]), sb = JSON.stringify(b[k]);
                if (sa === sb) return;
                const keyLabel = String(k).replace(/([a-z])([A-Z])/g, '$1 $2');
                if (a[k] === undefined) push('added', isObj(b[k]) ? this.describeDailyDataItem(b[k], k) : keyLabel, isObj(b[k]) ? '' : this.shortDailyDataValue(b[k]));
                else if (b[k] === undefined) push('removed', isObj(a[k]) ? this.describeDailyDataItem(a[k], k) : keyLabel, isObj(a[k]) ? '' : this.shortDailyDataValue(a[k]));
                else if (isObj(a[k]) && isObj(b[k]) && !Array.isArray(a[k])) {
                    push('changed', this.describeDailyDataItem(b[k], k), this.diffDailyDataFields(a[k], b[k]).slice(0, 6).join('; '));
                } else {
                    push('changed', isObj(b[k]) ? this.describeDailyDataItem(b[k], k) : keyLabel, isObj(b[k]) ? 'updated' : (this.shortDailyDataValue(a[k]) + ' → ' + this.shortDailyDataValue(b[k])));
                }
            });
            return changes;
        }

        push('changed', section, this.shortDailyDataValue(oldVal) + ' → ' + this.shortDailyDataValue(newVal));
        return changes;
    }

    recordDailyDataChanges(sourceLabel = 'Auto-Save') {
        const IGNORE = new Set(['saveVersion', 'savedAt', 'dailyDataLog', 'undoStack']);
        const current = this.getExportState();
        const currentStrs = {};
        Object.keys(current).forEach(k => { if (!IGNORE.has(k)) currentStrs[k] = JSON.stringify(current[k]); });

        // First save of this session: use the last saved state on this device as the baseline
        if (!this._dailyDataPrev) {
            let prevState = null;
            try {
                if (typeof localStorage !== 'undefined') {
                    const raw = localStorage.getItem('shared_fixer_upper_save');
                    if (raw) prevState = JSON.parse(raw);
                }
            } catch (e) { prevState = null; }
            if (!prevState) { this._dailyDataPrev = currentStrs; return []; }
            this._dailyDataPrev = {};
            Object.keys(prevState).forEach(k => { if (!IGNORE.has(k)) this._dailyDataPrev[k] = JSON.stringify(prevState[k]); });
        }

        const prev = this._dailyDataPrev;
        const now = Date.now();
        let dateKey;
        try { dateKey = new Date(now).toLocaleDateString('en-CA', { timeZone: 'America/Chicago' }); }
        catch (e) { dateKey = new Date(now).toISOString().slice(0, 10); }

        const entries = [];
        const keys = new Set([...Object.keys(prev), ...Object.keys(currentStrs)]);
        keys.forEach(k => {
            if (prev[k] === currentStrs[k]) return;
            let oldVal, newVal;
            try { oldVal = prev[k] !== undefined ? JSON.parse(prev[k]) : undefined; } catch (e) { oldVal = undefined; }
            newVal = current[k];
            let diffs = [];
            try { diffs = this.diffDailyDataKey(k, oldVal, newVal); } catch (e) { diffs = [{ section: this.getDailyDataSectionName(k), key: k, action: 'changed', target: this.getDailyDataSectionName(k), details: '' }]; }
            if (diffs.length > 40) {
                const extra = diffs.length - 40;
                diffs = diffs.slice(0, 40);
                diffs.push({ section: this.getDailyDataSectionName(k), key: k, action: 'changed', target: this.getDailyDataSectionName(k), details: '+' + extra + ' more changes' });
            }
            diffs.forEach((d, i) => entries.push({
                id: 'ddl_' + now + '_' + Math.random().toString(36).substr(2, 5) + '_' + i,
                ts: now,
                dateKey,
                day: this.currentDay || 1,
                source: sourceLabel || 'Auto-Save',
                ...d
            }));
        });

        this._dailyDataPrev = currentStrs;
        if (entries.length === 0) return [];
        const log = this.getDailyDataLog();
        log.unshift(...entries);
        if (log.length > 3000) log.length = 3000;
        this.persistDailyDataLog();
        return entries;
    }

    saveLocalBackupSnapshot(label = 'Auto-Save', isEmergency = false, stateData = null) {
        if (typeof localStorage === 'undefined') return null;
        try {
            const data = stateData || this.getExportState();
            const now = new Date();
            const snapId = 'snap_' + now.getTime() + '_' + Math.floor(Math.random() * 1000);
            const snapshot = {
                id: snapId,
                timestamp: now.toISOString(),
                label: label || (isEmergency ? 'Emergency Page Close Backup' : 'Auto-Save'),
                isEmergency: !!isEmergency,
                roomsCount: Object.keys(data.customRooms || {}).length + 8,
                tasksCount: Array.isArray(data.customTasks) ? data.customTasks.length : 0,
                levelsCount: Array.isArray(data.levelOrder) ? data.levelOrder.length : 0,
                houseName: (data.propertyInfo && data.propertyInfo.name) || 'Whispering Pines Manor',
                state: data
            };
            let vault = [];
            try {
                const raw = localStorage.getItem('jack_estate_local_backups');
                if (raw) vault = JSON.parse(raw);
                if (!Array.isArray(vault)) vault = [];
            } catch(e) { vault = []; }

            vault.unshift(snapshot);
            if (vault.length > 35) vault = vault.slice(0, 35); // Keep last 35 local rolling snapshots
            localStorage.setItem('jack_estate_local_backups', JSON.stringify(vault));
            return snapshot;
        } catch(err) {
            console.warn('Could not save local backup snapshot:', err);
            return null;
        }
    }

    getLocalBackups() {
        if (typeof localStorage === 'undefined') return [];
        try {
            const raw = localStorage.getItem('jack_estate_local_backups');
            if (!raw) return [];
            const vault = JSON.parse(raw);
            return Array.isArray(vault) ? vault : [];
        } catch(e) {
            return [];
        }
    }

    restoreFromLocalBackup(snapId) {
        if (typeof localStorage === 'undefined') return false;
        try {
            const vault = this.getLocalBackups();
            const found = vault.find(s => s.id === snapId);
            if (!found || !found.state) return false;
            this.loadSavedData(found.state);
            this.validateProjectsAndFolders();
            this.saveGame('Restored from Local Snapshot: ' + (found.label || ''));
            this.notify();
            this.publishToCloud('', 'Restored_Local_Snapshot').catch(() => {});
            return true;
        } catch(e) {
            console.error('Failed to restore local backup:', e);
            return false;
        }
    }

    restoreFromJsonString(jsonStr) {
        try {
            const parsed = JSON.parse(jsonStr);
            if (!parsed || typeof parsed !== 'object') throw new Error('Invalid JSON state format');
            this.loadSavedData(parsed);
            this.validateProjectsAndFolders();
            this.saveGame('Restored from Imported Backup File');
            this.notify();
            this.publishToCloud('', 'Restored_Imported_File').catch(() => {});
            return { success: true };
        } catch(e) {
            return { success: false, error: e.message };
        }
    }

    downloadBackupJson(customFilename = null) {
        try {
            const jsonStr = this.exportStateJson();
            const blob = new Blob([jsonStr], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            const now = new Date();
            const dateStr = now.toISOString().slice(0, 10);
            a.download = customFilename || `WhisperingPines_MasterBackup_${dateStr}.json`;
            a.href = url;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            return true;
        } catch(e) {
            console.error('Download backup failed:', e);
            return false;
        }
    }

    scheduleCloudAutoSave(delayMs = 1500) {
        if (this._autoSaveTimer) {
            clearTimeout(this._autoSaveTimer);
        }
        this._autoSaveTimer = setTimeout(() => {
            this._autoSaveTimer = null;
            this.publishToCloud('', 'AutoSave_Debounced').catch(err => console.warn("Auto save sync notice:", err));
        }, delayMs);
    }

    restoreFromState(data, saveToLocal = false) {
        if (!data || typeof data !== 'object') return false;
        try {
            const rawVersion = data.saveVersion || 1;

            // Restore Daily Data Log (merged by id so no device loses entries)
            if (Array.isArray(data.dailyDataLog)) this.mergeDailyDataLog(data.dailyDataLog);

            // Restore Starting Point ("The Before") state
            if (data.startingPointHero) this.startingPointHero = data.startingPointHero;
            if (Array.isArray(data.historyFastTabs)) this.historyFastTabs = data.historyFastTabs;
            if (data.startingPointBlueprint) this.startingPointBlueprint = data.startingPointBlueprint;
            if (Array.isArray(data.startingPointNarratives)) this.startingPointNarratives = data.startingPointNarratives;
            if (Array.isArray(data.startingPointPosts)) this.startingPointPosts = data.startingPointPosts;
            if (Array.isArray(data.standaloneGalleries)) this.standaloneGalleries = data.standaloneGalleries;
            if (Array.isArray(data.customHistorySections)) this.customHistorySections = data.customHistorySections;
            if (Array.isArray(data.blueprintSheets)) this.blueprintSheets = data.blueprintSheets;
            if (data.activeBlueprintSheetIndex !== undefined) this.activeBlueprintSheetIndex = data.activeBlueprintSheetIndex;
            if (Array.isArray(data.beforeAfterComparisons)) this.beforeAfterComparisons = data.beforeAfterComparisons;
            if (data.activeBeforeAfterIndex !== undefined) this.activeBeforeAfterIndex = data.activeBeforeAfterIndex;
            if (Array.isArray(data.levelingLogs)) this.levelingLogs = data.levelingLogs;
            if (Array.isArray(data.salvageInventory)) this.salvageInventory = data.salvageInventory;

            // Restore Chaos & Chores state
            if (Array.isArray(data.chaosChores)) this.chaosChores = data.chaosChores;
            if (data.neighborData) {
                this.neighborData = data.neighborData;
                if (data.neighborData.relationScore !== undefined) {
                    this.neighborRelation = Number(data.neighborData.relationScore);
                }
            }

            // Save file version migrations
            if (rawVersion < 2) {
                if (!data.careerStats) {
                    data.careerStats = { housesFlipped: 0, totalProfit: 0, bestFlip: 0, weekendsHosted: 0 };
                }
                if (data.toolsOrganized === undefined) data.toolsOrganized = false;
                if (data.toolsOrganizedDays === undefined) data.toolsOrganizedDays = 0;
            }

            if (rawVersion < 3) {
                if (!data.materialsInventory) {
                    data.materialsInventory = { modernLumber: 0, oldGrowthLumber: 0, salvageLogs: 2 };
                }
                if (!data.stopWorkOrders) data.stopWorkOrders = {};
                if (data.tutorialCompleted === undefined) data.tutorialCompleted = false;
            }

            this.saveVersion = 3;
            this.tutorialCompleted = !!data.tutorialCompleted;
            this.currentHouseIndex = data.currentHouseIndex || 0;
            this.currentHouse = GAME_DATA.HOUSES[this.currentHouseIndex];
            this.currentMoney = (typeof data.currentMoney === 'number') ? data.currentMoney : (this.currentHouse ? this.currentHouse.startingCash : 10000);
            this.propertyValue = (typeof data.propertyValue === 'number') ? data.propertyValue : (this.currentHouse ? this.currentHouse.purchasePrice : 65000);
            this.loanDebt = data.loanDebt || 0;
            this.currentDay = data.currentDay || 1;
            this.currentWeatherKey = data.currentWeatherKey || 'Sunny';
            this.actionPoints = (data.actionPoints !== undefined) ? data.actionPoints : this.maxActionPoints;
            this.completedTaskIDs = new Set(data.completedTaskIDs || []);
            this.ownedToolIDs = new Set(data.ownedToolIDs || []);
            this.totalSpentOnRehab = data.totalSpentOnRehab || 0;
            this.totalHoldingCostsPaid = data.totalHoldingCostsPaid || 0;
            this.siteClutter = (data.siteClutter !== undefined) ? data.siteClutter : 15;
            this.neighborRelation = (data.neighborRelation !== undefined) ? data.neighborRelation : 55;
            this.toolsOrganized = !!data.toolsOrganized;
            this.toolsOrganizedDays = data.toolsOrganizedDays || 0;

            // Safe materials inventory backfilling
            this.materialsInventory = {
                modernLumber: Number(data.materialsInventory?.modernLumber) || 0,
                oldGrowthLumber: Number(data.materialsInventory?.oldGrowthLumber) || 0,
                salvageLogs: (data.materialsInventory?.salvageLogs !== undefined) ? Number(data.materialsInventory.salvageLogs) : 2
            };

            this.stopWorkOrders = data.stopWorkOrders || {};

            // Real-life house project editable state backfills
            if (data.propertyInfo) this.propertyInfo = data.propertyInfo;
            if (data.customRooms && typeof data.customRooms === 'object') {
                this.customRooms = data.customRooms;
                if (this.customRooms['LivingRoom'] && this.customRooms['LivingRoom'].isDeleted) {
                    this.customRooms['LivingRoom'].isDeleted = false;
                }
            }
            if (Array.isArray(data.customTasks)) {
                this.customTasks = data.customTasks.filter(t => {
                    if (!t || !t.id) return true;
                    const isStarterDummy = (
                        (t.id.endsWith('_demo') && t.name && t.name.startsWith('Demolition & Site Clearance - ')) ||
                        (t.id.endsWith('_roughin') && t.name && t.name.startsWith('Structural Framing & Rough-In - ')) ||
                        (t.id.endsWith('_finish') && t.name && t.name.startsWith('Historic Architectural Finishes & Millwork - '))
                    );
                    return !isStarterDummy;
                });
            }
            if (Array.isArray(data.customPhotos)) {
                this.customPhotos = data.customPhotos.filter(p => !(p && p.id && p.id.startsWith('pj_') && p.id.endsWith('_survey') && p.title && p.title.startsWith('Archival Survey & Structural Baseline - ')));
            }
            if (Array.isArray(data.customVideos)) this.customVideos = data.customVideos;
            if (Array.isArray(data.subtaskLinks)) this.subtaskLinks = data.subtaskLinks;
            if (Array.isArray(data.customProgress)) {
                this.customProgress = data.customProgress.filter(doc => !(doc && doc.id && doc.id.startsWith('prog_') && doc.id.endsWith('_baseline') && doc.title === 'Project Scoping & Initial Assessment'));
            }
            if (Array.isArray(data.realLifeExpenses)) this.realLifeExpenses = data.realLifeExpenses;
            this.undoStack = Array.isArray(data.undoStack) ? data.undoStack : [];
        this.highlightedTaskIDs = new Set(Array.isArray(data.highlightedTaskIDs) ? data.highlightedTaskIDs : []);
            this.realLifeMode = data.realLifeMode !== undefined ? !!data.realLifeMode : true;

            // Public Dream Building & Task Specs
            if (data.donationSettings && typeof data.donationSettings === 'object') this.donationSettings = data.donationSettings;
            if (data.taskChecklists && typeof data.taskChecklists === 'object') this.taskChecklists = data.taskChecklists;
            if (data.taskMaterials && typeof data.taskMaterials === 'object') this.taskMaterials = data.taskMaterials;
            if (data.taskTools && typeof data.taskTools === 'object') this.taskTools = data.taskTools;
            if (data.taskPriorities && typeof data.taskPriorities === 'object') this.taskPriorities = data.taskPriorities;
            if (data.taskDonations && typeof data.taskDonations === 'object') this.taskDonations = data.taskDonations;

            // Community Crowdsourcing & Supporter Knowledge
            if (Array.isArray(data.communityTips)) this.communityTips = data.communityTips;
            if (Array.isArray(data.communityChallenges)) this.communityChallenges = data.communityChallenges;
            if (Array.isArray(data.communityUpvotedTipIds)) this.communityUpvotedTipIds = new Set(data.communityUpvotedTipIds);
            if (Array.isArray(data.hallOfFameBackers)) this.hallOfFameBackers = data.hallOfFameBackers;
            if (Array.isArray(data.dailyMaintenanceTasks)) this.dailyMaintenanceTasks = data.dailyMaintenanceTasks;
            if (Array.isArray(data.uncompletedTaskIDs)) this.uncompletedTaskIDs = new Set(data.uncompletedTaskIDs); else if (!this.uncompletedTaskIDs) this.uncompletedTaskIDs = new Set();
            if (Array.isArray(data.deletedTaskIds)) this.deletedTaskIds = data.deletedTaskIds; else if (!this.deletedTaskIds) this.deletedTaskIds = [];
            if (Array.isArray(data.deletedRoomKeys)) this.deletedRoomKeys = data.deletedRoomKeys; else if (!this.deletedRoomKeys) this.deletedRoomKeys = [];
            if (Array.isArray(data.deletedPostIds)) this.deletedPostIds = data.deletedPostIds; else if (!this.deletedPostIds) this.deletedPostIds = [];
            if (Array.isArray(data.deletedExpenseIds)) this.deletedExpenseIds = data.deletedExpenseIds; else if (!this.deletedExpenseIds) this.deletedExpenseIds = [];
            if (Array.isArray(data.deletedLogIds)) this.deletedLogIds = data.deletedLogIds; else if (!this.deletedLogIds) this.deletedLogIds = [];
            if (data.propertyInfo && typeof data.propertyInfo === 'object') this.propertyInfo = data.propertyInfo;
            if (data.donationSettings && typeof data.donationSettings === 'object') this.donationSettings = data.donationSettings;
            if (data.realLifeMode !== undefined) this.realLifeMode = data.realLifeMode;
            if (data.customLevels && typeof data.customLevels === 'object') this.customLevels = data.customLevels;
            if (Array.isArray(data.deletedLevelIds)) this.deletedLevelIds = data.deletedLevelIds; else if (!this.deletedLevelIds) this.deletedLevelIds = [];
            if (Array.isArray(data.levelOrder)) this.levelOrder = data.levelOrder;
            if (typeof data.foldersLocked === 'boolean') {
                this.foldersLocked = data.foldersLocked;
                try { localStorage.setItem('jack_estate_folders_locked', String(this.foldersLocked)); } catch(e) {}
            }
            if (data.taskOrder && typeof data.taskOrder === 'object') this.taskOrder = data.taskOrder;
            if (Array.isArray(data.customTabs)) this.customTabs = data.customTabs;
            if (Array.isArray(data.deletedTabIds)) {
            const protectedTabs = ['renovations', 'starting-point', 'history', 'concept', 'dream', 'blueprint'];
            this.deletedTabIds = data.deletedTabIds.filter(id => !protectedTabs.includes(id));
        }
            if (Array.isArray(data.tabOrder)) this.tabOrder = data.tabOrder;
            if (data.tabOverrides && typeof data.tabOverrides === 'object') this.tabOverrides = data.tabOverrides;
            if (Array.isArray(data.customTools)) this.customTools = data.customTools;
            if (Array.isArray(data.deletedToolIds)) this.deletedToolIds = new Set(data.deletedToolIds);

            if (this.currentHouse && this.propertyInfo) {
                if (this.propertyInfo.name) this.currentHouse.name = this.propertyInfo.name;
                if (this.propertyInfo.subtitle) this.currentHouse.subtext = this.propertyInfo.subtitle;
            }

            const defaultCats = JSON.parse(JSON.stringify(GAME_DATA.CATS));
            if (Array.isArray(data.cats)) {
                this.cats = data.cats;
            } else if (data.cats && typeof data.cats === 'object') {
                this.cats = defaultCats.map(c => {
                    const savedCat = data.cats[c.id] || {};
                    return { ...c, ...savedCat };
                });
            } else {
                this.cats = defaultCats;
            }

            const defaultRooms = {
                barnaby: 'LivingRoom',
                mochi: 'Exterior',
                rusty: 'Basement',
                jumper: 'RoofAttic'
            };
            this.cats.forEach(c => {
                if (!c.currentRoom) {
                    c.currentRoom = defaultRooms[c.id] || 'LivingRoom';
                }
                if (c.hunger === undefined) c.hunger = 20;
                if (c.affection === undefined) c.affection = 60;
            });

            this.isCatTowerOwned = !!data.isCatTowerOwned;
            this.salvageInventory = Array.isArray(data.salvageInventory) ? data.salvageInventory : [];
            this.unlockedSalvageTaskIDs = new Set(data.unlockedSalvageTaskIDs || []);
            this.pendingDilemma = data.pendingDilemma || null;
            this.selectedBreakfastMenu = data.selectedBreakfastMenu || 'continental';
            this.guestReviews = Array.isArray(data.guestReviews) ? data.guestReviews : [];
            const activeDeletedLogs = new Set(this.deletedLogIds || []);
            if (Array.isArray(data.activityLog)) {
                this.activityLog = data.activityLog.filter(item => {
                    if (!item || !item.message) return false;
                    if (item.id && activeDeletedLogs.has(item.id)) return false;
                    const msg = (item.message || '').toLowerCase();
                    return !(
                        msg.includes('moved task') ||
                        msg.includes('task moved') ||
                        msg.includes('copied task') ||
                        msg.includes('renamed floor') ||
                        msg.includes('renamed level') ||
                        msg.includes('reordered floor') ||
                        msg.includes('reordered rooms') ||
                        msg.includes('reordered tasks') ||
                        msg.includes('moved room') ||
                        msg.includes('duplicated room') ||
                        msg.includes('steampunk mode engaged') ||
                        msg.includes('blueprint mode:') ||
                        msg.includes('need $')
                    );
                }).map(item => {
                    const msg = (item.message || '').toLowerCase();
                    const isAcc = item.isAccomplishment || item.type === 'accomplishment' || item.type === 'task' || msg.includes('finished') || msg.includes('completed') || msg.includes('masterpiece') || msg.includes('certified');
                    return {
                        ...item,
                        isAccomplishment: !!isAcc,
                        type: isAcc ? 'accomplishment' : (item.type || 'normal')
                    };
                }).sort((a, b) => (Number(b.timestamp) || 0) - (Number(a.timestamp) || 0))
                .slice(0, 500);
            } else {
                this.activityLog = [];
            }
            this.careerStats = data.careerStats || { housesFlipped: 0, totalProfit: 0, bestFlip: 0, weekendsHosted: 0 };
            this.lastSavedAt = data.savedAt || Date.now();
            this.validateProjectsAndFolders();

            if (saveToLocal) {
                this.saveGame();
            }
            return true;
        } catch (e) {
            console.warn("Failed to restore state", e);
            return false;
        }
    }

    loadGame() {
        try {
            if (typeof localStorage === 'undefined') return false;
            const raw = localStorage.getItem('shared_fixer_upper_save') || localStorage.getItem('jacks_fixer_uper_save') || localStorage.getItem('jumper_fixer_upper_save');
            if (!raw) return false;
            const data = JSON.parse(raw);
            return this.restoreFromState(data, false);
        } catch (e) {
            console.warn("Failed to load save", e);
            return false;
        }
    }

    mergeState(cloudState, saveToLocal = true) {
        if (!cloudState || typeof cloudState !== 'object') return false;

        // 0. Merge Daily Data Log entries from other devices
        if (Array.isArray(cloudState.dailyDataLog)) this.mergeDailyDataLog(cloudState.dailyDataLog);

        // 1. Merge completedTaskIDs & uncompletedTaskIDs (prevents uncheck resurrection)
        if (Array.isArray(cloudState.uncompletedTaskIDs)) {
            if (!this.uncompletedTaskIDs) this.uncompletedTaskIDs = new Set();
            for (const tid of cloudState.uncompletedTaskIDs) {
                this.uncompletedTaskIDs.add(tid);
            }
        }
        if (Array.isArray(cloudState.completedTaskIDs)) {
            for (const tid of cloudState.completedTaskIDs) {
                if (!this.uncompletedTaskIDs || !this.uncompletedTaskIDs.has(tid)) {
                    this.completedTaskIDs.add(tid);
                }
            }
        }
        if (this.uncompletedTaskIDs) {
            for (const ut of this.uncompletedTaskIDs) {
                if (!Array.isArray(cloudState.completedTaskIDs) || !cloudState.completedTaskIDs.includes(ut)) {
                    this.completedTaskIDs.delete(ut);
                }
            }
        }

        // 2. Merge ownedToolIDs, deletedToolIds & customTools
        if (Array.isArray(cloudState.deletedToolIds)) {
            if (!this.deletedToolIds) this.deletedToolIds = new Set();
            for (const dt of cloudState.deletedToolIds) this.deletedToolIds.add(dt);
        }
        if (Array.isArray(cloudState.ownedToolIDs)) {
            for (const tid of cloudState.ownedToolIDs) {
                if (!this.deletedToolIds || !this.deletedToolIds.has(tid)) {
                    this.ownedToolIDs.add(tid);
                }
            }
        }
        if (this.deletedToolIds) {
            for (const dt of this.deletedToolIds) this.ownedToolIDs.delete(dt);
        }
        if (Array.isArray(cloudState.customTools)) {
            const toolMap = new Map();
            (this.customTools || []).forEach(t => { if (t && t.id) toolMap.set(t.id, t); });
            cloudState.customTools.forEach(t => {
                if (t && t.id) {
                    const prev = toolMap.get(t.id);
                    toolMap.set(t.id, prev ? { ...prev, ...t } : t);
                }
            });
            this.customTools = Array.from(toolMap.values()).filter(t => !this.deletedToolIds || !this.deletedToolIds.has(t.id));
        }

        // 3. Merge customRooms & deletedRoomKeys
        if (Array.isArray(cloudState.deletedRoomKeys)) {
            if (!this.deletedRoomKeys) this.deletedRoomKeys = [];
            this.deletedRoomKeys = Array.from(new Set([...this.deletedRoomKeys, ...cloudState.deletedRoomKeys]));
        }
        if (cloudState.customRooms && typeof cloudState.customRooms === 'object') {
            const mergedRooms = { ...(this.customRooms || {}) };
            Object.keys(cloudState.customRooms).forEach(k => {
                const cloudR = cloudState.customRooms[k];
                const localR = mergedRooms[k];
                if (!localR) {
                    mergedRooms[k] = cloudR;
                } else {
                    mergedRooms[k] = {
                        ...cloudR,
                        ...localR,
                        isDeleted: !!(localR.isDeleted || cloudR.isDeleted || (this.deletedRoomKeys && this.deletedRoomKeys.includes(k)))
                    };
                }
            });
            this.customRooms = mergedRooms;
        }

        // 4. Merge customTasks & deletedTaskIds
        if (Array.isArray(cloudState.deletedTaskIds)) {
            if (!this.deletedTaskIds) this.deletedTaskIds = [];
            this.deletedTaskIds = Array.from(new Set([...this.deletedTaskIds, ...cloudState.deletedTaskIds]));
        }
        if (Array.isArray(cloudState.customTasks) && cloudState.customTasks.length > 0) {
            const taskMap = new Map();
            (this.customTasks || []).forEach(t => { if (t && t.id) taskMap.set(t.id, t); });
            cloudState.customTasks.forEach(t => {
                if (t && t.id) {
                    const prev = taskMap.get(t.id);
                    if (prev) {
                        taskMap.set(t.id, {
                            ...prev,
                            ...t,
                            isDeleted: !!(t.isDeleted || prev.isDeleted || (this.deletedTaskIds && this.deletedTaskIds.includes(t.id)))
                        });
                    } else {
                        taskMap.set(t.id, t);
                    }
                }
            });
            this.customTasks = Array.from(taskMap.values());
        }

        // 5. Merge Starting Point narratives, posts & deletedPostIds
        if (Array.isArray(cloudState.deletedPostIds)) {
            if (!this.deletedPostIds) this.deletedPostIds = [];
            this.deletedPostIds = Array.from(new Set([...this.deletedPostIds, ...cloudState.deletedPostIds]));
        }
        if (Array.isArray(cloudState.startingPointNarratives) && cloudState.startingPointNarratives.length > 0) {
            const narrMap = new Map();
            (this.startingPointNarratives || []).forEach(n => { if (n && n.id) narrMap.set(n.id, n); });
            cloudState.startingPointNarratives.forEach(n => { if (n && n.id) narrMap.set(n.id, n); });
            this.startingPointNarratives = Array.from(narrMap.values());
        }
        if (Array.isArray(cloudState.standaloneGalleries)) this.standaloneGalleries = cloudState.standaloneGalleries;
        if (Array.isArray(cloudState.customHistorySections) && cloudState.customHistorySections.length > 0) {
            this.customHistorySections = cloudState.customHistorySections;
        }
    
        if (Array.isArray(cloudState.startingPointPosts) && cloudState.startingPointPosts.length > 0) {
            const postMap = new Map();
            (this.startingPointPosts || []).forEach(p => { if (p && (p.id || p.title)) postMap.set(p.id || p.title, p); });
            cloudState.startingPointPosts.forEach(p => { if (p && (p.id || p.title)) postMap.set(p.id || p.title, p); });
            this.startingPointPosts = Array.from(postMap.values()).filter(p => (!this.deletedPostIds || !this.deletedPostIds.includes(p.id)) && !p.isDeleted);
        }
        if (Array.isArray(cloudState.blueprintSheets) && cloudState.blueprintSheets.length > 0) {
            const sheetMap = new Map();
            cloudState.blueprintSheets.forEach(cs => {
                if (cs && cs.id) sheetMap.set(cs.id, JSON.parse(JSON.stringify(cs)));
            });
            (this.blueprintSheets || []).forEach(ls => {
                if (ls && ls.id) {
                    const existing = sheetMap.get(ls.id);
                    if (!existing) {
                        sheetMap.set(ls.id, ls);
                    } else {
                        const hsMap = new Map();
                        (existing.hotspots || []).forEach(h => { if (h && h.id) hsMap.set(h.id, h); });
                        (ls.hotspots || []).forEach(h => { if (h && h.id) hsMap.set(h.id, h); });
                        sheetMap.set(ls.id, {
                            ...existing,
                            ...ls,
                            hotspots: Array.from(hsMap.values())
                        });
                    }
                }
            });
            this.blueprintSheets = Array.from(sheetMap.values());
        } else if (!this.blueprintSheets || this.blueprintSheets.length === 0) {
            if (Array.isArray(cloudState.blueprintSheets)) this.blueprintSheets = cloudState.blueprintSheets;
        }

        if (Array.isArray(cloudState.beforeAfterComparisons) && cloudState.beforeAfterComparisons.length > 0) {
            const bacMap = new Map();
            cloudState.beforeAfterComparisons.forEach(p => { if (p && p.id) bacMap.set(p.id, p); });
            (this.beforeAfterComparisons || []).forEach(p => { if (p && p.id) bacMap.set(p.id, p); });
            this.beforeAfterComparisons = Array.from(bacMap.values());
        } else if (!this.beforeAfterComparisons || this.beforeAfterComparisons.length === 0) {
            if (Array.isArray(cloudState.beforeAfterComparisons)) this.beforeAfterComparisons = cloudState.beforeAfterComparisons;
        }

        if (Array.isArray(cloudState.levelingLogs) && cloudState.levelingLogs.length > 0) {
            const llMap = new Map();
            cloudState.levelingLogs.forEach(l => { if (l && l.id) llMap.set(l.id, l); });
            (this.levelingLogs || []).forEach(l => { if (l && l.id) llMap.set(l.id, l); });
            this.levelingLogs = Array.from(llMap.values());
        } else if (!this.levelingLogs || this.levelingLogs.length === 0) {
            if (Array.isArray(cloudState.levelingLogs)) this.levelingLogs = cloudState.levelingLogs;
        }

        if (Array.isArray(cloudState.salvageInventory) && cloudState.salvageInventory.length > 0) {
            const salMap = new Map();
            cloudState.salvageInventory.forEach(s => { if (s && s.id) salMap.set(s.id, s); });
            (this.salvageInventory || []).forEach(s => { if (s && s.id) salMap.set(s.id, s); });
            this.salvageInventory = Array.from(salMap.values());
        } else if (!this.salvageInventory || this.salvageInventory.length === 0) {
            if (Array.isArray(cloudState.salvageInventory)) this.salvageInventory = cloudState.salvageInventory;
        }

        if (Array.isArray(cloudState.historyFastTabs) && cloudState.historyFastTabs.length > 0) {
            const tabMap = new Map();
            cloudState.historyFastTabs.forEach(t => { if (t && (t.id || t.targetPostId)) tabMap.set(t.id || t.targetPostId, t); });
            (this.historyFastTabs || []).forEach(t => { if (t && (t.id || t.targetPostId)) tabMap.set(t.id || t.targetPostId, t); });
            this.historyFastTabs = Array.from(tabMap.values());
        } else if (!this.historyFastTabs || this.historyFastTabs.length === 0) {
            if (Array.isArray(cloudState.historyFastTabs)) this.historyFastTabs = cloudState.historyFastTabs;
        }

        if (Array.isArray(cloudState.subtaskLinks) && cloudState.subtaskLinks.length > 0) {
            const linkMap = new Map();
            cloudState.subtaskLinks.forEach(l => { if (l && l.id) linkMap.set(l.id, l); });
            (this.subtaskLinks || []).forEach(l => { if (l && l.id) linkMap.set(l.id, l); });
            this.subtaskLinks = Array.from(linkMap.values());
        } else if (!this.subtaskLinks || this.subtaskLinks.length === 0) {
            if (Array.isArray(cloudState.subtaskLinks)) this.subtaskLinks = cloudState.subtaskLinks;
        }
        if (cloudState.startingPointHero) {
            this.startingPointHero = { ...(this.startingPointHero || {}), ...cloudState.startingPointHero };
        }
        if (cloudState.startingPointBlueprint) {
            this.startingPointBlueprint = { ...(this.startingPointBlueprint || {}), ...cloudState.startingPointBlueprint };
        }

        // 6. Merge propertyInfo
        if (cloudState.propertyInfo && typeof cloudState.propertyInfo === 'object') {
            this.propertyInfo = { ...(this.propertyInfo || {}), ...cloudState.propertyInfo };
            if (this.currentHouse) {
                if (this.propertyInfo.name) this.currentHouse.name = this.propertyInfo.name;
                if (this.propertyInfo.subtitle) this.currentHouse.subtext = this.propertyInfo.subtitle;
            }
        }

        // 7. Merge progression stats safely (keep whichever made more progress)
        if (cloudState.propertyValue) {
            this.propertyValue = Math.max(Number(this.propertyValue || 0), Number(cloudState.propertyValue));
        }
        if (cloudState.currentMoney) {
            this.currentMoney = Math.max(Number(this.currentMoney || 0), Number(cloudState.currentMoney));
        }
        if (cloudState.currentDay) {
            this.currentDay = Math.max(Number(this.currentDay || 1), Number(cloudState.currentDay));
        }
        if (cloudState.totalSpentOnRehab) {
            this.totalSpentOnRehab = Math.max(Number(this.totalSpentOnRehab || 0), Number(cloudState.totalSpentOnRehab));
        }

        // 8. Cats & Chores
        if (Array.isArray(cloudState.cats) && (!this.cats || this.cats.length === 0)) {
            this.cats = cloudState.cats;
        }
        if (Array.isArray(cloudState.chaosChores) && (!this.chaosChores || this.chaosChores.length === 0)) {
            this.chaosChores = cloudState.chaosChores;
        }

        // 9. Custom Levels & Level Order
        if (Array.isArray(cloudState.deletedLevelIds)) {
            if (!this.deletedLevelIds) this.deletedLevelIds = [];
            this.deletedLevelIds = Array.from(new Set([...this.deletedLevelIds, ...cloudState.deletedLevelIds]));
        }
        const activeDeletedLevels = new Set([
            ...(this.deletedLevelIds || []),
            ...Object.keys(this.customLevels || {}).filter(k => this.customLevels[k]?.isDeleted),
            ...Object.keys(cloudState.customLevels || {}).filter(k => cloudState.customLevels[k]?.isDeleted)
        ]);
        activeDeletedLevels.delete('custom_additions');
        if (this.customLevels && this.customLevels['custom_additions']) {
            this.customLevels['custom_additions'].isDeleted = false;
        }

        if (cloudState.customLevels && typeof cloudState.customLevels === 'object') {
            const mergedLevels = { ...(cloudState.customLevels || {}) };
            // Ensure any local custom levels (especially newly created projects) are preserved!
            Object.keys(this.customLevels || {}).forEach(k => {
                const localLvl = this.customLevels[k];
                const cloudLvl = mergedLevels[k];
                if (!cloudLvl) {
                    mergedLevels[k] = localLvl;
                } else {
                    const combinedRooms = Array.from(new Set([
                        ...(Array.isArray(cloudLvl.rooms) ? cloudLvl.rooms : []),
                        ...(Array.isArray(localLvl.rooms) ? localLvl.rooms : [])
                    ]));
                    mergedLevels[k] = {
                        ...cloudLvl,
                        ...localLvl,
                        rooms: combinedRooms,
                        isDeleted: !!(localLvl.isDeleted || cloudLvl.isDeleted || activeDeletedLevels.has(k))
                    };
                }
            });
            this.customLevels = mergedLevels;
        }
        // Preserve local order preference so background syncing never jumps/shuffles folders
        if (Array.isArray(cloudState.levelOrder) && cloudState.levelOrder.length > 0) {
            const cleanCloudOrder = typeof this.sanitizeLevelOrder === 'function' ? this.sanitizeLevelOrder(cloudState.levelOrder) : cloudState.levelOrder;
            if (!Array.isArray(this.levelOrder) || this.levelOrder.length === 0) {
                this.levelOrder = cleanCloudOrder.filter(id => !activeDeletedLevels.has(id));
            } else {
                // Keep local order primary; append any new cloud levels that don't exist locally
                const localOrderSet = new Set(this.levelOrder);
                const newFromCloud = cleanCloudOrder.filter(id => !localOrderSet.has(id) && !activeDeletedLevels.has(id));
                const combined = [...this.levelOrder, ...newFromCloud].filter(id => !activeDeletedLevels.has(id));
                this.levelOrder = typeof this.sanitizeLevelOrder === 'function' ? this.sanitizeLevelOrder(combined) : combined;
            }
        }

        // 10. Task Checklists, Materials, Tools, Priorities, Donations, Task Order
        if (cloudState.taskChecklists && typeof cloudState.taskChecklists === 'object') {
            this.taskChecklists = { ...(this.taskChecklists || {}), ...cloudState.taskChecklists };
        }
        if (cloudState.taskMaterials && typeof cloudState.taskMaterials === 'object') {
            this.taskMaterials = { ...(this.taskMaterials || {}), ...cloudState.taskMaterials };
        }
        if (cloudState.taskTools && typeof cloudState.taskTools === 'object') {
            this.taskTools = { ...(this.taskTools || {}), ...cloudState.taskTools };
        }
        if (cloudState.taskPriorities && typeof cloudState.taskPriorities === 'object') {
            this.taskPriorities = { ...(this.taskPriorities || {}), ...cloudState.taskPriorities };
        }
        if (cloudState.taskDonations && typeof cloudState.taskDonations === 'object') {
            this.taskDonations = { ...(this.taskDonations || {}), ...cloudState.taskDonations };
        }
        if (cloudState.taskOrder && typeof cloudState.taskOrder === 'object') {
            this.taskOrder = { ...(this.taskOrder || {}), ...cloudState.taskOrder };
        }

        // 11. Custom Tabs, Deleted Tabs, Tab Order, Tab Overrides
        if (Array.isArray(cloudState.deletedTabIds)) {
            if (!this.deletedTabIds) this.deletedTabIds = [];
            const protectedTabs = ['renovations', 'starting-point', 'history', 'concept', 'dream', 'blueprint'];
            this.deletedTabIds = Array.from(new Set([...this.deletedTabIds, ...cloudState.deletedTabIds])).filter(id => !protectedTabs.includes(id));
        }
        if (Array.isArray(cloudState.customTabs)) {
            const tabMap = new Map();
            (this.customTabs || []).forEach(tb => { if (tb && tb.id) tabMap.set(tb.id, tb); });
            cloudState.customTabs.forEach(tb => {
                if (tb && tb.id) {
                    const prev = tabMap.get(tb.id);
                    tabMap.set(tb.id, prev ? { ...prev, ...tb } : tb);
                }
            });
            this.customTabs = Array.from(tabMap.values()).filter(tb => (!this.deletedTabIds || !this.deletedTabIds.includes(tb.id)) && !tb.isDeleted);
        }
        if (cloudState.tabOverrides && typeof cloudState.tabOverrides === 'object') {
            this.tabOverrides = { ...(this.tabOverrides || {}), ...cloudState.tabOverrides };
        }
        if (Array.isArray(cloudState.tabOrder) && cloudState.tabOrder.length > 0) {
            const cloudTabSet = new Set(cloudState.tabOrder);
            const localOnlyTabs = (this.tabOrder || []).filter(id => !cloudTabSet.has(id));
            const combinedTabOrder = new Set([...localOnlyTabs, ...cloudState.tabOrder]);
            this.tabOrder = Array.from(combinedTabOrder).filter(id => !this.deletedTabIds || !this.deletedTabIds.includes(id));
        }

        // 12. Custom Photos, Videos, Progress
        if (Array.isArray(cloudState.customPhotos)) {
            const photoMap = new Map();
            (this.customPhotos || []).forEach(p => { if (p && p.id) photoMap.set(p.id, p); });
            cloudState.customPhotos.forEach(p => { if (p && p.id) photoMap.set(p.id, p); });
            this.customPhotos = Array.from(photoMap.values());
        }
        if (Array.isArray(cloudState.customVideos)) {
            const vidMap = new Map();
            (this.customVideos || []).forEach(v => { if (v && v.id) vidMap.set(v.id, v); });
            cloudState.customVideos.forEach(v => { if (v && v.id) vidMap.set(v.id, v); });
            this.customVideos = Array.from(vidMap.values());
        }
        if (Array.isArray(cloudState.customProgress)) {
            const progMap = new Map();
            (this.customProgress || []).forEach(p => { if (p && p.id) progMap.set(p.id, p); });
            cloudState.customProgress.forEach(p => { if (p && p.id) progMap.set(p.id, p); });
            this.customProgress = Array.from(progMap.values());
        }

        // 13. Real Life Expenses & Deleted Expenses
        if (Array.isArray(cloudState.deletedExpenseIds)) {
            if (!this.deletedExpenseIds) this.deletedExpenseIds = [];
            this.deletedExpenseIds = Array.from(new Set([...this.deletedExpenseIds, ...cloudState.deletedExpenseIds]));
        }
        if (Array.isArray(cloudState.realLifeExpenses)) {
            const expMap = new Map();
            (this.realLifeExpenses || []).forEach(e => { if (e && e.id) expMap.set(e.id, e); });
            cloudState.realLifeExpenses.forEach(e => { if (e && e.id) expMap.set(e.id, e); });
            this.realLifeExpenses = Array.from(expMap.values()).filter(e => (!this.deletedExpenseIds || !this.deletedExpenseIds.includes(e.id)) && !e.isDeleted);
        }

        // 14. Community Tips, Challenges, Backers & Maintenance
        if (Array.isArray(cloudState.communityTips)) {
            const tipMap = new Map();
            (this.communityTips || []).forEach(t => { if (t && t.id) tipMap.set(t.id, t); });
            cloudState.communityTips.forEach(t => {
                if (t && t.id) {
                    const prev = tipMap.get(t.id);
                    tipMap.set(t.id, prev ? { ...prev, ...t, upvotes: Math.max(prev.upvotes || 0, t.upvotes || 0) } : t);
                }
            });
            this.communityTips = Array.from(tipMap.values());
        }
        if (Array.isArray(cloudState.communityUpvotedTipIds)) {
            if (!this.communityUpvotedTipIds) this.communityUpvotedTipIds = new Set();
            cloudState.communityUpvotedTipIds.forEach(id => this.communityUpvotedTipIds.add(id));
        }
        if (Array.isArray(cloudState.communityChallenges)) {
            const cMap = new Map();
            (this.communityChallenges || []).forEach(c => { if (c && c.id) cMap.set(c.id, c); });
            cloudState.communityChallenges.forEach(c => {
                if (c && c.id) {
                    const prev = cMap.get(c.id);
                    cMap.set(c.id, prev ? { ...prev, ...c } : c);
                }
            });
            this.communityChallenges = Array.from(cMap.values());
        }
        if (Array.isArray(cloudState.hallOfFameBackers)) {
            const bMap = new Map();
            (this.hallOfFameBackers || []).forEach(b => { if (b && (b.id || b.donorName)) bMap.set(b.id || (b.donorName + b.amount), b); });
            cloudState.hallOfFameBackers.forEach(b => {
                if (b && (b.id || b.donorName)) bMap.set(b.id || (b.donorName + b.amount), b);
            });
            this.hallOfFameBackers = Array.from(bMap.values());
        }
        if (Array.isArray(cloudState.dailyMaintenanceTasks)) {
            const dMap = new Map();
            (this.dailyMaintenanceTasks || []).forEach(d => { if (d && d.id) dMap.set(d.id, d); });
            cloudState.dailyMaintenanceTasks.forEach(d => {
                if (d && d.id) {
                    const prev = dMap.get(d.id);
                    dMap.set(d.id, prev ? { ...prev, ...d } : d);
                }
            });
            this.dailyMaintenanceTasks = Array.from(dMap.values());
        }
        if (cloudState.donationSettings && typeof cloudState.donationSettings === 'object') {
            this.donationSettings = { ...(this.donationSettings || {}), ...cloudState.donationSettings };
        }
        if (cloudState.realLifeMode !== undefined) this.realLifeMode = cloudState.realLifeMode;

        // 15. Running Log Book (activityLog & deletedLogIds)
        if (Array.isArray(cloudState.deletedLogIds)) {
            if (!this.deletedLogIds) this.deletedLogIds = [];
            this.deletedLogIds = Array.from(new Set([...this.deletedLogIds, ...cloudState.deletedLogIds]));
        }
        const activeDeletedLogs = new Set(this.deletedLogIds || []);
        if (Array.isArray(cloudState.activityLog) || Array.isArray(this.activityLog)) {
            const logMap = new Map();
            // Local logs first
            (this.activityLog || []).forEach(l => {
                if (l && (l.id || l.timestamp)) {
                    const key = l.id || (`${l.timestamp}_${(l.message || '').slice(0, 30)}`);
                    if (!activeDeletedLogs.has(key) && !activeDeletedLogs.has(l.id)) {
                        logMap.set(key, l);
                    }
                }
            });
            // Cloud logs merged
            (cloudState.activityLog || []).forEach(l => {
                if (l && (l.id || l.timestamp)) {
                    const key = l.id || (`${l.timestamp}_${(l.message || '').slice(0, 30)}`);
                    if (!activeDeletedLogs.has(key) && !activeDeletedLogs.has(l.id)) {
                        const prev = logMap.get(key);
                        logMap.set(key, prev ? { ...l, ...prev } : l);
                    }
                }
            });
            this.activityLog = Array.from(logMap.values())
                .filter(item => {
                    if (!item || !item.message) return false;
                    const msg = (item.message || '').toLowerCase();
                    return !(
                        msg.includes('moved task') ||
                        msg.includes('task moved') ||
                        msg.includes('copied task') ||
                        msg.includes('renamed floor') ||
                        msg.includes('renamed level') ||
                        msg.includes('reordered floor') ||
                        msg.includes('reordered rooms') ||
                        msg.includes('reordered tasks') ||
                        msg.includes('moved room') ||
                        msg.includes('duplicated room') ||
                        msg.includes('steampunk mode engaged') ||
                        msg.includes('blueprint mode:') ||
                        msg.includes('need $')
                    );
                })
                .sort((a, b) => (Number(b.timestamp) || 0) - (Number(a.timestamp) || 0))
                .slice(0, 500);
        }

        this.updateDaysFromCalendar();

        this.lastSavedAt = Math.max(Number(cloudState.savedAt) || 0, Number(this.lastSavedAt) || 0, Date.now());
        if (saveToLocal) {
            try {
                const data = this.getExportState();
                const saveJson = JSON.stringify(data);
                if (typeof localStorage !== 'undefined') {
                    localStorage.setItem('shared_fixer_upper_save', saveJson);
                    localStorage.setItem('jacks_fixer_uper_save', saveJson);
                    localStorage.setItem('jumper_fixer_upper_save', saveJson);
                }
            } catch (e) {}
        }
        return true;
    }

    async syncWithCloud(forceCloud = false) {
        try {
            let res = null;
            const CLOUD_API_FALLBACK = 'https://jypsyjackprojects.allenewing2013.workers.dev/api/fixer-upper/state';
            const fetchOpts = {
                cache: 'no-store',
                headers: {
                    'Cache-Control': 'no-cache, no-store, must-revalidate',
                    'Pragma': 'no-cache'
                }
            };

            // 1. Try local Worker API or local Node server
            try {
                res = await fetch('/api/fixer-upper/state', fetchOpts);
            } catch (e) {}

            // 2. If running on file:// or local server without endpoint, fallback directly to live Cloudflare Worker
            if (!res || !res.ok) {
                try {
                    res = await fetch(CLOUD_API_FALLBACK, fetchOpts);
                } catch (eRemote) {}
            }

            // 3. Try static asset fallbacks
            if (!res || !res.ok) {
                try {
                    res = await fetch('fixer_upper_state.json', fetchOpts);
                } catch (e2) {}
            }
            if (!res || !res.ok) {
                try {
                    res = await fetch('/fixer-upper/fixer_upper_state.json', fetchOpts);
                } catch (e3) {}
            }

            if (res && res.ok) {
                const json = await res.json();
                const cloudState = json.state || (json.saveVersion ? json : null);
                if (cloudState && typeof cloudState === 'object') {
                    // Non-destructive smart merge: merge cloud state with local progress
                    this.mergeState(cloudState, true);
                    this.notify();

                    if (typeof document !== 'undefined') {
                        const pill = document.getElementById('cloud-sync-status-pill');
                        if (pill) {
                            pill.innerHTML = '🟢 Live Synced';
                            pill.style.background = 'rgba(16, 185, 129, 0.2)';
                            pill.style.color = '#34d399';
                        }
                    }

                    // If local had new tasks, levels, or rooms that cloud didn't have, auto-push merged state to cloud
                    const cloudTaskCount = Array.isArray(cloudState.customTasks) ? cloudState.customTasks.length : 0;
                    const localTaskCount = Array.isArray(this.customTasks) ? this.customTasks.length : 0;
                    const cloudLevelCount = Object.keys(cloudState.customLevels || {}).length;
                    const localLevelCount = Object.keys(this.customLevels || {}).length;
                    const cloudRoomCount = Object.keys(cloudState.customRooms || {}).length;
                    const localRoomCount = Object.keys(this.customRooms || {}).length;

                    if (localTaskCount > cloudTaskCount || localLevelCount > cloudLevelCount || localRoomCount > cloudRoomCount) {
                        this.publishToCloud().catch(() => {});
                    }

                    return {
                        success: true,
                        updated: true,
                        source: json.storage || 'cloud',
                        taskCount: (this.customTasks || []).length,
                        levelCount: Object.keys(this.customLevels || {}).length,
                        completedCount: this.completedTaskIDs.size
                    };
                }
            }
        } catch (err) {
            console.warn("Sync with cloud failed:", err);
        }
        return { success: false, reason: 'No cloud state available' };
    }

    startCloudAutoPoll(intervalMs = 6000) {
        if (this._cloudPollInterval) {
            clearInterval(this._cloudPollInterval);
        }
        this._cloudPollInterval = setInterval(async () => {
            if (typeof document !== 'undefined' && document.hidden) return;
            try {
                await this.syncWithCloud(false);
            } catch (e) {}
        }, intervalMs);
    }

    start30SecMasterAutoSave(intervalMs = 30000) {
        if (this._master30SecInterval) clearInterval(this._master30SecInterval);
        this._master30SecInterval = setInterval(async () => {
            try {
                this.saveGame('30s Rolling Auto-Save');
                const res = await this.publishToCloud('', '30s_AutoSave');
                this.last30SecSaveTime = Date.now();
                if (typeof window !== 'undefined' && window.UI && typeof window.UI.updateAutoSaveIndicator === 'function') {
                    window.UI.updateAutoSaveIndicator(res && res.success);
                }
            } catch(e) {}
        }, intervalMs);
    }

    async publishToCloud(adminKey = '', saveLabel = 'Master_Save') {
        let key = (adminKey || (typeof localStorage !== 'undefined' ? localStorage.getItem('fixer_admin_key') : '') || '').trim();
        if (!key || key === 'undefined' || key === 'null') {
            key = 'johnny1895';
        }
        const statePayload = this.getExportState();
        statePayload._saveLabel = saveLabel || 'Webpage_Save';
        statePayload._isAutoSave = String(saveLabel).toLowerCase().includes('auto');

        const payload = {
            adminKey: key,
            state: statePayload
        };
        const CLOUD_FALLBACK_1 = 'https://gypsyjackprojectsv2.hotdogwatergaming.com/api/fixer-upper/save';
        const CLOUD_FALLBACK_2 = 'https://jypsyjackprojects.allenewing2013.workers.dev/api/fixer-upper/save';

        let res = null;
        let lastError = null;

        // 1. Try local endpoint (/api/fixer-upper/save)
        try {
            res = await fetch('/api/fixer-upper/save', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-admin-key': key,
                    'x-client-app': 'fixer-upper'
                },
                body: JSON.stringify(payload)
            });
        } catch (err) {
            lastError = err;
        }

        // 2. Try live Cloudflare tunnel domain
        if (!res || !res.ok) {
            try {
                res = await fetch(CLOUD_FALLBACK_1, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-admin-key': key,
                        'x-client-app': 'fixer-upper'
                    },
                    body: JSON.stringify(payload)
                });
            } catch (errRemote1) {
                lastError = errRemote1;
            }
        }

        // 3. Try legacy workers.dev fallback
        if (!res || !res.ok) {
            try {
                res = await fetch(CLOUD_FALLBACK_2, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-admin-key': key,
                        'x-client-app': 'fixer-upper'
                    },
                    body: JSON.stringify(payload)
                });
            } catch (errRemote2) {
                lastError = errRemote2;
            }
        }

        if (res && res.ok) {
            try {
                const data = await res.json();
                if (data && data.success) {
                    if (typeof localStorage !== 'undefined') localStorage.setItem('fixer_admin_key', key);
                    // If server returned merged state with friend's updates, apply it locally!
                    if (data.state && typeof data.state === 'object') {
                        this.mergeState(data.state, true);
                        this.notify();
                    }
                    if (typeof document !== 'undefined') {
                        const pill = document.getElementById('cloud-sync-status-pill');
                        if (pill) {
                            pill.innerHTML = data.savedToKv ? '🟢 Live Cloudflare KV Saved' : (data.kvWarning ? '💾 Local & Synced (KV Quota)' : '💾 Saved to Disk & Local');
                            pill.style.background = 'rgba(16, 185, 129, 0.2)';
                            pill.style.color = '#34d399';
                            pill.style.border = '1px solid #10b981';
                        }
                    }
                    return {
                        success: true,
                        message: data.message,
                        savedToKv: data.savedToKv,
                        savedToDisk: data.savedToDisk,
                        timestamp: data.updatedAt,
                        taskCount: (this.customTasks || []).length,
                        levelCount: Object.keys(this.customLevels || {}).length,
                        completedCount: this.completedTaskIDs.size
                    };
                }
                return { success: false, error: data?.error || 'Publish failed' };
            } catch (eJson) {
                return { success: false, error: eJson.message };
            }
        }

        return { success: false, error: lastError ? lastError.message : 'Network error reaching save API' };
    }

    flushSave(isBeacon = false) {
        if (this._autoSaveTimer) {
            clearTimeout(this._autoSaveTimer);
            this._autoSaveTimer = null;
        }
        const data = this.getExportState();
        try {
            const saveJson = JSON.stringify(data);
            if (typeof localStorage !== 'undefined') {
                localStorage.setItem('shared_fixer_upper_save', saveJson);
                localStorage.setItem('jacks_fixer_uper_save', saveJson);
                localStorage.setItem('jumper_fixer_upper_save', saveJson);
            }
            // AUTOMATIC LOCAL BACKUP ON COMPUTER WHEN PAGE CLOSES!
            this.saveLocalBackupSnapshot('Emergency Page Close Backup', true, data);
        } catch (e) {}

        const key = (typeof localStorage !== 'undefined' ? localStorage.getItem('fixer_admin_key') : '') || 'johnny1895';
        const payload = JSON.stringify({
            adminKey: key,
            state: data
        });

        // 1. Send beacon to emergency backup endpoints on page close
        if (isBeacon && typeof navigator !== 'undefined' && typeof navigator.sendBeacon === 'function') {
            try {
                const blob = new Blob([payload], { type: 'application/json' });
                navigator.sendBeacon('/api/fixer-upper/emergency-backup', blob);
                navigator.sendBeacon('https://gypsyjackprojectsv2.hotdogwatergaming.com/api/fixer-upper/emergency-backup', blob);
            } catch (e) {}
            return;
        }

        try {
            fetch('/api/fixer-upper/save', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-admin-key': key,
                    'x-client-app': 'fixer-upper'
                },
                body: payload,
                keepalive: true
            }).catch(() => {
                fetch('https://gypsyjackprojectsv2.hotdogwatergaming.com/api/fixer-upper/save', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'x-admin-key': key, 'x-client-app': 'fixer-upper' },
                    body: payload,
                    keepalive: true
                }).catch(() => {});
            });
        } catch (e) {}
    }

    resetCareer() {
        localStorage.removeItem('shared_fixer_upper_save');
        localStorage.removeItem('jacks_fixer_uper_save');
        localStorage.removeItem('jumper_fixer_upper_save');
        this.careerStats = { housesFlipped: 0, totalProfit: 0, bestFlip: 0 };
        this.completedTaskIDs.clear();
        this.ownedToolIDs.clear();
        this.startHouse(0);
    }

    // ==========================================
    // STARTING POINT ("THE BEFORE") CRUD METHODS
    // ==========================================
    saveStartingPointHero(heroData) {
        this.startingPointHero = { ...this.startingPointHero, ...heroData };
        this.saveGame();
        this.notify();
    }

        // ==========================================
    // STANDALONE FORENSIC PICTURE GALLERIES METHODS
    // ==========================================
    saveStandaloneGallery(gallery) {
        if (!this.standaloneGalleries) this.standaloneGalleries = [];
        const idx = this.standaloneGalleries.findIndex(g => g.id === gallery.id);
        if (idx >= 0) {
            this.standaloneGalleries[idx] = gallery;
        } else {
            this.standaloneGalleries.unshift(gallery);
        }
        this.saveGame();
        this.notify();
    }

    deleteStandaloneGallery(id) {
        if (!this.standaloneGalleries) return;
        this.standaloneGalleries = this.standaloneGalleries.filter(g => g.id !== id);
        this.saveGame();
        this.notify();
    }

    addPhotoToStandaloneGallery(galleryId, photoObj) {
        if (!this.standaloneGalleries) return;
        const gal = this.standaloneGalleries.find(g => g.id === galleryId);
        if (gal) {
            if (!Array.isArray(gal.photos)) gal.photos = [];
            gal.photos.push(photoObj);
            gal.activePhotoIndex = gal.photos.length - 1;
            this.saveGame();
            this.notify();
        }
    }

    deletePhotoFromStandaloneGallery(galleryId, photoIndex) {
        if (!this.standaloneGalleries) return;
        const gal = this.standaloneGalleries.find(g => g.id === galleryId);
        if (gal && Array.isArray(gal.photos)) {
            gal.photos.splice(photoIndex, 1);
            if (gal.activePhotoIndex >= gal.photos.length) {
                gal.activePhotoIndex = Math.max(0, gal.photos.length - 1);
            }
            this.saveGame();
            this.notify();
        }
    }

    setStandaloneGalleryActivePhoto(galleryId, photoIndex) {
        if (!this.standaloneGalleries) return;
        const gal = this.standaloneGalleries.find(g => g.id === galleryId);
        if (gal && Array.isArray(gal.photos) && gal.photos[photoIndex]) {
            gal.activePhotoIndex = photoIndex;
            this.saveGame();
            this.notify();
        }
    }

    // ==========================================
    // FAST TABS (QUICK-JUMP FORENSIC CARDS) METHODS
    // ==========================================
    saveHistoryFastTab(tab) {
        if (!this.historyFastTabs) this.historyFastTabs = [];
        const idx = this.historyFastTabs.findIndex(t => t.id === tab.id);
        if (idx >= 0) {
            this.historyFastTabs[idx] = tab;
        } else {
            this.historyFastTabs.push(tab);
        }
        this.saveGame();
        this.notify();
    }

    deleteHistoryFastTab(id) {
        if (!this.historyFastTabs) return;
        this.historyFastTabs = this.historyFastTabs.filter(t => t.id !== id);
        this.saveGame();
        this.notify();
    }

    // ==========================================
    // HERO & FORENSIC METRICS DIRECT EDITORS
    // ==========================================
    updateHeroField(field, val) {
        if (!this.startingPointHero) this.startingPointHero = {};
        this.startingPointHero[field] = val;
        this.saveGame();
        this.notify();
    }

    updateHeroMetric(metricIndex, field, val) {
        if (!this.startingPointHero) this.startingPointHero = {};
        const key = 'metric' + metricIndex;
        if (!this.startingPointHero[key]) this.startingPointHero[key] = { label: '', value: '', sub: '' };
        this.startingPointHero[key][field] = val;
        this.saveGame();
        this.notify();
    }

    // ==========================================
    // MULTI-SHEET BLUEPRINT & HOTSPOT METHODS
    // ==========================================
    saveBlueprintSheet(sheet) {
        if (!this.blueprintSheets) this.blueprintSheets = [];
        const idx = this.blueprintSheets.findIndex(s => s.id === sheet.id);
        if (idx >= 0) {
            this.blueprintSheets[idx] = sheet;
        } else {
            this.blueprintSheets.push(sheet);
        }
        this.startingPointBlueprint = this.blueprintSheets[this.activeBlueprintSheetIndex || 0] || sheet;
        this.saveGame();
        this.notify();
    }

    deleteBlueprintSheet(sheetId) {
        if (!this.blueprintSheets || this.blueprintSheets.length <= 1) return;
        this.blueprintSheets = this.blueprintSheets.filter(s => s.id !== sheetId);
        if (this.activeBlueprintSheetIndex >= this.blueprintSheets.length) {
            this.activeBlueprintSheetIndex = Math.max(0, this.blueprintSheets.length - 1);
        }
        this.startingPointBlueprint = this.blueprintSheets[this.activeBlueprintSheetIndex];
        this.saveGame();
        this.notify();
    }

    setBlueprintActiveSheet(idx) {
        if (!this.blueprintSheets) return;
        if (idx >= 0 && idx < this.blueprintSheets.length) {
            this.activeBlueprintSheetIndex = idx;
            this.startingPointBlueprint = this.blueprintSheets[idx];
            this.saveGame();
            this.notify();
        }
    }

    saveBlueprintHotspot(sheetId, hotspot) {
        if (!this.blueprintSheets) return;
        const sheet = this.blueprintSheets.find(s => s.id === sheetId);
        if (sheet) {
            if (!Array.isArray(sheet.hotspots)) sheet.hotspots = [];
            const idx = sheet.hotspots.findIndex(h => h.id === hotspot.id);
            if (idx >= 0) {
                sheet.hotspots[idx] = hotspot;
            } else {
                sheet.hotspots.push(hotspot);
            }
            this.saveGame();
            this.notify();
        }
    }

    deleteBlueprintHotspot(sheetId, hotspotId) {
        if (!this.blueprintSheets) return;
        const sheet = this.blueprintSheets.find(s => s.id === sheetId);
        if (sheet && Array.isArray(sheet.hotspots)) {
            sheet.hotspots = sheet.hotspots.filter(h => h.id !== hotspotId);
            this.saveGame();
            this.notify();
        }
    }

    // ==========================================
    // BEFORE VS NOW COMPARISON METHODS
    // ==========================================
    saveBeforeAfterComparison(pair) {
        if (!this.beforeAfterComparisons) this.beforeAfterComparisons = [];
        const idx = this.beforeAfterComparisons.findIndex(p => p.id === pair.id);
        if (idx >= 0) {
            this.beforeAfterComparisons[idx] = pair;
        } else {
            this.beforeAfterComparisons.push(pair);
        }
        this.saveGame();
        this.notify();
    }

    deleteBeforeAfterComparison(pairId) {
        if (!this.beforeAfterComparisons) return;
        this.beforeAfterComparisons = this.beforeAfterComparisons.filter(p => p.id !== pairId);
        if (this.activeBeforeAfterIndex >= this.beforeAfterComparisons.length) {
            this.activeBeforeAfterIndex = Math.max(0, this.beforeAfterComparisons.length - 1);
        }
        this.saveGame();
        this.notify();
    }

    // ==========================================
    // CROSS-MAIN-TASK SUBTASK LINKING METHODS
    // ==========================================
    getSubtaskLinks(roomKey) {
        if (!Array.isArray(this.subtaskLinks)) this.subtaskLinks = [];
        if (!roomKey) return [];
        const allRooms = this.getRooms ? this.getRooms() : (GAME_DATA.ROOMS || {});
        const levels = this.getLevels ? this.getLevels() : (GAME_DATA.MANOR_LEVELS || []);

        return this.subtaskLinks
            .filter(l => l && (l.sourceRoomKey === roomKey || l.targetRoomKey === roomKey || l.sourceId === roomKey || l.targetId === roomKey))
            .map(l => {
                const isSource = (l.sourceRoomKey === roomKey || l.sourceId === roomKey);
                const otherKey = isSource ? (l.targetId || l.targetRoomKey) : (l.sourceId || l.sourceRoomKey);
                const targetType = l.targetType || (l.targetTaskId ? 'task' : (levels.some(x => x.id === otherKey) ? 'level' : (this.getTask && this.getTask(otherKey) ? 'task' : 'room')));

                let otherName = otherKey;
                let otherIcon = '📁';
                let otherLevelId = '';
                let otherLevelName = 'Main Task';
                let completion = 0;
                let typeBadge = 'SUB-TASK';
                let taskCount = 0;
                let doneCount = 0;

                if (targetType === 'level') {
                    const lvl = levels.find(x => x.id === otherKey);
                    otherName = lvl ? lvl.name : otherKey;
                    otherIcon = (lvl && lvl.icon) ? lvl.icon : '🏰';
                    otherLevelId = lvl ? lvl.id : otherKey;
                    otherLevelName = lvl ? lvl.name : otherKey;
                    completion = (lvl && this.calculateLevelCompletion) ? this.calculateLevelCompletion(lvl.id) : 0;
                    typeBadge = 'MAIN TASK';
                    const lvlRooms = lvl ? (lvl.rooms || []) : [];
                    let tTotal = 0;
                    let tDone = 0;
                    lvlRooms.forEach(rk => {
                        const rTasks = this.getTasksForRoom ? this.getTasksForRoom(rk) : [];
                        tTotal += rTasks.length;
                        tDone += rTasks.filter(t => this.completedTaskIDs && this.completedTaskIDs.has(t.id)).length;
                    });
                    taskCount = tTotal;
                    doneCount = tDone;
                } else if (targetType === 'task') {
                    const t = this.getTask ? this.getTask(otherKey) : null;
                    otherName = t ? t.name : otherKey;
                    otherIcon = '🔨';
                    const parentRm = (t && allRooms) ? allRooms[t.room] : null;
                    const parentLvl = (t && levels) ? levels.find(x => (x.rooms || []).includes(t.room) || x.id === t.room) : null;
                    otherLevelId = parentLvl ? parentLvl.id : '';
                    otherLevelName = parentLvl ? parentLvl.name : (parentRm ? parentRm.name : 'Main Task');
                    completion = (t && this.completedTaskIDs && this.completedTaskIDs.has(t.id)) ? 100 : 0;
                    typeBadge = (t && t.parentTaskId) ? 'CHILD TASK' : 'NESTED TASK';
                    taskCount = 1;
                    doneCount = completion === 100 ? 1 : 0;
                } else {
                    // default: room / sub-task
                    const otherRoom = allRooms[otherKey] || { name: otherKey, icon: '📁' };
                    const otherLvl = levels.find(lvl => (lvl.rooms || []).includes(otherKey)) || { name: 'Main Task', id: '' };
                    otherName = otherRoom.name || otherKey;
                    otherIcon = otherRoom.icon || '📁';
                    otherLevelId = otherLvl.id;
                    otherLevelName = otherLvl.name;
                    completion = this.calculateRoomCompletion ? this.calculateRoomCompletion(otherKey) : 0;
                    typeBadge = 'SUB-TASK';
                    const rTasks = this.getTasksForRoom ? this.getTasksForRoom(otherKey) : [];
                    taskCount = rTasks.length;
                    doneCount = rTasks.filter(t => this.completedTaskIDs && this.completedTaskIDs.has(t.id)).length;
                }

                return {
                    linkId: l.id,
                    sourceRoomKey: l.sourceRoomKey || l.sourceId,
                    targetRoomKey: l.targetRoomKey || l.targetId,
                    targetType: targetType,
                    targetId: otherKey,
                    isSource,
                    otherKey: otherKey,
                    otherRoomKey: otherKey,
                    otherName: otherName,
                    otherRoomName: otherName,
                    otherIcon: otherIcon,
                    otherRoomIcon: otherIcon,
                    otherLevelId: otherLevelId,
                    otherLevelName: otherLevelName,
                    typeBadge: typeBadge,
                    note: l.note || '',
                    type: l.type || 'related',
                    completion,
                    taskCount,
                    doneCount,
                    createdAt: l.createdAt
                };
            });
    }

    addSubtaskLink(sourceRoomKey, targetRoomKey, note = '', type = 'related', targetType = 'room') {
        if (!sourceRoomKey || !targetRoomKey || sourceRoomKey === targetRoomKey) return false;
        if (!Array.isArray(this.subtaskLinks)) this.subtaskLinks = [];
        
        const existing = this.subtaskLinks.find(l => 
            ((l.sourceRoomKey === sourceRoomKey || l.sourceId === sourceRoomKey) && (l.targetRoomKey === targetRoomKey || l.targetId === targetRoomKey)) ||
            ((l.sourceRoomKey === targetRoomKey || l.sourceId === targetRoomKey) && (l.targetRoomKey === sourceRoomKey || l.targetId === sourceRoomKey))
        );

        const prevLinks = JSON.parse(JSON.stringify(this.subtaskLinks));

        if (existing) {
            existing.note = note || existing.note || '';
            existing.type = type || existing.type || 'related';
            existing.targetType = targetType || existing.targetType || 'room';
        } else {
            this.subtaskLinks.push({
                id: 'link_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5),
                sourceRoomKey,
                sourceId: sourceRoomKey,
                sourceType: 'room',
                targetRoomKey,
                targetId: targetRoomKey,
                targetType: targetType || 'room',
                note: note || '',
                type: type || 'related',
                createdAt: Date.now()
            });
        }

        if (this.pushUndo) {
            this.pushUndo({
                type: 'subtaskLink',
                prevLinks: prevLinks,
                timestamp: Date.now()
            });
        }

        this.saveGame();
        return true;
    }

    addMultipleSubtaskLinks(sourceRoomKey, targets, note = '') {
        if (!sourceRoomKey || !Array.isArray(targets) || targets.length === 0) return 0;
        if (!Array.isArray(this.subtaskLinks)) this.subtaskLinks = [];
        const prevLinks = JSON.parse(JSON.stringify(this.subtaskLinks));

        let addedCount = 0;
        targets.forEach(t => {
            const targetId = typeof t === 'string' ? t : (t.id || t.targetId);
            const targetType = typeof t === 'object' && t.type ? t.type : 'room';
            if (!targetId || targetId === sourceRoomKey) return;

            const existing = this.subtaskLinks.find(l => 
                ((l.sourceRoomKey === sourceRoomKey || l.sourceId === sourceRoomKey) && (l.targetRoomKey === targetId || l.targetId === targetId)) ||
                ((l.sourceRoomKey === targetId || l.sourceId === targetId) && (l.targetRoomKey === sourceRoomKey || l.targetId === sourceRoomKey))
            );

            if (existing) {
                if (note) existing.note = note;
                existing.targetType = targetType;
                addedCount++;
            } else {
                this.subtaskLinks.push({
                    id: 'link_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5),
                    sourceRoomKey,
                    sourceId: sourceRoomKey,
                    sourceType: 'room',
                    targetRoomKey: targetId,
                    targetId: targetId,
                    targetType: targetType,
                    note: note || '',
                    type: 'related',
                    createdAt: Date.now()
                });
                addedCount++;
            }
        });

        if (addedCount > 0) {
            if (this.pushUndo) {
                this.pushUndo({
                    type: 'subtaskLink',
                    prevLinks: prevLinks,
                    timestamp: Date.now()
                });
            }
            this.saveGame();
        }
        return addedCount;
    }

    removeSubtaskLink(linkId) {
        if (!linkId || !Array.isArray(this.subtaskLinks)) return false;
        const prevLinks = JSON.parse(JSON.stringify(this.subtaskLinks));
        this.subtaskLinks = this.subtaskLinks.filter(l => l && l.id !== linkId);
        if (this.pushUndo) {
            this.pushUndo({
                type: 'subtaskLink',
                prevLinks: prevLinks,
                timestamp: Date.now()
            });
        }
        this.saveGame();
        return true;
    }

    setBeforeAfterActiveIndex(idx) {
        if (!this.beforeAfterComparisons) return;
        if (idx >= 0 && idx < this.beforeAfterComparisons.length) {
            this.activeBeforeAfterIndex = idx;
            this.saveGame();
            this.notify();
        }
    }

    // ==========================================
    // SCREW-JACK LEVELING LOG METHODS
    // ==========================================
    saveLevelingLog(entry) {
        if (!this.levelingLogs) this.levelingLogs = [];
        const idx = this.levelingLogs.findIndex(l => l.id === entry.id);
        if (idx >= 0) {
            this.levelingLogs[idx] = entry;
        } else {
            this.levelingLogs.push(entry);
        }
        this.saveGame();
        this.notify();
    }

    deleteLevelingLog(id) {
        if (!this.levelingLogs) return;
        this.levelingLogs = this.levelingLogs.filter(l => l.id !== id);
        this.saveGame();
        this.notify();
    }

    addLevelingTurn(pierName, turnIncrement, sagDelta, notes = '') {
        if (!this.levelingLogs) this.levelingLogs = [];
        const latest = this.levelingLogs[this.levelingLogs.length - 1] || { remainingSag: '-3.50"' };
        const prevSagNum = parseFloat(latest.remainingSag) || -3.50;
        const newSagNum = Math.min(0, prevSagNum + (parseFloat(sagDelta) || 0.0625));
        const newSagStr = (newSagNum >= 0 ? '0.00"' : newSagNum.toFixed(2) + '"');

        const d = new Date();
        const dateStr = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

        this.levelingLogs.push({
            id: 'll_' + Date.now(),
            date: dateStr,
            pier: pierName || 'Pier 3 Center',
            turn: turnIncrement || '+1/16"',
            remainingSag: newSagStr,
            moisture: '17.2%',
            status: notes || 'Calibrated screw-jack turn applied safely',
            tech: 'Jack S.'
        });

        // Also update Hero Metric 2 to reflect current sag!
        if (this.startingPointHero && this.startingPointHero.metric2) {
            this.startingPointHero.metric2.value = `${newSagStr} Sag`;
        }

        this.saveGame();
        this.notify();
    }

    // ==========================================
    // HISTORIC TIMBER & SALVAGE RESERVE LEDGER
    // ==========================================
    saveSalvageItem(item) {
        if (!this.salvageInventory) this.salvageInventory = [];
        const idx = this.salvageInventory.findIndex(s => s.id === item.id);
        if (idx >= 0) {
            this.salvageInventory[idx] = item;
        } else {
            this.salvageInventory.push(item);
        }
        this.saveGame();
        this.notify();
    }

    deleteSalvageItem(id) {
        if (!this.salvageInventory) return;
        this.salvageInventory = this.salvageInventory.filter(s => s.id !== id);
        this.saveGame();
        this.notify();
    }

    
    saveStartingPointBlueprint(bpData) {
        this.startingPointBlueprint = { ...this.startingPointBlueprint, ...bpData };
        this.saveGame();
        this.notify();
    }

    saveStartingPointNarrative(narrative) {
        if (!this.startingPointNarratives) this.startingPointNarratives = [];
        this.normalizeNarrative(narrative);
        const idx = this.startingPointNarratives.findIndex(n => n.id === narrative.id);
        if (idx >= 0) {
            this.startingPointNarratives[idx] = narrative;
        } else {
            this.startingPointNarratives.push(narrative);
        }
        this.saveGame();
        this.notify();
    }

    deleteStartingPointNarrative(id) {
        if (!this.startingPointNarratives) return;
        this.startingPointNarratives = this.startingPointNarratives.filter(n => n.id !== id);
        this.saveGame();
        this.notify();
    }

    
    saveCustomHistorySection(sec) {
        if (!this.customHistorySections) this.customHistorySections = [];
        if (!sec.id) sec.id = 'chs_' + Date.now();
        if (!Array.isArray(sec.blocks)) sec.blocks = [];
        const idx = this.customHistorySections.findIndex(s => s.id === sec.id);
        if (idx >= 0) {
            this.customHistorySections[idx] = sec;
        } else {
            this.customHistorySections.push(sec);
        }
        this.saveGame();
        this.notify();
    }

    deleteCustomHistorySection(id) {
        if (!this.customHistorySections) return;
        this.customHistorySections = this.customHistorySections.filter(s => s.id !== id);
        this.saveGame();
        this.notify();
    }

    moveCustomHistorySection(id, direction) {
        if (!this.customHistorySections) return;
        const idx = this.customHistorySections.findIndex(s => s.id === id);
        if (idx === -1) return;
        const newIdx = idx + direction;
        if (newIdx < 0 || newIdx >= this.customHistorySections.length) return;
        const item = this.customHistorySections.splice(idx, 1)[0];
        this.customHistorySections.splice(newIdx, 0, item);
        this.saveGame();
        this.notify();
    }

    addBlockToCustomSection(sectionId, block) {
        if (!this.customHistorySections) return;
        const sec = this.customHistorySections.find(s => s.id === sectionId);
        if (!sec) return;
        if (!Array.isArray(sec.blocks)) sec.blocks = [];
        if (!block.id) block.id = 'blk_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4);
        sec.blocks.push(block);
        this.saveGame();
        this.notify();
    }

    deleteBlockFromCustomSection(sectionId, blockId) {
        if (!this.customHistorySections) return;
        const sec = this.customHistorySections.find(s => s.id === sectionId);
        if (!sec || !Array.isArray(sec.blocks)) return;
        sec.blocks = sec.blocks.filter(b => b.id !== blockId);
        this.saveGame();
        this.notify();
    }

    updateBlockInCustomSection(sectionId, blockId, updatedData) {
        if (!this.customHistorySections) return;
        const sec = this.customHistorySections.find(s => s.id === sectionId);
        if (!sec || !Array.isArray(sec.blocks)) return;
        const blk = sec.blocks.find(b => b.id === blockId);
        if (!blk) return;
        Object.assign(blk, updatedData);
        this.saveGame();
        this.notify();
    }

    addPhotoToSectionGallery(sectionId, blockId, photoObj) {
        if (!this.customHistorySections) return;
        const sec = this.customHistorySections.find(s => s.id === sectionId);
        if (!sec || !Array.isArray(sec.blocks)) return;
        const blk = sec.blocks.find(b => b.id === blockId && b.type === 'gallery');
        if (!blk) return;
        if (!Array.isArray(blk.photos)) blk.photos = [];
        blk.photos.push(photoObj);
        blk.activePhotoIndex = blk.photos.length - 1;
        this.saveGame();
        this.notify();
    }

    deletePhotoFromSectionGallery(sectionId, blockId, photoIdx) {
        if (!this.customHistorySections) return;
        const sec = this.customHistorySections.find(s => s.id === sectionId);
        if (!sec || !Array.isArray(sec.blocks)) return;
        const blk = sec.blocks.find(b => b.id === blockId && b.type === 'gallery');
        if (!blk || !Array.isArray(blk.photos)) return;
        blk.photos.splice(photoIdx, 1);
        blk.activePhotoIndex = Math.max(0, Math.min(blk.activePhotoIndex || 0, blk.photos.length - 1));
        this.saveGame();
        this.notify();
    }

    setSectionGalleryActivePhoto(sectionId, blockId, photoIdx) {
        if (!this.customHistorySections) return;
        const sec = this.customHistorySections.find(s => s.id === sectionId);
        if (!sec || !Array.isArray(sec.blocks)) return;
        const blk = sec.blocks.find(b => b.id === blockId && b.type === 'gallery');
        if (!blk || !Array.isArray(blk.photos)) return;
        blk.activePhotoIndex = photoIdx;
        this.saveGame();
        this.notify();
    }

    saveStartingPointPost(post) {
        if (!this.startingPointPosts) this.startingPointPosts = [];
        this.normalizePost(post);
        const idx = this.startingPointPosts.findIndex(p => p.id === post.id);
        if (idx >= 0) {
            this.startingPointPosts[idx] = post;
        } else {
            this.startingPointPosts.unshift(post);
        }
        this.saveGame();
        this.notify();
    }

    normalizePost(post) {
        if (!post) return post;
        if (!Array.isArray(post.galleries) || post.galleries.length === 0) {
            post.galleries = [{
                id: 'gal_' + (post.id || Date.now()) + '_main',
                title: post.title ? `${post.title} Gallery` : 'Primary Evidence Gallery',
                subtitle: post.subtitle || 'Baseline Forensic Photos',
                activePhotoIndex: post.activePhotoIndex || 0,
                photos: Array.isArray(post.photos) ? post.photos : []
            }];
        }
        if (post.activeGalleryIndex === undefined || post.activeGalleryIndex < 0 || post.activeGalleryIndex >= post.galleries.length) {
            post.activeGalleryIndex = 0;
        }
        if (!Array.isArray(post.footnotesList)) {
            if (post.footnotes && typeof post.footnotes === 'string' && post.footnotes.trim()) {
                post.footnotesList = [{
                    id: 'fn_1',
                    marker: '[1]',
                    title: 'Archival Footnote Citation',
                    text: post.footnotes.trim(),
                    url: ''
                }];
            } else {
                post.footnotesList = [];
            }
        }
        // Keep flat photos array synced with active gallery for backwards compatibility
        const activeGal = post.galleries[post.activeGalleryIndex] || post.galleries[0];
        if (activeGal && Array.isArray(activeGal.photos)) {
            post.photos = activeGal.photos;
            post.activePhotoIndex = activeGal.activePhotoIndex || 0;
        }
        return post;
    }

    normalizeNarrative(narrative) {
        if (!narrative) return narrative;
        if (!Array.isArray(narrative.footnotesList)) {
            if (narrative.footnotes && typeof narrative.footnotes === 'string' && narrative.footnotes.trim()) {
                narrative.footnotesList = [{
                    id: 'fn_1',
                    marker: '[1]',
                    title: 'Archival Footnote Citation',
                    text: narrative.footnotes.trim(),
                    url: ''
                }];
            } else {
                narrative.footnotesList = [];
            }
        }
        return narrative;
    }

    deleteStartingPointPost(id) {
        if (!this.startingPointPosts) return;
        if (!this.deletedPostIds) this.deletedPostIds = [];
        if (!this.deletedPostIds.includes(id)) this.deletedPostIds.push(id);
        this.startingPointPosts = this.startingPointPosts.filter(p => p.id !== id);
        this.saveGame();
        this.notify();
    }

    addGalleryToPost(postId, galleryObj) {
        if (!this.startingPointPosts) return;
        const post = this.startingPointPosts.find(p => p.id === postId);
        if (post) {
            this.normalizePost(post);
            const newGal = {
                id: galleryObj?.id || ('gal_' + Date.now()),
                title: galleryObj?.title || 'New Picture Gallery',
                subtitle: galleryObj?.subtitle || 'Additional Forensic Survey',
                activePhotoIndex: 0,
                photos: Array.isArray(galleryObj?.photos) ? galleryObj.photos : []
            };
            post.galleries.push(newGal);
            post.activeGalleryIndex = post.galleries.length - 1;
            this.normalizePost(post);
            this.saveGame();
            this.notify();
        }
    }

    deleteGalleryFromPost(postId, galleryId) {
        if (!this.startingPointPosts) return;
        const post = this.startingPointPosts.find(p => p.id === postId);
        if (post && Array.isArray(post.galleries)) {
            if (post.galleries.length <= 1) return; // Keep at least one gallery
            post.galleries = post.galleries.filter(g => g.id !== galleryId);
            if (post.activeGalleryIndex >= post.galleries.length) {
                post.activeGalleryIndex = Math.max(0, post.galleries.length - 1);
            }
            this.normalizePost(post);
            this.saveGame();
            this.notify();
        }
    }

    setPostActiveGallery(postId, galleryIndex) {
        if (!this.startingPointPosts) return;
        const post = this.startingPointPosts.find(p => p.id === postId);
        if (post) {
            this.normalizePost(post);
            if (galleryIndex >= 0 && galleryIndex < post.galleries.length) {
                post.activeGalleryIndex = galleryIndex;
                this.normalizePost(post);
                this.saveGame();
                this.notify();
            }
        }
    }

    addPhotoToPost(postId, photoObj, galleryIndex = null) {
        if (!this.startingPointPosts) return;
        const post = this.startingPointPosts.find(p => p.id === postId);
        if (post) {
            this.normalizePost(post);
            const gIdx = (galleryIndex !== null && galleryIndex >= 0 && galleryIndex < post.galleries.length) 
                ? galleryIndex 
                : (post.activeGalleryIndex || 0);
            const targetGal = post.galleries[gIdx] || post.galleries[0];
            if (targetGal) {
                if (!Array.isArray(targetGal.photos)) targetGal.photos = [];
                targetGal.photos.push(photoObj);
                targetGal.activePhotoIndex = targetGal.photos.length - 1;
            }
            this.normalizePost(post);
            this.saveGame();
            this.notify();
        }
    }

    deletePhotoFromPost(postId, photoIndex, galleryIndex = null) {
        if (!this.startingPointPosts) return;
        const post = this.startingPointPosts.find(p => p.id === postId);
        if (post) {
            this.normalizePost(post);
            const gIdx = (galleryIndex !== null && galleryIndex >= 0 && galleryIndex < post.galleries.length) 
                ? galleryIndex 
                : (post.activeGalleryIndex || 0);
            const targetGal = post.galleries[gIdx] || post.galleries[0];
            if (targetGal && Array.isArray(targetGal.photos)) {
                targetGal.photos.splice(photoIndex, 1);
                if (targetGal.activePhotoIndex >= targetGal.photos.length) {
                    targetGal.activePhotoIndex = Math.max(0, targetGal.photos.length - 1);
                }
            }
            this.normalizePost(post);
            this.saveGame();
            this.notify();
        }
    }

    setPostActivePhoto(postId, photoIndex, galleryIndex = null) {
        if (!this.startingPointPosts) return;
        const post = this.startingPointPosts.find(p => p.id === postId);
        if (post) {
            this.normalizePost(post);
            const gIdx = (galleryIndex !== null && galleryIndex >= 0 && galleryIndex < post.galleries.length) 
                ? galleryIndex 
                : (post.activeGalleryIndex || 0);
            const targetGal = post.galleries[gIdx] || post.galleries[0];
            if (targetGal && Array.isArray(targetGal.photos) && targetGal.photos[photoIndex]) {
                targetGal.activePhotoIndex = photoIndex;
            }
            this.normalizePost(post);
            this.saveGame();
            this.notify();
        }
    }

    // ==========================================
    // 4 CATS & CHAOS HOUSEHOLD CRUD METHODS
    // ==========================================
    saveCat(catId, catData) {
        const cat = this.cats.find(c => c.id === catId);
        if (cat) {
            Object.assign(cat, catData);
        } else {
            this.cats.push({ id: catId, ...catData });
        }
        this.saveGame();
        this.notify();
    }

    addCat(catData) {
        const id = catData.id || ('cat_' + Date.now());
        const newCat = {
            id,
            name: catData.name || "New Manor Cat",
            title: catData.title || "Resident Companion",
            avatar: catData.avatar || "🐱",
            color: catData.color || "#38bdf8",
            personality: catData.personality || "Curious companion wandering through the historic rooms.",
            favoriteMischief: catData.favoriteMischief || "Inspecting toolboxes and taking naps on blueprints.",
            currentRoom: catData.currentRoom || 'LivingRoom',
            hunger: catData.hunger !== undefined ? Number(catData.hunger) : 30,
            affection: catData.affection !== undefined ? Number(catData.affection) : 70
        };
        this.cats.push(newCat);
        this.saveGame();
        this.notify();
        return newCat;
    }

    deleteCat(catId) {
        this.cats = this.cats.filter(c => c.id !== catId);
        this.saveGame();
        this.notify();
    }

    saveChaosChore(choreData) {
        if (!this.chaosChores) this.chaosChores = [];
        const idx = this.chaosChores.findIndex(c => c.id === choreData.id);
        if (idx >= 0) {
            this.chaosChores[idx] = choreData;
        } else {
            this.chaosChores.push(choreData);
        }
        this.saveGame();
        this.notify();
    }

    deleteChaosChore(choreId) {
        if (!this.chaosChores) return;
        this.chaosChores = this.chaosChores.filter(c => c.id !== choreId);
        this.saveGame();
        this.notify();
    }

    saveNeighborData(data) {
        this.neighborData = { ...this.neighborData, ...data };
        if (data.relationScore !== undefined) {
            this.neighborRelation = Number(data.relationScore);
        }
        this.saveGame();
        this.notify();
    }

    addGrievance(text) {
        if (!this.neighborData) this.neighborData = { grievances: [] };
        if (!Array.isArray(this.neighborData.grievances)) this.neighborData.grievances = [];
        this.neighborData.grievances.push(text);
        this.saveGame();
        this.notify();
    }

    deleteGrievance(index) {
        if (!this.neighborData || !Array.isArray(this.neighborData.grievances)) return;
        this.neighborData.grievances.splice(index, 1);
        this.saveGame();
        this.notify();
    }

    // ==========================================
    // REAL-LIFE EDITABLE HOUSE RESTORATION ENGINE
    // ==========================================

    getRooms() {
        const baseRooms = JSON.parse(JSON.stringify(GAME_DATA.ROOMS || {}));
        const merged = { ...baseRooms };
        if (this.customRooms) {
            Object.keys(this.customRooms).forEach(k => {
                if (this.customRooms[k].isDeleted) {
                    delete merged[k];
                } else {
                    merged[k] = { ...(merged[k] || {}), ...this.customRooms[k] };
                }
            });
        }
        return merged;
    }

    getRoom(roomKey) {
        return this.getRooms()[roomKey] || null;
    }

    saveRoom(roomKey, roomData) {
        if (!roomKey) return;
        if (!this.customRooms) this.customRooms = {};
        if (this.deletedRoomKeys) {
            this.deletedRoomKeys = this.deletedRoomKeys.filter(k => k !== roomKey);
        }
        const prevData = this.customRooms[roomKey] ? { ...this.customRooms[roomKey] } : null;
        this.pushUndo({
            type: 'saveRoom',
            roomKey: roomKey,
            roomName: (roomData && roomData.name) || (prevData && prevData.name) || roomKey,
            prevData: prevData
        });
        this.customRooms[roomKey] = {
            ...(this.customRooms[roomKey] || {}),
            ...roomData,
            id: roomKey,
            isDeleted: false
        };
        this.saveGame();
        this.notify();
        this.publishToCloud().catch(() => {});
    }

    pushUndo(action) {
        if (!this.undoStack) this.undoStack = [];
        this.redoStack = [];
        this.undoStack.push({
            ...action,
            timestamp: Date.now()
        });
        if (this.undoStack.length > 25) {
            this.undoStack.shift();
        }
        this.notify();
    }

    canUndo() {
        return Boolean(this.undoStack && this.undoStack.length > 0);
    }

    getUndoCount() {
        return (this.undoStack ? this.undoStack.length : 0);
    }

    canRedo() {
        return Boolean(this.redoStack && this.redoStack.length > 0);
    }

    getRedoCount() {
        return (this.redoStack ? this.redoStack.length : 0);
    }

    pushRedo(action) {
        if (!this.redoStack) this.redoStack = [];
        this.redoStack.push({
            ...action,
            timestamp: Date.now()
        });
        if (this.redoStack.length > 25) {
            this.redoStack.shift();
        }
        this.notify();
    }

    undo() {
        if (!this.canUndo()) return null;
        const lastAction = this.undoStack.pop();
        if (!lastAction) return null;
        this.recordInverseForRedo(lastAction);

        if (lastAction.type === 'deleteRoom') {
            const roomKey = lastAction.roomKey;
            if (this.customRooms && this.customRooms[roomKey]) {
                if (lastAction.prevData) {
                    this.customRooms[roomKey] = { ...lastAction.prevData, isDeleted: false };
                } else {
                    delete this.customRooms[roomKey];
                }
            }
            this.saveGame();
            this.notify();
            return { type: 'roomRestored', name: lastAction.roomName || roomKey };
        } else if (lastAction.type === 'deleteTask') {
            const taskId = lastAction.taskId;
            if (this.customTasks) {
                const idx = this.customTasks.findIndex(t => t.id === taskId);
                if (idx >= 0) {
                    if (lastAction.prevTask) {
                        this.customTasks[idx] = { ...lastAction.prevTask, isDeleted: false };
                    } else {
                        this.customTasks[idx].isDeleted = false;
                    }
                }
            }
            if (lastAction.wasCompleted) {
                this.completedTaskIDs.add(taskId);
            }
            this.recalculatePropertyValue();
            this.saveGame();
            this.notify();
            return { type: 'taskRestored', name: lastAction.taskName || taskId };
        } else if (lastAction.type === 'deletePhoto') {
            const photoId = lastAction.photoId;
            const idx = (this.customPhotos || []).findIndex(p => p.id === photoId);
            if (idx >= 0) {
                this.customPhotos[idx].isDeleted = false;
            }
            this.saveGame();
            this.notify();
            return { type: 'deletePhoto', item: lastAction.item };
        } else if (lastAction.type === 'deleteVideo') {
            const videoId = lastAction.videoId;
            const idx = (this.customVideos || []).findIndex(v => v.id === videoId);
            if (idx >= 0) {
                this.customVideos[idx].isDeleted = false;
            }
            this.saveGame();
            this.notify();
            return { type: 'deleteVideo', item: lastAction.item };
        } else if (lastAction.type === 'deleteProgress') {
            const docId = lastAction.docId;
            const idx = (this.customProgress || []).findIndex(p => p.id === docId);
            if (idx >= 0) {
                this.customProgress[idx].isDeleted = false;
            }
            this.saveGame();
            this.notify();
            return { type: 'deleteProgress', item: lastAction.item };
        } else if (lastAction.type === 'saveLevel') {
            const lvlId = lastAction.lvlId;
            if (lastAction.prevData) {
                this.customLevels[lvlId] = { ...lastAction.prevData };
            } else if (this.customLevels) {
                delete this.customLevels[lvlId];
            }
            this.saveGame();
            this.notify();
            return { type: 'levelUpdated', lvlId };
        } else if (lastAction.type === 'moveTask') {
            const taskId = lastAction.taskId;
            const oldRoom = lastAction.oldRoom;
            if (this.customTasks) {
                const idx = this.customTasks.findIndex(t => t.id === taskId);
                if (idx >= 0) {
                    this.customTasks[idx].room = oldRoom;
                }
            }
            this.saveGame();
            this.notify();
            return { type: 'taskMoved', name: lastAction.taskName || taskId };
        } else if (lastAction.type === 'hierarchicalMove') {
            const src = lastAction.source;
            if (src && src.type === 'task') {
                if (this.customTasks) {
                    const idx = this.customTasks.findIndex(t => t.id === src.id);
                    if (idx >= 0) {
                        this.customTasks[idx].room = src.prevRoom;
                        this.customTasks[idx].parentTaskId = src.prevParentTaskId || null;
                    }
                }
            } else if (src && src.type === 'room') {
                if (!this.customRooms) this.customRooms = {};
                if (this.customRooms[src.id]) {
                    this.customRooms[src.id].level = src.prevLevel;
                    this.customRooms[src.id].parentRoom = src.prevParentRoom || null;
                    this.customRooms[src.id].parentTaskId = src.prevParentTaskId || null;
                }
                if (src.prevLevels) {
                    this.customLevels = JSON.parse(JSON.stringify(src.prevLevels));
                }
            }
            this.saveGame();
            this.notify();
            return { type: 'hierarchicalMoveUndone', name: src ? (src.name || src.id) : 'Item' };
        } else if (lastAction.type === 'hierarchicalDuplicate') {
            const items = lastAction.createdItems || {};
            if (Array.isArray(items.tasks) && this.customTasks) {
                items.tasks.forEach(taskId => {
                    const t = this.customTasks.find(x => x.id === taskId);
                    if (t) t.isDeleted = true;
                });
            }
            if (Array.isArray(items.rooms) && this.customRooms) {
                items.rooms.forEach(roomKey => {
                    if (this.customRooms[roomKey]) {
                        this.customRooms[roomKey].isDeleted = true;
                    }
                });
            }
            if (Array.isArray(items.levels)) {
                items.levels.forEach(lvlId => {
                    if (this.customLevels && this.customLevels[lvlId]) {
                        this.customLevels[lvlId].isDeleted = true;
                    }
                    if (this.levelOrder) {
                        this.levelOrder = this.levelOrder.filter(id => id !== lvlId);
                    }
                });
            }
            this.saveGame();
            this.notify();
            return { type: 'hierarchicalDuplicateUndone', name: lastAction.source ? lastAction.source.name : 'Duplicate' };
        } else if (lastAction.type === 'moveRoomLevel' || lastAction.type === 'reorderRooms') {
            this.customLevels = lastAction.prevLevels ? JSON.parse(JSON.stringify(lastAction.prevLevels)) : {};
            this.saveGame();
            this.notify();
            return { type: 'roomOrderRestored', roomKey: lastAction.roomKey };
        } else if (lastAction.type === 'reorderTasks') {
            this.taskOrder = lastAction.prevOrder ? JSON.parse(JSON.stringify(lastAction.prevOrder)) : {};
            this.saveGame();
            this.notify();
            return { type: 'taskOrderRestored', roomKey: lastAction.roomKey };
        } else if (lastAction.type === 'deleteLevel') {
            const lvlId = lastAction.lvlId;
            if (!this.customLevels) this.customLevels = {};
            if (lastAction.prevData) {
                this.customLevels[lvlId] = { ...lastAction.prevData, isDeleted: false };
            } else if (this.customLevels[lvlId]) {
                this.customLevels[lvlId].isDeleted = false;
            }
            if (this.deletedLevelIds) {
                this.deletedLevelIds = this.deletedLevelIds.filter(id => id !== lvlId);
            }
            if (lastAction.prevOrder && Array.isArray(lastAction.prevOrder)) {
                this.levelOrder = [...lastAction.prevOrder];
            }
            if (typeof this.validateProjectsAndFolders === 'function') {
                this.validateProjectsAndFolders();
            }
            this.saveGame();
            this.notify();
            return { type: 'levelRestored', name: lastAction.lvlName || lvlId, lvlId };
        } else if (lastAction.type === 'saveRoom') {
            const roomKey = lastAction.roomKey;
            if (lastAction.prevData) {
                if (!this.customRooms) this.customRooms = {};
                this.customRooms[roomKey] = { ...lastAction.prevData };
            } else if (this.customRooms) {
                delete this.customRooms[roomKey];
            }
            this.saveGame();
            this.notify();
            return { type: 'roomSavedReverted', name: lastAction.roomName || roomKey, roomKey };
        } else if (lastAction.type === 'reorderLevels') {
            if (lastAction.prevOrder && Array.isArray(lastAction.prevOrder)) {
                this.levelOrder = [...lastAction.prevOrder];
            }
            if (typeof this.validateProjectsAndFolders === 'function') {
                this.validateProjectsAndFolders();
            }
            this.saveGame();
            this.notify();
            return { type: 'levelOrderRestored' };
        } else if (lastAction.type === 'duplicateLevel') {
            if (this.customLevels && this.customLevels[lastAction.lvlId]) {
                delete this.customLevels[lastAction.lvlId];
            }
            if (this.levelOrder) {
                this.levelOrder = this.levelOrder.filter(id => id !== lastAction.lvlId);
            }
            if (typeof this.validateProjectsAndFolders === 'function') {
                this.validateProjectsAndFolders();
            }
            this.saveGame();
            this.notify();
            return { type: 'duplicateLevelRemoved', name: lastAction.lvlName };
        } else if (lastAction.type === 'toggleTaskHighlight') {
            if (!this.highlightedTaskIDs) this.highlightedTaskIDs = new Set();
            if (lastAction.wasHighlighted) {
                this.highlightedTaskIDs.add(lastAction.taskId);
            } else {
                this.highlightedTaskIDs.delete(lastAction.taskId);
            }
            this.saveGame();
            this.notify();
            return { type: 'taskHighlightUndone', taskId: lastAction.taskId };
        } else if (lastAction.type === 'subtaskLink') {
            this.subtaskLinks = lastAction.prevLinks ? JSON.parse(JSON.stringify(lastAction.prevLinks)) : [];
            this.saveGame();
            this.notify();
            return { type: 'subtaskLinkRestored' };
        }
        this.saveGame();
        this.notify();
        return lastAction;
    }
    recordInverseForRedo(action) {
        if (!action || !action.type) return;
        if (!this.redoStack) this.redoStack = [];
        let inverse = null;

        if (action.type === 'deleteRoom') {
            inverse = { type: 'redeleteRoom', roomKey: action.roomKey, roomName: action.roomName };
        } else if (action.type === 'deleteLevel') {
            inverse = { type: 'redeleteLevel', lvlId: action.lvlId, lvlName: action.lvlName };
        } else if (action.type === 'saveRoom') {
            const current = this.customRooms && this.customRooms[action.roomKey] ? { ...this.customRooms[action.roomKey] } : null;
            inverse = { type: 'saveRoom', roomKey: action.roomKey, roomName: action.roomName, prevData: current };
        } else if (action.type === 'saveLevel') {
            const current = this.customLevels && this.customLevels[action.lvlId] ? { ...this.customLevels[action.lvlId] } : null;
            inverse = { type: 'saveLevel', lvlId: action.lvlId, lvlName: action.lvlName, prevData: current };
        } else if (action.type === 'reorderLevels') {
            inverse = { type: 'reorderLevels', prevOrder: this.levelOrder ? [...this.levelOrder] : [] };
        } else if (action.type === 'moveRoomLevel' || action.type === 'reorderRooms') {
            inverse = { type: 'reorderRooms', prevLevels: this.customLevels ? JSON.parse(JSON.stringify(this.customLevels)) : {} };
        } else if (action.type === 'reorderTasks') {
            inverse = { type: 'reorderTasks', roomKey: action.roomKey, prevOrder: this.taskOrder ? JSON.parse(JSON.stringify(this.taskOrder)) : {} };
        } else if (action.type === 'subtaskLink') {
            inverse = { type: 'subtaskLink', prevLinks: this.subtaskLinks ? JSON.parse(JSON.stringify(this.subtaskLinks)) : [] };
        } else if (action.type === 'deleteTask') {
            inverse = { type: 'redeleteTask', taskId: action.taskId, taskName: action.taskName };
        } else if (action.type === 'moveTask') {
            const task = (this.customTasks || []).find(t => t.id === action.taskId);
            inverse = { type: 'moveTask', taskId: action.taskId, oldRoom: task ? task.room : action.newRoom, taskName: action.taskName };
        } else if (action.type === 'hierarchicalMove') {
            const src = action.source;
            let currentRoom = null;
            let currentParentTaskId = null;
            if (src && src.type === 'task') {
                const t = this.getTask(src.id);
                currentRoom = t ? t.room : null;
                currentParentTaskId = t ? (t.parentTaskId || null) : null;
            }
            inverse = {
                type: 'hierarchicalMove',
                source: {
                    type: src ? src.type : 'task',
                    id: src ? src.id : '',
                    prevRoom: currentRoom,
                    prevParentTaskId: currentParentTaskId,
                    name: src ? src.name : ''
                },
                target: action.target
            };
        } else if (action.type === 'hierarchicalDuplicate') {
            inverse = {
                type: 'hierarchicalDuplicate',
                createdItems: action.createdItems,
                source: action.source,
                target: action.target
            };
        }

        if (inverse) {
            this.redoStack.push({ ...inverse, timestamp: Date.now() });
            if (this.redoStack.length > 25) this.redoStack.shift();
        }
    }

    redo() {
        if (!this.canRedo()) return null;
        const action = this.redoStack.pop();
        if (!action) return null;

        if (action.type === 'redeleteRoom') {
            const prevData = this.customRooms && this.customRooms[action.roomKey] ? { ...this.customRooms[action.roomKey] } : null;
            if (!this.undoStack) this.undoStack = [];
            this.undoStack.push({ type: 'deleteRoom', roomKey: action.roomKey, roomName: action.roomName, prevData, timestamp: Date.now() });
            if (this.customRooms && this.customRooms[action.roomKey]) {
                this.customRooms[action.roomKey].isDeleted = true;
            }
            if (!this.deletedRoomKeys) this.deletedRoomKeys = [];
            if (!this.deletedRoomKeys.includes(action.roomKey)) this.deletedRoomKeys.push(action.roomKey);
            this.saveGame();
            this.notify();
            return { type: 'roomRedeleted', name: action.roomName || action.roomKey };
        } else if (action.type === 'redeleteLevel') {
            const prevData = this.customLevels && this.customLevels[action.lvlId] ? { ...this.customLevels[action.lvlId] } : null;
            const prevOrder = this.levelOrder ? [...this.levelOrder] : null;
            if (!this.undoStack) this.undoStack = [];
            this.undoStack.push({ type: 'deleteLevel', lvlId: action.lvlId, lvlName: action.lvlName, prevData, prevOrder, timestamp: Date.now() });
            if (this.customLevels && this.customLevels[action.lvlId]) {
                this.customLevels[action.lvlId].isDeleted = true;
            }
            if (!this.deletedLevelIds) this.deletedLevelIds = [];
            if (!this.deletedLevelIds.includes(action.lvlId)) this.deletedLevelIds.push(action.lvlId);
            if (this.levelOrder) {
                this.levelOrder = this.levelOrder.filter(id => id !== action.lvlId);
            }
            if (typeof this.validateProjectsAndFolders === 'function') this.validateProjectsAndFolders();
            this.saveGame();
            this.notify();
            return { type: 'levelRedeleted', name: action.lvlName || action.lvlId };
        } else if (action.type === 'saveRoom') {
            const current = this.customRooms && this.customRooms[action.roomKey] ? { ...this.customRooms[action.roomKey] } : null;
            if (!this.undoStack) this.undoStack = [];
            this.undoStack.push({ type: 'saveRoom', roomKey: action.roomKey, roomName: action.roomName, prevData: current, timestamp: Date.now() });
            if (action.prevData) {
                if (!this.customRooms) this.customRooms = {};
                this.customRooms[action.roomKey] = { ...action.prevData };
            } else if (this.customRooms) {
                delete this.customRooms[action.roomKey];
            }
            this.saveGame();
            this.notify();
            return { type: 'roomSavedRedone', name: action.roomName || action.roomKey };
        } else if (action.type === 'saveLevel') {
            const current = this.customLevels && this.customLevels[action.lvlId] ? { ...this.customLevels[action.lvlId] } : null;
            if (!this.undoStack) this.undoStack = [];
            this.undoStack.push({ type: 'saveLevel', lvlId: action.lvlId, lvlName: action.lvlName, prevData: current, timestamp: Date.now() });
            if (action.prevData) {
                if (!this.customLevels) this.customLevels = {};
                this.customLevels[action.lvlId] = { ...action.prevData };
            } else if (this.customLevels) {
                delete this.customLevels[action.lvlId];
            }
            if (typeof this.validateProjectsAndFolders === 'function') this.validateProjectsAndFolders();
            this.saveGame();
            this.notify();
            return { type: 'levelSavedRedone', name: action.lvlName || action.lvlId };
        } else if (action.type === 'reorderLevels') {
            const currentOrder = this.levelOrder ? [...this.levelOrder] : [];
            if (!this.undoStack) this.undoStack = [];
            this.undoStack.push({ type: 'reorderLevels', prevOrder: currentOrder, timestamp: Date.now() });
            if (action.prevOrder && Array.isArray(action.prevOrder)) {
                this.levelOrder = [...action.prevOrder];
            }
            if (typeof this.validateProjectsAndFolders === 'function') this.validateProjectsAndFolders();
            this.saveGame();
            this.notify();
            return { type: 'levelOrderRedone' };
        } else if (action.type === 'reorderRooms') {
            const currentLevels = this.customLevels ? JSON.parse(JSON.stringify(this.customLevels)) : {};
            if (!this.undoStack) this.undoStack = [];
            this.undoStack.push({ type: 'reorderRooms', prevLevels: currentLevels, timestamp: Date.now() });
            this.customLevels = action.prevLevels ? JSON.parse(JSON.stringify(action.prevLevels)) : {};
            if (typeof this.validateProjectsAndFolders === 'function') this.validateProjectsAndFolders();
            this.saveGame();
            this.notify();
            return { type: 'roomOrderRedone' };
        } else if (action.type === 'reorderTasks') {
            const currentOrder = this.taskOrder ? JSON.parse(JSON.stringify(this.taskOrder)) : {};
            if (!this.undoStack) this.undoStack = [];
            this.undoStack.push({ type: 'reorderTasks', roomKey: action.roomKey, prevOrder: currentOrder, timestamp: Date.now() });
            this.taskOrder = action.prevOrder ? JSON.parse(JSON.stringify(action.prevOrder)) : {};
            this.saveGame();
            this.notify();
            return { type: 'taskOrderRedone', roomKey: action.roomKey };
        } else if (action.type === 'subtaskLink') {
            const currentLinks = this.subtaskLinks ? JSON.parse(JSON.stringify(this.subtaskLinks)) : [];
            if (!this.undoStack) this.undoStack = [];
            this.undoStack.push({ type: 'subtaskLink', prevLinks: currentLinks, timestamp: Date.now() });
            this.subtaskLinks = action.prevLinks ? JSON.parse(JSON.stringify(action.prevLinks)) : [];
            this.saveGame();
            this.notify();
            return { type: 'subtaskLinkRedone' };
        } else if (action.type === 'redeleteTask') {
            const task = (this.customTasks || []).find(t => t.id === action.taskId);
            if (!this.undoStack) this.undoStack = [];
            this.undoStack.push({ type: 'deleteTask', taskId: action.taskId, taskName: action.taskName, prevTask: task ? { ...task } : null, timestamp: Date.now() });
            if (task) task.isDeleted = true;
            this.saveGame();
            this.notify();
            return { type: 'taskRedeleted', name: action.taskName || action.taskId };
        } else if (action.type === 'hierarchicalMove') {
            if (action.source && action.target) {
                this.moveItemHierarchically(action.source, action.target, false);
                return { type: 'hierarchicalMoveRedone', name: action.source.name || action.source.id };
            }
        } else if (action.type === 'hierarchicalDuplicate') {
            const items = action.createdItems || {};
            if (Array.isArray(items.tasks) && this.customTasks) {
                items.tasks.forEach(taskId => {
                    const t = this.customTasks.find(x => x.id === taskId);
                    if (t) t.isDeleted = false;
                });
            }
            if (Array.isArray(items.rooms) && this.customRooms) {
                items.rooms.forEach(roomKey => {
                    if (this.customRooms[roomKey]) {
                        this.customRooms[roomKey].isDeleted = false;
                    }
                });
            }
            if (Array.isArray(items.levels)) {
                items.levels.forEach(lvlId => {
                    if (this.customLevels && this.customLevels[lvlId]) {
                        this.customLevels[lvlId].isDeleted = false;
                    }
                    if (this.levelOrder && !this.levelOrder.includes(lvlId)) {
                        this.levelOrder.push(lvlId);
                    }
                });
            }
            this.saveGame();
            this.notify();
            return { type: 'hierarchicalDuplicateRedone' };
        }

        this.saveGame();
        this.notify();
        return action;
    }


    restoreDefaultRooms() {
        if (this.customRooms) {
            Object.keys(this.customRooms).forEach(k => {
                if (GAME_DATA.ROOMS && GAME_DATA.ROOMS[k]) {
                    this.customRooms[k].isDeleted = false;
                }
            });
        }
        this.saveGame();
        this.notify();
    }

    deleteRoom(roomKey) {
        if (!this.customRooms) this.customRooms = {};
        if (!this.deletedRoomKeys) this.deletedRoomKeys = [];
        if (!this.deletedRoomKeys.includes(roomKey)) this.deletedRoomKeys.push(roomKey);
        const roomObj = this.getRoom(roomKey);
        const roomName = roomObj?.name || roomKey;
        const prevData = this.customRooms[roomKey] ? { ...this.customRooms[roomKey] } : null;

        this.pushUndo({
            type: 'deleteRoom',
            roomKey: roomKey,
            roomName: roomName,
            prevData: prevData
        });

        this.customRooms[roomKey] = { ...(this.customRooms[roomKey] || {}), isDeleted: true };
        this.saveGame();
        this.notify();
        this.publishToCloud().catch(() => {});
    }

    sanitizeLevelOrder(order, validLevelIds = null) {
        if (!Array.isArray(order)) order = [];
        const validSet = validLevelIds ? new Set(validLevelIds) : null;
        // Keep unique, non-deleted IDs in the exact order specified by the user
        let cleaned = Array.from(new Set(order.filter(id => !validSet || validSet.has(id))));
        return cleaned;
    }

    validateProjectsAndFolders() {
        if (!this.customLevels || typeof this.customLevels !== 'object') this.customLevels = {};
        if (!this.customRooms || typeof this.customRooms !== 'object') this.customRooms = {};
        if (!this.customTasks || !Array.isArray(this.customTasks)) this.customTasks = [];

        // Deduplicate rooms in all customLevels
        Object.keys(this.customLevels).forEach(k => {
            const lvl = this.customLevels[k];
            if (lvl && Array.isArray(lvl.rooms)) {
                lvl.rooms = Array.from(new Set(lvl.rooms));
            }
        });

        // Clean up any duplicate "General Scope" rooms under the same level
        const levelRoomsSeen = new Map();
        Object.keys(this.customRooms).forEach(rk => {
            const r = this.customRooms[rk];
            if (r && !r.isDeleted && r.level) {
                const signature = `${r.level}_${(r.name || '').trim().toLowerCase()}`;
                if (signature.endsWith('_general scope')) {
                    if (levelRoomsSeen.has(signature)) {
                        const originalKey = levelRoomsSeen.get(signature);
                        this.customTasks.forEach(t => {
                            if (t && t.room === rk) {
                                t.room = originalKey;
                            }
                        });
                        r.isDeleted = true;
                    } else {
                        levelRoomsSeen.set(signature, rk);
                    }
                }
            }
        });

        const levels = this.getLevels();
        const levelIdSet = new Set(levels.map(l => l.id));

        // Reconcile levelOrder - stable, never shuffle
        if (!Array.isArray(this.levelOrder)) this.levelOrder = [];
        this.levelOrder = this.sanitizeLevelOrder(this.levelOrder, levelIdSet);
        levels.forEach(l => {
            if (!this.levelOrder.includes(l.id)) {
                if (l.id === 'custom_additions') {
                    this.levelOrder.push(l.id);
                } else {
                    const customIdx = this.levelOrder.indexOf('custom_additions');
                    if (customIdx !== -1) {
                        this.levelOrder.splice(customIdx, 0, l.id);
                    } else {
                        this.levelOrder.push(l.id);
                    }
                }
            }
        });
        this.levelOrder = this.sanitizeLevelOrder(this.levelOrder, levelIdSet);

        // Ensure rooms have valid levels
        const rooms = this.getRooms();
        Object.keys(rooms).forEach(rk => {
            const r = rooms[rk];
            if (r && r.level && !levelIdSet.has(r.level)) {
                r.level = 'custom_additions';
                if (this.customRooms[rk]) this.customRooms[rk].level = 'custom_additions';
            }
        });

        if (!(this.completedTaskIDs instanceof Set)) {
            this.completedTaskIDs = new Set(Array.from(this.completedTaskIDs || []));
        }

        return {
            valid: true,
            levelCount: levels.length,
            roomCount: Object.keys(rooms).length,
            taskCount: this.customTasks.length
        };
    }

    getLevels() {
        const baseLevels = JSON.parse(JSON.stringify(GAME_DATA.MANOR_LEVELS || [
            { id: 'level_3', name: "Level 3: Tower & Roof", elevation: "Elev. +32'", icon: "🏰", rooms: ['RoofAttic'] },
            { id: 'level_2', name: "Level 2: Upper Guest Suites", elevation: "Elev. +16'", icon: "🛏️", rooms: ['Bedroom', 'Bathroom'] },
            { id: 'level_1', name: "Level 1: Main Living & Hearth", elevation: "Elev. 0'", icon: "🛋️", rooms: ['LivingRoom', 'Kitchen', 'BreakfastNook', 'Sunroom', 'TempShop', 'PlumbingHVAC'] },
            { id: 'level_0', name: "Level 0: Sub-Cellar Foundation", elevation: "Elev. -10'", icon: "🧱", rooms: ['Basement'] },
            { id: 'grounds', name: "Grounds & Outbuildings", elevation: "Estate", icon: "🌳", rooms: ['Exterior', 'Garage', 'WoodShed'] }
        ]));
        const custom = this.customLevels || {};
        const deletedSet = new Set([
            ...(this.deletedLevelIds || []),
            ...Object.keys(custom).filter(k => custom[k]?.isDeleted)
        ]);
        const merged = baseLevels
            .filter(lvl => !deletedSet.has(lvl.id) && (!custom[lvl.id] || !custom[lvl.id].isDeleted))
            .map(lvl => {
                if (custom[lvl.id]) {
                    const cLvl = custom[lvl.id];
                    return {
                        ...lvl,
                        ...cLvl,
                        rooms: Array.isArray(cLvl.rooms) ? Array.from(new Set(cLvl.rooms)) : lvl.rooms
                    };
                }
                return lvl;
            });

        // Also include any completely custom created levels
        Object.keys(custom).forEach(k => {
            if (k !== 'custom_additions' && !merged.find(l => l.id === k) && !deletedSet.has(k) && !custom[k].isDeleted) {
                merged.push({
                    id: k,
                    name: custom[k].name || k,
                    icon: custom[k].icon || '🏰',
                    elevation: custom[k].elevation || '',
                    desc: custom[k].desc || '',
                    color: custom[k].color || '',
                    rooms: Array.isArray(custom[k].rooms) ? Array.from(new Set(custom[k].rooms)) : []
                });
            }
        });

        // Collect all rooms and reconcile orphan / custom rooms
        const allRooms = this.getRooms ? this.getRooms() : (GAME_DATA.ROOMS || {});
        const coveredKeys = new Set();
        merged.forEach(lvl => (lvl.rooms || []).forEach(k => coveredKeys.add(k)));

        const orphanRooms = [];
        Object.keys(allRooms).forEach(k => {
            if (coveredKeys.has(k)) return;
            const r = allRooms[k];
            if (r && r.level) {
                const targetLvl = merged.find(l => l.id === r.level);
                if (targetLvl) {
                    if (!targetLvl.rooms) targetLvl.rooms = [];
                    if (!targetLvl.rooms.includes(k)) {
                        targetLvl.rooms.push(k);
                    }
                    coveredKeys.add(k);
                    return;
                }
            }
            orphanRooms.push(k);
        });

        // First-class support for Estate Additions & Custom Sections (custom_additions)
        const customAdd = custom['custom_additions'];
        if ((orphanRooms.length > 0 || (customAdd && !customAdd.isDeleted))) {
            const existingAddLvl = merged.find(l => l.id === 'custom_additions');
            const combinedRooms = Array.from(new Set([
                ...orphanRooms,
                ...(customAdd && Array.isArray(customAdd.rooms) ? customAdd.rooms : []),
                ...(existingAddLvl && Array.isArray(existingAddLvl.rooms) ? existingAddLvl.rooms : [])
            ])).filter(k => !!allRooms[k]);

            if (existingAddLvl) {
                existingAddLvl.name = (customAdd && customAdd.name) || existingAddLvl.name || "Estate Additions & Custom Sections";
                existingAddLvl.icon = (customAdd && customAdd.icon) || existingAddLvl.icon || "🏡";
                existingAddLvl.elevation = (customAdd && customAdd.elevation) || existingAddLvl.elevation || "Estate / Custom";
                existingAddLvl.desc = (customAdd && customAdd.desc) || existingAddLvl.desc || "Master project for custom estate sections and extensions.";
                existingAddLvl.rooms = combinedRooms;
            } else {
                merged.push({
                    id: 'custom_additions',
                    name: (customAdd && customAdd.name) || "Estate Additions & Custom Sections",
                    icon: (customAdd && customAdd.icon) || "🏡",
                    elevation: (customAdd && customAdd.elevation) || "Estate / Custom",
                    desc: (customAdd && customAdd.desc) || "Master project for custom estate sections and extensions.",
                    rooms: combinedRooms
                });
            }
        }

        // Deduplicate all rooms across all levels
        merged.forEach(l => {
            if (Array.isArray(l.rooms)) {
                l.rooms = Array.from(new Set(l.rooms));
            }
        });

        // Order by saved levelOrder if present (strictly sanitizing to prevent shuffling)
        if (Array.isArray(this.levelOrder) && this.levelOrder.length > 0) {
            this.levelOrder = this.sanitizeLevelOrder(this.levelOrder, merged.map(l => l.id));
            merged.sort((a, b) => {
                const idxA = this.levelOrder.indexOf(a.id);
                const idxB = this.levelOrder.indexOf(b.id);
                if (idxA === -1 && idxB === -1) return 0;
                if (idxA === -1) return 1;
                if (idxB === -1) return -1;
                return idxA - idxB;
            });
        }

        return merged;
    }

    isFoldersLocked() {
        if (typeof this.foldersLocked === 'boolean') return this.foldersLocked;
        try {
            const stored = localStorage.getItem('jack_estate_folders_locked');
            if (stored !== null) {
                this.foldersLocked = stored === 'true';
                return this.foldersLocked;
            }
        } catch(e) {}
        this.foldersLocked = true; // Default locked to protect folders and tasks from accidental shuffling
        return this.foldersLocked;
    }

    setFoldersLocked(locked) {
        this.foldersLocked = !!locked;
        try {
            localStorage.setItem('jack_estate_folders_locked', String(this.foldersLocked));
        } catch(e) {}
        this.saveGame('Folders ' + (this.foldersLocked ? 'Locked in Place' : 'Unlocked for Reordering'));
        this.notify();
    }

    toggleFoldersLock() {
        const next = !this.isFoldersLocked();
        this.setFoldersLocked(next);
        return next;
    }

    reorderLevels(fromLvlId, toLvlId, bypassLock = true) {
        if (!bypassLock && this.isFoldersLocked()) {
            console.warn('[FOLDERS LOCKED] Reordering blocked because folders are locked in place.');
            return false;
        }
        if (!fromLvlId || !toLvlId || fromLvlId === toLvlId) return false;
        const currentLevels = this.getLevels ? this.getLevels() : [];
        const levelIds = currentLevels.map(l => l.id);
        const fromIdx = levelIds.indexOf(fromLvlId);
        const toIdx = levelIds.indexOf(toLvlId);
        if (fromIdx === -1 || toIdx === -1) return false;

        const prevOrder = Array.from(this.levelOrder || levelIds);
        levelIds.splice(fromIdx, 1);
        levelIds.splice(toIdx, 0, fromLvlId);
        this.levelOrder = levelIds;

        this.pushUndo({
            type: 'reorderLevels',
            fromLvlId,
            toLvlId,
            prevOrder
        });

        this.saveGame();
        this.notify();
        this.publishToCloud().catch(() => {});
        return true;
    }

    moveLevelOrder(lvlId, delta) {
        if (!lvlId || delta === 0) return false;
        const currentLevels = this.getLevels ? this.getLevels() : [];
        const levelIds = currentLevels.map(l => l.id);
        const idx = levelIds.indexOf(lvlId);
        if (idx === -1) return false;

        const targetIdx = idx + delta;
        if (targetIdx < 0 || targetIdx >= levelIds.length) return false;

        const prevOrder = Array.from(this.levelOrder || levelIds);
        const movedId = levelIds.splice(idx, 1)[0];
        levelIds.splice(targetIdx, 0, movedId);
        this.levelOrder = levelIds;

        this.pushUndo({
            type: 'reorderLevels',
            fromLvlId: lvlId,
            toLvlId: levelIds[targetIdx],
            prevOrder
        });

        this.saveGame();
        this.notify();
        this.publishToCloud().catch(() => {});
        return true;
    }

    setLevelPriorityPosition(lvlId, targetSlot) {
        if (!lvlId || typeof targetSlot !== 'number') return false;
        const currentLevels = this.getLevels ? this.getLevels() : [];
        const levelIds = currentLevels.map(l => l.id);
        const currentIdx = levelIds.indexOf(lvlId);
        if (currentIdx === -1) return false;

        const targetIdx = Math.max(0, Math.min(levelIds.length - 1, targetSlot - 1));
        if (currentIdx === targetIdx) return true;

        const prevOrder = Array.from(this.levelOrder || levelIds);
        const movedId = levelIds.splice(currentIdx, 1)[0];
        levelIds.splice(targetIdx, 0, movedId);
        this.levelOrder = levelIds;

        this.pushUndo({
            type: 'reorderLevels',
            fromLvlId: lvlId,
            toLvlId: levelIds[targetIdx],
            prevOrder
        });

        this.saveGame();
        this.notify();
        this.publishToCloud().catch(() => {});
        return true;
    }

    getMainTaskPriority(lvlId) {
        if (!lvlId) return 1;
        const currentLevels = this.getLevels ? this.getLevels() : [];
        const idx = currentLevels.findIndex(l => l.id === lvlId);
        return idx !== -1 ? idx + 1 : 1;
    }

    saveLevel(lvlId, data) {
        if (!this.customLevels) this.customLevels = {};
        if (this.deletedLevelIds) {
            this.deletedLevelIds = this.deletedLevelIds.filter(id => id !== lvlId);
        }
        const prevData = this.customLevels[lvlId] ? { ...this.customLevels[lvlId] } : null;
        this.pushUndo({
            type: 'saveLevel',
            lvlId: lvlId,
            prevData: prevData
        });
        const sanitized = { ...data };
        if (Array.isArray(sanitized.rooms)) {
            sanitized.rooms = Array.from(new Set(sanitized.rooms));
        }
        sanitized.isDeleted = false;
        this.customLevels[lvlId] = { ...(this.customLevels[lvlId] || {}), ...sanitized };
        if (!this.levelOrder) this.levelOrder = [];
        if (!this.levelOrder.includes(lvlId)) {
            if (lvlId === 'custom_additions') {
                this.levelOrder.push(lvlId);
            } else {
                const customIdx = this.levelOrder.indexOf('custom_additions');
                if (customIdx !== -1) {
                    this.levelOrder.splice(customIdx, 0, lvlId);
                } else {
                    this.levelOrder.push(lvlId);
                }
            }
        }
        this.validateProjectsAndFolders();
        this.saveGame();
        this.notify();
        this.publishToCloud().catch(() => {});
    }

    deleteLevel(lvlId) {
        if (!this.customLevels) this.customLevels = {};
        if (!this.deletedLevelIds) this.deletedLevelIds = [];
        if (!this.deletedLevelIds.includes(lvlId)) {
            this.deletedLevelIds.push(lvlId);
        }
        const levels = this.getLevels ? this.getLevels() : [];
        const lvl = levels.find(l => l.id === lvlId);
        const lvlName = lvl?.name || lvlId;
        const prevData = this.customLevels[lvlId] ? { ...this.customLevels[lvlId] } : null;
        const prevOrder = this.levelOrder ? [...this.levelOrder] : null;

        this.pushUndo({
            type: 'deleteLevel',
            lvlId: lvlId,
            lvlName: lvlName,
            prevData: prevData,
            prevOrder: prevOrder
        });

        this.customLevels[lvlId] = { ...(this.customLevels[lvlId] || {}), isDeleted: true };
        if (this.levelOrder) {
            this.levelOrder = this.levelOrder.filter(id => id !== lvlId && !this.deletedLevelIds.includes(id));
        }
        this.validateProjectsAndFolders();
        this.saveGame();
        this.notify();
        this.publishToCloud().catch(() => {});
        return true;
    }

    getTasksForRoom(roomKey) {
        const baseTasks = (GAME_DATA.TASKS || []).filter(t => t.room === roomKey);
        const salvageTasks = (GAME_DATA.SALVAGE_TASKS || []).filter(t => t.room === roomKey && this.unlockedSalvageTaskIDs.has(t.id));
        const allBase = [...baseTasks, ...salvageTasks];
        
        // Merge with custom tasks
        const customForRoom = (this.customTasks || []).filter(t => t.room === roomKey && !t.isDeleted);
        const taskMap = new Map();
        allBase.forEach(t => {
            const customOverride = (this.customTasks || []).find(c => c.id === t.id);
            if (customOverride && customOverride.room && customOverride.room !== roomKey) {
                return;
            }
            taskMap.set(t.id, customOverride ? { ...t, ...customOverride } : { ...t });
        });
        customForRoom.forEach(t => taskMap.set(t.id, { ...t }));
        
        // Filter out deleted
        (this.customTasks || []).forEach(t => {
            if (t.isDeleted && taskMap.has(t.id)) {
                taskMap.delete(t.id);
            }
        });

        let result = Array.from(taskMap.values());
        if (this.taskOrder && Array.isArray(this.taskOrder[roomKey])) {
            const order = this.taskOrder[roomKey];
            result.sort((a, b) => {
                const idxA = order.indexOf(a.id);
                const idxB = order.indexOf(b.id);
                if (idxA === -1 && idxB === -1) return 0;
                if (idxA === -1) return 1;
                if (idxB === -1) return -1;
                return idxA - idxB;
            });
        }
        return result;
    }

    reorderTasksInRoom(roomKey, fromTaskId, toTaskId) {
        if (!roomKey || fromTaskId === toTaskId) return false;
        const currentTasks = this.getTasksForRoom(roomKey);
        const taskIds = currentTasks.map(t => t.id);
        const fromIdx = taskIds.indexOf(fromTaskId);
        const toIdx = taskIds.indexOf(toTaskId);
        if (fromIdx === -1 || toIdx === -1) return false;

        const prevOrder = this.taskOrder ? { ...this.taskOrder } : {};
        this.pushUndo({
            type: 'reorderTasks',
            roomKey: roomKey,
            prevOrder: prevOrder
        });

        taskIds.splice(fromIdx, 1);
        taskIds.splice(toIdx, 0, fromTaskId);
        if (!this.taskOrder) this.taskOrder = {};
        this.taskOrder[roomKey] = taskIds;
        this.saveGame();
        this.notify();
        return true;
    }

    moveRoomToLevel(roomKey, targetLvlId, targetIndex = -1) {
        if (this.isFoldersLocked()) {
            console.warn('[FOLDERS LOCKED] Moving room blocked because folders are locked in place.');
            return false;
        }
        if (!roomKey || !targetLvlId) return false;
        const currentLevels = this.getLevels();
        const prevLevels = JSON.parse(JSON.stringify(this.customLevels || {}));

        let fromLvl = null;
        currentLevels.forEach(lvl => {
            if (lvl.rooms && lvl.rooms.includes(roomKey)) {
                fromLvl = lvl;
            }
        });

        if (!this.customLevels) this.customLevels = {};

        // Remove from all levels
        currentLevels.forEach(lvl => {
            const rooms = Array.from(lvl.rooms || []).filter(r => r !== roomKey);
            this.customLevels[lvl.id] = { ...(this.customLevels[lvl.id] || {}), rooms: rooms };
        });

        // Add to target level
        const targetLvl = currentLevels.find(l => l.id === targetLvlId);
        let targetRooms = targetLvl ? Array.from(targetLvl.rooms || []).filter(r => r !== roomKey) : [];
        if (targetIndex >= 0 && targetIndex <= targetRooms.length) {
            targetRooms.splice(targetIndex, 0, roomKey);
        } else {
            targetRooms.push(roomKey);
        }
        this.customLevels[targetLvlId] = { ...(this.customLevels[targetLvlId] || {}), rooms: targetRooms };

        if (!this.customRooms) this.customRooms = {};
        this.customRooms[roomKey] = { ...(this.customRooms[roomKey] || {}), level: targetLvlId };

        this.pushUndo({
            type: 'moveRoomLevel',
            roomKey: roomKey,
            fromLvlId: fromLvl ? fromLvl.id : null,
            toLvlId: targetLvlId,
            prevLevels: prevLevels
        });

        this.saveGame();
        this.notify();
        return true;
    }

    reorderRoomsInLevel(lvlId, fromRoomKey, toRoomKey) {
        if (this.isFoldersLocked()) {
            console.warn('[FOLDERS LOCKED] Reordering rooms blocked because folders are locked in place.');
            return false;
        }
        if (!lvlId || fromRoomKey === toRoomKey) return false;
        const currentLevels = this.getLevels();
        const lvl = currentLevels.find(l => l.id === lvlId);
        if (!lvl || !lvl.rooms) return false;

        const rooms = Array.from(lvl.rooms);
        const fromIdx = rooms.indexOf(fromRoomKey);
        const toIdx = rooms.indexOf(toRoomKey);
        if (fromIdx === -1 || toIdx === -1) return false;

        const prevLevels = JSON.parse(JSON.stringify(this.customLevels || {}));
        rooms.splice(fromIdx, 1);
        rooms.splice(toIdx, 0, fromRoomKey);

        if (!this.customLevels) this.customLevels = {};
        this.customLevels[lvlId] = { ...(this.customLevels[lvlId] || {}), rooms: rooms };

        this.pushUndo({
            type: 'reorderRooms',
            lvlId: lvlId,
            prevLevels: prevLevels
        });

        this.saveGame();
        this.notify();
        return true;
    }

    duplicateRoom(roomKey, targetLvlId = null) {
        const allRooms = this.getRooms ? this.getRooms() : (GAME_DATA.ROOMS || {});
        const srcRoom = allRooms[roomKey];
        if (!srcRoom) return null;

        const timestamp = Date.now().toString(36);
        const newKey = `${roomKey}_copy_${timestamp}`;
        const newName = `${srcRoom.name} (Copy)`;
        const lvlId = targetLvlId || srcRoom.level || 'level_1';

        if (!this.customRooms) this.customRooms = {};
        this.customRooms[newKey] = {
            ...srcRoom,
            name: newName,
            isCustom: true,
            isDeleted: false,
            level: lvlId
        };

        const srcTasks = this.getTasksForRoom(roomKey);
        if (!this.customTasks) this.customTasks = [];
        srcTasks.forEach((t, i) => {
            const newTaskId = `task_${timestamp}_${i}`;
            this.customTasks.push({
                ...t,
                id: newTaskId,
                room: newKey,
                isCustom: true,
                isDeleted: false
            });
        });

        const currentLevels = this.getLevels();
        const lvl = currentLevels.find(l => l.id === lvlId);
        let rooms = lvl ? Array.from(lvl.rooms || []) : [];
        rooms.push(newKey);
        if (!this.customLevels) this.customLevels = {};
        this.customLevels[lvlId] = { ...(this.customLevels[lvlId] || {}), rooms: rooms };

        this.saveGame();
        this.notify();
        return { key: newKey, name: newName };
    }

    duplicateLevel(lvlId) {
        const levels = this.getLevels ? this.getLevels() : [];
        const srcLvl = levels.find(l => l.id === lvlId);
        if (!srcLvl) return null;

        const timestamp = Date.now().toString(36);
        const newLvlId = `lvl_copy_${timestamp}`;
        const newLvlName = `${srcLvl.name} (Copy)`;
        const newRooms = [];

        // Duplicate each room in the level
        const allRooms = this.getRooms ? this.getRooms() : (GAME_DATA.ROOMS || {});
        (srcLvl.rooms || []).forEach(roomKey => {
            if (allRooms[roomKey]) {
                const dup = this.duplicateRoom(roomKey, newLvlId);
                if (dup) newRooms.push(dup.key);
            }
        });

        if (!this.customLevels) this.customLevels = {};
        this.customLevels[newLvlId] = {
            id: newLvlId,
            name: newLvlName,
            icon: srcLvl.icon || '🏰',
            elevation: srcLvl.elevation || '',
            rooms: newRooms
        };

        this.pushUndo({
            type: 'duplicateLevel',
            lvlId: newLvlId,
            lvlName: newLvlName
        });

        this.saveGame();
        this.notify();
        return { id: newLvlId, name: newLvlName };
    }

    moveTaskToRoom(taskId, newRoomKey) {
        const task = this.getTask(taskId);
        if (!task || !newRoomKey) return false;
        const oldRoom = task.room;
        if (oldRoom === newRoomKey) return true;

        this.pushUndo({
            type: 'moveTask',
            taskId: taskId,
            oldRoom: oldRoom,
            newRoom: newRoomKey,
            taskName: task.name
        });

        if (!this.customTasks) this.customTasks = [];
        const idx = this.customTasks.findIndex(t => t.id === taskId);
        if (idx >= 0) {
            this.customTasks[idx] = { ...this.customTasks[idx], room: newRoomKey, isDeleted: false };
        } else {
            this.customTasks.push({ ...task, room: newRoomKey, isCustom: true, isDeleted: false });
        }

        this.saveGame();
        this.notify();
        return true;
    }

    isTaskDescendantOf(candidateTaskId, ancestorTaskId) {
        if (!candidateTaskId || !ancestorTaskId) return false;
        if (candidateTaskId === ancestorTaskId) return true;
        let curr = this.getTask(candidateTaskId);
        const visited = new Set();
        while (curr && curr.parentTaskId) {
            if (curr.parentTaskId === ancestorTaskId) return true;
            if (visited.has(curr.parentTaskId)) break;
            visited.add(curr.parentTaskId);
            curr = this.getTask(curr.parentTaskId);
        }
        return false;
    }

    isRoomDescendantOf(candidateRoomKey, ancestorRoomKey) {
        if (!candidateRoomKey || !ancestorRoomKey) return false;
        if (candidateRoomKey === ancestorRoomKey) return true;
        const allRooms = this.getRooms ? this.getRooms() : (GAME_DATA.ROOMS || {});
        let curr = allRooms[candidateRoomKey];
        const visited = new Set();
        while (curr && curr.parentRoom) {
            if (curr.parentRoom === ancestorRoomKey) return true;
            if (visited.has(curr.parentRoom)) break;
            visited.add(curr.parentRoom);
            curr = allRooms[curr.parentRoom];
        }
        return false;
    }

    moveItemHierarchically(source, target, recordUndo = true) {
        if (!source || !target || !source.id || !target.id) return { success: false, reason: 'Invalid source or target' };
        if (source.type === target.type && source.id === target.id) {
            return { success: false, reason: 'Cannot move an item into itself' };
        }

        const allRooms = this.getRooms ? this.getRooms() : (GAME_DATA.ROOMS || {});
        const levels = this.getLevels ? this.getLevels() : [];

        // 1. Moving a TASK
        if (source.type === 'task') {
            const taskId = source.id;
            const task = this.getTask(taskId);
            if (!task) return { success: false, reason: 'Source task not found' };

            const prevRoom = task.room;
            const prevParentTaskId = task.parentTaskId || null;

            let newRoom = null;
            let newParentTaskId = null;
            let targetName = '';

            if (target.type === 'level') {
                const lvl = levels.find(l => l.id === target.id);
                if (!lvl) return { success: false, reason: 'Target main task folder not found' };
                newRoom = target.id;
                newParentTaskId = null;
                targetName = lvl.name;
            } else if (target.type === 'room') {
                const rm = allRooms[target.id];
                if (!rm) return { success: false, reason: 'Target sub task not found' };
                newRoom = target.id;
                newParentTaskId = null;
                targetName = rm.name;
            } else if (target.type === 'task') {
                const targetTask = this.getTask(target.id);
                if (!targetTask) return { success: false, reason: 'Target task not found' };
                if (this.isTaskDescendantOf(target.id, taskId)) {
                    return { success: false, reason: 'Cannot move a task into its own sub-task' };
                }
                newRoom = targetTask.room;
                newParentTaskId = target.id;
                targetName = targetTask.name;
            } else {
                return { success: false, reason: 'Unsupported target type' };
            }

            if (!this.customTasks) this.customTasks = [];
            const idx = this.customTasks.findIndex(t => t.id === taskId);
            if (idx >= 0) {
                this.customTasks[idx] = {
                    ...this.customTasks[idx],
                    room: newRoom,
                    parentTaskId: newParentTaskId,
                    isDeleted: false
                };
            } else {
                this.customTasks.push({
                    ...task,
                    room: newRoom,
                    parentTaskId: newParentTaskId,
                    isCustom: true,
                    isDeleted: false
                });
            }

            if (recordUndo) {
                this.pushUndo({
                    type: 'hierarchicalMove',
                    source: { type: 'task', id: taskId, prevRoom, prevParentTaskId, name: task.name },
                    target: { ...target, name: targetName },
                    timestamp: Date.now()
                });
            }

            this.saveGame();
            this.notify();
            this.publishToCloud().catch(() => {});
            if (this.isInHoldingFolder && this.isInHoldingFolder('task', taskId)) {
                this.removeFromHoldingFolder('task', taskId);
            }
            return { success: true, sourceName: task.name, targetName, targetType: target.type };
        }

        // 2. Moving a ROOM / SUB-TASK
        if (source.type === 'room') {
            const roomKey = source.id;
            const room = allRooms[roomKey];
            if (!room) return { success: false, reason: 'Source sub task not found' };

            const prevLevel = room.level;
            const prevParentRoom = room.parentRoom || null;
            const prevParentTaskId = room.parentTaskId || null;
            const prevLevels = JSON.parse(JSON.stringify(this.customLevels || {}));
            let targetName = '';

            if (target.type === 'level') {
                const lvl = levels.find(l => l.id === target.id);
                if (!lvl) return { success: false, reason: 'Target main folder not found' };
                targetName = lvl.name;
                if (!this.customRooms) this.customRooms = {};
                this.customRooms[roomKey] = {
                    ...room,
                    level: target.id,
                    parentRoom: null,
                    parentTaskId: null
                };
                this.moveRoomToLevel(roomKey, target.id);
            } else if (target.type === 'room') {
                if (this.isRoomDescendantOf(target.id, roomKey)) {
                    return { success: false, reason: 'Cannot move a sub task into its own child sub task' };
                }
                const targetRoom = allRooms[target.id];
                if (!targetRoom) return { success: false, reason: 'Target sub task not found' };
                targetName = targetRoom.name;
                const targetLvlId = targetRoom.level || (levels[0] ? levels[0].id : 'level_1');
                if (!this.customRooms) this.customRooms = {};
                this.customRooms[roomKey] = {
                    ...room,
                    level: targetLvlId,
                    parentRoom: target.id,
                    parentTaskId: null
                };
                if (targetLvlId) {
                    this.moveRoomToLevel(roomKey, targetLvlId);
                }
            } else if (target.type === 'task') {
                const targetTask = this.getTask(target.id);
                if (!targetTask) return { success: false, reason: 'Target task not found' };
                targetName = targetTask.name;
                if (!this.customRooms) this.customRooms = {};
                this.customRooms[roomKey] = {
                    ...room,
                    level: targetTask.room,
                    parentTaskId: target.id,
                    parentRoom: null
                };
            } else {
                return { success: false, reason: 'Unsupported target type' };
            }

            if (recordUndo) {
                this.pushUndo({
                    type: 'hierarchicalMove',
                    source: { type: 'room', id: roomKey, prevLevel, prevParentRoom, prevParentTaskId, prevLevels, name: room.name },
                    target: { ...target, name: targetName },
                    timestamp: Date.now()
                });
            }

            this.saveGame();
            this.notify();
            this.publishToCloud().catch(() => {});
            if (this.isInHoldingFolder && this.isInHoldingFolder('room', roomKey)) {
                this.removeFromHoldingFolder('room', roomKey);
            }
            return { success: true, sourceName: room.name, targetName, targetType: target.type };
        }

        // 3. Moving a MAIN FOLDER / LEVEL
        if (source.type === 'level') {
            const lvlId = source.id;
            const srcLvl = levels.find(l => l.id === lvlId);
            if (!srcLvl) return { success: false, reason: 'Source main task folder not found' };

            if (target.type === 'level') {
                if (target.id === lvlId) return { success: false, reason: 'Cannot move folder into itself' };
                const res = this.demoteMainTaskToSubTask(lvlId, target.id);
                if (!res) return { success: false, reason: 'Could not demote main task' };
                return { success: true, sourceName: srcLvl.name, targetName: res.destLvl.name, targetType: 'level' };
            } else if (target.type === 'room') {
                const targetRoom = allRooms[target.id];
                if (targetRoom && targetRoom.level) {
                    const res = this.demoteMainTaskToSubTask(lvlId, targetRoom.level);
                    if (!res) return { success: false, reason: 'Could not convert main task' };
                    return { success: true, sourceName: srcLvl.name, targetName: targetRoom.name, targetType: 'room' };
                }
            }
        }

        return { success: false, reason: 'Action not supported' };
    }


    // ==========================================
    // CLIPBOARD & HIERARCHICAL COPY / DUPLICATE
    // ==========================================

    copyItemToClipboard(type, id) {
        if (!type || !id) return null;
        let name = id;
        let icon = '📁';
        if (type === 'task') {
            const t = this.getTask(id);
            if (t) { name = t.name; icon = '🔨'; }
        } else if (type === 'room') {
            const r = (this.getRooms ? this.getRooms() : {})[id];
            if (r) { name = r.name; icon = r.icon || '📁'; }
        } else if (type === 'level') {
            const l = (this.getLevels ? this.getLevels() : []).find(x => x.id === id);
            if (l) { name = l.name; icon = l.icon || '🏰'; }
        }

        this.clipboard = {
            type,
            id,
            name,
            icon,
            timestamp: Date.now()
        };

        if (typeof localStorage !== 'undefined') {
            try {
                localStorage.setItem('jack_clipboard', JSON.stringify(this.clipboard));
            } catch (e) {}
        }

        this.notify();
        return this.clipboard;
    }

    getClipboard() {
        if (this.clipboard) return this.clipboard;
        if (typeof localStorage !== 'undefined') {
            try {
                const saved = localStorage.getItem('jack_clipboard');
                if (saved) {
                    this.clipboard = JSON.parse(saved);
                    return this.clipboard;
                }
            } catch (e) {}
        }
        return null;
    }

    clearClipboard() {
        this.clipboard = null;
        if (typeof localStorage !== 'undefined') {
            try { localStorage.removeItem('jack_clipboard'); } catch (e) {}
        }
        this.notify();
    }

    // ==========================================
    // HOLDING FOLDER / STAGING AREA
    // ==========================================

    addToHoldingFolder(type, id) {
        if (!type || !id) return null;
        let name = id;
        let icon = '📦';
        let roomKey = null;
        let levelId = null;
        let parentTaskId = null;

        const allRooms = this.getRooms ? this.getRooms() : (GAME_DATA.ROOMS || {});
        const levels = this.getLevels ? this.getLevels() : [];

        if (type === 'task') {
            const t = this.getTask(id);
            if (t) {
                name = t.name;
                icon = '🔨';
                roomKey = t.room || t._taskRoomKey;
                parentTaskId = t.parentTaskId || null;
                const r = allRooms[roomKey];
                levelId = r && r.levelId ? r.levelId : (this.getLevelForRoom ? this.getLevelForRoom(roomKey) : null);
            }
        } else if (type === 'room') {
            const r = allRooms[id];
            if (r) {
                name = r.name;
                icon = r.icon || '📁';
                levelId = r.levelId || (this.getLevelForRoom ? this.getLevelForRoom(id) : null);
            }
        } else if (type === 'level') {
            const lvl = levels.find(l => l.id === id);
            if (lvl) {
                name = lvl.name;
                icon = lvl.icon || '🏢';
                levelId = lvl.id;
            }
        }

        const list = this.getHoldingFolder();
        const existingIdx = list.findIndex(item => item.type === type && item.id === id);
        const itemData = {
            type,
            id,
            name,
            icon,
            roomKey,
            levelId,
            parentTaskId,
            addedAt: Date.now()
        };

        if (existingIdx >= 0) {
            list[existingIdx] = itemData;
        } else {
            list.push(itemData);
        }

        this._saveHoldingFolder(list);
        this.notify();
        return itemData;
    }

    getHoldingFolder() {
        if (this.holdingFolder && Array.isArray(this.holdingFolder)) return this.holdingFolder;
        if (typeof localStorage !== 'undefined') {
            try {
                const saved = localStorage.getItem('jack_holding_folder');
                if (saved) {
                    this.holdingFolder = JSON.parse(saved);
                    if (Array.isArray(this.holdingFolder)) return this.holdingFolder;
                }
            } catch (e) {}
        }
        this.holdingFolder = [];
        return this.holdingFolder;
    }

    _saveHoldingFolder(list) {
        this.holdingFolder = list;
        if (typeof localStorage !== 'undefined') {
            try {
                localStorage.setItem('jack_holding_folder', JSON.stringify(list));
            } catch (e) {}
        }
    }

    removeFromHoldingFolder(type, id) {
        const list = this.getHoldingFolder().filter(item => !(item.type === type && item.id === id));
        this._saveHoldingFolder(list);
        this.notify();
        return list;
    }

    clearHoldingFolder() {
        this._saveHoldingFolder([]);
        this.notify();
    }

    isInHoldingFolder(type, id) {
        return this.getHoldingFolder().some(item => item.type === type && item.id === id);
    }

    duplicateItemHierarchically(source, target) {
        if (!source || !target || !source.id || !target.id) return { success: false, reason: 'Invalid source or target' };

        const allRooms = this.getRooms ? this.getRooms() : (GAME_DATA.ROOMS || {});
        const levels = this.getLevels ? this.getLevels() : [];

        const genId = (prefix) => `${prefix}_copy_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 6)}`;
        const createdItems = { tasks: [], rooms: [], levels: [] };

        // 1. DUPLICATE A TASK
        if (source.type === 'task') {
            const sourceTask = this.getTask(source.id);
            if (!sourceTask) return { success: false, reason: 'Source task not found' };

            let destRoom = null;
            let destParentTaskId = null;
            let destTargetName = '';

            if (target.type === 'level') {
                const lvl = levels.find(l => l.id === target.id);
                if (!lvl) return { success: false, reason: 'Target main task folder not found' };
                destRoom = target.id;
                destParentTaskId = null;
                destTargetName = lvl.name;
            } else if (target.type === 'room') {
                const rm = allRooms[target.id];
                if (!rm) return { success: false, reason: 'Target sub task not found' };
                destRoom = target.id;
                destParentTaskId = null;
                destTargetName = rm.name;
            } else if (target.type === 'task') {
                const targetTask = this.getTask(target.id);
                if (!targetTask) return { success: false, reason: 'Target task not found' };
                destRoom = targetTask.room;
                destParentTaskId = target.id;
                destTargetName = targetTask.name;
            }

            if (!destRoom) return { success: false, reason: 'Invalid target destination' };

            const newRootId = genId('task');
            const clonedRoot = {
                ...sourceTask,
                id: newRootId,
                room: destRoom,
                parentTaskId: destParentTaskId,
                name: `${sourceTask.name} (Copy)`,
                isCustom: true,
                isDeleted: false
            };

            if (!this.customTasks) this.customTasks = [];
            this.customTasks.push(clonedRoot);
            createdItems.tasks.push(newRootId);

            // Fetch tasks in source room to clone any child tasks recursively
            const allSrcTasks = this.getTasksForRoom ? this.getTasksForRoom(sourceTask.room) : [];

            const cloneDescendants = (oldParentId, newParentId) => {
                const childTasks = allSrcTasks.filter(t => t.parentTaskId === oldParentId && !t.isDeleted);
                childTasks.forEach(child => {
                    const newChildId = genId('task');
                    const clonedChild = {
                        ...child,
                        id: newChildId,
                        room: destRoom,
                        parentTaskId: newParentId,
                        name: `${child.name} (Copy)`,
                        isCustom: true,
                        isDeleted: false
                    };
                    this.customTasks.push(clonedChild);
                    createdItems.tasks.push(newChildId);
                    cloneDescendants(child.id, newChildId);
                });
            };

            cloneDescendants(source.id, newRootId);

            this.pushUndo({
                type: 'hierarchicalDuplicate',
                createdItems,
                source: { type: 'task', id: source.id, name: sourceTask.name },
                target: { ...target, name: destTargetName },
                timestamp: Date.now()
            });

            this.saveGame();
            this.notify();
            this.publishToCloud().catch(() => {});
            return {
                success: true,
                sourceName: sourceTask.name,
                targetName: destTargetName,
                targetType: target.type,
                clonedId: newRootId,
                totalCloned: createdItems.tasks.length
            };
        }

        // 2. DUPLICATE A SUB-TASK / ROOM
        if (source.type === 'room') {
            const sourceRoom = allRooms[source.id];
            if (!sourceRoom) return { success: false, reason: 'Source sub task not found' };

            const newRoomKey = genId('room');
            let targetLvlId = null;
            let parentRoomKey = null;
            let parentTaskId = null;
            let destTargetName = '';

            if (target.type === 'level') {
                const lvl = levels.find(l => l.id === target.id);
                if (!lvl) return { success: false, reason: 'Target main task folder not found' };
                targetLvlId = target.id;
                destTargetName = lvl.name;
            } else if (target.type === 'room') {
                const targetRoom = allRooms[target.id];
                if (!targetRoom) return { success: false, reason: 'Target sub task not found' };
                targetLvlId = targetRoom.level || (levels[0] ? levels[0].id : 'level_1');
                parentRoomKey = target.id;
                destTargetName = targetRoom.name;
            } else if (target.type === 'task') {
                const targetTask = this.getTask(target.id);
                if (!targetTask) return { success: false, reason: 'Target task not found' };
                targetLvlId = targetTask.room;
                parentTaskId = target.id;
                destTargetName = targetTask.name;
            }

            if (!targetLvlId) targetLvlId = levels[0] ? levels[0].id : 'level_1';

            if (!this.customRooms) this.customRooms = {};
            this.customRooms[newRoomKey] = {
                ...sourceRoom,
                name: `${sourceRoom.name} (Copy)`,
                level: targetLvlId,
                parentRoom: parentRoomKey,
                parentTaskId: parentTaskId,
                isCustom: true,
                isDeleted: false
            };
            createdItems.rooms.push(newRoomKey);

            if (!this.customLevels) this.customLevels = {};
            const destLvl = levels.find(l => l.id === targetLvlId);
            let destRooms = destLvl ? Array.from(destLvl.rooms || []) : [];
            if (!destRooms.includes(newRoomKey)) destRooms.push(newRoomKey);
            this.customLevels[targetLvlId] = { ...(this.customLevels[targetLvlId] || {}), rooms: destRooms };

            const srcTasks = this.getTasksForRoom ? this.getTasksForRoom(source.id) : [];
            const idMap = new Map();

            srcTasks.forEach(t => {
                const newTaskId = genId('task');
                idMap.set(t.id, newTaskId);
                const clonedTask = {
                    ...t,
                    id: newTaskId,
                    room: newRoomKey,
                    isCustom: true,
                    isDeleted: false
                };
                if (!this.customTasks) this.customTasks = [];
                this.customTasks.push(clonedTask);
                createdItems.tasks.push(newTaskId);
            });

            createdItems.tasks.forEach(clonedId => {
                const t = this.customTasks.find(x => x.id === clonedId);
                if (t && t.parentTaskId && idMap.has(t.parentTaskId)) {
                    t.parentTaskId = idMap.get(t.parentTaskId);
                }
            });

            this.pushUndo({
                type: 'hierarchicalDuplicate',
                createdItems,
                source: { type: 'room', id: source.id, name: sourceRoom.name },
                target: { ...target, name: destTargetName },
                timestamp: Date.now()
            });

            this.saveGame();
            this.notify();
            this.publishToCloud().catch(() => {});
            return {
                success: true,
                sourceName: sourceRoom.name,
                targetName: destTargetName,
                targetType: target.type,
                clonedKey: newRoomKey,
                totalCloned: createdItems.tasks.length + 1
            };
        }

        // 3. DUPLICATE A MAIN TASK / LEVEL
        if (source.type === 'level') {
            const srcLvl = levels.find(l => l.id === source.id);
            if (!srcLvl) return { success: false, reason: 'Source main task folder not found' };

            const newLvlId = genId('lvl');
            const newLvlName = `${srcLvl.name} (Copy)`;
            const newRooms = [];

            (srcLvl.rooms || []).forEach(roomKey => {
                if (allRooms[roomKey]) {
                    const res = this.duplicateItemHierarchically(
                        { type: 'room', id: roomKey },
                        { type: 'level', id: newLvlId }
                    );
                    if (res && res.clonedKey) {
                        newRooms.push(res.clonedKey);
                        createdItems.rooms.push(res.clonedKey);
                    }
                }
            });

            if (!this.customLevels) this.customLevels = {};
            this.customLevels[newLvlId] = {
                id: newLvlId,
                name: newLvlName,
                icon: srcLvl.icon || '🏰',
                elevation: srcLvl.elevation || '',
                rooms: newRooms,
                isCustom: true,
                isDeleted: false
            };
            createdItems.levels.push(newLvlId);

            if (!Array.isArray(this.levelOrder)) this.levelOrder = levels.map(l => l.id);
            const srcIdx = this.levelOrder.indexOf(source.id);
            if (srcIdx !== -1) {
                this.levelOrder.splice(srcIdx + 1, 0, newLvlId);
            } else {
                this.levelOrder.push(newLvlId);
            }

            let destTargetName = 'Top-Level Master Projects';
            if (target.type === 'level' && target.id !== newLvlId) {
                this.demoteMainTaskToSubTask(newLvlId, target.id);
                destTargetName = (levels.find(l => l.id === target.id) || {}).name || target.id;
            }

            this.pushUndo({
                type: 'hierarchicalDuplicate',
                createdItems,
                source: { type: 'level', id: source.id, name: srcLvl.name },
                target: { ...target, name: destTargetName },
                timestamp: Date.now()
            });

            this.saveGame();
            this.notify();
            this.publishToCloud().catch(() => {});
            return {
                success: true,
                sourceName: srcLvl.name,
                targetName: destTargetName,
                targetType: target.type,
                clonedId: newLvlId,
                totalCloned: createdItems.tasks.length + createdItems.rooms.length + 1
            };
        }

        return { success: false, reason: 'Unsupported duplicate operation' };
    }

    duplicateTaskToRoom(taskId, targetRoomKey) {
        const task = this.getTask(taskId);
        if (!task || !targetRoomKey) return null;

        const newId = 'task_copy_' + Date.now();
        const newTask = {
            ...task,
            id: newId,
            room: targetRoomKey,
            name: `${task.name} (Copy)`,
            isCustom: true,
            isDeleted: false
        };

        if (!this.customTasks) this.customTasks = [];
        this.customTasks.push(newTask);

        this.pushUndo({
            type: 'deleteTask',
            taskId: newId,
            taskName: newTask.name
        });

        this.saveGame();
        this.notify();
        return newTask;
    }

    promoteSubTaskToMainTask(roomKey) {
        if (!roomKey) return null;
        const allRooms = this.getRooms ? this.getRooms() : (GAME_DATA.ROOMS || {});
        const room = allRooms[roomKey];
        if (!room) return null;

        // Find parent level
        const levels = this.getLevels ? this.getLevels() : [];
        const parentLvl = levels.find(l => l.rooms && l.rooms.includes(roomKey));

        // Remove room from all existing levels
        if (!this.customLevels) this.customLevels = {};
        levels.forEach(lvl => {
            const remaining = Array.from(lvl.rooms || []).filter(r => r !== roomKey);
            this.customLevels[lvl.id] = { ...(this.customLevels[lvl.id] || {}), rooms: remaining };
        });

        // Create new Main Task / Level
        const newLvlId = `lvl_${roomKey}`;
        const newLevelData = {
            id: newLvlId,
            name: room.name,
            icon: room.icon || '📁',
            elevation: room.area || 'Main Task',
            rooms: [roomKey],
            isCustom: true,
            isDeleted: false
        };
        this.customLevels[newLvlId] = newLevelData;

        // Place in levelOrder immediately after parentLvl if possible
        if (!Array.isArray(this.levelOrder)) this.levelOrder = levels.map(l => l.id);
        this.levelOrder = this.levelOrder.filter(id => id !== newLvlId);
        if (parentLvl) {
            const parentIdx = this.levelOrder.indexOf(parentLvl.id);
            if (parentIdx !== -1) {
                this.levelOrder.splice(parentIdx + 1, 0, newLvlId);
            } else {
                this.levelOrder.push(newLvlId);
            }
        } else {
            this.levelOrder.push(newLvlId);
        }

        // Update room's level reference
        if (!this.customRooms) this.customRooms = {};
        this.customRooms[roomKey] = {
            ...room,
            level: newLvlId
        };

        this.saveGame();
        this.notify();
        this.publishToCloud().catch(() => {});
        return newLevelData;
    }

    demoteMainTaskToSubTask(lvlId, targetLvlId = null) {
        if (!lvlId) return null;
        const levels = this.getLevels ? this.getLevels() : [];
        const lvl = levels.find(l => l.id === lvlId);
        if (!lvl) return null;

        const otherLevels = levels.filter(l => l.id !== lvlId);
        if (otherLevels.length === 0) {
            console.warn('Cannot convert the only remaining Main Task into a subtask.');
            return null;
        }

        const destLvl = targetLvlId ? otherLevels.find(l => l.id === targetLvlId) : otherLevels[0];
        if (!destLvl) return null;

        if (!this.customLevels) this.customLevels = {};
        if (!this.customRooms) this.customRooms = {};

        // 1. If this level had its own direct tasks, create a representative room for it
        const directTasks = this.getTasksForRoom ? this.getTasksForRoom(lvlId) : [];
        const repRoomKey = `sub_${lvlId}`;
        if (!this.customRooms[repRoomKey]) {
            this.customRooms[repRoomKey] = {
                name: lvl.name,
                icon: lvl.icon || '📁',
                area: lvl.elevation || 'Sub Task',
                level: destLvl.id,
                isCustom: true,
                isDeleted: false
            };
        }
        // Move any direct tasks of lvlId to repRoomKey
        if (directTasks.length > 0 && Array.isArray(this.customTasks)) {
            this.customTasks.forEach(t => {
                if (t.room === lvlId) t.room = repRoomKey;
            });
        }

        // 2. Transfer all rooms that were under lvlId to destLvl
        const childRooms = Array.from(lvl.rooms || []).filter(r => r !== repRoomKey);
        const roomsToMove = [repRoomKey, ...childRooms];

        let destRooms = Array.from(destLvl.rooms || []);
        roomsToMove.forEach(r => {
            if (!destRooms.includes(r)) destRooms.push(r);
            this.customRooms[r] = { ...(this.customRooms[r] || {}), level: destLvl.id };
        });

        this.customLevels[destLvl.id] = {
            ...(this.customLevels[destLvl.id] || {}),
            rooms: destRooms
        };

        // 3. Mark lvlId as deleted / removed from levelOrder
        this.customLevels[lvlId] = {
            ...(this.customLevels[lvlId] || {}),
            isDeleted: true
        };
        if (Array.isArray(this.levelOrder)) {
            this.levelOrder = this.levelOrder.filter(id => id !== lvlId);
        }

        this.saveGame();
        this.notify();
        this.publishToCloud().catch(() => {});
        return { destLvl, repRoomKey };
    }

    convertTaskToSubTask(taskId, targetLvlId = null) {
        const task = this.getTask(taskId);
        if (!task) return null;

        const timestamp = Date.now().toString(36);
        const newRoomKey = `room_task_${timestamp}`;
        const allRooms = this.getRooms ? this.getRooms() : (GAME_DATA.ROOMS || {});
        const curRoom = allRooms[task.room];
        const lvlId = targetLvlId || curRoom?.level || (this.getLevels ? this.getLevels()[0]?.id : 'level_1');

        if (!this.customRooms) this.customRooms = {};
        this.customRooms[newRoomKey] = {
            name: task.name,
            icon: '📁',
            area: 'Custom Sub Task',
            desc: task.desc || '',
            level: lvlId,
            isCustom: true,
            isDeleted: false
        };

        // Move this task into the new room
        this.moveTaskToRoom(taskId, newRoomKey);

        // Add room to level
        if (!this.customLevels) this.customLevels = {};
        const levels = this.getLevels ? this.getLevels() : [];
        const lvl = levels.find(l => l.id === lvlId);
        const currentRooms = Array.from(lvl?.rooms || []);
        if (!currentRooms.includes(newRoomKey)) currentRooms.push(newRoomKey);
        this.customLevels[lvlId] = { ...(this.customLevels[lvlId] || {}), rooms: currentRooms };

        this.saveGame();
        this.notify();
        this.publishToCloud().catch(() => {});
        return newRoomKey;
    }

    moveSubtaskOrderInLevel(lvlId, roomKey, delta) {
        if (!lvlId || !roomKey) return false;
        const levels = this.getLevels ? this.getLevels() : [];
        const lvl = levels.find(l => l.id === lvlId);
        if (!lvl || !Array.isArray(lvl.rooms)) return false;

        const rooms = Array.from(lvl.rooms);
        const idx = rooms.indexOf(roomKey);
        if (idx === -1) return false;

        const targetIdx = idx + delta;
        if (targetIdx < 0 || targetIdx >= rooms.length) return false;

        rooms.splice(idx, 1);
        rooms.splice(targetIdx, 0, roomKey);

        if (!this.customLevels) this.customLevels = {};
        this.customLevels[lvlId] = { ...(this.customLevels[lvlId] || {}), rooms: rooms };

        this.saveGame();
        this.notify();
        this.publishToCloud().catch(() => {});
        return true;
    }

    moveTaskOrderInRoom(roomKey, taskId, delta) {
        if (!roomKey || !taskId) return false;
        const tasks = this.getTasksForRoom(roomKey);
        const ids = tasks.map(t => t.id);
        const idx = ids.indexOf(taskId);
        if (idx === -1) return false;

        const targetIdx = idx + delta;
        if (targetIdx < 0 || targetIdx >= ids.length) return false;

        ids.splice(idx, 1);
        ids.splice(targetIdx, 0, taskId);

        if (!this.taskOrder) this.taskOrder = {};
        this.taskOrder[roomKey] = ids;

        this.saveGame();
        this.notify();
        this.publishToCloud().catch(() => {});
        return true;
    }

    getTask(taskId) {
        let base = (GAME_DATA.TASKS || []).find(t => t.id === taskId) || 
                   (GAME_DATA.SALVAGE_TASKS || []).find(t => t.id === taskId);
        if (this.customTasks) {
            const custom = this.customTasks.find(t => t.id === taskId);
            if (custom) {
                return base ? { ...base, ...custom } : custom;
            }
        }
        return base ? { ...base } : null;
    }

    saveTask(taskData) {
        if (!taskData) return;
        if (!this.customTasks) this.customTasks = [];
        let id = taskData.id;
        if (!id) {
            id = 'task_custom_' + Date.now();
            taskData.id = id;
            taskData.isCustom = true;
        }
        if (this.deletedTaskIds) {
            this.deletedTaskIds = this.deletedTaskIds.filter(x => x !== id);
        }
        const idx = this.customTasks.findIndex(t => t.id === id);
        if (idx >= 0) {
            this.customTasks[idx] = { ...this.customTasks[idx], ...taskData, isDeleted: false };
        } else {
            this.customTasks.push({ ...taskData, isDeleted: false });
        }
        if (taskData.isCompleted) {
            this.completedTaskIDs.add(id);
            if (this.uncompletedTaskIDs) this.uncompletedTaskIDs.delete(id);
        } else if (taskData.isCompleted === false) {
            this.completedTaskIDs.delete(id);
            if (!this.uncompletedTaskIDs) this.uncompletedTaskIDs = new Set();
            this.uncompletedTaskIDs.add(id);
        }
        this.recalculatePropertyValue();
        this.saveGame();
        this.notify();
        this.publishToCloud().catch(() => {});
        return id;
    }

    deleteTask(taskId) {
        if (!this.customTasks) this.customTasks = [];
        if (!this.deletedTaskIds) this.deletedTaskIds = [];
        if (!this.deletedTaskIds.includes(taskId)) this.deletedTaskIds.push(taskId);
        const taskObj = this.getTask(taskId);
        const taskName = taskObj?.title || taskId;
        const prevTask = this.customTasks.find(t => t.id === taskId);
        const wasCompleted = this.completedTaskIDs.has(taskId);

        this.pushUndo({
            type: 'deleteTask',
            taskId: taskId,
            taskName: taskName,
            prevTask: prevTask ? { ...prevTask } : null,
            wasCompleted: wasCompleted
        });

        const idx = this.customTasks.findIndex(t => t.id === taskId);
        if (idx >= 0) {
            this.customTasks[idx].isDeleted = true;
        } else {
            this.customTasks.push({ id: taskId, isDeleted: true });
        }
        this.completedTaskIDs.delete(taskId);
        if (!this.uncompletedTaskIDs) this.uncompletedTaskIDs = new Set();
        this.uncompletedTaskIDs.add(taskId);
        this.saveGame();
        this.notify();
        this.publishToCloud().catch(() => {});
    }

    // ==========================================
    // WORKSPACE TABS MANAGEMENT (ADD, EDIT, DELETE)
    // ==========================================
    sanitizeTabIcon(icon, fallbackIcon = '📑') {
        if (!icon || typeof icon !== 'string') return fallbackIcon;
        const cleaned = icon.replace(/[�￾￿]/g, '').trim();
        if (!cleaned || cleaned === '?' || cleaned === '??' || cleaned === '???') return fallbackIcon;
        return cleaned;
    }

    cleanCorruptedTabOverrides() {
        if (!this.tabOverrides || typeof this.tabOverrides !== 'object') return;
        const defaults = this.getDefaultWorkspaceTabs();
        for (const [k, v] of Object.entries(this.tabOverrides)) {
            if (v && typeof v === 'object') {
                const def = defaults.find(d => d.id === k);
                const fallback = def ? def.icon : '📑';
                v.icon = this.sanitizeTabIcon(v.icon, fallback);
            }
        }
    }

    getDefaultWorkspaceTabs() {
        return [
            { id: 'renovations', name: 'Renovations', icon: '🛠️', desc: 'Main task list, room project dossiers, sub-tasks, and journals' },
            { id: 'starting-point', name: 'Starting Point (The Before)', icon: '🏛️', desc: 'Original 1910 baseline condition when found, 60-ton load, structural sags, purchase price, and daily maintenance' },
            { id: 'dream', name: 'Building the Dream', icon: '🌟', desc: 'Project vision, public portal, fundraising & community support' },
            { id: 'blueprint', name: 'Full Blueprint Schematics', icon: '📐', desc: 'Technical structural schematics and room cutaways' },
            { id: 'concept', name: 'House Concept Gallery', icon: '🖼️', desc: 'Interactive visual gallery of the house and projects with floor-by-floor tabs' },
            { id: 'journals', name: 'Field Journals & Media', icon: '📖', desc: 'Field journals, photo and video logs, and historical archives' },
            { id: 'junkyard', name: 'Junkyard Salvage', icon: '🚗', desc: 'Salvage yard runs, reclaimed architectural antiques, and vintage finds' },
            { id: 'cats', name: '4 Cats & Chaos', icon: '🐱', desc: 'Resident feline companions, antics, care, and moral support' },
            { id: 'hardware', name: 'Tools & Store', icon: '🏪', desc: 'Hardware depot, professional tools, machinery, and equipment shed' },
            { id: 'finance', name: 'Finance & Loans', icon: '🏦', desc: 'Ledger, carrying overhead, hard-money financing, budget & equity' },
            { id: 'inspection', name: 'Appraisal & Permit', icon: '📋', desc: 'Property condition report, code inspection, engineering stamps & permit' },
            { id: 'career', name: 'B&B Operations', icon: '🏨', desc: 'Whispering Pines hospitality, guest bookings, reviews, and host operations' }
        ];
    }

    getTabs() {
        this.cleanCorruptedTabOverrides();
        const defaults = this.getDefaultWorkspaceTabs();
        const overrides = this.tabOverrides || {};

        // Self-healing: Ensure core permanent tabs are NEVER deleted or missing
        const protectedTabs = ['renovations', 'starting-point', 'history', 'concept', 'dream', 'blueprint'];
        if (Array.isArray(this.deletedTabIds) && this.deletedTabIds.some(id => protectedTabs.includes(id))) {
            this.deletedTabIds = this.deletedTabIds.filter(id => !protectedTabs.includes(id));
            this.saveGame();
        }
        const deletedSet = new Set((this.deletedTabIds || []).filter(id => !protectedTabs.includes(id)));

        // Base tabs with any user overrides
        const mergedBase = defaults
            .filter(t => !deletedSet.has(t.id))
            .map(t => {
                if (overrides[t.id]) {
                    const cleanIcon = this.sanitizeTabIcon(overrides[t.id].icon, t.icon);
                    return { ...t, ...overrides[t.id], icon: cleanIcon, isCustom: false };
                }
                return { ...t, icon: this.sanitizeTabIcon(t.icon, '📑'), isCustom: false };
            });

        // Custom user-created tabs
        const activeCustom = (this.customTabs || [])
            .filter(t => !deletedSet.has(t.id) && !t.isDeleted)
            .map(t => ({ ...t, icon: this.sanitizeTabIcon(t.icon, '📑'), isCustom: true }));

        const allTabsMap = new Map();
        mergedBase.forEach(t => allTabsMap.set(t.id, t));
        activeCustom.forEach(t => allTabsMap.set(t.id, t));

        // If tabOrder is defined, order by tabOrder
        if (Array.isArray(this.tabOrder) && this.tabOrder.length > 0) {
            protectedTabs.forEach(pid => {
                if (allTabsMap.has(pid) && !this.tabOrder.includes(pid)) {
                    this.tabOrder.push(pid);
                }
            });
            const ordered = [];
            this.tabOrder.forEach(id => {
                if (allTabsMap.has(id)) {
                    ordered.push(allTabsMap.get(id));
                    allTabsMap.delete(id);
                }
            });
            // append any remaining tabs
            allTabsMap.forEach(t => ordered.push(t));
            return ordered;
        }

        return [...mergedBase, ...activeCustom];
    }

    getTab(tabId) {
        if (!tabId) return null;
        const all = this.getTabs();
        const found = all.find(t => t.id === tabId);
        if (found) return found;

        // Check defaults directly
        const defaults = this.getDefaultWorkspaceTabs();
        const d = defaults.find(t => t.id === tabId);
        if (d) {
            const overrides = this.tabOverrides || {};
            return overrides[tabId] ? { ...d, ...overrides[tabId] } : d;
        }
        return (this.customTabs || []).find(t => t.id === tabId) || null;
    }

    saveTab(tabData) {
        if (!tabData) return null;
        const defaults = this.getDefaultWorkspaceTabs();
        const isBuiltIn = defaults.some(d => d.id === tabData.id);

        if (!this.tabOverrides) this.tabOverrides = {};
        if (!this.customTabs) this.customTabs = [];
        if (!this.tabOrder) this.tabOrder = [];
        if (!this.deletedTabIds) this.deletedTabIds = [];

        // If it was in deletedTabIds, undelete it
        if (tabData.id && this.deletedTabIds.includes(tabData.id)) {
            this.deletedTabIds = this.deletedTabIds.filter(id => id !== tabData.id);
        }

        let savedTab = null;

        if (isBuiltIn) {
            // Update override for built-in tab
            this.tabOverrides[tabData.id] = {
                name: (tabData.name || '').trim(),
                icon: (tabData.icon || '').trim() || '🛠️',
                desc: (tabData.desc || '').trim()
            };
            savedTab = this.getTab(tabData.id);
        } else if (tabData.id && this.customTabs.some(t => t.id === tabData.id)) {
            // Update existing custom tab
            const idx = this.customTabs.findIndex(t => t.id === tabData.id);
            this.customTabs[idx] = {
                ...this.customTabs[idx],
                name: (tabData.name || '').trim() || 'Untitled Tab',
                icon: (tabData.icon || '').trim() || '📋',
                desc: (tabData.desc || '').trim(),
                content: tabData.content !== undefined ? tabData.content : (this.customTabs[idx].content || ''),
                updatedAt: Date.now(),
                isDeleted: false
            };
            savedTab = this.customTabs[idx];
        } else {
            // Create new custom tab
            const newId = tabData.id || ('custom_tab_' + Date.now().toString(36) + Math.random().toString(36).substr(2, 4));
            savedTab = {
                id: newId,
                name: (tabData.name || '').trim() || 'New Tab',
                icon: (tabData.icon || '').trim() || '📋',
                desc: (tabData.desc || '').trim(),
                content: tabData.content || '',
                isCustom: true,
                createdAt: Date.now(),
                isDeleted: false
            };
            this.customTabs.push(savedTab);
            if (!this.tabOrder.includes(newId)) {
                this.tabOrder.push(newId);
            }
        }

        this.saveGame();
        this.notify();
        return savedTab;
    }

    deleteTab(tabId) {
        const protectedTabs = ['renovations', 'starting-point', 'history', 'concept', 'dream', 'blueprint'];
        if (!tabId || protectedTabs.includes(tabId)) return false;
        if (!this.deletedTabIds) this.deletedTabIds = [];
        if (!this.deletedTabIds.includes(tabId)) {
            this.deletedTabIds.push(tabId);
        }
        if (this.customTabs) {
            const idx = this.customTabs.findIndex(t => t.id === tabId);
            if (idx >= 0) {
                this.customTabs[idx].isDeleted = true;
            }
        }
        this.saveGame();
        this.notify();
        return true;
    }

    reorderTabs(fromTabId, toTabId) {
        if (!fromTabId || !toTabId || fromTabId === toTabId) return false;
        const currentTabs = this.getTabs();
        const tabIds = currentTabs.map(t => t.id);
        const fromIdx = tabIds.indexOf(fromTabId);
        const toIdx = tabIds.indexOf(toTabId);
        if (fromIdx === -1 || toIdx === -1) return false;

        tabIds.splice(fromIdx, 1);
        tabIds.splice(toIdx, 0, fromTabId);
        this.tabOrder = tabIds;

        this.saveGame();
        this.notify();
        this.publishToCloud().catch(() => {});
        return true;
    }

    // ==========================================
    // CUSTOM TAB RICH MEDIA POSTS & CONTENT CREATOR
    // ==========================================
    getCustomTabPosts(tabId) {
        if (!tabId) return [];
        const tab = this.getTab(tabId);
        if (!tab) return [];
        if (!Array.isArray(tab.posts)) {
            tab.posts = [];
            // If tab has legacy content, generate an initial post so data is preserved
            if (tab.content && tab.content.trim()) {
                tab.posts.push({
                    id: 'post_initial_' + tabId,
                    header: tab.name || 'Workspace Overview',
                    subheader: tab.desc || '',
                    body: tab.content,
                    mediaType: 'none',
                    media: [],
                    footnote: '',
                    references: [],
                    createdAt: tab.createdAt || Date.now(),
                    updatedAt: tab.updatedAt || Date.now()
                });
            }
        }
        return tab.posts;
    }

    saveCustomTabPost(tabId, postData) {
        if (!tabId || !postData) return null;
        const tab = this.getTab(tabId);
        if (!tab) return null;
        if (!Array.isArray(tab.posts)) tab.posts = [];

        const postId = postData.id || ('post_' + Date.now().toString(36) + Math.random().toString(36).substr(2, 4));
        const postObj = {
            id: postId,
            header: (postData.header || '').trim() || 'Untitled Post',
            subheader: (postData.subheader || '').trim(),
            body: postData.body || '',
            mediaType: postData.mediaType || 'none', // 'none' | 'photo' | 'gallery'
            media: Array.isArray(postData.media) ? postData.media : [], // [{ url, caption, alt }]
            footnote: (postData.footnote || '').trim(),
            references: Array.isArray(postData.references) ? postData.references : [], // [{ type, targetId, targetType, url, label }]
            createdAt: postData.createdAt || Date.now(),
            updatedAt: Date.now()
        };

        const existingIdx = tab.posts.findIndex(p => p.id === postId);
        if (existingIdx >= 0) {
            tab.posts[existingIdx] = postObj;
        } else {
            tab.posts.push(postObj);
        }

        // Also update the custom tab in customTabs array
        if (this.customTabs) {
            const tIdx = this.customTabs.findIndex(t => t.id === tabId);
            if (tIdx >= 0) {
                this.customTabs[tIdx].posts = tab.posts;
                this.customTabs[tIdx].updatedAt = Date.now();
            }
        }

        this.saveGame();
        this.notify();
        this.publishToCloud().catch(() => {});
        return postObj;
    }

    deleteCustomTabPost(tabId, postId) {
        if (!tabId || !postId) return false;
        const tab = this.getTab(tabId);
        if (!tab || !Array.isArray(tab.posts)) return false;
        tab.posts = tab.posts.filter(p => p.id !== postId);

        if (this.customTabs) {
            const tIdx = this.customTabs.findIndex(t => t.id === tabId);
            if (tIdx >= 0) {
                this.customTabs[tIdx].posts = tab.posts;
            }
        }

        this.saveGame();
        this.notify();
        this.publishToCloud().catch(() => {});
        return true;
    }

    duplicateCustomTabPost(tabId, postId) {
        if (!tabId || !postId) return null;
        const tab = this.getTab(tabId);
        if (!tab || !Array.isArray(tab.posts)) return null;
        const srcPost = tab.posts.find(p => p.id === postId);
        if (!srcPost) return null;

        const clonedPost = JSON.parse(JSON.stringify(srcPost));
        clonedPost.id = 'post_' + Date.now().toString(36) + Math.random().toString(36).substr(2, 4);
        clonedPost.header = `${clonedPost.header} (Copy)`;
        clonedPost.createdAt = Date.now();
        clonedPost.updatedAt = Date.now();

        const srcIdx = tab.posts.findIndex(p => p.id === postId);
        tab.posts.splice(srcIdx + 1, 0, clonedPost);

        if (this.customTabs) {
            const tIdx = this.customTabs.findIndex(t => t.id === tabId);
            if (tIdx >= 0) {
                this.customTabs[tIdx].posts = tab.posts;
            }
        }

        this.saveGame();
        this.notify();
        this.publishToCloud().catch(() => {});
        return clonedPost;
    }

    reorderCustomTabPosts(tabId, fromIdx, toIdx) {
        if (!tabId) return false;
        const tab = this.getTab(tabId);
        if (!tab || !Array.isArray(tab.posts)) return false;
        if (fromIdx < 0 || fromIdx >= tab.posts.length || toIdx < 0 || toIdx >= tab.posts.length) return false;
        if (fromIdx === toIdx) return false;

        const movedItem = tab.posts.splice(fromIdx, 1)[0];
        tab.posts.splice(toIdx, 0, movedItem);

        if (this.customTabs) {
            const tIdx = this.customTabs.findIndex(t => t.id === tabId);
            if (tIdx >= 0) {
                this.customTabs[tIdx].posts = tab.posts;
            }
        }

        this.saveGame();
        this.notify();
        this.publishToCloud().catch(() => {});
        return true;
    }

    resetDefaultTabs() {
        this.deletedTabIds = [];
        this.tabOverrides = {};
        this.tabOrder = [];
        this.saveGame();
        this.notify();
        return true;
    }

    getMediaForRoomAndPhase(roomKey, phase = 'before') {
        const photos = this.getPhotosForRoom(roomKey);
        const videos = this.getVideosForRoom(roomKey);
        const progress = this.getProgressForRoom ? this.getProgressForRoom(roomKey) : [];

        const target = phase.toLowerCase();

        const matchesPhase = (item) => {
            if (item.phase) return item.phase.toLowerCase() === target;
            const text = ((item.title || '') + ' ' + (item.desc || '') + ' ' + (item.caption || '') + ' ' + (item.notes || '') + ' ' + (item.tag || '')).toLowerCase();
            if (target === 'before') {
                return text.includes('before') || text.includes('original') || text.includes('found') || text.includes('initial') || text.includes('start') || (!text.includes('after') && !text.includes('during') && !text.includes('progress') && !text.includes('finish'));
            } else if (target === 'during') {
                return text.includes('during') || text.includes('progress') || text.includes('demo') || text.includes('framing') || text.includes('rough') || text.includes('work') || text.includes('maintenance') || text.includes('install');
            } else if (target === 'after') {
                return text.includes('after') || text.includes('finish') || text.includes('complete') || text.includes('restored') || text.includes('final') || text.includes('showcase');
            }
            return false;
        };

        return {
            photos: photos.filter(matchesPhase),
            videos: videos.filter(matchesPhase),
            progress: progress.filter(matchesPhase)
        };
    }

    
    isTaskHighlighted(taskId) {
        if (!taskId) return false;
        return Boolean(this.highlightedTaskIDs && this.highlightedTaskIDs.has(taskId));
    }

    toggleTaskHighlight(taskId) {
        if (!taskId) return false;
        if (!this.highlightedTaskIDs) this.highlightedTaskIDs = new Set();
        const wasHighlighted = this.highlightedTaskIDs.has(taskId);
        if (wasHighlighted) {
            this.highlightedTaskIDs.delete(taskId);
        } else {
            this.highlightedTaskIDs.add(taskId);
        }
        this.pushUndo({
            type: 'toggleTaskHighlight',
            taskId: taskId,
            wasHighlighted: wasHighlighted
        });
        this.saveGame();
        this.notify();
        this.publishToCloud().catch(() => {});
        return !wasHighlighted;
    }
toggleTaskStatus(taskId) {
        const task = this.getTask(taskId);
        if (!task) return;
        if (this.completedTaskIDs.has(taskId)) {
            this.completedTaskIDs.delete(taskId);
            if (!this.uncompletedTaskIDs) this.uncompletedTaskIDs = new Set();
            this.uncompletedTaskIDs.add(taskId);
        } else {
            this.completedTaskIDs.add(taskId);
            if (this.uncompletedTaskIDs) this.uncompletedTaskIDs.delete(taskId);
            if (task.value) {
                this.propertyValue += task.value;
            }
            this.log(`🏆 Physical Accomplishment: Completed "${task.name}" (+$${(task.value || 0).toLocaleString()} ARV)`, 'accomplishment', {
                taskId: task.id,
                taskName: task.name,
                roomKey: task.room,
                value: task.value || 0,
                isAccomplishment: true
            });
            const roomPct = this.calculateRoomCompletion ? this.calculateRoomCompletion(task.room) : 0;
            if (roomPct >= 100) {
                const roomName = this.getRoom ? (this.getRoom(task.room)?.name || task.room) : task.room;
                this.log(`🎉 Room Masterpiece: ${roomName} is 100% Fully Restored & Certified!`, 'accomplishment', { isAccomplishment: true });
            }
        }
        this.recalculatePropertyValue();
        this.saveGame();
        this.notify();
    }

    recalculatePropertyValue() {
        let val = this.propertyInfo?.purchasePrice || (this.currentHouse ? this.currentHouse.purchasePrice : 65000);
        this.completedTaskIDs.forEach(tid => {
            const t = this.getTask(tid);
            if (t && t.value) val += t.value;
        });
        this.propertyValue = val;
    }

    // ==========================================
    // TASK PRIORITIES, CHECKLISTS, MATERIALS & TOOLS
    // ==========================================
    getTaskPriority(taskId) {
        if (this.taskPriorities && this.taskPriorities[taskId] !== undefined) {
            return Number(this.taskPriorities[taskId]);
        }
        const task = this.getTask(taskId);
        if (task && task.priority !== undefined) {
            return Number(task.priority);
        }
        if (GAME_DATA.DEFAULT_PROJECT_SPEC_MAP && GAME_DATA.DEFAULT_PROJECT_SPEC_MAP[taskId]?.priority) {
            return Number(GAME_DATA.DEFAULT_PROJECT_SPEC_MAP[taskId].priority);
        }
        // Intelligent architectural priority fallback
        if (task) {
            if (task.room === 'Foundation') return 1;
            if (task.room === 'RoofAttic') return 1;
            if (task.room === 'PlumbingHVAC') return 2;
            if (task.room === 'LivingRoom' || task.room === 'Kitchen' || task.room === 'Bathroom') return 3;
            if (task.room === 'Bedroom' || task.room === 'Basement') return 4;
            return 5;
        }
        return 3;
    }

    setTaskPriority(taskId, priority) {
        if (!this.taskPriorities) this.taskPriorities = {};
        this.taskPriorities[taskId] = Number(priority);
        this.saveGame();
        this.notify();
    }

    getTaskChecklist(taskId) {
        if (this.taskChecklists && this.taskChecklists[taskId] && Array.isArray(this.taskChecklists[taskId])) {
            return this.taskChecklists[taskId];
        }
        if (GAME_DATA.DEFAULT_PROJECT_SPEC_MAP && GAME_DATA.DEFAULT_PROJECT_SPEC_MAP[taskId]?.checklist) {
            return JSON.parse(JSON.stringify(GAME_DATA.DEFAULT_PROJECT_SPEC_MAP[taskId].checklist));
        }
        const task = this.getTask(taskId);
        if (!task) return [];
        return [
            { id: `cl_${taskId}_1`, text: `Site prep & safety inspection for ${task.name}`, done: this.completedTaskIDs.has(taskId) },
            { id: `cl_${taskId}_2`, text: `Acquire and stage materials: ${task.materials || 'Lumber, fasteners & protective coatings'}`, done: this.completedTaskIDs.has(taskId) },
            { id: `cl_${taskId}_3`, text: `Perform primary execution: ${task.desc || task.name}`, done: this.completedTaskIDs.has(taskId) },
            { id: `cl_${taskId}_4`, text: `Clean up debris, document in field journal, and perform final sign-off`, done: this.completedTaskIDs.has(taskId) }
        ];
    }

    saveTaskChecklist(taskId, checklist) {
        if (!this.taskChecklists) this.taskChecklists = {};
        this.taskChecklists[taskId] = Array.isArray(checklist) ? checklist : [];
        this.saveGame();
        this.notify();
    }

    toggleChecklistItem(taskId, itemId) {
        const list = this.getTaskChecklist(taskId);
        const item = list.find(x => x.id === itemId);
        if (item) {
            item.done = !item.done;
            this.saveTaskChecklist(taskId, list);
        }
    }

    addChecklistItem(taskId, text) {
        if (!text || !text.trim()) return;
        const list = this.getTaskChecklist(taskId);
        list.push({
            id: 'cl_' + taskId + '_' + Date.now(),
            text: text.trim(),
            done: false
        });
        this.saveTaskChecklist(taskId, list);
    }

    deleteChecklistItem(taskId, itemId) {
        let list = this.getTaskChecklist(taskId);
        list = list.filter(x => x.id !== itemId);
        this.saveTaskChecklist(taskId, list);
    }

    getTaskMaterials(taskId) {
        if (this.taskMaterials && this.taskMaterials[taskId] && Array.isArray(this.taskMaterials[taskId])) {
            return this.taskMaterials[taskId];
        }
        if (GAME_DATA.DEFAULT_PROJECT_SPEC_MAP && GAME_DATA.DEFAULT_PROJECT_SPEC_MAP[taskId]?.materials) {
            return JSON.parse(JSON.stringify(GAME_DATA.DEFAULT_PROJECT_SPEC_MAP[taskId].materials));
        }
        const task = this.getTask(taskId);
        if (!task) return [];
        return [
            { id: `mat_${taskId}_1`, name: task.materials || `${task.name} Core Materials`, qty: "1 lot", cost: task.matCost || 250, status: this.completedTaskIDs.has(taskId) ? "Installed" : "Needed" }
        ];
    }

    saveTaskMaterials(taskId, materialsList) {
        if (!this.taskMaterials) this.taskMaterials = {};
        this.taskMaterials[taskId] = Array.isArray(materialsList) ? materialsList : [];
        this.saveGame();
        this.notify();
    }

    addProjectMaterial(taskId, item) {
        if (!item || !item.name) return;
        const list = this.getTaskMaterials(taskId);
        list.push({
            id: 'mat_' + taskId + '_' + Date.now(),
            name: item.name,
            qty: item.qty || '1',
            cost: Number(item.cost) || 0,
            status: item.status || 'Needed'
        });
        this.saveTaskMaterials(taskId, list);
    }

    deleteProjectMaterial(taskId, itemIdOrIdx) {
        let list = this.getTaskMaterials(taskId);
        if (typeof itemIdOrIdx === 'number') {
            list.splice(itemIdOrIdx, 1);
        } else {
            list = list.filter(x => x.id !== itemIdOrIdx);
        }
        this.saveTaskMaterials(taskId, list);
    }

    getTaskTools(taskId) {
        if (this.taskTools && this.taskTools[taskId] && Array.isArray(this.taskTools[taskId])) {
            return this.taskTools[taskId];
        }
        if (GAME_DATA.DEFAULT_PROJECT_SPEC_MAP && GAME_DATA.DEFAULT_PROJECT_SPEC_MAP[taskId]?.tools) {
            return JSON.parse(JSON.stringify(GAME_DATA.DEFAULT_PROJECT_SPEC_MAP[taskId].tools));
        }
        const task = this.getTask(taskId);
        if (!task) return [];
        const tools = [];
        if (task.toolRequired && GAME_DATA.TOOLS) {
            const t = GAME_DATA.TOOLS.find(x => x.id === task.toolRequired);
            if (t) {
                tools.push({ id: `tl_${t.id}`, name: t.name, status: this.ownedToolIDs.has(t.id) ? "Have" : "Need to Buy" });
            }
        }
        if (tools.length === 0) {
            tools.push({ id: `tl_${taskId}_std`, name: "Standard Carpentry & Safety Kit", status: "Have" });
        }
        return tools;
    }

    saveTaskTools(taskId, toolsList) {
        if (!this.taskTools) this.taskTools = {};
        this.taskTools[taskId] = Array.isArray(toolsList) ? toolsList : [];
        this.saveGame();
        this.notify();
    }

    addProjectTool(taskId, item) {
        if (!item || !item.name) return;
        const list = this.getTaskTools(taskId);
        list.push({
            id: 'tl_' + taskId + '_' + Date.now(),
            name: item.name,
            status: item.status || 'Have'
        });
        this.saveTaskTools(taskId, list);
    }

    deleteProjectTool(taskId, itemIdOrIdx) {
        let list = this.getTaskTools(taskId);
        if (typeof itemIdOrIdx === 'number') {
            list.splice(itemIdOrIdx, 1);
        } else {
            list = list.filter(x => x.id !== itemIdOrIdx);
        }
        this.saveTaskTools(taskId, list);
    }

    getTaskDonation(taskId) {
        const custom = this.taskDonations?.[taskId];
        const spec = GAME_DATA.DEFAULT_PROJECT_SPEC_MAP?.[taskId];
        const task = this.getTask(taskId);
        const goal = custom?.goal !== undefined ? custom.goal : (spec?.fundingGoal || (task ? Math.round((task.matCost || 300) * 1.5) : 500));
        const raised = custom?.raised !== undefined ? custom.raised : (spec?.fundingRaised || 0);
        return {
            goal: Number(goal),
            raised: Number(raised),
            note: custom?.note || ""
        };
    }

    saveTaskDonation(taskId, goal, raised, note = "") {
        if (!this.taskDonations) this.taskDonations = {};
        this.taskDonations[taskId] = {
            goal: Number(goal) || 0,
            raised: Number(raised) || 0,
            note: note || ""
        };
        this.saveGame();
        this.notify();
    }

    // DONATION SETTINGS & PUBLIC PORTAL
    getDonationSettings() {
        return {
            ...(GAME_DATA.DONATION_DEFAULTS || {}),
            ...(this.donationSettings || {})
        };
    }

    saveDonationSettings(settings) {
        this.donationSettings = { ...(this.donationSettings || {}), ...settings };
        this.saveGame();
        this.notify();
    }

    getProjectDonationStats() {
        const allTasks = this.getAllTasksList();
        let totalGoal = 0;
        let totalRaised = 0;
        let totalProjects = allTasks.length;
        let completedProjects = 0;

        allTasks.forEach(t => {
            const d = this.getTaskDonation(t.id);
            totalGoal += d.goal;
            totalRaised += d.raised;
            if (this.completedTaskIDs.has(t.id)) completedProjects++;
        });

        const settings = this.getDonationSettings();
        const campaignGoal = settings.totalGoal || totalGoal || 75000;
        const pctRaised = campaignGoal > 0 ? Math.min(100, Math.round((totalRaised / campaignGoal) * 100)) : 0;
        const pctRenovated = totalProjects > 0 ? Math.round((completedProjects / totalProjects) * 100) : 0;

        return {
            totalGoal: campaignGoal,
            totalRaised,
            pctRaised,
            totalProjects,
            completedProjects,
            pctRenovated
        };
    }

    getAllTasksList() {
        const base = GAME_DATA.TASKS || [];
        const salvage = (GAME_DATA.SALVAGE_TASKS || []).filter(t => this.unlockedSalvageTaskIDs.has(t.id));
        const custom = (this.customTasks || []).filter(t => !t.isDeleted);
        const map = new Map();
        base.forEach(t => map.set(t.id, { ...t }));
        salvage.forEach(t => map.set(t.id, { ...t }));
        custom.forEach(t => {
            if (map.has(t.id)) {
                map.set(t.id, { ...map.get(t.id), ...t });
            } else {
                map.set(t.id, { ...t });
            }
        });
        (this.customTasks || []).forEach(t => {
            if (t.isDeleted) map.delete(t.id);
        });
        return Array.from(map.values());
    }

    getPrioritySortedTasks(filterRoom = null, filterPriority = null) {
        let tasks = this.getAllTasksList();
        if (filterRoom) {
            tasks = tasks.filter(t => t.room === filterRoom);
        }

        const annotated = tasks.map(t => {
            const priority = this.getTaskPriority(t.id);
            const checklist = this.getTaskChecklist(t.id);
            const materials = this.getTaskMaterials(t.id);
            const tools = this.getTaskTools(t.id);
            const photos = this.getPhotosForTask(t.id);
            const videos = this.getVideosForTask(t.id);
            const progressDocs = this.getProgressForTask(t.id);
            const donation = this.getTaskDonation(t.id);
            const isCompleted = this.completedTaskIDs.has(t.id);
            const doneChecklist = checklist.filter(c => c.done).length;

            return {
                ...t,
                priority,
                checklist,
                totalChecklist: checklist.length,
                doneChecklist,
                materials,
                tools,
                photosCount: photos.length,
                videosCount: videos.length,
                progressCount: progressDocs.length,
                donation,
                isCompleted,
                roomInfo: this.getRoom(t.room)
            };
        });

        if (filterPriority !== null && filterPriority !== undefined && filterPriority !== 'all') {
            const pNum = Number(filterPriority);
            return annotated.filter(t => t.priority === pNum);
        }

        // Sort: Priority 1 first, Priority 5 last. Within same priority, incomplete first.
        annotated.sort((a, b) => {
            if (a.priority !== b.priority) {
                return a.priority - b.priority;
            }
            if (a.isCompleted !== b.isCompleted) {
                return a.isCompleted ? 1 : -1;
            }
            return (a.name || '').localeCompare(b.name || '');
        });

        return annotated;
    }

    getTaskFullProjectData(taskId) {
        const task = this.getTask(taskId);
        if (!task) return null;
        const priority = this.getTaskPriority(taskId);
        const checklist = this.getTaskChecklist(taskId);
        const materials = this.getTaskMaterials(taskId);
        const tools = this.getTaskTools(taskId);
        const photos = this.getPhotosForTask(taskId);
        const videos = this.getVideosForTask(taskId);
        const progressDocs = this.getProgressForTask(taskId);
        const donation = this.getTaskDonation(taskId);
        const isCompleted = this.completedTaskIDs.has(taskId);

        return {
            task,
            room: this.getRoom(task.room),
            priority,
            checklist,
            materials,
            tools,
            photos,
            videos,
            progressDocs,
            donation,
            isCompleted
        };
    }

    // POST ACTIVITY LOG UPDATE (WITH USER TIME STAMP & INSTANT CLOUD SYNC)
    postActivityUpdate(text, tags = []) {
        if (!text || !text.trim()) return null;
        const cleanText = text.trim();
        this.updateDaysFromCalendar();
        const entryDay = this.calculateDayForDate ? this.calculateDayForDate(Date.now()) : (this.currentDay || 1);
        this.currentDay = Math.max(this.currentDay || 1, entryDay);
        const now = new Date();
        const centralFull = this.formatCentralTimestamp(now, true);
        const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const dateStr = now.toLocaleDateString([], { month: 'short', day: 'numeric' });
        const entry = {
            id: 'log_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
            day: this.currentDay,
            time: centralFull,
            dateStr: dateStr,
            timeStr: timeStr,
            timestamp: Date.now(),
            type: 'user_note',
            isAccomplishment: false,
            message: cleanText,
            tags: Array.isArray(tags) ? tags : []
        };
        if (!this.activityLog) this.activityLog = [];
        this.activityLog.unshift(entry);
        if (this.activityLog.length > 500) this.activityLog.pop();
        this.saveGame();
        this.notify();
        // Immediately sync to cloud so manual user log posts are guaranteed persisted to Cloudflare KV & Edge
        this.publishToCloud().catch(err => console.warn('Instant log cloud sync notice:', err));
        return entry;
    }

    clearAllActivityLogs() {
        if (!this.deletedLogIds) this.deletedLogIds = [];
        (this.activityLog || []).forEach(l => {
            if (l && l.id) this.deletedLogIds.push(l.id);
        });
        this.activityLog = [];
        this.saveGame();
        this.notify();
        if (this.publishToCloud) this.publishToCloud().catch(() => {});
        return true;
    }

    deleteActivityLogEntry(entryId) {
        if (!entryId) return false;
        if (!this.deletedLogIds) this.deletedLogIds = [];
        this.deletedLogIds.push(entryId);
        if (this.activityLog) {
            this.activityLog = this.activityLog.filter(l => l && l.id !== entryId);
        }
        this.saveGame();
        this.notify();
        this.publishToCloud().catch(() => {});
        return true;
    }

    // SECTION & PROJECT PHOTOS
    getAllPhotos() {
        const basePhotos = (GAME_DATA.PHOTO_JOURNAL || []);
        const customPhotos = (this.customPhotos || []).filter(p => !p.isDeleted);
        const photoMap = new Map();
        basePhotos.forEach(p => photoMap.set(p.id, { ...p }));
        customPhotos.forEach(p => photoMap.set(p.id, { ...p }));
        (this.customPhotos || []).forEach(p => {
            if (p.isDeleted && photoMap.has(p.id)) photoMap.delete(p.id);
        });
        return Array.from(photoMap.values());
    }

    getPhotosForRoom(roomKey) {
        if (!roomKey || roomKey === 'all') return this.getAllPhotos();
        return this.getAllPhotos().filter(p => p.room === roomKey);
    }

    getPhotosForTask(taskId) {
        if (!taskId) return [];
        return this.getAllPhotos().filter(p => p.taskId === taskId || (p.task && p.task === taskId));
    }

    savePhoto(photoData) {
        if (!photoData) return;
        if (!this.customPhotos) this.customPhotos = [];
        let id = photoData.id;
        if (!id) {
            id = 'pj_custom_' + Date.now();
            photoData.id = id;
            photoData.isCustom = true;
        }
        const idx = this.customPhotos.findIndex(p => p.id === id);
        if (idx >= 0) {
            this.customPhotos[idx] = { ...this.customPhotos[idx], ...photoData, isDeleted: false };
        } else {
            this.customPhotos.push({ ...photoData, isDeleted: false });
        }
        this.saveGame();
        this.notify();
        return id;
    }

    deletePhoto(photoId) {
        if (!this.customPhotos) this.customPhotos = [];
        const photo = (this.customPhotos || []).find(p => p.id === photoId) || (GAME_DATA.PHOTO_JOURNAL || []).find(p => p.id === photoId);
        this.pushUndo({
            type: 'deletePhoto',
            photoId: photoId,
            item: photo ? { ...photo } : null
        });
        const idx = this.customPhotos.findIndex(p => p.id === photoId);
        if (idx >= 0) {
            this.customPhotos[idx].isDeleted = true;
        } else {
            this.customPhotos.push({ id: photoId, isDeleted: true });
        }
        this.saveGame();
        this.notify();
    }

    // SECTION & PROJECT VIDEOS
    getAllVideos() {
        const baseVideos = (GAME_DATA.VIDEO_JOURNAL || []);
        const customVideos = (this.customVideos || []).filter(v => !v.isDeleted);
        const videoMap = new Map();
        baseVideos.forEach(v => videoMap.set(v.id, { ...v }));
        customVideos.forEach(v => videoMap.set(v.id, { ...v }));
        (this.customVideos || []).forEach(v => {
            if (v.isDeleted && videoMap.has(v.id)) videoMap.delete(v.id);
        });
        return Array.from(videoMap.values());
    }

    getVideosForRoom(roomKey) {
        if (!roomKey || roomKey === 'all') return this.getAllVideos();
        return this.getAllVideos().filter(v => v.room === roomKey);
    }

    getVideosForTask(taskId) {
        if (!taskId) return [];
        return this.getAllVideos().filter(v => v.taskId === taskId || (v.task && v.task === taskId));
    }

    saveVideo(videoData) {
        if (!videoData) return;
        if (!this.customVideos) this.customVideos = [];
        let id = videoData.id;
        if (!id) {
            id = 'vj_custom_' + Date.now();
            videoData.id = id;
            videoData.isCustom = true;
        }
        const idx = this.customVideos.findIndex(v => v.id === id);
        if (idx >= 0) {
            this.customVideos[idx] = { ...this.customVideos[idx], ...videoData, isDeleted: false };
        } else {
            this.customVideos.push({ ...videoData, isDeleted: false });
        }
        this.saveGame();
        this.notify();
        return id;
    }

    deleteVideo(videoId) {
        if (!this.customVideos) this.customVideos = [];
        const video = (this.customVideos || []).find(v => v.id === videoId) || (GAME_DATA.VIDEO_JOURNAL || []).find(v => v.id === videoId);
        this.pushUndo({
            type: 'deleteVideo',
            videoId: videoId,
            item: video ? { ...video } : null
        });
        const idx = this.customVideos.findIndex(v => v.id === videoId);
        if (idx >= 0) {
            this.customVideos[idx].isDeleted = true;
        } else {
            this.customVideos.push({ id: videoId, isDeleted: true });
        }
        this.saveGame();
        this.notify();
    }

    // SECTION & PROJECT PROGRESS & LITERATURE
    getAllProgress() {
        const baseProgress = (GAME_DATA.PROGRESS_JOURNAL || []);
        const customProgress = (this.customProgress || []).filter(p => !p.isDeleted);
        const progMap = new Map();
        baseProgress.forEach(p => progMap.set(p.id, { ...p }));
        customProgress.forEach(p => progMap.set(p.id, { ...p }));
        (this.customProgress || []).forEach(p => {
            if (p.isDeleted && progMap.has(p.id)) progMap.delete(p.id);
        });
        return Array.from(progMap.values());
    }

    getProgressForRoom(roomKey) {
        if (!roomKey || roomKey === 'all') return this.getAllProgress();
        return this.getAllProgress().filter(p => p.room === roomKey);
    }

    getProgressForTask(taskId) {
        if (!taskId) return [];
        return this.getAllProgress().filter(p => p.taskId === taskId || (p.task && p.task === taskId));
    }

    saveProgress(progData) {
        if (!progData) return;
        if (!this.customProgress) this.customProgress = [];
        let id = progData.id;
        if (!id) {
            id = 'prog_custom_' + Date.now();
            progData.id = id;
            progData.isCustom = true;
        }
        const idx = this.customProgress.findIndex(p => p.id === id);
        if (idx >= 0) {
            this.customProgress[idx] = { ...this.customProgress[idx], ...progData, isDeleted: false };
        } else {
            this.customProgress.push({ ...progData, isDeleted: false });
        }
        this.saveGame();
        this.notify();
        return id;
    }

    deleteProgress(progId) {
        if (!this.customProgress) this.customProgress = [];
        const doc = (this.customProgress || []).find(p => p.id === progId) || (GAME_DATA.PROGRESS_JOURNAL || []).find(p => p.id === progId);
        this.pushUndo({
            type: 'deleteProgress',
            docId: progId,
            item: doc ? { ...doc } : null
        });
        const idx = this.customProgress.findIndex(p => p.id === progId);
        if (idx >= 0) {
            this.customProgress[idx].isDeleted = true;
        } else {
            this.customProgress.push({ id: progId, isDeleted: true });
        }
        this.saveGame();
        this.notify();
    }

    // PROPERTY DETAILS
    savePropertyInfo(info) {
        if (!info) return;
        this.propertyInfo = { ...(this.propertyInfo || {}), ...info };
        if (this.currentHouse) {
            this.currentHouse.name = this.propertyInfo.name || this.currentHouse.name;
            this.currentHouse.subtext = this.propertyInfo.subtitle || this.currentHouse.subtext;
        }
        if (typeof info.startingCash === 'number') {
            this.currentMoney = info.startingCash;
        }
        this.recalculatePropertyValue();
        this.saveGame();
        this.notify();
    }

    // EXPENSE LEDGER
    logExpense(expense) {
        if (!expense) return;
        if (!this.realLifeExpenses) this.realLifeExpenses = [];
        const record = {
            id: 'exp_' + Date.now(),
            date: expense.date || new Date().toISOString().slice(0, 10),
            vendor: expense.vendor || 'Jobsite Store',
            room: expense.room || 'General',
            amount: Number(expense.amount) || 0,
            category: expense.category || 'Materials',
            notes: expense.notes || '',
            timestamp: Date.now()
        };
        this.realLifeExpenses.unshift(record);
        this.totalSpentOnRehab += record.amount;
        this.currentMoney -= record.amount;
        this.saveGame();
        this.notify();
        return record;
    }

    deleteExpense(expId) {
        if (!this.realLifeExpenses) return;
        const idx = this.realLifeExpenses.findIndex(e => e.id === expId);
        if (idx >= 0) {
            const exp = this.realLifeExpenses[idx];
            this.totalSpentOnRehab -= exp.amount;
            this.currentMoney += exp.amount;
            if (!this.deletedExpenseIds) this.deletedExpenseIds = [];
            if (!this.deletedExpenseIds.includes(expId)) this.deletedExpenseIds.push(expId);
            this.realLifeExpenses.splice(idx, 1);
            this.saveGame();
            this.notify();
        }
    }

    // RAPID PROJECT INTAKE & DISPATCH
    dispatchRapidIntake(data) {
        if (!data) return { success: false, error: "No intake data provided" };
        const results = {
            roomUpdated: null,
            taskUpdated: null,
            checklistCount: 0,
            materialsCount: 0,
            toolsCount: 0,
            photoAdded: null,
            videoAdded: null,
            progressAdded: null,
            activityPosted: null,
            expenseLogged: null,
            donationUpdated: null,
            summary: []
        };

        // 1. MANOR BLUEPRINT / ROOM PLACEMENT
        let roomKey = data.roomKey || data.room;
        if (data.isNewRoom && data.newRoomName) {
            roomKey = data.newRoomId || ('room_' + data.newRoomName.toLowerCase().replace(/[^a-z0-9]/g, '_').replace(/_+/g, '_').slice(0, 24));
            this.saveRoom(roomKey, {
                name: data.newRoomName,
                icon: data.newRoomIcon || "🔨",
                area: data.newRoomArea || "Main Floor",
                level: data.newRoomLevel || "level_1"
            });
            results.roomUpdated = { key: roomKey, name: data.newRoomName, isNew: true };
            results.summary.push(`📍 Blueprint: Created section "${data.newRoomName}"`);
        } else if (roomKey && this.getRoom(roomKey)) {
            results.roomUpdated = { key: roomKey, name: this.getRoom(roomKey).name, isNew: false };
        }

        // 2. RENOVATIONS / TASK REGISTRY
        let taskId = data.taskId;
        const taskName = data.taskName || (taskId ? this.getTask(taskId)?.name : null);
        if (data.isNewTask && taskName) {
            taskId = data.newTaskId || ('task_' + (roomKey || 'gen') + '_' + Date.now().toString(36));
            const newTaskData = {
                id: taskId,
                room: roomKey || 'Parlor',
                name: taskName,
                desc: data.taskDesc || `Renovation project: ${taskName}`,
                stage: Number(data.taskStage) || 1,
                diyCost: Number(data.taskDiyCost) || 0,
                subCost: Number(data.taskSubCost) || (Number(data.taskDiyCost) ? Math.round(Number(data.taskDiyCost) * 2.2) : 500),
                valueBoost: Number(data.taskValueBoost) || (Number(data.taskDiyCost) ? Math.round(Number(data.taskDiyCost) * 2.5) : 600),
                timeHours: Number(data.taskHours) || 8,
                isCompleted: !!data.isTaskCompleted
            };
            this.saveTask(newTaskData);
            results.taskUpdated = { id: taskId, name: taskName, isNew: true };
            results.summary.push(`🔨 Renovations: Registered project "${taskName}"`);
        } else if (taskId) {
            const existingTask = this.getTask(taskId);
            if (existingTask) {
                if (data.taskDesc || data.taskDiyCost !== undefined || data.isTaskCompleted !== undefined) {
                    this.saveTask({
                        ...existingTask,
                        desc: data.taskDesc || existingTask.desc,
                        diyCost: data.taskDiyCost !== undefined ? Number(data.taskDiyCost) : existingTask.diyCost,
                        isCompleted: data.isTaskCompleted !== undefined ? !!data.isTaskCompleted : this.completedTaskIDs.has(taskId)
                    });
                }
                results.taskUpdated = { id: taskId, name: existingTask.name, isNew: false };
                results.summary.push(`🔨 Renovations: Updated project "${existingTask.name}"`);
            }
        }

        // 3. PRIORITY & BUILDING THE DREAM PORTAL
        if (taskId && data.priority) {
            const p = Math.max(1, Math.min(5, Number(data.priority) || 3));
            this.setTaskPriority(taskId, p);
            results.summary.push(`🌟 Dream Portal: Assigned Priority ${p}`);
        }
        if (taskId && (data.donationGoal || data.donationRaised)) {
            this.saveTaskDonation(
                taskId,
                Number(data.donationGoal) || 1000,
                Number(data.donationRaised) || 0,
                data.donationNote || ""
            );
            results.donationUpdated = true;
            results.summary.push(`💝 Dream Portal: Set milestone goal $${Number(data.donationGoal || 1000).toLocaleString()}`);
        }

        // 4. TO-DO CHECKLIST (Scope of Work)
        if (taskId && data.checklistItems) {
            let items = [];
            if (Array.isArray(data.checklistItems)) {
                items = data.checklistItems;
            } else if (typeof data.checklistItems === 'string') {
                items = data.checklistItems
                    .split('\n')
                    .map(line => line.replace(/^[-*•\d\.\s]+/, '').trim())
                    .filter(Boolean)
                    .map((text, idx) => ({
                        id: `chk_${taskId}_${Date.now()}_${idx}`,
                        text,
                        done: false
                    }));
            }
            if (items.length > 0) {
                const existing = data.appendChecklist ? this.getTaskChecklist(taskId) : [];
                this.saveTaskChecklist(taskId, [...existing, ...items]);
                results.checklistCount = items.length;
                results.summary.push(`☑️ Checklist: Added ${items.length} to-do steps`);
            }
        }

        // 5. MATERIALS INVENTORY
        if (taskId && data.materials) {
            let matList = [];
            if (Array.isArray(data.materials)) {
                matList = data.materials;
            } else if (typeof data.materials === 'string') {
                matList = data.materials
                    .split('\n')
                    .map(line => line.trim())
                    .filter(Boolean)
                    .map((line, idx) => {
                        const parts = line.split('|').map(p => p.trim());
                        return {
                            id: `mat_${taskId}_${Date.now()}_${idx}`,
                            name: parts[0] || line,
                            qty: parts[1] || "1",
                            cost: parts[2] ? Number(parts[2].replace(/[^0-9.]/g, '')) || 0 : 0,
                            status: parts[3] || "Needed"
                        };
                    });
            }
            if (matList.length > 0) {
                const existing = data.appendMaterials ? this.getTaskMaterials(taskId) : [];
                this.saveTaskMaterials(taskId, [...existing, ...matList]);
                results.materialsCount = matList.length;
                results.summary.push(`📦 Materials: Cataloged ${matList.length} items`);
            }
        }

        // 6. TOOLS & EQUIPMENT
        if (taskId && data.tools) {
            let toolList = [];
            if (Array.isArray(data.tools)) {
                toolList = data.tools;
            } else if (typeof data.tools === 'string') {
                toolList = data.tools
                    .split(/[,\n]/)
                    .map(t => t.trim())
                    .filter(Boolean)
                    .map((name, idx) => ({
                        id: `tl_${taskId}_${Date.now()}_${idx}`,
                        name,
                        status: "Have"
                    }));
            }
            if (toolList.length > 0) {
                const existing = data.appendTools ? this.getTaskTools(taskId) : [];
                this.saveTaskTools(taskId, [...existing, ...toolList]);
                results.toolsCount = toolList.length;
                results.summary.push(`🔧 Tools: Cataloged ${toolList.length} tools`);
            }
        }

        // 7. FIELD PHOTO JOURNAL
        if (Array.isArray(data.photos) && data.photos.length > 0) {
            let count = 0;
            data.photos.forEach((p, idx) => {
                const pTitle = data.photoTitle ? (data.photos.length > 1 ? `${data.photoTitle} (${idx + 1})` : data.photoTitle) : (p.name ? p.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, ' ') : `Site Photo ${idx + 1}`);
                const photoId = this.savePhoto({
                    id: `pj_rapid_${Date.now()}_${idx}_${Math.random().toString(36).substr(2, 4)}`,
                    title: pTitle,
                    caption: data.photoCaption || p.name || "",
                    room: roomKey || "Parlor",
                    task: taskId || "",
                    phase: data.photoPhase || "during",
                    photoData: p.dataUrl || p.url || "",
                    url: p.dataUrl || p.url || "",
                    date: data.photoDate || new Date().toISOString().slice(0, 10),
                    isCustom: true
                });
                if (!results.photoAdded) results.photoAdded = photoId;
                count++;
            });
            results.summary.push(`📷 Photo Journal: Logged ${count} site photos`);
        } else if (data.photoTitle || data.photoUrl) {
            const photoId = this.savePhoto({
                title: data.photoTitle || `${taskName || 'Job-Site'} Evidence`,
                caption: data.photoCaption || data.photoTitle || "",
                room: roomKey || "Parlor",
                task: taskId || "",
                phase: data.photoPhase || "during",
                photoData: data.photoUrl || "",
                url: data.photoUrl || "",
                date: data.photoDate || new Date().toISOString().slice(0, 10),
                isCustom: true
            });
            results.photoAdded = photoId;
            results.summary.push(`📷 Photo Journal: Logged photo "${data.photoTitle || 'Site Photo'}"`);
        }

        // 8. VIDEO JOURNAL
        if (data.videoTitle || data.videoUrl) {
            const videoId = this.saveVideo({
                title: data.videoTitle || `${taskName || 'Project'} Walkthrough`,
                desc: data.videoDesc || "",
                url: data.videoUrl || "",
                room: roomKey || "Parlor",
                task: taskId || "",
                epNumber: data.videoEpNumber || "Ep",
                date: data.videoDate || new Date().toISOString().slice(0, 10)
            });
            results.videoAdded = videoId;
            results.summary.push(`🎥 Video Journal: Logged video episode`);
        }

        // 9. PROGRESS & ENGINEERING LITERATURE
        if (data.literatureText || data.progressTitle) {
            const progId = this.saveProgress({
                title: data.progressTitle || `${taskName || 'Project'} Technical Log`,
                literature: data.literatureText || "",
                room: roomKey || "Parlor",
                task: taskId || "",
                reportNum: data.progressReportNum || `LOG-${Date.now().toString().slice(-4)}`,
                date: data.progressDate || new Date().toISOString().slice(0, 10),
                inspectionPassed: !!data.inspectionPassed
            });
            results.progressAdded = progId;
            results.summary.push(`📖 Literature: Archived engineering specifications`);
        }

        // 10. REAL-TIME SITE ACTIVITY FEED
        if (data.postToFeed && data.feedMessage) {
            this.postActivityUpdate(data.feedMessage);
            results.activityPosted = true;
            results.summary.push(`📣 Activity Feed: Posted note with live timestamp`);
        } else if (data.postToFeed && taskName) {
            const autoMsg = `⚡ Project Intake: ${taskName} (${results.roomUpdated ? results.roomUpdated.name : roomKey}) - Logged to project roadmap.`;
            this.postActivityUpdate(autoMsg);
            results.activityPosted = true;
            results.summary.push(`📣 Activity Feed: Posted real-time milestone update`);
        }

        // 11. FINANCIAL EXPENSE LEDGER
        if (data.logAsExpense && (Number(data.expenseAmount) || Number(data.taskDiyCost))) {
            const cost = Number(data.expenseAmount) || Number(data.taskDiyCost);
            this.logExpense({
                notes: data.expenseDesc || `Materials/Labor for ${taskName || 'Project'}`,
                amount: cost,
                category: data.expenseCategory || "Materials",
                room: roomKey || "General",
                vendor: data.expenseVendor || "Jobsite Supply",
                date: data.expenseDate || new Date().toISOString().slice(0, 10)
            });
            results.expenseLogged = cost;
            results.summary.push(`💵 Expense Ledger: Recorded $${cost.toLocaleString()} expenditure`);
        }

        this.saveGame();
        this.notify();
        return { success: true, results };
    }

    addPhoto(photoData) { return this.savePhoto(photoData); }
    addVideo(videoData) { return this.saveVideo(videoData); }
    addProgressDoc(docData) { return this.saveProgress(docData); }

    // ==========================================
    // COMMUNITY CROWDSOURCING & SUPPORTER KNOWLEDGE
    // ==========================================
    getCommunityChallenges() {
        const base = (GAME_DATA.COMMUNITY_CHALLENGES || []);
        const custom = (this.communityChallenges || []);
        const map = new Map();
        base.forEach(c => map.set(c.id, { ...c }));
        custom.forEach(c => map.set(c.id, { ...c }));
        return Array.from(map.values());
    }

    getCommunityTips(filterCategory = 'all', searchQuery = '', sortBy = 'helpful') {
        const base = (GAME_DATA.COMMUNITY_TIPS_DEFAULTS || []);
        const custom = (this.communityTips || []);
        const map = new Map();
        base.forEach(t => map.set(t.id, { ...t, isCustom: false }));
        custom.forEach(t => map.set(t.id, { ...t, isCustom: true }));
        
        let list = Array.from(map.values()).filter(t => !t.isDeleted);

        // Filter by category
        if (filterCategory && filterCategory !== 'all') {
            list = list.filter(t => t.category === filterCategory);
        }

        // Search query filter
        if (searchQuery && searchQuery.trim()) {
            const q = searchQuery.trim().toLowerCase();
            list = list.filter(t => 
                (t.title && t.title.toLowerCase().includes(q)) ||
                (t.content && t.content.toLowerCase().includes(q)) ||
                (t.author && t.author.toLowerCase().includes(q)) ||
                (t.role && t.role.toLowerCase().includes(q)) ||
                (t.location && t.location.toLowerCase().includes(q)) ||
                (t.roomName && t.roomName.toLowerCase().includes(q))
            );
        }

        // Sorting
        if (sortBy === 'newest') {
            list.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
        } else if (sortBy === 'challenges') {
            list.sort((a, b) => (b.challengeId ? 1 : 0) - (a.challengeId ? 1 : 0));
        } else {
            // Default: 'helpful' (upvotes descending)
            list.sort((a, b) => (b.upvotes || 0) - (a.upvotes || 0));
        }

        return list;
    }

    getCommunityTip(tipId) {
        if (!tipId) return null;
        return this.getCommunityTips('all').find(t => t.id === tipId) || null;
    }

    addCommunityTip(tipData) {
        if (!tipData || !tipData.content) {
            return { success: false, error: "Tip content is required." };
        }
        if (!this.communityTips) this.communityTips = [];

        const id = tipData.id || ('tip_' + Date.now());
        const categoryLabels = {
            advice: "💡 Constructive Advice",
            salvage: "🪵 Salvage Lead",
            workshop: "🧰 Workshop Trick",
            preservation: "🏛️ Historic Preservation",
            systems: "⚡ Mechanical Systems"
        };

        const now = new Date();
        const dateStr = now.toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' });
        const roomInfo = tipData.room ? this.getRoom(tipData.room) : null;

        const newTip = {
            id,
            category: tipData.category || "advice",
            categoryLabel: categoryLabels[tipData.category] || "💡 Advice",
            challengeId: tipData.challengeId || null,
            author: tipData.author?.trim() || "Passionate Supporter",
            role: tipData.role?.trim() || "Community Restorer",
            title: tipData.title?.trim() || "Restoration Tip",
            room: tipData.room || "General",
            roomName: roomInfo ? (roomInfo.icon + ' ' + roomInfo.name) : (tipData.room || "General Manor"),
            content: tipData.content.trim(),
            location: tipData.location?.trim() || "",
            link: tipData.link?.trim() || "",
            upvotes: Number(tipData.upvotes) || 1,
            timestamp: Date.now(),
            date: dateStr,
            isCustom: true
        };

        this.communityTips.unshift(newTip);
        this.saveGame();
        this.notify();
        return { success: true, tip: newTip };
    }

    upvoteCommunityTip(tipId) {
        if (!tipId) return { success: false };
        if (!this.communityUpvotedTipIds) this.communityUpvotedTipIds = new Set();
        
        const alreadyUpvoted = this.communityUpvotedTipIds.has(tipId);
        const delta = alreadyUpvoted ? -1 : 1;

        if (alreadyUpvoted) {
            this.communityUpvotedTipIds.delete(tipId);
        } else {
            this.communityUpvotedTipIds.add(tipId);
        }

        // Find in custom tips
        let tip = (this.communityTips || []).find(t => t.id === tipId);
        if (tip) {
            tip.upvotes = Math.max(0, (tip.upvotes || 0) + delta);
        } else {
            // It's a base tip, clone it into custom with adjusted upvote
            const baseTip = (GAME_DATA.COMMUNITY_TIPS_DEFAULTS || []).find(t => t.id === tipId);
            if (baseTip) {
                const updated = { ...baseTip, upvotes: Math.max(0, (baseTip.upvotes || 0) + delta), isCustom: true };
                this.communityTips.push(updated);
            }
        }

        this.saveGame();
        this.notify();
        return { success: true, upvoted: !alreadyUpvoted };
    }

    isTipUpvoted(tipId) {
        return !!(this.communityUpvotedTipIds && this.communityUpvotedTipIds.has(tipId));
    }

    getCommunityStats() {
        const tips = this.getCommunityTips('all');
        const challenges = this.getCommunityChallenges();
        let salvageLeads = 0;
        let workshopTricks = 0;
        let totalUpvotes = 0;

        tips.forEach(t => {
            if (t.category === 'salvage') salvageLeads++;
            if (t.category === 'workshop') workshopTricks++;
            totalUpvotes += (t.upvotes || 0);
        });

        return {
            totalTips: tips.length,
            salvageLeads,
            workshopTricks,
            activeChallenges: challenges.length,
            totalUpvotes
        };
    }

    // ==========================================
    // SUPPORTER ENGRAVED PLAQUES & BACKER HALL OF FAME
    // ==========================================
    getHallOfFameBackers(filterTier = 'all', searchQuery = '') {
        const base = (GAME_DATA.HALL_OF_FAME_DEFAULTS || []);
        const custom = (this.hallOfFameBackers || []);
        const map = new Map();
        base.forEach(b => map.set(b.id, { ...b, isCustom: false }));
        custom.forEach(b => map.set(b.id, { ...b, isCustom: true }));

        let list = Array.from(map.values()).filter(b => !b.isDeleted);

        // Filter by tier
        if (filterTier && filterTier !== 'all') {
            list = list.filter(b => b.tier === filterTier);
        }

        // Search query
        if (searchQuery && searchQuery.trim()) {
            const q = searchQuery.trim().toLowerCase();
            list = list.filter(b => 
                (b.donorName && b.donorName.toLowerCase().includes(q)) ||
                (b.inscription && b.inscription.toLowerCase().includes(q)) ||
                (b.location && b.location.toLowerCase().includes(q)) ||
                (b.itemLabel && b.itemLabel.toLowerCase().includes(q)) ||
                (b.tierName && b.tierName.toLowerCase().includes(q))
            );
        }

        return list;
    }

    getHallOfFameBacker(backerId) {
        if (!backerId) return null;
        return this.getHallOfFameBackers('all').find(b => b.id === backerId) || null;
    }

    addHallOfFameBacker(backerData) {
        if (!backerData || !backerData.donorName || !backerData.donorName.trim()) {
            return { success: false, error: "Backer name is required." };
        }
        if (!this.hallOfFameBackers) this.hallOfFameBackers = [];

        const id = backerData.id || ('hof_' + Date.now());
        const tierKey = backerData.tier || 'board';
        const tierInfo = GAME_DATA.ADOPTION_TIERS?.[tierKey] || {
            name: "Adopt a Board",
            amount: 75,
            icon: "🪵",
            badge: "🪵 Adopt-a-Board"
        };

        const now = new Date();
        const dateStr = now.toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' });

        const newBacker = {
            id,
            tier: tierKey,
            tierName: tierInfo.name,
            amount: Number(backerData.amount) || tierInfo.amount,
            donorName: backerData.donorName.trim(),
            location: backerData.location?.trim() || "1910 Whispering Pines Manor",
            itemLabel: backerData.itemLabel?.trim() || `${tierInfo.name} #${Math.floor(Math.random() * 800 + 100)}`,
            inscription: backerData.inscription?.trim() || "Dedicated to historic craftsmanship and preservation.",
            date: dateStr,
            timestamp: Date.now(),
            verified: true,
            avatar: tierInfo.icon || "🎖️",
            isCustom: true
        };

        this.hallOfFameBackers.unshift(newBacker);

        // Activity log notification
        this.log(`💝 Backer Hall of Fame: ${newBacker.donorName} adopted ${newBacker.itemLabel} ($${newBacker.amount})!`, 'activity');

        this.saveGame();
        this.notify();
        return { success: true, backer: newBacker };
    }

    getHallOfFameStats() {
        const allBackers = this.getHallOfFameBackers('all');
        let totalRaised = 0;
        let adoptedBoards = 0;
        let adoptedTiles = 0;
        let brassPlaques = 0;
        let suiteSponsors = 0;

        allBackers.forEach(b => {
            totalRaised += (Number(b.amount) || 0);
            if (b.tier === 'board') adoptedBoards++;
            else if (b.tier === 'tile') adoptedTiles++;
            else if (b.tier === 'brass') brassPlaques++;
            else if (b.tier === 'suite') suiteSponsors++;
        });

        return {
            totalBackers: allBackers.length,
            totalRaised,
            adoptedBoards,
            adoptedTiles,
            brassPlaques,
            suiteSponsors
        };
    }

    // EXPORT & IMPORT
    exportProjectJson() {
        const payload = {
            appName: "Jack's Fixer Uper Editable - Real Life House Tracker",
            exportedAt: new Date().toISOString(),
            saveVersion: this.saveVersion || 3,
            propertyInfo: this.propertyInfo,
            currentMoney: this.currentMoney,
            propertyValue: this.propertyValue,
            currentDay: this.currentDay,
            customRooms: this.customRooms,
            customTasks: this.customTasks,
            customPhotos: this.customPhotos,
            customVideos: this.customVideos,
            customProgress: this.customProgress,
            realLifeExpenses: this.realLifeExpenses,
            completedTaskIDs: Array.from(this.completedTaskIDs),
            uncompletedTaskIDs: Array.from(this.uncompletedTaskIDs || []),
            ownedToolIDs: Array.from(this.ownedToolIDs),
            deletedTaskIds: this.deletedTaskIds || [],
            deletedRoomKeys: this.deletedRoomKeys || [],
            deletedPostIds: this.deletedPostIds || [],
            deletedExpenseIds: this.deletedExpenseIds || [],
            materialsInventory: this.materialsInventory,
            donationSettings: this.donationSettings,
            taskChecklists: this.taskChecklists,
            taskMaterials: this.taskMaterials,
            taskTools: this.taskTools,
            taskPriorities: this.taskPriorities,
            taskDonations: this.taskDonations,
            communityTips: this.communityTips,
            communityChallenges: this.communityChallenges,
            hallOfFameBackers: this.hallOfFameBackers,
            customLevels: this.customLevels,
            taskOrder: this.taskOrder,
            customTabs: this.customTabs || [],
            deletedTabIds: this.deletedTabIds || [],
            tabOrder: this.tabOrder || [],
            tabOverrides: this.tabOverrides || {},
            customTools: this.customTools || [],
            deletedToolIds: Array.from(this.deletedToolIds || [])
        };
        return JSON.stringify(payload, null, 2);
    }

    importProjectJson(jsonStr) {
        try {
            const data = JSON.parse(jsonStr);
            if (data.propertyInfo) this.propertyInfo = data.propertyInfo;
            if (typeof data.currentMoney === 'number') this.currentMoney = data.currentMoney;
            if (typeof data.propertyValue === 'number') this.propertyValue = data.propertyValue;
            if (typeof data.currentDay === 'number') this.currentDay = data.currentDay;
            if (data.customRooms) this.customRooms = data.customRooms;
            if (Array.isArray(data.customTasks)) this.customTasks = data.customTasks;
            if (Array.isArray(data.customPhotos)) this.customPhotos = data.customPhotos;
            if (Array.isArray(data.customVideos)) this.customVideos = data.customVideos;
            if (Array.isArray(data.customProgress)) this.customProgress = data.customProgress;
            if (Array.isArray(data.realLifeExpenses)) this.realLifeExpenses = data.realLifeExpenses;
            if (Array.isArray(data.completedTaskIDs)) this.completedTaskIDs = new Set(data.completedTaskIDs);
            if (Array.isArray(data.ownedToolIDs)) this.ownedToolIDs = new Set(data.ownedToolIDs);
            if (data.materialsInventory) this.materialsInventory = data.materialsInventory;

            if (Array.isArray(data.customTools)) this.customTools = data.customTools;
            if (Array.isArray(data.deletedToolIds)) this.deletedToolIds = new Set(data.deletedToolIds);

            if (Array.isArray(data.uncompletedTaskIDs)) this.uncompletedTaskIDs = new Set(data.uncompletedTaskIDs); else if (!this.uncompletedTaskIDs) this.uncompletedTaskIDs = new Set();
            if (Array.isArray(data.deletedTaskIds)) this.deletedTaskIds = data.deletedTaskIds; else if (!this.deletedTaskIds) this.deletedTaskIds = [];
            if (Array.isArray(data.deletedRoomKeys)) this.deletedRoomKeys = data.deletedRoomKeys; else if (!this.deletedRoomKeys) this.deletedRoomKeys = [];
            if (Array.isArray(data.deletedPostIds)) this.deletedPostIds = data.deletedPostIds; else if (!this.deletedPostIds) this.deletedPostIds = [];
            if (Array.isArray(data.deletedExpenseIds)) this.deletedExpenseIds = data.deletedExpenseIds; else if (!this.deletedExpenseIds) this.deletedExpenseIds = [];
            if (Array.isArray(data.deletedLogIds)) this.deletedLogIds = data.deletedLogIds; else if (!this.deletedLogIds) this.deletedLogIds = [];
            if (data.propertyInfo && typeof data.propertyInfo === 'object') this.propertyInfo = data.propertyInfo;
            if (data.donationSettings && typeof data.donationSettings === 'object') this.donationSettings = data.donationSettings;
            if (data.realLifeMode !== undefined) this.realLifeMode = data.realLifeMode;
            if (data.customLevels && typeof data.customLevels === 'object') this.customLevels = data.customLevels;
            if (data.taskOrder && typeof data.taskOrder === 'object') this.taskOrder = data.taskOrder;
            if (Array.isArray(data.customTabs)) this.customTabs = data.customTabs;
            if (Array.isArray(data.deletedTabIds)) {
            const protectedTabs = ['renovations', 'starting-point', 'history', 'concept', 'dream', 'blueprint'];
            this.deletedTabIds = data.deletedTabIds.filter(id => !protectedTabs.includes(id));
        }
            if (Array.isArray(data.tabOrder)) this.tabOrder = data.tabOrder;
            if (data.tabOverrides && typeof data.tabOverrides === 'object') this.tabOverrides = data.tabOverrides;

            if (data.donationSettings) this.donationSettings = data.donationSettings;
            if (data.taskChecklists) this.taskChecklists = data.taskChecklists;
            if (data.taskMaterials) this.taskMaterials = data.taskMaterials;
            if (data.taskTools) this.taskTools = data.taskTools;
            if (data.taskPriorities) this.taskPriorities = data.taskPriorities;
            if (data.taskDonations) this.taskDonations = data.taskDonations;

            if (Array.isArray(data.communityTips)) this.communityTips = data.communityTips;
            if (Array.isArray(data.communityChallenges)) this.communityChallenges = data.communityChallenges;
            if (Array.isArray(data.hallOfFameBackers)) this.hallOfFameBackers = data.hallOfFameBackers;

            if (this.currentHouse && this.propertyInfo) {
                this.currentHouse.name = this.propertyInfo.name || this.currentHouse.name;
                this.currentHouse.subtext = this.propertyInfo.subtitle || this.currentHouse.subtext;
            }
            this.saveGame();
            this.notify();
            return { success: true };
        } catch (e) {
            console.error("Import project failed", e);
            return { success: false, error: e.message };
        }
    }

    resetToTemplate(templateType = 'whispering_pines') {
        if (templateType === 'blank') {
            this.propertyInfo = {
                name: "My Real-Life House Project",
                subtitle: "Personal Home Renovation Tracker",
                address: "Enter address here",
                purchasePrice: 0,
                startingCash: 25000,
                targetARV: 0,
                holdingCostPerDay: 0,
                notes: "Track real-life materials, costs, contractor bids, photos, and progress."
            };
            this.customRooms = {
                'Roof': { name: "Roof & Gutters", icon: "🔨", area: "Main Roof, Flashing & Soffits" },
                'LivingRoom': { name: "Living Room & Entryway", icon: "🛋️", area: "Living Areas" },
                'Kitchen': { name: "Kitchen & Dining", icon: "🍳", area: "Kitchen Remodel" },
                'Bathroom': { name: "Main Bathroom", icon: "🚿", area: "Bath & Tile" },
                'Basement': { name: "Basement / Foundation", icon: "🧱", area: "Substructure & Mechanicals" },
                'Exterior': { name: "Exterior & Yard", icon: "🏡", area: "Siding, Windows & Deck" }
            };
            this.customTasks = [];
            this.customPhotos = [];
            this.customVideos = [];
            this.customProgress = [];
            this.realLifeExpenses = [];
            this.completedTaskIDs = new Set();
            this.currentMoney = 25000;
            this.propertyValue = 0;
        } else {
            // Restore default Whispering Pines
            this.customRooms = {};
            this.customTasks = [];
            this.customPhotos = [];
            this.customVideos = [];
            this.customProgress = [];
            this.realLifeExpenses = [];
            this.completedTaskIDs = new Set();
            this.propertyInfo = {
                name: "1910 Whispering Pines Manor",
                subtitle: "116-Year-Old Historic Craftsman B&B (60 Tons)",
                address: "1910 Vance Ridge Road, Timber Basin, WA",
                purchasePrice: 65000,
                startingCash: 12500,
                targetARV: 240000,
                holdingCostPerDay: 50,
                notes: "Historic 60-ton Craftsman estate under active structural restoration."
            };
            this.currentMoney = 12500;
            this.propertyValue = 65000;
        }
        this.saveGame();
        this.notify();
    }

}

const JumperGame = JacksGame;
if (typeof window !== 'undefined') {
    window.Game = new JacksGame();
    // Emergency Backup handlers whenever webpage is closed or tab is hidden
    window.addEventListener('beforeunload', () => {
        if (window.Game && typeof window.Game.flushSave === 'function') {
            window.Game.flushSave(true);
        }
    });
    window.addEventListener('pagehide', () => {
        if (window.Game && typeof window.Game.flushSave === 'function') {
            window.Game.flushSave(true);
        }
    });
    document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'hidden' && window.Game && typeof window.Game.flushSave === 'function') {
            window.Game.flushSave(false);
        }
    });
    // Start 30-second continuous auto-save loop
    if (typeof window.Game.start30SecMasterAutoSave === 'function') {
        window.Game.start30SecMasterAutoSave(30000);
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { JacksGame, JumperGame, Game: (typeof window !== 'undefined' ? window.Game : null) };
}
