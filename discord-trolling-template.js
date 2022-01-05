const { Troll } = require("discord-trolling");

/**
 * Your command
 */
module.exports.CommandName = class extends Troll {
  constructor(interaction, client) {
    super(interaction, client);

    this.run = () => {
      //TODO: implement command
    };
  }
};
