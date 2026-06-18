interface ProgressBarProps {
  value: number;
  color?: string;
  bg?: string;
}

export function ProgressBar({ value, color = 'hsl(35, 85%, 55%)', bg = 'bg-stone-100' }: ProgressBarProps) {
  return (
    <div className={`h-1.5 rounded-full w-full overflow-hidden ${bg}`}>
      <div
        className="h-full rounded-full transition-all"
        style={{ width: `${value}%`, backgroundColor: color }}
      />
    </div>
  );
}
