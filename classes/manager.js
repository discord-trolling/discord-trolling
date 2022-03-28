const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const { Parser } = require("troll-file");

const chalk = require("chalk");

/**
 * Manager class providing bot utils
 * @class Manager
 */
class Manager {
  /**
   * Registers a slash command for a guild
   * @param {Array.<object>} commands - an array of objects containing command definitions
   * @param {object} requestInformation - an object containing information for the request
   * @param {string} requestInformation.token - the application token (e.g. a bot token)
   * @param {string} requestInformation.clientId - the application id (e.g. a bot ID)
   * @param {string} requestInformation.guildId - the guild id for the command
   * @param {boolean} requestInformation.isGuildCommand - are the commands guild specific
   * @returns A promise with a result or rejection
   */
  static registerCommands = (commands, requestInformation) => {
    return new Promise((resolve, reject) => {
      if (!Array.isArray(commands))
        reject("Commands argument is not an array!");
      if (requestInformation.isGuildCommand) {
        if (Object.keys(requestInformation).length !== 4)
          reject(
            "Your request information needs to be no more or no less than 4 arguments!"
          );
      } else if (Object.keys(requestInformation).length !== 3)
        reject(
          "Your request information needs to be no more or no less than 3 arguments!"
        );

      for (let info in requestInformation) {
        if (typeof info !== "string")
          reject(`requestInformation argument ${info} is not a string!`);
      }

      let rest = new REST({ version: "9" }).setToken(requestInformation.token);

      rest
        .put(
          requestInformation.isGuildCommand
            ? Routes.applicationGuildCommands(
                requestInformation.clientId,
                requestInformation.guildId
              )
            : Routes.applicationCommands(requestInformation.clientId),
          {
            body: commands,
          }
        )
        .then((res) => {
          console.log(
            chalk.bgGreen("✓ COMMAND:") + " New guild command registered!"
          );

          resolve({
            status: "OK",
            message: "New command registered!",
          });
        })
        .catch((err) => {
          console.log(
            chalk.bgRed("✖ COMMAND:") + " Command failed to register!"
          );

          reject({
            status: "ERR",
            message: err,
          });
        });
    });
  };

  /**
   * Registers slash commands from a .troll schema file
   * @param {string} file the path to the troll file for commands
   * @param {Parser} parser the instance of a parser
   */
  static registerCommandsFromSchema = (file, parser) => {
    return new Promise((resolve, reject) => {
      const parsedConfig = parser.parse(`${parser.path}/config.troll`);
      const parsedCommands = parser.parse(`${file}`);

      const rest = new REST({ version: "9" }).setToken(
        parsedConfig.bot.config.token
      );

      const commands = [];

      for (const [name, body] of Object.entries(parsedCommands.commands)) {
        const command = {
          name,
          ...body,
        };

        commands.push(command);
      }

      rest
        .put(
          parsedCommands.config.isGuildCommand
            ? Routes.applicationGuildCommands(
                parsedCommands.config.clientId,
                parsedCommands.config.guildId
              )
            : Routes.applicationCommands(parsedCommands.config.clientId),
          {
            body: commands,
          }
        )
        .then((res) => {
          console.log(
            chalk.bgGreen("✓ COMMAND:") + " New guild command registered!"
          );

          resolve({
            status: "OK",
            message: "New command registered!",
          });
        })
        .catch((err) => {
          console.log(
            chalk.bgRed("✖ COMMAND:") + " Command failed to register!"
          );

          reject({
            status: "ERR",
            message: err,
          });
        });
    });
  };
}

module.exports = {
  Manager,
};
