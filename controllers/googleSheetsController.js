const { getTabs, getWords } = require("../services/processSheetsData");

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

exports.getWordsSelection = async (req, res) => {
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
