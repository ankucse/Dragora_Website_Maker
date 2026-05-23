import { useEditorStore } from '../store/useEditorStore';

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
