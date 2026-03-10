import React, { useState } from "react";
import { supabase } from "../config/supabase";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleSignup = async () => {
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    if (loading) return;

    setLoading(true);
    setError("");
    setMessage("");

    try {
      const { data, error } = await supabase.auth.signUp({
        email: email.trim().toLowerCase(),
        password: password,
      });

      if (error) {
        setError(error.message);
      } else {
        setMessage("✅ Account created and logged in!");
        setEmail("");
        setPassword("");
      }
    } catch (err) {
      setError("Signup failed. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    if (loading) return;

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);
    setError("");
    setMessage("");

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password,
      });

      if (error) {
        setError(error.message);
      } else {
        setMessage("✅ Logged in successfully!");
        setEmail("");
        setPassword("");
      }
    } catch (err) {
      setError("Login failed. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 bg-gradient-to-br from-indigo-50 to-purple-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-2xl shadow-xl border border-gray-100">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Welcome</h2>
          <p className="mt-2 text-sm text-gray-600">Sign in or create an account</p>
        </div>

        {error && <div className="bg-red-50 p-4 rounded-xl text-red-800 text-sm">{error}</div>}
        {message && <div className="bg-green-50 p-4 rounded-xl text-green-800 text-sm">{message}</div>}

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
              disabled={loading}
            />
          </div>

          <div className="space-y-3">
            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 disabled:opacity-50"
            >
              {loading ? "Loading..." : "Login"}
            </button>

            <button
              onClick={handleSignup}
              disabled={loading}
              className="w-full bg-purple-600 text-white py-3 rounded-xl font-semibold hover:bg-purple-700 disabled:opacity-50"
            >
              Create Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}