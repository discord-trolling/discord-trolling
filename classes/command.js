/**
 * A class for generating slash commands
 * @class Command
 */
class Command {
  constructor() {
    /**
     * The command structure
     */
    this.json = {};

    /**
     * A class containing methods for generating slash command options
     * @class Option
     */

    /**
     * A function for generating a new command option
     * @returns {Option} a new option class instance
     */
    this.createOption = () => new Option();

    /**
     * A function that finalizes an option and adds it to the command structure
     * @param option a slash command option class
     */
    this.finalizeOption = (option) => {
      if (!option) throw SyntaxError("Missing parameter: option!");
      if (!(option instanceof Option))
        throw TypeError("Parameter: option is not an instance of Option!");

      if (!this.json.options) this.json.options = [];

      this.json.options.push(option.json);
    };

    /**
     * A function that adds multiple options to the command structure
     * @param  {...Option} options a list of command option classes
     */
    this.finalizeOptions = (...options) => {
      if (!options) throw SyntaxError("Missing parameter: options!");

      if (!Array.isArray(options))
        throw TypeError("Parameter: options is not an array!");

      if (options.some((o) => !o instanceof Option))
        throw TypeError(
          "An option in the options array is not an instance of the Option class!"
        );

      if (!this.json.options) this.json.options = [];

      options = options.flat();

      this.json.options.push(...options.map((option) => option.json));
    };

    /**
     * Set the name of a command
     * @param {string} name
     */
    this.setName = (name) => {
      if (typeof name !== "string")
        throw TypeError("The name argument must be of type string!");

      if (name.length > 50)
        throw RangeError("The name argument must not exceed 50 characters!");

      this.json.name = name;
    };

    /**
     * Set the description of a command
     * @param {string} description
     */
    this.setDescription = (description) => {
      if (typeof description !== "string")
        throw TypeError("The description argument must be of type string!");

      if (description.length > 200)
        throw RangeError(
          "The description argument must not exceed 200 characters!"
        );

      this.json.description = description;
    };

    /**
     * A function that returns the json command structure for registering commands
     * @returns {object} the command structure
     */
    this.troll = () => this.json;
  }
}

/**
 * A class for generating options for slash commands
 * @class Option
 */
class Option {
  constructor() {
    /**
     * The option structure
     */
    this.json = {};

    /**
     * An object containing identifiers for option command types
     */
    this.types = {
      SUB_COMMAND: 1,
      SUB_COMMAND_GROUP: 2,
      STRING: 3,
      INTEGER: 4,
      BOOLEAN: 5,
      USER: 6,
      CHANNEL: 7,
      ROLE: 8,
      MENTIONABLE: 9,
      NUMBER: 10,
    };

    /**
     * Sets the type of an option
     * @param {Number} type a number representing a command option
     */
    this.setType = (type) => {
      if (typeof type !== "number")
        throw TypeError("The type argument must be of type number!");

      if (!Object.values(this.types).includes(type))
        throw TypeError("The type argument is not a valid type!");

      this.json.type = type.toString();
    };

    /**
     * Set the name of an option
     * @param {string} name
     */
    this.setName = (name) => {
      if (typeof name !== "string")
        throw TypeError("The name argument must be of type string!");

      if (name.length > 50)
        throw RangeError("The name argument must not exceed 50 characters!");

      this.json.name = name;
    };

    /**
     * Set the description of an option
     * @param {string} description
     */
    this.setDescription = (description) => {
      if (typeof description !== "string")
        throw TypeError("The description argument must be of type string!");

      if (description.length > 200)
        throw RangeError(
          "The description argument must not exceed 200 characters!"
        );

      this.json.description = description;
    };

    /**
     * Set the value of an option
     * @param {string} value
     */
    this.setValue = (value) => {
      if (typeof value !== "string")
        throw TypeError("The value argument must be of type string!");

      if (value.length > 200)
        throw RangeError("The value argument must not exceed 200 characters!");

      this.json.value = value;
    };

    /**
     * A function that changes the required boolean in the command structure
     * @param {boolean} required a boolean representing if the option is required or not
     */
    this.setRequired = (required) => {
      if (typeof required !== "boolean")
        throw TypeError("The 'required' argument must be of type boolean!");

      this.json.required = required;
    };

    /**
     * Add a choice to an option
     * @param {object} options the options for the choice
     * @param {string} options.name the name of the choice
     * @param {string} options.description the description of the choice
     * @param {string} options.value the value of the choice
     *  @param {boolean} options.required a boolean representing if the option is required or not
     */
    this.addChoice = (options) => {
      if (typeof options !== "object")
        throw new TypeError("The options argument must be an object!");

      for (let option in options) {
        if (option !== "required" && typeof options[option] !== "string")
          throw new TypeError(`options argument ${option} is not a string!`);
      }

      if (options.required && typeof options.required !== "boolean")
        throw new TypeError(
          "The options.required argument must be of type boolean!"
        );

      if (!this.json.choices) this.json.choices = [];

      this.json.choices.push({
        name: options.name,
        description: options.description,
        value: options.value,
        required: options.required,
      });
    };
  }
}

module.exports = {
  Command,
  Option,
  OptionTypes: {
    SUB_COMMAND: 1,
    SUB_COMMAND_GROUP: 2,
    STRING: 3,
    INTEGER: 4,
    BOOLEAN: 5,
    USER: 6,
    CHANNEL: 7,
    ROLE: 8,
    MENTIONABLE: 9,
    NUMBER: 10,
  },
};
