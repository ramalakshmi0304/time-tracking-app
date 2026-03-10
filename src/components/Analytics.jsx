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
    <div className="px-5 py-5 max-w-6xl mx-auto md:px-8 lg:px-10">
      <header className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2 md:text-4xl">Performance Insights</h2>
        <p className="text-gray-600 text-lg">Analysis of your tracked time and productivity.</p>
      </header>
      
      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 h-fit">
          <h3 className="text-xl font-semibold text-gray-800 mb-5 text-center">Time Distribution</h3>
          <div className="h-80">
            <Pie data={chartData} options={chartOptions} />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 h-fit">
          <h3 className="text-xl font-semibold text-gray-800 mb-5 text-center">Activity Comparison (Mins)</h3>
          <div className="h-80">
            <Bar data={chartData} options={chartOptions} />
          </div>
        </div>
      </div>

      <hr className="border-0 border-t border-gray-200 mb-10" />

      {/* Media & Activity Grid */}
      <h3 className="text-2xl font-bold text-gray-900 mb-6">Top Activities & Memories</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {sortedActivities.map((a) => (
          <div key={a.id} className="bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-200 hover:-translate-y-1">
            {/* Image Section */}
            <div className="relative">
              {a.media && a.media.length > 0 ? (
                <img 
                  src={a.media[0].file_url} 
                  alt={a.name} 
                  className="w-full h-40 object-cover"
                />
              ) : (
                <div className="h-40 bg-gray-50 flex items-center justify-center text-gray-400 text-sm">No image</div>
              )}
              <div className="absolute top-3 right-3 bg-white/90 px-2 py-1 rounded-lg text-xs font-bold text-indigo-600 shadow-md backdrop-blur-sm">
                {a.duration}m
              </div>
            </div>

            {/* Content Section */}
            <div className="p-4">
              <h4 className="font-semibold text-gray-900 mb-1 capitalize text-base leading-tight">{a.name}</h4>
              <p className="text-xs text-gray-500 mb-0">
                {new Date(a.created_at).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
