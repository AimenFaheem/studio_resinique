/**
 * Studio Resinique — Order capture for Google Sheets
 * =================================================================
 * This runs on Google's servers (NOT in the website). It receives each
 * checkout order from script.js and appends it as a row to your sheet.
 *
 * ---------- ONE-TIME SETUP ----------
 * 1. Create a Google Sheet (e.g. "Studio Resinique Orders").
 * 2. In the sheet: Extensions ▸ Apps Script.
 * 3. Delete any sample code, paste THIS whole file, and Save.
 * 4. Click Deploy ▸ New deployment.
 *      - Type:            Web app   (gear icon ▸ Web app)
 *      - Description:     Resinique orders
 *      - Execute as:      Me
 *      - Who has access:  Anyone
 *    Click Deploy, authorise the permissions when prompted.
 * 5. Copy the "Web app URL" it gives you.
 * 6. Open script.js and paste that URL into:
 *      const SHEET_ENDPOINT = "....";
 *
 * To change the code later, edit it then Deploy ▸ Manage deployments ▸
 * (pencil) ▸ Version: New version ▸ Deploy. The URL stays the same.
 * =================================================================
 */

var SHEET_NAME = "Orders";

function doPost(e) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);

    // Add a header row the first time
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Ordered At", "Name", "Phone", "City", "Email",
        "Address", "Notes", "Payment", "Status", "Items", "Total (Rs)"
      ]);
      sheet.setFrozenRows(1);
    }

    var data = JSON.parse(e.postData.contents);

    sheet.appendRow([
      data.orderedAt ? new Date(data.orderedAt) : new Date(),
      data.name || "",
      "'" + (data.phone || ""), // leading quote keeps the phone as text
      data.city || "",
      data.email || "",
      data.address || "",
      data.notes || "",
      data.payment || "",
      "Unpaid",                 // every new order starts as Unpaid
      data.items || "",
      data.total || 0
    ]);

    // Add a Paid / Unpaid dropdown on the Status cell of this new row.
    var STATUS_COL = 9; // 9th column = "Status"
    var newRow = sheet.getLastRow();
    var rule = SpreadsheetApp.newDataValidation()
      .requireValueInList(["Unpaid", "Paid"], true)
      .setAllowInvalid(false)
      .build();
    sheet.getRange(newRow, STATUS_COL).setDataValidation(rule);

    return ContentService
      .createTextOutput(JSON.stringify({ result: "success" }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: "error", error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Lets you open the web app URL in a browser to confirm it's live.
function doGet() {
  return ContentService
    .createTextOutput("Studio Resinique order endpoint is running.")
    .setMimeType(ContentService.MimeType.TEXT);
}
