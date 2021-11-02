const client = require("./classes/client");
const command = require("./classes/command");
const manager = require("./classes/manager");

module.exports = {
  ...client,
  ...command,
  ...manager,
};
