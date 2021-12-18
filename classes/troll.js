const { CommandInteraction } = require("discord.js");
const { Client } = require("./client");

/**
 * A class representing a base command
 * @class Troll
 */
class Troll {
  /**
   * The constructor for the Troll class
   * @param {CommandInteraction} interaction the interaction passed by the CommandHandler
   * @param {Client} client a discord-trolling client
   */
  constructor(interaction, client) {
    this.interaction = interaction;
    this.client = client;

    /**
     * The function that is called by the CommandHandler when the command runs
     */
    this.run = () => {};
  }
}

module.exports = {
  Troll,
};
