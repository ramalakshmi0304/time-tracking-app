import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { supabase } from "./config/supabase";
import "./App.css"; 

import Auth from "./components/Auth";
import Dashboard from "./components/Dashboard";
import Analytics from "./components/Analytics";
import Layout from "./components/Layout";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      if (currentUser) {
        fetchWeeklyActivities(currentUser.id);
      } else {
        setLoading(false);
      }
    });
    return () => subscription.unsubscribe();
  }, []);

  const fetchWeeklyActivities = async (userId) => {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const dateString = sevenDaysAgo.toISOString().split('T')[0];

    // Note: Re-adding the nested select for media to support your Analytics view
    const { data, error } = await supabase
      .from('activities')
      .select('*, media(file_url)') 
      .eq('user_id', userId)
      .gte('date', dateString)
      .order('date', { ascending: true });

    if (!error) setActivities(data);
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="full-page-loader">
        <div className="loader-content">
          <div className="main-spinner"></div>
          <h2 className="loader-text">TrackerApp</h2>
          <p className="loader-subtext">Preparing your productivity insights...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="app-main-wrapper">
      <Router>
        <Routes>
          {/* Login Page */}
          <Route path="/login" element={!user ? <Auth /> : <Navigate to="/dashboard" />} />

          {/* Protected Routes inside Layout */}
          <Route element={<Layout user={user} />}>
            <Route 
              path="/dashboard" 
              element={
                <div className="page-fade-in">
                  <Dashboard user={user} activities={activities} setActivities={setActivities} />
                </div>
              } 
            />
            <Route 
              path="/analytics" 
              element={
                <div className="page-fade-in">
                  <Analytics activities={activities} />
                </div>
              } 
            />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to={user ? "/dashboard" : "/login"} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;