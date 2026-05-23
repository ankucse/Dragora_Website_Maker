import { useEditorStore } from '../store/useEditorStore';

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
