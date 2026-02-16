
import React, { useState, useCallback } from 'react';
import { Layout } from './components/Layout';
import { ResultCard } from './components/ResultCard';
import { ContentNiche, AnalysisState } from './types';
import { analyzeVideoContent } from './services/gemini';

const App: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [niche, setNiche] = useState<ContentNiche>(ContentNiche.TECH_REVIEW);
  const [file, setFile] = useState<File | null>(null);
  const [analysis, setAnalysis] = useState<AnalysisState>({
    isAnalyzing: false,
    result: null,
    error: null,
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64 = reader.result?.toString().split(',')[1];
        if (base64) resolve(base64);
        else reject('Failed to convert file');
      };
      reader.onerror = error => reject(error);
    });
  };

  const runAnalysis = async () => {
    if (!prompt.trim()) {
      setAnalysis(prev => ({ ...prev, error: "Please describe your video content." }));
      return;
    }

    setAnalysis({ isAnalyzing: true, result: null, error: null });

    try {
      let imagePart;
      if (file) {
        const base64Data = await fileToBase64(file);
        imagePart = {
          inlineData: {
            data: base64Data,
            mimeType: file.type,
          }
        };
      }

      const result = await analyzeVideoContent(prompt, niche, imagePart);
      setAnalysis({ isAnalyzing: false, result, error: null });
    } catch (err: any) {
      setAnalysis({ 
        isAnalyzing: false, 
        result: null, 
        error: err.message || "An unexpected error occurred. Please try again." 
      });
    }
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-400">
            Go Viral on Android Tech
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Our AI analyzes your video frames or concepts to generate high-converting titles, tags, and SEO metadata specifically for the tech audience.
          </p>
        </div>

        <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="space-y-4">
              <label className="block text-sm font-semibold text-slate-300 uppercase tracking-wider">Video Concept or Script</label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="e.g., A review of the new Samsung Galaxy S25 Ultra focusing on battery life and gaming performance."
                className="w-full h-40 bg-slate-950 border border-slate-800 rounded-2xl p-4 text-slate-200 focus:ring-2 focus:ring-red-500/50 focus:border-red-500 outline-none transition-all placeholder:text-slate-600 resize-none"
              />
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-slate-300 uppercase tracking-wider mb-2">Content Niche</label>
                <select 
                  value={niche}
                  onChange={(e) => setNiche(e.target.value as ContentNiche)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200 focus:ring-2 focus:ring-red-500/50 focus:border-red-500 outline-none"
                >
                  {Object.values(ContentNiche).map((val) => (
                    <option key={val} value={val}>{val}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-300 uppercase tracking-wider mb-2">Analysis Ref (Optional)</label>
                <div className="relative group">
                  <input 
                    type="file" 
                    id="video-upload"
                    accept="image/*,video/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <label 
                    htmlFor="video-upload"
                    className="flex flex-col items-center justify-center w-full h-32 bg-slate-950 border-2 border-dashed border-slate-800 hover:border-slate-600 rounded-2xl cursor-pointer transition-all group-hover:bg-slate-900"
                  >
                    {file ? (
                      <div className="text-center px-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-green-500 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                        <p className="text-sm text-slate-300 font-medium truncate w-full max-w-[200px]">{file.name}</p>
                      </div>
                    ) : (
                      <>
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-slate-600 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                        <p className="text-sm text-slate-500">Upload screenshot or clip</p>
                      </>
                    )}
                  </label>
                </div>
              </div>
            </div>
          </div>

          <button 
            onClick={runAnalysis}
            disabled={analysis.isAnalyzing}
            className="w-full py-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-2xl text-lg font-bold shadow-lg shadow-red-900/20 transition-all transform active:scale-[0.98] flex items-center justify-center gap-3"
          >
            {analysis.isAnalyzing ? (
              <>
                <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                Analyzing Insights...
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                Generate Viral Metadata
              </>
            )}
          </button>

          {analysis.error && (
            <div className="mt-4 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" /></svg>
              <p className="text-sm font-medium">{analysis.error}</p>
            </div>
          )}
        </div>

        {analysis.result && <ResultCard data={analysis.result} />}
      </div>
    </Layout>
  );
};

export default App;
