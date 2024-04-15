const express = require("express");

const AppError = require("./utils/appError");
const googleSheetsRouter = require("./routes/googleSheetsRoutes");

const app = express();

// Parse incoming requests with JSON payloads (body-parser)
app.use(express.json());

app.use("/api/v1/collection", googleSheetsRouter);

// Create AppError wenn non existing route is used
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

module.exports = app;
