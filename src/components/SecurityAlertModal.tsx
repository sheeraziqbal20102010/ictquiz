import React from 'react';
import { ShieldAlert, AlertTriangle, Maximize2 } from 'lucide-react';
import { enterFullscreen } from '../utils/security';

interface SecurityAlertModalProps {
  isOpen: boolean;
  violationsCount: number;
  maxViolations: number;
  violationReason: string;
  onDismiss: () => void;
}

export const SecurityAlertModal: React.FC<SecurityAlertModalProps> = ({
  isOpen,
  violationsCount,
  maxViolations,
  violationReason,
  onDismiss,
}) => {
  if (!isOpen) return null;

  const isFinalStrike = violationsCount >= maxViolations;
  const strikesRemaining = Math.max(0, maxViolations - violationsCount);

  const handleReturn = async () => {
    await enterFullscreen();
    onDismiss();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#100810] border-2 border-rose-600/80 rounded-2xl w-full max-w-lg shadow-[0_0_50px_rgba(225,29,72,0.35)] overflow-hidden">
        {/* Top Warning Banner */}
        <div className="bg-gradient-to-r from-rose-950 via-rose-900 to-rose-950 p-6 border-b border-rose-800/60 text-center">
          <div className="w-16 h-16 rounded-2xl bg-rose-600/20 border-2 border-rose-500/80 mx-auto flex items-center justify-center mb-3 animate-pulse">
            <ShieldAlert className="w-10 h-10 text-rose-500" />
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight uppercase">
            Security Violation Detected
          </h2>
          <p className="text-rose-200 text-xs mt-1 font-medium">
            Proctoring & Anti-Cheating Monitor Alert
          </p>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5 text-center">
          {/* Reason Box */}
          <div className="bg-rose-950/40 border border-rose-800/50 rounded-xl p-3.5 text-rose-200 text-sm">
            <div className="flex items-center justify-center gap-2 font-semibold text-rose-300 mb-1">
              <AlertTriangle className="w-4 h-4 text-rose-400" />
              <span>Infraction Detail:</span>
            </div>
            <p className="font-mono text-xs text-rose-100">{violationReason}</p>
          </div>

          {/* Strikes Counter Indicator */}
          <div className="bg-[#160d1b] border border-rose-900/60 rounded-xl p-4">
            <div className="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-2">
              Proctor Strike Level
            </div>
            <div className="flex justify-center items-center gap-3">
              {[1, 2, 3].map((num) => (
                <div
                  key={num}
                  className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-base border-2 transition-all ${
                    num <= violationsCount
                      ? 'bg-rose-600 border-rose-400 text-white shadow-lg shadow-rose-600/40'
                      : 'bg-[#221028] border-slate-700 text-slate-500'
                  }`}
                >
                  {num}
                </div>
              ))}
            </div>
            <p className="text-xs mt-3 text-slate-300 font-medium">
              {isFinalStrike ? (
                <span className="text-rose-400 font-bold">
                  Strike 3 reached! Examination is being automatically submitted.
                </span>
              ) : (
                <>
                  Strike <strong className="text-rose-400">{violationsCount}</strong> of{' '}
                  <strong className="text-white">{maxViolations}</strong>. You have{' '}
                  <strong className="text-amber-400">{strikesRemaining}</strong> warning(s) left before permanent auto-submission.
                </>
              )}
            </p>
          </div>

          {/* Action button */}
          {!isFinalStrike ? (
            <button
              onClick={handleReturn}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-rose-600 to-indigo-600 hover:from-rose-500 hover:to-indigo-500 text-white font-semibold text-sm shadow-lg shadow-rose-900/40 flex items-center justify-center gap-2 transition-all active:scale-95"
            >
              <Maximize2 className="w-4 h-4" />
              <span>Acknowledge & Return to Fullscreen</span>
            </button>
          ) : (
            <div className="py-2 text-xs text-rose-300 animate-pulse font-mono">
              Finalizing security lock and auto-submitting answers...
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
