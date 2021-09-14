const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");

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
   * @returns A promise with a result or rejection
   */
  static registerCommands = (commands, requestInformation) => {
    return new Promise((resolve, reject) => {
      if (!Array.isArray(commands))
        reject("Commands argument is not an array!");
      if (Object.keys(requestInformation).length !== 3)
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
          Routes.applicationGuildCommands(
            requestInformation.clientId,
            requestInformation.guildId
          ),
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
