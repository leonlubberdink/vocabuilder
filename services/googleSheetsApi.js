const { google } = require("googleapis");
const sheets = google.sheets("v4");

const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];

exports.getAuthToken = async () => {
  const auth = new google.auth.GoogleAuth({
    scopes: SCOPES,
  });
  const authToken = await auth.getClient();
  return authToken;
};

exports.getSpreadSheet = async ({ spreadsheetId, auth }) => {
  const res = await sheets.spreadsheets.get({
    spreadsheetId,
    auth,
  });
  return res;
};

async function getSpreadSheetValues({ spreadsheetId, auth, sheetName }) {
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId,
    auth,
    range: sheetName,
  });
  return res;
}
