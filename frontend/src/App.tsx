import { BrowserRouter, Routes, Route } from 'react-router-dom';
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
