import React, { useState, useEffect } from "react";
import { supabase, getToday } from "../config/supabase";
import MediaUpload from "./MediaUpload";

export default function Dashboard({ user, activities, setActivities }) {
  const [name, setName] = useState("");
  const [duration, setDuration] = useState("");
  const [selectedDate, setSelectedDate] = useState(getToday());
  const [view, setView] = useState('today'); // 'today', 'calendar', 'schedule'
  
  // States for editing
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editDuration, setEditDuration] = useState("");
  
  // Completion states
  const [completedActivities, setCompletedActivities] = useState({});

  // Filter activities by selected date
  const todayActivities = activities.filter(a => a.date === selectedDate);
  
  // Calculate total time and progress
  const totalDuration = todayActivities.reduce((sum, a) => sum + a.duration, 0);
  const maxDayMins = 24 * 60; // 1440 minutes
  const progressPercent = Math.min((totalDuration / maxDayMins) * 100, 100);

  // Load completion status on mount
  useEffect(() => {
    const saved = localStorage.getItem(`completed_${selectedDate}`);
    if (saved) {
      setCompletedActivities(JSON.parse(saved));
    }
  }, [selectedDate]);

  // Save completion status
  const toggleComplete = (id) => {
    const newCompleted = { ...completedActivities, [id]: !completedActivities[id] };
    setCompletedActivities(newCompleted);
    localStorage.setItem(`completed_${selectedDate}`, JSON.stringify(newCompleted));
  };

  const addActivity = async () => {
    if (!name || !duration) return alert("Please fill in all fields");
    const { data, error } = await supabase
      .from('activities')
      .insert([{
        name,
        duration: Number(duration),
        user_id: user.id,
        date: selectedDate
      }])
      .select();

    if (error) alert(error.message);
    else {
      setActivities([...activities, ...data]);
      setName("");
      setDuration("");
    }
  };

  const startEditing = (activity) => {
    setEditingId(activity.id);
    setEditName(activity.name);
    setEditDuration(activity.duration);
  };

  const saveEdit = async (id) => {
    const { error } = await supabase
      .from('activities')
      .update({ name: editName, duration: Number(editDuration) })
      .eq('id', id);

    if (error) {
      alert(error.message);
    } else {
      setActivities(activities.map(a => 
        a.id === id ? { ...a, name: editName, duration: Number(editDuration) } : a
      ));
      setEditingId(null);
    }
  };

  const deleteActivity = async (id) => {
    if (!window.confirm("Delete this activity?")) return;
    const { error } = await supabase.from('activities').delete().eq('id', id);
    if (error) alert(error.message);
    else setActivities(activities.filter((a) => a.id !== id));
  };

  // Generate calendar days
  const generateCalendar = () => {
    const days = [];
    const today = new Date();
    for (let i = -7; i <= 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      const dateStr = date.toISOString().split('T')[0];
      days.push({
        date: dateStr,
        isToday: dateStr === getToday(),
        activitiesCount: activities.filter(a => a.date === dateStr).length
      });
    }
    return days;
  };

  const calendarDays = generateCalendar();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Header with View Tabs */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-10 gap-6">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-indigo-900 bg-clip-text text-transparent mb-2">
              Daily Dashboard
            </h1>
            <p className="text-xl text-gray-600">Track your productivity across days</p>
          </div>
          
          {/* View Tabs */}
          <div className="flex bg-white/80 backdrop-blur-xl rounded-2xl p-1 shadow-lg border border-white/50">
            {['today', 'calendar', 'schedule'].map((tab) => (
              <button
                key={tab}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 ${
                  view === tab
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-xl shadow-indigo-500/25'
                    : 'text-gray-600 hover:text-indigo-600 hover:bg-white/50'
                }`}
                onClick={() => setView(tab)}
              >
                {tab === 'today' && '📊 Today'}
                {tab === 'calendar' && '📅 Calendar'}
                {tab === 'schedule' && '⏰ Schedule'}
              </button>
            ))}
          </div>
        </div>

        {/* Progress Bar - Always Visible */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 mb-10 shadow-xl border border-white/50">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Daily Progress</p>
              <p className="text-2xl font-bold text-gray-900">
                {totalDuration} / {maxDayMins} mins
              </p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-500 bg-clip-text text-transparent">
                {progressPercent.toFixed(1)}%
              </p>
              <p className="text-sm text-gray-500">{Math.floor(progressPercent)}% complete</p>
            </div>
          </div>
          
          <div className="w-full bg-gray-200/50 rounded-full h-4 shadow-inner">
            <div 
              className="bg-gradient-to-r from-emerald-500 to-emerald-600 h-4 rounded-full shadow-lg transition-all duration-1000 ease-out flex items-center justify-center text-xs font-bold text-white"
              style={{ width: `${progressPercent}%` }}
            >
              {progressPercent === 100 && '🎉 COMPLETE!'}
            </div>
          </div>
        </div>

        {/* Date Selector */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 mb-10 shadow-xl border border-white/50">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <h3 className="text-xl font-bold text-gray-900">Selected Date</h3>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="px-6 py-3 bg-white border border-gray-200 rounded-2xl text-lg font-semibold focus:outline-none focus:ring-4 focus:ring-indigo-500/20 shadow-sm w-full lg:w-64"
            />
          </div>
        </div>

        {/* View Content */}
        {view === 'calendar' && (
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 mb-10">
            {calendarDays.map((day) => (
              <button
                key={day.date}
                onClick={() => setSelectedDate(day.date)}
                className={`p-6 rounded-2xl shadow-lg border-2 transition-all duration-300 hover:shadow-xl hover:scale-105 hover:-translate-y-1 ${
                  selectedDate === day.date
                    ? 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white border-indigo-400 shadow-indigo-500/25 scale-105 border-4'
                    : day.isToday
                    ? 'bg-gradient-to-br from-yellow-400 to-orange-500 text-white border-yellow-400 shadow-yellow-500/25'
                    : day.activitiesCount > 0
                    ? 'bg-gradient-to-br from-emerald-400 to-emerald-500 text-white border-emerald-400 shadow-emerald-500/25'
                    : 'bg-white/70 backdrop-blur-xl border-gray-200/50 text-gray-700 hover:border-indigo-300'
                }`}
              >
                <div className="text-2xl font-bold mb-1">
                  {new Date(day.date).getDate()}
                </div>
                <div className="text-xs opacity-90">
                  {day.activitiesCount > 0 ? `${day.activitiesCount} tasks` : 'No tasks'}
                </div>
              </button>
            ))}
          </div>
        )}

        {view === 'schedule' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-white/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                    {i+1}:00
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg text-gray-900">Hour Slot</h4>
                    <p className="text-sm text-gray-500">Add time-based scheduling here</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-2 bg-gray-200 rounded-full">
                    <div className="h-2 bg-emerald-500 rounded-full w-3/4 shadow-sm" />
                  </div>
                  <p className="text-sm text-gray-600">45/60 mins used</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Add Activity Card */}
        <div className="max-w-2xl mx-auto mb-10">
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 p-8 hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg text-white font-bold text-xl">
                ➕
              </div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Add Activity for {new Date(selectedDate).toLocaleDateString()}
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <input
                  className="w-full px-5 py-4 bg-white/50 border border-gray-200/50 rounded-2xl text-lg placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-300 hover:border-gray-300 shadow-sm"
                  placeholder="What are you doing?"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="flex gap-3">
                <input
                  className="flex-1 px-5 py-4 bg-white/50 border border-gray-200/50 rounded-2xl text-lg placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-300 hover:border-gray-300 shadow-sm"
                  type="number"
                  placeholder="Mins"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                />
                <button 
                  className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-indigo-500/50 whitespace-nowrap"
                  onClick={addActivity}
                >
                  Add Activity
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Activities List */}
        {todayActivities.length === 0 ? (
          <div className="text-center py-20 bg-white/60 backdrop-blur-xl rounded-3xl border-2 border-dashed border-gray-200 shadow-xl">
            <div className="w-20 h-20 mx-auto mb-6 text-gray-400 text-5xl">📋</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No activities</h3>
            <p className="text-gray-600 text-lg mb-8 max-w-md mx-auto">
              Add your first activity above for {new Date(selectedDate).toLocaleDateString()}
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {todayActivities.map((activity) => (
              <div 
                key={activity.id} 
                className={`group bg-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-lg border border-white/50 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border-l-4 ${
                  editingId === activity.id 
                    ? 'border-emerald-500 bg-emerald-50/50' 
                    : completedActivities[activity.id]
                    ? 'border-green-500 bg-green-50/50 opacity-75'
                    : 'border-indigo-500 hover:border-indigo-600'
                }`}
              >
                <div className="flex items-start justify-between mb-6 gap-4">
                  <div className="flex items-start gap-4 flex-1">
                    <button
                      onClick={() => toggleComplete(activity.id)}
                      className={`w-8 h-8 rounded-xl flex items-center justify-center mt-1 font-bold text-lg transition-all duration-200 shadow-md ${
                        completedActivities[activity.id]
                          ? 'bg-green-500 text-white shadow-green-500/25 rotate-12 scale-110'
                          : 'bg-gray-200 text-gray-500 hover:bg-indigo-200 hover:text-indigo-600 hover:scale-110'
                      }`}
                      title={completedActivities[activity.id] ? "Mark incomplete" : "Mark complete"}
                    >
                      {completedActivities[activity.id] ? '✓' : '○'}
                    </button>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline gap-3">
                        {editingId === activity.id ? (
                          <input 
                            className="flex-1 px-4 py-3 bg-white border border-gray-200 rounded-2xl text-xl font-semibold focus:outline-none focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-300"
                            value={editName} 
                            onChange={(e) => setEditName(e.target.value)} 
                          />
                        ) : (
                          <h3 
                            className={`text-2xl font-bold transition-all duration-300 pr-8 capitalize ${
                              completedActivities[activity.id] 
                                ? 'line-through decoration-2 decoration-green-500/50 text-green-700' 
                                : 'text-gray-900 group-hover:text-indigo-900'
                            }`}
                          >
                            {activity.name}
                          </h3>
                        )}
                        
                        <div className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-sm font-semibold shadow-sm transition-all duration-300 ${
                          completedActivities[activity.id]
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-800'
                        }`}>
                          <span className="text-lg">⏱️</span>
                          {editingId === activity.id ? (
                            <input 
                              type="number" 
                              className="w-20 px-2 py-1 bg-transparent border-0 text-lg font-semibold focus:outline-none text-right"
                              value={editDuration} 
                              onChange={(e) => setEditDuration(e.target.value)} 
                            />
                          ) : (
                            `${activity.duration} mins`
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className={`flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 ${completedActivities[activity.id] ? 'opacity-50' : ''}`}>
                    {editingId === activity.id ? (
                      <>
                        <button 
                          onClick={() => saveEdit(activity.id)}
                          className="p-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
                        >
                          <span className="font-bold text-lg">✓</span>
                        </button>
                        <button 
                          onClick={() => setEditingId(null)}
                          className="p-3 bg-gray-500 hover:bg-gray-600 text-white rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
                        >
                          <span className="font-bold text-lg">✕</span>
                        </button>
                      </>
                    ) : (
                      <>
                        <button 
                          onClick={() => startEditing(activity)}
                          className="p-3 bg-indigo-500 hover:bg-indigo-600 text-white rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
                        >
                          <span className="font-bold text-lg">✏️</span>
                        </button>
                        <button 
                          onClick={() => deleteActivity(activity.id)}
                          className="p-3 bg-red-500 hover:bg-red-600 text-white rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
                        >
                          <span className="font-bold text-lg">🗑️</span>
                        </button>
                      </>
                    )}
                  </div>
                </div>

                {/* Media Gallery - FIXED KEY PROP */}
                {activity.media && activity.media.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 p-4 bg-gradient-to-br from-gray-50 to-indigo-50 rounded-2xl">
                    {activity.media.map((img, index) => (
                      <div 
                        key={img.id || img.file_url || index}
                        className="group/media relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105"
                      >
                        <img 
                          src={img.file_url} 
                          alt="Activity" 
                          className="w-full h-28 md:h-32 object-cover rounded-2xl group-hover/media:scale-110 transition-transform duration-300"
                        />
                      </div>
                    ))}
                  </div>
                )}

                {/* Media Upload */}
                <div className="pt-4 border-t border-gray-200/50">
                  <MediaUpload memoryId={activity.id} onUploadSuccess={() => {}} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
