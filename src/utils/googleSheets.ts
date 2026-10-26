/**
 * Google Sheets synchronization & results storage helper
 */

export interface ExamSubmission {
  id: string;
  studentName: string;
  studentRoll: string;
  totalCorrect: number;
  totalQuestions: number;
  percentage: number;
  timeSpentSeconds: number;
  violationsCount: number;
  submissionReason: string;
  submittedAt: string;
  answers: Record<number, string>;
  syncedToGoogleSheet?: boolean;
}

export const APPS_SCRIPT_TEMPLATE = `function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  
  // Set headers if sheet is empty
  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      "Submission ID",
      "Timestamp",
      "Student Name",
      "Roll / ID",
      "Correct Answers",
      "Total Questions",
      "Percentage %",
      "Time Spent (Min:Sec)",
      "Violations (Strikes)",
      "Submission Type",
      "Answers Summary"
    ]);
  }
  
  try {
    var data = JSON.parse(e.postData.contents);
    var minutes = Math.floor(data.timeSpentSeconds / 60);
    var seconds = data.timeSpentSeconds % 60;
    var timeFormatted = minutes + "m " + (seconds < 10 ? "0" : "") + seconds + "s";
    
    sheet.appendRow([
      data.id || ("SUB-" + new Date().getTime()),
      new Date().toLocaleString(),
      data.studentName,
      data.studentRoll || "N/A",
      data.totalCorrect,
      data.totalQuestions,
      data.percentage + "%",
      timeFormatted,
      data.violationsCount,
      data.submissionReason,
      JSON.stringify(data.answers || {})
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({ status: "success" }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}`;

export const GOOGLE_SHEET_URL_KEY = 'exam_google_sheet_url';
export const SUBMISSIONS_LOG_KEY = 'exam_all_submissions_log';

export function getSavedSheetUrl(): string {
  try {
    return localStorage.getItem(GOOGLE_SHEET_URL_KEY) || '';
  } catch {
    return '';
  }
}

export function saveSheetUrl(url: string): void {
  try {
    localStorage.setItem(GOOGLE_SHEET_URL_KEY, url.trim());
  } catch {
    // LocalStorage error
  }
}

export function getAllSubmissions(): ExamSubmission[] {
  try {
    const raw = localStorage.getItem(SUBMISSIONS_LOG_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveSubmissionLocally(submission: ExamSubmission): void {
  try {
    const list = getAllSubmissions();
    list.unshift(submission);
    localStorage.setItem(SUBMISSIONS_LOG_KEY, JSON.stringify(list));
  } catch (err) {
    console.error('Failed to save submission locally:', err);
  }
}

export async function sendSubmissionToGoogleSheet(
  submission: ExamSubmission,
  targetUrl: string
): Promise<{ success: boolean; message: string }> {
  if (!targetUrl || !targetUrl.trim()) {
    return {
      success: false,
      message: 'No Google Sheet / Webhook URL provided. Saved locally in browser database.'
    };
  }

  const cleanUrl = targetUrl.trim();

  try {
    // Attempt standard POST or no-cors POST for Google Apps Script Web App
    await fetch(cleanUrl, {
      method: 'POST',
      mode: 'no-cors', // Standard for Google Apps Script web apps to prevent CORS block
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(submission)
    });

    return {
      success: true,
      message: 'Submitted to Google Sheet Webhook successfully!'
    };
  } catch (err) {
    console.warn('Google Sheet submission fetch warning:', err);
    return {
      success: false,
      message: 'Network dispatch encountered an error, but results are safely backed up locally.'
    };
  }
}

// Convert all submissions to TSV for 1-click pasting into any Google Sheet
export function formatSubmissionsForGoogleSheetCopy(submissions: ExamSubmission[]): string {
  const headers = [
    'Submission ID',
    'Date & Time',
    'Student Name',
    'Roll / ID',
    'Score (Correct / Total)',
    'Percentage %',
    'Time Spent',
    'Security Violations',
    'Status Reason'
  ];

  const rows = submissions.map(sub => {
    const mins = Math.floor(sub.timeSpentSeconds / 60);
    const secs = sub.timeSpentSeconds % 60;
    const timeStr = `${mins}m ${secs < 10 ? '0' : ''}${secs}s`;
    return [
      sub.id,
      new Date(sub.submittedAt).toLocaleString(),
      sub.studentName,
      sub.studentRoll || 'N/A',
      `${sub.totalCorrect} / ${sub.totalQuestions}`,
      `${sub.percentage}%`,
      timeStr,
      `${sub.violationsCount} strikes`,
      sub.submissionReason
    ].join('\t');
  });

  return [headers.join('\t'), ...rows].join('\n');
}

// Export as CSV
export function exportSubmissionsCSV(submissions: ExamSubmission[]): void {
  const headers = [
    'Submission ID',
    'Timestamp',
    'Student Name',
    'Roll Number',
    'Correct Answers',
    'Total Questions',
    'Percentage',
    'Time Spent (Seconds)',
    'Violations',
    'Submission Reason'
  ];

  const csvRows = [
    headers.join(','),
    ...submissions.map(sub =>
      [
        `"${sub.id}"`,
        `"${sub.submittedAt}"`,
        `"${sub.studentName.replace(/"/g, '""')}"`,
        `"${(sub.studentRoll || '').replace(/"/g, '""')}"`,
        sub.totalCorrect,
        sub.totalQuestions,
        sub.percentage,
        sub.timeSpentSeconds,
        sub.violationsCount,
        `"${sub.submissionReason.replace(/"/g, '""')}"`
      ].join(',')
    )
  ];

  const blob = new Blob([csvRows.join('\n')], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `Exam_Results_${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
