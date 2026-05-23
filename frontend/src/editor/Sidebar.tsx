export function Sidebar() {
  return (
    <div className="w-64 bg-white border-r p-4 flex flex-col gap-4">
      <h3 className="font-bold text-gray-700">Components</h3>
      <div className="p-3 border rounded bg-gray-50 cursor-grab hover:bg-gray-100">Hero Section</div>
      <div className="p-3 border rounded bg-gray-50 cursor-grab hover:bg-gray-100">Navbar</div>
      <div className="p-3 border rounded bg-gray-50 cursor-grab hover:bg-gray-100">Text Block</div>
    </div>
  );
}
