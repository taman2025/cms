import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Communities from "./components/Communities";
import Developers from "./components/Developers";
import CommunityDetails from "./components/CommunityDetails"; // Ensure this is imported

// --- DASHBOARD COMPONENT (With Aesthetics) ---
const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newTitle, setNewTitle] = useState("");

  useEffect(() => {
    fetch("https://community-backend-xyz.onrender.com/api/projects")
      .then((res) => res.json())
      .then((data) => setProjects(data));
  }, []);

  const handleAddProject = () => {
    const projectData = { title: newTitle, status: "ACTIVE" };
    fetch("https://community-backend-xyz.onrender.com/api/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(projectData),
    })
      .then((res) => res.json())
      .then((savedProject) => {
        setProjects([...projects, savedProject]);
        setShowModal(false);
        setNewTitle("");
      });
  };

  return (
    <div className="p-8 relative min-h-screen">
      {/* Header */}
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Dashboard</h1>
          <p className="text-slate-500 mt-1">Overview of your community metrics</p>
        </div>
        
        {/* Aesthetic "Glow" Button */}
        <button 
          onClick={() => setShowModal(true)} 
          className="bg-slate-900 text-white px-6 py-2.5 rounded-xl hover:bg-slate-800 shadow-lg shadow-slate-300 transition-all flex items-center gap-2 font-medium"
        >
          <span className="text-xl">+</span> New Project
        </button>
      </header>

      {/* Aesthetic Stats Grid (Gradients) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Card 1: Total Projects (Blue Gradient) */}
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-2xl shadow-lg text-white transform hover:scale-105 transition-transform duration-300">
            <h3 className="text-blue-100 text-sm font-medium mb-1">Total Projects</h3>
            <p className="text-4xl font-bold">{projects.length}</p>
            <div className="mt-4 text-xs text-blue-100 bg-blue-700 bg-opacity-30 inline-block px-2 py-1 rounded">
              +2 this week
            </div>
        </div>
        
        {/* Card 2: Active Developers (Purple Gradient) */}
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-6 rounded-2xl shadow-lg text-white transform hover:scale-105 transition-transform duration-300">
            <h3 className="text-purple-100 text-sm font-medium mb-1">Active Developers</h3>
            <p className="text-4xl font-bold">4</p>
            <div className="mt-4 text-xs text-purple-100 bg-purple-700 bg-opacity-30 inline-block px-2 py-1 rounded">
              All systems operational
            </div>
        </div>

        {/* Card 3: Pending Tasks (Orange Gradient) */}
        <div className="bg-gradient-to-br from-orange-400 to-pink-500 p-6 rounded-2xl shadow-lg text-white transform hover:scale-105 transition-transform duration-300">
            <h3 className="text-orange-100 text-sm font-medium mb-1">Pending Requests</h3>
            <p className="text-4xl font-bold">12</p>
            <div className="mt-4 text-xs text-orange-100 bg-orange-700 bg-opacity-30 inline-block px-2 py-1 rounded">
              Needs attention
            </div>
        </div>
      </div>

      {/* Project List */}
      <h2 className="text-xl font-bold text-slate-800 mb-4">Recent Projects</h2>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        {projects.map((project) => (
          <div key={project.projectId} className="p-5 border-b border-gray-100 flex justify-between items-center hover:bg-slate-50 transition-colors">
            <div>
              <h4 className="font-semibold text-slate-800">{project.title}</h4>
              <p className="text-xs text-gray-400 mt-1">ID: #{project.projectId}</p>
            </div>
            <span className={`px-3 py-1 text-xs rounded-full font-medium ${
              project.status === 'ACTIVE' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
            }`}>
              {project.status || "ACTIVE"}
            </span>
          </div>
        ))}
      </div>

      {/* Modal Popup (Clean Style) */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-2xl shadow-2xl w-96">
            <h2 className="text-2xl font-bold mb-6 text-slate-800">Add New Project</h2>
            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-600 mb-1">Project Title</label>
              <input 
                type="text" 
                placeholder="e.g. AI Vision System" 
                className="w-full border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                value={newTitle} 
                onChange={(e) => setNewTitle(e.target.value)} 
              />
            </div>
            <div className="flex gap-3">
               <button 
                  onClick={() => setShowModal(false)} 
                  className="flex-1 py-2.5 text-slate-600 hover:bg-slate-100 rounded-xl font-medium transition-colors"
               >
                 Cancel
               </button>
               <button 
                  onClick={handleAddProject} 
                  className="flex-1 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-200 font-medium transition-all"
               >
                 Save Project
               </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// --- MAIN APP (Routing) ---
function App() {
  return (
    <Router>
      <div className="flex min-h-screen bg-[#f3f4f6]">
        <Sidebar />
        <div className="ml-64 flex-1">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/communities" element={<Communities />} />
            <Route path="/communities/:id" element={<CommunityDetails />} />
            <Route path="/developers" element={<Developers />} />
            <Route path="/projects" element={<Dashboard />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;