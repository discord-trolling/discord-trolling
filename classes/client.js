const discord = require("discord.js");
const chalk = require("chalk");

/**
 * A discord-trolling bot client
 * @class Client
 */
class Client extends discord.Client {
  constructor(options) {
    if (!options.intents)
      throw new Error("No intents were supplied to run this bot!");

    super({ intents: options.intents });

    /**
     * Log the bot in
     * @param {string} token your bot token
     */
    this.troll = (token) => {
      super.login(token);

      console.log(chalk.bgGreen("READY:") + ` Bot has logged in!`);
    };

    /**
     * Listens for a new command interaction
     * @returns {Promise<discord.CommandInteraction>} a promise which resolves to a command interaction
     */
    this.command = () => {
      return new Promise((resolve) => {
        this.on("interactionCreate", (interaction) => {
          if (!interaction.isCommand()) return;

          resolve(interaction);
        });
      });
    };
  }
}

/**
 * Client intents
 * @class Intents
 */
class Intents extends discord.Intents {
  constructor() {
    super();
  }
}

module.exports = {
  Client,
  Intents,
};
