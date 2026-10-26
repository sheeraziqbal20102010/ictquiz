import React from 'react';
import {
  ShieldAlert,
  Clock,
  FileSpreadsheet,
  Lock,
  Play,
  AlertTriangle,
  Award,
  Layers
} from 'lucide-react';
import { getSavedSheetUrl, saveSheetUrl } from '../utils/googleSheets';

interface StartScreenProps {
  onStartExam: (studentName: string, rollNumber: string, sheetUrl: string) => void;
}

export const StartScreen: React.FC<StartScreenProps> = ({
  onStartExam,
}) => {
  const [studentName, setStudentName] = React.useState('');
  const [rollNumber, setRollNumber] = React.useState('');
  const [sheetUrl, setSheetUrl] = React.useState('');
  const [error, setError] = React.useState('');
  const [agreedToTerms, setAgreedToTerms] = React.useState(false);

  React.useEffect(() => {
    // Pre-populate saved Google Sheet target URL from browser localStorage
    const saved = getSavedSheetUrl();
    if (saved) {
      setSheetUrl(saved);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName.trim()) {
      setError('Please enter your full name before beginning.');
      return;
    }
    if (!agreedToTerms) {
      setError('You must accept the proctored exam conditions and anti-cheating policy.');
      return;
    }

    // Save Google Sheet URL to browser localStorage if provided
    if (sheetUrl.trim()) {
      saveSheetUrl(sheetUrl.trim());
    }

    setError('');
    onStartExam(studentName.trim(), rollNumber.trim(), sheetUrl.trim());
  };

  return (
    <div className="min-h-screen bg-[#040714] text-slate-100 flex flex-col justify-between p-4 sm:p-6 md:p-8">
      {/* Background ambient lighting */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 -right-40 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 left-1/3 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-4xl mx-auto w-full space-y-8 my-auto py-6">
        {/* Main Branding Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/70 border border-blue-800/60 text-xs font-semibold text-blue-300 shadow-inner">
            <Lock className="w-3.5 h-3.5 text-blue-400" />
            <span>Strictly Proctored Assessment Environment</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
            ICT Questionier
          </h1>

          <p className="text-slate-400 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed">
            Hardware, System Software, Operating Systems, Number Systems, Relational Model, Keys, SQL Dialects, and Queries.
          </p>
        </div>

        {/* 3 Pillars Overview Banner */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="bg-[#0b1328]/80 border border-blue-900/50 rounded-2xl p-4 flex items-center gap-3.5 shadow-lg shadow-black/20">
            <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold block">Time Limit</span>
              <span className="text-base font-bold text-white font-mono">75 Minutes</span>
            </div>
          </div>

          <div className="bg-[#0b1328]/80 border border-blue-900/50 rounded-2xl p-4 flex items-center gap-3.5 shadow-lg shadow-black/20">
            <div className="w-10 h-10 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold block">Total Questions</span>
              <span className="text-base font-bold text-white font-mono">100 Questions</span>
            </div>
          </div>

          <div className="bg-[#0b1328]/80 border border-rose-900/40 rounded-2xl p-4 flex items-center gap-3.5 shadow-lg shadow-black/20">
            <div className="w-10 h-10 rounded-xl bg-rose-600/20 border border-rose-500/30 flex items-center justify-center text-rose-400">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold block">Anti-Cheat Lock</span>
              <span className="text-base font-bold text-rose-300 font-mono">3 Strikes Policy</span>
            </div>
          </div>
        </div>

        {/* Exam Structure & Instructions Card */}
        <div className="bg-[#091024]/90 border border-blue-900/50 rounded-2xl p-5 sm:p-6 space-y-4">
          <h2 className="text-sm font-bold text-blue-200 uppercase tracking-wider flex items-center gap-2">
            <Award className="w-4 h-4 text-cyan-400" />
            <span>Examination Blueprint & Sections</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            <div className="bg-[#070c1d] p-3.5 rounded-xl border border-blue-950 space-y-1">
              <div className="flex items-center justify-between text-blue-400 font-bold">
                <span>Section A: MCQs</span>
                <span className="font-mono text-white">50 Questions</span>
              </div>
              <p className="text-slate-400 text-[11px] leading-snug">
                Questions 1 to 50. Single best choice (A, B, C, D). Press A/B/C/D on keyboard to answer.
              </p>
            </div>

            <div className="bg-[#070c1d] p-3.5 rounded-xl border border-blue-950 space-y-1">
              <div className="flex items-center justify-between text-indigo-400 font-bold">
                <span>Section B: True / False</span>
                <span className="font-mono text-white">40 Questions</span>
              </div>
              <p className="text-slate-400 text-[11px] leading-snug">
                Questions 51 to 90. Conceptual evaluation. Press T for True or F for False.
              </p>
            </div>

            <div className="bg-[#070c1d] p-3.5 rounded-xl border border-blue-950 space-y-1">
              <div className="flex items-center justify-between text-cyan-400 font-bold">
                <span>Section C: Fill in Blanks</span>
                <span className="font-mono text-white">10 Questions</span>
              </div>
              <p className="text-slate-400 text-[11px] leading-snug">
                Questions 91 to 100. Select words directly from the interactive 25-word pool or type.
              </p>
            </div>
          </div>

          {/* Strict Security Rules Warning */}
          <div className="bg-rose-950/20 border border-rose-800/40 rounded-xl p-4 text-xs space-y-2">
            <div className="flex items-center gap-2 font-bold text-rose-300 uppercase tracking-wide">
              <AlertTriangle className="w-4 h-4 text-rose-400" />
              <span>Mandatory Anti-Cheating & Lockdown Rules:</span>
            </div>
            <ul className="list-disc list-inside space-y-1 text-slate-300 text-[11px] leading-relaxed">
              <li>
                <strong>No Screen Switching or Tab Changes:</strong> Switching tabs, pressing Alt+Tab, or minimizing your browser window is strictly logged.
              </li>
              <li>
                <strong>Automatic Termination on Strike 3:</strong> You are granted a maximum of 2 warnings. On the <span className="text-rose-400 font-bold">3rd violation strike</span>, your exam will be automatically locked and submitted.
              </li>
              <li>
                <strong>Continuous Fullscreen Required:</strong> Exiting fullscreen triggers an immediate proctor alert.
              </li>
              <li>
                <strong>Right Click & Shortcuts Blocked:</strong> Copying, pasting, context menus, and developer tools inspection are permanently disabled.
              </li>
            </ul>
          </div>
        </div>

        {/* Registration & Configuration Form */}
        <form onSubmit={handleSubmit} className="bg-[#0b1328] border border-blue-800/60 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
          <div className="border-b border-blue-950 pb-4">
            <h2 className="text-lg font-bold text-white">Candidate Details & Result Sheet Link</h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Enter your credentials. Results will be saved locally on this browser and synced to the instructor's Google Sheet.
            </p>
          </div>

          {error && (
            <div className="p-3.5 rounded-xl bg-rose-950/50 border border-rose-700/60 text-rose-300 text-xs font-medium flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Student Name */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Candidate Full Name <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                required
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                placeholder="e.g. Muhammad Ali"
                className="w-full bg-[#070d1e] border border-blue-900/70 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
              />
            </div>

            {/* Roll Number / Student ID */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Roll Number / Student ID <span className="text-slate-500 font-normal">(Optional)</span>
              </label>
              <input
                type="text"
                value={rollNumber}
                onChange={(e) => setRollNumber(e.target.value)}
                placeholder="e.g. CS-2024-089"
                className="w-full bg-[#070d1e] border border-blue-900/70 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
              />
            </div>
          </div>

          {/* Google Sheet URL */}
          <div className="bg-[#070c1d] border border-blue-900/50 rounded-2xl p-4 sm:p-5 space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-blue-300 uppercase tracking-wider flex items-center gap-2">
                <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
                <span>Instructor Google Sheet / Apps Script Webhook URL</span>
              </label>
              <span className="text-[10px] text-emerald-400 font-mono bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-900/60">
                Saves in browser
              </span>
            </div>

            <p className="text-[11px] text-slate-400 leading-snug">
              Student results and submitted answers will automatically be posted to this target sheet and stored in this browser's archive.
            </p>

            <input
              type="url"
              value={sheetUrl}
              onChange={(e) => setSheetUrl(e.target.value)}
              placeholder="https://script.google.com/macros/s/.../exec or https://docs.google.com/spreadsheets/d/..."
              className="w-full bg-[#0b1328] border border-blue-800/60 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 font-mono focus:outline-none focus:border-blue-400"
            />
          </div>

          {/* Acknowledge proctored policy checkbox */}
          <label className="flex items-start gap-3 p-3.5 rounded-xl bg-[#070d1e] border border-blue-950 cursor-pointer group">
            <input
              type="checkbox"
              checked={agreedToTerms}
              onChange={(e) => setAgreedToTerms(e.target.checked)}
              className="mt-0.5 w-4 h-4 rounded border-blue-800 bg-[#0c152e] text-blue-600 focus:ring-blue-500"
            />
            <span className="text-xs text-slate-300 leading-relaxed group-hover:text-white">
              I acknowledge that this exam is locked and proctored. Exiting fullscreen or switching windows 3 times will automatically submit my test. I agree to uphold academic honesty.
            </span>
          </label>

          {/* Submit & Start Action - Examiner Portal button removed */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 hover:from-blue-500 hover:via-indigo-500 hover:to-blue-400 text-white font-bold text-sm sm:text-base shadow-xl shadow-blue-600/30 flex items-center justify-center gap-2.5 transition-all active:scale-95 cursor-pointer"
            >
              <Play className="w-5 h-5 fill-white" />
              <span>Launch Exam in Fullscreen (75 Mins)</span>
            </button>
          </div>
        </form>

        {/* Footer */}
        <div className="text-center text-xs text-slate-500 font-mono">
          Strictly Proctored Examination Engine • All Candidate Activity Monitored
        </div>
      </div>
    </div>
  );
};
