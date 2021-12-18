const chalk = require("chalk");

const logErr = (message) =>
  console.error(`${chalk.bgRed("ERROR:")} ${message}`);
const logWarning = (message) =>
  console.log(`${chalk.bgYellow("WARNING:")} ${message}`);
const logInfo = (message) => console.log(`${chalk.bgBlue("INFO:")} ${message}`);
const logSuccess = (message) =>
  console.log(`${chalk.bgGreen("SUCCESS:")} ${message}`);

module.exports = {
  logErr,
  logWarning,
  logInfo,
  logSuccess,
};
