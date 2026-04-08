import { useState } from 'react';
import { isSameDay, isBefore } from 'date-fns';

export const useCalendarRange = () => {
  const [range, setRange] = useState({ start: null, end: null });
  const [hoverDate, setHoverDate] = useState(null);

  const handleDateClick = (day) => {
    // Reset if clicking the same start date or if range is already complete
    if (range.start && isSameDay(day, range.start) && !range.end) {
      setRange({ start: null, end: null });
      return;
    }

    if (!range.start || (range.start && range.end)) {
      setRange({ start: day, end: null });
    } else {
      // If user selects a date BEFORE the start date, swap them
      if (isBefore(day, range.start)) {
        setRange({ start: day, end: range.start });
      } else {
        setRange({ ...range, end: day });
      }
    }
  };

  return { range, hoverDate, setHoverDate, handleDateClick };
};