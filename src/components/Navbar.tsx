import React from 'react';
import { ShieldCheck, ShieldAlert, Clock, Grid } from 'lucide-react';

interface NavbarProps {
  studentName?: string;
  timeLeft: number; // in seconds
  violationsCount: number;
  maxViolations: number;
  totalAnswered: number;
  totalQuestions: number;
  onOpenPalette: () => void;
  onSubmitPrompt: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  studentName,
  timeLeft,
  violationsCount,
  maxViolations,
  totalAnswered,
  totalQuestions,
  onOpenPalette,
  onSubmitPrompt,
}) => {
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const isTimeCritical = timeLeft < 300; // less than 5 mins
  const isTimeWarning = timeLeft < 900 && !isTimeCritical; // less than 15 mins

  return (
    <header className="sticky top-0 z-40 bg-[#070d1e]/90 backdrop-blur-md border-b border-blue-950/70 px-4 py-3 select-none">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Brand & Student Badge */}
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-700 shadow-lg shadow-blue-600/30 border border-blue-400/30">
            <span className="font-bold text-white tracking-wider text-sm">ICT</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-sm sm:text-base font-bold text-slate-100 tracking-tight">
                ICT Questionier
              </h1>
              <span className="hidden md:inline-flex px-2 py-0.5 rounded text-[11px] font-medium bg-blue-950 text-blue-300 border border-blue-800/60">
                PROCTORED
              </span>
            </div>
            {studentName && (
              <p className="text-xs text-slate-400 truncate max-w-[200px] sm:max-w-xs">
                Candidate: <span className="text-blue-300 font-semibold">{studentName}</span>
              </p>
            )}
          </div>
        </div>

        {/* Center: Timer & Strike Indicator */}
        <div className="flex items-center gap-2 sm:gap-4 order-3 sm:order-2 w-full sm:w-auto justify-between sm:justify-center">
          {/* 75 Min Timer */}
          <div
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border font-mono transition-all duration-300 ${
              isTimeCritical
                ? 'bg-red-950/60 border-red-500/80 shadow-[0_0_15px_rgba(239,68,68,0.3)] ring-1 ring-red-500/50 animate-pulse'
                : isTimeWarning
                ? 'bg-amber-950/40 border-amber-600/60 text-amber-300'
                : 'bg-[#0b1429] border-blue-800/40 text-blue-200'
            }`}
          >
            <Clock className={`w-4 h-4 ${isTimeCritical ? 'text-red-500' : 'text-blue-400'}`} />
            <div className="flex flex-col items-start leading-none">
              <span className={`text-[10px] uppercase font-sans tracking-wider font-semibold ${isTimeCritical ? 'text-red-400' : 'text-slate-400'}`}>
                Time Left
              </span>
              <span className={`text-sm sm:text-base font-bold tracking-wider ${isTimeCritical ? 'text-red-500' : 'text-white'}`}>
                {formatTime(timeLeft)}
              </span>
            </div>
          </div>

          {/* Security / Strikes badge */}
          <div
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
              violationsCount === 0
                ? 'bg-emerald-950/30 border-emerald-800/40 text-emerald-300'
                : violationsCount === 1
                ? 'bg-amber-950/40 border-amber-700/50 text-amber-300'
                : 'bg-rose-950/60 border-rose-600/70 text-rose-300 animate-bounce'
            }`}
          >
            {violationsCount === 0 ? (
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
            ) : (
              <ShieldAlert className="w-4 h-4 text-rose-400" />
            )}
            <div className="flex flex-col leading-none">
              <span className="text-[10px] uppercase text-slate-400 tracking-wider">Security</span>
              <span className="font-semibold">
                Strike {violationsCount}/{maxViolations}
              </span>
            </div>
          </div>
        </div>

        {/* Right Action Controls */}
        <div className="flex items-center gap-2 order-2 sm:order-3">
          {/* Question Palette Trigger */}
          <button
            onClick={onOpenPalette}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#0e1933] hover:bg-[#152549] text-slate-200 hover:text-white border border-blue-900/50 transition-colors text-xs font-medium cursor-pointer"
            title="View Questions Grid"
          >
            <Grid className="w-3.5 h-3.5 text-blue-400" />
            <span className="hidden sm:inline">Palette</span>
            <span className="text-[11px] px-1.5 py-0.2 rounded bg-blue-900/60 text-blue-200 font-mono">
              {totalAnswered}/{totalQuestions}
            </span>
          </button>

          {/* Finish Exam Button */}
          <button
            onClick={onSubmitPrompt}
            className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-medium text-xs sm:text-sm shadow-md shadow-blue-600/20 transition-all active:scale-95 cursor-pointer"
          >
            Submit Exam
          </button>
        </div>
      </div>
    </header>
  );
};
