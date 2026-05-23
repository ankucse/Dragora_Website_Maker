import os

base_dir = "frontend/src"
dirs = ["components", "pages", "editor", "store"]

for d in dirs:
    os.makedirs(os.path.join(base_dir, d), exist_ok=True)

# index.css
index_css = """@tailwind base;
@tailwind components;
@tailwind utilities;
"""

# postcss.config.js
postcss_js = """export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
"""

# tailwind.config.js
tailwind_js = """/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
"""

with open("frontend/src/index.css", "w") as f: f.write(index_css)
with open("frontend/postcss.config.js", "w") as f: f.write(postcss_js)
with open("frontend/tailwind.config.js", "w") as f: f.write(tailwind_js)

# App.tsx
app_tsx = """import { BrowserRouter, Routes, Route } from 'react-router-dom';
import EditorPage from './pages/EditorPage';
import DashboardPage from './pages/DashboardPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/editor/:projectId" element={<EditorPage />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
"""
with open(os.path.join(base_dir, "App.tsx"), "w") as f: f.write(app_tsx)

# Store (Zustand)
store_ts = """import { create } from 'zustand';

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
"""
with open(os.path.join(base_dir, "store/useEditorStore.ts"), "w") as f: f.write(store_ts)

# Pages
dashboard_tsx = """import { useNavigate } from 'react-router-dom';

export default function DashboardPage() {
  const navigate = useNavigate();
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">My Projects</h1>
      <button 
        onClick={() => navigate('/editor/new')}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
        Create New Website
      </button>
    </div>
  );
}
"""

editor_page_tsx = """import { Sidebar } from '../editor/Sidebar';
import { Canvas } from '../editor/Canvas';
import { PropertiesPanel } from '../editor/PropertiesPanel';

export default function EditorPage() {
  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <div className="h-14 bg-white border-b flex items-center justify-between px-4">
          <span className="font-semibold">Website Builder</span>
          <button className="bg-green-600 text-white px-4 py-1 rounded text-sm">Publish</button>
        </div>
        <Canvas />
      </div>
      <PropertiesPanel />
    </div>
  );
}
"""
with open(os.path.join(base_dir, "pages/DashboardPage.tsx"), "w") as f: f.write(dashboard_tsx)
with open(os.path.join(base_dir, "pages/EditorPage.tsx"), "w") as f: f.write(editor_page_tsx)

# Editor Components
sidebar_tsx = """export function Sidebar() {
  return (
    <div className="w-64 bg-white border-r p-4 flex flex-col gap-4">
      <h3 className="font-bold text-gray-700">Components</h3>
      <div className="p-3 border rounded bg-gray-50 cursor-grab hover:bg-gray-100">Hero Section</div>
      <div className="p-3 border rounded bg-gray-50 cursor-grab hover:bg-gray-100">Navbar</div>
      <div className="p-3 border rounded bg-gray-50 cursor-grab hover:bg-gray-100">Text Block</div>
    </div>
  );
}
"""
canvas_tsx = """import { useEditorStore } from '../store/useEditorStore';

export function Canvas() {
  const components = useEditorStore(s => s.components);
  return (
    <div className="flex-1 p-8 overflow-auto flex justify-center items-start">
      <div className="w-full max-w-4xl min-h-[800px] bg-white shadow-lg relative rounded border border-dashed border-gray-300">
         {components.length === 0 && (
           <div className="absolute inset-0 flex items-center justify-center text-gray-400">
             Drag components here
           </div>
         )}
      </div>
    </div>
  );
}
"""
props_tsx = """import { useEditorStore } from '../store/useEditorStore';

export function PropertiesPanel() {
  const selectedId = useEditorStore(s => s.selectedId);
  return (
    <div className="w-72 bg-white border-l p-4">
      <h3 className="font-bold text-gray-700 mb-4">Properties</h3>
      {selectedId ? (
        <div className="text-sm">Editing component {selectedId}</div>
      ) : (
        <div className="text-sm text-gray-400">Select a component to edit</div>
      )}
    </div>
  );
}
"""
with open(os.path.join(base_dir, "editor/Sidebar.tsx"), "w") as f: f.write(sidebar_tsx)
with open(os.path.join(base_dir, "editor/Canvas.tsx"), "w") as f: f.write(canvas_tsx)
with open(os.path.join(base_dir, "editor/PropertiesPanel.tsx"), "w") as f: f.write(props_tsx)

print("Frontend generation complete.")
