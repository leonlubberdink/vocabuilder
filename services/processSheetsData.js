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

const getTabs = async () => {
  const spreadsheetId = process.env.GOOGLE_SHEET_ID;

  const auth = await getAuthToken();

  const sheet = await getSpreadSheet({ spreadsheetId, auth });

  const tabIdsAndNames = processTabs(sheet.data.sheets);

  return tabIdsAndNames;
};

///////////////////////////////////////////////////////////////////////////////////////////
// ALL WORDS
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

    const resPlusTabs = res.map((arr) => {
      arr.push(tab.name);
      return arr;
    });

    return resPlusTabs;
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
    wordObj = {
      foreignLang: word[0],
      englishLang: word[1],
      row: i + 2,
      tabName: word[3],
    };
    if (word[2] === "1") {
      wordObj.score = 1;
      scoreOne.push(wordObj);
    } else if (word[2] === "2") {
      wordObj.score = 2;
      scoreTwo.push(wordObj);
    } else if (word[2] === "3") {
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

const getWords = async () => {
  const spreadsheetId = process.env.GOOGLE_SHEET_ID;

  const auth = await getAuthToken();

  const sheet = await getSpreadSheet({ spreadsheetId, auth });

  const tabIdsAndNames = processTabs(sheet.data.sheets);

  const words = await processWords({ tabIdsAndNames, auth, spreadsheetId });

  return words;
};

///////////////////////////////////////////////////////////////////////////////////////////
// GET ONE RANDOM WORD

const getScoreToPick = () => {
  const randomNumber = Math.floor(Math.random() * 100) + 1;

  if (randomNumber <= 15) {
    return 1;
  } else if (randomNumber <= 40) {
    return 2;
  } else {
    return 3;
  }
};

const getWord = async (score) => {
  const allScoredWords = await getWords();

  let scoredArray = [];

  if (score === 1) scoredArray = allScoredWords.scoreOne;
  if (score === 2) scoredArray = allScoredWords.scoreTwo;
  if (score === 3) scoredArray = allScoredWords.scoreThree;

  return scoredArray[Math.floor(Math.random() * scoredArray.length)];
};

const getRandomWord = async () => {
  const score = getScoreToPick();

  const word = await getWord(score);

  return word;
};

///////////////////////////////////////////////////////////////////////////////////////////
// ANSWER

module.exports = { getWords, getTabs, getRandomWord };
