import { useState } from 'react';
import Hero from './Hero';
import CalendarGrid from './CalendarGrid';
import Notes from './Notes';

const BINDING_COUNT = 18;

function SpiralBinding() {
  return (
    <div className="flex items-center justify-center gap-[11px] px-6 py-2 bg-zinc-900 rounded-t-2xl">
      {Array.from({ length: BINDING_COUNT }).map((_, i) => (
        <div
          key={i}
          className="bg-zinc-400 rounded-full shadow-inner"
          style={{
            width: '7px',
            height: '20px',
            background: 'linear-gradient(135deg, #a1a1aa 0%, #71717a 40%, #52525b 100%)',
            boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.5), 0 1px 1px rgba(255,255,255,0.1)',
          }}
        />
      ))}
    </div>
  );
}

function toMidnight(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

export default function WallCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [hoverDate, setHoverDate] = useState<Date | null>(null);
  const [selectionStep, setSelectionStep] = useState<0 | 1>(0);
  const [direction, setDirection] = useState(0);

  const storageKey = `wall-calendar-notes-${currentDate.getFullYear()}-${currentDate.getMonth()}`;

  const handlePrevMonth = () => {
    setDirection(-1);
    setCurrentDate((d) => new Date(d.getFullYear(), d.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setDirection(1);
    setCurrentDate((d) => new Date(d.getFullYear(), d.getMonth() + 1, 1));
  };

  const handleDayClick = (date: Date) => {
    const d = toMidnight(date);
    if (selectionStep === 0) {
      setStartDate(d);
      setEndDate(null);
      setSelectionStep(1);
    } else {
      const s = startDate!;
      if (d < s) {
        setStartDate(d);
        setEndDate(s);
      } else {
        setEndDate(d);
      }
      setSelectionStep(0);
      setHoverDate(null);
    }
  };

  const handleDayHover = (date: Date | null) => {
    if (selectionStep === 1) setHoverDate(date);
  };

  return (
    <div
      className="w-full max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-2xl"
      style={{ border: '1px solid #e4e4e7' }}
    >
      <SpiralBinding />

      <div className="flex flex-col md:flex-row bg-white">
        <aside className="md:w-56 lg:w-64 md:border-r border-b md:border-b-0 border-gray-100 md:min-h-[520px]">
          <Notes
            startDate={startDate}
            endDate={endDate}
            storageKey={storageKey}
          />
        </aside>

        <main className="flex-1 flex flex-col">
          <Hero
            currentDate={currentDate}
            onPrevMonth={handlePrevMonth}
            onNextMonth={handleNextMonth}
          />

          {selectionStep === 1 && (
            <div className="mx-4 mt-1 mb-0 py-1.5 px-3 bg-blue-50 rounded-lg border border-blue-100 text-xs text-blue-600 font-medium">
              Now click a second date to complete your selection
            </div>
          )}

          {startDate && endDate && (
            <div className="mx-4 mt-1 mb-0 py-1.5 px-3 bg-green-50 rounded-lg border border-green-100 flex items-center justify-between">
              <span className="text-xs text-green-700 font-medium">
                {startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                {' – '}
                {endDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </span>
              <button
                onClick={() => { setStartDate(null); setEndDate(null); setSelectionStep(0); }}
                className="text-xs text-green-500 hover:text-green-700 underline ml-2"
              >
                Clear
              </button>
            </div>
          )}

          <div className="flex-1 overflow-x-auto">
            <div className="min-w-[320px]">
              <CalendarGrid
                currentDate={currentDate}
                startDate={startDate}
                endDate={endDate}
                hoverDate={hoverDate}
                onDayClick={handleDayClick}
                onDayHover={handleDayHover}
                direction={direction}
              />
            </div>
          </div>

          <div className="px-4 pb-4 pt-1 border-t border-gray-50 flex items-center justify-between text-[10px] text-gray-300 font-medium uppercase tracking-widest">
            <span>Wall Calendar</span>
            <span>Click to select · Drag to range</span>
          </div>
        </main>
      </div>
    </div>
  );
}
