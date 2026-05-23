import { create } from 'zustand';

interface PageComponent {
  id: string;
  type: string;
  content: string;
  styles: Record<string, any>;
}

interface EditorState {
  components: PageComponent[];
  selectedId: string | null;
  addComponent: (comp: PageComponent) => void;
  selectComponent: (id: string) => void;
  updateComponentStyles: (id: string, styles: Record<string, any>) => void;
}

export const useEditorStore = create<EditorState>((set) => ({
  components: [],
  selectedId: null,
  addComponent: (comp) => set((state) => ({ components: [...state.components, comp] })),
  selectComponent: (id) => set({ selectedId: id }),
  updateComponentStyles: (id, styles) => set((state) => ({
    components: state.components.map(c => c.id === id ? { ...c, styles: { ...c.styles, ...styles } } : c)
  }))
}));
