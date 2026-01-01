
export interface ComponentMeta {
  id: string;
  name: string;
  category: 'motion' | 'navigation' | 'input' | 'feedback';
  description: string;
  interactionModel: string;
  motionLogic: string;
  useCases: string[];
  difficulty: 'low' | 'medium' | 'high';
}

export type View = 'home' | 'explorer' | 'detail' | 'philosophy';
