const {
  getTabs,
  getWords,
  getRandomWord,
} = require("../services/processSheetsData");

exports.getTabs = async (req, res) => {
  try {
    const tabs = await getTabs();

    res.status(201).json({
      status: "success",
      results: tabs.length,
      tabs,
    });
  } catch (error) {
    const statusCode = error.status || 500;
    res.status(statusCode).json({
      status: error.message ? "fail" : "error",
      message: error.message || "Unknown error",
    });
  }
};

exports.getAllWords = async (req, res) => {
  try {
    const words = await getWords(req.body);

    res.status(201).json({
      status: "success",
      results: words.length,
      words,
    });
  } catch (error) {
    const statusCode = error.status || 500;
    res.status(statusCode).json({
      status: error.message ? "fail" : "error",
      message: error.message || "Unknown error",
    });
  }
};

exports.getRandomWord = async (req, res) => {
  try {
    const word = await getRandomWord();

    res.status(201).json({
      status: "success",
      word,
    });
  } catch (error) {
    const statusCode = error.status || 500;
    res.status(statusCode).json({
      status: error.message ? "fail" : "error",
      message: error.message || "Unknown error",
    });
  }
};

exports.getRandomWord = async (req, res) => {
  try {
    const word = await getRandomWord();

    res.status(201).json({
      status: "success",
      word,
    });
  } catch (error) {
    const statusCode = error.status || 500;
    res.status(statusCode).json({
      status: error.message ? "fail" : "error",
      message: error.message || "Unknown error",
    });
  }
};

exports.checkAnswer = async (req, res) => {
  try {
    const res = await getRandomWord();

    res.status(201).json({
      status: "success",
      word,
    });
  } catch (error) {
    const statusCode = error.status || 500;
    res.status(statusCode).json({
      status: error.message ? "fail" : "error",
      message: error.message || "Unknown error",
    });
  }
};
