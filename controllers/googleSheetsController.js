const { getTabs } = require("../services/processSheetsData");

exports.getTabs = async (req, res) => {
  try {
    console.log("TABS");
    const tabs = await getTabs();

    console.log(tabs);

    res.status(201).json({
      status: "success",
      results: tabs.length,
      tabs,
    });
  } catch (error) {
    console.log(error.message);
  }
};
