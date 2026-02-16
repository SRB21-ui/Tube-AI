
import React, { useState } from 'react';
import { VideoMetadata } from '../types';

interface ResultCardProps {
  data: VideoMetadata;
}

export const ResultCard: React.FC<ResultCardProps> = ({ data }) => {
  const [copiedIndex, setCopiedIndex] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(id);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Titles Section */}
        <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl">
          <div className="flex items-center gap-2 mb-4">
             <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
               <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
             </div>
             <h2 className="text-lg font-bold">Viral Title Suggestions</h2>
          </div>
          <div className="space-y-3">
            {data.titles.map((title, i) => (
              <div key={i} className="group relative bg-slate-800/50 hover:bg-slate-800 border border-slate-700 p-3 rounded-xl transition-all">
                <p className="pr-10 text-sm md:text-base font-medium text-slate-200">{title}</p>
                <button 
                  onClick={() => copyToClipboard(title, `title-${i}`)}
                  className="absolute top-2 right-2 p-1.5 opacity-0 group-hover:opacity-100 hover:bg-slate-600 rounded-md transition-all"
                >
                  {copiedIndex === `title-${i}` ? (
                    <span className="text-xs text-green-400 font-bold">Copied!</span>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" /></svg>
                  )}
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Upload Timing & Audience */}
        <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-4">
               <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                 <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
               </div>
               <h2 className="text-lg font-bold">Best Upload Time</h2>
            </div>
            <div className="bg-green-500/10 border border-green-500/20 p-4 rounded-2xl text-center mb-6">
              <p className="text-2xl font-bold text-green-400">{data.bestTime}</p>
              <p className="text-xs text-green-500/70 mt-1 uppercase tracking-widest font-bold">Optimized for Android Active Hours</p>
            </div>
            
            <div className="flex items-center gap-2 mb-3">
               <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center">
                 <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
               </div>
               <h2 className="text-lg font-bold">Target Audience</h2>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">{data.targetAudience}</p>
          </div>
          
          <div className="mt-6 pt-6 border-t border-slate-800">
             <h3 className="text-sm font-semibold text-slate-500 mb-3">Engagement Strategy</h3>
             <ul className="space-y-2">
               {data.engagementTips.map((tip, i) => (
                 <li key={i} className="flex gap-2 text-xs text-slate-300">
                   <span className="text-green-500">•</span>
                   {tip}
                 </li>
               ))}
             </ul>
          </div>
        </section>
      </div>

      {/* Description Section */}
      <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
             <div className="w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center">
               <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
             </div>
             <h2 className="text-lg font-bold">SEO-Optimized Description</h2>
          </div>
          <button 
            onClick={() => copyToClipboard(data.description, 'description')}
            className="text-xs flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors"
          >
            {copiedIndex === 'description' ? (
              <span className="text-green-400">Copied!</span>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" /></svg>
                Copy All
              </>
            )}
          </button>
        </div>
        <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-800 max-h-64 overflow-y-auto custom-scrollbar">
          <pre className="text-xs md:text-sm text-slate-300 whitespace-pre-wrap font-sans leading-relaxed">{data.description}</pre>
        </div>
      </section>

      {/* Hashtags Section */}
      <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl">
        <div className="flex items-center gap-2 mb-4">
           <div className="w-8 h-8 rounded-full bg-pink-500/20 flex items-center justify-center">
             <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" /></svg>
           </div>
           <h2 className="text-lg font-bold">Trending Hashtags</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {data.hashtags.map((tag, i) => (
            <button 
              key={i} 
              onClick={() => copyToClipboard(tag, `tag-${i}`)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all border ${
                copiedIndex === `tag-${i}` 
                  ? 'bg-green-500/20 border-green-500 text-green-400' 
                  : 'bg-slate-800 border-slate-700 text-slate-300 hover:border-slate-500'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </section>
    </div>
  );
};
