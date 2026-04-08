import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  startOfWeek,
  endOfWeek,
  isSameMonth,
  isWeekend as dateFnsIsWeekend,
  format,
  isSameDay,
  isWithinInterval,
  isAfter,
  isBefore,
  addMonths,
  subMonths,
} from 'date-fns';

export const generateCalendarDays = (currentMonth) => {
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart, { weekStartsOn: 1 });
  const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });

  return eachDayOfInterval({ start: startDate, end: endDate }).map((date) => ({
    date,
    isCurrentMonth: isSameMonth(date, currentMonth),
    isWeekend: dateFnsIsWeekend(date),
  }));
};

export const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export const isDateInRange = (date, start, end) => {
  if (!start || !end) return false;
  return isWithinInterval(date, { start, end });
};

export const formatDateKey = (date) => format(date, 'yyyy-MM-dd');

export {
  format,
  isSameDay,
  isWithinInterval,
  isAfter,
  isBefore,
  addMonths,
  subMonths,
  isSameMonth,
};