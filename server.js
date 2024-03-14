const https = require("https");
const dotenv = require("dotenv");
const fs = require("fs");
const morgan = require("morgan");

const ENV = process.env.NODE_ENV || "development";
const PORT = process.env.PORT || 4000;

dotenv.config({ path: "./.env" });

const app = require("./app");

// MIDDLEWARE FOR DEVELOPMEN ENV
if (process.env.NODE_ENV === "development") {
  console.log("DEVELOPMENT ENVIRONMENT");

  // Morgan Middleware for logging request info to console.
  app.use(morgan("dev"));
}

if (ENV === "development") {
  server = app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}...`);
  });
}

// HTTPS SERVER
if (ENV === "production") {
  const options = {
    key: fs.readFileSync(`${process.env.PRIV_KEY}`),
    cert: fs.readFileSync(`${process.env.PUB_KEY}`),
  };

  httpsServer = https.createServer(options, app);

  httpsServer.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
