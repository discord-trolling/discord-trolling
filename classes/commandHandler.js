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
          .filter((f) => !this.excludedFiles.includes(f));

      return {
        commands: [...commands.map((c) => c.slice(0, c.lastIndexOf(".")))],
      };
    };

    /**
     * Checks if commands are parseable without extra work
     * @returns object
     */
    this._checkIfHandleable = () => {
      let commands = this._readCommands();
      let objectToReturn = {
        commands: [],
      };

      for (let command of commands.commands) {
        let commandFile = require(`${this.path}/${command}`);

        let defaultParseable = true;

        if (!commandFile[command]) {
          logger.logErr(
            `A command was not found in file ${command}. Please add one or add it to the excluded files.`
          );

          defaultParseable = false;

          continue;
        }

        if (!commandFile[command] instanceof Troll) {
          logger.logErr(
            `There was no instance of the Troll class found in file ${command}.`
          );

          continue;
        }

        objectToReturn.commands.push({ command, defaultParseable });
      }

      return objectToReturn;
    };

    /**
     * Runs parseable commands when new interaction is recieved
     */
    this.startHandling = () => {
      let handleableCommands = this._checkIfHandleable();

      this.client.on("interactionCreate", (interaction) => {
        if (!interaction.isCommand()) return;

        let parseable = handleableCommands.commands.find(
          (c) => c.command === interaction.commandName
        );

        if (!parseable) return;

        if (parseable.defaultParseable) {
          let commandFile = require(`${this.path}/${parseable.command}`)[
            parseable.command
          ];
          let command = new commandFile(interaction, this.client);

          command.run();
        } else {
          try {
            let commandFile =
              require(`${this.path}/${parseable.command}`).command;
            let command = new commandFile(interaction, this.client);

            command.run();
          } catch (err) {
            logger.logWarning(
              `Command ${parseable.command} failed to run. Please ensure that the command class is named the command name or "command".`
            );
          }
        }
      });
    };
  }
}

module.exports = {
  CommandHandler,
};
