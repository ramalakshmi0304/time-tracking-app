import React, { useState } from "react";
import { supabase } from "../config/supabase";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // 1. SIGNUP
  const handleSignup = async () => {
  setLoading(true);
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
  });

  if (error) {
    alert(error.message);
  } else {
    // Because 'Confirm Email' is OFF, data.session will exist immediately
    alert("Account created successfully!");
    // Your App.jsx listener will automatically redirect to /dashboard
  }
  setLoading(false);
};

  // 2. LOGIN (Email/Password)
  const handleLogin = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) alert(error.message);
    setLoading(false);
  };

  // 3. MAGIC LINK (Optional but cool)
const handleMagicLink = async () => {
  setLoading(true);
  const { error } = await supabase.auth.signInWithOtp({ 
    email,
    options: {
      // This ensures the link in the email brings them back to your dev server
      emailRedirectTo: 'http://localhost:5173/dashboard', 
    }
  });
  
  if (error) alert(error.message);
  else alert("Check your inbox! We've sent you a login link.");
  setLoading(false);
};

  return (
    <div style={{ maxWidth: "400px", margin: "auto", textAlign: "center" }}>
      <h2>Welcome Back</h2>
      <input
        type="email"
        placeholder="Your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ display: "block", width: "100%", marginBottom: "10px", padding: "8px" }}
      />
      <input
        type="password"
        placeholder="Your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ display: "block", width: "100%", marginBottom: "10px", padding: "8px" }}
      />
      
      <button onClick={handleLogin} disabled={loading} style={{ marginRight: "10px" }}>
        {loading ? "Loading..." : "Login"}
      </button>
      <button onClick={handleSignup} disabled={loading}>
        Sign Up
      </button>
      
      <p style={{ marginTop: "20px", fontSize: "0.9rem" }}>
        Forgot password? <button onClick={handleMagicLink} style={{ background: 'none', border: 'none', color: 'blue', cursor: 'pointer', textDecoration: 'underline' }}>Send Magic Link</button>
      </p>
    </div>
  );
} 