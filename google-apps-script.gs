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
 *
 * ---------- EMAIL NOTIFICATIONS ----------
 * Every new order also emails NOTIFY_EMAIL below. Sending mail is a
 * new permission this script didn't need before, so the NEXT deploy
 * will re-prompt you to authorise it ("This app isn't verified" is
 * normal for a script you wrote yourself — click Advanced ▸ Go to
 * [project name] to proceed). To change the notification address
 * later, just edit NOTIFY_EMAIL and deploy a new version.
 * =================================================================
 */

var SHEET_NAME = "Orders";

// Where new-order notification emails go. Swap this when the new
// business email is ready — nothing else needs to change.
var NOTIFY_EMAIL = "aimen.faheem63@gmail.com";

function doPost(e) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);

    // Add a header row the first time
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Ordered At", "Name", "Phone", "City", "Email",
        "Address", "Notes", "Items", "Total (Rs)", "Payment Status"
      ]);
      sheet.setFrozenRows(1);
    }

    var data = JSON.parse(e.postData.contents);

    // Payment method (Bank Transfer / Easypaisa) is folded into Notes
    // so that information isn't lost now that there's no separate column for it.
    var notesWithPayment =
      (data.payment ? "Payment method: " + data.payment : "") +
      (data.payment && data.notes ? " | " : "") +
      (data.notes || "");

    sheet.appendRow([
      data.orderedAt ? new Date(data.orderedAt) : new Date(),
      data.name || "",
      "'" + (data.phone || ""), // leading quote keeps the phone as text
      data.city || "",
      data.email || "",
      data.address || "",
      notesWithPayment,
      data.items || "",
      data.total || 0,
      "Unpaid"                  // every new order starts as Unpaid
    ]);

    // Add a Paid / Unpaid dropdown on the Payment Status cell of this new row.
    var STATUS_COL = 10; // 10th column = "Payment Status"
    var newRow = sheet.getLastRow();
    var rule = SpreadsheetApp.newDataValidation()
      .requireValueInList(["Unpaid", "Paid"], true)
      .setAllowInvalid(false)
      .build();
    sheet.getRange(newRow, STATUS_COL).setDataValidation(rule);

    // Notify by email — wrapped so a mail failure never breaks the order.
    try {
      sendOrderNotificationEmail(data);
    } catch (mailErr) {
      console.error("Order email notification failed: " + mailErr);
    }

    return ContentService
      .createTextOutput(JSON.stringify({ result: "success" }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: "error", error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function sendOrderNotificationEmail(data) {
  var subject = "New order: " + (data.name || "Unknown") + " — Rs " + (data.total || 0);

  var body =
    "You've got a new order on Studio Resinique!\n\n" +
    "Name: " + (data.name || "-") + "\n" +
    "Phone: " + (data.phone || "-") + "\n" +
    "Email: " + (data.email || "-") + "\n" +
    "City: " + (data.city || "-") + "\n" +
    "Address: " + (data.address || "-") + "\n" +
    "Payment method: " + (data.payment || "-") + "\n" +
    (data.notes ? "Notes: " + data.notes + "\n" : "") +
    "\nItems:\n" + (data.items || "-") + "\n" +
    "\nTotal: Rs " + (data.total || 0) + "\n" +
    "\n— Full details are in the Orders sheet.";

  MailApp.sendEmail(NOTIFY_EMAIL, subject, body);
}

// Run this once manually from the editor (select it in the function
// dropdown above, then click Run) to force the email-permission
// authorization prompt and confirm mail actually sends.
function testEmail() {
  MailApp.sendEmail(NOTIFY_EMAIL, "Test email from Studio Resinique script", "If you got this, order email notifications are working.");
}

// Lets you open the web app URL in a browser to confirm it's live.
function doGet() {
  return ContentService
    .createTextOutput("Studio Resinique order endpoint is running.")
    .setMimeType(ContentService.MimeType.TEXT);
}
