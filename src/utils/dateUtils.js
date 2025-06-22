export const formatDate = (date) => {
  const d = new Date(date);
  return d.toLocaleDateString('fr-FR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export const formatTime = (time) => {
  return time;
};

export const isToday = (date) => {
  const today = new Date();
  const compareDate = new Date(date);
  
  return today.getDate() === compareDate.getDate() &&
         today.getMonth() === compareDate.getMonth() &&
         today.getFullYear() === compareDate.getFullYear();
};

export const isSameDay = (date1, date2) => {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  
  return d1.getDate() === d2.getDate() &&
         d1.getMonth() === d2.getMonth() &&
         d1.getFullYear() === d2.getFullYear();
};

export const getMonthName = (date) => {
  return new Date(date).toLocaleDateString('fr-FR', { month: 'long' });
};

export const addWeeks = (date, weeks) => {
  const result = new Date(date);
  result.setDate(result.getDate() + (weeks * 7));
  return result;
};

export const subWeeks = (date, weeks) => {
  const result = new Date(date);
  result.setDate(result.getDate() - (weeks * 7));
  return result;
};

export const getWeekDates = (date) => {
  const currentDate = new Date(date);
  const startOfWeek = new Date(currentDate);
  
  // Get Monday as start of week (0 = Sunday, 1 = Monday, etc.)
  const day = currentDate.getDay();
  const diff = currentDate.getDate() - day + (day === 0 ? -6 : 1);
  startOfWeek.setDate(diff);
  
  const weekDates = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date(startOfWeek);
    date.setDate(startOfWeek.getDate() + i);
    weekDates.push(date);
  }
  
  return weekDates;
};

export const getStartOfWeek = (date) => {
  const currentDate = new Date(date);
  const day = currentDate.getDay();
  const diff = currentDate.getDate() - day + (day === 0 ? -6 : 1);
  const startOfWeek = new Date(currentDate);
  startOfWeek.setDate(diff);
  startOfWeek.setHours(0, 0, 0, 0);
  return startOfWeek;
};

export const getEndOfWeek = (date) => {
  const startOfWeek = getStartOfWeek(date);
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);
  endOfWeek.setHours(23, 59, 59, 999);
  return endOfWeek;
};

export const isThisWeek = (date) => {
  const now = new Date();
  const startOfWeek = getStartOfWeek(now);
  const endOfWeek = getEndOfWeek(now);
  const compareDate = new Date(date);
  
  return compareDate >= startOfWeek && compareDate <= endOfWeek;
};