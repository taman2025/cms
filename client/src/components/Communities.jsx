import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Communities = () => {
  const [communities, setCommunities] = useState([]);
  const [showModal, setShowModal] = useState(false);

  // Form State
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    fetch("http://localhost:8080/api/communities")
      .then((res) => res.json())
      .then((data) => setCommunities(data));
  }, []);

  const handleAddCommunity = () => {
    const newComm = { name, description };

    fetch("http://localhost:8080/api/communities", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newComm),
    })
      .then((res) => res.json())
      .then((savedComm) => {
        setCommunities([...communities, savedComm]);
        setShowModal(false);
        setName("");
        setDescription("");
      });
  };

  return (
    <div className="p-8 relative min-h-screen">
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Communities</h1>
          <p className="text-slate-500 mt-1">Manage and view all developer groups</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="bg-slate-900 text-white px-6 py-2.5 rounded-xl hover:bg-slate-800 shadow-lg shadow-slate-300 transition-all flex items-center gap-2 font-medium"
        >
          <span className="text-xl">+</span> Create Community
        </button>
      </header>

      {/* Aesthetic Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {communities.map((comm) => (
          <div 
            key={comm.communityId} 
            className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:border-blue-200 transition-all duration-300 group"
          >
            {/* Icon with hover bounce */}
            <div className="h-14 w-14 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl flex items-center justify-center mb-4 text-2xl group-hover:scale-110 transition-transform shadow-inner">
              🌐
            </div>
            
            <h3 className="text-xl font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
              {comm.name}
            </h3>
            
            <p className="text-slate-500 mt-2 text-sm leading-relaxed h-10 line-clamp-2">
              {comm.description}
            </p>
            
            <Link 
              to={`/communities/${comm.communityId}`} 
              className="mt-6 inline-block w-full text-center py-2.5 rounded-lg bg-slate-50 text-slate-600 font-medium hover:bg-blue-600 hover:text-white transition-all shadow-sm hover:shadow-md"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>

      {/* Popup Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex justify-center items-center z-50 transition-opacity">
          <div className="bg-white p-8 rounded-2xl shadow-2xl w-96 transform transition-all scale-100">
            <h2 className="text-2xl font-bold mb-6 text-slate-800">Create Community</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">Name</label>
                <input 
                  className="w-full border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all" 
                  placeholder="e.g. Open Source Hub" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">Description</label>
                <textarea 
                  className="w-full border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all" 
                  placeholder="What is this group about?" 
                  rows="3"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-8">
              <button 
                onClick={() => setShowModal(false)} 
                className="px-5 py-2.5 text-slate-600 hover:bg-slate-100 rounded-xl font-medium transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleAddCommunity} 
                className="px-5 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-200 font-medium transition-all transform active:scale-95"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Communities;