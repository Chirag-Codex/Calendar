// src/utils/dateHelpers.js
import {
  isSameDay,
  isWithinInterval,
  isSameMonth
} from "date-fns";

export const getDayState = (day, viewDate, range, hoverDate) => {
  const isStart = range.start && isSameDay(day, range.start);
  const isEnd = range.end && isSameDay(day, range.end);

  const isBetween =
    range.start &&
    (range.end || hoverDate) &&
    isWithinInterval(day, {
      start: range.start,
      end: range.end || hoverDate,
    });

  const isCurrentMonth = isSameMonth(day, viewDate);

  return {
    isStart,
    isEnd,
    isBetween,
    isCurrentMonth,
  };
};