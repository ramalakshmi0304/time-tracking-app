import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import Navbar from "./Navbar";

export default function Layout({ user }) {
  // If no user, redirect to login
  if (!user) return <Navigate to="/login" />;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Navbar stays fixed/sticky at the top */}
      <Navbar />

      {/* Main content area */}
      <main className="flex-1 p-6 md:py-10 flex justify-center">
        <div className="w-full max-w-6xl animate-in fade-in duration-500">
          <Outlet />
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-6 text-slate-400 text-sm border-t border-slate-200 bg-white">
        © {new Date().getFullYear()} AI-Powered Tracker • Stay Productive
      </footer>
    </div>
  );
}