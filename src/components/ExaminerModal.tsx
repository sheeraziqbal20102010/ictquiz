import React from 'react';
import {
  ExamSubmission,
  getAllSubmissions,
  getSavedSheetUrl,
  saveSheetUrl,
  formatSubmissionsForGoogleSheetCopy,
  exportSubmissionsCSV,
  APPS_SCRIPT_TEMPLATE,
  SUBMISSIONS_LOG_KEY,
} from '../utils/googleSheets';
import {
  X,
  FileSpreadsheet,
  Download,
  Copy,
  Check,
  Code,
  Save,
  Trash2,
  ExternalLink,
  ShieldAlert,
  Info
} from 'lucide-react';

interface ExaminerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUrlUpdated?: (newUrl: string) => void;
}

export const ExaminerModal: React.FC<ExaminerModalProps> = ({
  isOpen,
  onClose,
  onUrlUpdated,
}) => {
  const [sheetUrl, setSheetUrl] = React.useState('');
  const [submissions, setSubmissions] = React.useState<ExamSubmission[]>([]);
  const [copiedAppsScript, setCopiedAppsScript] = React.useState(false);
  const [copiedSheetTsv, setCopiedSheetTsv] = React.useState(false);
  const [saveSuccess, setSaveSuccess] = React.useState(false);
  const [showScriptGuide, setShowScriptGuide] = React.useState(false);

  React.useEffect(() => {
    if (isOpen) {
      setSheetUrl(getSavedSheetUrl());
      setSubmissions(getAllSubmissions());
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSaveUrl = () => {
    saveSheetUrl(sheetUrl);
    if (onUrlUpdated) onUrlUpdated(sheetUrl);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const handleCopyAppsScript = () => {
    navigator.clipboard.writeText(APPS_SCRIPT_TEMPLATE);
    setCopiedAppsScript(true);
    setTimeout(() => setCopiedAppsScript(false), 2500);
  };

  const handleCopyTsv = () => {
    const tsv = formatSubmissionsForGoogleSheetCopy(submissions);
    navigator.clipboard.writeText(tsv);
    setCopiedSheetTsv(true);
    setTimeout(() => setCopiedSheetTsv(false), 2500);
  };

  const handleExportCsv = () => {
    exportSubmissionsCSV(submissions);
  };

  const handleClearRecords = () => {
    if (window.confirm('Are you sure you want to delete all stored submission records from this browser?')) {
      localStorage.removeItem(SUBMISSIONS_LOG_KEY);
      setSubmissions([]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#0b1328] border border-blue-900/60 rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-[#0e1933] border-b border-blue-950 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-blue-900/30 text-blue-400">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white">Examiner Results & Google Sheet Portal</h2>
              <p className="text-xs text-slate-400">Manage result destination, view candidate history, and export data</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-blue-900/40 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* Section 1: Google Sheet Destination Configuration */}
          <div className="bg-[#080e21] border border-blue-950 rounded-2xl p-5 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
                <h3 className="text-sm font-bold text-white uppercase tracking-wide">
                  Google Sheet Result Target URL
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowScriptGuide(!showScriptGuide)}
                className="text-xs text-blue-400 hover:text-blue-300 font-medium flex items-center gap-1"
              >
                <Code className="w-3.5 h-3.5" />
                <span>{showScriptGuide ? 'Hide Apps Script Guide' : 'How to connect any Google Sheet (30s setup)'}</span>
              </button>
            </div>

            <p className="text-xs text-slate-400">
              Paste your Google Sheet Webhook or Google Apps Script Web App URL below. When students submit their test, their answers and score will automatically be forwarded to this URL and permanently saved on this browser.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch gap-2">
              <input
                type="url"
                value={sheetUrl}
                onChange={(e) => setSheetUrl(e.target.value)}
                placeholder="https://script.google.com/macros/s/.../exec or your Google Sheet link"
                className="flex-1 bg-[#0c152e] border border-blue-900/60 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 font-mono focus:outline-none focus:border-blue-500"
              />
              <button
                onClick={handleSaveUrl}
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs flex items-center justify-center gap-1.5 shadow-md shadow-blue-600/30 transition-colors whitespace-nowrap"
              >
                {saveSuccess ? <Check className="w-4 h-4 text-emerald-300" /> : <Save className="w-4 h-4" />}
                <span>{saveSuccess ? 'Saved to Browser!' : 'Save URL'}</span>
              </button>
            </div>

            {/* Apps Script Guide Accordion */}
            {showScriptGuide && (
              <div className="bg-[#0b142c] border border-blue-900/40 rounded-xl p-4 text-xs space-y-3 mt-3 animate-in fade-in">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-blue-300 flex items-center gap-1.5">
                    <Info className="w-4 h-4 text-blue-400" />
                    Instructions to enable direct automated rows in your Google Sheet:
                  </span>
                  <button
                    onClick={handleCopyAppsScript}
                    className="flex items-center gap-1 px-2.5 py-1 rounded bg-blue-700/80 hover:bg-blue-600 text-white font-semibold text-[11px] transition-colors"
                  >
                    {copiedAppsScript ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedAppsScript ? 'Script Copied!' : 'Copy Apps Script'}</span>
                  </button>
                </div>

                <ol className="list-decimal list-inside space-y-1 text-slate-300 pl-1">
                  <li>Open your Google Sheet and click <strong>Extensions &gt; Apps Script</strong>.</li>
                  <li>Replace any code with the script copied from the button above.</li>
                  <li>Click <strong>Deploy &gt; New deployment</strong>.</li>
                  <li>Select type: <strong>Web app</strong>, and set <em>"Who has access"</em> to <strong>Anyone</strong>.</li>
                  <li>Click Deploy, copy the Web App URL, and paste it into the box above!</li>
                </ol>

                <div className="relative">
                  <pre className="p-3 bg-[#060a17] rounded-lg border border-blue-950 font-mono text-[11px] text-cyan-300 overflow-x-auto max-h-36">
                    {APPS_SCRIPT_TEMPLATE}
                  </pre>
                </div>
              </div>
            )}
          </div>

          {/* Section 2: Local Submissions Table & Actions */}
          <div className="bg-[#080e21] border border-blue-950 rounded-2xl p-5 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wide">
                  Candidate Submissions Archive ({submissions.length})
                </h3>
                <p className="text-xs text-slate-400">All submissions saved in this browser's memory</p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={handleCopyTsv}
                  disabled={submissions.length === 0}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#0e1933] hover:bg-[#14264f] text-slate-200 border border-blue-900/60 text-xs font-medium disabled:opacity-50 transition-colors"
                  title="Copy table formatted for 1-click paste into Google Sheets"
                >
                  {copiedSheetTsv ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5 text-blue-400" />}
                  <span>{copiedSheetTsv ? 'Copied for Sheet!' : 'Copy for Google Sheet'}</span>
                </button>

                <button
                  onClick={handleExportCsv}
                  disabled={submissions.length === 0}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#0e1933] hover:bg-[#14264f] text-slate-200 border border-blue-900/60 text-xs font-medium disabled:opacity-50 transition-colors"
                >
                  <Download className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Download CSV</span>
                </button>

                {submissions.length > 0 && (
                  <button
                    onClick={handleClearRecords}
                    className="p-1.5 rounded-lg bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 border border-rose-800/40 text-xs transition-colors"
                    title="Clear history"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Table */}
            {submissions.length === 0 ? (
              <div className="text-center py-8 text-slate-500 text-xs bg-[#070b1a] rounded-xl border border-blue-950">
                No exam submissions recorded yet. Once candidates submit, their scores will appear here.
              </div>
            ) : (
              <div className="overflow-x-auto rounded-xl border border-blue-950">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#0b1530] text-slate-400 border-b border-blue-950 font-semibold uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="p-3">Candidate</th>
                      <th className="p-3">Roll No</th>
                      <th className="p-3 text-center">Score (Correct)</th>
                      <th className="p-3 text-center">%</th>
                      <th className="p-3 text-center">Time</th>
                      <th className="p-3 text-center">Strikes</th>
                      <th className="p-3">Submission Type</th>
                      <th className="p-3">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-blue-950/60 font-mono">
                    {submissions.map((sub) => {
                      const mins = Math.floor(sub.timeSpentSeconds / 60);
                      const secs = sub.timeSpentSeconds % 60;
                      return (
                        <tr key={sub.id} className="hover:bg-blue-950/20 transition-colors">
                          <td className="p-3 font-sans font-bold text-white">{sub.studentName}</td>
                          <td className="p-3 text-blue-300">{sub.studentRoll || '—'}</td>
                          <td className="p-3 text-center font-bold text-emerald-400">
                            {sub.totalCorrect} / {sub.totalQuestions}
                          </td>
                          <td className="p-3 text-center text-slate-200">{sub.percentage}%</td>
                          <td className="p-3 text-center text-slate-400">
                            {mins}m {secs < 10 ? '0' : ''}{secs}s
                          </td>
                          <td className="p-3 text-center">
                            <span className={`px-1.5 py-0.5 rounded text-[10px] ${
                              sub.violationsCount === 0 ? 'bg-emerald-950 text-emerald-300' : 'bg-rose-950 text-rose-300'
                            }`}>
                              {sub.violationsCount}
                            </span>
                          </td>
                          <td className="p-3 font-sans text-slate-300 text-[11px]">{sub.submissionReason}</td>
                          <td className="p-3 text-slate-400 text-[11px]">
                            {new Date(sub.submittedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-[#0e1933] border-t border-blue-950 px-6 py-3 flex items-center justify-between">
          <span className="text-xs text-slate-400">Auto-saved in browser database</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
