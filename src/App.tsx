import React, { useState, useEffect, useRef, useCallback } from 'react';
import { EXAM_QUESTIONS, Question } from './data/questions';
import { Navbar } from './components/Navbar';
import { QuestionCard } from './components/QuestionCard';
import { QuestionPaletteModal } from './components/QuestionPaletteModal';
import { SecurityAlertModal } from './components/SecurityAlertModal';
import { SubmitConfirmModal } from './components/SubmitConfirmModal';
import { StartScreen } from './components/StartScreen';
import { ResultScreen } from './components/ResultScreen';
import {
  playViolationAlarm,
  playSuccessChime,
  enterFullscreen,
  isCurrentlyFullscreen,
} from './utils/security';
import {
  ExamSubmission,
  saveSubmissionLocally,
  sendSubmissionToGoogleSheet,
  getSavedSheetUrl,
} from './utils/googleSheets';
import {
  ChevronLeft,
  ChevronRight,
  Send,
  Ban
} from 'lucide-react';

const EXAM_DURATION_SECONDS = 75 * 60; // 75 minutes = 4500 seconds
const MAX_VIOLATIONS = 3;

export default function App() {
  // Screen state: 'start' | 'exam' | 'result'
  const [screen, setScreen] = useState<'start' | 'exam' | 'result'>('start');

  // Candidate Details
  const [studentName, setStudentName] = useState('');
  const [studentRoll, setStudentRoll] = useState('');
  const [sheetUrl, setSheetUrl] = useState('');

  // Exam Progress State (100 Questions)
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [timeLeft, setTimeLeft] = useState(EXAM_DURATION_SECONDS);

  // Security & Proctoring State
  const [violationsCount, setViolationsCount] = useState(0);
  const [securityModalOpen, setSecurityModalOpen] = useState(false);
  const [violationReason, setViolationReason] = useState('');

  // Modals
  const [paletteModalOpen, setPaletteModalOpen] = useState(false);
  const [submitConfirmModalOpen, setSubmitConfirmModalOpen] = useState(false);

  // Right-click "Not Allowed" toast notification
  const [showNotAllowedToast, setShowNotAllowedToast] = useState(false);
  const toastTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Completed Submission
  const [finalSubmission, setFinalSubmission] = useState<ExamSubmission | null>(null);

  // Ref to track latest state for event listeners without stale closures
  const stateRef = useRef({
    screen,
    violationsCount,
    timeLeft,
    userAnswers,
    studentName,
    studentRoll,
    sheetUrl,
    isSubmitting: false,
    lastViolationTime: 0,
  });

  useEffect(() => {
    stateRef.current = {
      screen,
      violationsCount,
      timeLeft,
      userAnswers,
      studentName,
      studentRoll,
      sheetUrl,
      isSubmitting: stateRef.current.isSubmitting,
      lastViolationTime: stateRef.current.lastViolationTime,
    };
  }, [screen, violationsCount, timeLeft, userAnswers, studentName, studentRoll, sheetUrl]);

  // Load saved sheet URL on mount
  useEffect(() => {
    const saved = getSavedSheetUrl();
    if (saved) setSheetUrl(saved);
  }, []);

  // Submit Exam handler
  const handleSubmitExam = useCallback(
    async (reason: string = 'Normal Candidate Submission') => {
      if (stateRef.current.isSubmitting) return;
      stateRef.current.isSubmitting = true;

      // Close all active modals
      setSecurityModalOpen(false);
      setPaletteModalOpen(false);
      setSubmitConfirmModalOpen(false);

      // Evaluate score out of 100
      let correctCount = 0;
      EXAM_QUESTIONS.forEach((q) => {
        const studentAns = (userAnswers[q.id] || '').trim();
        if (q.type === 'mcq') {
          if (studentAns.toUpperCase() === q.correctAnswer.toUpperCase()) {
            correctCount++;
          }
        } else if (q.type === 'truefalse') {
          if (studentAns.toUpperCase() === q.correctAnswer.toUpperCase()) {
            correctCount++;
          }
        } else if (q.type === 'fib') {
          if (studentAns.toLowerCase() === q.correctAnswer.toLowerCase()) {
            correctCount++;
          }
        }
      });

      const totalQuestions = EXAM_QUESTIONS.length;
      const percentage = Number(((correctCount / totalQuestions) * 100).toFixed(1));
      const timeSpentSeconds = Math.max(1, EXAM_DURATION_SECONDS - timeLeft);

      const submission: ExamSubmission = {
        id: `ICT-${Date.now().toString(36).toUpperCase()}-${Math.floor(Math.random() * 1000)}`,
        studentName: studentName || 'Candidate',
        studentRoll: studentRoll || 'N/A',
        totalCorrect: correctCount,
        totalQuestions,
        percentage,
        timeSpentSeconds,
        violationsCount,
        submissionReason: reason,
        submittedAt: new Date().toISOString(),
        answers: { ...userAnswers },
      };

      // 1. Save locally in browser storage
      saveSubmissionLocally(submission);

      // 2. Dispatch quietly to Google Sheet Webhook if URL configured
      if (sheetUrl && sheetUrl.trim()) {
        sendSubmissionToGoogleSheet(submission, sheetUrl).catch((err) =>
          console.warn('Google Sheet dispatch warning:', err)
        );
      }

      playSuccessChime();
      setFinalSubmission(submission);
      setScreen('result');

      // Exit fullscreen safely if still active
      if (document.fullscreenElement && document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
    },
    [userAnswers, timeLeft, studentName, studentRoll, sheetUrl, violationsCount]
  );

  // Security Infraction Recorder
  const registerViolation = useCallback(
    (reason: string) => {
      if (stateRef.current.screen !== 'exam' || stateRef.current.isSubmitting) return;

      // Debounce infractions within 1.5 seconds to avoid double-counting visibility + blur
      const now = Date.now();
      if (now - stateRef.current.lastViolationTime < 1500) {
        return;
      }
      stateRef.current.lastViolationTime = now;

      playViolationAlarm();

      setViolationsCount((prev) => {
        const next = prev + 1;
        setViolationReason(reason);
        setSecurityModalOpen(true);

        // Auto submit if reached maximum 3 strikes!
        if (next >= MAX_VIOLATIONS) {
          setTimeout(() => {
            handleSubmitExam(`Auto-Submitted: Reached ${MAX_VIOLATIONS} Security Violations (Cheating Prevention)`);
          }, 1200);
        }

        return next;
      });
    },
    [handleSubmitExam]
  );

  // 75-Minute Timer Countdown
  useEffect(() => {
    if (screen !== 'exam') return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitExam('Auto-Submitted: Time Expired (75 Minutes Ended)');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [screen, handleSubmitExam]);

  // Anti-Cheating System Listeners (Visibility change, Window blur, Shortcuts, Fullscreen)
  useEffect(() => {
    if (screen !== 'exam') return;

    // 1. Tab switch / Visibility change
    const handleVisibilityChange = () => {
      if (document.hidden) {
        registerViolation('Switched browser tab or minimized window');
      }
    };

    // 2. Screen switch / Window blur
    const handleWindowBlur = () => {
      registerViolation('Screen switch / clicked outside the examination window');
    };

    // 3. Fullscreen check
    const handleFullscreenChange = () => {
      if (!isCurrentlyFullscreen()) {
        registerViolation('Exited fullscreen proctored mode');
      }
    };

    // 4. Keyboard Shortcuts Lock (F12, DevTools, Copy, Paste, PrintScreen, etc.)
    const handleKeyDown = (e: KeyboardEvent) => {
      // Disallow F12
      if (e.key === 'F12') {
        e.preventDefault();
        registerViolation('Pressed F12 (Developer Tools access blocked)');
        return false;
      }

      // Disallow PrintScreen
      if (e.key === 'PrintScreen') {
        e.preventDefault();
        registerViolation('Attempted Screen Capture / PrintScreen');
        return false;
      }

      // Disallow Ctrl+Shift+I / J / C (Devtools)
      if (e.ctrlKey && e.shiftKey && ['I', 'J', 'C'].includes(e.key.toUpperCase())) {
        e.preventDefault();
        registerViolation('Attempted Developer Tools inspection');
        return false;
      }

      // Disallow Ctrl+U (View Source)
      if (e.ctrlKey && e.key.toUpperCase() === 'U') {
        e.preventDefault();
        registerViolation('Attempted View Source');
        return false;
      }

      // Disallow Ctrl+C, Ctrl+V, Ctrl+X, Ctrl+A (Copy/Paste/Cut/Select all text)
      if (e.ctrlKey && ['C', 'V', 'X', 'A'].includes(e.key.toUpperCase())) {
        const isTextInput =
          e.target instanceof HTMLInputElement && e.target.type === 'text';
        if (!isTextInput || e.key.toUpperCase() === 'C') {
          e.preventDefault();
          registerViolation(`Blocked unauthorized shortcut (Ctrl+${e.key.toUpperCase()})`);
          return false;
        }
      }

      // Disallow Alt combinations
      if (e.altKey && (e.key === 'Tab' || e.key === 'ArrowLeft' || e.key === 'ArrowRight')) {
        e.preventDefault();
        registerViolation('Attempted Application Switching (Alt combination)');
        return false;
      }

      // Disallow Windows / Meta key
      if (e.key === 'Meta' || e.key === 'OS') {
        registerViolation('Pressed Windows / Meta key');
        return false;
      }
    };

    // 5. Context Menu Prevention (Right click disable without strike, displays "Not Allowed")
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      // Right click is disabled but does NOT give a violation strike
      setShowNotAllowedToast(true);
      if (toastTimeoutRef.current) {
        clearTimeout(toastTimeoutRef.current);
      }
      toastTimeoutRef.current = setTimeout(() => {
        setShowNotAllowedToast(false);
      }, 1800);
      return false;
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', handleWindowBlur);
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('contextmenu', handleContextMenu);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('blur', handleWindowBlur);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('contextmenu', handleContextMenu);
    };
  }, [screen, registerViolation]);

  // Launch Exam from Start Screen
  const handleStartExam = async (name: string, roll: string, targetSheet: string) => {
    setStudentName(name);
    setStudentRoll(roll);
    if (targetSheet) setSheetUrl(targetSheet);

    // Request fullscreen immediately
    await enterFullscreen();

    // Reset test parameters
    setTimeLeft(EXAM_DURATION_SECONDS);
    setViolationsCount(0);
    setUserAnswers({});
    setCurrentIndex(0);
    stateRef.current.isSubmitting = false;

    setScreen('exam');
  };

  // Question navigation
  const currentQuestion: Question = EXAM_QUESTIONS[currentIndex] || EXAM_QUESTIONS[0];

  const handleSelectAnswer = (ans: string) => {
    setUserAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: ans,
    }));
  };

  const handleNext = () => {
    if (currentIndex < EXAM_QUESTIONS.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  // Stats calculation
  const totalAnswered = Object.keys(userAnswers).filter(
    (k) => userAnswers[Number(k)]?.trim()
  ).length;

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Screen 1: Start / Registration
  if (screen === 'start') {
    return (
      <StartScreen
        onStartExam={handleStartExam}
      />
    );
  }

  // Screen 3: Result Screen (SHOWS ONLY TOTAL CORRECT COUNT)
  if (screen === 'result' && finalSubmission) {
    return (
      <ResultScreen
        submission={finalSubmission}
        onTakeNewExam={() => setScreen('start')}
      />
    );
  }

  // Screen 2: Active Locked Exam
  return (
    <div className="min-h-screen bg-[#050814] text-slate-100 flex flex-col select-none">
      {/* Top Proctored Header */}
      <Navbar
        studentName={studentName}
        timeLeft={timeLeft}
        violationsCount={violationsCount}
        maxViolations={MAX_VIOLATIONS}
        totalAnswered={totalAnswered}
        totalQuestions={EXAM_QUESTIONS.length}
        onOpenPalette={() => setPaletteModalOpen(true)}
        onSubmitPrompt={() => setSubmitConfirmModalOpen(true)}
      />

      {/* Progress & Section Bar */}
      <div className="bg-[#080f24] border-b border-blue-950/70 px-4 py-2.5">
        <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
          {/* Section Jump Tabs for 100 Questions */}
          <div className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={() => setCurrentIndex(0)}
              className={`px-3 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                currentQuestion.section === 'A'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : 'bg-[#0f1b3a] text-slate-400 hover:text-slate-200'
              }`}
            >
              Sec A: MCQs (1-50)
            </button>
            <button
              onClick={() => setCurrentIndex(50)}
              className={`px-3 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                currentQuestion.section === 'B'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : 'bg-[#0f1b3a] text-slate-400 hover:text-slate-200'
              }`}
            >
              Sec B: True/False (51-90)
            </button>
            <button
              onClick={() => setCurrentIndex(90)}
              className={`px-3 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                currentQuestion.section === 'C'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : 'bg-[#0f1b3a] text-slate-400 hover:text-slate-200'
              }`}
            >
              Sec C: Blanks (91-100)
            </button>
          </div>

          {/* Answered Progress bar */}
          <div className="flex items-center gap-3">
            <span className="text-slate-400 font-mono text-[11px]">
              Answered: <strong className="text-blue-300">{totalAnswered}</strong> / {EXAM_QUESTIONS.length}
            </span>
            <div className="w-24 sm:w-36 h-2 rounded-full bg-[#111e3f] overflow-hidden border border-blue-900/50">
              <div
                className="h-full bg-gradient-to-r from-blue-600 to-cyan-400 rounded-full transition-all duration-300"
                style={{ width: `${(totalAnswered / EXAM_QUESTIONS.length) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Examination Question Area */}
      <main className="flex-1 max-w-5xl w-full mx-auto p-4 sm:p-6 flex flex-col justify-center">
        <QuestionCard
          question={currentQuestion}
          currentIndex={currentIndex}
          totalQuestions={EXAM_QUESTIONS.length}
          currentAnswer={userAnswers[currentQuestion.id]}
          allAnswers={userAnswers}
          onSelectAnswer={handleSelectAnswer}
        />
      </main>

      {/* Bottom Sticky Action Toolbar */}
      <footer className="sticky bottom-0 z-30 bg-[#070d1e]/95 backdrop-blur-md border-t border-blue-950/80 px-4 py-3">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-3">
          {/* Previous Question Button */}
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#0e1933] hover:bg-[#152549] text-slate-300 hover:text-white border border-blue-900/50 text-xs sm:text-sm font-semibold disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          {/* Next / Submit Button */}
          {currentIndex < EXAM_QUESTIONS.length - 1 ? (
            <button
              onClick={handleNext}
              className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-semibold shadow-lg shadow-blue-600/30 transition-all active:scale-95 cursor-pointer ml-auto"
            >
              <span>Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={() => setSubmitConfirmModalOpen(true)}
              className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs sm:text-sm font-bold shadow-lg shadow-emerald-600/30 transition-all active:scale-95 cursor-pointer ml-auto"
            >
              <Send className="w-4 h-4" />
              <span>Finish & Submit</span>
            </button>
          )}
        </div>
      </footer>

      {/* Right Click "Not Allowed" Screen Notification Toast */}
      {showNotAllowedToast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 animate-in fade-in zoom-in-95 duration-150 pointer-events-none">
          <div className="bg-rose-950/95 border-2 border-rose-500 text-white font-bold text-sm sm:text-base px-6 py-2.5 rounded-2xl shadow-2xl shadow-rose-900/60 flex items-center gap-2.5 backdrop-blur-md">
            <Ban className="w-5 h-5 text-rose-400 stroke-[2.5]" />
            <span className="tracking-wide">Not Allowed</span>
          </div>
        </div>
      )}

      {/* Security Violation Alert Modal */}
      <SecurityAlertModal
        isOpen={securityModalOpen}
        violationsCount={violationsCount}
        maxViolations={MAX_VIOLATIONS}
        violationReason={violationReason}
        onDismiss={() => setSecurityModalOpen(false)}
      />

      {/* Question Palette Modal */}
      <QuestionPaletteModal
        isOpen={paletteModalOpen}
        onClose={() => setPaletteModalOpen(false)}
        questions={EXAM_QUESTIONS}
        currentIndex={currentIndex}
        userAnswers={userAnswers}
        onSelectQuestion={(idx) => setCurrentIndex(idx)}
      />

      {/* Submit Confirmation Modal */}
      <SubmitConfirmModal
        isOpen={submitConfirmModalOpen}
        onClose={() => setSubmitConfirmModalOpen(false)}
        onConfirm={() => handleSubmitExam('Candidate Confirmed Submission')}
        totalQuestions={EXAM_QUESTIONS.length}
        totalAnswered={totalAnswered}
        timeRemaining={formatTime(timeLeft)}
      />
    </div>
  );
}
