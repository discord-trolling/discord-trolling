const client = require("./classes/client");
const command = require("./classes/command");
const manager = require("./classes/manager");
const commandHandler = require("./classes/commandHandler");
const troll = require("./classes/troll");

module.exports = {
  ...client,
  ...command,
  ...manager,
  ...commandHandler,
  ...troll,
};
