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

  //return object already with index/row and sheetId
  const removedHeadings = allValues.map((tab) => tab.slice(2)).flat();

  removedHeadings.forEach((word, i) => {
    console.log(word[2]);
    wordObj = { foreignLang: word[0], englishLang: word[1], row: i + 2 };
    if (word[2] === "1") {
      console.log("Score 1");
      wordObj.score = 1;
      scoreOne.push(wordObj);
    } else if (word[2] === "2") {
      console.log("Score 2");
      wordObj.score = 2;
      scoreTwo.push(wordObj);
    } else if (word[2] === "3") {
      console.log("Score 3");
      wordObj.score = 3;
      scoreThree.push(wordObj);
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
