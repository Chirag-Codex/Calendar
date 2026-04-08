import { AnimatePresence, motion } from 'framer-motion';
import DateCell from './DateCell';

interface CalendarGridProps {
  currentDate: Date;
  startDate: Date | null;
  endDate: Date | null;
  hoverDate: Date | null;
  onDayClick: (date: Date) => void;
  onDayHover: (date: Date | null) => void;
  direction: number;
}

const DAY_LABELS = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

function isSameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();
}

function toMidnight(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

function generateCalendarDays(date: Date): Date[] {
  const year = date.getFullYear();
  const month = date.getMonth();

  const firstOfMonth = new Date(year, month, 1);
  let startDow = firstOfMonth.getDay();
  startDow = startDow === 0 ? 6 : startDow - 1;

  const days: Date[] = [];
  for (let i = startDow; i > 0; i--) {
    days.push(new Date(year, month, 1 - i));
  }

  const lastOfMonth = new Date(year, month + 1, 0);
  for (let d = 1; d <= lastOfMonth.getDate(); d++) {
    days.push(new Date(year, month, d));
  }

  const remaining = 42 - days.length;
  for (let i = 1; i <= remaining; i++) {
    days.push(new Date(year, month + 1, i));
  }

  return days;
}

export default function CalendarGrid({
  currentDate,
  startDate,
  endDate,
  hoverDate,
  onDayClick,
  onDayHover,
  direction,
}: CalendarGridProps) {
  const days = generateCalendarDays(currentDate);
  const today = toMidnight(new Date());

  const effectiveEnd = endDate ?? hoverDate;

  const rangeStart = startDate && effectiveEnd
    ? toMidnight(startDate) <= toMidnight(effectiveEnd)
      ? toMidnight(startDate)
      : toMidnight(effectiveEnd)
    : startDate ? toMidnight(startDate) : null;

  const rangeEnd = startDate && effectiveEnd
    ? toMidnight(startDate) <= toMidnight(effectiveEnd)
      ? toMidnight(effectiveEnd)
      : toMidnight(startDate)
    : null;

  return (
    <div className="px-4 pb-4 pt-0">
      <div className="grid grid-cols-7 mb-1">
        {DAY_LABELS.map((label, i) => (
          <div
            key={label}
            className={[
              'text-center text-[10px] font-bold tracking-widest py-1 uppercase',
              i >= 5 ? 'text-blue-400' : 'text-gray-400',
            ].join(' ')}
          >
            {label}
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait" initial={false} custom={direction}>
        <motion.div
          key={`${currentDate.getFullYear()}-${currentDate.getMonth()}`}
          custom={direction}
          variants={{
            enter: (dir: number) => ({ x: dir > 0 ? 40 : -40, opacity: 0 }),
            center: { x: 0, opacity: 1 },
            exit: (dir: number) => ({ x: dir > 0 ? -40 : 40, opacity: 0 }),
          }}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.25, ease: 'easeInOut' }}
          className="grid grid-cols-7"
        >
          {days.map((day, idx) => {
            const d = toMidnight(day);
            const isCurrentMonth = day.getMonth() === currentDate.getMonth();
            const isStart = !!(startDate && isSameDay(d, toMidnight(startDate)));
            const isEnd = !!(endDate && isSameDay(d, toMidnight(endDate)));
            const isInRange = !!(rangeStart && rangeEnd && d >= rangeStart && d <= rangeEnd);
            const dow = day.getDay();
            const isWeekend = dow === 0 || dow === 6;
            const isTodayDay = isSameDay(d, today);

            return (
              <DateCell
                key={idx}
                date={day}
                isCurrentMonth={isCurrentMonth}
                isStart={isStart}
                isEnd={isEnd}
                isInRange={isInRange}
                isWeekend={isWeekend}
                isToday={isTodayDay}
                onClick={onDayClick}
                onHover={onDayHover}
              />
            );
          })}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
