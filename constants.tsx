
import { ComponentMeta } from './types';

export const COMPONENTS: ComponentMeta[] = [
  {
    id: 'history-strata',
    name: 'History Strata',
    category: 'navigation',
    description: 'A narrative-driven timeline where history is stratified in 3D space. Eras emerge from temporal fog and crystallize into sharp focus as the user scrolls through the epoch.',
    interactionModel: 'Vertical scroll drives temporal depth. Focal events scale and sharpen while background eras parallax in Z-space.',
    motionLogic: 'Scroll-linked Z-axis translation combined with focal blur interpolation and elastic spine deformation.',
    useCases: ['Company histories', 'Product roadmaps', 'Evolutionary timelines'],
    difficulty: 'high'
  },
  {
    id: 'kinetic-timeline',
    name: 'Temporal Scrub Axis',
    category: 'navigation',
    description: 'A non-linear timeline that treats time as a physical medium. Events are stratified in Z-space and respond to scrubbing velocity with elastic deformation.',
    interactionModel: 'Drag the photonic playhead to scrub. High velocity triggers focal distortion. Event nodes drift in Z-depth based on temporal distance from focus.',
    motionLogic: 'Mass-spring playhead physics (stiffness: 120, damping: 20) with velocity-mapped chromatic aberration and Gaussian blur.',
    useCases: ['Video editing suites', 'Historical data exploration', 'Process scrubbing'],
    difficulty: 'high'
  },
  {
    id: 'strata-loader',
    name: '3D Depth Progress',
    category: 'feedback',
    description: 'A volumetric progress stack revealing data completion across independent Z-plane strata with staggered temporal offsets.',
    interactionModel: 'Auto-cycling progress. Visualizes the "depth" of data arriving in the system buffer.',
    motionLogic: 'Z-axis displacement combined with staggered ease-out curves.',
    useCases: ['Spatial dashboards', 'Complex file processing', 'Depth-heavy UIs'],
    difficulty: 'medium'
  },
  {
    id: 'tectonic-loader',
    name: 'Weighty Progress Bar',
    category: 'feedback',
    description: 'A progress indicator that treats data arrival as a physical collision. Progress segments overshoot and settle with high-viscosity spring inertia.',
    interactionModel: 'Auto-cycling progress with manual override. Observes kinetic overshoot on state change.',
    motionLogic: 'Damped spring physics (stiffness: 80, damping: 12) applied to linear width.',
    useCases: ['System loading', 'File transfers', 'Physics-heavy UIs'],
    difficulty: 'low'
  },
  {
    id: 'photonic-loader',
    name: 'Light Spill Loader',
    category: 'feedback',
    description: 'A volumetric light-seed that bleeds photonic energy into the background medium as it traverses the progress track.',
    interactionModel: 'Light spill intensity scales with progress velocity.',
    motionLogic: 'Radial gradient masks with variable blur and opacity decay.',
    useCases: ['Atmospheric dashboards', 'Premium wait states', 'Data streaming'],
    difficulty: 'medium'
  },
  {
    id: 'entropy-loader',
    name: 'Static Noise Reveal',
    category: 'feedback',
    description: 'Information emerging from digital chaos. The loader begins as high-frequency visual noise and crystallizes into a solid block as it nears completion.',
    interactionModel: 'Noise-to-signal ratio is inverse-mapped to progress percentage.',
    motionLogic: 'Procedural noise filters and clip-path randomization.',
    useCases: ['Secure boot', 'AI processing', 'Cryptographic tasks'],
    difficulty: 'high'
  },
  {
    id: 'velocity-cursor',
    name: 'Velocity Stretch Cursor',
    category: 'motion',
    description: 'An intent-aware cursor entity that physically deforms into a kinetic "pill" shape based on real-time movement velocity.',
    interactionModel: 'Mouse speed determines stretch factor and rotation angle.',
    motionLogic: 'useVelocity mapping to scaleX and rotation transform matrices.',
    useCases: ['Creative portfolios', 'High-speed navigation', 'Immersive storytelling'],
    difficulty: 'medium'
  },
  {
    id: 'tether-cursor',
    name: 'Magnetic Link Cursor',
    category: 'motion',
    description: 'A spatial navigation cursor that projects a dynamic SVG tether line to the nearest interactive anchor point within its influence field.',
    interactionModel: 'Calculates 1/r² proximity to draw elastic connections to system nodes.',
    motionLogic: 'Vector distance calculations mapped to SVG line coordinates.',
    useCases: ['Complex node maps', 'Interactive galleries', 'Guided UX'],
    difficulty: 'high'
  },
  {
    id: 'field-cursor',
    name: 'Gravity Field Grid',
    category: 'motion',
    description: 'A cursor that acts as a local gravity well, causing background coordinate nodes to shrink or expand as the user passes over them.',
    interactionModel: 'Proximity-based repulsion field affecting the local grid topology.',
    motionLogic: 'Spring-driven displacement vectors applied to a coordinate grid.',
    useCases: ['Interactive backgrounds', 'Sensory feedback', 'Atmospheric UI'],
    difficulty: 'medium'
  },
  {
    id: 'tectonic-accordion',
    name: 'Collision Panels',
    category: 'navigation',
    description: 'A multi-layered information rift where sections physically collide and displace neighbors using rigid-body physics.',
    interactionModel: 'Selecting a rift causes a structural shift, pushing other layers into a compressed stack.',
    motionLogic: 'Spring-driven displacement with elastic collision damping.',
    useCases: ['Complex settings', 'Data-heavy reveals', 'Hierarchical navigation'],
    difficulty: 'high'
  },
  {
    id: 'trail-cursor',
    name: 'Memory Trail Pointer',
    category: 'motion',
    description: 'A custom cursor entity that leaves a temporal "memory" of its path, visualizing the users velocity and intent.',
    interactionModel: 'Cursor-driven trail. High-speed movement creates longer, sharper echoes.',
    motionLogic: 'Temporal buffer sampling with opacity and scale decay curves.',
    useCases: ['Immersive galleries', 'Interactive storytelling', 'Visual feedback'],
    difficulty: 'medium'
  },
  {
    id: 'kinetic-status',
    name: 'Bending Icon Status',
    category: 'feedback',
    description: 'A status indicator where "Check" and "Cross" symbols are procedural wires that bend into state-forms.',
    interactionModel: 'State toggle triggers a geometric re-routing of the symbols structural lines.',
    motionLogic: 'SVG path interpolation with varying stroke-dasharray tension.',
    useCases: ['Form validation', 'System health', 'Task completion'],
    difficulty: 'medium'
  },
  {
    id: 'velocity-scrollbar',
    name: 'Speed-Sensitive Scroll',
    category: 'navigation',
    description: 'A navigation spine that reacts to scroll speed, expanding into a high-visibility handle during rapid travel.',
    interactionModel: 'Scroll-velocity modulates the thickness and luminance of the scroll indicator.',
    motionLogic: 'Velocity mapping to CSS variables for width and filter intensity.',
    useCases: ['Deep archives', 'Timeline scrubbing', 'Data feeds'],
    difficulty: 'low'
  },
  {
    id: 'refractive-image',
    name: 'Liquid Lens Zoom',
    category: 'feedback',
    description: 'Media elements that distort like looking through a liquid lens, reacting to the cursors focal pressure.',
    interactionModel: 'Hovering over the media creates a refractive distortion field.',
    motionLogic: 'CSS mask-image + Displacement maps (simulated via SVG filters).',
    useCases: ['Premium portfolios', 'Product showcases', 'Artistic media'],
    difficulty: 'high'
  },
  {
    id: 'neural-badge',
    name: 'Rhythmic Pulsing Tag',
    category: 'feedback',
    description: 'Status badges that pulse with biological rhythmic patterns to communicate system vitality.',
    interactionModel: 'Ambient animation that reacts to global system entropy.',
    motionLogic: 'Multi-layered sinusoidal scaling and blur oscillation.',
    useCases: ['Live metrics', 'User status', 'System health'],
    difficulty: 'low'
  },
  {
    id: 'decay-timer',
    name: 'Shattering Clock',
    category: 'feedback',
    description: 'Time visualized as a structural entity that physically disintegrates as entropy increases.',
    interactionModel: 'Countdown timer that triggers geometric collapse.',
    motionLogic: 'Fragmented clip-path animation with particle dispersion.',
    useCases: ['Expiring sessions', 'Time-limited tasks', 'Auction timers'],
    difficulty: 'high'
  },
  {
    id: 'bio-profile',
    name: 'Thermal Energy Card',
    category: 'motion',
    description: 'User identity cards visualized as energy fields that heat up or cool down based on activity telemetry.',
    interactionModel: 'Interaction increases the cards "thermal energy" and glow radius.',
    motionLogic: 'Gaussian blur accumulation and chromatic color shifting.',
    useCases: ['Social dashboards', 'Team activity', 'User presence'],
    difficulty: 'medium'
  },
  {
    id: 'action-impulse',
    name: 'Shockwave Trigger',
    category: 'input',
    description: 'A trigger that treats a click as a kinetic event, propagating a shockwave through the layout medium.',
    interactionModel: 'Click triggers a radial displacement field. Hover creates a pre-stress vibration.',
    motionLogic: 'Wave propagation using expanding concentric masks and spring-back scale.',
    useCases: ['Impactful actions', 'System resets', 'High-energy CTAs'],
    difficulty: 'medium'
  },
  {
    id: 'sequence-strata',
    name: 'Deep Layer List',
    category: 'navigation',
    description: 'A vertical sequence where items are stratified in Z-depth, revealed via focal slicing.',
    interactionModel: 'Vertical movement "peels" back the top layer to reveal the underlying sequence item.',
    motionLogic: 'CSS clip-path interpolation combined with logarithmic Z-scaling.',
    useCases: ['Product feeds', 'Storytelling lists', 'Portfolio navigation'],
    difficulty: 'high'
  },
  {
    id: 'portal-branch',
    name: 'Sprouting Radial Menu',
    category: 'navigation',
    description: 'A radial navigation entity that branches from a central intent node.',
    interactionModel: 'Selection expands into a recursive tree of possibilities. Lines represent logical connection.',
    motionLogic: 'L-system branching animation with spring-force layout nodes.',
    useCases: ['Complex menus', 'Feature discovery', 'Logic branching'],
    difficulty: 'high'
  },
  {
    id: 'friction-toggle',
    name: 'Heavy Resistance Switch',
    category: 'input',
    description: 'A state switcher that requires physical momentum to overcome its structural magnetic lock.',
    interactionModel: 'Drag-based interaction with a "snap-zone" that resists transition until high velocity is reached.',
    motionLogic: 'Bimodal spring physics with a non-linear friction curve.',
    useCases: ['Critical switches', 'Security toggles', 'Intentional states'],
    difficulty: 'medium'
  },
  {
    id: 'liquid-tab',
    name: 'Melting Tab Bar',
    category: 'navigation',
    description: 'Switching context is a fluid event. The indicator physically "melts" and flows between positions.',
    interactionModel: 'Horizontal selection triggers a gooey-filtered transition between states.',
    motionLogic: 'SVG Gaussian blur + Color matrix contrast filtering (Gooey effect).',
    useCases: ['Dashboard navigation', 'Mode switching', 'Filtering'],
    difficulty: 'medium'
  },
  {
    id: 'vortex-dial',
    name: 'Centrifugal Spin Dial',
    category: 'input',
    description: 'A circular input where the speed of rotation is as important as the final value.',
    interactionModel: 'Rotation modulates the focal value; high-speed rotation triggers "Centrifugal mode".',
    motionLogic: 'Angular velocity mapping to particle dispersion and blur.',
    useCases: ['Volume control', 'Temporal scrubbing', 'Parameter tuning'],
    difficulty: 'high'
  },
  {
    id: 'impulse-signal',
    name: 'Glitch Tear Alert',
    category: 'feedback',
    description: 'Notifications are temporary glitches in system stability, demanding attention through structural noise.',
    interactionModel: 'Temporal manifestation. The UI "breaks" briefly to show the message then repairs itself.',
    motionLogic: 'Horizontal slice displacement and chromatic aberration pulses.',
    useCases: ['System alerts', 'Error states', 'High-priority messages'],
    difficulty: 'medium'
  },
  {
    id: 'volumetric-gauge',
    name: 'Liquid Tank Meter',
    category: 'feedback',
    description: 'Visualizes data volume as a literal physical filling of a translucent geometric vessel.',
    interactionModel: 'Simulates liquid sloshing and surface tension based on data-flow velocity.',
    motionLogic: 'Sine-wave surface perturbation and gravitational settling.',
    useCases: ['Storage meters', 'Progress indicators', 'Load monitoring'],
    difficulty: 'high'
  },
  {
    id: 'crystallized-text',
    name: 'Static Scramble Input',
    category: 'input',
    description: 'Information emerges from digital entropy. Text solidifies as the system gains confidence in the input.',
    interactionModel: 'Typing triggers a crystallization effect where chars jitter into their final sharp state.',
    motionLogic: 'Procedural noise scrambling with linear decoherence curves.',
    useCases: ['Login fields', 'Search bars', 'Title reveals'],
    difficulty: 'medium'
  },
  {
    id: 'momentum-trigger',
    name: 'Magnetic Intent Button',
    category: 'input',
    description: 'A professional-grade SaaS button with intent-aware magnetic pull and tactile haptic feedback.',
    interactionModel: 'Cursor proximity drives subtle 3D leaning and internal element translation.',
    motionLogic: 'Spring-damped displacement vectors with a 0.98x active compression scale.',
    useCases: ['Primary CTAs', 'Form submission', 'Deliberate actions'],
    difficulty: 'low'
  },
  {
    id: 'luminance-mass',
    name: 'Photonic Mass Glow',
    category: 'feedback',
    description: 'Visualizes data magnitude via light intensity and volumetric blur rather than numeric scales.',
    interactionModel: 'Hover to "feel" the data mass through light spill and peripheral glow.',
    motionLogic: 'Inverse-square glow falloff and logarithmic radius scaling.',
    useCases: ['System load monitoring', 'Volume indicators', 'Energy dashboards'],
    difficulty: 'medium'
  },
  {
    id: 'kinetic-ticker',
    name: 'Vibration Data Feed',
    category: 'motion',
    description: 'Communicates data momentum and velocity through rhythmic oscillation and speed of travel.',
    interactionModel: 'The faster the data stream, the more violent the rhythmic "breathing" of the UI.',
    motionLogic: 'Frequency-modulated sine waves applied to scale and opacity.',
    useCases: ['Live stock feeds', 'Real-time traffic', 'Pulse monitors'],
    difficulty: 'medium'
  },
  {
    id: 'aura-sentiment',
    name: 'Fluid Mood Background',
    category: 'feedback',
    description: 'Translates emotional trends into organic color bleeding and liquid motion signatures.',
    interactionModel: 'Intentional color shifts and "viscosity" changes based on data sentiment scores.',
    motionLogic: 'Perlin noise-based color interpolation and fluid displacement.',
    useCases: ['Social sentiment analysis', 'Brand health', 'Community mood'],
    difficulty: 'high'
  },
  {
    id: 'viscous-data-feel',
    name: 'Heavy Liquid Drag',
    category: 'input',
    description: 'Data density is communicated through "friction" — interaction becomes physically heavier as complexity increases.',
    interactionModel: 'Cursor resistance and scroll-inertia change based on the active dataset weight.',
    motionLogic: 'Dynamic damping and mass variables applied to spring physics.',
    useCases: ['File size indicators', 'Data heavy list exploration', 'Wait-state feedback'],
    difficulty: 'high'
  },
  {
    id: 'magneto-nav',
    name: 'Magnetic Node Nav',
    category: 'navigation',
    description: 'A navigation system that exerts a physical pull on the cursor as it passes by linked nodes.',
    interactionModel: 'Cursor-driven magnetic attraction toward nav items.',
    motionLogic: 'Weighted spring physics with distance-based attenuation.',
    useCases: ['High-intent navigation', 'Interactive menus', 'Focused choice selection'],
    difficulty: 'medium'
  },
  {
    id: 'tension-grid',
    name: 'Elastic Grid Canvas',
    category: 'motion',
    description: 'A spatial layout that deforms based on interaction density, like a stretched fabric.',
    interactionModel: 'Cursor proximity causes grid cells to scale and rotate toward the focal point.',
    motionLogic: 'Inverse-square displacement with spring-return tension.',
    useCases: ['Data visualization', 'Atmospheric backgrounds', 'Sensory feedback'],
    difficulty: 'high'
  },
  {
    id: 'chrono-scroll',
    name: 'Time-Warping Scroll',
    category: 'motion',
    description: 'A scroll container that treats the scrollbar as a temporal scrub bar, warping content as speed increases.',
    interactionModel: 'Scroll velocity drives chromatic aberration and scale warping.',
    motionLogic: 'Velocity mapping to multiple CSS filter variables.',
    useCases: ['Long-form storytelling', 'Media feeds', 'Chronological data'],
    difficulty: 'medium'
  },
  {
    id: 'orbit-nexus',
    name: 'Orbiting Hub Menu',
    category: 'navigation',
    description: 'A non-linear menu where items orbit the central intent, shifting speed based on focus.',
    interactionModel: 'Polar coordinate navigation with dynamic centrifugal force.',
    motionLogic: 'Sinusoidal path mapping with variable frequency damping.',
    useCases: ['Feature clouds', 'Complexity management', 'Immersive menus'],
    difficulty: 'high'
  },
  {
    id: 'halt-reveal',
    name: 'Stillness Reveal',
    category: 'input',
    description: 'Interaction gated by stillness. Information manifests only when user intent stabilizes.',
    interactionModel: 'Hovering without moving for a threshold triggers a content bloom.',
    motionLogic: 'Velocity detection threshold linked to an opacity/scale progress ramp.',
    useCases: ['Deep data exploration', 'Engagement gates', 'Reading modes'],
    difficulty: 'high'
  },
  {
    id: 'intent-pulse',
    name: 'Pre-Click Glow',
    category: 'feedback',
    description: 'A component that radiates state signals before an action is even confirmed.',
    interactionModel: 'Approach-aware glow and scale shifts.',
    motionLogic: 'Proximity mapping to SVG filters and spring-driven luminance.',
    useCases: ['Critical actions', 'System readiness', 'Success states'],
    difficulty: 'medium'
  },
  {
    id: 'stochastic-mass',
    name: 'Random Physics Body',
    category: 'motion',
    description: 'An entity with randomized physical properties that "learn" user preferences through interaction weight.',
    interactionModel: 'Drag and toss mechanics with random inertia curves.',
    motionLogic: 'Physics-based mass and damping randomization.',
    useCases: ['Playful branding', 'Experimental physics', 'Generative UI'],
    difficulty: 'high'
  },
  {
    id: 'cognitive-shield',
    name: 'Focus Isolation Shield',
    category: 'feedback',
    description: 'UI that protects user focus by dynamically blurring or hiding non-focal information.',
    interactionModel: 'Automatic isolation of focal nodes.',
    motionLogic: 'Z-depth focal blur interpolation.',
    useCases: ['Complex dashboards', 'Developer tools', 'High-load environments'],
    difficulty: 'medium'
  },
  {
    id: 'glyph-kinetic',
    name: 'Silent Motion Symbols',
    category: 'feedback',
    description: 'Semantic symbols that use rhythmic motion rather than labels to communicate complex states.',
    interactionModel: 'Rhythmic vibration and geometric morphing.',
    motionLogic: 'Frequency-modulated oscillation curves.',
    useCases: ['Textless interfaces', 'Status systems', 'Micro-interactions'],
    difficulty: 'low'
  },
  {
    id: 'commitment-shard',
    name: 'Shattering Commitment',
    category: 'input',
    description: 'A choice mechanism that physically solidifies and "shatters" the alternative upon selection.',
    interactionModel: 'Drag-to-commit with high resistance.',
    motionLogic: 'Physical fragmentation simulation with gravity.',
    useCases: ['High-stakes actions', 'Security gates', 'Final commits'],
    difficulty: 'high'
  },
  {
    id: 'confidence-meter',
    name: 'Type Confidence Flow',
    category: 'feedback',
    description: 'Visualizes input confidence through text clarity and weight.',
    interactionModel: 'Typing speed and consistency drives clarity.',
    motionLogic: 'Blur and weight mapping to user keystroke cadence.',
    useCases: ['Cognitive assessment', 'Interactive logs', 'Flow tracking'],
    difficulty: 'medium'
  },
  {
    id: 'resonance-field',
    name: 'Action Ghost Field',
    category: 'motion',
    description: 'A field where user actions leave persistent "after-glow" resonances that influence future states.',
    interactionModel: 'Cursor actions leave energy traces.',
    motionLogic: 'Temporal alpha decay with spatial persistence.',
    useCases: ['Collaborative heatmaps', 'Interactive art', 'Discovery paths'],
    difficulty: 'high'
  },
  {
    id: 'evolutionary-shell',
    name: 'Mastery-Adaptive UI',
    category: 'navigation',
    description: 'A UI shell that sheds decorative complexity as user mastery increases over a session.',
    interactionModel: 'Interaction frequency reduces visual labels.',
    motionLogic: 'Semantic state-clipping and icon scaling.',
    useCases: ['Expert tools', 'Onboarding-to-mastery', 'Minimalist systems'],
    difficulty: 'medium'
  },
  {
    id: 'choice-convergence',
    name: 'Target Gravity Pull',
    category: 'input',
    description: 'Interactive targets that physically converge or pull toward the user intent vector.',
    interactionModel: 'Proximity-driven gravity wells.',
    motionLogic: 'Attractive spring forces between cursor and target.',
    useCases: ['Form selection', 'Hold-down choice', 'Guided interaction'],
    difficulty: 'medium'
  },
  {
    id: 'tectonic-data',
    name: 'Earthquake Data Feed',
    category: 'feedback',
    description: 'Live data changes cause physical "earthquakes" or shifts in the layout structure.',
    interactionModel: 'UI elements physically settle or collide when data points arrive.',
    motionLogic: 'Rigid-body physics simulation and collision detection.',
    useCases: ['Alert systems', 'Database updates', 'Live sports scores'],
    difficulty: 'high'
  },
  {
    id: 'grid-compression',
    name: 'Smart Packing Grid',
    category: 'navigation',
    description: 'Layout density physically compacts or expands based on data volume, changing the UI "weather".',
    interactionModel: 'The more data exists, the more the layout "compresses" into a dense, high-energy grid.',
    motionLogic: 'Spring-forced repulsion vs attraction grid logic.',
    useCases: ['Calendar density', 'Inventory management', 'Log exploration'],
    difficulty: 'medium'
  },
  {
    id: 'fragile-glass',
    name: 'Shattering Panel',
    category: 'feedback',
    description: 'A UI surface that physically shatters into shards when clicked, requiring a temporal recovery phase.',
    interactionModel: 'Click triggers a physics-based fragmentation simulation.',
    motionLogic: 'Polygon clip-path shattering with gravity-based debris fall.',
    useCases: ['Impactful warnings', 'One-way decisions', 'Digital scarcity'],
    difficulty: 'high'
  },
  {
    id: 'cadence-lock',
    name: 'Rhythm Secret Lock',
    category: 'input',
    description: 'An interaction gate that refuses input unless the user matches a specific rhythmic heartbeat.',
    interactionModel: 'Requires rhythmic clicking/tapping within a specific BPM tolerance.',
    motionLogic: 'Sinusoidal visual feedback mapped to precision.',
    useCases: ['Secure auth', 'Mindfulness gates', 'Alternative inputs'],
    difficulty: 'medium'
  },
  {
    id: 'earned-legibility',
    name: 'Focus Decryptor',
    category: 'input',
    description: 'Information is obscured by procedural noise and only decodes when the user maintains perfect focus.',
    interactionModel: 'Cursor stability (zero velocity) triggers the decryption process.',
    motionLogic: 'Noise shader intensity modulated by cursor velocity delta.',
    useCases: ['Deep reading modes', 'Secure data reveal', 'Engagement testing'],
    difficulty: 'high'
  },
  {
    id: 'structural-glitch',
    name: 'Wireframe Leak View',
    category: 'feedback',
    description: 'A UI that intentionally "breaks" its own layout rules to reveal the underlying code architecture.',
    interactionModel: 'Hovering over components reveals wireframes, Z-index slices, and raw telemetry.',
    motionLogic: 'State-based interpolation between "Rendered" and "Wireframe" modes.',
    useCases: ['Developer tools', 'Technical branding', 'Creative portfolios'],
    difficulty: 'medium'
  },
  {
    id: 'thermal-overload',
    name: 'Overheating Rate Limiter',
    category: 'input',
    description: 'A component that "heats up" with rapid interaction, eventually locking out the user to prevent system burnout.',
    interactionModel: 'Cumulative interaction frequency increases a "Thermal" state.',
    motionLogic: 'Chromatic aberration and Gaussian blur intensity mapped to heat levels.',
    useCases: ['Rate-limiting feedback', 'Resource protection', 'Anti-spam UIs'],
    difficulty: 'medium'
  },
  {
    id: 'rebel-navigation',
    name: 'Hijacked Axes Menu',
    category: 'navigation',
    description: 'A menu that challenges spatial memory by inverting or randomly remapping its interaction axes.',
    interactionModel: 'Remaps cursor X/Y coordinates to unexpected UI responses.',
    motionLogic: 'Non-linear transform mapping to break standard expectation chains.',
    useCases: ['Skill-based UIs', 'Interactive art', 'Cognitive training'],
    difficulty: 'high'
  },
  {
    id: 'spatial-strata',
    name: '3D Floating Layers',
    category: 'motion',
    description: 'A multi-layered UI where components drift and parallax based on their assigned virtual Z-depth.',
    interactionModel: 'Cursor-driven parallax with independent Z-translation constants.',
    motionLogic: 'Relative transform-3d mapping with spring-based smoothing.',
    useCases: ['Immersive headers', 'Interactive infographics', 'Data storytelling'],
    difficulty: 'medium'
  },
  {
    id: 'perspective-focal',
    name: 'Focus Vanishing Point',
    category: 'navigation',
    description: 'A UI that warps its vanishing point and layout perspective based on the active focal element.',
    interactionModel: 'Dynamic CSS perspective-origin modulation driven by focus state.',
    motionLogic: 'Interpolated focal point coordinates mapped to container perspective.',
    useCases: ['Spatial menus', 'Focus-driven galleries', '3D dashboards'],
    difficulty: 'high'
  },
  {
    id: 'proximity-field',
    name: 'Focus Sharpness Grid',
    category: 'feedback',
    description: 'A layout where elements gain detail and sharpness based on their virtual distance from the cursor.',
    interactionModel: 'Calculates 1/r² distance to modulate Gaussian blur and opacity.',
    motionLogic: 'Dynamic filter interpolation based on proximity vectors.',
    useCases: ['Interactive grids', 'Visual search results', 'Focus-aware UIs'],
    difficulty: 'medium'
  },
  {
    id: 'isometric-grid-flux',
    name: 'Tilting 3D Board',
    category: 'navigation',
    description: 'A 2.5D isometric grid that tilts and shears based on viewing angle and interaction.',
    interactionModel: 'Tilting the layout using cursor X/Y coordinates to reveal hidden faces.',
    motionLogic: 'Shear and rotate interpolation for pseudo-3D perspective.',
    useCases: ['Strategy dashboards', 'Resource management UIs', 'Interactive maps'],
    difficulty: 'medium'
  },
  {
    id: 'depth-squeeze',
    name: 'Expanding Layer Stack',
    category: 'feedback',
    description: 'A UI that physically flattens into 2D when ignored and expands into a deep Z-stack when engaged.',
    interactionModel: 'Engagement triggers a Z-axis expansion of nested layers.',
    motionLogic: 'Spring physics applied to translateZ and depth separation.',
    useCases: ['Contextual menus', 'Advanced notifications', 'Depth-heavy layouts'],
    difficulty: 'medium'
  },
  {
    id: 'orbital-z-axis',
    name: 'Planetary Orbit Nav',
    category: 'navigation',
    description: 'Navigation items that orbit the user in 3D space, moving behind and in front of the primary view.',
    interactionModel: 'Sinusoidal mapping of Z-depth and horizontal position.',
    motionLogic: 'Polar coordinate conversion to 3D Cartesian space.',
    useCases: ['Atmospheric menus', 'Social feeds', 'Ambient navigation'],
    difficulty: 'high'
  },
  {
    id: 'state-memory',
    name: 'Recent Interaction Bias',
    category: 'navigation',
    description: 'A layout that physically tilts and biases itself toward the users most recent interactions.',
    interactionModel: 'Stores last-interacted coordinates to influence the default "rest" state of the UI.',
    motionLogic: 'Persistent vector bias applied to spring-based layout nodes.',
    useCases: ['Adaptive menus', 'Personalized tools', 'Smart shortcuts'],
    difficulty: 'medium'
  },
  {
    id: 'atrophy-surface',
    name: 'Idle Dissolve Effect',
    category: 'feedback',
    description: 'A UI surface that dims and gathers "digital dust" (visual noise) when ignored by the cursor.',
    interactionModel: 'Inactivity timer modulates noise filters and luminance.',
    motionLogic: 'Inverted decay curve mapped to SVG filter intensity.',
    useCases: ['Ambient notifications', 'Energy-saving UIs', 'Dynamic focus systems'],
    difficulty: 'medium'
  },
  {
    id: 'circadian-interface',
    name: 'Day-Night Sync UI',
    category: 'feedback',
    description: 'A UI that shifts its color temperature, shadow direction, and energy based on a simulated time-of-day cycle.',
    interactionModel: 'Visual properties synchronized to a global 24h clock.',
    motionLogic: 'Trigonometric mapping of time to light-source vectors.',
    useCases: ['Health-tech apps', 'Smart home dashboards', 'Atmospheric portfolios'],
    difficulty: 'low'
  },
  {
    id: 'history-echo',
    name: 'Visual State History',
    category: 'navigation',
    description: 'A navigation system that leaves "ghostly" trails of its previous states, allowing users to scrub through temporal history.',
    interactionModel: 'Snapshot capture on state change with a persistence scrub interaction.',
    motionLogic: 'Temporal stacking with opacity decay and Z-index layering.',
    useCases: ['Complex workflows', 'Version control visualization', 'Undo/Redo interactions'],
    difficulty: 'high'
  }
];
