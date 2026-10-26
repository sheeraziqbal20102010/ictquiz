import React from 'react';
import { Question } from '../data/questions';
import { Check, X, Sparkles, RotateCcw, CheckCircle2 } from 'lucide-react';

interface QuestionCardProps {
  question: Question;
  currentIndex: number;
  totalQuestions: number;
  currentAnswer: string | undefined;
  allAnswers: Record<number, string>;
  onSelectAnswer: (ans: string) => void;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  currentIndex,
  totalQuestions,
  currentAnswer,
  allAnswers,
  onSelectAnswer,
}) => {
  // Support hotkeys for MCQs and True/False
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't capture when typing in an input text field
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      const key = e.key.toUpperCase();
      if (question.type === 'mcq') {
        if (['A', 'B', 'C', 'D'].includes(key)) {
          onSelectAnswer(key);
        } else if (key === '1') onSelectAnswer('A');
        else if (key === '2') onSelectAnswer('B');
        else if (key === '3') onSelectAnswer('C');
        else if (key === '4') onSelectAnswer('D');
      } else if (question.type === 'truefalse') {
        if (key === 'T' || key === '1') onSelectAnswer('T');
        if (key === 'F' || key === '2') onSelectAnswer('F');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [question, onSelectAnswer]);

  // Track which words have been selected across all fill in the blank questions (Q91 to Q100)
  const usedWordsMap = React.useMemo(() => {
    const map = new Map<string, number>();
    for (let qId = 91; qId <= 100; qId++) {
      const ans = allAnswers[qId]?.trim().toLowerCase();
      if (ans) {
        map.set(ans, qId);
      }
    }
    return map;
  }, [allAnswers]);

  return (
    <div className="bg-[#0b1224] border border-blue-900/40 rounded-2xl shadow-xl shadow-black/40 overflow-hidden transition-all duration-300">
      {/* Top Question Header */}
      <div className="bg-[#0e1730] border-b border-blue-950 px-5 py-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-950 text-blue-400 border border-blue-800/60 uppercase tracking-wide">
            {question.sectionTitle}
          </span>
          <span className="text-sm font-mono text-slate-400">
            Question <span className="text-white font-bold">{currentIndex + 1}</span> of{' '}
            <span className="text-white font-bold">{totalQuestions}</span>
          </span>
        </div>
      </div>

      {/* Main Question Body */}
      <div className="p-5 sm:p-7 space-y-6">
        {/* Question Prompt */}
        <div className="text-base sm:text-lg md:text-xl font-medium text-slate-100 leading-relaxed">
          {question.type === 'fib' ? (
            <div>
              {renderFibPrompt(question.prompt, currentAnswer)}
            </div>
          ) : (
            question.prompt
          )}
        </div>

        {/* Interaction Area based on Question Type */}
        {question.type === 'mcq' && question.options && (
          <div className="space-y-3 pt-2">
            {question.options.map((opt) => {
              const isSelected = currentAnswer === opt.key;
              return (
                <button
                  key={opt.key}
                  type="button"
                  onClick={() => onSelectAnswer(opt.key)}
                  className={`w-full text-left p-4 rounded-xl border transition-all duration-200 flex items-start gap-4 group cursor-pointer ${
                    isSelected
                      ? 'bg-blue-950/60 border-blue-500 shadow-lg shadow-blue-900/20 ring-1 ring-blue-500'
                      : 'bg-[#0f1933]/70 border-blue-900/30 hover:border-blue-700/60 hover:bg-[#121e3d]'
                  }`}
                >
                  <div
                    className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm transition-colors ${
                      isSelected
                        ? 'bg-blue-600 text-white shadow-md shadow-blue-500/40'
                        : 'bg-[#18274a] text-blue-300 group-hover:bg-blue-900/80 group-hover:text-white'
                    }`}
                  >
                    {opt.key}
                  </div>
                  <div className="flex-1 pt-1 text-sm sm:text-base text-slate-200 group-hover:text-white">
                    {opt.label}
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {question.type === 'truefalse' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3">
            <button
              type="button"
              onClick={() => onSelectAnswer('T')}
              className={`p-6 rounded-2xl border text-center transition-all duration-200 cursor-pointer flex flex-col items-center justify-center gap-3 ${
                currentAnswer === 'T'
                  ? 'bg-blue-950/70 border-blue-500 shadow-lg shadow-blue-900/30 ring-2 ring-blue-500 text-white'
                  : 'bg-[#0f1933]/70 border-blue-900/30 hover:border-blue-700/60 hover:bg-[#121e3d] text-slate-300'
              }`}
            >
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  currentAnswer === 'T' ? 'bg-blue-600 text-white' : 'bg-[#18274a] text-emerald-400'
                }`}
              >
                <Check className="w-6 h-6 stroke-[3]" />
              </div>
              <div>
                <span className="text-xl font-bold tracking-wide">TRUE</span>
                <p className="text-xs text-slate-400 mt-0.5">Press 'T' or click</p>
              </div>
            </button>

            <button
              type="button"
              onClick={() => onSelectAnswer('F')}
              className={`p-6 rounded-2xl border text-center transition-all duration-200 cursor-pointer flex flex-col items-center justify-center gap-3 ${
                currentAnswer === 'F'
                  ? 'bg-blue-950/70 border-blue-500 shadow-lg shadow-blue-900/30 ring-2 ring-blue-500 text-white'
                  : 'bg-[#0f1933]/70 border-blue-900/30 hover:border-blue-700/60 hover:bg-[#121e3d] text-slate-300'
              }`}
            >
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  currentAnswer === 'F' ? 'bg-blue-600 text-white' : 'bg-[#18274a] text-rose-400'
                }`}
              >
                <X className="w-6 h-6 stroke-[3]" />
              </div>
              <div>
                <span className="text-xl font-bold tracking-wide">FALSE</span>
                <p className="text-xs text-slate-400 mt-0.5">Press 'F' or click</p>
              </div>
            </button>
          </div>
        )}

        {question.type === 'fib' && (
          <div className="space-y-6 pt-2">
            {/* Answer Display / Input field */}
            <div className="bg-[#070d1e] p-4 rounded-xl border border-blue-900/40 flex flex-wrap items-center justify-between gap-3">
              <div className="flex-1 min-w-[240px]">
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                  Your Answer for Blank Q{question.id}:
                </label>
                <input
                  type="text"
                  value={currentAnswer || ''}
                  onChange={(e) => onSelectAnswer(e.target.value)}
                  placeholder="Type word or click option from pool below..."
                  className="w-full bg-[#0c152b] border border-blue-800/60 rounded-lg px-3.5 py-2 text-white font-mono placeholder-slate-500 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-colors"
                />
              </div>

              {currentAnswer && (
                <button
                  onClick={() => onSelectAnswer('')}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-xs font-medium transition-colors cursor-pointer"
                  title="Clear choice"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Clear</span>
                </button>
              )}
            </div>

            {/* Word Pool Chips with Progressive Highlight for all selected options */}
            {question.wordPool && (
              <div className="bg-[#0a1122]/90 border border-blue-950 rounded-xl p-4 sm:p-5 space-y-3.5">
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-1.5 font-bold text-blue-300">
                    <Sparkles className="w-4 h-4 text-cyan-400" />
                    <span>Word Pool (Click any word to insert into blank):</span>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] font-mono">
                    <span className="px-2 py-0.5 rounded bg-cyan-950/70 border border-cyan-800/60 text-cyan-300">
                      Used: <strong>{usedWordsMap.size}</strong>/10
                    </span>
                    <span className="text-slate-400">
                      Available: {question.wordPool.length - usedWordsMap.size}
                    </span>
                  </div>
                </div>

                {/* Legend indicator */}
                <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-400 pt-0.5 border-t border-blue-950/70">
                  <div className="flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded bg-blue-600 ring-1 ring-blue-400"></span>
                    <span>Current Selection</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded bg-cyan-900 border border-cyan-400"></span>
                    <span className="text-cyan-300 font-medium">Used in Blank (Highlighted)</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded bg-[#101b38] border border-blue-900/50"></span>
                    <span>Unused</span>
                  </div>
                </div>

                {/* Chips Grid */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {question.wordPool.map((word) => {
                    const wordLower = word.toLowerCase();
                    const isCurrent = currentAnswer?.trim().toLowerCase() === wordLower;
                    const usedInQId = usedWordsMap.get(wordLower);
                    const isUsedInAnother = usedInQId !== undefined && usedInQId !== question.id;

                    let chipStyle = 'bg-[#101b38] border-blue-900/40 text-blue-200 hover:bg-blue-950 hover:border-blue-600 hover:text-white';

                    if (isCurrent) {
                      // Active choice for current blank
                      chipStyle = 'bg-blue-600 border-blue-300 text-white shadow-lg shadow-blue-600/40 ring-2 ring-blue-400 font-bold scale-105';
                    } else if (isUsedInAnother) {
                      // HIGHLIGHTED for all used options right through the end
                      chipStyle = 'bg-cyan-950/90 border-cyan-400/90 text-cyan-200 shadow-md shadow-cyan-950/40 ring-1 ring-cyan-500/70 hover:bg-cyan-900 hover:text-white';
                    }

                    return (
                      <button
                        key={word}
                        type="button"
                        onClick={() => onSelectAnswer(word)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium border transition-all cursor-pointer flex items-center gap-1.5 ${chipStyle}`}
                        title={
                          isCurrent
                            ? 'Selected for this blank'
                            : isUsedInAnother
                            ? `Used in Blank Q${usedInQId}. Click to reassign here.`
                            : 'Click to select for this blank'
                        }
                      >
                        <span>{word}</span>

                        {isCurrent && (
                          <CheckCircle2 className="w-3.5 h-3.5 text-white stroke-[2.5]" />
                        )}

                        {isUsedInAnother && !isCurrent && (
                          <span className="px-1.5 py-0.2 rounded text-[10px] font-sans font-bold bg-cyan-900/80 text-cyan-200 border border-cyan-600/60">
                            Q{usedInQId}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// Helper to highlight the blank in the sentence
function renderFibPrompt(prompt: string, answer?: string) {
  const blankRegex = /_{3,}/g;
  const parts = prompt.split(blankRegex);

  if (parts.length <= 1) return prompt;

  return (
    <span>
      {parts[0]}
      <span
        className={`inline-flex items-center px-3 py-0.5 mx-1.5 rounded border font-mono font-semibold transition-all ${
          answer && answer.trim()
            ? 'bg-blue-900/70 border-blue-400 text-cyan-300 shadow-sm shadow-blue-500/20'
            : 'bg-blue-950/40 border-dashed border-blue-700/60 text-slate-400 min-w-[120px] justify-center'
        }`}
      >
        {answer && answer.trim() ? answer : '______ [blank] ______'}
      </span>
      {parts[1]}
    </span>
  );
}
