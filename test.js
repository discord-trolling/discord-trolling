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
  token: "your token here",
  clientId: "your application id here",
  guildId: "your guild id here",
  isGuildCommand: true,
}).catch((err) => console.error(err));

let bot = new Client({ intents: [Intents.FLAGS.GUILDS] });

const commandHandler = new CommandHandler({
  path: __dirname + "/commands",
  client: bot,
});

commandHandler.startHandling();

//if you want classic handling
bot.on("interactionCreate", (interaction) => {
  if (interaction.commandName === "pong") console.log("interaction recieved");
});

bot.troll("your token here");
