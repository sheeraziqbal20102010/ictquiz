import React from 'react';
import { AlertCircle, CheckCircle2, X } from 'lucide-react';

interface SubmitConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  totalQuestions: number;
  totalAnswered: number;
  timeRemaining: string;
}

export const SubmitConfirmModal: React.FC<SubmitConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  totalQuestions,
  totalAnswered,
  timeRemaining,
}) => {
  if (!isOpen) return null;

  const unanswered = totalQuestions - totalAnswered;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#0b1328] border border-blue-800/60 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-[#0e1933] border-b border-blue-950 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-blue-400" />
            <h3 className="text-base font-bold text-white">Submit Examination?</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <p className="text-sm text-slate-300">
            Please review your exam status before final submission:
          </p>

          <div className="grid grid-cols-3 gap-2.5">
            <div className="bg-[#070d1e] p-3 rounded-xl border border-blue-950 text-center">
              <span className="text-[10px] uppercase text-slate-400 block font-medium">Answered</span>
              <span className="text-lg font-bold font-mono text-emerald-400">
                {totalAnswered}
              </span>
            </div>

            <div className="bg-[#070d1e] p-3 rounded-xl border border-blue-950 text-center">
              <span className="text-[10px] uppercase text-slate-400 block font-medium">Unanswered</span>
              <span className={`text-lg font-bold font-mono ${unanswered > 0 ? 'text-amber-400' : 'text-slate-400'}`}>
                {unanswered}
              </span>
            </div>

            <div className="bg-[#070d1e] p-3 rounded-xl border border-blue-950 text-center">
              <span className="text-[10px] uppercase text-slate-400 block font-medium">Time Left</span>
              <span className="text-lg font-bold font-mono text-cyan-300">{timeRemaining}</span>
            </div>
          </div>

          {unanswered > 0 && (
            <div className="p-3 rounded-lg bg-amber-950/40 border border-amber-800/40 text-amber-200 text-xs">
              ⚠️ You still have <strong className="font-semibold">{unanswered} unanswered</strong> question(s).
            </div>
          )}

          <p className="text-xs text-slate-400 leading-relaxed">
            Note: Once submitted, your answers will be securely transferred to the instructor's Google Sheet and your total correct score count will be shown.
          </p>

          {/* Action buttons */}
          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={onClose}
              className="flex-1 py-2.5 px-4 rounded-xl bg-[#14203d] hover:bg-[#1a2b52] text-slate-300 hover:text-white text-xs font-semibold border border-blue-900/50 transition-colors cursor-pointer"
            >
              Back to Exam
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-semibold shadow-lg shadow-blue-600/30 transition-all active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Confirm & Submit</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
