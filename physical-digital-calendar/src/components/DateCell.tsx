import { motion } from 'framer-motion';

interface DateCellProps {
  date: Date;
  isCurrentMonth: boolean;
  isStart: boolean;
  isEnd: boolean;
  isInRange: boolean;
  isWeekend: boolean;
  isToday: boolean;
  onClick: (date: Date) => void;
  onHover: (date: Date | null) => void;
}

export default function DateCell({
  date,
  isCurrentMonth,
  isStart,
  isEnd,
  isInRange,
  isWeekend,
  isToday,
  onClick,
  onHover,
}: DateCellProps) {
  const isSingleDay = isStart && isEnd;
  const showBar = !isSingleDay;

  const dayNum = date.getDate();

  let textColor = '';
  if (!isCurrentMonth) {
    textColor = 'text-gray-300';
  } else if (isStart || isEnd) {
    textColor = 'text-white';
  } else if (isWeekend) {
    textColor = 'text-blue-500';
  } else {
    textColor = 'text-gray-700';
  }

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ height: '40px' }}
      onClick={() => onClick(date)}
      onMouseEnter={() => onHover(date)}
      onMouseLeave={() => onHover(null)}
    >
      {showBar && isInRange && !isStart && !isEnd && (
        <div className="absolute inset-y-1.5 left-0 right-0 bg-blue-50 rounded-none" />
      )}
      {showBar && isStart && !isEnd && (
        <div className="absolute inset-y-1.5 left-1/2 right-0 bg-blue-50" />
      )}
      {showBar && isEnd && !isStart && (
        <div className="absolute inset-y-1.5 left-0 right-1/2 bg-blue-50" />
      )}

      <motion.div
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className={[
          'relative z-10 w-8 h-8 flex items-center justify-center rounded-full text-sm font-medium cursor-pointer select-none transition-colors duration-150',
          isStart || isEnd ? 'bg-blue-600 shadow-md shadow-blue-300' : '',
          !isStart && !isEnd && isCurrentMonth ? 'hover:bg-blue-100' : '',
          isToday && !isStart && !isEnd ? 'ring-1 ring-blue-400 ring-offset-1' : '',
          textColor,
        ].join(' ')}
      >
        {dayNum}
      </motion.div>
    </div>
  );
}
