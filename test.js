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

  let option2 = ping.createOption();

  option2.setName("paing");
  option2.setRequired(true);
  option2.setType(option2.types.STRING);
  option2.setDescription("paing");
  option2.setValue("paing");

  ping.finalizeOptions([option, option2]);

  return ping.troll();
};

console.log(JSON.stringify(command(), null, 2));

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
