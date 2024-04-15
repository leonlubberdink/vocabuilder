const {
  getAuthToken,
  getSpreadSheet,
  getSpreadSheetValues,
} = require("./googleSheetsApi");

///////////////////////////////////////////////////////////////////////////////////////////
// TABS

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

///////////////////////////////////////////////////////////////////////////////////////////
// WORDS
const getAllValuesFromSpreadSheet = async ({
  tabIdsAndNames,
  auth,
  spreadsheetId,
}) => {
  const valuesPromises = tabIdsAndNames.map(async (tab) => {
    const res = await getSpreadSheetValues({
      spreadsheetId,
      auth,
      sheetName: tab.name,
    });
    return res;
  });

  const values = await Promise.all(valuesPromises);
  const valuesNotUndefined = values.filter((value) => value !== undefined);

  return valuesNotUndefined;
};

const createList = (allValues) => {
  const scoreOne = [];
  const scoreTwo = [];
  const scoreThree = [];

  const removedHeadings = allValues.map((tab) => tab.slice(2)).flat();

  removedHeadings.forEach((word) => {
    if (word[2] === "1") {
      word[2] = 1;
      scoreOne.push(word);
    } else if (word[2] === "2") {
      word[2] = 2;
      scoreTwo.push(word);
    } else if (word[2] === "3") {
      word[2] = 3;
      scoreThree.push(word);
    }
  });

  return { scoreOne, scoreTwo, scoreThree };
};

const processWords = async ({ tabIdsAndNames, auth, spreadsheetId }) => {
  const allValues = await getAllValuesFromSpreadSheet({
    tabIdsAndNames,
    auth,
    spreadsheetId,
  });

  const wordList = createList(allValues);

  return wordList;
};

exports.getWords = async () => {
  const spreadsheetId = process.env.GOOGLE_SHEET_ID;

  const auth = await getAuthToken();

  const sheet = await getSpreadSheet({ spreadsheetId, auth });

  const tabIdsAndNames = processTabs(sheet.data.sheets);

  const words = await processWords({ tabIdsAndNames, auth, spreadsheetId });

  return words;
};
