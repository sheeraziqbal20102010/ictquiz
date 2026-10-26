import React from 'react';
import { ExamSubmission } from '../utils/googleSheets';
import {
  ShieldCheck,
  ShieldAlert,
  Clock,
  Award,
  Hash,
  RotateCcw
} from 'lucide-react';

interface ResultScreenProps {
  submission: ExamSubmission;
  onTakeNewExam: () => void;
}

export const ResultScreen: React.FC<ResultScreenProps> = ({
  submission,
  onTakeNewExam,
}) => {
  const formatDuration = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins}m ${secs.toString().padStart(2, '0')}s`;
  };

  const isPassing = submission.percentage >= 50;

  return (
    <div className="min-h-screen bg-[#050814] text-slate-100 flex flex-col justify-center items-center p-4 sm:p-6 py-12">
      <div className="w-full max-w-2xl space-y-6">
        {/* Main Score Card */}
        <div className="bg-[#0b1328] border border-blue-900/60 rounded-3xl shadow-2xl shadow-blue-950/40 overflow-hidden">
          {/* Header Banner */}
          <div className="bg-gradient-to-r from-blue-950 via-indigo-950 to-blue-900 border-b border-blue-800/40 p-6 sm:p-8 text-center relative">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-600/20 border border-blue-400/40 mb-3 shadow-lg shadow-blue-500/20">
              <Award className="w-9 h-9 text-blue-400" />
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              ICT Questionier Completed
            </h1>
            <p className="text-blue-200 text-xs sm:text-sm mt-1">
              Your examination has been evaluated and recorded.
            </p>

            <div className="inline-flex items-center gap-1.5 mt-3 px-3 py-1 rounded-full bg-blue-900/40 border border-blue-600/30 text-xs text-blue-300 font-mono">
              <Hash className="w-3.5 h-3.5" />
              <span>Submission ID: {submission.id}</span>
            </div>
          </div>

          {/* Core Score Display (SHOWS ONLY TOTAL CORRECT COUNT) */}
          <div className="p-6 sm:p-8 space-y-6">
            {/* Student Info Bar */}
            <div className="bg-[#070d1e] rounded-2xl p-4 border border-blue-950 flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="text-[11px] uppercase tracking-wider text-slate-400 font-medium block">Candidate Name</span>
                <span className="text-base sm:text-lg font-bold text-white">{submission.studentName}</span>
              </div>
              {submission.studentRoll && (
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-slate-400 font-medium block">Roll / Student ID</span>
                  <span className="text-sm sm:text-base font-semibold font-mono text-blue-300">{submission.studentRoll}</span>
                </div>
              )}
              <div>
                <span className="text-[11px] uppercase tracking-wider text-slate-400 font-medium block">Status</span>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded border ${
                  submission.submissionReason.includes('Violations') || submission.submissionReason.includes('Strikes')
                    ? 'bg-rose-950 border-rose-700 text-rose-300'
                    : 'bg-emerald-950 border-emerald-800 text-emerald-300'
                }`}>
                  {submission.submissionReason}
                </span>
              </div>
            </div>

            {/* Total Correct Score Highlight */}
            <div className="relative overflow-hidden bg-gradient-to-b from-[#0e1b3d] to-[#091126] border-2 border-blue-600/60 rounded-3xl p-6 sm:p-8 text-center shadow-xl shadow-blue-900/20">
              <span className="text-xs uppercase tracking-widest text-blue-300 font-bold">
                Total Correct Answers
              </span>

              <div className="my-3 flex items-baseline justify-center gap-2">
                <span className="text-6xl sm:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-400 font-mono tracking-tight">
                  {submission.totalCorrect}
                </span>
                <span className="text-2xl sm:text-3xl font-bold text-slate-400 font-mono">
                  / {submission.totalQuestions}
                </span>
              </div>

              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-950/80 border border-blue-700/50 text-blue-200 text-sm font-semibold">
                <span>Score: <strong className="text-white font-mono">{submission.percentage}%</strong></span>
                <span className="text-blue-500">•</span>
                <span className={isPassing ? 'text-emerald-400' : 'text-amber-400'}>
                  {isPassing ? 'Passed' : 'Completed'}
                </span>
              </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="bg-[#070d1e] p-4 rounded-xl border border-blue-950 text-center">
                <span className="text-[11px] uppercase text-slate-400 font-medium block">Time Taken</span>
                <span className="text-base font-bold font-mono text-cyan-300 flex items-center justify-center gap-1 mt-1">
                  <Clock className="w-4 h-4 text-cyan-400" />
                  {formatDuration(submission.timeSpentSeconds)}
                </span>
              </div>

              <div className="bg-[#070d1e] p-4 rounded-xl border border-blue-950 text-center">
                <span className="text-[11px] uppercase text-slate-400 font-medium block">Violations Log</span>
                <span className={`text-base font-bold font-mono flex items-center justify-center gap-1 mt-1 ${
                  submission.violationsCount === 0 ? 'text-emerald-400' : 'text-rose-400'
                }`}>
                  {submission.violationsCount === 0 ? (
                    <>
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      0 Strikes
                    </>
                  ) : (
                    <>
                      <ShieldAlert className="w-4 h-4 text-rose-400" />
                      {submission.violationsCount} Strikes
                    </>
                  )}
                </span>
              </div>

              <div className="col-span-2 sm:col-span-1 bg-[#070d1e] p-4 rounded-xl border border-blue-950 text-center">
                <span className="text-[11px] uppercase text-slate-400 font-medium block">Attempted</span>
                <span className="text-base font-bold font-mono text-slate-200 mt-1 block">
                  {Object.keys(submission.answers).filter(k => submission.answers[Number(k)]?.trim()).length} / {submission.totalQuestions}
                </span>
              </div>
            </div>

            {/* Action button */}
            <div className="pt-2">
              <button
                onClick={onTakeNewExam}
                className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Start New Candidate Exam</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
