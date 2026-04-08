import { createContext, useContext } from "react";

export const CalendarContext = createContext(null);

export const useCalendarContext = () => {
  const ctx = useContext(CalendarContext);
  if (!ctx) {
    throw new Error("useCalendarContext must be used inside a CalendarContext.Provider");
  }
  return ctx;
};
