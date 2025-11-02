import React from 'react';
import { Outlet } from 'react-router-dom';
import { Toaster } from '../components/toaster.tsx';

export function RootLayout() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <header className="border-b border-slate-800 bg-slate-900/70 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <span className="text-xl font-semibold text-brand">Forumo</span>
          <nav className="flex items-center gap-4 text-sm text-slate-300">
            <a className="hover:text-white" href="#features">
              Features
            </a>
            <a className="hover:text-white" href="#roadmap">
              Roadmap
            </a>
            <a className="rounded-full bg-brand px-4 py-2 font-medium text-brand-foreground" href="#join">
              Join waitlist
            </a>
          </nav>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
      <Toaster />
    </div>
  );
}
