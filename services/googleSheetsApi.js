const { google } = require("googleapis");
const sheets = google.sheets("v4");

const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];

exports.getAuthToken = async () => {
  try {
    const auth = new google.auth.GoogleAuth({
      scopes: SCOPES,
    });
    const authToken = await auth.getClient();
    return authToken;
  } catch (error) {
    throw error;
  }
};

exports.getSpreadSheet = async ({ spreadsheetId, auth }) => {
  try {
    const res = await sheets.spreadsheets.get({
      spreadsheetId,
      auth,
    });
    return res;
  } catch (error) {
    throw error;
  }
};

exports.getSpreadSheetValues = async ({ spreadsheetId, auth, sheetName }) => {
  try {
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId,
      auth,
      range: sheetName,
    });
    // console.log(res.data);
    return res.data.values;
  } catch (error) {
    throw error;
  }
};
