/**
 * ============================================================
 * GOOGLE APPS SCRIPT — Wedding RSVP + Guestbook Backend
 * ============================================================
 *
 * SETUP INSTRUCTIONS:
 * 1. Go to: https://script.google.com
 * 2. Create a new project named "Wedding RSVP"
 * 3. Paste this entire file into the editor
 * 4. Update SPREADSHEET_ID below with your Google Sheet ID
 * 5. Click Deploy > New deployment > Web App
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 6. Copy the Web App URL
 * 7. Paste it into src/config.js as RSVP_API_URL and GUESTBOOK_API_URL
 * ============================================================
 */

// ---- CONFIGURATION ----
// Replace with your Google Sheet ID (found in the URL of your sheet)
// Example: https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgVE2upms/edit
const SPREADSHEET_ID = 'YOUR_GOOGLE_SHEET_ID_HERE';

const RSVP_SHEET_NAME      = 'RSVP';
const GUESTBOOK_SHEET_NAME = 'Guestbook';

// ---- MAIN HANDLER ----
/**
 * Handle POST requests from the wedding website.
 * Accepts both RSVP and Guestbook submissions.
 */
function doPost(e) {
  try {
    const params = e.parameter;

    // Determine submission type
    const type = params.type || 'rsvp';

    let result;
    if (type === 'guestbook') {
      result = saveGuestbookEntry(params);
    } else {
      result = saveRSVP(params);
    }

    return ContentService
      .createTextOutput(JSON.stringify({ result: 'success', data: result }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    console.error('Error processing submission:', error);
    return ContentService
      .createTextOutput(JSON.stringify({ result: 'error', error: error.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// ---- RSVP ----
/**
 * Save an RSVP response to the RSVP sheet.
 * Creates headers if the sheet is empty.
 */
function saveRSVP(params) {
  const ss    = SpreadsheetApp.openById(SPREADSHEET_ID);
  let   sheet = ss.getSheetByName(RSVP_SHEET_NAME);

  // Create sheet if it doesn't exist
  if (!sheet) {
    sheet = ss.insertSheet(RSVP_SHEET_NAME);
    const headers = ['Timestamp', 'Guest Name', 'No. of Guests', 'Attendance', 'Message'];
    sheet.appendRow(headers);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
    sheet.setFrozenRows(1);
  }

  // Sanitise inputs
  const name       = (params.name       || '').trim().substring(0, 100);
  const guests     = parseInt(params.guests || '1', 10);
  const attendance = params.attendance === 'yes' ? 'Attending' : 'Not Attending';
  const message    = (params.message    || '').trim().substring(0, 500);
  const timestamp  = new Date().toLocaleString('en-LK', { timeZone: 'Asia/Colombo' });

  sheet.appendRow([timestamp, name, guests, attendance, message]);

  // Auto-resize columns for readability
  sheet.autoResizeColumns(1, 5);

  return { name, guests, attendance };
}

// ---- GUESTBOOK ----
/**
 * Save a guestbook wish to the Guestbook sheet.
 */
function saveGuestbookEntry(params) {
  const ss    = SpreadsheetApp.openById(SPREADSHEET_ID);
  let   sheet = ss.getSheetByName(GUESTBOOK_SHEET_NAME);

  if (!sheet) {
    sheet = ss.insertSheet(GUESTBOOK_SHEET_NAME);
    const headers = ['Timestamp', 'Name', 'Message'];
    sheet.appendRow(headers);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
    sheet.setFrozenRows(1);
  }

  const name      = (params.name    || '').trim().substring(0, 100);
  const message   = (params.message || '').trim().substring(0, 500);
  const timestamp = new Date().toLocaleString('en-LK', { timeZone: 'Asia/Colombo' });

  sheet.appendRow([timestamp, name, message]);
  sheet.autoResizeColumns(1, 3);

  return { name };
}

// ---- TEST (optional) ----
/**
 * Run this function manually to test your setup.
 * Check the Execution log for errors.
 */
function testSetup() {
  const testParams = {
    name:       'Test Guest',
    guests:     '2',
    attendance: 'yes',
    message:    'Looking forward to it!',
  };
  const result = saveRSVP(testParams);
  console.log('Test RSVP saved:', JSON.stringify(result));

  const guestParams = {
    type:    'guestbook',
    name:    'Test Guest',
    message: 'Congratulations!',
  };
  const guestResult = saveGuestbookEntry(guestParams);
  console.log('Test Guestbook entry saved:', JSON.stringify(guestResult));
}
