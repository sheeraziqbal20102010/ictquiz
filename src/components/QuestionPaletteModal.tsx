import React from 'react';
import { Question } from '../data/questions';
import { X } from 'lucide-react';

interface QuestionPaletteModalProps {
  isOpen: boolean;
  onClose: () => void;
  questions: Question[];
  currentIndex: number;
  userAnswers: Record<number, string>;
  onSelectQuestion: (index: number) => void;
}

export const QuestionPaletteModal: React.FC<QuestionPaletteModalProps> = ({
  isOpen,
  onClose,
  questions,
  currentIndex,
  userAnswers,
  onSelectQuestion,
}) => {
  const [activeFilter, setActiveFilter] = React.useState<'ALL' | 'A' | 'B' | 'C'>('ALL');

  if (!isOpen) return null;

  const filteredQuestions = questions.filter((q) => {
    if (activeFilter === 'ALL') return true;
    return q.section === activeFilter;
  });

  const totalAnswered = questions.filter((q) => userAnswers[q.id]?.trim()).length;
  const totalUnanswered = questions.length - totalAnswered;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#0b1328] border border-blue-900/60 rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-[#0e1933] border-b border-blue-950 px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span>Question Palette</span>
              <span className="text-xs px-2 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-800/50">
                100 Questions
              </span>
            </h2>
            <p className="text-xs text-slate-400">Click any number to jump directly to that question</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-blue-900/40 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Legend & Stats */}
        <div className="px-6 py-3 bg-[#080d1c] border-b border-blue-950/60 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-1.5">
              <span className="w-3.5 h-3.5 rounded bg-blue-600 border border-blue-400"></span>
              <span className="text-slate-300">Answered: <strong className="text-white font-mono">{totalAnswered}</strong></span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3.5 h-3.5 rounded bg-[#16213e] border border-blue-950"></span>
              <span className="text-slate-300">Unanswered: <strong className="text-white font-mono">{totalUnanswered}</strong></span>
            </div>
          </div>

          {/* Section Filter Pills */}
          <div className="flex items-center gap-1 bg-[#0f1b38] p-1 rounded-lg border border-blue-900/40">
            {(['ALL', 'A', 'B', 'C'] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-2.5 py-1 rounded text-xs font-semibold transition-colors cursor-pointer ${
                  activeFilter === filter
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {filter === 'ALL' ? 'All (100)' : filter === 'A' ? 'Sec A (1-50)' : filter === 'B' ? 'Sec B (51-90)' : 'Sec C (91-100)'}
              </button>
            ))}
          </div>
        </div>

        {/* Grid of 100 Questions */}
        <div className="p-6 overflow-y-auto flex-1">
          <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 gap-2.5">
            {filteredQuestions.map((q) => {
              const qIndex = q.id - 1;
              const isCurrent = qIndex === currentIndex;
              const hasAnswer = Boolean(userAnswers[q.id]?.trim());

              const btnStyle = hasAnswer
                ? 'bg-blue-600 text-white border-blue-400 shadow-md shadow-blue-600/20'
                : 'bg-[#121c38] text-slate-300 border-blue-950 hover:border-blue-700';

              return (
                <button
                  key={q.id}
                  onClick={() => {
                    onSelectQuestion(qIndex);
                    onClose();
                  }}
                  className={`h-11 rounded-xl border flex flex-col items-center justify-center font-mono font-bold text-sm relative transition-all group cursor-pointer ${btnStyle} ${
                    isCurrent ? 'ring-2 ring-white ring-offset-2 ring-offset-[#0b1328] scale-105' : ''
                  }`}
                >
                  <span>{q.id}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-[#0e1933] border-t border-blue-950 px-6 py-3 flex items-center justify-between">
          <span className="text-xs text-slate-400">Currently viewing Question {currentIndex + 1}</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs transition-colors cursor-pointer"
          >
            Close Palette
          </button>
        </div>
      </div>
    </div>
  );
};
