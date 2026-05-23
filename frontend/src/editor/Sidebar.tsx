import { Type, Image, Square, AlignLeft, GripVertical, Search } from 'lucide-react';

export function Sidebar() {
  const elements = [
    { id: 'text', label: 'Text Block', icon: <Type className="w-4 h-4 text-primary" /> },
    { id: 'image', label: 'Image Box', icon: <Image className="w-4 h-4 text-green-400" /> },
    { id: 'button', label: 'Primary Button', icon: <Square className="w-4 h-4 text-accent" /> },
    { id: 'hero', label: 'Hero Section', icon: <AlignLeft className="w-4 h-4 text-purple-400" /> },
  ];

  return (
    <div className="w-72 bg-surface/80 backdrop-blur-3xl border-r border-border p-4 flex flex-col gap-6 z-10 pt-20">
      <div>
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">Add Elements</h3>
        
        <div className="relative mb-4">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input 
            type="text" 
            placeholder="Search components..." 
            className="w-full bg-background border border-white/5 rounded-lg py-2 pl-9 pr-3 text-sm focus:outline-none focus:border-primary/50 text-white placeholder:text-gray-600 transition-colors"
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          {elements.map(el => (
            <div 
              key={el.id}
              className="flex flex-col items-center justify-center p-3 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all cursor-grab active:cursor-grabbing group"
            >
              <div className="mb-2 p-2 rounded-lg bg-background group-hover:scale-110 transition-transform">
                {el.icon}
              </div>
              <span className="text-[11px] font-medium text-gray-400 group-hover:text-gray-200">{el.label}</span>
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex-1">
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">Layers</h3>
        <div className="space-y-1">
          <div className="flex items-center gap-2 p-2 rounded-lg bg-primary/10 border border-primary/20 text-white text-xs cursor-pointer">
            <GripVertical className="w-3 h-3 text-gray-500" />
            <AlignLeft className="w-3.5 h-3.5 text-primary" />
            Hero Section
          </div>
          <div className="flex items-center gap-2 p-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white text-xs cursor-pointer ml-4 transition-colors">
            <GripVertical className="w-3 h-3 text-gray-600" />
            <Type className="w-3.5 h-3.5" />
            H1 Heading
          </div>
          <div className="flex items-center gap-2 p-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white text-xs cursor-pointer ml-4 transition-colors">
            <GripVertical className="w-3 h-3 text-gray-600" />
            <Square className="w-3.5 h-3.5" />
            CTA Button
          </div>
        </div>
      </div>
    </div>
  );
}
