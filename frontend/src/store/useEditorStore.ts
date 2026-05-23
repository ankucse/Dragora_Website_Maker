import { create } from 'zustand';

export type ComponentType = 
  // Base Layout
  'hero' | 'grid' | 'flex' | 'mesh' | 'liquid' | 'particles' | 'text' | 'image' | 'button' |
  // V2 Layout
  'section' | 'container' | 'masonry' | 'tabs' | 'accordion' | 'carousel' |
  // V2 Navigation
  'navbar' | 'megamenu' | 'sidebar' |
  // V2 Media
  'video' | 'lottie' | '3d' |
  // V2 Visuals
  'glasscard' | 'pricing' | 'stats' | 'faq' | 'progress' |
  // V2 Forms
  'form' | 'input' | 'toggle' | 'upload' |
  // V2 Ecommerce
  'product' | 'cart' | 'checkout';

export interface ComponentData {
  id: string;
  type: ComponentType;
  props: Record<string, any>;
  styles: Record<string, any>;
  position: { x: number, y: number, width: number | string, height: number | string, absolute: boolean };
  children?: ComponentData[];
}

interface EditorState {
  components: ComponentData[];
  selectedId: string | null;
  deviceMode: 'desktop' | 'tablet' | 'mobile';
  
  // History for Undo/Redo
  past: ComponentData[][];
  future: ComponentData[][];

  setDeviceMode: (mode: 'desktop' | 'tablet' | 'mobile') => void;
  addComponent: (type: ComponentType, props?: Record<string, any>, x?: number, y?: number) => void;
  updateComponent: (id: string, updates: Partial<ComponentData>) => void;
  removeComponent: (id: string) => void;
  selectComponent: (id: string | null) => void;
  
  undo: () => void;
  redo: () => void;
}

const generateId = () => Math.random().toString(36).substr(2, 9);

export const useEditorStore = create<EditorState>((set) => ({
  components: [],
  selectedId: null,
  deviceMode: 'desktop',
  past: [],
  future: [],

  setDeviceMode: (mode) => set({ deviceMode: mode }),

  addComponent: (type, props = {}, x = 100, y = 100) => set((state) => {
    let defaultProps = { ...props };
    let defaultStyles: Record<string, any> = { padding: '24px', display: 'flex', flexDirection: 'column' };
    let position = { x, y, width: 300, height: 200, absolute: true };

    if (type === 'hero') {
      defaultProps = { title: 'Build the impossible.', subtitle: 'The web, reimagined.' };
      defaultStyles = { ...defaultStyles, backgroundColor: '#0a0a0a', color: '#ffffff', alignItems: 'center', justifyContent: 'center' };
      position = { x, y, width: 800, height: 400, absolute: true };
    } else if (type === 'button') {
      defaultProps = { text: 'Click Me' };
      defaultStyles = { padding: '12px 24px', backgroundColor: '#4f46e5', color: '#ffffff', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' };
      position = { x, y, width: 120, height: 48, absolute: true };
    } else if (type === 'text') {
      defaultProps = { text: 'Double click to edit text...' };
      defaultStyles = { fontSize: '16px', color: '#333333' };
      position = { x, y, width: 250, height: 50, absolute: true };
    } else if (type === 'image') {
      defaultProps = { src: props.src || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop', alt: 'Image' };
      defaultStyles = { borderRadius: '12px', objectFit: 'cover' };
      position = { x, y, width: 400, height: 300, absolute: true };
    } else if (type === 'glasscard') {
      defaultProps = { title: 'Premium Plan' };
      defaultStyles = { 
        backgroundColor: 'rgba(255, 255, 255, 0.1)', 
        backdropFilter: 'blur(20px)', 
        WebkitBackdropFilter: 'blur(20px)', 
        borderRadius: '24px', 
        border: '1px solid rgba(255, 255, 255, 0.2)',
        boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)'
      };
      position = { x, y, width: 320, height: 400, absolute: true };
    } else if (type === 'navbar') {
      defaultStyles = { backgroundColor: '#ffffff', borderBottom: '1px solid #eaeaea', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 24px' };
      position = { x: 0, y: 0, width: 1000, height: 60, absolute: true };
    }

    const newComponent: ComponentData = {
      id: generateId(),
      type,
      props: defaultProps,
      styles: defaultStyles,
      position
    };

    return { 
      past: [...state.past, state.components],
      future: [],
      components: [...state.components, newComponent], 
      selectedId: newComponent.id 
    };
  }),

  updateComponent: (id, updates) => set((state) => {
    const newComponents = state.components.map(c => c.id === id ? { ...c, ...updates } : c);
    return {
      past: [...state.past, state.components],
      future: [],
      components: newComponents
    };
  }),

  removeComponent: (id) => set((state) => ({
    past: [...state.past, state.components],
    future: [],
    components: state.components.filter(c => c.id !== id),
    selectedId: state.selectedId === id ? null : state.selectedId
  })),

  selectComponent: (id) => set({ selectedId: id }),

  undo: () => set((state) => {
    if (state.past.length === 0) return state;
    const previous = state.past[state.past.length - 1];
    const newPast = state.past.slice(0, state.past.length - 1);
    return {
      past: newPast,
      future: [state.components, ...state.future],
      components: previous
    };
  }),

  redo: () => set((state) => {
    if (state.future.length === 0) return state;
    const next = state.future[0];
    const newFuture = state.future.slice(1);
    return {
      past: [...state.past, state.components],
      future: newFuture,
      components: next
    };
  })
}));
