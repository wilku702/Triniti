export const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  });
};

export const formatDisplayDate = (dateStr) => {
  const [year, month, day] = dateStr.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
};

export const formatTimeRange = (startDate, durationMinutes = 30) => {
  const endDate = new Date(startDate.getTime() + durationMinutes * 60000);
  const options = { hour: 'numeric', minute: '2-digit', hour12: true };
  const startTime = startDate.toLocaleTimeString('en-US', options);
  const endTime = endDate.toLocaleTimeString('en-US', options);
  return `${startTime} - ${endTime}`;
};

export const getDateKey = (dateObj) => {
  return new Date(
    dateObj.getFullYear(),
    dateObj.getMonth(),
    dateObj.getDate()
  ).toString();
};

export const getTodayKey = () => {
  const today = new Date();
  return getDateKey(today);
};

export const getFirstName = (fullName) => {
  return fullName ? fullName.split(' ')[0] : '';
};
