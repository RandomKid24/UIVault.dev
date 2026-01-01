
import { ComponentMeta } from './types';

export const COMPONENTS: ComponentMeta[] = [
  {
    id: 'kinetic-loaders',
    name: 'KineticLoaders',
    category: 'feedback',
    description: 'A suite of high-fidelity progress indicators that treat data loading as a physical event involving mass, light, and stratification.',
    interactionModel: 'Progress values are mapped to physical variables like damping, blur, and Z-depth displacement.',
    motionLogic: 'Spring-driven inertia coupled with procedural noise stabilization.',
    useCases: ['System boot sequences', 'Data processing states', 'Immersive file uploads'],
    difficulty: 'medium'
  },
  {
    // Fix: Completed missing properties for temporal-trail
    id: 'temporal-trail',
    name: 'TemporalTrail',
    category: 'motion',
    description: 'A high-speed cursor trail that exhausts kinetic energy into a persistent temporal field, creating a visual history of movement.',
    interactionModel: 'Mouse velocity determines particle emission rate and color shift.',
    motionLogic: 'Particle-based trail with life-decay and coordinate connection web.',
    useCases: ['Immersive navigation', 'Interactive backgrounds', 'Velocity visualization'],
    difficulty: 'high'
  }
];
