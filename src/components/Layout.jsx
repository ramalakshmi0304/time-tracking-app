import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import Navbar from "./Navbar";

export default function Layout({ user }) {
  // If no user, redirect to login
  if (!user) return <Navigate to="/login" />;

  return (
    <div style={layoutWrapperStyle}>
      {/* Navbar stays fixed/sticky at the top */}
      <Navbar /> 

      {/* Main content area */}
      <main style={mainContentStyle}>
        <div style={contentInnerStyle}>
          <Outlet /> {/* Renders Dashboard or Analytics */}
        </div>
      </main>

      {/* Optional: Footer or subtle branding */}
      <footer style={footerStyle}>
        © {new Date().getFullYear()} AI-Powered Tracker • Stay Productive
      </footer>
    </div>
  );
}

// --- STYLES ---

const layoutWrapperStyle = {
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  backgroundColor: "#f9fafb", // Soft light gray background for the whole app
};

const mainContentStyle = {
  flex: 1, // Pushes footer to bottom if content is short
  padding: "40px 20px",
  display: "flex",
  justifyContent: "center",
};

const contentInnerStyle = {
  width: "100%",
  maxWidth: "1200px", // Keeps your charts and logs from getting too wide on ultrawide monitors
  animation: "fadeIn 0.5s ease-out", // Requires the CSS animation we added to App.css earlier
};

const footerStyle = {
  textAlign: "center",
  padding: "20px",
  color: "#9ca3af",
  fontSize: "0.85rem",
  borderTop: "1px solid #e5e7eb",
  backgroundColor: "#ffffff",
};