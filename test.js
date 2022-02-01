const { Client, Intents } = require("./classes/client");
const { Manager } = require("./classes/manager");
const { Command } = require("./classes/command");
const { CommandHandler } = require("./classes/commandHandler");

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

  ping.finalizeOptions(option);

  return ping.troll();
};

Manager.registerCommands([command()], {
  token: "",
  clientId: "",
  guildId: "",
  isGuildCommand: true,
}).catch((err) => console.error(err));

let bot = new Client({ intents: [Intents.FLAGS.GUILDS] });

const commandHandler = new CommandHandler({
  path: __dirname + "/commands",
  client: bot,
});

commandHandler.startHandling();

bot.troll("token");
