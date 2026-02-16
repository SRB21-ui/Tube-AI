
import React from 'react';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
      <header className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 p-4 shadow-xl">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center shadow-lg shadow-red-600/20">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 8-6 4 6 4V8Z"/><rect width="14" height="12" x="2" y="6" rx="2" ry="2"/></svg>
            </div>
            <h1 className="text-xl font-bold tracking-tight">ViralTube <span className="text-green-500">Android</span></h1>
          </div>
          <nav className="hidden md:flex gap-6 text-sm font-medium text-slate-400">
            <a href="#" className="hover:text-white transition-colors">Analyzer</a>
            <a href="#" className="hover:text-white transition-colors">History</a>
            <a href="#" className="hover:text-white transition-colors">SEO Guide</a>
          </nav>
        </div>
      </header>

      <main className="flex-1 max-w-6xl mx-auto w-full p-4 md:p-8">
        {children}
      </main>

      <footer className="bg-slate-900 border-t border-slate-800 p-8 text-center text-slate-500">
        <p>&copy; 2024 ViralTube AI. Optimized for Creators & Developers.</p>
      </footer>
    </div>
  );
};
