const discord = require("discord.js");
const chalk = require("chalk");

const { Parser } = require("troll-file");

/**
 * A discord-trolling bot client
 * @class Client
 */
class Client extends discord.Client {
  /**
   * @constructor
   * @param {object} options the options for the client
   * @param {Parser} options.parser an instance of the parser class if you are using troll files
   */
  constructor(options) {
    super({ intents: options.intents });

    this.parser = options.parser;

    /**
     * Log the bot in
     * @param {string} token your bot token
     */
    this.troll = (token) => {
      if (this.parser) {
        const parsedConfig = this.parser.parse(
          `${this.parser.path}/config.troll`
        );

        if (parsedConfig) super.login(parsedConfig.bot.cofig.token);

        return console.log(chalk.bgGreen("READY:") + ` Bot has logged in!`);
      }

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
