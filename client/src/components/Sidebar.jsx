import React from 'react';
import { Link, useLocation } from 'react-router-dom'; // Import Link

const Sidebar = () => {
  const location = useLocation(); // To highlight the active tab
  
  const menuItems = [
    { name: "Dashboard", path: "/", icon: "📊" },
    { name: "Communities", path: "/communities", icon: "👥" },
    { name: "Projects", path: "/projects", icon: "🚀" },
    { name: "Developers", path: "/developers", icon: "👨‍💻" },
  ];

  return (
    <div className="h-screen w-64 bg-slate-900 text-white flex flex-col p-4 fixed left-0 top-0">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-wider">GM Studios</h1>
        <p className="text-xs text-slate-400">Management System</p>
      </div>

      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => (
          <Link to={item.path} key={item.name}>
            <div className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-colors mb-2
              ${location.pathname === item.path ? 'bg-blue-600' : 'hover:bg-slate-800'}`}>
              <span>{item.icon}</span>
              <span className="font-medium">{item.name}</span>
            </div>
          </Link>
        ))}
      </nav>

      <div className="mt-auto pt-4 border-t border-slate-700">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center text-black font-bold">TK</div>
          <div>
            <p className="text-sm font-semibold">Tamanpreet</p>
            <p className="text-xs text-slate-400">Admin</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;