import { useState, useEffect } from 'react';
import { ref, onValue, push, remove } from "firebase/database";
import { db } from "../config/firebase";

export const useActivities = (userId) => {
  const [activities, setActivities] = useState([]);
  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    if (!userId) return;

    const activityRef = ref(db, `entries/${userId}/${today}`);
    const unsubscribe = onValue(activityRef, (snapshot) => {
      const data = snapshot.val() || {};
      const list = Object.keys(data).map(k => ({ ...data[k], key: k }));
      setActivities(list);
    });

    return () => unsubscribe();
  }, [userId, today]);

  const addActivity = (name, duration) => {
    const activityRef = ref(db, `entries/${userId}/${today}`);
    return push(activityRef, { 
      name, 
      duration: Number(duration), 
      timestamp: Date.now() 
    });
  };

  const deleteActivity = (key) => {
    return remove(ref(db, `entries/${userId}/${today}/${key}`));
  };

  const totalMinutes = activities.reduce((sum, a) => sum + a.duration, 0);

  return { 
    activities, 
    addActivity, 
    deleteActivity, 
    minutesLeft: 1440 - totalMinutes 
  };
};