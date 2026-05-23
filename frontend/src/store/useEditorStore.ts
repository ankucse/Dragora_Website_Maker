import { create } from 'zustand';

export type ComponentType = 
  'hero' | 'grid' | 'flex' | 'mesh' | 'liquid' | 'particles' | 'text' | 'image' | 'button' |
  'section' | 'container' | 'masonry' | 'tabs' | 'accordion' | 'carousel' |
  'navbar' | 'megamenu' | 'sidebar' |
  'video' | 'lottie' | '3d' |
  'glasscard' | 'pricing' | 'stats' | 'faq' | 'progress' |
  'form' | 'input' | 'toggle' | 'upload' |
  'product' | 'cart' | 'checkout';

export interface ComponentData {
  id: string;
  type: ComponentType;
  props: Record<string, any>;
  styles: Record<string, any>;
  position: { x: number, y: number, width: number | string, height: number | string, absolute: boolean };
  children?: ComponentData[];
}

export interface Page {
  id: string;
  name: string;
  components: ComponentData[];
}

interface EditorState {
  projectId: string;
  pages: Page[];
  currentPageId: string;
  selectedId: string | null;
  deviceMode: 'desktop' | 'tablet' | 'mobile';
  isPreview: boolean;
  
  past: Page[][];
  future: Page[][];

  setDeviceMode: (mode: 'desktop' | 'tablet' | 'mobile') => void;
  setCurrentPage: (pageId: string) => void;
  addPage: (name: string) => void;
  loadProject: (id: string) => void;
  setIsPreview: (preview: boolean) => void;

  addComponent: (type: ComponentType, props?: Record<string, any>, x?: number, y?: number) => void;
  updateComponent: (id: string, updates: Partial<ComponentData>) => void;
  removeComponent: (id: string) => void;
  selectComponent: (id: string | null) => void;
  
  undo: () => void;
  redo: () => void;
}

const generateId = () => Math.random().toString(36).substr(2, 9);

const saveToLocalStorage = (projectId: string, pages: Page[]) => {
  if (projectId) {
    localStorage.setItem(`project-${projectId}`, JSON.stringify(pages));
  }
};

// Premium Unicorn Template Seed
const defaultUnicornHome: Page = {
  id: 'page-home',
  name: 'Home',
  components: [
    {
      id: 'mesh-bg',
      type: 'mesh',
      props: {},
      styles: { 
        background: 'radial-gradient(circle at 50% -20%, rgba(99, 102, 241, 0.18) 0%, transparent 50%), radial-gradient(circle at 15% 40%, rgba(236, 72, 153, 0.08) 0%, transparent 40%), radial-gradient(circle at 85% 70%, rgba(14, 165, 233, 0.08) 0%, transparent 45%), #09090b',
        opacity: 1 
      },
      position: { x: 0, y: 0, width: 1200, height: 1400, absolute: true }
    },
    {
      id: 'nav-1',
      type: 'navbar',
      props: {},
      styles: { 
        backgroundColor: 'rgba(9, 9, 11, 0.7)', 
        backdropFilter: 'blur(16px)', 
        WebkitBackdropFilter: 'blur(16px)', 
        borderBottom: '1px solid rgba(255,255,255,0.08)', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        padding: '0 60px', 
        color: '#ffffff' 
      },
      position: { x: 0, y: 0, width: 1200, height: 80, absolute: true }
    },
    {
      id: 'hero-1',
      type: 'hero',
      props: { 
        title: 'Design the next generation of visual software', 
        subtitle: 'The world\'s most powerful visual design engine. Powered by real-time WebGL, AI code generation, and collaborative canvas.' 
      },
      styles: { 
        backgroundColor: 'transparent', 
        color: '#ffffff', 
        alignItems: 'center', 
        justifyContent: 'center',
        textAlign: 'center',
        padding: '0 60px'
      },
      position: { x: 100, y: 150, width: 1000, height: 260, absolute: true }
    },
    {
      id: 'btn-1',
      type: 'button',
      props: { text: 'Start Building Free', actionType: 'navigate', actionTarget: 'page-pricing' },
      styles: { 
        padding: '16px 32px', 
        background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
        color: '#ffffff', 
        borderRadius: '9999px', 
        cursor: 'pointer', 
        fontWeight: '700', 
        fontSize: '16px',
        boxShadow: '0 10px 30px rgba(99, 102, 241, 0.4)',
        border: 'none',
        letterSpacing: '0.5px'
      },
      position: { x: 390, y: 440, width: 200, height: 56, absolute: true }
    },
    {
      id: 'btn-2',
      type: 'button',
      props: { text: 'Book a Demo', actionType: 'alert', actionTarget: '' },
      styles: { 
        padding: '16px 32px', 
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        color: '#ffffff', 
        borderRadius: '9999px', 
        cursor: 'pointer', 
        fontWeight: '600', 
        fontSize: '16px'
      },
      position: { x: 610, y: 440, width: 200, height: 56, absolute: true }
    },
    {
      id: 'video-1',
      type: 'video',
      props: { src: 'https://cdn.dribbble.com/users/3281732/screenshots/11559858/media/7b744d2d46df3c6c189b826f437c35fa.mp4' },
      styles: { 
        backgroundColor: '#000000', 
        borderRadius: '24px', 
        border: '1px solid rgba(255,255,255,0.1)',
        boxShadow: '0 50px 100px -20px rgba(0, 0, 0, 0.8), 0 0 80px rgba(99, 102, 241, 0.15)',
        overflow: 'hidden'
      },
      position: { x: 150, y: 530, width: 900, height: 480, absolute: true }
    },
    {
      id: 'bento-1',
      type: 'glasscard',
      props: { title: 'AI Physics Engine' },
      styles: { 
        backgroundColor: 'rgba(255, 255, 255, 0.02)', 
        backdropFilter: 'blur(30px)', 
        WebkitBackdropFilter: 'blur(30px)', 
        borderRadius: '24px', 
        border: '1px solid rgba(255, 255, 255, 0.08)',
        boxShadow: '0 30px 60px rgba(0, 0, 0, 0.4)',
        padding: '30px'
      },
      position: { x: 80, y: 1060, width: 320, height: 260, absolute: true }
    },
    {
      id: 'bento-2',
      type: 'glasscard',
      props: { title: 'WebGL Pipelines' },
      styles: { 
        backgroundColor: 'rgba(255, 255, 255, 0.02)', 
        backdropFilter: 'blur(30px)', 
        WebkitBackdropFilter: 'blur(30px)', 
        borderRadius: '24px', 
        border: '1px solid rgba(255, 255, 255, 0.08)',
        boxShadow: '0 30px 60px rgba(0, 0, 0, 0.4)',
        padding: '30px'
      },
      position: { x: 440, y: 1060, width: 320, height: 260, absolute: true }
    },
    {
      id: 'bento-3',
      type: 'glasscard',
      props: { title: 'React Engine' },
      styles: { 
        backgroundColor: 'rgba(255, 255, 255, 0.02)', 
        backdropFilter: 'blur(30px)', 
        WebkitBackdropFilter: 'blur(30px)', 
        borderRadius: '24px', 
        border: '1px solid rgba(255, 255, 255, 0.08)',
        boxShadow: '0 30px 60px rgba(0, 0, 0, 0.4)',
        padding: '30px'
      },
      position: { x: 800, y: 1060, width: 320, height: 260, absolute: true }
    }
  ]
};

const defaultPricingPage: Page = {
  id: 'page-pricing',
  name: 'Pricing',
  components: [
    {
      id: 'nav-2',
      type: 'navbar',
      props: {},
      styles: { backgroundColor: '#0a0a0a', borderBottom: '1px solid #1f1f1f', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 24px', color: '#ffffff' },
      position: { x: 0, y: 0, width: 1200, height: 60, absolute: true }
    },
    {
      id: 'pricing-1',
      type: 'pricing',
      props: {},
      styles: { display: 'flex', gap: '24px', padding: '24px' },
      position: { x: 150, y: 150, width: 900, height: 500, absolute: true }
    }
  ]
};

export const useEditorStore = create<EditorState>((set) => ({
  projectId: '',
  pages: [],
  currentPageId: 'page-home',
  selectedId: null,
  deviceMode: 'desktop',
  isPreview: false,
  past: [],
  future: [],

  setDeviceMode: (mode) => set({ deviceMode: mode }),
  
  setCurrentPage: (pageId) => set({ currentPageId: pageId, selectedId: null }),
  
  addPage: (name) => set((state) => {
    const newPage: Page = { id: `page-${generateId()}`, name, components: [] };
    const newPages = [...state.pages, newPage];
    saveToLocalStorage(state.projectId, newPages);
    return {
      past: [...state.past, state.pages],
      future: [],
      pages: newPages,
      currentPageId: newPage.id
    };
  }),

  loadProject: (id: string) => set(() => {
    const saved = localStorage.getItem(`project-${id}`);
    if (saved) {
      try {
        const parsedPages = JSON.parse(saved) as Page[];
        return {
          projectId: id,
          pages: parsedPages,
          currentPageId: parsedPages[0]?.id || 'page-home',
          selectedId: null,
          past: [],
          future: [],
          isPreview: false
        };
      } catch (e) {
        console.error("Failed to parse saved pages", e);
      }
    }
    
    // Default fallback if no saved data
    let defaultPages: Page[] = [];
    if (id === 'unicorn-saas') {
      defaultPages = [defaultUnicornHome, defaultPricingPage];
    } else {
      defaultPages = [
        {
          id: 'page-home',
          name: 'Home',
          components: [
            {
              id: 'mesh-bg',
              type: 'mesh',
              props: {},
              styles: { 
                background: 'radial-gradient(circle at 50% -20%, rgba(99, 102, 241, 0.12) 0%, transparent 60%), #09090b',
                opacity: 1 
              },
              position: { x: 0, y: 0, width: 1200, height: 1000, absolute: true }
            }
          ]
        }
      ];
    }
    saveToLocalStorage(id, defaultPages);
    return {
      projectId: id,
      pages: defaultPages,
      currentPageId: 'page-home',
      selectedId: null,
      past: [],
      future: [],
      isPreview: false
    };
  }),

  setIsPreview: (preview: boolean) => set({ isPreview: preview, selectedId: null }),

  addComponent: (type, props = {}, x = 300, y = 300) => set((state) => {
    let defaultProps = { ...props };
    let defaultStyles: Record<string, any> = { padding: '24px', display: 'flex', flexDirection: 'column' };
    let position = { x, y, width: 300, height: 200, absolute: true };

    if (type === 'hero') {
      defaultProps = { title: 'Build the impossible.', subtitle: 'The web, reimagined.' };
      defaultStyles = { ...defaultStyles, backgroundColor: 'transparent', color: '#ffffff', alignItems: 'center', justifyContent: 'center' };
      position = { x, y, width: 800, height: 400, absolute: true };
    } else if (type === 'button') {
      defaultProps = { text: 'Click Me', actionType: 'none', actionTarget: '' };
      defaultStyles = { padding: '12px 24px', backgroundColor: '#4f46e5', color: '#ffffff', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' };
      position = { x, y, width: 120, height: 48, absolute: true };
    } else if (type === 'text') {
      defaultProps = { text: 'Double click to edit text...' };
      defaultStyles = { fontSize: '16px', color: '#ffffff' };
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
      defaultStyles = { backgroundColor: '#0a0a0a', borderBottom: '1px solid #1f1f1f', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 24px', color: '#ffffff' };
      position = { x: 0, y: 0, width: 1200, height: 60, absolute: true };
    } else if (type === 'pricing') {
      defaultStyles = { display: 'flex', gap: '24px', padding: '24px' };
      position = { x, y, width: 900, height: 500, absolute: true };
    } else if (type === 'video') {
      defaultProps = { src: props.src || '' };
      defaultStyles = { backgroundColor: '#18181b', borderRadius: '12px' };
      position = { x, y, width: 640, height: 360, absolute: true };
    } else if (type === 'form') {
      defaultStyles = { backgroundColor: '#09090b', padding: '32px', borderRadius: '16px', border: '1px solid #27272a' };
      position = { x, y, width: 400, height: 400, absolute: true };
    } else if (type === 'cart') {
      defaultStyles = { backgroundColor: '#ffffff', padding: '24px', borderRadius: '12px', color: '#000000' };
      position = { x, y, width: 350, height: 500, absolute: true };
    } else if (type === 'section') {
      defaultStyles = { backgroundColor: 'transparent', border: '1px dashed rgba(255,255,255,0.2)' };
      position = { x, y, width: 800, height: 300, absolute: true };
    } else if (type === 'grid') {
      defaultStyles = { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', border: '1px dashed rgba(255,255,255,0.2)' };
      position = { x, y, width: 600, height: 300, absolute: true };
    } else if (type === 'flex') {
      defaultStyles = { display: 'flex', gap: '16px', border: '1px dashed rgba(255,255,255,0.2)' };
      position = { x, y, width: 600, height: 200, absolute: true };
    } else if (type === 'container') {
      defaultStyles = { border: '1px dashed rgba(255,255,255,0.2)' };
      position = { x, y, width: 400, height: 400, absolute: true };
    } else if (type === 'megamenu') {
      defaultStyles = { backgroundColor: '#18181b', borderRadius: '12px', border: '1px solid #27272a', padding: '24px', color: '#ffffff' };
      position = { x, y, width: 800, height: 300, absolute: true };
    }

    const newComponent: ComponentData = {
      id: generateId(),
      type,
      props: defaultProps,
      styles: defaultStyles,
      position
    };

    const newPages = state.pages.map(p => 
      p.id === state.currentPageId ? { ...p, components: [...p.components, newComponent] } : p
    );
    saveToLocalStorage(state.projectId, newPages);

    return { 
      past: [...state.past, state.pages],
      future: [],
      pages: newPages,
      selectedId: newComponent.id 
    };
  }),

  updateComponent: (id, updates) => set((state) => {
    const newPages = state.pages.map(p => {
      if (p.id !== state.currentPageId) return p;
      return {
        ...p,
        components: p.components.map(c => c.id === id ? { ...c, ...updates } : c)
      };
    });
    saveToLocalStorage(state.projectId, newPages);

    return {
      past: [...state.past, state.pages],
      future: [],
      pages: newPages
    };
  }),

  removeComponent: (id) => set((state) => {
    const newPages = state.pages.map(p => {
      if (p.id !== state.currentPageId) return p;
      return {
        ...p,
        components: p.components.filter(c => c.id !== id)
      };
    });
    saveToLocalStorage(state.projectId, newPages);

    return {
      past: [...state.past, state.pages],
      future: [],
      pages: newPages,
      selectedId: state.selectedId === id ? null : state.selectedId
    };
  }),

  selectComponent: (id) => set({ selectedId: id }),

  undo: () => set((state) => {
    if (state.past.length === 0) return state;
    const previous = state.past[state.past.length - 1];
    const newPast = state.past.slice(0, state.past.length - 1);
    saveToLocalStorage(state.projectId, previous);
    return {
      past: newPast,
      future: [state.pages, ...state.future],
      pages: previous
    };
  }),

  redo: () => set((state) => {
    if (state.future.length === 0) return state;
    const next = state.future[0];
    const newFuture = state.future.slice(1);
    saveToLocalStorage(state.projectId, next);
    return {
      past: [...state.past, state.pages],
      future: newFuture,
      pages: next
    };
  })
}));
