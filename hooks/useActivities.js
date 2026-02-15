import { useState, useEffect } from 'react';
import { getActivities } from '../services/firestore';
import { resolveImage } from '../data/activityImages';
import { getDateKey } from '../utils/dateFormatters';

const useActivities = (patientId) => {
  const [activitiesGroupedByDate, setActivitiesGroupedByDate] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchActivities = async (signal) => {
    try {
      setLoading(true);
      setError(null);
      const activities = await getActivities(patientId);
      if (signal?.cancelled) return;

      const grouped = {};
      activities.forEach((activity) => {
        const dateObj = activity.date.toDate();
        const dateKey = getDateKey(dateObj);

        if (!grouped[dateKey]) grouped[dateKey] = [];
        grouped[dateKey].push({
          id: activity.id,
          title: activity.title,
          time: activity.time,
          imageKey: activity.imageKey,
          image: resolveImage(activity.imageKey)
        });
      });
      setActivitiesGroupedByDate(grouped);
    } catch (err) {
      if (signal?.cancelled) return;
      setError('Failed to load activities.');
    } finally {
      if (!signal?.cancelled) setLoading(false);
    }
  };

  useEffect(() => {
    const signal = { cancelled: false };
    if (patientId) fetchActivities(signal);
    return () => { signal.cancelled = true; };
  }, [patientId]);

  const addToGroupedState = (dateKey, entry) => {
    setActivitiesGroupedByDate((prev) => {
      const updated = { ...prev };
      if (updated[dateKey]) {
        updated[dateKey] = [...updated[dateKey], entry];
      } else {
        updated[dateKey] = [entry];
      }
      return updated;
    });
  };

  return {
    activitiesGroupedByDate,
    loading,
    error,
    refetch: () => fetchActivities(),
    addToGroupedState
  };
};

export default useActivities;
