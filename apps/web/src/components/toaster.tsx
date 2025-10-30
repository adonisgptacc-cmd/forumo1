import React from 'react';
import { clsx } from 'clsx';
import { useEffect, useState } from 'react';

export type ToastEventDetail = {
  id: number;
  message: string;
  type?: 'success' | 'error' | 'info';
};

export function Toaster() {
  const [toasts, setToasts] = useState<ToastEventDetail[]>([]);

  useEffect(() => {
    const handler = (event: Event) => {
      const detail = (event as CustomEvent<ToastEventDetail>).detail;
      if (!detail) return;
      setToasts((current) => [...current, detail]);
      setTimeout(() => {
        setToasts((current) => current.filter((toast) => toast.id !== detail.id));
      }, 3000);
    };

    window.addEventListener('forumo:toast', handler as EventListener);
    return () => window.removeEventListener('forumo:toast', handler as EventListener);
  }, []);

  if (toasts.length === 0) {
    return null;
  }

  return (
    <div className="fixed inset-x-0 top-4 z-50 flex flex-col items-center gap-3">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={clsx(
            'w-fit rounded-full border px-4 py-2 text-sm shadow-lg shadow-black/40 transition-all',
            toast.type === 'success' && 'border-emerald-500/60 bg-emerald-500/10 text-emerald-200',
            toast.type === 'error' && 'border-rose-500/60 bg-rose-500/10 text-rose-200',
            toast.type === 'info' && 'border-slate-700 bg-slate-900/90 text-slate-100',
          )}
        >
          {toast.message}
        </div>
      ))}
    </div>
  );
}
