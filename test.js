const { Client, Intents } = require("./classes/client");
const { Manager } = require("./classes/manager");
const { Command } = require("./classes/command");

let command = () => {
  let ping = new Command();

  ping.setName("ping");
  ping.setDescription("ping");

  let option = ping.createOption();

  option.setName("ping");
  option.setRequired(true);
  option.setType(option.types.STRING);
  option.setDescription("ping");
  option.setValue("ping");

  ping.finalizeOption(option);

  return ping.troll();
};

Manager.registerCommands([command()], {
  token: "your bot token",
  clientId: "your client id",
  guildId: "your guild id",
  isGuildCommand: true,
}).catch((err) => console.error(err));

let bot = new Client({ intents: [Intents.FLAGS.GUILDS] });

bot.on("interactionCreate", (interaction) => {
  if (interaction.commandName === "pong") interaction.reply("pong");
});

bot.troll("your bot token");
