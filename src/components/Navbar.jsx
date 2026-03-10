import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { supabase } from "../config/supabase";
import { LogOut, LayoutDashboard, BarChart3, Rocket } from "lucide-react";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) console.error("Error logging out:", error.message);
    else navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  const NavLink = ({ to, children, icon: Icon }) => (
    <Link 
      to={to} 
      className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
        isActive(to) 
          ? "bg-indigo-50 text-indigo-700 shadow-sm" 
          : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
      }`}
    >
      <Icon className="w-4 h-4" />
      {children}
    </Link>
  );

  return (
    <nav className="sticky top-0 z-50 px-6 h-20 flex items-center bg-white/80 backdrop-blur-xl border-b border-slate-200/60 shadow-sm">
      {/* Brand */}
      <div className="flex items-center gap-2 text-indigo-600 mr-12">
        <Rocket className="w-6 h-6" />
        <span className="text-xl font-bold tracking-tight text-slate-900">TrackerApp</span>
      </div>
      
      {/* Nav Links */}
      <div className="flex items-center gap-2">
        <NavLink to="/dashboard" icon={LayoutDashboard}>Dashboard</NavLink>
        <NavLink to="/analytics" icon={BarChart3}>Analytics</NavLink>
      </div>
      
      {/* Logout */}
      <button 
        onClick={handleLogout}
        className="ml-auto flex items-center gap-2 text-slate-500 hover:text-red-600 px-4 py-2 rounded-lg font-medium text-sm transition-all hover:bg-red-50"
      >
        <LogOut className="w-4 h-4" />
        Logout
      </button>
    </nav>
  );
}