import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { supabase } from "../config/supabase";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation(); // Used to highlight the active tab

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error logging out:", error.message);
    } else {
      navigate("/login");
    }
  };

  // Helper to check if the link is active
  const isActive = (path) => location.pathname === path;

  return (
    <nav style={navStyle}>
      <div style={logoStyle}>🚀 TrackerApp</div>
      
      <div style={linkContainerStyle}>
        <Link 
          to="/dashboard" 
          style={isActive("/dashboard") ? activeLinkStyle : linkStyle}
        >
          Dashboard
        </Link>
        <Link 
          to="/analytics" 
          style={isActive("/analytics") ? activeLinkStyle : linkStyle}
        >
          Analytics
        </Link>
      </div>
      
      <button 
        onClick={handleLogout}
        style={logoutButtonStyle}
        onMouseOver={(e) => (e.target.style.backgroundColor = "#ff7875")}
        onMouseOut={(e) => (e.target.style.backgroundColor = "#ff4d4f")}
      >
        Logout
      </button>
    </nav>
  );
}

// --- STYLES ---
const navStyle = {
  display: "flex",
  alignItems: "center",
  padding: "0 40px",
  height: "70px",
  backgroundColor: "rgba(255, 255, 255, 0.8)",
  backdropFilter: "blur(10px)", // Modern "glass" effect
  borderBottom: "1px solid #e5e7eb",
  position: "sticky",
  top: 0,
  zIndex: 1000,
};

const logoStyle = {
  fontSize: "1.25rem",
  fontWeight: "800",
  color: "#4f46e5",
  marginRight: "40px",
  letterSpacing: "-0.5px"
};

const linkContainerStyle = {
  display: "flex",
  gap: "30px",
};

const linkStyle = {
  textDecoration: "none",
  color: "#6b7280",
  fontWeight: "500",
  fontSize: "0.95rem",
  transition: "color 0.2s ease",
};

const activeLinkStyle = {
  ...linkStyle,
  color: "#4f46e5",
  borderBottom: "2px solid #4f46e5",
  paddingBottom: "24px", // Aligns border with the bottom of the nav
};

const logoutButtonStyle = {
  marginLeft: "auto",
  backgroundColor: "#ff4d4f",
  color: "white",
  border: "none",
  padding: "8px 18px",
  borderRadius: "8px",
  fontWeight: "600",
  fontSize: "0.9rem",
  cursor: "pointer",
  transition: "all 0.2s ease",
  boxShadow: "0 2px 4px rgba(255, 77, 79, 0.2)"
};