const client = require("./classes/client");
const { Manager } = require("./classes/manager");
const { Command } = require("./classes/command");

let ping = new Command();

ping.setName("ping");
ping.setDescription("ping");

let option = ping.createOption();

option.setName("pinga");
option.setRequired(true);
option.setType(option.types.STRING);
option.setDescription("smirk");
option.setValue("smirk");

ping.finalizeOption(option);

ping = ping.troll();

Manager.registerCommands([ping], {
  token: "ODgyODQ3ODQ2MTYyOTExMjcy.YTBWIQ.Uu2RL8Ix8Dh49uOLYHC9foDmedQ",
  clientId: "882847846162911272",
  guildId: "882845724470042625",
}).catch((err) => console.error(err));

let bot = new client.Client({ intents: [client.Intents.FLAGS.GUILDS] });

bot.command().then((command) => {
  if (command.commandName === "ping") command.reply("pong");
});

bot.troll("ODgyODQ3ODQ2MTYyOTExMjcy.YTBWIQ.Uu2RL8Ix8Dh49uOLYHC9foDmedQ");
