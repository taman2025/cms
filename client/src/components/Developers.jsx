import { useEffect, useState } from "react";

const Developers = () => {
  const [developers, setDevelopers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  
  // Form State
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("DEVELOPER");

  // 1. Fetch Developers
  useEffect(() => {
    fetch("https://community-backend-xyz.onrender.comapi/developers")
      .then((res) => res.json())
      .then((data) => setDevelopers(data));
  }, []);

  // 2. Add Developer Function
  const handleAddDeveloper = () => {
    const newDev = { fullName, email, role, avatarUrl: "" };

    fetch("https://community-backend-xyz.onrender.com/api/developers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newDev),
    })
      .then((res) => res.json())
      .then((savedDev) => {
        setDevelopers([...developers, savedDev]); // Update list instantly
        setShowModal(false); // Close popup
        setFullName("");     // Clear form
        setEmail("");
      });
  };

  return (
    <div className="p-8 relative">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-slate-800">Developer Directory</h1>
        <button 
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 shadow-md"
        >
          + Add Developer
        </button>
      </header>

      {/* List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {developers.map((dev) => (
          <div key={dev.userId} className="p-4 border-b border-gray-100 flex items-center hover:bg-gray-50">
            <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-600 mr-4">
              {dev.fullName ? dev.fullName.charAt(0) : "?"}
            </div>
            <div>
              <h4 className="font-semibold text-slate-800">{dev.fullName}</h4>
              <p className="text-sm text-gray-500">{dev.email}</p>
            </div>
            <span className="ml-auto px-3 py-1 text-xs rounded-full bg-blue-50 text-blue-600 font-medium">
              {dev.role}
            </span>
          </div>
        ))}
      </div>

      {/* Popup Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-96">
            <h2 className="text-xl font-bold mb-4">Add New Team Member</h2>
            
            <input 
              className="w-full border p-2 rounded mb-3" 
              placeholder="Full Name" 
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
            <input 
              className="w-full border p-2 rounded mb-3" 
              placeholder="Email Address" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <select 
              className="w-full border p-2 rounded mb-4"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="DEVELOPER">Developer</option>
              <option value="DESIGNER">Designer</option>
              <option value="ADMIN">Admin</option>
            </select>

            <div className="flex justify-end gap-2">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded">Cancel</button>
              <button onClick={handleAddDeveloper} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Developers;