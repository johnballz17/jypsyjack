// Jack's Fixer Uper - Game Data: Properties, Tasks, Hardware, Weather & Events

const GAME_DATA = {
    // SINGULAR 1910 HISTORIC PROPERTY TO CONVERT INTO A BED & BREAKFAST (60 TONS DEAD WEIGHT)
    HOUSE: {
        id: 'bnb_manor',
        name: "1910 Whispering Pines Manor",
        subtext: "116-Year-Old Historic Queen Anne Manor (60 Tons Dead Weight)",
        builtYear: 1910,
        ageYears: 116,
        weightTons: 60,
        framingType: "Virgin Old-Growth Douglas Fir & White Oak (35-45 rings/inch)",
        plasterWeightPerWallLbs: 1100,
        purchasePrice: 65000,
        startingCash: 12500,
        targetARV: 240000,
        holdingCostPerDay: 50,
        difficulty: "1910 Historic B&B Restoration",
        description: "Constructed in 1910 by a pioneering timber baron, Whispering Pines Manor is an architectural marvel framed from massive virgin old-growth Douglas fir and white oak timbers. Weighing an immense 60 tons (120,000 lbs), the entire manor bears down on sagging cedar stump footings and un-mortared stone cellar walls. Adding to the immense dead load, every single interior wall holds over 1,100 pounds of heavy horsehair lime plaster & lath! CRITICAL RESTORATION RULE: The brittle 1,100-lb plaster walls must be torn out to shed dead weight before the 20-ton hydraulic jacks can safely raise the 60-ton structure back to level without catastrophic frame buckling!"
    },

    // Single house array for game engine
    HOUSES: [
        {
            id: 'bnb_manor',
            name: "1910 Whispering Pines Manor",
            subtext: "116-Year-Old Historic Queen Anne Manor (60 Tons Dead Weight)",
            builtYear: 1910,
            ageYears: 116,
            weightTons: 60,
            framingType: "Virgin Old-Growth Douglas Fir & White Oak (35-45 rings/inch)",
            plasterWeightPerWallLbs: 1100,
            purchasePrice: 65000,
            startingCash: 12500,
            targetARV: 240000,
            holdingCostPerDay: 50,
            difficulty: "1910 Historic B&B Restoration",
            description: "Constructed in 1910 by a pioneering timber baron, Whispering Pines Manor is an architectural marvel framed from massive virgin old-growth Douglas fir and white oak timbers. Weighing an immense 60 tons (120,000 lbs), the entire manor bears down on sagging cedar stump footings and un-mortared stone cellar walls. Adding to the immense dead load, every single interior wall holds over 1,100 pounds of heavy horsehair lime plaster & lath! CRITICAL RESTORATION RULE: The brittle 1,100-lb plaster walls must be torn out to shed dead weight before the 20-ton hydraulic jacks can safely raise the 60-ton structure back to level without catastrophic frame buckling!"
        }
    ],

    ROOMS: {
        'Basement': { name: "1910 Bad Foundation & 60-Ton Frame", icon: "🧱", area: "Stone Cellar & Footings", isFoundation: true },
        'LivingRoom': { name: "Guest Parlor & Hearth", icon: "🛋️", area: "Fireplace Parlor" },
        'Kitchen': { name: "Breakfast Country Kitchen", icon: "🍳", area: "B&B Commercial Kitchen" },
        'BreakfastNook': { name: "Morning Breakfast Nook", icon: "☕", area: "Sunlit Bay Alcove & Banquette", desc: "Sun-drenched bay window alcove off the country kitchen featuring custom curved oak banquette seating, walnut pedestal table, and artisan espresso bar." },
        'Sunroom': { name: "Victorian Sun Room & Command Center", icon: "🕹️", area: "Glass Solarium & Gaming Cockpit" },
        'TempShop': { name: "Temporary Wood & Metal Fabrication Shop", icon: "⚙️", area: "In-House Wood & Metal Fabrication Bay", desc: "Heavy-duty temporary woodworking and metal fabrication facility staged inside the manor. Equipped with laminated maple workbenches, sliding compound miter saws, cyclone HEPA dust extraction, and metal welding stations for milling custom oak trim, welding steel flitch plates, and restoring 1910 hardware on site." },
        'Bathroom': { name: "Guest Bath Suites", icon: "🚿", area: "Antique Soaking Suite" },
        'Bedroom': { name: "Heritage Guest Rooms", icon: "🛏️", area: "3 Guest Suites" },
        'Exterior': { name: "Wrap-Around Veranda & Lawn", icon: "🏡", area: "Grounds, Lawn & Veranda" },
        'Garage': { name: "Carriage House & Garage", icon: "🚗", area: "Detached Stalls & Workshop" },
        'WoodShed': { name: "Exterior Wood Shed & Lumber Storage", icon: "🪵", area: "Estate Grounds Timber Storage", desc: "Covered post-and-beam timber seasoning and lumber storage outbuilding. Features cantilever steel racks, gravel French drain foundation, and solar kiln fans to protect salvaged 1910 virgin old-growth fir and exotic hardwoods from rain and ground moisture." },
        'RoofAttic': { name: "Victorian Slate Roofing & Cupola", icon: "🔨", area: "Roof, Eaves & Cupola" },
        'PlumbingHVAC': { name: "Heritage Plumbing & HVAC", icon: "⚡", area: "Lead Lines, PEX & Climate" }
    },

    // WHISPERING PINES MANOR - ARCHITECTURAL LEVELS & SCHEMATIC CUTAWAY
    MANOR_LEVELS: [
        {
            id: 'level_3',
            name: "Level 3: Tower & Roof",
            elevation: "Elev. +32'",
            icon: "🏰",
            rooms: ['RoofAttic']
        },
        {
            id: 'level_2',
            name: "Level 2: Upper Guest Suites",
            elevation: "Elev. +16'",
            icon: "🛏️",
            rooms: ['Bedroom', 'Bathroom']
        },
        {
            id: 'level_1',
            name: "Level 1: Main Living & Hearth",
            elevation: "Elev. 0'",
            icon: "🛋️",
            rooms: ['LivingRoom', 'Kitchen', 'BreakfastNook', 'Sunroom', 'TempShop', 'PlumbingHVAC']
        },
        {
            id: 'level_0',
            name: "Level 0: Sub-Cellar Foundation",
            elevation: "Elev. -10'",
            icon: "🧱",
            rooms: ['Basement']
        },
        {
            id: 'grounds',
            name: "Grounds & Outbuildings",
            elevation: "Estate",
            icon: "🌳",
            rooms: ['Exterior', 'Garage', 'WoodShed']
        },
        {
            id: 'custom_additions',
            name: "Estate Additions & Custom Sections",
            elevation: "Estate / Custom",
            icon: "🏡",
            desc: "Master project folder for estate additions, extensions, and custom renovation sections.",
            rooms: []
        }
    ],

    TOOLS: [
        {
            id: 'tool_drill',
            name: "Cordless Impact Drill Set",
            icon: "🔩",
            cost: 140,
            desc: "Brushless 20V drill & driver with carbide bits. Essential for hanging cabinets and drywall."
        },
        {
            id: 'tool_tilesaw',
            name: "Diamond Wet Tile Saw",
            icon: "🪚",
            cost: 260,
            desc: "Precision water-cooled blade. Unlocks custom subway tile, shower surrounds, and quartz splash."
        },
        {
            id: 'tool_sander',
            name: "Commercial Drum Floor Sander",
            icon: "🧹",
            cost: 340,
            desc: "Heavy 220V sander for restoring antique oak hardwoods to mirror-smooth sheen."
        },
        {
            id: 'tool_pexcrimp',
            name: "PEX Crimper & Torch Kit",
            icon: "🔧",
            cost: 220,
            desc: "Heavy-duty plumbing crimper and map-gas torch for re-plumbing whole houses."
        },
        {
            id: 'tool_sprayer',
            name: "Airless Paint Sprayer",
            icon: "🎨",
            cost: 190,
            desc: "High-pressure sprayer. Speeds up exterior facade and interior wall painting by 50%."
        },
        {
            id: 'tool_jack',
            name: "Hydraulic Jack & Laser Level",
            icon: "📏",
            cost: 380,
            desc: "20-ton bottle jack and 360-degree green beam laser level for sagging floor joists."
        },
        {
            id: 'tool_sandblaster',
            name: "High-Pressure Sandblaster & Media Hopper",
            icon: "💨",
            cost: 420,
            desc: "Pneumatic abrasive blasting rig with ceramic nozzle and 50-lb garnet hopper. Strips 116-year calcified rust, grime, paint, and prepares metal/stone surfaces."
        }
    ],

    // DAILY CHORES & SITE MAINTENANCE ACTIONS
    CHORES: [
        {
            id: 'chore_organize_tools',
            name: "Organize & Calibrate Pro Tools",
            icon: "🧰",
            actionMethod: 'organizeTools',
            apCost: 1,
            desc: "Clean saw arbors, hone chisel bevels, recharge cordless packs, and hang all pro tools on shadow pegboards in the temporary workshop.",
            benefit: "-20% Clutter, +Craftsmanship Precision status (2 days), 50% chance to find lost brass screws & $25-$60 cash!"
        },
        {
            id: 'chore_clean_site',
            name: "Deep-Clean & Sweep Job Site",
            icon: "🧹",
            actionMethod: 'cleanJobSite',
            apCost: 1,
            desc: "Sweep gypsum dust, consolidate scrap bins, coil extension cords, and vacuum main walkways.",
            benefit: "Reduces clutter to 0%, 45% chance to find $20-$60 loose change in the sawdust!"
        },
        {
            id: 'chore_move_debris',
            name: "Move Front Debris to Backyard (Ordinance)",
            icon: "📦",
            actionMethod: 'moveDebrisToBackyard',
            apCost: 1,
            desc: "Stash drywall scraps, mortar tubs, and lumber pallets behind privacy fence out of street view.",
            benefit: "-30% Clutter, +20% Neighbor Relations (avoids $250 City Ordinance Sec. 14-8 citation!)"
        },
        {
            id: 'chore_mow_lawn',
            name: "Mow Overgrown Yard & Edge Curbs",
            icon: "🌿",
            actionMethod: 'mowYard',
            apCost: 1,
            desc: "Mow knee-high crabgrass, edge sidewalks, and weed-eat fence lines to enhance curb appeal.",
            benefit: "-15% Clutter, +15% Neighbor Relations, 35% chance to uncover vintage coins ($15-$40)!"
        },
        {
            id: 'chore_run_mulcher',
            name: "Run Carriage House Branch Mulcher",
            icon: "🪵",
            actionMethod: 'runMulcher',
            apCost: 1,
            desc: "Shred scraped branches and scrap dimensional lumber into organic garden mulch.",
            benefit: "-35% Clutter, +$150 Property Appraisal Value (requires building mulcher first)"
        }
    ],

    WEATHER: {
        'Sunny': {
            name: "Sunny & Warm",
            icon: "☀️",
            temp: "74°F",
            desc: "+10% value bonus on curb appeal tasks.",
            allowedExterior: true
        },
        'Rainy': {
            name: "Rainy & Damp",
            icon: "🌧️",
            temp: "58°F",
            desc: "Wet conditions. Exterior painting halted. Risk of dampness if roof is unsealed.",
            allowedExterior: false
        },
        'Stormy': {
            name: "Severe Thunderstorm",
            icon: "⛈️",
            temp: "62°F",
            desc: "Heavy winds and flash rain! Unrepaired roofs take $200-$400 water damage penalty.",
            allowedExterior: false
        },
        'Heatwave': {
            name: "Scorching Heatwave",
            icon: "🔥",
            temp: "98°F",
            desc: "Intense heat. Indoor workers demand extra hydration ($30 water/cooling fee).",
            allowedExterior: true
        },
        'FreezingCold': {
            name: "Freezing Snap",
            icon: "❄️",
            temp: "26°F",
            desc: "Sub-zero cold. Old uninsulated galvanized pipes risk burst leaks!",
            allowedExterior: false
        }
    },

    // HISTORIC RESTORATION ROADMAP - AUTHENTIC INTER-ROOM DEPENDENCIES
    TASK_PREREQUISITES: {
        // Foundation Roadmap:
        'found_jack': [
            { prereqId: 'found_gut_plaster', reason: "Demolish 1,100-lb plaster & lath walls across ground floor first! Shedding 12+ tons from the 60-ton frame prevents wall shear collapse when hydraulic jacks lift the timbers." }
        ],
        'lr_hardwoods': [
            { prereqId: 'found_jack', reason: "Foundation must be raised 3.5 inches and leveled first! Shifting the house later will buckle and twist newly finished quarter-sawn virgin oak floors." }
        ],
        'bed_flooring': [
            { prereqId: 'found_jack', reason: "Level the foundation center beam before laying tongue-and-groove flooring on upper levels to prevent floor crowning and joint separation." }
        ],
        'gar_carriage_doors': [
            { prereqId: 'gar_roof_sag', reason: "Sister the sagging carriage house rafters first so the heavy sliding barn door track hangs level and plumb." }
        ],

        // Roof Weatherproofing Roadmap ("No finish work before roof is dried in"):
        'bed_drywall': [
            { prereqId: 'roof_shingles', reason: "Roof must be dried-in with shingles first! Rain leaking through the attic will ruin fresh drywall, joint compound, and insulation." }
        ],
        'sun_displays_sound': [
            { prereqId: 'sun_solarium_glaze', reason: "Restore solarium curved glass and seal thermal weatherstripping before installing $4,000 triple 4K displays and avionics." }
        ],
        'roof_slate_copper': [
            { prereqId: 'roof_shingles', reason: "Primary shingle underlayment must be sealed before laying delicate Pennsylvania scalloped slate and copper valleys." }
        ],

        // Plumbing & Mechanical Roadmap ("No bathroom tile or fixtures before plumbing lines are replaced"):
        'bath_shower': [
            { prereqId: 'bath_gut', reason: "Demo water-damaged fiberglass tub and rotted subfloor before tiling the walk-in shower." },
            { prereqId: 'plumb_lead', reason: "Replace 116-year toxic lead supply lines with PEX-A before setting subway tile! Never tile over active lead lines." }
        ],
        'bath_vanity': [
            { prereqId: 'bath_gut', reason: "Demo the old vanity first." },
            { prereqId: 'plumb_lead', reason: "New plumbing rough-ins must be completed before mounting double vanity sinks and faucets." }
        ],
        'kit_cabinets': [
            { prereqId: 'kit_demo', reason: "Demo water-damaged laminate cabinets before hanging new shaker cabinetry." }
        ],
        'kit_appliances': [
            { prereqId: 'plumb_lead', reason: "Replace lead water service line before connecting pressurized water to the ice maker and commercial dishwasher." }
        ],
        'nook_espresso_bar': [
            { prereqId: 'plumb_lead', reason: "Plumb clean filtered PEX lines from the mechanical manifold before installing the commercial espresso bar." }
        ]
    },

    TASKS: [
        // LIVING ROOM
        {
            id: 'lr_trash',
            name: "Clear Broken Furniture & Trash",
            room: 'LivingRoom',
            desc: "Haul discarded 1970s sofa, moldy rug, and broken blinds to the on-site dumpster.",
            matCost: 180,
            subCost: 350,
            value: 500,
            toolRequired: null,
            apCost: 1
        },
        {
            id: 'lr_popcorn',
            name: "Scrape Popcorn Ceilings",
            room: 'LivingRoom',
            desc: "Mist, scrape off dated textured acoustic popcorn, skim coat smooth, and sand.",
            matCost: 280,
            subCost: 650,
            value: 950,
            toolRequired: null,
            apCost: 1
        },
        {
            id: 'lr_hardwoods',
            name: "Refinish Antique Oak Hardwoods",
            room: 'LivingRoom',
            desc: "Sand through three layers of grime down to virgin oak and apply 3 coats of satin polyurethane.",
            matCost: 550,
            subCost: 1400,
            value: 2900,
            toolRequired: 'tool_sander',
            apCost: 2
        },
        {
            id: 'lr_paint',
            name: "Prime & Paint Neutral Designer Hue",
            room: 'LivingRoom',
            desc: "Two coats of warm greige on walls, semi-gloss white on craftsman trim and molding.",
            matCost: 320,
            subCost: 750,
            value: 1200,
            toolRequired: 'tool_sprayer',
            apCost: 1
        },

        // VICTORIAN SUN ROOM / COMMAND CENTER & FLIGHT COCKPIT GAMING SETUP
        {
            id: 'sun_solarium_glaze',
            name: "Restore 1910 Curved Solarium Glass & Thermal Glaze",
            room: 'Sunroom',
            desc: "Re-glaze 48 arched Victorian conservatory glass panes with ceramic thermal UV tint to eliminate cockpit display glare and stabilize room temperature for gaming hardware.",
            matCost: 750,
            subCost: 1600,
            value: 3100,
            toolRequired: null,
            apCost: 1
        },
        {
            id: 'sun_tilt_table',
            name: "Mount Custom Chassis on Motorized 3-DOF Tilt Table",
            room: 'Sunroom',
            desc: "Construct reinforced tubular steel cockpit chassis and mount onto an industrial 3-DOF motorized pneumatic tilt table capable of 35-degree dynamic pitch and roll motions during flight sim play.",
            matCost: 1450,
            subCost: 3100,
            value: 5800,
            toolRequired: 'tool_drill',
            apCost: 2
        },
        {
            id: 'sun_cockpit_chair',
            name: "Install Recaro Pneumatic Cockpit Flight Chair & Tactile Bass",
            room: 'Sunroom',
            desc: "Bolt down an ergonomic high-back bucket flight chair with pneumatic lumbar, 5-point flight harness, and dual integrated 50W tactile bass haptic transducers under the seat cushion.",
            matCost: 850,
            subCost: 1750,
            value: 3400,
            toolRequired: 'tool_drill',
            apCost: 1
        },
        {
            id: 'sun_joysticks_hotas',
            name: "Mount Dual Force-Feedback Joysticks & Rudder Pedals",
            room: 'Sunroom',
            desc: "Install dual center/side MIL-SPEC magnetic hall-sensor flight joysticks, twin-engine split throttle quadrant with detents, and heavy aluminum floor rudder pedals on articulated swivel locking arms.",
            matCost: 980,
            subCost: 1950,
            value: 3900,
            toolRequired: 'tool_drill',
            apCost: 1
        },
        {
            id: 'sun_overhead_console',
            name: "Fabricate Overhead Cockpit Switch Panel & Comms Dials",
            room: 'Sunroom',
            desc: "Construct an authentic overhead cockpit console featuring 28 illuminated toggle switches with missile safety guards, master battery APU breakers, rotary encoders, and backlit LED annunciator warning panels.",
            matCost: 650,
            subCost: 1400,
            value: 2900,
            toolRequired: 'tool_drill',
            apCost: 2
        },
        {
            id: 'sun_displays_sound',
            name: "Triple 4K Curved Panoramic Displays & 7.1 Solarium Surround",
            room: 'Sunroom',
            desc: "Mount triple 49-inch 144Hz curved ultrawide gaming monitors on a wraparound tubular bracket, integrated with 7.1 solarium surround speakers and acoustic corner bass traps.",
            matCost: 2200,
            subCost: 4200,
            value: 7500,
            toolRequired: 'tool_drill',
            apCost: 2
        },
        {
            id: 'sun_electrical_conduit',
            name: "Dedicated 20-Amp Isolated Audio/PC Circuit & Subfloor Conduit",
            room: 'Sunroom',
            desc: "Run a dedicated 20-amp clean electrical circuit from the breaker panel and cut discrete floor conduits beneath the 1910 oak boards to conceal all gaming rig power and data cables from curious cats.",
            matCost: 480,
            subCost: 1100,
            value: 2200,
            toolRequired: 'tool_pexcrimp',
            apCost: 1
        },
        {
            id: 'sun_rower_machine',
            name: "Install Dual-Resistance Wooden Rowing Machine Setup",
            room: 'Sunroom',
            desc: "Anchor a handcrafted solid American ash WaterRower rowing machine with dual fluid-air resistance facing the panoramic solarium garden view, complete with VR telemetry sync and silent nylon pull strap for morning B&B cardio.",
            matCost: 680,
            subCost: 1350,
            value: 2600,
            toolRequired: 'tool_drill',
            apCost: 1
        },

        // MORNING BREAKFAST NOOK
        {
            id: 'nook_banquette_bench',
            name: "Build Custom Curved Oak Banquette Seating & Under-Bench Storage",
            room: 'BreakfastNook',
            desc: "Frame and scribe curved white oak banquette seating with hinged lift-top storage for vintage linens and board games.",
            matCost: 620,
            subCost: 1300,
            value: 2700,
            toolRequired: 'tool_drill',
            apCost: 1
        },
        {
            id: 'nook_bay_windows',
            name: "Restore 1910 Leaded Glass Bay Windows & Brass Stays",
            room: 'BreakfastNook',
            desc: "Re-putty antique beveled glass panes, lubricate solid cast brass quadrant window stays, and weatherproof drafty bay sashes.",
            matCost: 450,
            subCost: 950,
            value: 2100,
            toolRequired: null,
            apCost: 1
        },
        {
            id: 'nook_espresso_bar',
            name: "Craft Reclaimed Timber Espresso Bar & Farmhouse Coffee Mill",
            room: 'BreakfastNook',
            desc: "Construct an artisanal espresso station with dual-boiler commercial coffee maker, knock box, and hand-crank brass wall mill.",
            matCost: 980,
            subCost: 1850,
            value: 3600,
            toolRequired: 'tool_drill',
            apCost: 2
        },
        {
            id: 'nook_walnut_table',
            name: "Hand-Turn Solid Walnut Pedestal Breakfast Table",
            room: 'BreakfastNook',
            desc: "Turn and polish an antique black walnut pedestal table with oil-rubbed satin wax finish sized perfectly for four guests.",
            matCost: 580,
            subCost: 1150,
            value: 2400,
            toolRequired: 'tool_sander',
            apCost: 1
        },
        {
            id: 'nook_cushions_lighting',
            name: "Upholster Velvet Banquette Cushions & Brass Pendant Lamp",
            room: 'BreakfastNook',
            desc: "Custom high-density foam cushions wrapped in stain-resistant emerald velvet, paired with an authentic 1910 brass schoolhouse pendant lamp.",
            matCost: 390,
            subCost: 820,
            value: 1800,
            toolRequired: null,
            apCost: 1
        },

        // TEMPORARY WOOD & METAL FABRICATION SHOP (IN-HOUSE)
        {
            id: 'shop_heavy_workbench',
            name: "Assemble Heavy Laminated Maple Workbench & 10-Inch Vise",
            room: 'TempShop',
            desc: "Construct a massive 300-lb laminated rock maple assembly bench with dog holes and twin-screw cabinetmaker vise for hand-planing old-growth timbers on site.",
            matCost: 380,
            subCost: 750,
            value: 1400,
            toolRequired: 'tool_drill',
            apCost: 1
        },
        {
            id: 'shop_dust_collection',
            name: "Install Dual-Stage 2HP Cyclone HEPA Dust Extractor & Ambient Air Filter",
            room: 'TempShop',
            desc: "Run 4-inch galvanized ductwork and ceiling ambient air scrubbers to trap fine oak sawdust and prevent particulates from settling into finished guest suites.",
            matCost: 460,
            subCost: 880,
            value: 1750,
            toolRequired: 'tool_drill',
            apCost: 1
        },
        {
            id: 'shop_miter_station',
            name: "Calibrate 12-Inch Sliding Compound Miter Saw & Roller Extension Tables",
            room: 'TempShop',
            desc: "Mount dual-bevel sliding miter saw with 80-tooth carbide fine-finish blade along 16 feet of micro-adjustable stop blocks for cutting reproduction Victorian crown mouldings.",
            matCost: 290,
            subCost: 580,
            value: 1200,
            toolRequired: 'tool_drill',
            apCost: 1
        },
        {
            id: 'shop_metal_welding',
            name: "Fabricate Metal Welding & Angle Grinding Fire-Safe Station",
            room: 'TempShop',
            desc: "Erect heavy steel welding table with grounded copper clamp, fireproof fiberglass drop curtains, and angle grinder stand for fabricating custom beam brackets and flitch plates.",
            matCost: 520,
            subCost: 1100,
            value: 2100,
            toolRequired: 'tool_drill',
            apCost: 1
        },
        {
            id: 'shop_cast_iron_air',
            name: "Mount 60-Gallon 175-PSI Two-Stage Cast Iron Air Compressor & Hard Air Lines",
            room: 'TempShop',
            desc: "Plumb rigid aluminum compressed air loops with water separators to supply pneumatic framing nailers, spray guns, and die grinders throughout the work bay.",
            matCost: 620,
            subCost: 1250,
            value: 2400,
            toolRequired: 'tool_pexcrimp',
            apCost: 1
        },
        {
            id: 'shop_exhaust_vent',
            name: "Vent Wall-Mounted Industrial Paint & Welding Fume Exhaust Hood",
            room: 'TempShop',
            desc: "Install 1,200-CFM explosion-proof exhaust louver through exterior brick wall to safely clear weld smoke, lacquer overspray, and solvent fumes outside.",
            matCost: 340,
            subCost: 690,
            value: 1350,
            toolRequired: 'tool_drill',
            apCost: 1
        },

        // EXTERIOR WOOD SHED & EXTRA LUMBER STORAGE (OUTSIDE)
        {
            id: 'shed_timber_framing',
            name: "Erect Heavy 6x6 Timber Post-and-Beam Wood Shed Frame",
            room: 'WoodShed',
            desc: "Notch and raise pressure-treated 6x6 posts with mortise-and-tenon knee braces anchored into subterranean concrete pier saddles on the estate grounds.",
            matCost: 650,
            subCost: 1300,
            value: 2500,
            toolRequired: 'tool_drill',
            apCost: 2
        },
        {
            id: 'shed_corrugated_roof',
            name: "Install Overhanging Corrugated Standing-Seam Steel Roof",
            room: 'WoodShed',
            desc: "Lay 26-gauge charcoal standing-seam steel roofing panels with 24-inch overhangs and drip edge flashing to shield stacked lumber from torrential rain.",
            matCost: 420,
            subCost: 850,
            value: 1650,
            toolRequired: 'tool_drill',
            apCost: 1
        },
        {
            id: 'shed_cantilever_racks',
            name: "Weld Heavy Steel Cantilever Lumber Storage Arm Racks",
            room: 'WoodShed',
            desc: "Bolt 1,500-lb capacity adjustable tubular steel cantilever uprights to hold thousands of board-feet of dimensional framing lumber off the ground.",
            matCost: 380,
            subCost: 760,
            value: 1500,
            toolRequired: 'tool_drill',
            apCost: 1
        },
        {
            id: 'shed_french_drain_base',
            name: "Tamp Compacted Crushed Stone Floor & Perimeter French Drain",
            room: 'WoodShed',
            desc: "Excavate shallow trench, lay perforated 4-inch drain pipe wrapped in geotextile fabric, and pack 6 inches of crushed angular granite to prevent ground moisture wicking.",
            matCost: 260,
            subCost: 520,
            value: 1100,
            toolRequired: null,
            apCost: 1
        },
        {
            id: 'shed_solar_kiln_fan',
            name: "Install Solar-Powered Forced-Air Seasoning Kiln Fans",
            room: 'WoodShed',
            desc: "Mount dual 20W monocrystalline solar panels driving high-CFM brushless cross-flow fans to accelerate drying of moisture-heavy green lumber.",
            matCost: 310,
            subCost: 620,
            value: 1300,
            toolRequired: 'tool_drill',
            apCost: 1
        },
        {
            id: 'shed_stack_salvage_fir',
            name: "Sort, Sticker, and Stack 1910 Old-Growth Virgin Fir Timbers",
            room: 'WoodShed',
            desc: "Catalog salvaged virgin fir rafters, hand-plane rough edges, apply wax end-grain sealer to prevent checking, and stack horizontally on dry wood stickers.",
            matCost: 90,
            subCost: 280,
            value: 950,
            toolRequired: null,
            apCost: 1
        },

        // KITCHEN
        {
            id: 'kit_demo',
            name: "Gut Water-Damaged Laminate Cabinets",
            room: 'Kitchen',
            desc: "Tear down rotted particle-board cabinets, yellowed laminate counters, and stained linoleum.",
            matCost: 260,
            subCost: 520,
            value: 700,
            toolRequired: null,
            apCost: 1
        },
        {
            id: 'kit_cabinets',
            name: "Install White Shaker Cabinets",
            room: 'Kitchen',
            desc: "Install solid-wood white shaker boxes with dovetail drawers and soft-close hinges.",
            matCost: 1600,
            subCost: 2600,
            value: 4100,
            toolRequired: 'tool_drill',
            apCost: 2
        },
        {
            id: 'kit_quartz',
            name: "Install Calacatta Quartz Countertops",
            room: 'Kitchen',
            desc: "Durable, heat-resistant calacatta quartz with subtle gray veining and undermount sink.",
            matCost: 1850,
            subCost: 2900,
            value: 4600,
            toolRequired: 'tool_tilesaw',
            apCost: 1
        },
        {
            id: 'kit_appliances',
            name: "Stainless Steel Appliance Suite",
            room: 'Kitchen',
            desc: "Energy Star French door refrigerator, slide-in gas range, dishwasher, and microwave.",
            matCost: 2400,
            subCost: 3100,
            value: 5200,
            toolRequired: null,
            apCost: 1
        },

        // BATHROOM
        {
            id: 'bath_gut',
            name: "Demo Avocado Fiberglass Tub & Vanity",
            room: 'Bathroom',
            desc: "Demolish dated 1970s avocado tub, cracked toilet, and mold-stained plywood subfloor.",
            matCost: 290,
            subCost: 600,
            value: 800,
            toolRequired: null,
            apCost: 1
        },
        {
            id: 'bath_shower',
            name: "Subway Tile Walk-in Shower",
            room: 'Bathroom',
            desc: "Waterproof Schluter backer board, bright white subway tile, shampoo niche, and matte black trim.",
            matCost: 950,
            subCost: 1850,
            value: 2900,
            toolRequired: 'tool_tilesaw',
            apCost: 2
        },
        {
            id: 'bath_vanity',
            name: "Double Vanity & LED Backlit Mirror",
            room: 'Bathroom',
            desc: "White oak double vanity, quartz countertop, dual vessel sinks, and anti-fog LED mirror.",
            matCost: 820,
            subCost: 1450,
            value: 2200,
            toolRequired: 'tool_drill',
            apCost: 1
        },

        // BEDROOMS
        {
            id: 'bed_drywall',
            name: "Patch Drywall & New Trim",
            room: 'Bedroom',
            desc: "Fix door handle holes, tape peeling joints, and install crisp 5-inch craftsman baseboards.",
            matCost: 340,
            subCost: 780,
            value: 1250,
            toolRequired: 'tool_drill',
            apCost: 1
        },
        {
            id: 'bed_closets',
            name: "Custom Built-in Closet Organizers",
            room: 'Bedroom',
            desc: "Modular white melamine shelving with double hang racks, pullout drawers, and shoe racks.",
            matCost: 520,
            subCost: 1100,
            value: 1700,
            toolRequired: 'tool_drill',
            apCost: 1
        },
        {
            id: 'bed_flooring',
            name: "Luxury Vinyl Plank (LVP) Flooring",
            room: 'Bedroom',
            desc: "100% waterproof luxury vinyl plank with pre-attached soundproof acoustic pad.",
            matCost: 680,
            subCost: 1350,
            value: 2100,
            toolRequired: null,
            apCost: 1
        },

        // EXTERIOR & CURB APPEAL & GROUNDS
        {
            id: 'ext_move_debris_ordinance',
            name: "Move Front Construction Debris to Backyard (City Ordinance)",
            room: 'Exterior',
            desc: "Haul unsightly stacks of drywall, lumber, scaffolding, and mortar tubs from front street view into the privacy-fenced backyard. Satisfies City Ordinance Sec. 14-8, prevents $250 citation, cuts clutter by -30%, and raises Mr. Henderson's mood (+25% relations)!",
            matCost: 40,
            subCost: 150,
            value: 650,
            toolRequired: null,
            apCost: 1
        },
        {
            id: 'ext_mow_lawn',
            name: "Mow Overgrown Yard, Weed-Eat & Edge Curbs",
            room: 'Exterior',
            desc: "Cut knee-high weeds with commercial mower, trim fence lines, and edge sidewalks. Drastically boosts curb appeal, pleases Mr. Henderson (+20% relations), and avoids tall-grass blight citations!",
            matCost: 35,
            subCost: 110,
            value: 550,
            toolRequired: null,
            apCost: 1
        },
        {
            id: 'ext_lawn_lights',
            name: "Install Low-Voltage Brass Lawn & Pathway Lanterns",
            room: 'Exterior',
            desc: "Trench direct-burial cable and install solid cast brass landscape lights along stone pathways and front gardens. Creates magical evening ambiance for arriving B&B guests!",
            matCost: 340,
            subCost: 720,
            value: 1600,
            toolRequired: 'tool_drill',
            apCost: 1
        },
        {
            id: 'eco_wind',
            name: "Erect Backyard Micro Wind Turbine Generator",
            room: 'Exterior',
            desc: "Erect a 35-foot tubular mast with 1.2kW aero blades and battery grid tie-in in the open meadow. Slashes daily holding utility costs by $12/day!",
            matCost: 1600,
            subCost: 2900,
            value: 4600,
            toolRequired: 'tool_drill',
            apCost: 2
        },
        {
            id: 'ext_landscaping',
            name: "Clear Overgrowth & Black Mulch Flowerbeds",
            room: 'Exterior',
            desc: "Hack down waist-high weeds, prune overgrown trees, plant boxwoods, and spread fresh mulch.",
            matCost: 350,
            subCost: 700,
            value: 1100,
            toolRequired: null,
            apCost: 1
        },
        {
            id: 'ext_paint',
            name: "Power Wash & Paint Exterior Facade",
            room: 'Exterior',
            desc: "Pressure wash away mildew, scrape peeling lead-safe paint, and spray historic Queen Anne Victorian facade.",
            matCost: 1400,
            subCost: 2800,
            value: 4300,
            toolRequired: 'tool_sprayer',
            apCost: 2
        },
        {
            id: 'ext_door',
            name: "Craftsman Mahogany Entry Door & Hardware",
            room: 'Exterior',
            desc: "Install solid wood insulated craftsman door with sidelights, oil-rubbed bronze handle, and smart lock.",
            matCost: 750,
            subCost: 1300,
            value: 2000,
            toolRequired: 'tool_drill',
            apCost: 1
        },
        {
            id: 'ext_sandblast_ironwork',
            name: "Sandblast 1910 Ornamental Veranda Ironwork & Architectural Hardware",
            room: 'Exterior',
            desc: "Load garnet grit into the sandblaster to strip 116 years of flaking lead paint and rust from decorative cast iron porch railings and brackets.",
            matCost: 220,
            subCost: 650,
            value: 1800,
            toolRequired: 'tool_sandblaster',
            apCost: 1
        },

        // CARRIAGE HOUSE & DETACHED GARAGE
        {
            id: 'gar_clean_debris',
            name: "Haul Out 40-Yr Junk & Tires from Carriage House",
            room: 'Garage',
            desc: "Clear out rusted car parts, flat tires, oily rags, and broken ladders from the 2-stall Victorian carriage house.",
            matCost: 120,
            subCost: 320,
            value: 700,
            toolRequired: null,
            apCost: 1
        },
        {
            id: 'gar_roof_sag',
            name: "Sister Carriage House Rafters & Fix Roof Sag",
            room: 'Garage',
            desc: "Jack up sagging 1890s timber rafters, sister with structural 2x8s, and install fresh 5/8\" CDX plywood decking.",
            matCost: 580,
            subCost: 1350,
            value: 2400,
            toolRequired: 'tool_drill',
            apCost: 2
        },
        {
            id: 'gar_carriage_doors',
            name: "Handcraft Cedar Sliding Carriage Barn Doors",
            room: 'Garage',
            desc: "Build dual X-brace western red cedar sliding doors with heavy-duty forged black iron overhead track rollers.",
            matCost: 650,
            subCost: 1450,
            value: 2900,
            toolRequired: 'tool_drill',
            apCost: 2
        },
        {
            id: 'gar_concrete_slab',
            name: "Epoxy Coat Cracked Carriage House Slab",
            room: 'Garage',
            desc: "Grind concrete, patch thermal settling fractures with polyurea, and roll industrial granite-flake epoxy shield.",
            matCost: 420,
            subCost: 890,
            value: 1800,
            toolRequired: null,
            apCost: 1
        },
        {
            id: 'gar_workshop',
            name: "Build Master Craftsman Workbench & Tool Wall",
            room: 'Garage',
            desc: "Install 10-foot hard maple butcher block workbench, steel pegboard organization, and bright 5000K LED task lighting.",
            matCost: 380,
            subCost: 750,
            value: 1600,
            toolRequired: 'tool_drill',
            apCost: 1
        },
        {
            id: 'tool_mulcher_build',
            name: "Build High-Torque Electric Branch Chipper & Mulcher",
            room: 'Garage',
            desc: "Assemble 5-HP electric motor, hardened steel chipping flywheel drum, and feed chute. Turns yard debris & prunings into free garden mulch!",
            matCost: 240,
            subCost: 480,
            value: 1400,
            toolRequired: 'tool_drill',
            apCost: 1
        },
        {
            id: 'eco_solar',
            name: "Install Solar Generator Panels & Battery Storage",
            room: 'Garage',
            desc: "Mount 16 high-efficiency monocrystalline solar panels on the carriage house south roof with 10kWh lithium battery bank. Slashes daily holding costs by $18/day!",
            matCost: 2400,
            subCost: 4200,
            value: 6800,
            toolRequired: 'tool_drill',
            apCost: 2
        },

        // VICTORIAN SLATE ROOFING & CUPOLA
        {
            id: 'roof_shingles',
            name: "Architectural 30-Year Roof Shingles & Underlayment",
            room: 'RoofAttic',
            desc: "Tear off rotting valley shingles, lay synthetic waterproof underlayment, and nail 30-year architectural shingles.",
            matCost: 1950,
            subCost: 3800,
            value: 5800,
            toolRequired: null,
            apCost: 2
        },
        {
            id: 'roof_slate_copper',
            name: "Replace Broken 1910 Slate Tiles & Solder Copper Valleys",
            room: 'RoofAttic',
            desc: "Source matching 1910 scalloped Pennsylvania slate tiles, replace cracked slates, and solder heavy 16-oz copper roof valleys.",
            matCost: 890,
            subCost: 1950,
            value: 3400,
            toolRequired: null,
            apCost: 2
        },
        {
            id: 'roof_fascia_eaves',
            name: "Rebuild Rotted Cornices & Carved Victorian Fascia",
            room: 'RoofAttic',
            desc: "Replace dry-rotted crown molding, eaves, and soffits. Seal all roofline gaps against bat and squirrel entry into guest rooms.",
            matCost: 520,
            subCost: 1100,
            value: 2100,
            toolRequired: 'tool_drill',
            apCost: 1
        },
        {
            id: 'roof_gutters',
            name: "Install 6-Inch Half-Round Copper Gutters & Rain Chains",
            room: 'RoofAttic',
            desc: "Hang seamless half-round copper gutters to channel roof runoff 20 feet away from the 116-year-old stone foundation.",
            matCost: 780,
            subCost: 1550,
            value: 2700,
            toolRequired: 'tool_drill',
            apCost: 1
        },
        {
            id: 'roof_cupola',
            name: "Restore Heritage Roof Cupola & Copper Weathervane",
            room: 'RoofAttic',
            desc: "Re-glaze arched cupola viewing windows, paint decorative timber railings, and mount polished brass & copper rooster weathervane.",
            matCost: 450,
            subCost: 980,
            value: 2200,
            toolRequired: null,
            apCost: 1
        },
        {
            id: 'roof_insulation',
            name: "Blow-In High-Density R-49 Attic Insulation",
            room: 'RoofAttic',
            desc: "Blow in 16 inches of high-density fiberglass insulation to slash winter heating and summer cooling utility overhead.",
            matCost: 750,
            subCost: 1400,
            value: 2100,
            toolRequired: null,
            apCost: 1
        },

        // HERITAGE PLUMBING & MECHANICALS
        {
            id: 'plumb_lead',
            name: "Replace Dangerous 1910 Lead Service & Supply Lines",
            room: 'PlumbingHVAC',
            desc: "[CRITICAL HEALTH HAZARD] Dig curb stop, pull out toxic 1910 lead pipe main, and install 1-inch PEX-A with brass shutoffs. Guarantees 100% lead-free pure water for B&B guests!",
            matCost: 1200,
            subCost: 2600,
            value: 4500,
            toolRequired: 'tool_pexcrimp',
            apCost: 2
        },
        {
            id: 'plumb_pex',
            name: "Whole-House PEX Water Repiping & Manifold",
            room: 'PlumbingHVAC',
            desc: "Rip out rusted galvanized steel pipes and run flexible color-coded PEX-A with a central home-run shut-off manifold.",
            matCost: 1800,
            subCost: 3400,
            value: 5100,
            toolRequired: 'tool_pexcrimp',
            apCost: 2
        },
        {
            id: 'plumb_hvac',
            name: "16-SEER Inverter Heat Pump & Smart Climate Control",
            room: 'PlumbingHVAC',
            desc: "Replace 35-year-old oil burner with high-efficiency electric inverter heat pump and smart Wi-Fi thermostats in every suite.",
            matCost: 3200,
            subCost: 5600,
            value: 8400,
            toolRequired: null,
            apCost: 2
        },

        // 1910 STRUCTURAL FOUNDATION, 60-TON FRAME & PLASTER DEMO
        {
            id: 'found_gut_plaster',
            name: "Tear Out 1,100-lb Plaster Walls Before Raising House",
            room: 'Basement',
            desc: "[CRITICAL STRUCTURAL PRE-REQUISITE] Demolish 1,100-lb horsehair lime plaster & lath walls across ground floor down to bare 1910 old-growth timber framing. Sheds 12+ tons from the 60-ton manor so four 20-ton hydraulic jacks can safely raise the house without wall shear collapse! (Required before hydraulic jacking)",
            matCost: 350,
            subCost: 850,
            value: 2600,
            toolRequired: null,
            apCost: 2
        },
        {
            id: 'found_jack',
            name: "Hydraulic Jacking & Center Beam Sistering",
            room: 'Basement',
            desc: "[CRITICAL FOUNDATION #1] Set four 20-ton hydraulic jacks beneath the 60-ton old-growth timber center beam, lift the sagging frame 3.5 inches back to level, and sister with steel flitch plates. (Requires 1,100-lb plaster walls to be torn out first!)",
            matCost: 850,
            subCost: 1900,
            value: 4800,
            toolRequired: 'tool_jack',
            apCost: 2
        },
        {
            id: 'found_piers',
            name: "Excavate & Pour Concrete Footing Piers",
            room: 'Basement',
            desc: "[CRITICAL FOUNDATION #2] Dig out rotted 1910 cedar tree-trunk stump footings and pour 3,500-PSI reinforced concrete piers down to stable bedrock to support the 60-ton dead load. (Required for B&B Permit)",
            matCost: 1100,
            subCost: 2400,
            value: 5400,
            toolRequired: null,
            apCost: 2
        },
        {
            id: 'found_fieldstone',
            name: "Repoint 1910 Fieldstone Masonry Mortar",
            room: 'Basement',
            desc: "[CRITICAL FOUNDATION #3] Chisel away decomposed lime mortar and pack structural hydraulic mortar between bulging stone cellar walls. (Required for B&B Permit)",
            matCost: 480,
            subCost: 1200,
            value: 3200,
            toolRequired: null,
            apCost: 1
        },
        {
            id: 'base_drain',
            name: "Perimeter French Drain & Dual Sump Pumps",
            room: 'Basement',
            desc: "Trench cellar perimeter, lay 4-inch perforated drainage pipe, and wire battery-backup sump pumps to keep the B&B breakfast food cellar dry.",
            matCost: 950,
            subCost: 1800,
            value: 2800,
            toolRequired: null,
            apCost: 2
        },
        {
            id: 'base_vapor',
            name: "20-Mil Antimicrobial Crawlspace Encapsulation",
            room: 'Basement',
            desc: "Seal dirt cellar with heavy 20-mil vapor barrier to stop damp earth odors from rising into guest parlor and dining rooms.",
            matCost: 450,
            subCost: 950,
            value: 1900,
            toolRequired: null,
            apCost: 1
        }
    ],

    DAILY_EVENTS: [
        {
            id: 'ev_antique',
            title: "Vintage Cache in Floor Cavity!",
            type: "windfall",
            desc: "While tearing up floorboards, you uncovered a leather pouch with vintage silver dollars! Sold to an antique collector.",
            cashDelta: 420,
            valueDelta: 0
        },
        {
            id: 'ev_pipe_burst',
            title: "Emergency Pipe Pressure Leak",
            type: "disaster",
            desc: "Turning main water on caused an ancient galvanized elbow fitting to crack. Emergency plumber called for repair.",
            cashDelta: -210,
            valueDelta: 0
        },
        {
            id: 'ev_hardware_sale',
            title: "Hardware Depot Clearance Blitz",
            type: "deal",
            desc: "The local contractor depot offered 25% off all lumber and fasteners today! Saved cash on job consumables.",
            cashDelta: 240,
            valueDelta: 0
        },
        {
            id: 'ev_inspection_pass',
            title: "City Building Inspection Passed",
            type: "reputation",
            desc: "City code officer praised the clean job site and proper electrical grounding! Official green tag posted.",
            cashDelta: 0,
            valueDelta: 1100
        },
        {
            id: 'ev_historic_feature',
            title: "Neighborhood Historical Feature",
            type: "market",
            desc: "A local architecture blogger showcased your restoration on social media, drawing buyer interest!",
            cashDelta: 0,
            valueDelta: 1600
        },
        {
            id: 'ev_dumpster_weight',
            title: "Overweight Dumpster Surcharge",
            type: "fee",
            desc: "Waste hauler assessed an overweight debris fee due to heavy cast iron and ceramic tile demo.",
            cashDelta: -115,
            valueDelta: 0
        },
        {
            id: 'ev_tool_loan',
            title: "Neighbor Tool Loan",
            type: "deal",
            desc: "A friendly retired general contractor across the street loaned you commercial scaffold and paint tarps for free!",
            cashDelta: 160,
            valueDelta: 400
        }
    ],

    // B&B BREAKFAST MENUS
    BREAKFAST_MENUS: [
        {
            id: 'continental',
            name: "Continental Porch Pastries & Drip Coffee",
            icon: "🥐",
            cost: 15,
            desc: "Flaky butter croissants, seasonal orchard marmalade & dark roast coffee on the veranda.",
            bonusRating: 0,
            tipMultiplier: 1.0,
            flavorQuote: "Crisp croissants and fresh coffee out on the morning veranda."
        },
        {
            id: 'dutch_baby',
            name: "Heritage Sourdough Dutch Baby & Mountain Berries",
            icon: "🫐",
            cost: 45,
            desc: "Puffed cast-iron skillet pancake dusted in powdered sugar with warm blackberry compote.",
            bonusRating: 15,
            tipMultiplier: 1.18,
            flavorQuote: "The puffed skillet Dutch baby pancake was pure breakfast art!"
        },
        {
            id: 'farmhouse_frittata',
            name: "Cast-Iron Farmhouse Frittata & Applewood Bacon",
            icon: "🍳",
            cost: 65,
            desc: "Farm eggs whisked with garden herbs, sharp cheddar, and thick-cut smoked applewood bacon.",
            bonusRating: 22,
            tipMultiplier: 1.25,
            flavorQuote: "Sizzling cast-iron frittata with thick applewood bacon hit every spot."
        },
        {
            id: 'lavender_scones',
            name: "Lavender Earl Grey Scones & Whispering Pines Tea",
            icon: "🫖",
            cost: 35,
            desc: "Crumbly lavender-infused scones with clotted cream and fragrant herbal loose-leaf tea.",
            bonusRating: 18,
            tipMultiplier: 1.20,
            flavorQuote: "Delicate lavender scones and loose-leaf tea made us feel like Victorian nobility."
        },
        {
            id: 'chef_barnaby_tuna',
            name: "Chef Barnaby's Gourmet Tuna Tartare & Golden Waffles",
            icon: "🐟",
            cost: 50,
            desc: "Whimsical feline culinary specialty: sushi-grade tuna cubes alongside golden Belgian waffles. Oversighted by Barnaby!",
            bonusRating: 25,
            tipMultiplier: 1.30,
            catJoyBonus: 25,
            flavorQuote: "Chef Barnaby purred beside our table as we enjoyed his signature tuna waffle breakfast!"
        }
    ],

    // B&B OVERNIGHT GUESTS & REVIEWS
    GUEST_ARCHETYPES: [
        {
            id: 'heritage_soc',
            title: "The Heritage Architecture Society",
            avatar: "🏛️",
            desc: "Historians and preservationists who scrutinize original woodwork, functioning fireplaces, and level 116-year-old pine floors.",
            favRooms: ['LivingRoom', 'Basement'],
            preferredBreakfast: ['farmhouse_frittata', 'lavender_scones'],
            nightlyRateRange: [280, 360],
            quirk: "Carries an antique magnifying glass to inspect mortise-and-tenon joints.",
            reviewCompliments: [
                "The 116-year-old quarter-sawn woodwork and level floors are breathtaking! True 1910 craftsmanship preserved.",
                "Fascinating restoration work. You can feel the 1910 history echoing through the parlor crown moldings."
            ],
            reviewComplaints: [
                "Unsettled foundation slopes and drafty baseboards detracted from the historical splendor.",
                "The floor still has a noticeable pitch in the parlor. More hydraulic jacking needed!"
            ]
        },
        {
            id: 'honeymooners',
            title: "The Romantic Weekend Honeymooners",
            avatar: "🥂",
            desc: "Couples looking for a peaceful antique getaway with luxury clawfoot soaking tubs, garden veranda coffee, and cozy fireplaces.",
            favRooms: ['Bathroom', 'Bedroom'],
            preferredBreakfast: ['dutch_baby', 'lavender_scones'],
            nightlyRateRange: [310, 420],
            quirk: "Spent 3 hours relaxing in the vintage clawfoot bathtub with lavender bath salts.",
            reviewCompliments: [
                "Pure romantic magic! We sipped tea on the wrap-around veranda and relaxed in the clawfoot tub.",
                "The master suite was an absolute dream. Warm, intimate, and steeped in Victorian romance."
            ],
            reviewComplaints: [
                "Water pressure in the bathroom was temperamental and the pipes clanked during our romantic evening.",
                "We loved the idea, but cold drafty rooms spoiled the cozy romantic retreat."
            ]
        },
        {
            id: 'cat_fanatics',
            title: "The Traveling Feline Enthusiasts",
            avatar: "🐾",
            desc: "Cat-loving tourists who book explicitly because Barnaby, Mochi, Rusty, and Jumper are the resident innkeeper mascots!",
            favRooms: ['LivingRoom', 'Exterior'],
            preferredBreakfast: ['chef_barnaby_tuna', 'dutch_baby'],
            nightlyRateRange: [260, 360],
            quirk: "Brought hand-knitted catnip mice and took 140 photos of Barnaby sleeping.",
            reviewCompliments: [
                "Barnaby fell asleep directly on our luggage and Mochi purred throughout breakfast! Best Bed & Breakfast on Earth!",
                "The four resident cats make this manor a paradise. Jumper's stair acrobats were better than any Broadway show!"
            ],
            reviewComplaints: [
                "The cats seemed aloof and Rusty kept knocking over our coffee mugs on the porch.",
                "Loved the house, but we wanted more snuggle time with the four innkeeper kitties!"
            ]
        },
        {
            id: 'ghost_hunters',
            title: "The Paranormal Heritage Society",
            avatar: "👻",
            desc: "Ghost hunters investigating 116-year-old legends. Thrilled by creaky old floorboards, midnight cupola noises, and cellar drafts.",
            favRooms: ['RoofAttic', 'Basement'],
            preferredBreakfast: ['chef_barnaby_tuna', 'continental'],
            nightlyRateRange: [250, 350],
            quirk: "Brought an EMF detector, thermal night-vision scope, and spirit box to dinner.",
            reviewCompliments: [
                "We detected astonishing EVP anomalies in the attic cupola at 3 AM! Unforgettable atmospheric stay!",
                "The creaky vintage floorboards and mysterious shadows provided the spine-tingling thrill we craved."
            ],
            reviewComplaints: [
                "The manor felt too modern and well-lit—not enough eerie vintage gloom for a proper haunting investigation.",
                "Jumper was the only phantom prowling the halls at midnight. Mildly disappointing ghost readings."
            ]
        },
        {
            id: 'foodies',
            title: "The Gourmet Country Foodies",
            avatar: "🥞",
            desc: "Culinary travelers here for fresh scones, cast-iron skillet dishes, and espresso in the restored country kitchen.",
            favRooms: ['Kitchen', 'BreakfastNook', 'LivingRoom'],
            preferredBreakfast: ['dutch_baby', 'farmhouse_frittata'],
            nightlyRateRange: [290, 390],
            quirk: "Inspected the seasoning on the vintage Griswold cast-iron skillets before eating.",
            reviewCompliments: [
                "Breakfast was Michelin-caliber country perfection! The restored kitchen is an epicurean triumph.",
                "Warm, flaky breakfast served in the sunlit dining parlor—every bite tasted of heirloom farm craft."
            ],
            reviewComplaints: [
                "Continental fare was passable, but we expected artisan country sourdough and estate coffee.",
                "The kitchen prep felt rushed. More gourmet dedication needed for true foodie status."
            ]
        },
        {
            id: 'eco_trekkers',
            title: "The Eco-Conscious Nature Trekkers",
            avatar: "🌿",
            desc: "Environmentalists hiking nearby pine trails who applaud clean solar/wind power, garden mulching, and lead-free plumbing.",
            favRooms: ['Exterior', 'Garage'],
            preferredBreakfast: ['continental', 'lavender_scones'],
            nightlyRateRange: [270, 350],
            quirk: "Tracked the manor's green power generation on their smartphone during breakfast.",
            reviewCompliments: [
                "Zero-emission solar generators, organic mulched gardens, and crisp clean water—sustainable historic hospitality!",
                "A breath of fresh pine air. The wrap-around grounds and eco-conscious upgrades are inspiring."
            ],
            reviewComplaints: [
                "Construction debris cluttering the grounds and noisy equipment undermined the serene green retreat.",
                "We noticed non-insulated pipe runs and unnecessary grid reliance. Needs higher eco-efficiency."
            ]
        },
        {
            id: 'mystery_novelist',
            title: "The Traveling Victorian Mystery Novelist",
            avatar: "✍️",
            desc: "An author seeking dramatic inspiration; adores rainy afternoons, clawfoot desks, crackling fireplaces, and purring cats.",
            favRooms: ['LivingRoom', 'Bedroom'],
            preferredBreakfast: ['lavender_scones', 'dutch_baby'],
            nightlyRateRange: [290, 380],
            quirk: "Typed 22 pages of a murder mystery while Rusty dozed contentedly on the mahogany desk.",
            reviewCompliments: [
                "I finished three chapters by the parlor hearth while Barnaby warmed my feet! Atmospheric perfection.",
                "The antique ambiance, stained glass lighting, and silent pine forest are a writer's paradise."
            ],
            reviewComplaints: [
                "Loud banging from uncompleted renovation tasks broke my creative flow during crucial plot twists.",
                "Drafty window jambs chilled my typing fingers. Seal those historic sash windows!"
            ]
        },
        {
            id: 'tech_exec',
            title: "The Burned-Out Tech Executive",
            avatar: "💼",
            desc: "High-earning urbanite seeking complete digital detox, porch rocking chairs, soundproof serenity, and feline therapy.",
            favRooms: ['Bedroom', 'Bathroom'],
            preferredBreakfast: ['farmhouse_frittata', 'dutch_baby'],
            nightlyRateRange: [350, 460],
            quirk: "Turned phone to airplane mode for 48 hours and fell asleep in the parlor armchair.",
            reviewCompliments: [
                "Best $900 I ever spent. No Slack notifications, just peaceful Victorian porches and purring orange cats.",
                "The clawfoot bath and hearty farmhouse breakfast melted away two years of corporate burnout."
            ],
            reviewComplaints: [
                "The creaky sagging foundation woke me up every time the wind gusted. Needed deeper quiet.",
                "Plumbing clanking and unfinished trim didn't deliver the luxury sanctuary promised."
            ]
        }
    ],

    // Backward-compatible alias
    BUYER_ARCHETYPES: [
        {
            title: "The Heritage Architecture Society",
            avatar: "🏛️",
            desc: "Historians and preservationists who adore original woodwork, functioning fireplaces, and level 116-year-old pine floors.",
            favRooms: ['LivingRoom', 'Basement'],
            bidMultiplier: [0.96, 1.05]
        }
    ],

    // THE 4 CATS WHO LIVE ON SITE & CAUSE CONSTANT PROBLEMS
    CATS: [
        {
            id: 'barnaby',
            name: "Barnaby",
            title: "The 18-lb Orange Chonk",
            avatar: "🐱",
            color: "#f97316",
            personality: "Lazy heavy sleeper who wedges himself into open wall framing, knocks over paint cans, and sits directly on architectural blueprints.",
            favoriteMischief: "Climbing into freshly opened drywall cavities right before the insulation crew arrives.",
            currentRoom: 'LivingRoom',
            hunger: 50,
            affection: 60
        },
        {
            id: 'mochi',
            name: "Mochi",
            title: "The Inquisitive Calico",
            avatar: "🐈",
            color: "#ec4899",
            personality: "Curious wanderer who loves testing freshly applied wet finishes with her paws. Polyurethane, grout, wet paint, and cement are her canvas.",
            favoriteMischief: "Leaving a permanent trail of tiny paw prints across the freshly stained red oak hardwoods.",
            currentRoom: 'Exterior',
            hunger: 40,
            affection: 70
        },
        {
            id: 'rusty',
            name: "Rusty",
            title: "The Scrappy One-Eared Tuxedo",
            avatar: "😼",
            color: "#64748b",
            personality: "Obsessive collector of job site supplies. Steals measuring tapes, rolls of blue painter's tape, and swats at live wire fish tape.",
            favoriteMischief: "Dragging the 25-ft tape measure beneath the floorboards and batting drywall screws under baseboards.",
            currentRoom: 'Basement',
            hunger: 60,
            affection: 45
        },
        {
            id: 'jumper',
            name: "Jumper",
            title: "The Flying Void (Black Cat)",
            avatar: "🐈‍⬛",
            color: "#a855f7",
            personality: "Hyperactive acrobat who perches on exposed ceiling joists and leaps down onto unsuspecting plumbers and electricians.",
            favoriteMischief: "Leaping from a ceiling rafter onto the back of a subcontractor holding a bucket of joint compound.",
            currentRoom: 'RoofAttic',
            hunger: 55,
            affection: 80
        }
    ],

    // ROOM-SPECIFIC ANTICS & MISCHIEF FOR THE 4 WANDERING CATS
    CAT_ROOM_ANTICS: {
        barnaby: {
            RoofAttic: "Basking on the warm sunlit floorboards beneath the heritage cupola.",
            Bedroom: "Sleeping like an 18-lb log right in the center of the restored guest bed quilt.",
            Bathroom: "Squeezing his hefty orange frame into the vintage clawfoot soaking tub.",
            LivingRoom: "Doorknob-napping directly across the warm marble fireplace rug.",
            Kitchen: "Staring intently at the breakfast skillet, willing thick sausages to fall.",
            BreakfastNook: "Sprawled across the velvet banquette cushions directly in the morning sunbeam, snoring softly beside the empty biscuit basket.",
            PlumbingHVAC: "Resting against the warm PEX manifold lines like a private feline sauna.",
            Basement: "Soundly asleep inside an empty drywall screw box beside the hydraulic jacks.",
            Sunroom: "Sound asleep in the reclined flight cockpit pilot seat, using the HOTAS throttle quadrant as a chin rest.",
            Exterior: "Lazing on the wrap-around veranda balustrade, solemnly judging joggers.",
            Garage: "Dozing atop three 50-lb bags of concrete mix in the carriage house workshop.",
            TempShop: "Curled up in a deep coma inside a cardboard box of clean cotton shop rags beside the maple workbench.",
            WoodShed: "Wedged like a furry 18-lb orange loaf between two stacks of air-drying 4x6 Douglas fir beams."
        },
        mochi: {
            RoofAttic: "Peeking through antique eave grates at nesting robins in the pine trees.",
            Bedroom: "Kneading biscuits on the vintage velvet curtains with pinpoint artisan precision.",
            Bathroom: "Curiously batting at stray water droplets around the copper shower drain.",
            LivingRoom: "Testing freshly applied floor wax with tiny, perfect calico paw prints.",
            Kitchen: "Perched atop the butcher-block prep island, inspecting warm blueberry muffins.",
            BreakfastNook: "Perched delicately on the walnut pedestal table, sniffing warm steam rising from the espresso machine portafilter.",
            PlumbingHVAC: "Sniffing copper elbow fittings and swaging tools with twitching whiskers.",
            Basement: "Supervising fieldstone mortar repointing from atop a stack of cedar shims.",
            Sunroom: "Basking on the warm solar glare ledge right above the triple curved gaming monitors, watching flight telemetry.",
            Exterior: "Stalking garden crickets along Mr. Henderson's pristine laser-edged boundary line.",
            Garage: "Prowling along the hood of the antique lawn tractor, hunting sawdust motes.",
            TempShop: "Walking delicately along the smooth aluminum fence of the sliding miter saw, inspecting golden sawdust.",
            WoodShed: "Hunting sun lizards basking on the warm corrugated steel siding of the lumber shed."
        },
        rusty: {
            RoofAttic: "Batting at an antique square-cut roofing nail he smuggled up from the cellar.",
            Bedroom: "Hiding a stolen pencil and a 25-ft tape measure beneath the artisan wool rug.",
            Bathroom: "Aggressively wrestling the rubber drain plug chain in the pedestal sink.",
            LivingRoom: "Unrolling three yards of green painter's tape across the floor and tangling himself.",
            Kitchen: "Testing the magnetic cabinet door catches with stubborn one-eared headbutts.",
            BreakfastNook: "Hidden under the bench storage lid, poking a curious tuxedo paw through the seat gap to bat at tablecloth fringe.",
            PlumbingHVAC: "Trying to chew on the blue cold-water PEX tubing (promptly shooed away!).",
            Basement: "Patrolling the stone cellar perimeter for 19th-century phantom mice.",
            Sunroom: "Swatting furiously at the braided joystick cables dangling beneath the tilt table mechanism.",
            Exterior: "Taunting Mr. Henderson's robotic lawn mower from the high porch stairs.",
            Garage: "Hoarding shiny galvanized deck screws inside an empty lacquer can.",
            TempShop: "Batting at shiny metal shavings beneath the welding bench and trying to carry off a 6-inch steel rule.",
            WoodShed: "Scraping his claws enthusiastically against the rough-sawn bark of unplaned white oak logs."
        },
        jumper: {
            RoofAttic: "Perched on the highest 25-ft collar tie rafter, surveying his shadowy kingdom.",
            Bedroom: "Vaulting from the closet shelf onto the top of the 8-foot antique armoire.",
            Bathroom: "Performing athletic wall-spring gymnastics off the subway tile shower surround.",
            LivingRoom: "Speed-skating across the polished quarter-sawn oak floorboards during 2 AM zoomies.",
            Kitchen: "Acrobatically leaping onto the top of the upper shaker glass cabinets.",
            BreakfastNook: "High atop the leaded glass bay window sill, chattering excitedly at morning finches in the garden shrubs.",
            PlumbingHVAC: "Leaping over the flexible ductwork transitions with Olympic gymnastics flair.",
            Basement: "Darting between foundation jack posts like a high-speed obstacle course.",
            Sunroom: "Perched triumphantly atop the overhead cockpit switch console, flicking the master armed toggles with his tail!",
            Exterior: "Executing mid-air twist leaps catching evening moths along the veranda lanterns.",
            Garage: "Perched on the carriage house rafters, ready to pounce onto the workbench.",
            TempShop: "Perched atop the tall cyclone dust collector barrel, waiting to leap onto anyone rolling a cart.",
            WoodShed: "Sprint-leaping from the top lumber tier up into the shed roof trusses to chase roosting barn sparrows."
        }
    },

    // NEIGHBOR RELATIONS & DISPUTES
    NEIGHBORS: {
        id: 'mr_henderson',
        name: "Mr. Henderson",
        avatar: "👴🏻",
        role: "Next-Door Retired Aerospace Inspector",
        desc: "Owns a laser-level lawn ruler and keeps a logbook of every delivery truck, saw noise, and overhanging leaf.",
        relationScore: 50, // 0 = Nemesis / City Council Petitions, 100 = Friendly Pie-Baking Ally
        fenceLineDispute: true,
        overhangingTreeDispute: true
    },

    // LUCKY LOU'S JUNKYARD & SCRAP SALVAGE FINDS
    JUNKYARD_LOOT: [
        {
            id: 'salvage_clawfoot',
            name: "Victorian Cast Iron Clawfoot Tub",
            rarity: "Legendary",
            icon: "🛁",
            desc: "Found submerged under rusted fenders! Heavy 300-lb porcelain-lined cast iron with ornate lion paw feet.",
            unlocksTask: 'salvage_tub',
            scrapValue: 350,
            restoreCost: 380,
            installValue: 3800
        },
        {
            id: 'salvage_barnwood',
            name: "1880s Hand-Hewn White Oak Beam",
            rarity: "Rare",
            icon: "🪵",
            desc: "Salvaged from a demolished textile mill. Perfect dimensions for a rustic fireplace mantel in the living room.",
            unlocksTask: 'salvage_mantel',
            scrapValue: 200,
            restoreCost: 140,
            installValue: 2600
        },
        {
            id: 'salvage_stained_glass',
            name: "Leaded Floral Stained Glass Transom",
            rarity: "Rare",
            icon: "🖼️",
            desc: "Intact beveled glass in aged cypress frame. Incredible curb appeal over the front entry.",
            unlocksTask: 'salvage_transom',
            scrapValue: 180,
            restoreCost: 110,
            installValue: 2100
        },
        {
            id: 'salvage_copper_wire',
            name: "Heavy Copper Cable & Pipe Spool",
            rarity: "Uncommon",
            icon: "🪙",
            desc: "Clean scrap copper piping and conduit. Instant cash payout or plumbing material credit!",
            scrapValue: 290,
            restoreCost: 0,
            installValue: 0,
            isCashInstant: true
        },
        {
            id: 'salvage_brass_light',
            name: "Mid-Century Brass Sputnik Chandelier",
            rarity: "Uncommon",
            icon: "💡",
            desc: "A dusty 1960s 12-arm brass chandelier. Just needs new wiring sockets to look like a $1,500 designer fixture.",
            unlocksTask: 'salvage_chandelier',
            scrapValue: 140,
            restoreCost: 85,
            installValue: 1600
        },
        {
            id: 'salvage_cat_tower',
            name: "Industrial Sisal Cat Climbing Gym",
            rarity: "Common",
            icon: "🏰",
            desc: "Heavy-duty commercial carpet scratching tower. Distracts Barnaby, Mochi, Rusty, and Jumper from your trim work!",
            scrapValue: 40,
            restoreCost: 30,
            installValue: 0,
            isCatItem: true
        },
        {
            id: 'salvage_radiator',
            name: "Embossed Cast Iron Radiator Cover",
            rarity: "Common",
            icon: "📻",
            desc: "Decorative floral cast iron panel. Great vintage architectural showpiece.",
            scrapValue: 110,
            restoreCost: 45,
            installValue: 750
        },
        {
            id: 'salvage_pallet_wood',
            name: "Stack of Reclaimed Cedar Pallets",
            rarity: "Common",
            icon: "📦",
            desc: "Weathered gray cedar planks. Ready to be planed and mounted for a trendy rustic master bedroom feature wall.",
            unlocksTask: 'salvage_accent_wall',
            scrapValue: 50,
            restoreCost: 60,
            installValue: 1200
        },
        {
            id: 'salvage_mulcher_motor',
            name: "Industrial 5-HP Electric Chipper Motor",
            rarity: "Uncommon",
            icon: "⚙️",
            desc: "Heavy-duty 220V continuous-duty motor recovered from a dismantled wood mill. The key power unit for building a backyard branch mulcher!",
            unlocksTask: 'tool_mulcher_build',
            scrapValue: 130,
            restoreCost: 65,
            installValue: 1400
        }
    ],

    // BONUS JUNKYARD RESTORATION TASKS
    SALVAGE_TASKS: [
        {
            id: 'salvage_tub',
            name: "Restore & Install Clawfoot Soaking Tub",
            room: 'Bathroom',
            desc: "Sandblast cast iron exterior, paint forest green, polish brass claw feet, and plumb vintage telephone faucet.",
            matCost: 380,
            subCost: 750,
            value: 3800,
            toolRequired: 'tool_pexcrimp',
            apCost: 2
        },
        {
            id: 'salvage_mantel',
            name: "Mount Hand-Hewn Barnwood Fireplace Mantel",
            room: 'LivingRoom',
            desc: "Plane top flat, hand-rub with tung oil, and mount with heavy-duty hidden steel rebar brackets.",
            matCost: 140,
            subCost: 380,
            value: 2600,
            toolRequired: 'tool_drill',
            apCost: 1
        },
        {
            id: 'salvage_transom',
            name: "Install Leaded Stained Glass Over Entry",
            room: 'Exterior',
            desc: "Build custom jamb casing, secure leaded glass transom above front door, and caulk airtight.",
            matCost: 110,
            subCost: 320,
            value: 2100,
            toolRequired: 'tool_drill',
            apCost: 1
        },
        {
            id: 'salvage_chandelier',
            name: "Rewire & Hang Mid-Century Brass Sputnik",
            room: 'LivingRoom',
            desc: "Rewire all 12 arms with modern UL wire, polish raw brass, and hang with dimmable Edison bulbs.",
            matCost: 85,
            subCost: 240,
            value: 1600,
            toolRequired: null,
            apCost: 1
        },
        {
            id: 'salvage_accent_wall',
            name: "Reclaimed Wood Bedroom Feature Wall",
            room: 'Bedroom',
            desc: "Rip cedar pallet planks, stagger seams, and blind-nail directly into studs for a high-end designer accent wall.",
            matCost: 60,
            subCost: 280,
            value: 1200,
            toolRequired: 'tool_drill',
            apCost: 1
        }
    ],

    // INTERACTIVE DILEMMAS & CHAOS PROBLEMS (CHOICE-DRIVEN TRADEOFFS)
    DILEMMAS: [
        // NEIGHBOR & CITY ORDINANCE PROBLEMS
        {
            id: 'prob_front_yard_ordinance',
            category: "neighbor",
            title: "City Ordinance Sec. 14-8: Front Lawn Construction Debris",
            icon: "📜",
            prompt: "A city code compliance officer pulled up to the front gate holding a clipboard. Mr. Henderson reported your open stacks of lumber, drywall scrap, scaffolding, and mortar tubs sitting on the front lawn in street view! Municipal ordinance bans front yard construction staging without screening. You have 24 hours to move everything to the backyard or face a $250 penalty!",
            choices: [
                {
                    text: "Spend 2 hours hauling all lumber & drywall staging into the privacy-fenced backyard",
                    cost: 0,
                    apCost: 1,
                    relationDelta: 25,
                    clutterDelta: -35,
                    valueDelta: 350,
                    log: "Hauled all construction materials into the backyard! Front lawn is spotless. Officer tore up the citation and Henderson waved approvingly."
                },
                {
                    text: "Hire two local helpers to move and stack all front yard supplies into the backyard",
                    cost: 65,
                    apCost: 0,
                    relationDelta: 20,
                    clutterDelta: -40,
                    valueDelta: 350,
                    log: "Paid helpers cleared the front yard in 45 minutes! Site is 100% ordinance-compliant."
                },
                {
                    text: "Argue that ongoing historical restorations are exempt and leave it on the front lawn",
                    cost: 0,
                    apCost: 0,
                    relationDelta: -35,
                    clutterDelta: 15,
                    valueDelta: 0,
                    hazardCash: -250,
                    log: "City inspector returned with a formal $250 ordinance violation fine! Henderson smiled triumphantly from his lawn chair."
                }
            ]
        },
        {
            id: 'prob_tree_fence',
            category: "neighbor",
            title: "Mr. Henderson's Great Fence & Branch Feud",
            icon: "🌳",
            prompt: "Mr. Henderson is standing at the property line with a laser distance meter. He claims your ancient oak branch hangs 14 inches over his flowerbed, and your boundary fence encroaches 2.3 inches onto his lot. He is threatening to report your dumpster to the City zoning board!",
            choices: [
                {
                    text: "Bake a peach cobbler & offer to trim the branch for him",
                    cost: 35,
                    apCost: 1,
                    relationDelta: 25,
                    clutterDelta: 0,
                    valueDelta: 300,
                    log: "Peace offering worked! Mr. Henderson ate the cobbler, lent you his pole saw, and dropped the fence dispute."
                },
                {
                    text: "Hire an official boundary surveyor & land attorney",
                    cost: 380,
                    apCost: 0,
                    relationDelta: -20,
                    clutterDelta: 0,
                    valueDelta: 600,
                    log: "Survey proved your fence is legally 1 inch inside YOUR lot. Henderson is furious but powerless."
                },
                {
                    text: "Ignore him and turn your power saw volume up",
                    cost: 0,
                    apCost: 0,
                    relationDelta: -40,
                    clutterDelta: 0,
                    valueDelta: 0,
                    hazardCash: -150, // City code officer arrives with a fine
                    log: "Henderson called city code compliance! An inspector issued a $150 street dumpster citation."
                }
            ]
        },
        {
            id: 'prob_7am_saw',
            category: "neighbor",
            title: "7:02 AM Tile Saw Noise Complaint",
            icon: "🪚",
            prompt: "You fired up the wet tile saw on the front porch at 7:02 AM. Mrs. Gable across the street came outside in her pink bathrobe holding a decibel meter app on her phone!",
            choices: [
                {
                    text: "Apologize profusely, move saw indoors, and promise 8:30 AM starts",
                    cost: 0,
                    apCost: 1,
                    relationDelta: 15,
                    clutterDelta: 10,
                    valueDelta: 0,
                    log: "Mrs. Gable appreciated the respect. Wet tile slurry indoors created extra cleanup clutter, however."
                },
                {
                    text: "Gift her noise-canceling earplugs and $20 local bakery gift card",
                    cost: 35,
                    apCost: 0,
                    relationDelta: 20,
                    clutterDelta: 0,
                    valueDelta: 200,
                    log: "Mrs. Gable loves croissants! She told the neighborhood association you are a thoughtful craftsman."
                },
                {
                    text: "Point at city municipal code showing 7:00 AM work is legal",
                    cost: 0,
                    apCost: 0,
                    relationDelta: -30,
                    clutterDelta: 0,
                    valueDelta: 0,
                    hazardCash: -90,
                    log: "Mrs. Gable called the non-emergency police line. Officers confirmed you are legal, but wasted 1.5 hours of your day."
                }
            ]
        },

        // 4 CATS CHAOS
        {
            id: 'prob_cat_paint',
            category: "cats",
            title: "Mochi's 'Artisan' Wet Polyurethane Paw Prints",
            icon: "🐾",
            prompt: "Mochi the calico slipped past the tape barrier into the living room while the third coat of satin polyurethane was drying. She danced across the center of the oak floor, leaving 14 distinct sticky paw prints!",
            choices: [
                {
                    text: "Sand down the center planks and re-coat with polyurethane",
                    cost: 90,
                    apCost: 1,
                    relationDelta: 0,
                    clutterDelta: 15,
                    valueDelta: 0,
                    log: "Repaired back to flawless glass finish. Mochi watched from the windowsill looking entirely unrepentant."
                },
                {
                    text: "Clean her paws and market it as 'Handmade Artisan Pet-Friendly Oak'",
                    cost: 0,
                    apCost: 0,
                    relationDelta: 0,
                    clutterDelta: 0,
                    valueDelta: 450, // Cute bonus for animal-loving buyers!
                    log: "Genius marketing! First-time buyers thought the paw prints were an intentional charming vintage quirk (+ $450 Value)!"
                },
                {
                    text: "Cover the paw prints with a $40 salvage jute area rug",
                    cost: 40,
                    apCost: 0,
                    relationDelta: 0,
                    clutterDelta: 0,
                    valueDelta: 100,
                    log: "Threw a stylish bohemian jute rug over the prints. Out of sight, out of mind!"
                }
            ]
        },
        {
            id: 'prob_cat_wall',
            category: "cats",
            title: "Barnaby Trapped Behind Kitchen Drywall",
            icon: "🐱",
            prompt: "You finished screwing in 12 sheets of drywall in the kitchen when you heard muffled, indignant meows coming from INSIDE the wall stud bay behind the refrigerator nook. Barnaby took a nap inside the wall!",
            choices: [
                {
                    text: "Carefully cut an inspection hatch and lure him out with tuna",
                    cost: 25,
                    apCost: 1,
                    relationDelta: 0,
                    clutterDelta: 15,
                    valueDelta: 0,
                    log: "Barnaby strutted out covered in fiberglass dust, ate the tuna, and went back to sleep. Patched the hatch with spackle."
                },
                {
                    text: "Tear down the whole bottom sheet of drywall in a panic",
                    cost: 65,
                    apCost: 1,
                    relationDelta: 0,
                    clutterDelta: 25,
                    valueDelta: 0,
                    log: "Drywall ruined and replaced. Barnaby looked mildly annoyed that you interrupted his peaceful wall slumber."
                }
            ]
        },
        {
            id: 'prob_rusty_screws',
            category: "cats",
            title: "Rusty Hid the Fasteners & Measuring Tape",
            icon: "😼",
            prompt: "Rusty the one-eared tuxedo tipped over a sorting bin containing 500 drywall screws, galvanized nails, and wire nuts. He then bolted out of the room holding your only 25-ft tape measure in his jaws!",
            choices: [
                {
                    text: "Spend an hour crawling around with a magnetic sweeper and searching for the tape",
                    cost: 0,
                    apCost: 1,
                    relationDelta: 0,
                    clutterDelta: -10,
                    valueDelta: 0,
                    log: "Recovered 90% of screws and found the tape measure under the clawfoot tub with tooth puncture marks."
                },
                {
                    text: "Buy a new tape measure and replacement screw pack at the store",
                    cost: 48,
                    apCost: 0,
                    relationDelta: 0,
                    clutterDelta: 10,
                    valueDelta: 0,
                    log: "Brand new tape measure acquired. Rusty promptly swatted at the shiny new metal hook."
                }
            ]
        },
        {
            id: 'prob_jumper_drop',
            category: "cats",
            title: "Jumper's Parachute Drop Onto the Tile Installer",
            icon: "🐈‍⬛",
            prompt: "A tile contractor was meticulously leveling expensive bathroom wall tiles when Jumper (the black void) leaped off a high ceiling rafter right onto his shoulders! The contractor dropped a full trowel of wet mortar into his toolbox!",
            choices: [
                {
                    text: "Apologize, clean his tools, and pay him a $75 'Hazard Cat' tip",
                    cost: 75,
                    apCost: 1,
                    relationDelta: 0,
                    clutterDelta: 10,
                    valueDelta: 200,
                    log: "Contractor laughed it off after the tip and pet Jumper behind the ears. Tile work completed smoothly."
                },
                {
                    text: "Tell him Jumper is the official project inspector and quality tester",
                    cost: 0,
                    apCost: 0,
                    relationDelta: 0,
                    clutterDelta: 15,
                    valueDelta: 0,
                    hazardCash: -120, // Contractor charges extra cleanup hour
                    log: "Contractor was not amused and added a $120 tool cleanup surcharge to his final invoice."
                }
            ]
        },

        // ORGANIZATION & JOB SITE CHAOS
        {
            id: 'prob_site_clutter',
            category: "organization",
            title: "Tool Avalanche & Scrap Pile Overload",
            icon: "📦",
            prompt: "The job site has degenerated into absolute anarchy! Empty cardboard boxes, power cord spaghetti, discarded PVC shavings, and half-empty joint compound buckets are blocking the hallways. You can't find your impact driver and tripped over an air hose!",
            choices: [
                {
                    text: "Take a full work phase to deep-clean, sort bins, and roll up hoses",
                    cost: 15,
                    apCost: 1,
                    relationDelta: 10,
                    clutterDelta: -50,
                    valueDelta: 400,
                    log: "Job site looks like a professional HGTV set! In the cleanup, you found $45 in loose change dropped by workers!"
                },
                {
                    text: "Rent an emergency 20-yard roll-off dumpster exchange",
                    cost: 140,
                    apCost: 0,
                    relationDelta: 5,
                    clutterDelta: -75,
                    valueDelta: 600,
                    log: "Hauled 2,000 lbs of junk out in 20 minutes! Clean site boosted overall appraisal quality."
                },
                {
                    text: "Step over the pile and keep working anyway",
                    cost: 0,
                    apCost: 0,
                    relationDelta: -15,
                    clutterDelta: 20,
                    valueDelta: 0,
                    hazardCash: -110, // Dropped a box of brand-new light fixtures
                    log: "Tripped on a 2x4 and crushed a box of brand-new ceramic vanity lights (-$110 replacement cost)!"
                }
            ]
        },

        // PRIORITY & SEQUENCING BLUNDERS
        {
            id: 'prob_priority_roof_drywall',
            category: "priority",
            title: "Putting the Cart Before the Horse!",
            icon: "⚠️",
            prompt: "You hung pristine new drywall in the master bedroom before inspecting the valley flashing on the roof. Dark rain clouds are gathering fast, and water droplets are already beading on the ceiling drywall paper!",
            choices: [
                {
                    text: "Drop everything, climb on the roof with a 20x30 heavy tarp and 2x4s",
                    cost: 45,
                    apCost: 1,
                    relationDelta: 0,
                    clutterDelta: 5,
                    valueDelta: 0,
                    log: "Tarp secured just as the skies opened up! Drywall completely saved from water staining."
                },
                {
                    text: "Set up 5 plastic buckets and hope for light showers",
                    cost: 0,
                    apCost: 0,
                    relationDelta: 0,
                    clutterDelta: 15,
                    valueDelta: -400,
                    hazardCash: -180, // Drywall sagged and must be replaced
                    log: "Torrential rain saturated 3 drywall sheets, causing them to sag and peel tape seams (-$180 repair, -$400 value)."
                }
            ]
        }
    ],

    // ARCHIVAL PHOTO JOURNAL: Historic 1910 Photographs & Field Restoration Plates
        // ARCHIVAL PHOTO JOURNAL: Historic 1910 Photographs & Field Restoration Plates (Mapped by Section)
    PHOTO_JOURNAL: [
        {
            id: 'pj_60ton_settle', room: 'Basement', taskId: 'found_survey',
            title: "The 60-Ton Structural Settlement & 3.5-Inch Drop",
            date: "Field Survey Day 1",
            category: "Structural Inspection",
            badge: "Archival Plate #01",
            photoType: "field_sag",
            caption: "Optical transit level showing 3.5 inches of floor sag toward the center cellar.",
            summary: "Laser level and transit survey measuring the 60-ton dead weight settlement across the parlor.",
            literature: "A complete dead-load calculation confirms Whispering Pines Manor weighs approximately 120,000 pounds (60 tons). The entire central gravity load bears down upon a single 10x12 center girder resting on un-mortared fieldstone piles and rotting cedar stumps. Over 116 years, the cedar compressed into the damp subsoil, tilting the parlor floors by a jarring 3.5 inches and wedging every walnut pocket door tightly into its tracks."
        },
        {
            id: 'pj_jacks_cribbing', room: 'Basement', taskId: 'found_jack',
            title: "The Four 20-Ton Hydraulic Jacks & Oak Cribbing",
            date: "Foundation Day 5",
            category: "Hydraulic Leveling",
            badge: "Field Survey #02",
            photoType: "field_jacks",
            caption: "Four synchronized 20-ton bottle jacks and 6x6 oak cribbing towers in the cellar.",
            summary: "Hydraulic manifold and dial gauges lifting the sistered flitch beam off the bedrock.",
            literature: "Underneath the manor in the sub-cellar, four commercial 20-ton hydraulic bottle jacks (providing 80 tons of total lifting capacity) are seated atop 6x6 white oak box cribbing. Dial gauges monitor 1/8-inch increments per lift cycle, allowing the massive 60-ton frame to be gently coaxed back to plumb level without racking the upper roof rafters."
        },
        {
            id: 'pj_1910_build', room: 'LivingRoom', taskId: 'living_floor',
            title: "1910 Original Construction Archive: Old-Growth Framing",
            date: "October 14, 1910",
            category: "Historical Archive",
            badge: "Archival Plate #03",
            photoType: "sepia",
            caption: "Lumber baron framing crew hoisting 12x12 virgin Douglas fir center beams.",
            summary: "Archival photograph uncovered in county records showing the 1910 Vance timber framing crew with crosscut saws, broadaxes, and draft horses.",
            literature: "Whispering Pines Manor was commissioned in 1910 by timber magnate Thaddeus Vance. The frame was erected exclusively with tight-grained virgin old-growth Douglas fir and white oak harvested from ancient regional forests. Ring counts on exposed floor joists reveal 35 to 45 growth rings per inch—over triple the density of modern plantation lumber. This makes the timbers virtually impervious to rot, but extraordinarily heavy and rock-hard to drive nails into."
        },
        {
            id: 'pj_plaster_demo', room: 'LivingRoom', taskId: 'found_gut_plaster',
            title: "Tearing Out 1,100-lb Plaster Walls Before Raising",
            date: "Demo Phase Day 3",
            category: "Deconstruction & Demo",
            badge: "Field Survey #04",
            photoType: "field_plaster",
            caption: "Demolishing horsehair lime plaster & lath down to bare virgin studs.",
            summary: "Tons of heavy plaster rubble shoveled into chutes to de-weight the 60-ton structure before jacking.",
            literature: "Historical architectural analysis reveals that each interior wall cavity in the manor carries approximately 1,100 pounds of heavy 3-coat horsehair lime plaster over hand-split cedar lath. Across the main floor, the plaster alone represents over 12 tons of brittle dead weight! Structural engineering laws dictate: NEVER raise a settled 60-ton timber house with plaster intact. Stripping the walls down to bare old-growth studs sheds crucial weight."
        },
        {
            id: 'pj_resident_cats', room: 'LivingRoom', taskId: 'living_trim',
            title: "The 4 Job-Site Cats on Old-Growth Timbers",
            date: "Resident Companions",
            category: "Cat Companions",
            badge: "Feline Archive #05",
            photoType: "field_cats",
            caption: "Barnaby, Mochi, Rusty, and Jumper inspecting the 1910 blueprint drafting desk.",
            summary: "Archival snapshots of the 4 resident cats who supervise every phase of the restoration.",
            literature: "No restoration log is complete without the 4 resident felines: Barnaby (18-lb orange sleeper wedged into framing), Mochi (calico paw-print artist on freshly cured poly), Rusty (one-eared tuxedo tape measure thief), and Jumper (the black void executing ceiling rafter jumps). While they cause occasional havoc, their presence gives Whispering Pines its warm, unforgettable Bed & Breakfast soul."
        },
        {
            id: 'pj_cupola_slate', room: 'RoofAttic', taskId: 'roof_cupola',
            title: "Victorian Slate Roofing & Arched Cupola",
            date: "Exterior Restoration",
            category: "Roofing & Facade",
            badge: "Archival Plate #06",
            photoType: "field_roof",
            caption: "Scalloped Pennsylvania slate tiles, copper roof valleys, and heritage rooster weathervane.",
            summary: "Hand-quarried 1910 scalloped slate tiles restored 32 feet above the Whispering Pines grounds.",
            literature: "At the pinnacle of Whispering Pines Manor stands the architectural crown: an arched octagonal viewing cupola flanked by Pennsylvania scalloped black slate and 16-oz soldered copper valleys. Designed in 1910 to offer panoramic 360-degree views of the timber basin, the cupola was where the estate's original owner monitored logging trains."
        },
        {
            id: 'pj_roof_framing', room: 'RoofAttic', taskId: 'roof_slate_copper',
            title: "Attic Timber Trussing & Cupola Observatory",
            date: "Tower Structural Survey",
            category: "Roofing & Timber Framing",
            badge: "Archival Plate #07",
            photoType: "field_roof",
            caption: "Mortise-and-tenon old-growth collar ties and curved cupola rafters 32 feet high.",
            summary: "Cathedral attic framing showcasing virgin Douglas fir rafters and solid brass lightning rods.",
            literature: "Inspecting the attic reveals hand-hewn virgin fir rafters measuring 3x8 inches with mortise-and-tenon collar ties. Unlike modern trussed 2x4s, this century-old roof was engineered to support over 18,000 lbs of heavy natural slate plus heavy mountain snow loads. The cupola's arched dormers feature leaded diamond glass panes and hand-forged copper ridge caps."
        },
        {
            id: 'pj_kitchen_hearth', room: 'Kitchen', taskId: 'kit_range',
            title: "Country Kitchen Hearth & Commercial Cookstove Flue",
            date: "Culinary Wing Day 4",
            category: "Kitchen & Masonry",
            badge: "Archival Plate #08",
            photoType: "field_interior",
            caption: "Rebuilt fireclay chimney flue, exposed virgin fir ceiling beams, and butcher block prep island.",
            summary: "Historical masonry hearth restoration designed to support commercial B&B morning breakfast operations.",
            literature: "The heart of Whispering Pines B&B is the 1910 commercial kitchen. Centered around a massive dual-flue brick hearth once used for a cast-iron woodstove, the chimney was repointed with refractory mortar and lined with stainless flue sleeves to power a high-BTU gas range. Original fir ship-lap walls were uncovered behind 1970s paneling and treated with food-grade pure tung oil."
        },
        {
            id: 'pj_breakfast_nook', room: 'BreakfastNook', taskId: 'nook_banquette',
            title: "The Morning Breakfast Nook & Leaded Bay Alcove",
            date: "Hospitality Day 8",
            category: "Dining & Woodwork",
            badge: "Field Survey #09",
            photoType: "field_interior",
            caption: "Custom curved oak banquette, restored 1910 leaded glass bay alcove, and artisan espresso bar.",
            summary: "Sun-drenched morning breakfast alcove off the country kitchen paired with Victorian solarium garden views.",
            literature: "Bathed in warm golden morning light filtering through 1910 leaded glass bay sashes, the Morning Breakfast Nook serves as the culinary heartbeat of the B&B. Featuring hand-scribed white oak curved banquette seating, an artisan espresso bar with authentic brass wall mill, and a solid walnut pedestal table, it provides an intimate space for morning guests to savor Dutch baby pancakes."
        },
        {
            id: 'pj_cockpit_rig', room: 'Sunroom', taskId: 'sun_rig_build',
            title: "The Sun Room Cockpit & 3-DOF Tilt Motion Rig",
            date: "Command Center Day 7",
            category: "Simulation & Glass",
            badge: "Field Survey #10",
            photoType: "field_cockpit",
            caption: "Motorized 3-DOF tilt table, Recaro bucket flight seat, dual HOTAS joysticks, and overhead console in the 1910 glass solarium.",
            summary: "Jack's high-tech gaming command center fabricated inside the vintage 1910 curved glass sun room.",
            literature: "Bridging 116 years of heritage woodwork with cutting-edge simulation engineering, the Victorian Sun Room was transformed into the estate's primary Command Center. Anchored by an industrial 3-DOF motorized tilt table frame capable of full pitch, roll, and yaw deflection, the rig houses dual magnetic hall-sensor joysticks, a pneumatic Recaro flight seat with tactile bass transducers, and an authentic overhead cockpit toggle console."
        },
        {
            id: 'pj_tempshop_bay', room: 'TempShop', taskId: 'shop_build_bench',
            title: "Laminated Hard Maple Workbench & Cyclone Dust Bay",
            date: "Shop Setup Day 2",
            category: "Fabrication Facility",
            badge: "Field Survey #11",
            photoType: "field_shop",
            caption: "4-inch thick laminated rock maple benchtop, 12-inch sliding miter station, and HEPA dust ducting.",
            summary: "In-house timber milling and metal fabrication workshop staged directly inside the manor.",
            literature: "To restore 116-year-old moldings and fabricate custom steel flitch brackets without costly off-site mill delays, Jack converted a spacious ground-floor bay into an in-house fabrication facility. Featuring a 400-lb laminated rock maple bench, magnetic TIG welding station, and overhead cyclone dust collector, this workshop allows virgin old-growth fir to be resawn and profiled directly on site."
        },
        {
            id: 'pj_woodshed_stacks', room: 'WoodShed', taskId: 'shed_timber_frame',
            title: "Exterior Timber Shed & Old-Growth Seasoning Stacks",
            date: "Outbuilding Day 6",
            category: "Lumber Storage",
            badge: "Field Survey #12",
            photoType: "field_shed",
            caption: "Cantilever timber storage racks, gravel French drain floor, and solar kiln circulation fans.",
            summary: "Exterior post-and-beam seasoning shed protecting salvaged 1910 virgin logs from rain and snow.",
            literature: "Old-growth fir salvaged from demoed walls must be carefully seasoned to 8-10% equilibrium moisture content before milling into flooring or cabinets. The exterior wood shed features wide corrugated roof overhangs, heavy timber post-and-beam framing, and solar-powered circulation fans to season over 2,000 board feet of irreplaceable architectural timber safely away from weather."
        },
        {
            id: 'pj_bath_clawfoot', room: 'Bathroom', taskId: 'bath_tub',
            title: "Restored 450-lb Cast Iron Clawfoot Tub & Marble Mosaic",
            date: "Plumbing Day 9",
            category: "Bath Fixtures",
            badge: "Archival Plate #13",
            photoType: "field_bath",
            caption: "Re-enameled 1910 cast iron soaking tub, brass exposed shower riser, and uncoupling waterproof membrane.",
            summary: "Structural subfloor reinforcement supporting a 450-lb vintage tub and waterproofed walk-in shower.",
            literature: "A 450-lb cast iron clawfoot tub filled with 60 gallons of water exerts over 950 lbs of point load. Prior to installation, the bathroom floor joists were doubled with structural LVL lumber and topped with 3/4-inch marine plywood and uncoupling waterproof membranes. The vintage porcelain enamel was wet-sanded and baked to a mirror sheen, complemented by solid unlacquered brass fittings."
        },
        {
            id: 'pj_bed_pocketdoors', room: 'Bedroom', taskId: 'bed_pocket_doors',
            title: "Heritage Guest Suites & Restored Walnut Pocket Doors",
            date: "Finish Carpentry Day 10",
            category: "Suites & Millwork",
            badge: "Archival Plate #14",
            photoType: "field_bedroom",
            caption: "Solid black walnut 8-foot pocket doors, cast brass trolley rollers, and quarter-sawn oak baseboards.",
            summary: "Restoration of historic 1910 guest suite dividing doors that were pinched tight by century-old settling.",
            literature: "When the manor settled 3.5 inches, the massive 8-foot walnut pocket doors were pinched immovable inside wall cavities. Following hydraulic leveling of the carrier beam, the wall pockets relaxed. The doors were removed, stripped of yellowed varnish, fitted with new ball-bearing brass trolleys, and finished in hand-rubbed Danish oil so they glide with the touch of a single finger."
        },
        {
            id: 'pj_ext_veranda', room: 'Exterior', taskId: 'ext_sandblast_ironwork',
            title: "40-Foot Veranda Cast Iron Railings & Garnet Sandblast Prep",
            date: "Facade Day 11",
            category: "Exterior & Grounds",
            badge: "Archival Plate #15",
            photoType: "field_veranda",
            caption: "Ornate Victorian acanthus leaf castings enveloped in heavy canvas media containment shrouds.",
            summary: "Stripping a century of peeling lead paint and rust off the wrap-around veranda railings.",
            literature: "The front veranda stretches 40 feet across the manor facade, crowned by ornamental cast-iron balusters and brackets. Enclosed inside heavy canvas drop cloths, the iron was stripped using 80-mesh garnet abrasive at 110 PSI, revealing pristine foundry markings from 1910. A multi-layer marine zinc primer and satin black enamel coat now seal the metal against rain and mountain winter frost."
        },
        {
            id: 'pj_garage_depot', room: 'Garage', taskId: 'garage_workbench',
            title: "Carriage House Workshop & Architectural Salvage Staging",
            date: "Depot Day 12",
            category: "Outbuildings & Salvage",
            badge: "Archival Plate #16",
            photoType: "field_garage",
            caption: "Detached carriage house featuring restored sliding barn doors and categorized salvage bins.",
            summary: "Historic carriage barn transformed into a staging depot for antique brass hardware and radiators.",
            literature: "Originally built to house horse carriages and early Model T motorcars, the detached carriage house was stabilized with collar ties and treated concrete piers. Today it acts as Jack's primary architectural salvage staging hub—holding restored cast iron radiators, vintage porcelain door knobs, antique mortise locks, and heavy timber salvage pulled from local demolitions."
        },
        {
            id: 'pj_plumb_pex', room: 'PlumbingHVAC', taskId: 'plumb_replace_lead_lines',
            title: "116-Year Toxic Lead Pipe Removal & PEX-A Manifold",
            date: "Mechanicals Day 13",
            category: "Mechanical Systems",
            badge: "Archival Plate #17",
            photoType: "field_plumbing",
            caption: "Corroded 1910 lead service lines replaced with commercial home-run PEX-A distribution manifold.",
            summary: "Full hazardous plumbing remediation bringing Whispering Pines Manor to potable water certification.",
            literature: "The manor's original water distribution system was a hazardous maze of corroded lead supply lines and brittle galvanized pipe with 80% mineral restriction. Plumbers cut out over 400 linear feet of toxic lead, installing an expansion PEX-A home-run manifold with dedicated shutoffs for every suite. Water flow jumped from 2.5 GPM to a robust 14 GPM at 65 PSI."
        }
    ],

    // VIDEO JOURNAL ARCHIVE (DOCUMENTARY LOGS & REELS)
        // VIDEO JOURNAL ARCHIVE (DOCUMENTARY LOGS & REELS - MAPPED BY SECTION)
    VIDEO_JOURNAL: [
        {
            id: 'vj_ep1', room: 'Basement', taskId: 'found_survey',
            episode: "Episode 1",
            title: "Lifting a 60-Ton 1910 Manor: The Structural Engineering",
            duration: "18:42",
            badge: "Engineering Special",
            literature: "In this comprehensive documentary log, Jack walks through the physics of lifting a 60-ton historic structure. We inspect the virgin old-growth timbers, calculate dead loads, examine the sagging fieldstone cellar, and outline the strict protocol for hydraulic leveling.",
            keyHighlights: [
                "Optical transit measurement of the 3.5-inch parlor slope",
                "Microscopic timber ring analysis: 40 rings/inch old-growth density",
                "Dial indicator placement on center carrier beams",
                "Why settling occurs over 116 years on un-mortared stone footings"
            ],
            status: "4K Remastered • Ready to Stream",
            scenes: [
                { time: "00:00", title: "Site Survey & Optical Transit Leveling", desc: "Setting up brass leveling scopes in the parlor to map the 3.5-inch structural floor sag." },
                { time: "05:12", title: "Microscopic Timber Ring Analysis", desc: "Core sampling virgin fir joists revealing 45 annual rings per inch vs modern commercial SPF." },
                { time: "11:30", title: "Cellar Fieldstone Compaction Physics", desc: "Exposing dry-stacked un-mortared stone footings that settled into mountain clay over 116 years." },
                { time: "16:05", title: "Jack's Bedrock Pier Engineering Plan", desc: "Calculations for four 20-ton synchronized hydraulic cylinders bolted to reinforced steel flitch plates." }
            ],
            transcript: [
                { speaker: "Jack", text: "Look at this laser line across the parlor wainscoting—it drops three and a half inches toward the hearth. That is 60 tons of virgin fir and slate roof settling into un-mortared fieldstone." },
                { speaker: "Hank (Subcontractor)", text: "If a rookie flipper laid tongue-and-groove hardwood over this now, every plank would cup and shear within six months. The center beam has to come up first." },
                { speaker: "Jack", text: "Right. That's why step one of our restoration roadmap is excavating down to limestone bedrock and sistering the carrier beams." }
            ]
        },
        {
            id: 'vj_ep2', room: 'LivingRoom', taskId: 'found_gut_plaster',
            episode: "Episode 2",
            title: "Why You MUST Tear Out 1,100-lb Plaster Walls Before Raising",
            duration: "14:15",
            badge: "Demo Masterclass",
            literature: "Jack demonstrates the critical de-weighting stage. With each partition wall carrying 1,100 lbs of dense horsehair plaster and lath, leaving walls intact during a house lift is a recipe for catastrophic failure. Watch the demo crew strip 12+ tons of debris before the jacks are pumped.",
            keyHighlights: [
                "Weighing actual plaster chunks on a hanging scale (1,100 lbs per wall)",
                "Exposing the 1910 diagonal rough bracing and pocket door pockets",
                "Preventing ceiling shearing and frame racking during hydraulic jacking",
                "Safe plaster disposal and dust containment protocols"
            ],
            status: "4K Remastered • Ready to Stream",
            scenes: [
                { time: "00:00", title: "The 1,100-lb Hanging Crane Scale Test", desc: "Rigging a commercial crane dynamometer to hoist and weigh an intact 8x10 lime plaster section." },
                { time: "04:10", title: "10-lb Sledgehammer Lath Key Technique", desc: "Striking along keyways to shear plaster cleanly without shattering vintage rough-sawn studs." },
                { time: "08:45", title: "Shedding 12 Tons of Dead Weight", desc: "Loading wheelbarrows into the 30-yard dumpster to relieve frame stress before the lift." },
                { time: "12:15", title: "Exposing 1910 Douglas Fir Balloon Framing", desc: "Revealing original diagonal wind braces and hand-hewn mortise pockets." }
            ],
            transcript: [
                { speaker: "Jack", text: "Watch this dial scale: this single partition section comes out to 1,100 pounds. People forget plaster is ground limestone, coarse sand, and horsehair binder. It is essentially concrete on your wall." },
                { speaker: "Hank", text: "Across twelve walls, that is over twelve tons of dead load. If you jack a house with that weight on the frame, the plaster keys shear and crash through the floorboards." },
                { speaker: "Jack", text: "Down it comes. Clean sledge work exposes the raw virgin fir studs, ready for our steel jacking shoring." }
            ]
        },
        {
            id: 'vj_ep3', room: 'Basement', taskId: 'found_jack',
            episode: "Episode 3",
            title: "Four 20-Ton Hydraulic Jacks & The 3.5-Inch Bedrock Lift",
            duration: "22:05",
            badge: "Hydraulic Special",
            literature: "The main structural event: pumping four synchronized 20-ton bottle jacks on solid oak cribbing to lift the 60-ton manor 3.5 inches back to true laser level. Jack monitors dial gauges and explains flitch plate reinforcement.",
            keyHighlights: [
                "Synchronized 4-cylinder hydraulic manifold and pressure gauges",
                "Listening to 116-year timbers groan as settling stress reverses",
                "Laser line crossing the parlor floor achieving 0.00° pitch",
                "Pouring 3,500 PSI reinforced concrete piers anchored into bedrock"
            ],
            status: "4K Remastered • Ready to Stream",
            scenes: [
                { time: "00:00", title: "Hydraulic Manifold & Oak Cribbing Setup", desc: "Positioning four 20-ton bottle jacks on stacked white oak timbers directly under the 10x12 carrier." },
                { time: "06:20", title: "The First 1/2-Inch Pump Cycle", desc: "Applying 4,000 PSI hydraulic pressure; timbers groan as 116 years of settling begins to reverse." },
                { time: "13:45", title: "Optical Transit Level Lock", desc: "Laser receiver beeps solid green as the parlor floor reaches dead plumb level." },
                { time: "18:10", title: "Drilling Flitch Plate Through-Bolts", desc: "Fastening two 1/2-inch structural steel flitch plates to permanently sandwich the carrier timber." }
            ],
            transcript: [
                { speaker: "Jack", text: "Pressure is up to 3,800 PSI on jack number two. Listen to that gentle creak—that is a century of stress relieving itself from the mortise joints." },
                { speaker: "Hank", text: "Laser receiver just went continuous tone. We've brought the center carrier up exactly 3.50 inches. Plumb, square, and level." },
                { speaker: "Jack", text: "Lock off the needle valves and slide in the steel shims. That center beam will never sag again." }
            ]
        },
        {
            id: 'vj_ep4', room: 'LivingRoom', taskId: 'living_trim',
            episode: "Episode 4",
            title: "4 Resident Cats vs. 100-Year-Old Historic Manor",
            duration: "11:50",
            badge: "Behind The Scenes",
            literature: "A lighthearted documentary look at the four resident cats—Barnaby, Mochi, Rusty, and Jumper. See how they inspect framing, steal tape measures, and create lovable chaos on a busy jobsite.",
            keyHighlights: [
                "Barnaby wedging his 18-lb orange frame into open stud bays",
                "Mochi leaving chalky paw prints across freshly cured hardwood poly",
                "Rusty bolting with Jack's only 25-ft Stanley tape measure",
                "Jumper leaping across attic collar ties like a roof acrobat"
            ],
            status: "4K Remastered • Ready to Stream",
            scenes: [
                { time: "00:00", title: "Morning Cat Attendance & Tool Check", desc: "Jack arrives on site to find Rusty sleeping in a box of 3-inch framing nails." },
                { time: "03:15", title: "Barnaby's Framing Nap Challenge", desc: "Attempting to install fiberglass batt insulation while an 18-lb tabby refuses to leave the cavity." },
                { time: "06:40", title: "The Polyurethane Paw-Print Incident", desc: "Mochi's impromptu sprint across a wet coat of amber polyurethane in the dining room." },
                { time: "09:20", title: "Attic Patrol with Jumper", desc: "Jumper scouting roof rafters 30 feet in the air and stalking yellowjackets." }
            ],
            transcript: [
                { speaker: "Jack", text: "Rusty, give me the tape measure. You cannot build a porch with a cat chewing on the thumb lock." },
                { speaker: "Hank", text: "Look over here—Barnaby has wedged himself between the bathroom studs. We can't drywall until he finishes his two-hour nap." },
                { speaker: "Jack", text: "That is the price of restoring Whispering Pines. The cats own the house; we just work here." }
            ]
        },
        {
            id: 'vj_ep5', room: 'Sunroom', taskId: 'sun_rig_build',
            episode: "Episode 5",
            title: "Sunroom 3-DOF Motion Flight Cockpit Fabrication",
            duration: "16:30",
            badge: "Maker Engineering",
            literature: "Jack bridges 1910 Craftsman aesthetics with high-tech simulation. Watch the custom fabrication of a motorized 3-DOF pneumatic motion flight rig, HOTAS controls, and 4K panoramic cockpit inside the Victorian curved glass solarium.",
            keyHighlights: [
                "Welding the tubular steel 3-DOF gimbal frame",
                "Mounting pneumatic linear actuators for pitch, roll, and yaw travel",
                "Wiring 28 illuminated toggle switches and MIL-SPEC HOTAS joysticks",
                "Test flying over virtual mountain terrain with morning solarium light"
            ],
            status: "4K Remastered • Ready to Stream",
            scenes: [
                { time: "00:00", title: "Solarium Glass & Frame Engineering", desc: "Surveying the 1910 curved glass solarium and designing a vibration-isolated platform." },
                { time: "04:30", title: "Welding the 3-DOF Motorized Gimbal", desc: "Fabricating heavy-wall square steel tubing and installing high-torque planetary servos." },
                { time: "09:10", title: "Avionics Wiring & Tactile Shakers", desc: "Soldering 28 illuminated toggle switches and mounting dual 50W bass transducers to the Recaro seat." },
                { time: "13:20", title: "Maiden Flight Simulation Test", desc: "Jack engages full pitch and roll deflection in VR while surrounded by 116-year Craftsman woodwork." }
            ],
            transcript: [
                { speaker: "Jack", text: "Most historic restorations stop at period wallpaper. We wanted the sunroom to be Jack's ultimate pilot command center." },
                { speaker: "Hank", text: "When you bank into a 4G turn on this rig, the whole chassis shifts 30 degrees. The tactile shakers make it feel like you are sitting on an actual turbine." },
                { speaker: "Jack", text: "Surrounded by 1910 curved glass and mountain pines. You cannot get this experience anywhere else." }
            ]
        },
        {
            id: 'vj_ep6', room: 'BreakfastNook', taskId: 'nook_espresso',
            episode: "Episode 6",
            title: "1910 Breakfast Nook & Vintage Copper Espresso Bar",
            duration: "13:45",
            badge: "Hospitality Craft",
            literature: "Restoring the sunny morning bay alcove for B&B guests. Jack scribes a custom curved quarter-sawn white oak banquette, restores leaded bay windows, and plumbs a vintage commercial copper espresso machine.",
            keyHighlights: [
                "Scribing curved oak banquette baseboards to uneven 116-year plaster",
                "Re-soldering antique leaded glass bay sashes",
                "Plumbing filtered reverse-osmosis copper lines for espresso",
                "Serving Dutch baby pancakes and latte art to the first weekend guests"
            ],
            status: "4K Remastered • Ready to Stream",
            scenes: [
                { time: "00:00", title: "Leaded Glass Bay Window Restoration", desc: "Removing oxidized zinc came and re-soldering 1910 leaded diamond panes in the morning sun alcove." },
                { time: "04:15", title: "Bending Quarter-Sawn Oak Banquette", desc: "Steam-bending white oak trim and scribing custom banquette seating into the curved plaster alcove." },
                { time: "08:30", title: "Vintage Copper Espresso Machine Plumbing", desc: "Connecting dedicated softened water lines and 240V power to an Italian brass lever machine." },
                { time: "11:15", title: "Morning Hospitality Run", desc: "Pulling crema-rich espresso shots and serving hot country breakfasts to delighted travelers." }
            ],
            transcript: [
                { speaker: "Jack", text: "This bay nook catches the first morning rays cresting the ridge. When guests sit here, they want warmth, character, and exceptional coffee." },
                { speaker: "Hank", text: "That steam-bent oak banquette fits like a glove. It looks like it was installed by the Vance family woodcarvers in 1910." },
                { speaker: "Jack", text: "And that Italian copper lever machine pulls the richest espresso in the valley. A 5-star B&B breakfast starts right here." }
            ]
        },
        {
            id: 'vj_ep7', room: 'Exterior', taskId: 'ext_sandblast_ironwork',
            episode: "Episode 7",
            title: "Ornamental Veranda Cast Iron Garnet Sandblasting",
            duration: "15:20",
            badge: "Restoration Special",
            literature: "Jack tackles 116 years of peeling rust on the massive wrap-around veranda. See the 80-mesh garnet sandblasting setup, high-pressure stripping techniques, and zinc-rich marine enamel application.",
            keyHighlights: [
                "Containment shroud setup to capture garnet blast media and lead flakes",
                "Operating the 110-PSI pressure pot sandblaster with #4 ceramic nozzle",
                "Inspecting ornamental Victorian acanthus leaf castings under the rust",
                "Applying marine-grade zinc phosphate rust inhibitor and satin black enamel"
            ],
            status: "4K Remastered • Ready to Stream",
            scenes: [
                { time: "00:00", title: "Corrosion Inspection & Media Containment", desc: "Setting heavy tarps and dust collection around the 40-foot front veranda." },
                { time: "03:50", title: "Garnet Hopper Loading & Pressure Calibration", desc: "Filling 80-mesh garnet abrasive and tuning compressor airflow to 110 PSI." },
                { time: "08:15", title: "High-Pressure Blast Stripping in Real Time", desc: "Sweeping the blast nozzle across intricate balusters, peeling away 116 years of oxidation." },
                { time: "12:40", title: "Zinc Phosphate Priming & Heritage Finish", desc: "Spraying satin black rust-shield coating to protect the ironwork for the next century." }
            ],
            transcript: [
                { speaker: "Jack", text: "These veranda railings were poured in 1910, but generations of neglect left them looking like rusted scrap iron. Chemical strippers would take weeks." },
                { speaker: "Hank", text: "Garnet media is sharp enough to cut through four coats of oil paint in seconds, but soft enough not to pit or erode the detailed Victorian castings." },
                { speaker: "Jack", text: "Look at the difference—one sweep of the wand and raw gray iron appears. Once this satin enamel dries, the curb appeal will be off the charts." }
            ]
        },
        {
            id: 'vj_ep8_roof', room: 'RoofAttic', taskId: 'roof_cupola',
            episode: "Episode 8",
            title: "Victorian Slate Roofing & Cupola: Restoring The 32-Ft Tower",
            duration: "19:40",
            badge: "Tower Masterclass",
            literature: "Jack and his roofing crew ascend 32 feet to restore the manor's crowning architectural jewel: the Victorian slate roof, scalloped Pennsylvania black slate tiles, soldered 16-oz copper valleys, and arched octagonal viewing cupola.",
            keyHighlights: [
                "Rigging commercial fall-arrest harnesses and roof scaffolding 32 feet high",
                "Using a foot-operated guillotine trimmer to cut scalloped Pennsylvania black slate",
                "Soldering 16-oz cold-rolled copper valleys with pure tinning flux",
                "Restoring the hand-forged 1910 rooster weathervane atop the octagonal cupola"
            ],
            status: "4K Remastered • Ready to Stream",
            scenes: [
                { time: "00:00", title: "Safety Rigging & Fall Arrest Setup", desc: "Anchoring heavy OSHA roof brackets and climbing ropes into virgin old-growth fir ridge beams." },
                { time: "04:45", title: "Scalloped Slate Cutting & Nailing", desc: "Testing natural slate cleaving with a traditional zax tool and driving copper roofing nails into cedar decking." },
                { time: "10:15", title: "Soldering 16-oz Copper Valleys", desc: "Sweating interlocking expansion joints with heavy soldering irons to guarantee a 100-year waterproof seal." },
                { time: "15:30", title: "Restoring the Octagonal Cupola Tower", desc: "Fitting curved diamond-sash windows and lubricating the historic brass rooster weathervane." }
            ],
            transcript: [
                { speaker: "Jack", text: "Up here at 32 feet, you realize why natural slate is called the forever roof. When laid with solid copper nails, it withstands century after century of blizzard winds." },
                { speaker: "Hank", text: "Look at the soldering on these valley pans—16-ounce cold-rolled copper. No caulking or tar will ever touch this roof." },
                { speaker: "Jack", text: "Spin the weathervane—it points true north. The Victorian Cupola is back in command of the Whispering Pines ridge!" }
            ]
        },
        {
            id: 'vj_ep9_kitchen', room: 'Kitchen', taskId: 'kit_range',
            episode: "Episode 9",
            title: "Country Kitchen Hearth: Restoring Commercial Flues & Range",
            duration: "14:50",
            badge: "Culinary Engineering",
            literature: "Jack rebuilds the culinary heart of Whispering Pines B&B. Re-pointing century-old fireclay chimney flues, installing stainless chimney liners, and building solid butcher block islands for commercial guest meal prep.",
            keyHighlights: [
                "Chiseling crumbly lime mortar from the 1910 cookstove brick flue",
                "Pulling flexible stainless steel chimney liner with heavy winches",
                "Wiring 50-amp commercial circuits for high-output kitchen ranges",
                "Finishing 3-inch thick end-grain butcher block prep islands"
            ],
            status: "4K Remastered • Ready to Stream",
            scenes: [
                { time: "00:00", title: "Chimney Flue Inspection & Camera Drop", desc: "Lowering chimney inspection scopes to examine 116-year flue tiles for cracks and creosote." },
                { time: "04:10", title: "Stainless Liner Hoist & Drop", desc: "Rigging chimney winches to snake a 6-inch stainless steel combustion liner down the hearth." },
                { time: "08:35", title: "End-Grain Butcher Block Assembly", desc: "Gluing and clamping rock maple and black walnut segments for a 600-lb chef prep station." },
                { time: "12:10", title: "Commercial Range Test Fire", desc: "Firing all 6 dual-flame burners and testing high-CFM overhead range hood extraction." }
            ],
            transcript: [
                { speaker: "Jack", text: "You cannot host 12 weekend guests with a residential stove. We needed this flue certified to handle heavy commercial cooking every Saturday morning." },
                { speaker: "Hank", text: "The stainless liner passed pressure tests with zero draft leakage. That brick chimney is safer today than when it was built in 1910." },
                { speaker: "Jack", text: "Now Jack's famous buttermilk pancakes and bacon have a proper culinary home." }
            ]
        },
        {
            id: 'vj_ep10_tempshop', room: 'TempShop', taskId: 'shop_build_bench',
            episode: "Episode 10",
            title: "In-House Wood & Metal Fabrication Shop: Maple Benches & Miter Station",
            duration: "16:15",
            badge: "Shop Engineering",
            literature: "Jack constructs an industrial-grade fabrication shop inside the manor. Setting up 400-lb laminated rock maple workbenches, 12-inch compound miter saws, cyclone HEPA dust extraction, and fire-safe welding tables.",
            keyHighlights: [
                "Pouring level epoxy floor pads for heavy machine stability",
                "Building 16-foot precision miter saw wings with micro-stop gauges",
                "Installing dual-stage cyclone HEPA dust extraction ducting",
                "Setting up fireproof metal fab welding table with magnetic grounding"
            ],
            status: "4K Remastered • Ready to Stream",
            scenes: [
                { time: "00:00", title: "Shop Layout & Electrical Distribution", desc: "Routing dedicated 220V 30-amp sub-panels to power heavy planers and welders." },
                { time: "04:40", title: "Miter Station & Precision Stop Track", desc: "Building flat reference wings to support 16-foot reclaimed old-growth fir casing stock." },
                { time: "09:20", title: "Cyclone Dust Extraction Airflow Tuning", desc: "Measuring 850 CFM at the blast gates to keep historic living quarters 100% dust-free." },
                { time: "13:00", title: "First Mill Run: Quarter-Sawn Oak Trim", desc: "Planing rough-sawn virgin lumber into silky smooth Craftsman architrave moldings." }
            ],
            transcript: [
                { speaker: "Jack", text: "Having an in-house shop saves thousands of dollars and weeks of waiting on commercial lumber yards. We mill our own trim right where we need it." },
                { speaker: "Hank", text: "And that cyclone dust collector pulls 99.97% of fine particles. You can cut oak all day without an ounce of dust reaching the guest rooms." },
                { speaker: "Jack", text: "High-precision craftsmanship right on site—that is how you honor a 1910 Craftsman." }
            ]
        },
        {
            id: 'vj_ep11_woodshed', room: 'WoodShed', taskId: 'shed_timber_frame',
            episode: "Episode 11",
            title: "Heavy Timber Storage Shed: Post-and-Beam Framing & Solar Kiln",
            duration: "15:10",
            badge: "Outbuilding Craft",
            literature: "Jack frames a dedicated post-and-beam exterior lumber shed to season salvaged virgin old-growth fir timbers. Watch timber joinery, corrugated steel roof overhangs, and solar kiln circulation fans in action.",
            keyHighlights: [
                "Chiseling mortise-and-tenon joints in 6x6 hemlock timber posts",
                "Raising roof bents with gin poles and rigging ropes",
                "Laying gravel French drains to prevent ground splash on seasoned lumber",
                "Tuning solar-powered kiln fans to drop timber moisture from 22% to 9%"
            ],
            status: "4K Remastered • Ready to Stream",
            scenes: [
                { time: "00:00", title: "Post-and-Beam Joinery Layout", desc: "Marking shoulder cuts and mortise pockets on 6x6 heavy timber posts with framing squares." },
                { time: "05:15", title: "Bent Raising & Timber Pegging", desc: "Hoisting the three timber bents and driving seasoned white oak trunnels (pegs) into draw-bored holes." },
                { time: "09:50", title: "Corrugated Roof Overhangs & French Drain", desc: "Installing 26-gauge standing seam metal panels and 12 inches of washed river gravel for drainage." },
                { time: "12:30", title: "Stacking 2,500 Bd-Ft of Virgin Fir", desc: "Sticker-stacking old-growth floorboards with calibrated airflow spacing." }
            ],
            transcript: [
                { speaker: "Jack", text: "Virgin old-growth timber is essentially gold. If you leave it on damp ground, moisture ruins the grain. This timber shed keeps it bone dry." },
                { speaker: "Hank", text: "These solar kiln fans create a gentle continuous draft. Within 30 days, these salvaged fir joists will be down to optimal interior moisture content." },
                { speaker: "Jack", text: "Built like a 19th-century timber barn. It will protect our wood supply for the entire restoration." }
            ]
        },
        {
            id: 'vj_ep12_plumbing', room: 'PlumbingHVAC', taskId: 'plumb_replace_lead_lines',
            episode: "Episode 12",
            title: "Heritage Plumbing & HVAC: Stripping 116-Year Lead Pipes for PEX-A",
            duration: "17:25",
            badge: "Mechanical Masterclass",
            literature: "Jack and his plumbing crew eradicate 400 feet of hazardous corroded lead and galvanized piping. Watch the installation of commercial home-run PEX-A expansion manifolds and modern inverter heat pumps.",
            keyHighlights: [
                "Cutting out dangerous corroded lead supply lines with containment cutters",
                "Installing central PEX-A expansion distribution manifold with individual suite isolators",
                "Pressure testing cold and hot potable water lines to 100 PSI air test",
                "Rigging multi-zone inverter heat pumps for whisper-quiet climate control"
            ],
            status: "4K Remastered • Ready to Stream",
            scenes: [
                { time: "00:00", title: "Lead Pipe Extraction & Safe Disposal", desc: "Mapping hazardous lead pipes in the cellar and bagging corroded fittings for safe hazardous disposal." },
                { time: "05:30", title: "PEX-A Home-Run Manifold Installation", desc: "Mounting brass manifolds and expanding ProPEX rings for leak-free full-port water flow." },
                { time: "10:15", title: "100-PSI Pneumatic Pressure Test", desc: "Pressurizing the entire domestic water system with compressed air to verify every joint before wall closure." },
                { time: "14:20", title: "Multi-Zone Heat Pump Commissioning", desc: "Charging inverter heat pump lines to provide independent cooling and heating for all 3 guest suites." }
            ],
            transcript: [
                { speaker: "Jack", text: "When we bought this manor, the water was running through 116-year lead pipes. You cannot serve breakfast or host guests with toxic plumbing." },
                { speaker: "Hank", text: "Now every bathroom and kitchen fixture has its own dedicated home-run PEX line. Clean mountain spring water at 65 PSI." },
                { speaker: "Jack", text: "Code compliant, certified pure, and built to last the next century." }
            ]
        },
        {
            id: 'vj_ep13_bathroom', room: 'Bathroom', taskId: 'bath_tub',
            episode: "Episode 13",
            title: "Guest Bath Suites: Rigging A 450-lb Clawfoot Tub & Moisture Barrier",
            duration: "15:05",
            badge: "Luxury Tile Craft",
            literature: "Restoring the vintage guest bath into a 5-star spa sanctuary. Watch the structural reinforcement of subfloor joists to hold a 450-lb cast iron clawfoot tub, uncoupling waterproof membranes, and period marble mosaic tiling.",
            keyHighlights: [
                "Sistering 2x10 floor joists to support a 950-lb combined soaking tub load",
                "Laying heated floor uncoupling membranes with modified thinset mortar",
                "Setting hand-cut Italian Carrara marble hexagon tile sheets",
                "Rigging and hoisting the pristine re-enameled porcelain clawfoot tub"
            ],
            status: "4K Remastered • Ready to Stream",
            scenes: [
                { time: "00:00", title: "Subfloor Deflection Calculations", desc: "Measuring floor joist deflection to ensure rigid support for 950 lbs of cast iron tub and water." },
                { time: "04:30", title: "Waterproof Membrane & Heated Wire Run", desc: "Installing Schluter waterproofing membrane and electric radiant floor heating coils." },
                { time: "08:45", title: "Carrara Marble Hexagon Tiling", desc: "Setting classic 1-inch hexagon mosaic sheets and wiping platinum epoxy grout." },
                { time: "12:15", title: "Clawfoot Tub Hoist & Final Plumbing", desc: "Four crew members lifting the 450-lb tub into place and connecting solid brass telephone faucets." }
            ],
            transcript: [
                { speaker: "Jack", text: "A 450-pound tub filled with water will crack tile instantly if the joists have even 1/8-inch of flex. We reinforced this floor to bank-vault standards." },
                { speaker: "Hank", text: "And that heated marble floor underfoot is pure luxury. Guests will never want to leave this bathroom." },
                { speaker: "Jack", text: "Historic Craftsman charm paired with modern 5-star comfort." }
            ]
        },
        {
            id: 'vj_ep14_bedroom', room: 'Bedroom', taskId: 'bed_pocket_doors',
            episode: "Episode 14",
            title: "Heritage Guest Suites: Old-Growth Framing & Pocket Door Transoms",
            duration: "13:30",
            badge: "Finish Carpentry",
            literature: "Jack transforms the second-floor heritage bedrooms into restful guest suites. Re-hanging 8-foot black walnut pocket doors, restoring operating transom windows, and insulating wall cavities for soundproof acoustic isolation.",
            keyHighlights: [
                "Rebuilding pocket door track framing relieved after the foundation leveling",
                "Restoring brass sash chains and wavy glass transom windows for airflow",
                "Packing mineral wool acoustic batt insulation for total suite privacy",
                "Refinishing 1910 heart-pine bedroom flooring with natural matte poly"
            ],
            status: "4K Remastered • Ready to Stream",
            scenes: [
                { time: "00:00", title: "Pocket Door Track Re-Alignment", desc: "Lubricating heavy-duty brass trolleys and adjusting walnut pocket doors to glide silently." },
                { time: "04:20", title: "Transom Window Restoration", desc: "Re-glazing original operable transoms over suite doorways for natural passive ventilation." },
                { time: "08:10", title: "Rockwool Acoustic Insulation Install", desc: "Tightly packing dense mineral wool into party walls to achieve STC-55 acoustic rating." },
                { time: "11:00", title: "Flooring Reveal & Oil Finish", desc: "Buffing restored heart pine planks to reveal golden amber grain and century-old saw marks." }
            ],
            transcript: [
                { speaker: "Jack", text: "When you run a B&B, acoustic privacy is everything. With mineral wool in the walls and solid walnut pocket doors, each suite is an oasis of calm." },
                { speaker: "Hank", text: "Look at the light pouring through those transoms. That is authentic 1910 ventilation design at its finest." },
                { speaker: "Jack", text: "Ready for bespoke heritage furniture and welcoming weary travelers." }
            ]
        },
        {
            id: 'vj_ep15_garage', room: 'Garage', taskId: 'garage_carriage_doors',
            episode: "Episode 15",
            title: "Carriage House & Salvage Depot: Reclaiming 1910 Hardware & Carriage Doors",
            duration: "14:40",
            badge: "Salvage Engineering",
            literature: "Jack stabilizes the historic detached carriage house to serve as the estate's salvage depot. Re-hanging massive sliding carriage doors, repairing collar tie roof rafters, and staging restored cast-iron architectural salvage.",
            keyHighlights: [
                "Straightening bowed carriage house walls with heavy come-alongs and tie rods",
                "Mounting heavy forged iron box-track rollers for 9-foot sliding carriage doors",
                "Sandblasting and pressure-testing reclaimed cast iron steam radiators",
                "Organizing architectural salvage inventory for custom manor furniture"
            ],
            status: "4K Remastered • Ready to Stream",
            scenes: [
                { time: "00:00", title: "Carriage House Frame Stabilization", desc: "Tensioning 3/4-inch steel tie rods across bowed timber walls to restore structural plumb." },
                { time: "04:45", title: "Sliding Carriage Door Track Mounting", desc: "Lag-bolting heavy iron trolley tracks over the carriage entrance and hanging double doors." },
                { time: "09:15", title: "Cast Iron Radiator Hydrostatic Testing", desc: "Pressurizing antique ornamental radiators to 40 PSI with water to verify zero pinhole leaks." },
                { time: "12:30", title: "Salvage Staging Depot Tour", desc: "Jack walks through rows of cataloged brass escutcheons, mortise locks, and salvaged virgin beams." }
            ],
            transcript: [
                { speaker: "Jack", text: "Every piece of scrap iron or vintage hardware in this carriage house has a story. By restoring them here, we bring authentic 1910 history back to the manor." },
                { speaker: "Hank", text: "And these sliding carriage doors roll with one finger now. The depot is fully operational." },
                { speaker: "Jack", text: "From the basement to the roof cupola, every section of Whispering Pines Manor is accounted for." }
            ]
        }
    ],

    // PROGRESS & HISTORICAL LITERATURE JOURNAL
        // PROGRESS & HISTORICAL LITERATURE JOURNAL (MAPPED BY SECTION)
    PROGRESS_JOURNAL: [
        {
            id: 'pj_provenance', room: 'LivingRoom', taskId: 'living_floor',
            section: "Architectural History",
            title: "Whispering Pines Manor: 1910 Provenance & Blueprint Archive",
            author: "Jack - Head Restorer",
            literature: "Whispering Pines Manor was completed in late autumn of 1910 as the personal estate of timber magnate Thaddeus Vance. Situated on a scenic ridge overlooking old-growth pine forests, the residence was built to showcase the pinnacle of Pacific Northwest timber craftsmanship.\n\nModern construction lumber is grown rapidly on commercial tree farms, resulting in wide annual growth rings and low wood density. Whispering Pines Manor, by contrast, was framed entirely from virgin old-growth Douglas fir and quarter-sawn white oak harvested from trees that were 300 to 500 years old when felled in 1910.\n\n• Ring Density: 35 to 45 rings per inch (vs. 4-6 rings in modern 2x4s).\n• Hardness & Load Capacity: Over 2.5x the compressive and bending strength of contemporary lumber.\n• Fire & Pest Resistance: High natural resin and dense heartwood make these timbers virtually fire-resistant and impervious to termites."
        },
        {
            id: 'pj_engineering_weight', room: 'LivingRoom', taskId: 'found_gut_plaster',
            section: "Structural Engineering",
            title: "The 60-Ton Dead Weight Analysis & Plaster Calculation",
            author: "Jack & Structural Engineering Survey",
            literature: "Dead-Load Mass Breakdown (Total: 60 Tons / 120,000 lbs):\n\n1. Virgin Old-Growth Framing & Subfloors: 48,000 lbs (24 tons)\n2. Interior Horsehair Lime Plaster & Lath: 24,000 lbs (12 tons)\n   * Calculation: Approximately 1,100 lbs of 3-coat plaster per partition wall cavity!\n3. Pennsylvania Slate Roof Tiles & Copper Valleys: 18,000 lbs (9 tons)\n4. Five Brick & Fieldstone Chimneys / Fireplaces: 20,000 lbs (10 tons)\n5. Oak Hardwoods, Trim, Pocket Doors & Glazing: 10,000 lbs (5 tons)\n\nWhy Walls Must Be Gutted Before Raising:\nLifting a 60-ton structure concentrated on hydraulic jacks causes microscopic deflection along the neutral axis of the framing. If 1,100-lb brittle plaster walls are still clinging to the studs, the plaster cannot flex; it shears off lath keys and drops in massive sheets, posing severe worker hazard and twisting the timber studs. Shedding the 12 tons of plaster allows the hydraulic jacks to operate within their optimal safety margins."
        },
        {
            id: 'pj_restoration_protocol', room: 'Basement', taskId: 'found_jack',
            section: "Restoration Protocol",
            title: "The 4-Step Bedrock Foundation Protocol",
            author: "Municipal Historic Lodging Code Compliance",
            literature: "The Mandatory Foundation Roadmap for B&B Certification:\n\nStep 1: Plaster Wall Demo (De-Weighting): Gut the 1,100-lb plaster partition walls across the first floor down to bare old-growth studs.\n\nStep 2: Hydraulic Lifting & Center Sistering: Position four 20-ton bottle jacks on white oak cribbing, lift the sagging center timber 3.5 inches to true level, and sandwich the beam between 1/2-inch structural steel flitch plates.\n\nStep 3: Bedrock Footing Piers: Dig out the rotting 1910 cedar tree stumps and pour steel-reinforced 3,500-PSI concrete piers anchored directly to solid bedrock.\n\nStep 4: Fieldstone Repointing: Chisel out powdered 116-year-old lime mortar and pack structural hydraulic lime mortar into bulging fieldstone cellar walls."
        },
        {
            id: 'pj_roof_spec', room: 'RoofAttic', taskId: 'roof_cupola',
            section: "Roofing Engineering",
            title: "Victorian Slate Roofing & Cupola: Slate Weight, Soldered Copper & Aerodynamics",
            author: "Jack & Master Slate Guild Survey",
            literature: "Engineering Specifications for Victorian Slate Roofing & Octagonal Cupola:\n\n1. Pennsylvania Black Slate Cleaving: Quarried from the Peach Bottom slate formation, these scalloped shingles exhibit an absorption rate below 0.15% and an expected service life exceeding 125 years. Weight rating is approximately 950 lbs per roofing square (100 sq ft), totaling over 9 tons across the manor roof surface.\n\n2. Copper Flashing & Valley Soldering: Valleys are fabricated from 16-oz cold-rolled copper sheets with 1/2-inch lock seams soldered using 50/50 tin-lead solder and non-corrosive rosin flux. Expansion cleating allows 3/8-inch thermal movement across extreme winter/summer temperature swings without tearing fastener points.\n\n3. Octagonal Tower Passive Aerodynamics: The 32-ft cupola operates on natural stack-effect convection. Warm rising air exhausts through copper louvered vents at the pinnacle, drawing cool mountain breezes through the second-floor guest transoms, eliminating the need for noisy mechanical attic exhaust fans."
        },
        {
            id: 'pj_cockpit_engineering', room: 'Sunroom', taskId: 'sun_flight_controls',
            section: "Command Center Architecture",
            title: "The 3-DOF Cockpit Motion Rig & Solarium Acoustic Engineering",
            author: "Jack - Head Restorer & Sim Builder",
            literature: "Command Center Rig Specifications:\n\n1. Dynamic Motion Platform: Motorized 3-DOF pneumatic/hydraulic tilt table engineered for 35° pitch and 28° roll travel. Driven by dual precision linear actuators synchronized to simulation telemetry via high-speed microcontrollers.\n\n2. Dual HOTAS Controls: Center-mounted cyclic joystick and left-hand split-throttle quadrant featuring MIL-SPEC magnetic hall-effect sensors (0.01° precision) with dual force-feedback centering springs.\n\n3. Overhead Flight Console: CNC-milled 6061 aluminum overhead panel fitted with 28 illuminated APU, avionics, radar, and weapons toggle switches with red anodized safety covers.\n\n4. Ergonomic Pilot Station: Recaro high-density foam bucket seat with 5-point harness, dual 50W tactile bass shakers bolted to the seat frame for engine vibration feedback, and custom pneumatic lumbar bladder.\n\n5. Panoramic Visual Array: Triple 49-inch curved 144Hz monitors creating a 180° horizontal field of view across the curved glass solarium, shielded by ceramic UV glare tint."
        },
        {
            id: 'pj_kitchen_spec', room: 'Kitchen', taskId: 'kit_range',
            section: "Culinary Engineering",
            title: "Country Kitchen & Commercial Pantry: Food-Safe Surfaces & Flue Fireproofing",
            author: "Public Health & Commercial Kitchen Inspector",
            literature: "Commercial Country Kitchen Compliance Standards:\n\n1. Masonry Flue Fireproofing: Re-lined 1910 chimney flue with 316Ti titanium-stabilized stainless steel liner tested to withstand 2,100°F chimney fires. Clears NFPA 211 codes for zero clearance to combustibles.\n\n2. Food-Grade Wood Surfaces: Hard maple island tops saturated with heated pharmaceutical-grade mineral oil and organic beeswax emulsion, naturally antibacterial and non-toxic for kneading fresh sourdough pastries.\n\n3. Commercial Grease Extraction: 1,200 CFM variable-speed baffle hood with integrated automatic fire suppression nozzles positioned over the 6-burner commercial range."
        },
        {
            id: 'pj_nook_spec', room: 'BreakfastNook', taskId: 'nook_banquette',
            section: "Millwork & Ergonomics",
            title: "Morning Breakfast Nook: Curved Banquette Ergonomics & Leaded Glass Restoration",
            author: "Jack & Vance Estate Master Joiner",
            literature: "Breakfast Nook Architectural Notes:\n\n1. Banquette Geometry: The curved booth features an anatomical 15° seatback incline and high-resilience foam wrapped in waterproof vegan leather. The radius mirrors the 1910 bay window curvature to within 1/16-inch tolerance.\n\n2. Leaded Glass Conservation: 84 individual hand-poured wavy glass diamond panes were removed, submerged in ultrasonic cleaning baths to remove soot, and re-leaded using heavy H-channel zinc came for structural rigidity against valley wind gusts."
        },
        {
            id: 'pj_tempshop_spec', room: 'TempShop', taskId: 'shop_miter_station',
            section: "Shop Safety Engineering",
            title: "Wood & Metal Fabrication Shop: HEPA Air Filtration & Fire-Safe Welding Protocols",
            author: "Jack - Facilities & Safety Lead",
            literature: "In-House Fabrication Workshop Protocol:\n\n1. Dust Containment: Two-stage cyclone dust collector pulling 850 CFM through 4-inch spiral steel ducting, exhausting into 1-micron spun-bond polyester HEPA filters to protect interior air quality.\n\n2. Welding & Hot Work Zone: Concrete floor pads treated with non-flammable silicate hardener, surrounded by 18-oz flame-retardant fiberglass welding curtains and equipped with dedicated Class ABC and CO2 fire extinguishers."
        },
        {
            id: 'pj_woodshed_spec', room: 'WoodShed', taskId: 'shed_solar_kiln',
            section: "Timber Physics",
            title: "Timber Storage Shed: Moisture Content Calibration & Old-Growth Wood Seasoning",
            author: "Forest Products Research Bulletin",
            literature: "Timber Seasoning Guidelines:\n\n1. Equilibrium Moisture Content (EMC): Salvaged old-growth timbers must be dried to 8-10% EMC before interior joinery. Air drying in the covered timber shed drops moisture by 1% per week without cell collapse or honeycombing.\n\n2. Sticker-Stacking Protocol: 1-inch dry pine stickers placed every 24 inches along lumber stacks to maintain uniform horizontal airflow, weighted with concrete deadweights to eliminate cupping and twisting."
        },
        {
            id: 'pj_bath_spec', room: 'Bathroom', taskId: 'bath_tile',
            section: "Plumbing & Joist Physics",
            title: "Guest Bath Suites: Floor Joist Deflection Limits for 450-lb Cast Iron Tubs",
            author: "Structural Deflection Calculation Index",
            literature: "Cast Iron Tub Structural Load Analysis:\n\n1. Joist Deflection Threshold: Tile floors require a minimum stiffness of L/360, but heavy cast iron clawfoot tubs demand L/720 to prevent grout shear and waterproof membrane failure. Doubled 2x10 virgin fir joists spaced 12 inches on center achieve an exceptional L/940 stiffness.\n\n2. Water Supply Sizing: 3/4-inch PEX-A direct home-run feeds ensure rapid 12 GPM tub filling at consistent 118°F temperature without pressure drops when other suites shower."
        },
        {
            id: 'pj_bed_spec', room: 'Bedroom', taskId: 'bed_pocket_doors',
            section: "Acoustics & Millwork",
            title: "Heritage Guest Suites: Acoustic Isolation & Historic Mortise Lock Fitting",
            author: "Jack & Architectural Conservation Notes",
            literature: "Guest Suite Comfort & Security Engineering:\n\n1. Acoustic Decoupling: Partition walls feature resilient sound-isolation clips and 3.5-inch mineral wool batts, yielding an STC rating of 54. Footsteps and muffled voices are completely dampened between guest suites.\n\n2. Historic Mortise Hardware: All bedroom doors utilize restored 1910 forged brass mortise locks fitted with custom skeleton keys, solid brass strike plates, and ball-bearing hinges."
        },
        {
            id: 'pj_ext_spec', room: 'Exterior', taskId: 'ext_paint',
            section: "Metallurgy & Coatings",
            title: "Wrap-Around Veranda: Cast Iron Metallurgy & Marine-Grade Rust Inhabitation",
            author: "Historic Metals Conservationist",
            literature: "Cast Iron Railing Restoration Science:\n\n1. Abrasive Media Selection: 80-mesh garnet abrasive cleans to SSPC-SP 10 (Near-White Metal) without etching or rounding sharp foundry detail on Victorian acanthus leaf castings.\n\n2. Three-Coat Protective System: Zinc-rich epoxy primer (3.0 mils dry film thickness), high-build polyamide epoxy intermediate barrier coat (4.0 mils), and aliphatic polyurethane satin black topcoat providing 30+ years of UV and weather resistance."
        },
        {
            id: 'pj_garage_spec', room: 'Garage', taskId: 'garage_workbench',
            section: "Structural Bracing",
            title: "Carriage House: Structural Rafter Bracing & High-Torque Salvage Equipment Safety",
            author: "Jack & Structural Heritage Surveyor",
            literature: "Carriage House Restoration Record:\n\n1. Lateral Rafter Bracing: Installed 1/2-inch structural aircraft cable with turnbuckles across the collar ties to correct an 8-inch roof ridge sag and withstand heavy Pacific Northwest snow loads.\n\n2. Salvage Depot Operations: Overhead 1-ton chain hoist mounted to an engineered steel I-beam allows single-operator loading of heavy cast-iron radiators, timber baulks, and vintage machinery."
        },
        {
            id: 'pj_plumb_spec', room: 'PlumbingHVAC', taskId: 'plumb_replace_lead_lines',
            section: "Potable Water Engineering",
            title: "Lead Supply Line Replacement: Municipal Potable Water Standards & PEX-A Flow Dynamics",
            author: "Municipal Water Safety Director",
            literature: "Potable Water Quality Certification:\n\n1. Lead Remediation: All legacy lead piping (tested at 48 ppb lead content at initial survey) was completely removed and replaced. Post-remediation laboratory testing confirms 0.00 ppb lead and zero copper leaching.\n\n2. PEX-A Expansion Memory: Cross-linked polyethylene tubing expands during ProPEX fitting and shrinks back to create permanent mechanical seals that withstand freeze-thaw cycles without bursting."
        }
    ],
};


// SECTION-JOURNAL HELPER METHODS
GAME_DATA.getPhotosForRoom = function(roomKey) {
    return (GAME_DATA.PHOTO_JOURNAL || []).filter(p => !roomKey || p.room === roomKey);
};

GAME_DATA.getVideosForRoom = function(roomKey) {
    return (GAME_DATA.VIDEO_JOURNAL || []).filter(v => !roomKey || v.room === roomKey);
};

GAME_DATA.getProgressForRoom = function(roomKey) {
    return (GAME_DATA.PROGRESS_JOURNAL || []).filter(p => !roomKey || p.room === roomKey);
};

// DONATION & PUBLIC DREAM BUILDING PORTAL DEFAULTS
GAME_DATA.DONATION_DEFAULTS = {
    title: "Building the Dream: 1910 Whispering Pines Manor Restoration",
    tagline: "An authentic ground-up restoration of an iconic 116-year-old Craftsman & Victorian estate and community heritage B&B.",
    story: "Whispering Pines was commissioned in 1910 by timber baron Thaddeus Vance using virgin old-growth Douglas fir and quarter-sawn white oak timbers. We are undertaking an authentic, ground-up restoration—jacking the 60-ton structure on hydraulic towers, restoring scalloped Peach Bottom black slate 32 feet high, replacing legacy lead supply pipes with modern PEX-A lines, and creating an educational craftsmanship center and community B&B. Every contribution directly funds historic materials, specialized restoration tools, and structural preservation.",
    totalGoal: 75000,
    gofundmeUrl: "https://gofundme.com/f/whispering-pines-1910-restoration",
    patreonUrl: "https://patreon.com/whisperingpinesrestoration",
    paypalHandle: "@whisperingpines1910",
    venmoHandle: "@whisperingpines-restoration",
    wishlistUrl: "https://amazon.com/hz/wishlist/ls/whispering-pines-restoration",
    volunteerEmail: "restore@whisperingpinesmanor.org",
    sponsorshipPerks: [
        { name: "Adopt a Historic Board", amount: 75, perk: "Your name and dedication custom-branded onto a reclaimed virgin Douglas fir floorboard or rafter in the manor registry." },
        { name: "Adopt a Slate Roofing Tile", amount: 150, perk: "Your name hand-etched on the underside of an authentic 125-year Vermont sea green or black slate tile." },
        { name: "Sponsor a Foundation Pier (Brass Plaque)", amount: 500, perk: "Engraved architectural brass plaque set permanently into bedrock concrete footing pier." },
        { name: "Heritage Suite Sponsor", amount: 1200, perk: "Commemorative carved walnut door plaque, deed certificate, and complimentary weekend stay in restored B&B master suite." }
    ]
};

// DEFAULT PROJECT SPECIFICATION MAP (PRIORITIES, CHECKLISTS, MATERIALS & TOOLS)
GAME_DATA.DEFAULT_PROJECT_SPEC_MAP = {
    roof_cupola: {
        priority: 1,
        fundingGoal: 1250,
        fundingRaised: 600,
        checklist: [
            { id: 'cl_rc_1', text: "Rig OSHA 32-ft fall arrest harnesses & steel roof brackets into ridge beams", done: true },
            { id: 'cl_rc_2', text: "Carefully strip cracked scalloped slate tiles around octagonal cupola collar", done: true },
            { id: 'cl_rc_3', text: "Sister damaged old-growth curved rafter tails with seasoned Douglas fir", done: false },
            { id: 'cl_rc_4', text: "Fabricate & solder 16-oz cold-rolled copper apron flashing with pure tinning flux", done: false },
            { id: 'cl_rc_5', text: "Re-glaze 8 curved diamond-pane viewing windows with linseed oil putty", done: false },
            { id: 'cl_rc_6', text: "Clean, balance & lubricate 1910 rooster weathervane spindle & directionals", done: false }
        ],
        materials: [
            { id: 'mat_rc_1', name: "16-oz Cold-Rolled Copper Valley Flashing Sheet (2 rolls)", qty: "48 sq ft", cost: 220, status: "On Site" },
            { id: 'mat_rc_2', name: "Scalloped Pennsylvania Peach Bottom Black Slate (4 bundles)", qty: "100 pcs", cost: 380, status: "Needed" },
            { id: 'mat_rc_3', name: "Raw Linseed Oil Glazing Compound & Chalk", qty: "2 quarts", cost: 45, status: "On Site" },
            { id: 'mat_rc_4', name: "Solid Copper Roofing Nails 1.5-inch", qty: "10 lbs", cost: 65, status: "On Site" },
            { id: 'mat_rc_5', name: "Restoration Diamond Leaded Glass Replacement Panes", qty: "4 panes", cost: 145, status: "Needed" }
        ],
        tools: [
            { id: 'tl_rc_1', name: "OSHA Full-Body Fall Arrest Harness Kit & Lanyard", status: "Have" },
            { id: 'tl_rc_2', name: "Traditional Slate Ripper & Zax Cleaving Hammer", status: "Have" },
            { id: 'tl_rc_3', name: "Heavy Soldering Copper Iron (5 lb) & Rosin Flux", status: "Have" },
            { id: 'tl_rc_4', name: "32-ft Heavy-Duty Aluminum Extension Ladder with Stand-Off", status: "Have" }
        ]
    },
    roof_slate_copper: {
        priority: 1,
        fundingGoal: 2800,
        fundingRaised: 1100,
        checklist: [
            { id: 'cl_rs_1', text: "Survey attic mortise-and-tenon old-growth collar ties & rafters", done: true },
            { id: 'cl_rs_2', text: "Install high-temp breathable underlayment (ice & water shield) over decking", done: false },
            { id: 'cl_rs_3', text: "Snap 4-inch chalk lines for scalloped slate exposure layout", done: false },
            { id: 'cl_rs_4', text: "Fasten natural slate with double-driven solid copper nails", done: false },
            { id: 'cl_rs_5', text: "Install copper ridge cap roll with expansion joints", done: false }
        ],
        materials: [
            { id: 'mat_rs_1', name: "Vermont Unfading Black Natural Slate (12 squares)", qty: "1,200 sq ft", cost: 2400, status: "Needed" },
            { id: 'mat_rs_2', name: "High-Temp Self-Adhering Ice & Water Shield", qty: "3 rolls", cost: 360, status: "On Site" },
            { id: 'mat_rs_3', name: "Solid Copper Roofing Nails 1.75-inch", qty: "25 lbs", cost: 160, status: "Needed" }
        ],
        tools: [
            { id: 'tl_rs_1', name: "Slate Guillotine Trimmer Table", status: "Need to Rent" },
            { id: 'tl_rs_2', name: "Pneumatic Coil Roofing Nailer & Compressor", status: "Have" },
            { id: 'tl_rs_3', name: "Heavy Fall-Arrest Roof Anchors", status: "Have" }
        ]
    },
    found_jacks: {
        priority: 1,
        fundingGoal: 3500,
        fundingRaised: 2200,
        checklist: [
            { id: 'cl_fj_1', text: "Excavate four 36x36-inch level footing pads in crawlspace down to bedrock", done: true },
            { id: 'cl_fj_2', text: "Erect 6x6 rough-sawn white oak box cribbing towers below center beam", done: true },
            { id: 'cl_fj_3', text: "Seat four 20-ton synchronized hydraulic bottle jacks with steel bearing plates", done: true },
            { id: 'cl_fj_4', text: "Affix digital laser level sensor targets on main carrying beam", done: false },
            { id: 'cl_fj_5', text: "Execute synchronized hydraulic lift at max 1/8-inch per 24 hours", done: false }
        ],
        materials: [
            { id: 'mat_fj_1', name: "6x6 Rough-Sawn White Oak Cribbing Timbers (24 pcs)", qty: "24 timbers", cost: 720, status: "On Site" },
            { id: 'mat_fj_2', name: "1/2-inch Heavy Steel Bearing Plates (8 pcs)", qty: "8 plates", cost: 180, status: "On Site" },
            { id: 'mat_fj_3', name: "High-Pressure Anti-Wear Hydraulic Fluid", qty: "2 gallons", cost: 60, status: "On Site" }
        ],
        tools: [
            { id: 'tl_fj_1', name: "Four 20-Ton Heavy-Duty Hydraulic Bottle Jacks", status: "Have" },
            { id: 'tl_fj_2', name: "Continuous Digital Rotary Laser Level & Detector", status: "Have" },
            { id: 'tl_fj_3', name: "10-lb Sledge Hammer & Oak Shim Driving Bar", status: "Have" }
        ]
    },
    found_piers: {
        priority: 1,
        fundingGoal: 1800,
        fundingRaised: 950,
        checklist: [
            { id: 'cl_fp_1', text: "Core-drill 12-inch diameter holes 36 inches into sound bedrock", done: true },
            { id: 'cl_fp_2', text: "Tie #5 grade 60 structural steel rebar cages with 3-inch clearance", done: false },
            { id: 'cl_fp_3', text: "Mix and pour 4,000 PSI fiber-reinforced concrete into Sonotubes", done: false },
            { id: 'cl_fp_4', text: "Wet-set Simpson heavy standoff post bases with 5/8-inch anchor bolts", done: false },
            { id: 'cl_fp_5', text: "Strip forms and apply crystalline waterproofing sealant", done: false }
        ],
        materials: [
            { id: 'mat_fp_1', name: "4,000 PSI High-Strength Fiber-Reinforced Concrete", qty: "40 bags", cost: 320, status: "Needed" },
            { id: 'mat_fp_2', name: "#5 Grade 60 Structural Steel Deformed Rebar", qty: "120 linear ft", cost: 180, status: "On Site" },
            { id: 'mat_fp_3', name: "Simpson Strong-Tie Heavy Standoff Post Bases", qty: "6 bases", cost: 210, status: "Needed" },
            { id: 'mat_fp_4', name: "12-inch Heavy Sonotube Concrete Forms (4 pcs)", qty: "4 tubes", cost: 95, status: "On Site" }
        ],
        tools: [
            { id: 'tl_fp_1', name: "Gas-Powered Concrete Mixer (9 cu ft)", status: "Need to Rent" },
            { id: 'tl_fp_2', name: "High-Frequency Concrete Immersion Vibrator", status: "Have" },
            { id: 'tl_fp_3', name: "Heavy Post Hole Digger & Demolition Hammer", status: "Have" }
        ]
    },
    found_beam: {
        priority: 1,
        fundingGoal: 2200,
        fundingRaised: 800,
        checklist: [
            { id: 'cl_fb_1', text: "Shore main floor joists with twin temporary 4x6 screw jack walls", done: false },
            { id: 'cl_fb_2', text: "Plane deflected bottom crown of 1910 virgin timber carrier beam", done: false },
            { id: 'cl_fb_3', text: "Sandwich beam between two 1/2-inch x 10-inch x 24-ft structural steel flitch plates", done: false },
            { id: 'cl_fb_4', text: "Drill 13/16-inch holes and torque 3/4-inch grade 8 through-bolts to 150 ft-lbs", done: false }
        ],
        materials: [
            { id: 'mat_fb_1', name: "1/2\" x 10\" x 24' A36 Structural Steel Flitch Plates (2 pcs)", qty: "2 plates", cost: 950, status: "Needed" },
            { id: 'mat_fb_2', name: "3/4\" Grade 8 Heavy Hex Through-Bolts with Lock Washers", qty: "36 sets", cost: 140, status: "Needed" },
            { id: 'mat_fb_3', name: "Structural Red Oxide Metal Primer (1 gallon)", qty: "1 gal", cost: 55, status: "On Site" }
        ],
        tools: [
            { id: 'tl_fb_1', name: "Magnetic Base Drill Press & 13/16\" Annular Cutter", status: "Need to Rent" },
            { id: 'tl_fb_2', name: "1/2-inch Drive Calibrated Torque Wrench (250 ft-lbs)", status: "Have" },
            { id: 'tl_fb_3', name: "Adjustable Steel Screw Jacks (6 pcs)", status: "Have" }
        ]
    },
    plumb_replace_lead_lines: {
        priority: 2,
        fundingGoal: 1400,
        fundingRaised: 700,
        checklist: [
            { id: 'cl_pl_1', text: "Shut off municipal curb stop valve & drain basement supply riser", done: true },
            { id: 'cl_pl_2', text: "Saw out & safely abate all legacy lead supply pipes and galvanized nipples", done: true },
            { id: 'cl_pl_3', text: "Drill joist pass-throughs and pull 3/4-inch continuous Uponor PEX-A potable main", done: false },
            { id: 'cl_pl_4', text: "Expand ProPEX brass fittings and connect home run distribution manifold", done: false },
            { id: 'cl_pl_5', text: "Perform 24-hour hydrostatic pressure test at 100 PSI before wall closing", done: false }
        ],
        materials: [
            { id: 'mat_pl_1', name: "Uponor ProPEX 3/4-inch PEX-A Potable Water Tubing (300 ft)", qty: "300 ft", cost: 240, status: "On Site" },
            { id: 'mat_pl_2', name: "Lead-Free Brass ProPEX Expansion Couplings & Tees", qty: "40 pcs", cost: 160, status: "On Site" },
            { id: 'mat_pl_3', name: "Stainless Steel 12-Port Balancing Manifold with Valves", qty: "1 manifold", cost: 210, status: "Needed" },
            { id: 'mat_pl_4', name: "Hydrostatic Test Gauge & Schrader Valve Assembly", qty: "1 unit", cost: 35, status: "On Site" }
        ],
        tools: [
            { id: 'tl_pl_1', name: "Milwaukee M12 ProPEX Expansion Tool Kit", status: "Have" },
            { id: 'tl_pl_2', name: "Heavy-Duty Ratcheting Pipe Shears", status: "Have" },
            { id: 'tl_pl_3', name: "100 PSI Hydrostatic Air Pressure Test Kit", status: "Have" }
        ]
    },
    sun_flight_controls: {
        priority: 4,
        fundingGoal: 2400,
        fundingRaised: 1500,
        checklist: [
            { id: 'cl_sfc_1', text: "Reinforce solarium floor joists for 350-lb dynamic motion load", done: true },
            { id: 'cl_sfc_2', text: "Weld tubular steel 3-DOF motion base frame with industrial universal joints", done: true },
            { id: 'cl_sfc_3', text: "Mount dual 12V high-torque electric linear actuators with hall effect sensors", done: false },
            { id: 'cl_sfc_4', text: "Wire HOTAS flight stick, split throttle & rudder pedals to microcontroller", done: false },
            { id: 'cl_sfc_5', text: "Assemble CNC aluminum overhead cockpit panel with illuminated toggle switches", done: false },
            { id: 'cl_sfc_6', text: "Mount triple 49-inch curved 144Hz displays with anti-glare solarium tint", done: false }
        ],
        materials: [
            { id: 'mat_sfc_1', name: "High-Speed Industrial Linear Actuators (2 pcs)", qty: "2 units", cost: 480, status: "Needed" },
            { id: 'mat_sfc_2', name: "Tubular Steel Frame Stock & Heavy Pillow Block Bearings", qty: "40 ft", cost: 280, status: "On Site" },
            { id: 'mat_sfc_3', name: "CNC-Milled 6061 Aluminum Overhead Panel with Toggle Covers", qty: "1 unit", cost: 180, status: "On Site" },
            { id: 'mat_sfc_4', name: "Dual 50W Tactile Bass Shakers & Subwoofer Amplifier", qty: "1 kit", cost: 160, status: "Needed" }
        ],
        tools: [
            { id: 'tl_sfc_1', name: "MIG Welder & Angle Grinder with Flap Discs", status: "Have" },
            { id: 'tl_sfc_2', name: "Digital Multimeter & Temperature-Controlled Soldering Station", status: "Have" },
            { id: 'tl_sfc_3', name: "Hex Key & Socket Driver Precision Assembly Set", status: "Have" }
        ]
    }
};

// COMMUNITY SUPPORTER RESTORATION CHALLENGES (POSTED BY JACK)
GAME_DATA.COMMUNITY_CHALLENGES = [
        {
            id: "chall_jack_1",
            title: "60-Ton Frame Jacking Sequence without Cracking Plaster",
            category: "advice",
            categoryLabel: "💡 Constructive Advice",
            room: "Basement",
            roomName: "1910 Bad Foundation & 60-Ton Frame",
            urgency: "Critical",
            urgencyBadge: "🚨 Critical",
            description: "Preparing to use four 20-ton synchronized hydraulic cylinders on heavy oak cribbing to level the 116-year-old southeast corner. Upper guest suites still hold intact original horsehair lime plaster walls. What maximum lift rate per 24h is recommended, and what stabilization measures prevent frame torquing?",
            poster: "Jack (Lead Restorer)",
            date: "Oct 2, 2026",
            status: "Active • 6 Responses"
        },
        {
            id: "chall_jack_2",
            title: "Sourcing 10-12 Reclaimed True 2x8 Virgin Douglas Fir Joists",
            category: "salvage",
            categoryLabel: "🪵 Salvage & Material Lead",
            room: "Basement",
            roomName: "1910 Bad Foundation & 60-Ton Frame",
            urgency: "High",
            urgencyBadge: "⚡ High Priority",
            description: "Need 10-12 pieces of true full-dimension 2x8 virgin Douglas fir (circa 1900-1925, 30+ rings/inch) at 14ft lengths to sister compromised floor joists in the cellar. Looking for regional salvage yards, barn deconstructions, or timber reclamation mills within 150 miles.",
            poster: "Jack (Lead Restorer)",
            date: "Oct 4, 2026",
            status: "Active • 4 Sourcing Leads"
        },
        {
            id: "chall_jack_3",
            title: "Matching Sea Green Vermont Slate for Tower Cupola",
            category: "salvage",
            categoryLabel: "🪵 Salvage & Material Lead",
            room: "RoofAttic",
            roomName: "Victorian Slate Roofing & Cupola",
            urgency: "Medium",
            urgencyBadge: "🪵 Needed",
            description: "Restoring the Victorian cupola requires 35 to 40 un-fading sea green slate tiles (approx 12x18 inch, 1/4-inch thickness, pre-punched nail holes). Anyone know of architectural salvage stashes or quarry contacts that carry antique matching lots?",
            poster: "Jack (Lead Restorer)",
            date: "Oct 5, 2026",
            status: "Active • 3 Sourcing Leads"
        },
        {
            id: "chall_jack_4",
            title: "Shop-Built Router Sled for Flattening Salvaged Oak Planks",
            category: "workshop",
            categoryLabel: "🧰 Workshop Trick",
            room: "TempShop",
            roomName: "Temporary Wood & Metal Fabrication Shop",
            urgency: "Normal",
            urgencyBadge: "⚙️ Shop Tooling",
            description: "In our temporary shop, we're flattening 22-inch wide salvaged white oak fireplace mantel slabs. What is the stiffest, lowest-cost shop-built router flattening sled setup (aluminum extrusion vs steel angle) to avoid mid-span deflection?",
            poster: "Jack (Lead Restorer)",
            date: "Oct 6, 2026",
            status: "Active • 8 Responses"
        }
    ];

    // CURATED COMMUNITY TIPS, SALVAGE LEADS & WORKSHOP TRICKS
    GAME_DATA.COMMUNITY_TIPS_DEFAULTS = [
        {
            id: "tip_1",
            category: "advice",
            categoryLabel: "💡 Constructive Advice",
            challengeId: "chall_jack_1",
            author: "Elias 'Old Oak' Vance",
            role: "Master Timber Framer & Historic Rigger (38 yrs)",
            title: "Max 1/8-inch Lift Per 24 Hours & Dial Indicators on Plaster",
            room: "Basement",
            roomName: "1910 Bad Foundation & 60-Ton Frame",
            content: "Jack, do NOT lift more than 1/8 inch every 24 hours. The old horsehair binder has dried over 116 years and needs time to creep and relax into the new position. Clamp a dial test indicator or laser level line across the ceiling plaster joists. When jacking, tighten structural temporary 6x6 posts with steel screw-jacks and shim with dry white oak wedges immediately after every pump.",
            location: "Olympic Peninsula, WA",
            upvotes: 42,
            date: "Oct 3, 2026",
            link: ""
        },
        {
            id: "tip_2",
            category: "salvage",
            categoryLabel: "🪵 Salvage Lead",
            challengeId: "chall_jack_2",
            author: "Sarah Lindqvist",
            role: "Architectural Salvage Scout & Reclaimer",
            title: "Deconstructed 1915 Grain Elevator Timbers in Snohomish",
            room: "Basement",
            roomName: "1910 Bad Foundation & 60-Ton Frame",
            content: "Pacific Northwest Timber Reclamation in Snohomish just brought in 800 board feet of true full 2x8 and 2x10 Douglas fir salvaged from a 1915 riverside grain mill. Tight grain (40 rings/in), denailed and metal-detector scanned. Call Wayne at the yard and mention Whispering Pines Manor — he holds prime timber for historic restorations.",
            location: "Snohomish Reclaimed Yards (Hwy 9)",
            upvotes: 38,
            date: "Oct 5, 2026",
            link: "https://example.com/pnw-timber-reclaim"
        },
        {
            id: "tip_3",
            category: "workshop",
            categoryLabel: "🧰 Workshop Trick",
            challengeId: "chall_jack_4",
            author: "Marcus Thorne",
            role: "Custom Furniture Maker & Guild Woodworker",
            title: "Dual 2x2 Unistrut Rails with Surfacing Dish Bit",
            room: "TempShop",
            roomName: "Temporary Wood & Metal Fabrication Shop",
            content: "Use 2 pieces of 12-gauge 1-5/8 inch slotted Unistrut (or Superstrut from electrical supply) for your router rails! They cost $30, are dead-flat, and zero deflection across 6 feet. Pair with a 2-inch carbide spoilboard surfacing cutter bit with replaceable 4-sided carbide inserts. Wax the metal rails with paste wax and you will glide like glass.",
            location: "Bellingham Maker Space",
            upvotes: 31,
            date: "Oct 7, 2026",
            link: ""
        },
        {
            id: "tip_4",
            category: "salvage",
            categoryLabel: "🪵 Salvage Lead",
            challengeId: "chall_jack_3",
            author: "Hannah Albright",
            role: "Slate Roofing Enthusiast & Restorer",
            title: "Vermont Un-Fading Green Lots at Architectural ReStore",
            room: "RoofAttic",
            roomName: "Victorian Slate Roofing & Cupola",
            content: "Tacoma ReBuilding Center has a pallet of vintage Chapman and Vermont Unfading Green roofing slate in their back masonry yard! They came off a 1908 chapel reroof. Bring a slate hammer or punch to verify hole placement. Most are intact 12x18s!",
            location: "Tacoma ReBuilding Center Yard #3",
            upvotes: 27,
            date: "Oct 6, 2026",
            link: ""
        },
        {
            id: "tip_5",
            category: "preservation",
            categoryLabel: "🏛️ Historic Preservation",
            challengeId: null,
            author: "Arthur Pendelton",
            role: "Historic Preservation Architect",
            title: "Stabilize Sagging Plaster with Perforated Brass Rosette Washers",
            room: "LivingRoom",
            roomName: "Guest Parlor & Hearth",
            content: "Before taking down sagging plaster in the Guest Parlor, inject synthetic conditioning adhesive (like Big Wally's Plaster Magic) through small 3/16 pilot holes, then pull the plaster back to the wood lath using perforated ceiling buttons and drywall screws. Let cure 48 hours, unscrew buttons, and skim with Durabond 90. Preserves 100% of the historic plaster texture without demolition dust!",
            location: "Seattle Heritage Trust",
            upvotes: 35,
            date: "Oct 4, 2026",
            link: ""
        },
        {
            id: "tip_6",
            category: "workshop",
            categoryLabel: "🧰 Workshop Trick",
            challengeId: null,
            author: "Dave 'GreaseMonkey' Miller",
            role: "Antique Tool Collector & Machinist",
            title: "Simple Electrolysis Tank for Rusted 1910 Hardware & Locks",
            room: "TempShop",
            roomName: "Temporary Wood & Metal Fabrication Shop",
            content: "To restore rusted cast iron rim locks and mortise boxes: 5-gallon bucket of water, 2 tablespoons washing soda (sodium carbonate), sacrificial rebar anode, and an old 12V 2A battery trickle charger. Hang the mortise lock on the cathode (-). After 8 hours all rust converts to loose black iron oxide and wipes off with a scotch-brite pad without eating away crisp brass maker stamps!",
            location: "Timber Basin Workshop",
            upvotes: 49,
            date: "Oct 1, 2026",
            link: ""
        },
        {
            id: "tip_7",
            category: "systems",
            categoryLabel: "⚡ Mechanical Systems",
            challengeId: null,
            author: "Carlos Gomez",
            role: "Licensed Master Plumber",
            title: "Home-Run Uponor PEX-A Manifold Loop Pressure Tips",
            room: "PlumbingHVAC",
            roomName: "Heritage Plumbing & HVAC",
            content: "When running your 3/4-inch PEX-A cold supply trunk down to the sub-cellar manifold, insulate the hot and cold lines with closed-cell neoprene sleeves everywhere they touch Douglas fir joists. The thermal expansion of PEX causes ticking clicks against dry wood that can echo through bedroom floors during cold winter mornings.",
            location: "Evergreen Mechanical Solutions",
            upvotes: 29,
            date: "Oct 6, 2026",
            link: ""
        },
        {
            id: "tip_8",
            category: "salvage",
            categoryLabel: "🪵 Salvage Lead",
            challengeId: null,
            author: "Rachel 'BarnFinder' Sterling",
            role: "Rural Deconstruction Scout",
            title: "Salvaged Wrought-Iron Porch Railings in Skagit Valley",
            room: "Exterior",
            roomName: "Wrap-Around Veranda & Lawn",
            content: "Spotted 48 linear feet of authentic 1910 Victorian scrollwork wrought-iron balustrade behind an estate barn being cleared off Highway 20 near Sedro-Woolley. Matches the Whispering Pines veranda profile. Owner is eager to see it re-homed to a real restoration rather than a scrap metal shredder.",
            location: "Skagit Valley Farmstead, Sedro-Woolley",
            upvotes: 22,
            date: "Oct 7, 2026",
            link: ""
        },
        {
            id: "tip_9",
            category: "workshop",
            categoryLabel: "🧰 Workshop Trick",
            challengeId: null,
            author: "Samir K.",
            role: "Cabinetmaker & Finish Carpenter",
            title: "Custom Heirloom Wax Blend for Restored Heart Pine",
            room: "TempShop",
            roomName: "Temporary Wood & Metal Fabrication Shop",
            content: "For historic wood trim and mantels: equal parts pure filtered beeswax, pure gum spirits of turpentine, and boiled linseed oil. Melt gently in a double boiler (no open flames!). Buffs to a glowing satin chatoyance and protects against humidity changes without modern plastic polyurethane film.",
            location: "Cascadia Woodcraft Guild",
            upvotes: 33,
            date: "Oct 5, 2026",
            link: ""
        },
        {
            id: "tip_10",
            category: "advice",
            categoryLabel: "💡 Constructive Advice",
            challengeId: null,
            author: "Ken 'Foundation' Bradley",
            role: "Structural Foundation Specialist",
            title: "Breathable Natural Hydraulic Lime Mortar for Cellar Stone",
            room: "Basement",
            roomName: "1910 Bad Foundation & 60-Ton Frame",
            content: "Do not use modern Portland cement mortar on those 1910 stone cellar walls! Portland is too stiff and causes historic fieldstones to spall and crack. Use an NHL 3.5 Natural Hydraulic Lime mortar mix or Type N lime blend so the wall can breathe and flex with ground frost heave.",
            location: "Portland Historic Masonry",
            upvotes: 41,
            date: "Oct 4, 2026",
            link: ""
        }
    ];

    // ARCHITECTURAL SALVAGE & SPECIALTY MATERIAL SOURCING RADAR
    GAME_DATA.SALVAGE_DIRECTORY = [
        {
            id: "salv_1",
            name: "Pacific Northwest Architectural Salvage & Timber",
            type: "Reclaimed Lumber & Heavy Timbers",
            icon: "🪵",
            region: "Snohomish & King County, WA",
            specialty: "True-dimension virgin Douglas fir, old-growth red cedar shingles, heart pine flooring.",
            contact: "(360) 555-TIMB • yard@pnwreclaim.org"
        },
        {
            id: "salv_2",
            name: "Sound Heritage Architectural Salvage",
            type: "Vintage Hardware & Millwork",
            icon: "🔩",
            region: "Tacoma & Pierce County, WA",
            specialty: "Cast bronze door hardware, mortise locks, Victorian mantels, pocket door rollers.",
            contact: "(253) 555-DOOR • info@soundheritage.com"
        },
        {
            id: "salv_3",
            name: "Cascadia Historic Masonry & Slate Exchange",
            type: "Stone, Brick & Roofing Slate",
            icon: "🧱",
            region: "Seattle & Bellingham, WA",
            specialty: "Clinker bricks, Vermont sea green & black slate tiles, carved sandstone plinths.",
            contact: "(206) 555-ROOF • slate@cascadiahistoric.org"
        },
        {
            id: "salv_4",
            name: "Timber Basin ReStore & Deconstruction Depot",
            type: "General Architectural Salvage",
            icon: "🪟",
            region: "Timber Basin Valley, WA",
            specialty: "Antique wavy cylinder glass sashes, solid wood doors, cast iron clawfoot tubs.",
            contact: "(360) 555-REST • restore@timberbasin.org"
        }
    ];

    // SUPPORTER ADOPTION TIERS FOR COMMEMORATIVE ENGRAVED PLAQUES
    GAME_DATA.ADOPTION_TIERS = {
        board: {
            id: "board",
            name: "Adopt a Board",
            icon: "🪵",
            badge: "🪵 Adopt-a-Board",
            amount: 75,
            material: "Reclaimed Virgin Douglas Fir / White Oak",
            description: "Permanent pyrographic brand on a restored historic timber joist, rafter, or porch board.",
            locationType: "Rafter, Floor Joist, or Decking Board",
            previewStyle: "wood"
        },
        tile: {
            id: "tile",
            name: "Adopt a Tile",
            icon: "🪨",
            badge: "🪨 Adopt-a-Tile",
            amount: 150,
            material: "125-Year Vermont Sea Green / Peach Bottom Slate",
            description: "Hand-incised inscription on an authentic historic roof slate tile or encaustic hearth tile.",
            locationType: "Cupola Collar, Valley Flashing, or Hearth Surround",
            previewStyle: "slate"
        },
        brass: {
            id: "brass",
            name: "Founding Brass Plaque",
            icon: "🪙",
            badge: "🪙 Bedrock Brass Plaque",
            amount: 500,
            material: "Cast Architectural Alloy 260 Brass with Relief Border",
            description: "Deep-relief engraved Roman lettering permanently mounted into bedrock concrete footing piers.",
            locationType: "Bedrock Footing Pier or Entry Vestibule",
            previewStyle: "brass"
        },
        suite: {
            id: "suite",
            name: "Heritage Suite Sponsor",
            icon: "🏛️",
            badge: "🏛️ Heritage Suite",
            amount: 1200,
            material: "Hand-Carved Quarter-Sawn American Walnut",
            description: "Permanent carved suite door dedication, commemorative deed certificate, and complimentary stay.",
            locationType: "Upper Guest Suite Entry",
            previewStyle: "walnut"
        }
    };

    // PUBLIC BACKER HALL OF FAME WALL DEFAULTS
    GAME_DATA.HALL_OF_FAME_DEFAULTS = [
        {
            id: "hof_1",
            tier: "board",
            tierName: "Adopt a Board",
            amount: 75,
            donorName: "Wayne & Carol Vance",
            location: "Guest Parlor & Hearth",
            itemLabel: "Douglas Fir Joist #14",
            inscription: "In memory of Thaddeus Vance — keeping historic timber honest.",
            date: "Oct 2, 2026",
            verified: true,
            avatar: "🪵"
        },
        {
            id: "hof_2",
            tier: "tile",
            tierName: "Adopt a Tile",
            amount: 150,
            donorName: "The Henderson Family",
            location: "Victorian Slate Roofing & Cupola",
            itemLabel: "Vermont Green Slate #42",
            inscription: "Restoring the skyline of Timber Basin, one vintage slate at a time.",
            date: "Oct 3, 2026",
            verified: true,
            avatar: "🪨"
        },
        {
            id: "hof_3",
            tier: "brass",
            tierName: "Founding Brass Plaque",
            amount: 500,
            donorName: "Elias Vance & Cascadia Timber Guild",
            location: "1910 Bad Foundation & 60-Ton Frame",
            itemLabel: "Bedrock Pier Plaque #01",
            inscription: "Synchronized hydraulic jacking 2026. A true foundation for the next 100 years.",
            date: "Oct 4, 2026",
            verified: true,
            avatar: "🪙"
        },
        {
            id: "hof_4",
            tier: "board",
            tierName: "Adopt a Board",
            amount: 75,
            donorName: "Sarah Lindqvist (Salvage Scout)",
            location: "1910 Bad Foundation & 60-Ton Frame",
            itemLabel: "Reclaimed Grain Elevator 2x8 Joist #07",
            inscription: "Salvaged from Snohomish River Mill. Reclaimed with love and care.",
            date: "Oct 4, 2026",
            verified: true,
            avatar: "🪵"
        },
        {
            id: "hof_5",
            tier: "tile",
            tierName: "Adopt a Tile",
            amount: 150,
            donorName: "Hannah Albright",
            location: "Victorian Slate Roofing & Cupola",
            itemLabel: "Peach Bottom Black Slate #88",
            inscription: "For Jack & Jumper — may the cupola weathervane always face true north.",
            date: "Oct 5, 2026",
            verified: true,
            avatar: "🪨"
        },
        {
            id: "hof_6",
            tier: "brass",
            tierName: "Founding Brass Plaque",
            amount: 500,
            donorName: "Dr. Aris & Eleanor Thorne",
            location: "1910 Bad Foundation & 60-Ton Frame",
            itemLabel: "Flitch Plate Carrying Beam Plaque #02",
            inscription: "Engineered with 1/2-inch structural steel flitch plates. Strength in preservation.",
            date: "Oct 5, 2026",
            verified: true,
            avatar: "🪙"
        },
        {
            id: "hof_7",
            tier: "board",
            tierName: "Adopt a Board",
            amount: 75,
            donorName: "Marcus Thorne (Woodworker)",
            location: "Temporary Wood & Metal Fabrication Shop",
            itemLabel: "Hard Maple Bench Top Slat #03",
            inscription: "To good tools, sharp chisels, and honest craftsmanship.",
            date: "Oct 6, 2026",
            verified: true,
            avatar: "🪵"
        },
        {
            id: "hof_8",
            tier: "tile",
            tierName: "Adopt a Tile",
            amount: 150,
            donorName: "Arthur Pendelton (Preservationist)",
            location: "Guest Parlor & Hearth",
            itemLabel: "Encaustic Fireplace Hearth Tile #19",
            inscription: "Conditioned lime plaster and authentic craft endure all seasons.",
            date: "Oct 6, 2026",
            verified: true,
            avatar: "🪨"
        },
        {
            id: "hof_9",
            tier: "suite",
            tierName: "Heritage Suite Sponsor",
            amount: 1200,
            donorName: "Timber Basin Historic Preservation Trust",
            location: "Heritage Guest Rooms",
            itemLabel: "Master Suite Carved Walnut Plaque",
            inscription: "In honor of all who preserve the Pacific Northwest architectural tradition.",
            date: "Oct 7, 2026",
            verified: true,
            avatar: "🏛️"
        },
        {
            id: "hof_10",
            tier: "board",
            tierName: "Adopt a Board",
            amount: 75,
            donorName: "Rachel Sterling (Barn Scout)",
            location: "Wrap-Around Veranda & Lawn",
            itemLabel: "Tongue & Groove Cedar Porch Board #54",
            inscription: "Keep the coffee hot on the veranda. Proud to support Whispering Pines!",
            date: "Oct 7, 2026",
            verified: true,
            avatar: "🪵"
        },
        {
            id: "hof_11",
            tier: "tile",
            tierName: "Adopt a Tile",
            amount: 150,
            donorName: "Carlos & Elena Gomez",
            location: "Victorian Slate Roofing & Cupola",
            itemLabel: "Vermont Un-Fading Green Slate #102",
            inscription: "Tight copper nails and clean flashing. Good luck on the high roof!",
            date: "Oct 8, 2026",
            verified: true,
            avatar: "🪨"
        },
        {
            id: "hof_12",
            tier: "board",
            tierName: "Adopt a Board",
            amount: 75,
            donorName: "Dave 'GreaseMonkey' Miller",
            location: "Carriage House & Garage",
            itemLabel: "Overhead 6x8 Hoist Timber #02",
            inscription: "Heavy iron and seasoned timber never rust away with care.",
            date: "Oct 8, 2026",
            verified: true,
            avatar: "🪵"
        }
    ];

if (typeof window !== 'undefined') {
    window.GAME_DATA = GAME_DATA;
}
if (typeof module !== 'undefined' && module.exports) {
    module.exports = GAME_DATA;
}


