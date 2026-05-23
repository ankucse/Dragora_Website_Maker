import { useNavigate } from 'react-router-dom';

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
