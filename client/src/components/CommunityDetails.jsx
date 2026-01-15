import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const CommunityDetails = () => {
  const { id } = useParams(); // Get the "1" from the URL
  const [community, setCommunity] = useState(null);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    // 1. Fetch Community Details
    fetch(`https://community-backend-xyz.onrender.com/api/communities/${id}`)
      .then((res) => res.json())
      .then((data) => setCommunity(data));

    // 2. Fetch All Projects (We will filter them below)
    fetch("https://community-backend-xyz.onrender.com/api/projects")
      .then((res) => res.json())
      .then((data) => setProjects(data));
  }, [id]);

  if (!community) return <div className="p-8">Loading...</div>;

  // Filter projects that belong to this community
  const communityProjects = projects.filter(
    (p) => p.community && p.community.communityId === parseInt(id)
  );

  return (
    <div className="p-8">
      {/* Back Button */}
      <Link to="/communities" className="text-gray-500 hover:text-blue-600 mb-4 inline-block">
        ← Back to Communities
      </Link>

      {/* Header */}
      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 mb-8">
        <div className="h-16 w-16 bg-blue-100 rounded-lg flex items-center justify-center mb-4 text-3xl">
          🌐
        </div>
        <h1 className="text-4xl font-bold text-slate-800 mb-2">{community.name}</h1>
        <p className="text-xl text-gray-500">{community.description}</p>
      </div>

      {/* Projects Section */}
      <h2 className="text-2xl font-bold text-slate-800 mb-4">Projects in this Community</h2>
      
      {communityProjects.length === 0 ? (
        <p className="text-gray-500 italic">No projects started yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {communityProjects.map((project) => (
            <div key={project.projectId} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-xl font-bold text-slate-800">{project.title}</h3>
              <span className="inline-block mt-2 px-3 py-1 text-xs rounded-full bg-green-100 text-green-700 font-medium">
                {project.status}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CommunityDetails;