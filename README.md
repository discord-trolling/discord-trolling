# discord-trolling 👏

An easy to use discord.js wrapper for people who want to make Discord bots quickly

[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/J3J54IL17)

[![npm version](https://badge.fury.io/js/discord-trolling.svg)](https://badge.fury.io/js/discord-trolling)

<a href="https://gifyu.com/image/SSDPY"><img src="https://s10.gifyu.com/images/Peek-2022-01-04-17-04ab7aa7acdce6b994.gif" alt="Peek-2022-01-04-17-04ab7aa7acdce6b994.gif" border="0" height="500" width="600" /></a>

Create a new discord-trolling project:

```
npx create-discord-trolling-app
```

Read the docs:

https://ferretcode.gitbook.io/discord-trolling/

# Features 📄

- Easy to use, familiar API
- Fast to develop with
- Built in, easy command structuring
- Simple command registration
- Automatic project generator
- Custom CLI
- Documentation
- Simple plugin management
- Large & growing ecosystem of tools
- troll funni

# Acknowledgements 💌

- [doisoundlikeababy who helped me test in a production environment](https://github.com/doisoundlikeababy)

# Roadmap 🛣️

- ### Big Features
  - CLI Daemonization
  - Custom templates
  - Built-in HTTP or Webhook requests for logging
  - ~~Full documentation~~
  - Voice wrapper
  - Embed maker
  - Custom modal implementation
  - ~~Plugin management~~
  - ~~Built-in command handler~~
- ### Low priority
  - QOL features
  - Improved tests
- ### Not confirmed
  - Write Discord API wrapper from scratch
  - Desktop app

# Quickstart 💨

To get started, you can run: `npx create-discord-trolling-app`, (recommended)
Then, visit the documentation at https://ferretcode.gitbook.io/discord-trolling/

OR (unrecommended)

- Run `npm install discord-trolling`
- Create index.js
- Paste these contents inside:

```javascript
//import components from the library
const {
  Client,
  Intents,
  Manager,
  Command,
  OptionTypes,
} = require("discord-trolling");

//recommended format for creating command structures
let command = () => {
  //create command
  let ping = new Command();

  ping.setName("ping");
  ping.setDescription("ping");

  let option = ping.createOption();

  option.setName("ping");
  option.setRequired(true);
  option.setType(OptionTypes.STRING); //you can also do "option.types.STRING"
  option.setDescription("ping");
  option.setValue("ping");

  ping.finalizeOption(option);

  //finalize command structure
  return ping.troll();
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
let bot = new Client({ intents: [Intents.FLAGS.GUILDS] });

//listen for a command
bot.on("interactionCreate", (interaction) => {
  if (interaction.commandName === "pong") interaction.reply("pong");
});

//login (trollface)
bot.troll("your bot token");
```

- Create a new file at commands/ping.js

```javascript
const { Troll } = require("discord-trolling");

module.exports.ping = class extends Troll {
  constructor(interaction, client) {
    super(interaction, client);

    this.run = () => {
      this.interaction.reply("pong!");
    };
  }
};
```

# Running Tests 🧐

New tests coming soon

# Contributing 💻

Contributions are always welcome and great to see!

## You can either:

- Create your contribution, and make a PR
- Or join the Discord server at https://discord.gg/cvx9WS7V and ask what you can do

If you are adding a new class, please follow the UpperCamelCase naming convention.
