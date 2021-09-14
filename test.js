const client = require("./classes/client");
const { Manager } = require("./classes/manager");
const { Command } = require("./classes/command");

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

ping = ping.troll();

Manager.registerCommands([ping], {
  token: "your bot token",
  clientId: "your bot id",
  guildId: "your guild id",
}).catch((err) => console.error(err));

let bot = new client.Client({ intents: [client.Intents.FLAGS.GUILDS] });

bot.command().then((command) => {
  if (command.commandName === "ping") command.reply("pong");
});

bot.troll("your bot token");
