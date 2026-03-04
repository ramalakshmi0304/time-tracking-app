import React from "react";
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart, ArcElement, CategoryScale, LinearScale, BarElement, Tooltip, Legend
} from "chart.js";

Chart.register(ArcElement, CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function Analytics({ activities }) {
  // Chart Visual Configuration
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'bottom', labels: { usePointStyle: true, padding: 20 } },
    },
    maintainAspectRatio: false
  };

  const chartData = {
    labels: activities.map((a) => a.name),
    datasets: [{
      label: "Minutes spent",
      data: activities.map((a) => a.duration),
      backgroundColor: ["#6366f1", "#8b5cf6", "#ec4899", "#f59e0b", "#10b981"],
      borderWidth: 0,
      borderRadius: 6,
    }]
  };

  const sortedActivities = [...activities].sort((a, b) => b.duration - a.duration);

  return (
    <div className="analytics-container" style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
      <header style={{ marginBottom: "30px" }}>
        <h2 style={{ fontSize: "1.8rem", color: "#111827", margin: 0 }}>Performance Insights</h2>
        <p style={{ color: "#6b7280" }}>Analysis of your tracked time and productivity.</p>
      </header>
      
      {/* Charts Section */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))", gap: "25px", marginBottom: "50px" }}>
        <div className="chart-card" style={cardStyle}>
          <h3 style={chartTitleStyle}>Time Distribution</h3>
          <div style={{ height: "300px" }}>
            <Pie data={chartData} options={chartOptions} />
          </div>
        </div>
        
        <div className="chart-card" style={cardStyle}>
          <h3 style={chartTitleStyle}>Activity Comparison (Mins)</h3>
          <div style={{ height: "300px" }}>
            <Bar data={chartData} options={chartOptions} />
          </div>
        </div>
      </div>

      <hr style={{ border: "0", borderTop: "1px solid #e5e7eb", marginBottom: "40px" }} />

      {/* Media & Activity Grid */}
      <h3 style={{ fontSize: "1.4rem", marginBottom: "20px" }}>Top Activities & Memories</h3>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "20px" }}>
        {sortedActivities.map((a) => (
          <div key={a.id} style={activityCardStyle}>
            {/* Image Section */}
            <div style={{ position: "relative" }}>
              {a.media && a.media.length > 0 ? (
                <img 
                  src={a.media[0].file_url} 
                  alt={a.name} 
                  style={imageStyle} 
                />
              ) : (
                <div style={placeholderStyle}>No image</div>
              )}
              <div style={durationBadge}>{a.duration}m</div>
            </div>

            {/* Content Section */}
            <div style={{ padding: "15px" }}>
              <h4 style={{ margin: "0 0 5px 0", fontSize: "1.1rem", textTransform: "capitalize" }}>{a.name}</h4>
              <p style={{ margin: 0, fontSize: "0.85rem", color: "#6b7280" }}>
                {new Date(a.created_at).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Styles Objects
const cardStyle = {
  background: "#fff",
  padding: "24px",
  borderRadius: "16px",
  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
  border: "1px solid #f3f4f6"
};

const chartTitleStyle = {
  fontSize: "1rem",
  fontWeight: "600",
  color: "#374151",
  marginBottom: "20px",
  textAlign: "center"
};

const activityCardStyle = {
  background: "#fff",
  borderRadius: "12px",
  overflow: "hidden",
  border: "1px solid #e5e7eb",
  transition: "transform 0.2s",
  cursor: "default"
};

const imageStyle = {
  width: "100%",
  height: "160px",
  objectFit: "cover",
  display: "block"
};

const placeholderStyle = {
  height: "160px",
  background: "#f9fafb",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#9ca3af",
  fontSize: "0.9rem"
};

const durationBadge = {
  position: "absolute",
  top: "10px",
  right: "10px",
  background: "rgba(255, 255, 255, 0.9)",
  padding: "4px 8px",
  borderRadius: "6px",
  fontSize: "0.75rem",
  fontWeight: "bold",
  color: "#4f46e5",
  boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
};