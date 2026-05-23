import { create } from 'zustand';


export type ComponentType = 'hero' | 'grid' | 'flex' | 'mesh' | 'liquid' | 'particles' | 'text' | 'image' | 'button';

export interface ComponentData {
  id: string;
  type: ComponentType;
  props: Record<string, any>;
  styles: Record<string, any>;
  children?: ComponentData[];
}

interface EditorState {
  components: ComponentData[];
  selectedId: string | null;
  addComponent: (type: ComponentType, props?: Record<string, any>) => void;
  updateComponent: (id: string, updates: Partial<ComponentData>) => void;
  removeComponent: (id: string) => void;
  selectComponent: (id: string | null) => void;
}

const generateId = () => Math.random().toString(36).substr(2, 9);

export const useEditorStore = create<EditorState>((set) => ({
  components: [],
  selectedId: null,

  addComponent: (type, props = {}) => set((state) => {
    let defaultProps = { ...props };
    let defaultStyles: Record<string, any> = { padding: '24px', display: 'flex', flexDirection: 'column' };

    if (type === 'hero') {
      defaultProps = { title: 'Build the impossible.', subtitle: 'The web, reimagined.' };
      defaultStyles = { ...defaultStyles, backgroundColor: '#0a0a0a', color: '#ffffff', minHeight: '400px', alignItems: 'center', justifyContent: 'center' };
    } else if (type === 'button') {
      defaultProps = { text: 'Click Me' };
      defaultStyles = { padding: '12px 24px', backgroundColor: '#4f46e5', color: '#ffffff', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' };
    } else if (type === 'text') {
      defaultProps = { text: 'Start typing...' };
      defaultStyles = { fontSize: '16px', color: '#a1a1aa' };
    } else if (type === 'image') {
      defaultProps = { src: props.src || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop', alt: 'Image' };
      defaultStyles = { width: '100%', borderRadius: '12px', objectFit: 'cover' };
    } else if (type === 'mesh') {
      defaultStyles = { width: '100%', height: '300px', borderRadius: '24px', background: 'radial-gradient(at 0% 0%, hsla(253,16%,7%,1) 0, transparent 50%), radial-gradient(at 50% 0%, hsla(225,39%,30%,1) 0, transparent 50%), radial-gradient(at 100% 0%, hsla(339,49%,30%,1) 0, transparent 50%)' };
    }

    const newComponent: ComponentData = {
      id: generateId(),
      type,
      props: defaultProps,
      styles: defaultStyles,
    };

    return { components: [...state.components, newComponent], selectedId: newComponent.id };
  }),

  updateComponent: (id, updates) => set((state) => ({
    components: state.components.map(c => c.id === id ? { ...c, ...updates } : c)
  })),

  removeComponent: (id) => set((state) => ({
    components: state.components.filter(c => c.id !== id),
    selectedId: state.selectedId === id ? null : state.selectedId
  })),

  selectComponent: (id) => set({ selectedId: id })
}));
