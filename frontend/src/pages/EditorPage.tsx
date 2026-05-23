import { Sidebar } from '../editor/Sidebar';
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
