// src/hooks/useCalendar.js
import { useState, useMemo } from "react";
import {
  startOfMonth, endOfMonth,
  startOfWeek, endOfWeek,
  eachDayOfInterval,
  isBefore
} from "date-fns";

export const useCalendar = () => {
  const [viewDate, setViewDate] = useState(new Date());
  const [range, setRange] = useState({ start: null, end: null });
  const [hoverDate, setHoverDate] = useState(null);

  const days = useMemo(() => {
    const start = startOfWeek(startOfMonth(viewDate), { weekStartsOn: 1 });
    const end = endOfWeek(endOfMonth(viewDate), { weekStartsOn: 1 });
    return eachDayOfInterval({ start, end });
  }, [viewDate]);

  const handleSelect = (date) => {
    if (!range.start || range.end) {
      setRange({ start: date, end: null });
    } else {
      if (isBefore(date, range.start)) {
        setRange({ start: date, end: range.start });
      } else {
        setRange({ ...range, end: date });
      }
    }
  };

  return {
    viewDate,
    setViewDate,
    days,
    range,
    hoverDate,
    setHoverDate,
    handleSelect,
  };
};