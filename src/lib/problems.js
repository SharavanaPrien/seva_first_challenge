export const STATIC_PROBLEMS = [
    {
        "problem_id": "PF-PS-01",
        "title": "Wireless telemetry for high-speed bearing temperature/strain",
        "track": "UG / PG",
        "category": "Seva First Challenge",
        "summary": "Design a solution for wireless telemetry for high-speed bearing temperature/strain",
        "description": "Background:\nRotating machinery such as steam and gas turbines, CNC spindles, motors and gearboxes depends on bearings that operate continuously at high speed and load. Bearing failure is one of the leading causes of unplanned downtime in manufacturing, power and defence-related industries. Surface temperature and dynamic strain are among the earliest indicators of lubrication breakdown, overload, misalignment and fatigue, but measuring them directly on the rotating element remains difficult.\nDetailed Description:\nConventional condition monitoring relies on stationary thermocouples and accelerometers mounted on the bearing housing. These measure conditions indirectly and with a time lag, and they miss localized heating and dynamic strain occurring on the rotating inner race or shaft. Slip rings that could carry signals from a rotating part wear out quickly, add electrical noise and are unsuitable at very high RPM, while wired sensors cannot be routed onto a rotating assembly at all.\nAny embedded solution must survive centrifugal forces, vibration, heat and lubricant exposure, transmit data through metallic enclosures that attenuate radio signals, and be powered without wires or frequent battery changes. The major impacts of bearing failures are as below:\n\u2022  Reliability \u2013 Sudden bearing seizure leading to unplanned shutdowns\n\u2022  Safety \u2013 Risk of catastrophic failure of high-speed rotating assemblies\n\u2022  Maintenance \u2013 Replacement is carried out on fixed schedules or after damage, raising spare and labour costs\n\u2022  Quality \u2013 Thermal growth in CNC spindles degrades machining accuracy and surface finish\n\u2022  Asset Life \u2013 Secondary damage to shafts, housings and adjacent components\nExpected Solution:\nTo develop an ultra-compact, wireless sensor telemetry system that can be mounted on or inside rotating bearing assemblies to continuously capture dynamic strain and temperature, and convert them into actionable health information.\nThe proposed system architecture may include the following:\n1.  Miniaturized Sensing Module using strain gauges or MEMS strain elements and temperature sensors suited to rotating parts.\n2.  Energy Harvesting and Power Management using vibration, thermal or RF harvesting with ultra-low-power electronics to avoid battery dependence.\n3.  Robust Wireless Link (BLE, sub-GHz or UWB) designed to work reliably through metallic housings with minimal latency.\n4.  Mechanically Balanced Packaging that withstands high speed, vibration, heat and lubricant exposure without disturbing rotor balance.\n5.  Edge Analytics and Anomaly Detection to track trends and flag abnormal temperature or strain signatures early.\n6.  Integration with SCADA, PLC and CMMS platforms for dashboards, alarms and maintenance planning.\n7.  Others\nThe proposed solution aims to enable early fault detection at the source, reduce unplanned downtime and move rotating-equipment maintenance from reactive to predictive.",
        "tags": [
            "Hardware"
        ],
        "difficulty": "Medium",
        "published": true,
        "order": 1
    },
    {
        "problem_id": "PF-PS-02",
        "title": "Conveyor-belt joint rupture & damage monitoring",
        "track": "UG / PG",
        "category": "Seva First Challenge",
        "summary": "Design a solution for conveyor-belt joint rupture & damage monitoring",
        "description": "Background:\nIn iron ore and other mining operations, conveyor belt systems are the backbone of material transportation, moving ore continuously from the mining face to crushing, screening, stockyard and dispatch areas. One of the major operational challenges is conveyor belt joint rupture and belt damage, as belt joints are highly vulnerable to failure due to excessive tension, misalignment, wear, overloading and maintenance deficiencies. Unexpected belt failures cause production downtime, safety risks, high maintenance costs and damage to associated equipment.\nDetailed Description:\nConveyor belt joints are continuously exposed to heavy loads, high tension, dust, moisture and frequent start-stop operations. These conditions gradually damage the belt and its splices through cracks, wear, edge damage, rubber weakening and splice failure. If not detected early, these defects can lead to sudden belt rupture and major breakdowns.\nInspections are mostly manual and carried out at fixed intervals, making it difficult to identify early signs of failure. Maintenance is largely reactive, with repairs performed only after visible damage or breakdown occurs. The major impacts on mining operations are as below:\n\u2022  Production \u2013 Loss of ore transportation capacity\n\u2022  Maintenance \u2013 Increased repair and spare cost\n\u2022  Safety \u2013 Risk of accidents during belt rupture\n\u2022  Energy \u2013 Higher power consumption due to misalignment and friction\n\u2022  Asset Life \u2013 Reduced conveyor and pulley lifespan\n\u2022  Sustainability \u2013 Material spillage and wastage\nExpected Solution:\nTo develop an Intelligent Conveyor Belt Health Monitoring and Predictive Maintenance System using digitalization, IoT, AI and machine learning to detect early signs of belt joint deterioration and damage.\nThe proposed system architecture may include the following:\n1.  IoT-Based Sensor Integration for real-time monitoring using vibration, temperature, belt tracking, acoustic, load, speed and tension data.\n2.  AI-Based Vision Monitoring using smart cameras and thermal imaging to detect cracks, tears, longitudinal rips, overheating, misalignment and splice pull-outs.\n3.  Drone and Camera-Based Inspection Systems for hard-to-reach conveyor sections.\n4.  Digital Twin of the Conveyor System to simulate operations, monitor equipment health and analyze behavior in real time.\n5.  Integration with existing SCADA, PLC and other pre-existing conveyor monitoring systems.\n6.  AI/ML-Based Predictive Analytics for failure forecasting and automated alerts or stop commands.\n7.  Others\nThe proposed solution aims to reduce unplanned downtime, improve safety, minimize maintenance costs and enhance conveyor reliability and operational efficiency.",
        "tags": [
            "Software"
        ],
        "difficulty": "Medium",
        "published": true,
        "order": 2
    },
    {
        "problem_id": "PF-PS-03",
        "title": "Mine-vehicle safety in fog/low visibility",
        "track": "UG / PG",
        "category": "Seva First Challenge",
        "summary": "Design a solution for mine-vehicle safety in fog/low visibility",
        "description": "Background:\nOpen-cast and underground mines rely on large haul trucks, dumpers and support vehicles operating around the clock on shared haul roads. Dense fog, suspended dust, rain and night operations frequently reduce visibility to near zero, increasing the risk of collisions between vehicles, with personnel, with road edges and with stationary equipment.\nDetailed Description:\nOperators currently depend on their own vision, radio communication and basic reversing cameras, all of which perform poorly in dust and fog. Large trucks have extensive blind spots, long stopping distances and heavy loads, so even a short delay in hazard recognition can lead to a serious accident. Optical cameras and lidar degrade significantly in suspended particulates, and commercial collision-avoidance systems are often costly and difficult to retrofit on mixed fleets.\nThe major impacts of low-visibility accidents in mines are as below:\n\u2022  Safety \u2013 Fatalities and injuries to operators and ground personnel\n\u2022  Production \u2013 Halted haulage cycles after incidents and near misses\n\u2022  Equipment \u2013 Damage to high-value trucks and loaders\n\u2022  Cost \u2013 Insurance, investigation and compliance burden\n\u2022  Productivity \u2013 Reduced speeds and stoppages during poor-visibility periods\nExpected Solution:\nTo develop a robust onboard collision-avoidance and perimeter alert system for heavy mining vehicles that remains dependable in fog, dust and darkness.\nThe proposed system architecture may include the following:\n1.  Multi-Modal Sensing combining mmWave radar, thermal imaging and ultrasonic or lidar sensors that tolerate heavy particulates.\n2.  Sensor Fusion and Object Classification to distinguish vehicles, people and obstacles from dust clutter.\n3.  Edge Compute Unit for real-time processing with low latency on vehicle power systems.\n4.  Operator Alert Interface using audible, visual and haptic warnings with graded alert levels.\n5.  Vehicle-to-Vehicle and Fleet Integration with dispatch and fleet-management systems for situational awareness.\n6.  Rugged, Retrofit-Friendly Packaging suited to vibration, shock and mine environments.\n7.  Others\nThe proposed solution aims to prevent collisions, improve safety in low-visibility conditions and keep haulage operations running reliably.",
        "tags": [
            "Hardware"
        ],
        "difficulty": "Medium",
        "published": true,
        "order": 3
    },
    {
        "problem_id": "PF-PS-04",
        "title": "Low-cost real-time mine-subsidence monitoring",
        "track": "UG / PG",
        "category": "Seva First Challenge",
        "summary": "Design a solution for low-cost real-time mine-subsidence monitoring",
        "description": "Background:\nUnderground and opencast mining can cause ground movement and surface subsidence that threaten infrastructure, buildings, roads, water bodies and nearby communities. Continuous monitoring of ground displacement across mining perimeters is essential for safety planning, regulatory compliance and community protection.\nDetailed Description:\nPresent monitoring methods include periodic total-station and GNSS surveys, extensometers and satellite or radar interferometry. These approaches are expensive, labor-intensive or provide data only at intervals, so slow but accelerating ground movement can go unnoticed until visible damage appears. High unit cost limits the number of monitoring points, leaving large areas poorly covered, especially in remote mining regions with no grid power or cellular coverage.\nThe major impacts of undetected subsidence are as below:\n\u2022  Safety \u2013 Risk to workers, residents and public infrastructure\n\u2022  Environment \u2013 Surface cracking, drainage disruption and land degradation\n\u2022  Legal and Social \u2013 Compensation claims and loss of community trust\n\u2022  Operations \u2013 Sudden restrictions or shutdowns of mining blocks\n\u2022  Cost \u2013 Expensive repair of structures, roads and utilities\nExpected Solution:\nTo develop an affordable, distributed network of ground-displacement sensor nodes that provides near real-time, high-resolution subsidence monitoring over wide mining areas.\nThe proposed system architecture may include the following:\n1.  Low-Cost Displacement Sensing Nodes using GNSS, tilt, MEMS or other precise positioning techniques.\n2.  Autonomous Power System based on solar and battery management for long unattended operation.\n3.  Long-Range Low-Power Communication (for example LoRaWAN) with mesh or gateway architecture across wide areas.\n4.  Cloud and Edge Data Platform for data validation, drift correction and geospatial visualization.\n5.  Threshold-Based Early Warning with automated alerts to mine safety teams.\n6.  Rugged Enclosures resistant to weather, dust and tampering.\n7.  Others\nThe proposed solution aims to make dense, continuous subsidence monitoring economically feasible and enable proactive safety decisions.",
        "tags": [
            "Hardware"
        ],
        "difficulty": "Medium",
        "published": true,
        "order": 4
    },
    {
        "problem_id": "PF-PS-05",
        "title": "Modular autonomous mobile robot for warehouses",
        "track": "UG / PG",
        "category": "Seva First Challenge",
        "summary": "Design a solution for modular autonomous mobile robot for warehouses",
        "description": "Background:\nWarehouses and fulfilment centers are under pressure to handle growing order volumes with shorter delivery times and fluctuating labor availability. Autonomous Mobile Robots (AMRs) are increasingly used for internal logistics, but many existing platforms are proprietary, single-purpose and expensive for small and medium enterprises.\nDetailed Description:\nMost commercial robots are designed for one task, such as towing, shelf transport or pallet moving, and require significant infrastructure such as magnetic tape or fixed markers. Changing a task generally means buying another robot. Warehouse floors are dynamic, with moving people, forklifts, changing layouts and temporary obstacles, which demands robust perception, navigation and safe interaction.\nThe major impacts of these limitations are as below:\n\u2022  Cost \u2013 High capital investment for task-specific robots\n\u2022  Flexibility \u2013 Poor adaptability to layout and process changes\n\u2022  Utilization \u2013 Robots idle when the payload type does not match demand\n\u2022  Safety \u2013 Risk in mixed human-robot work areas\n\u2022  Scalability \u2013 Vendor lock-in limiting integration and upgrades\nExpected Solution:\nTo develop an open-standard, modular AMR platform with a common base that can dock and operate a range of swappable payload modules.\nThe proposed system architecture may include the following:\n1.  Modular Mobile Base with standardized mechanical, electrical and data interfaces for payload docking.\n2.  Swappable Payload Modules such as shelf-towing, bin-picking and pallet-carrying attachments.\n3.  Infrastructure-Free Navigation using SLAM with lidar, vision and sensor fusion for dynamic environments.\n4.  Safety Systems including obstacle detection, safe-speed zones and emergency stop.\n5.  Battery Swap and Docking System enabling high uptime.\n6.  Fleet Management Software for task allocation, traffic management and WMS/ERP integration.\n7.  Others\nThe proposed solution aims to lower the cost of warehouse automation and give businesses a flexible, scalable robotic platform.",
        "tags": [
            "Hardware"
        ],
        "difficulty": "Medium",
        "published": true,
        "order": 5
    },
    {
        "problem_id": "PF-PS-06",
        "title": "Smart industrial inspection robot",
        "track": "UG / PG",
        "category": "Seva First Challenge",
        "summary": "Design a solution for smart industrial inspection robot",
        "description": "Background:\nIndustrial facilities such as chemical plants, substations, boilers and storage vaults contain confined or hazardous spaces that must be inspected regularly for safety and reliability. Human entry into these spaces is risky due to toxic gases, high temperature, electrical hazards, limited oxygen and restricted access.\nDetailed Description:\nInspection is often manual, periodic and dependent on the inspector's skill. Confined-space entry demands permits, shutdowns, ventilation and rescue arrangements, which are time-consuming and costly. Defects such as cracks, corrosion, leaks and thermal hot spots may be missed or detected late. Existing inspection robots are often expensive, bulky or limited to a single sensing method.\nThe major impacts of inadequate inspection are as below:\n\u2022  Safety \u2013 Human exposure to hazardous environments\n\u2022  Downtime \u2013 Shutdowns required for manual inspection\n\u2022  Reliability \u2013 Missed early-stage faults leading to failures\n\u2022  Cost \u2013 Permit, preparation and rescue overheads\n\u2022  Compliance \u2013 Incomplete or inconsistent inspection records\nExpected Solution:\nTo develop a compact, smart inspection robot that can safely enter hazardous or confined spaces and autonomously detect structural faults, leaks and thermal anomalies.\nThe proposed system architecture may include the following:\n1.  Compact, Rugged Mobile Platform capable of traversing uneven surfaces, cable trays and tight spaces.\n2.  Multi-Spectral Sensing with visual, thermal and gas or leak detection payloads.\n3.  AI-Based Defect Detection to identify cracks, corrosion, leaks and overheating from captured data.\n4.  Secure Wireless Telemetry and Teleoperation with live video and sensor feeds.\n5.  Protective Design suited to dust, moisture, explosive atmospheres and high temperature.\n6.  Inspection Reporting and Asset Management Integration with geo-tagged findings and trend comparison.\n7.  Others\nThe proposed solution aims to remove people from dangerous inspections, improve fault detection and support predictive maintenance.",
        "tags": [
            "Hardware"
        ],
        "difficulty": "Medium",
        "published": true,
        "order": 6
    },
    {
        "problem_id": "PF-PS-07",
        "title": "Smart mini cold-storage system for vegetables",
        "track": "UG / PG",
        "category": "Seva First Challenge",
        "summary": "Design a solution for smart mini cold-storage system for vegetables",
        "description": "Background:\nA large share of fruits and vegetables in developing regions is lost after harvest because smallholder farmers lack affordable cold storage near the farm. Perishable produce must be sold immediately at whatever price is offered, a situation known as distress sale, which depresses farmer income.\nDetailed Description:\nConventional cold storages are large, capital-intensive, located far from farms and dependent on reliable grid electricity. Many farmers produce only small, frequent batches that do not justify such facilities. Without proper temperature and humidity control, vegetables lose moisture, quality and shelf life within hours or days.\nThe major impacts of inadequate farm-gate storage are as below:\n\u2022  Income \u2013 Distress sales at low prices\n\u2022  Food Loss \u2013 Spoilage and quality deterioration\n\u2022  Energy \u2013 Dependence on unreliable or costly grid power\n\u2022  Supply Chain \u2013 Weak linkage to better markets\n\u2022  Sustainability \u2013 Wasted water, land and inputs used to grow lost produce\nExpected Solution:\nTo develop a smart, modular micro cold-storage system suitable for farm-gate use that preserves vegetables with low energy use and low operating cost.\nThe proposed system architecture may include the following:\n1.  Compact Insulated Chamber designed for small-batch storage and modular scaling.\n2.  Energy-Efficient Cooling using solar-powered refrigeration, evaporative or phase-change thermal storage.\n3.  Smart Control and Sensing for temperature, humidity and gas regulation with automatic adjustment.\n4.  IoT Monitoring and Mobile Alerts for remote status checking and spoilage warnings.\n5.  Eco-Friendly Design using low-GWP refrigerants or alternative cooling methods.\n6.  Market Linkage Features such as inventory tracking and sale-timing guidance.\n7.  Others\nThe proposed solution aims to reduce post-harvest losses and give smallholder farmers greater control over when and where they sell.",
        "tags": [
            "Hardware"
        ],
        "difficulty": "Medium",
        "published": true,
        "order": 7
    },
    {
        "problem_id": "PF-PS-08",
        "title": "Low-cost lightweight milk-chilling system",
        "track": "UG / PG",
        "category": "Seva First Challenge",
        "summary": "Design a solution for low-cost lightweight milk-chilling system",
        "description": "Background:\nMilk is highly perishable and begins to spoil within a few hours of milking if not cooled promptly. In many rural areas, dairy farmers deliver milk to collection centers over long distances without refrigeration, leading to bacterial growth, reduced quality and rejection.\nDetailed Description:\nBulk milk coolers installed at village collection centers are expensive, require stable three-phase power and are inaccessible to small farmers. Individual farmers often have little option but to transport warm milk. Existing portable solutions are heavy, energy-hungry or difficult to clean, which creates hygiene risks.\nThe major impacts of delayed or inadequate chilling are as below:\n\u2022  Quality \u2013 Bacterial growth and souring of milk\n\u2022  Income \u2013 Lower prices or rejection of milk lots\n\u2022  Health \u2013 Food-safety risk to consumers\n\u2022  Energy \u2013 High consumption or no access to power\n\u2022  Cost \u2013 High capital cost of conventional chillers for small farmers\nExpected Solution:\nTo develop a low-cost, lightweight and energy-efficient milk-chilling system that can be used at the farm or village level, even where grid power is limited.\nThe proposed system architecture may include the following:\n1.  Efficient Heat-Exchange Design for rapid cooling of fresh milk with food-grade materials.\n2.  Alternative Power and Thermal Storage using solar, battery or ice/PCM-based cooling.\n3.  Hygienic, Easy-to-Clean Construction that meets dairy sanitation practices.\n4.  Smart Monitoring of milk temperature and chilling progress with alerts.\n5.  Portable and Modular Form Factor for different farm sizes and transport.\n6.  Data Logging for traceability and quality-linked payments.\n7.  Others\nThe proposed solution aims to improve milk quality, reduce spoilage and increase farmer income through affordable chilling.",
        "tags": [
            "Hardware"
        ],
        "difficulty": "Medium",
        "published": true,
        "order": 8
    },
    {
        "problem_id": "PF-PS-09",
        "title": "Smart feed/silage quality testing",
        "track": "UG / PG",
        "category": "Seva First Challenge",
        "summary": "Design a solution for smart feed/silage quality testing",
        "description": "Background:\nSilage and prepared feed are a major input in dairy and livestock farming. Their nutritional value and safety depend on moisture content, acidity and the quality of fermentation. Poorly fermented or spoiled feed reduces animal productivity and can introduce toxins harmful to animal health and milk quality.\nDetailed Description:\nFarmers usually judge silage by smell, color and texture, which is subjective and unreliable. Accurate analysis currently requires sending samples to laboratories, where results take days and cost money, so decisions on feeding are made before results arrive. Mycotoxins and hidden spoilage cannot be identified by visual inspection.\nThe major impacts of undetected poor feed quality are as below:\n\u2022  Animal Health \u2013 Digestive problems and toxin exposure\n\u2022  Productivity \u2013 Reduced milk yield and weight gain\n\u2022  Economics \u2013 Wasted feed and increased veterinary costs\n\u2022  Food Safety \u2013 Possible contaminants entering the milk chain\n\u2022  Decision Making \u2013 Lack of timely, objective data for farmers\nExpected Solution:\nTo develop a handheld, rapid and affordable analyzer that allows farmers to assess silage and feed quality directly at the point of use.\nThe proposed system architecture may include the following:\n1.  Multi-Parameter Sensing for moisture, pH and fermentation indicators using electrochemical, NIR or other optical methods.\n2.  Rapid Spoilage and Mycotoxin Screening with simple, low-cost test elements.\n3.  Calibrated Algorithms and Machine Learning to convert raw readings into quality grades.\n4.  Rugged, Portable Design usable in field and pit conditions.\n5.  Simple Mobile Interface in local languages with clear recommendations.\n6.  Cloud Logging for farm-level feed quality history.\n7.  Others\nThe proposed solution aims to enable timely feeding decisions, protect animal health and improve dairy productivity.",
        "tags": [
            "Hardware"
        ],
        "difficulty": "Medium",
        "published": true,
        "order": 9
    },
    {
        "problem_id": "PF-PS-10",
        "title": "AI-enabled rapid bovine mastitis detection",
        "track": "UG / PG",
        "category": "Seva First Challenge",
        "summary": "Design a solution for ai-enabled rapid bovine mastitis detection",
        "description": "Background:\nMastitis is among the most costly diseases in dairy farming, causing reduced milk yield, lower milk quality and treatment expenses. Subclinical mastitis, where infection is present without visible symptoms, is especially problematic since it often goes unnoticed for long periods.\nDetailed Description:\nCommon detection methods include visual inspection, California Mastitis Test and laboratory somatic cell counts. These are manual, subjective, time-consuming or conducted only periodically. By the time clinical signs appear, the infection may have spread and caused permanent udder damage. Large herds and small farms alike need a quick, low-cost check at the time of milking.\nThe major impacts of late mastitis detection are as below:\n\u2022  Production \u2013 Reduced milk yield and quality\n\u2022  Animal Welfare \u2013 Pain, chronic infection and culling\n\u2022  Cost \u2013 Treatment, discarded milk and labor\n\u2022  Food Safety \u2013 Antibiotic residues and contaminated milk\n\u2022  Disease Spread \u2013 Transmission to other animals\nExpected Solution:\nTo develop an AI-enabled rapid diagnostic tool, usable at the milking point, that identifies subclinical mastitis early and at low cost per test.\nThe proposed system architecture may include the following:\n1.  Rapid Sensing Methods using optical, electrical conductivity, impedance or microfluidic approaches on milk samples.\n2.  Quarter-Level Detection to identify the specific udder quarter affected.\n3.  AI/ML Classification trained on milk parameters to improve accuracy and reduce false results.\n4.  Low-Cost Consumables and Simple Workflow suitable for farm staff.\n5.  Herd Data Integration to track animal history, trends and alerts.\n6.  Mobile or Dashboard Reporting with treatment and isolation recommendations.\n7.  Others\nThe proposed solution aims to detect mastitis before symptoms appear, reduce treatment costs and improve milk quality.",
        "tags": [
            "Hardware"
        ],
        "difficulty": "Medium",
        "published": true,
        "order": 10
    },
    {
        "problem_id": "PF-PS-11",
        "title": "Embedded adaptive noise cancellation",
        "track": "UG / PG",
        "category": "Seva First Challenge",
        "summary": "Design a solution for embedded adaptive noise cancellation",
        "description": "Background:\nClear voice communication is critical in cockpits, defence vehicles, factories and other high-noise settings. Engine noise, machinery and wind can mask speech and lead to misunderstanding, fatigue and safety risks.\nDetailed Description:\nTraditional passive noise isolation and fixed filters cannot adapt to rapidly changing noise conditions. Many advanced noise-suppression techniques require high computing power and introduce processing delays that disrupt natural conversation, which is unacceptable in time-critical communication. Embedded devices must also operate under strict power, size and cost limits.\nThe major impacts of poor speech clarity are as below:\n\u2022  Safety \u2013 Miscommunication in critical operations\n\u2022  Productivity \u2013 Repeated instructions and slower coordination\n\u2022  Operator Health \u2013 Increased listening fatigue\n\u2022  Technology Constraints \u2013 Limited compute and power on wearable or embedded devices\n\u2022  Reliability \u2013 Performance drop in unpredictable noise environments\nExpected Solution:\nTo develop an embedded adaptive noise-cancellation system that isolates clear voice in real time under harsh acoustic conditions with minimal delay and power use.\nThe proposed system architecture may include the following:\n1.  Adaptive Filtering Algorithms such as LMS or RLS variants optimized for embedded hardware.\n2.  Lightweight Neural Noise Suppression models suited to microcontrollers, DSPs or FPGAs.\n3.  Multi-Microphone Processing with beamforming and reference-noise capture.\n4.  Low-Latency Real-Time Pipeline for natural conversation.\n5.  Power-Optimized Implementation for battery-operated devices.\n6.  Evaluation and Test Framework using realistic cockpit and industrial noise datasets.\n7.  Others\nThe proposed solution aims to improve speech intelligibility, safety and communication reliability in noisy environments.",
        "tags": [
            "Software"
        ],
        "difficulty": "Medium",
        "published": true,
        "order": 11
    },
    {
        "problem_id": "PF-PS-12",
        "title": "GNSS-denied/dead-reckoning navigation",
        "track": "UG / PG",
        "category": "Seva First Challenge",
        "summary": "Design a solution for gnss-denied/dead-reckoning navigation",
        "description": "Background:\nAutonomous vehicles, robots and drones depend on satellite navigation, which is unavailable or unreliable underground, indoors, in dense urban areas and in zones with jamming or spoofing. Reliable navigation without GNSS is essential for mining, defence, space and indoor logistics applications.\nDetailed Description:\nDead-reckoning using inertial sensors alone accumulates error rapidly, while wheel odometry suffers from slip and uneven terrain. Optical methods struggle in poor lighting or featureless areas, and magnetometers are disturbed by metallic structures. A practical solution must fuse several sources, remain accurate over time and run in real time on limited edge hardware.\nThe major impacts of navigation failure are as below:\n\u2022  Mission Success \u2013 Loss of position leading to task failure\n\u2022  Safety \u2013 Collisions or unsafe movement of autonomous agents\n\u2022  Operations \u2013 Dependence on manual control in GNSS-denied zones\n\u2022  Cost \u2013 Need for expensive infrastructure or high-grade sensors\n\u2022  Security \u2013 Vulnerability to jamming and spoofing\nExpected Solution:\nTo develop an accurate, onboard dead-reckoning and state-estimation engine that fuses multiple sensors to keep autonomous agents localized without GNSS.\nThe proposed system architecture may include the following:\n1.  IMU-Based Kinematic Modeling with bias and noise compensation.\n2.  Sensor Fusion using Extended Kalman Filters or factor-graph approaches combining IMU, wheel, optical-flow or visual odometry.\n3.  Slip and Disturbance Detection to reject unreliable measurements.\n4.  Real-Time Edge Implementation optimized for embedded processors.\n5.  Map and Landmark Aids such as loop closure or periodic position correction where available.\n6.  Simulation and Field Validation across varied environments.\n7.  Others\nThe proposed solution aims to give autonomous systems dependable navigation in GPS-denied environments.",
        "tags": [
            "Software"
        ],
        "difficulty": "Medium",
        "published": true,
        "order": 12
    },
    {
        "problem_id": "PF-PS-13",
        "title": "Edge voice activator for low-power devices",
        "track": "UG / PG",
        "category": "Seva First Challenge",
        "summary": "Design a solution for edge voice activator for low-power devices",
        "description": "Background:\nVoice interfaces are being added to wearables, sensors, appliances and IoT devices, but continuously running speech recognition drains batteries. Wake-word detection allows a device to sleep until it hears a specific command, which makes ultra-low-power listening important.\nDetailed Description:\nCloud-based wake-word detection raises privacy, latency and connectivity issues, while running full speech models on the device consumes too much power and memory. Microcontroller-class devices have very limited memory and compute, so models must be compact yet accurate across different speakers, accents and noise conditions. Both false triggers and missed detections degrade user experience.\nThe major impacts of inefficient voice activation are as below:\n\u2022  Battery Life \u2013 Frequent charging or reduced device lifetime\n\u2022  User Experience \u2013 Missed commands or unwanted activations\n\u2022  Privacy \u2013 Audio streamed unnecessarily to the cloud\n\u2022  Cost \u2013 Need for higher-end processors\n\u2022  Deployment \u2013 Difficulty adding voice control to small devices\nExpected Solution:\nTo develop a highly efficient keyword-spotting solution that stays in an ultra-low-power listening state and wakes the main system only when the target wake-word is detected.\nThe proposed system architecture may include the following:\n1.  Compact TinyML Models such as quantized CNN, DS-CNN or RNN-based keyword spotters.\n2.  Efficient Audio Feature Extraction (for example MFCC) optimized for low-power hardware.\n3.  Two-Stage Detection with a very light always-on detector and a verifier stage.\n4.  Noise and Speaker Robustness through data augmentation and adaptive thresholds.\n5.  Embedded Deployment on microcontrollers, DSPs or neuromorphic hardware.\n6.  Benchmarking Framework for accuracy, power and memory comparison.\n7.  Others\nThe proposed solution aims to enable always-on voice activation on battery-powered devices with minimal energy use.",
        "tags": [
            "Software"
        ],
        "difficulty": "Medium",
        "published": true,
        "order": 13
    },
    {
        "problem_id": "PF-PS-14",
        "title": "Search-and-rescue autonomous drone",
        "track": "UG / PG",
        "category": "Seva First Challenge",
        "summary": "Design a solution for search-and-rescue autonomous drone",
        "description": "Background:\nEarthquakes, landslides, floods and building collapses create dangerous environments where rapid search for survivors is vital. The first hours after a disaster are the most critical for survival, but access for rescuers is often blocked or unsafe.\nDetailed Description:\nGround search teams face unstable structures, debris, fire and gas hazards. Conventional drones are mostly designed for open-air flight and rely on GPS and cloud connectivity, which may be unavailable in collapsed structures and damaged communications networks. Locating survivors requires reliable sensing in smoke, dust and low light, along with autonomous navigation through tight spaces.\nThe major impacts of delayed search and rescue are as below:\n\u2022  Lives \u2013 Reduced survival chances with time\n\u2022  Rescuer Safety \u2013 Exposure to unstable structures\n\u2022  Coordination \u2013 Limited situational awareness\n\u2022  Coverage \u2013 Slow manual search over large areas\n\u2022  Resources \u2013 Inefficient deployment of rescue teams\nExpected Solution:\nTo develop an autonomous search-and-rescue UAV that can navigate disaster zones, including partially collapsed structures, and detect and locate survivors without relying on external infrastructure.\nThe proposed system architecture may include the following:\n1.  Robust Airframe with collision tolerance and protective design for confined spaces.\n2.  Autonomous Navigation using visual-inertial SLAM, lidar or depth sensing in GPS-denied settings.\n3.  Optical and Thermal Payloads for detection of humans in low visibility.\n4.  Onboard AI Processing for real-time survivor detection and coordinate logging.\n5.  Resilient Communication including mesh relay and fail-safe return behavior.\n6.  Rescue Command Interface with live maps and prioritized locations.\n7.  Others\nThe proposed solution aims to speed up survivor location, improve rescuer safety and strengthen disaster response.",
        "tags": [
            "Hardware"
        ],
        "difficulty": "Medium",
        "published": true,
        "order": 14
    },
    {
        "problem_id": "PF-PS-15",
        "title": "Environmental hazard monitoring network",
        "track": "UG / PG",
        "category": "Seva First Challenge",
        "summary": "Design a solution for environmental hazard monitoring network",
        "description": "Background:\nIndustrial areas and cities face increasing exposure to toxic gases and fine particulate matter that harm public health and the environment. Timely and localized data is necessary for regulation, emergency response and citizen awareness.\nDetailed Description:\nOfficial monitoring stations are accurate but few in number and costly, so they cannot capture local variations around factories, traffic corridors and neighborhoods. Low-cost sensors can increase coverage but are prone to drift, cross-sensitivity and failures, and individual nodes can lose connectivity. A dependable network must maintain data quality and communication across harsh and changing conditions.\nThe major impacts of inadequate environmental monitoring are as below:\n\u2022  Public Health \u2013 Exposure to harmful pollutants\n\u2022  Industrial Safety \u2013 Late detection of gas leaks or emissions\n\u2022  Compliance \u2013 Insufficient evidence for regulatory action\n\u2022  Planning \u2013 Poor data for urban and environmental decisions\n\u2022  Response \u2013 Delayed alerts to affected communities\nExpected Solution:\nTo develop a self-healing, mesh-connected network of environmental sensor nodes that continuously monitors toxic gases and particulates with reliable, calibrated data.\nThe proposed system architecture may include the following:\n1.  Multi-Gas and Particulate Sensor Nodes covering key pollutants such as PM2.5, PM10, CO, NO2 and SO2.\n2.  Solar-Powered, Low-Power Design for long autonomous operation.\n3.  Mesh Networking with automatic rerouting if nodes or links fail.\n4.  Calibration and Drift Compensation using reference stations and machine learning.\n5.  Real-Time Analytics and Alerts with threshold and trend-based warnings.\n6.  Public and Authority Dashboards with maps and historical data.\n7.  Others\nThe proposed solution aims to provide dense, trustworthy environmental data that supports health protection and rapid response.",
        "tags": [
            "Hardware"
        ],
        "difficulty": "Medium",
        "published": true,
        "order": 15
    },
    {
        "problem_id": "PF-PS-16",
        "title": "Smart farming field device",
        "track": "UG / PG",
        "category": "Seva First Challenge",
        "summary": "Design a solution for smart farming field device",
        "description": "Background:\nAgriculture needs efficient use of water and fertilizer to improve yields and reduce costs and environmental impact. Soil moisture, salinity and nutrient status vary across fields and over time, yet most farmers lack affordable tools to measure them continuously.\nDetailed Description:\nTraditional practice depends on experience, schedules or occasional laboratory soil tests, which are slow and give only a snapshot. Existing sensors can be costly, degrade in soil due to corrosion and fouling, and often require internet connectivity that is poor in rural areas. Without reliable information, farmers may overwater, over-fertilize or miss crop stress.\nThe major impacts of poor soil monitoring are as below:\n\u2022  Yield \u2013 Sub-optimal crop growth\n\u2022  Input Cost \u2013 Excess water and fertilizer use\n\u2022  Environment \u2013 Nutrient runoff and groundwater impact\n\u2022  Water \u2013 Wastage in water-scarce regions\n\u2022  Decision Making \u2013 Lack of timely field-level data\nExpected Solution:\nTo develop a durable, low-cost in-situ field device that continuously monitors key soil parameters and provides actionable irrigation and fertilization guidance, even in areas with limited connectivity.\nThe proposed system architecture may include the following:\n1.  Multi-Parameter Soil Probe measuring moisture, electrical conductivity, temperature and nutrient trends.\n2.  Corrosion-Resistant, Long-Life Probe Design for multiple cropping seasons.\n3.  Solar and Low-Power Electronics for autonomous operation.\n4.  Offline-Capable Communication through LoRa, Bluetooth or local display.\n5.  Advisory Algorithms to translate readings into irrigation and fertilizer recommendations.\n6.  Mobile App in local languages with alerts and field history.\n7.  Others\nThe proposed solution aims to enable precision agriculture, saving water and inputs while improving yield.",
        "tags": [
            "Hardware"
        ],
        "difficulty": "Medium",
        "published": true,
        "order": 16
    },
    {
        "problem_id": "PF-PS-17",
        "title": "Smart water purification + quality monitoring",
        "track": "UG / PG",
        "category": "Seva First Challenge",
        "summary": "Design a solution for smart water purification + quality monitoring",
        "description": "Background:\nAccess to clean drinking water remains a challenge in many communities and industries. Point-of-use purifiers are widely used, but their performance depends on timely maintenance of filters and membranes, and users rarely know when water quality has deteriorated.\nDetailed Description:\nMost household and community purifiers operate without feedback on actual output water quality. Membranes foul and filters saturate gradually, yet replacement is based on time or guesswork. Unsafe water may be consumed unknowingly, while premature replacement increases cost and waste. Wastewater and energy use also need optimization.\nThe major impacts of unmonitored purification are as below:\n\u2022  Health \u2013 Risk from contaminated drinking water\n\u2022  Cost \u2013 Unnecessary or delayed replacement of filters and membranes\n\u2022  Resource Use \u2013 Excessive reject water and energy consumption\n\u2022  Maintenance \u2013 Unexpected breakdowns and service visits\n\u2022  Trust \u2013 Lack of verifiable water-quality information\nExpected Solution:\nTo develop an integrated purification unit with continuous water-quality sensing and intelligent control that protects users and optimizes maintenance.\nThe proposed system architecture may include the following:\n1.  Inline Sensor Suite for TDS, pH, turbidity and flow measurement.\n2.  Adaptive Control of Filtration Stages and automated shutoff when quality falls below safe limits.\n3.  Predictive Maintenance Analytics to forecast membrane and filter replacement needs.\n4.  Energy and Water Optimization through pump and recovery control.\n5.  IoT Connectivity and App for real-time status, alerts and service notifications.\n6.  Data Logging for quality assurance and compliance reporting.\n7.  Others\nThe proposed solution aims to ensure safe water, lower operating cost and reduce wastage.",
        "tags": [
            "Hardware"
        ],
        "difficulty": "Medium",
        "published": true,
        "order": 17
    },
    {
        "problem_id": "PF-PS-18",
        "title": "Industrial H\u2082S exposure dosimeter",
        "track": "UG / PG",
        "category": "Seva First Challenge",
        "summary": "Design a solution for industrial h\u2082s exposure dosimeter",
        "description": "Background:\nHydrogen sulfide (H2S) is a toxic and flammable gas found in oil and gas, refineries, wastewater treatment, mining and chemical industries. Even low concentrations cause health effects, and higher concentrations can be rapidly fatal. It also deadens the sense of smell, so workers cannot rely on odor.\nDetailed Description:\nWorkers often depend on fixed area monitors or basic personal gas detectors that give only instantaneous readings. Cumulative exposure over a shift is rarely recorded, and sudden spikes may not be communicated fast enough. Equipment used in hazardous areas must also be intrinsically safe and rugged, while remaining comfortable to wear for long shifts.\nThe major impacts of inadequate H2S monitoring are as below:\n\u2022  Safety \u2013 Risk of poisoning, collapse and fatalities\n\u2022  Health \u2013 Long-term effects from repeated exposure\n\u2022  Compliance \u2013 Difficulty demonstrating exposure limits are met\n\u2022  Operations \u2013 Emergency stoppages and rescue operations\n\u2022  Liability \u2013 Legal and insurance consequences\nExpected Solution:\nTo develop an intrinsically safe, wearable H2S dosimeter that continuously tracks cumulative exposure and instantly alerts workers to dangerous concentrations.\nThe proposed system architecture may include the following:\n1.  Fast, Selective H2S Sensor with stable response and minimal cross-sensitivity.\n2.  Exposure Calculation Engine for time-weighted average and short-term exposure limits.\n3.  Multi-Modal Alerts using vibration, sound and bright light for noisy or low-visibility settings.\n4.  Intrinsically Safe, Lightweight Wearable Design with long battery life.\n5.  Wireless Connectivity for supervisor alerts, man-down and location features.\n6.  Data Logging and Reporting for compliance and health records.\n7.  Others\nThe proposed solution aims to protect workers from H2S exposure and support safer industrial operations.",
        "tags": [
            "Hardware"
        ],
        "difficulty": "Medium",
        "published": true,
        "order": 18
    },
    {
        "problem_id": "PF-PS-19",
        "title": "Enterprise cryptographic discovery & analysis",
        "track": "UG / PG",
        "category": "Seva First Challenge",
        "summary": "Design a solution for enterprise cryptographic discovery & analysis",
        "description": "Background:\nModern digital systems depend on cryptography for confidentiality, integrity and authentication. Advances in computing, including quantum computing, are making some widely used algorithms vulnerable, and organizations are being urged to migrate to post-quantum cryptography.\nDetailed Description:\nLarge enterprises run hundreds of applications, libraries, protocols and devices, many of which embed cryptographic algorithms in code, configuration files or third-party components. There is often no complete inventory of where and how cryptography is used. Manual audits are slow, error-prone and disruptive, which makes it difficult to plan migration and demonstrate compliance.\nThe major impacts of poor cryptographic visibility are as below:\n\u2022  Security \u2013 Hidden use of weak or obsolete algorithms\n\u2022  Compliance \u2013 Difficulty meeting regulatory and standards requirements\n\u2022  Migration \u2013 Unclear scope and priority for post-quantum transition\n\u2022  Operations \u2013 Risk of service disruption during manual audits\n\u2022  Supply Chain \u2013 Unknown cryptography inside third-party software\nExpected Solution:\nTo develop an automated cryptographic discovery and analysis tool that identifies cryptographic assets across code and network communications and assesses migration readiness.\nThe proposed system architecture may include the following:\n1.  Static Code Analysis to detect cryptographic libraries, algorithms, key sizes and hard-coded keys across multiple languages.\n2.  Network and Protocol Scanning to identify TLS, SSH and other protocol configurations in use.\n3.  Cryptographic Bill of Materials (CBOM) generation in standard formats.\n4.  Risk Scoring and Quantum-Readiness Assessment with prioritized remediation.\n5.  Non-Intrusive Operation that does not disrupt production systems.\n6.  Integration with CI/CD, SIEM and governance platforms with dashboards and reports.\n7.  Others\nThe proposed solution aims to give organizations full visibility of their cryptography and a clear path to secure post-quantum migration.",
        "tags": [
            "Software"
        ],
        "difficulty": "Medium",
        "published": true,
        "order": 19
    },
    {
        "problem_id": "PF-PS-20",
        "title": "Industrial fire/thermal-source detection system",
        "track": "UG / PG",
        "category": "Seva First Challenge",
        "summary": "Design a solution for industrial fire/thermal-source detection system",
        "description": "Background:\nFires in scrapyards, warehouses, coal and fuel storage areas often begin as slow smoldering or internal heat buildup rather than open flame. Once ignition occurs, these fires spread rapidly and are costly and hazardous to control.\nDetailed Description:\nConventional smoke and flame detectors react only after significant combustion has started, and they perform poorly in large open or dusty spaces. Hot machinery, vehicle exhausts and sunlight can cause false alarms, so detection systems are often desensitized. Early detection of thermal anomalies over wide areas, with reliable discrimination between normal and hazardous heat sources, remains difficult.\nThe major impacts of late fire detection are as below:\n\u2022  Safety \u2013 Danger to workers and surrounding communities\n\u2022  Asset Loss \u2013 Destruction of stock, equipment and infrastructure\n\u2022  Production \u2013 Extended shutdowns after fire incidents\n\u2022  Environment \u2013 Toxic smoke and pollution\n\u2022  Insurance and Compliance \u2013 Higher premiums and regulatory scrutiny\nExpected Solution:\nTo develop an intelligent thermal and optical monitoring system that detects smoldering hotspots and abnormal heat buildup early and triggers timely alarms.\nThe proposed system architecture may include the following:\n1.  Thermal and Optical Imaging Sensors covering large areas with continuous scanning.\n2.  AI-Based Hazard Discrimination to separate real hotspots from exhausts, machinery and sunlight.\n3.  Zone-Based Temperature Mapping and Trend Analysis for early warning.\n4.  Integration with Fire Alarm and Suppression Systems through relays and industrial protocols.\n5.  Rugged Outdoor and Industrial Housing for dust, rain and temperature extremes.\n6.  Remote Dashboard and Alerts with video evidence and event history.\n7.  Others\nThe proposed solution aims to detect fires before ignition, reduce losses and improve industrial fire safety.",
        "tags": [
            "Hardware"
        ],
        "difficulty": "Medium",
        "published": true,
        "order": 20
    }
];