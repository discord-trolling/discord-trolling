# discord-trolling 👏

An easy to use discord.js wrapper for people who thought V13 was too verbose.

[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/J3J54IL17)

## Features 📄

- Easy to use, familiar API
- Fast to develop with
- Built in, easy command structuring
- Simple command registration
- troll funni

## Acknowledgements 💌

- [JiggsFld who helped me test in a production environment](https://github.com/JiggsFld)

## Roadmap 🛣️

- ### Big Features
  - Built-in pm2 integration for easy hosting/monitoring
  - Built-in HTTP or Webhook requests for logging
  - Full documentation
- ### Low priority
  - QOL features
- ### Not confirmed

## Quickstart 💨

```javascript
//import components from the library
const { Client, Intents, Manager, Command } = require("discord-trolling");

//recommended format for creating command structures
let command = () => {
  //create command
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

  //finalize command structure
  ping = ping.troll();
};

//register command
//you can omit guildId if isGuildCommand is set to false
Manager.registerCommands([command()], {
  token: "your bot token",
  clientId: "your bot id",
  guildId: "your guild id",
  isGuildCommand: true,
}).catch((err) => console.error(err));

//create client
let bot = new Client({ intents: [client.Intents.FLAGS.GUILDS] });

//listen for a command
bot.on("interactionCreate", (interaction) => {
  if (interaction.commandName === "pong") interaction.reply("pong");
});

//login (trollface)
bot.troll("your bot token");
```

## Running Tests 🧐

To verify that the library is working, please open test.js and replace the "your bot token", "your bot id" and "your guild id" fields with the respective information, and run the file.

## Contributing 💻

Contributions are always welcome and great to see!

### You can either:

- Create your contribution, make a PR and hope a maintainer sees it.
- Or join the Discord server at https://discord.gg/cvx9WS7V and propose an idea to me or a maintainer or tell us about a PR you made.

If you are adding a new class, please follow the UpperCamelCase naming convention.
