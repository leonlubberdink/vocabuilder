const { getAuthToken, getSpreadSheet } = require("./googleSheetsApi");

const processTabs = (tabs) => {
  const idsAndNames = tabs.map((tab) => {
    return {
      id: tab.properties.sheetId,
      name: tab.properties.title,
      index: tab.properties.index,
    };
  });
  return idsAndNames;
};

exports.getTabs = async () => {
  const spreadsheetId = process.env.GOOGLE_SHEET_ID;

  const auth = await getAuthToken();

  const sheet = await getSpreadSheet({ spreadsheetId, auth });

  const tabIdsAndNames = processTabs(sheet.data.sheets);

  return tabIdsAndNames;
};
