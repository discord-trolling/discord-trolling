const { Client } = require("./client");
const { Troll } = require("./troll");

const fs = require("fs");
const logger = require("./../utils/logger");

/**
 * A class for handling command interactions
 * @class CommandHandler
 */
class CommandHandler {
  /**
   * The constructor for the CommandHandler class
   * @param {object} options an object for configuring the CommandHandler
   * @param {string} options.path the path to the folder containing command files
   * @param {Array.<string>} options.excludedFiles files to not read when parsing commands
   * @param {Client} options.client a discord-trolling client
   */
  constructor(options) {
    this.path = options.path;
    this.excludedFiles = options.excludedFiles || [];
    this.client = options.client;

    /**
     * Reads commands from a directory and returns their names without extensions
     * @returns object
     */
    this._readCommands = () => {
      let commands = [];

      if (this.path)
        commands = fs
          .readdirSync(this.path)
          .filter((f) => !this.excludedFiles.includes(f) && f.endsWith(".js"));

      return {
        commands: [...commands.map((c) => c.slice(0, c.lastIndexOf(".")))],
      };
    };

    /**
     * A function for parsing commands and returning their command in an object
     * @returns object
     */
    this._parseCommands = () => {
      let commands = this._readCommands();
      let objectToReturn = {
        commands: {},
      };

      for (let command of commands.commands) {
        let file = require(command);

        file instanceof Troll
          ? (objectToReturn.commands[command] = file.Command)
          : "";
      }

      return objectToReturn;
    };

    /**
     * Runs parseable commands when new interaction is recieved
     */
    this.startHandling = () => {
      let commands = this._parseCommands();

      this.client.on("interactionCreate", (interaction) => {
        if (!interaction.isCommand()) return;

        commands[interaction.commandName]
          ? commands[interaction.commandName].run()
          : logger.logErr(
              `Command ${interaction.commandName} was not found in directory ${this.path}`
            );
      });
    };
  }
}

module.exports = {
  CommandHandler,
};
