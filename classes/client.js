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
