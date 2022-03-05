const os = require("os");
const fs = require("fs");

/**
 * A class for managing your discord-trolling plugins
 * @class
 */
module.exports.PluginManager = class {
  /**
   * @constructor
   * @param {object} options the options for the PluginManager
   * @param {string} options.path the path to the plugins folder
   * @param {string[]} options.plugins the file names of the plugins to load
   */
  constructor(options) {
    this.path = options.path || `${os.homedir()}/discord-trolling/plugins`;
    this.plugins = options.plugins || [];

    /**
     * A function that loads all plugins
     * @function
     */
    this.loadPlugins = () => {
      const files = fs
        .readdirSync(this.path)
        .filter((file) => file.endsWith(".js") && this.plugins.includes(file));
      const modules = {};

      for (let file of files) {
        const moduleName = file.slice(0, file.lastIndexOf("."));
        const plugin = require(`${this.path}/${moduleName}`);

        plugin ? (modules[moduleName] = new plugin.Plugin()) : "";
      }

      for (let [pluginName, plugin] of Object.entries(modules)) {
        if (plugin.type)
          switch (plugin.type) {
            case "client":
              require("./client").Client[pluginName] = plugin;
              break;
            case "command":
              require("./command").Command[pluginName] = plugin;
              break;
            case "option":
              require("./command").Option[pluginName] = plugin;
              break;
            case "troll":
              require("./troll").Troll[pluginName] = plugin;
            case "manager":
              require("./manager").Manager[pluginName] = plugin;
            case "global":
              global[pluginName] = plugin;
              break;
          }
      }
    };
  }
};

const manager = new this.PluginManager({
  path: `${__dirname}/`,
  plugins: ["test.js"],
}).loadPlugins();
