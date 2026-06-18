import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PagerProps {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
}

export function Pager({ page, totalPages, onChange }: PagerProps) {
  return (
    <div className="flex items-center gap-1">
      <button
        onClick={() => onChange(Math.max(0, page - 1))}
        disabled={page === 0}
        className="p-1 rounded border border-stone-200 hover:bg-stone-100 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      {Array.from({ length: totalPages }).map((_, i) => (
        <button
          key={i}
          onClick={() => onChange(i)}
          className={`w-8 h-8 rounded text-sm font-medium transition-colors ${
            page === i ? 'bg-amber-500 text-white' : 'border border-stone-200 hover:bg-stone-100'
          }`}
        >
          {i + 1}
        </button>
      ))}

      <button
        onClick={() => onChange(Math.min(totalPages - 1, page + 1))}
        disabled={page === totalPages - 1}
        className="p-1 rounded border border-stone-200 hover:bg-stone-100 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}
