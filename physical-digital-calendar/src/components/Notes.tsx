import { useEffect, useRef, useState } from 'react';
import { BookOpen, RotateCcw } from 'lucide-react';

interface NotesProps {
  startDate: Date | null;
  endDate: Date | null;
  storageKey: string;
}

const LINE_HEIGHT_REM = 2.25;
const LINE_HEIGHT_PX = LINE_HEIGHT_REM * 16;

function formatRange(start: Date | null, end: Date | null): string {
  const fmt = (d: Date) =>
    d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  if (!start) return 'No date selected';
  if (!end || end.toDateString() === start.toDateString()) return fmt(start);
  return `${fmt(start)} – ${fmt(end)}`;
}

export default function Notes({ startDate, endDate, storageKey }: NotesProps) {
  const [text, setText] = useState<string>('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved !== null) setText(saved);
  }, [storageKey]);

  useEffect(() => {
    localStorage.setItem(storageKey, text);
  }, [text, storageKey]);

  const handleClear = () => {
    setText('');
    textareaRef.current?.focus();
  };

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="px-5 pt-5 pb-3 border-b border-gray-100">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <BookOpen size={15} className="text-gray-400" />
            <span className="text-[11px] font-bold uppercase tracking-widest text-gray-400">
              Notes
            </span>
          </div>
          <button
            onClick={handleClear}
            className="text-gray-300 hover:text-gray-500 transition-colors"
            title="Clear notes"
          >
            <RotateCcw size={13} />
          </button>
        </div>
        <p className="text-[11px] text-blue-500 font-medium truncate">
          {formatRange(startDate, endDate)}
        </p>
      </div>

      <div className="relative flex-1 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(transparent calc(${LINE_HEIGHT_PX}px - 1px), #e5e7eb calc(${LINE_HEIGHT_PX}px - 1px))`,
            backgroundSize: `100% ${LINE_HEIGHT_PX}px`,
            backgroundPosition: '0 0',
          }}
        />

        <div
          className="absolute top-0 left-5 bottom-0 w-px pointer-events-none"
          style={{ backgroundColor: '#fca5a5', opacity: 0.5 }}
        />

        <textarea
          ref={textareaRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write your notes here..."
          className="absolute inset-0 w-full h-full resize-none bg-transparent border-none outline-none text-gray-700 text-sm pl-8 pr-4 pt-1 font-medium placeholder:text-gray-300 leading-[2.25rem]"
          style={{
            lineHeight: `${LINE_HEIGHT_PX}px`,
            caretColor: '#3b82f6',
          }}
          spellCheck={false}
        />
      </div>

      <div className="px-5 py-2 border-t border-gray-100">
        <p className="text-[10px] text-gray-300 text-right">
          {text.length > 0 ? `${text.length} chars · auto-saved` : 'Start typing...'}
        </p>
      </div>
    </div>
  );
}
