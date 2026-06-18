import { CheckCircle2 } from 'lucide-react';

interface ToastProps {
  message?: string;
}

export function Toast({ message }: ToastProps) {
  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 bg-stone-900 text-white px-4 py-3 rounded-lg flex items-center gap-3 shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-300">
      <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
      <span className="text-sm font-medium">{message}</span>
    </div>
  );
}
