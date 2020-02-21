const fs = require("fs")

exports.import = () => {

  let loadedCommands = {};

  fs.readdirSync(__dirname + "/commands").forEach(function(file) {
    const newCommand = require("./commands/" + file);
    loadedCommands[newCommand.commandName] = newCommand.command;
  });

  return loadedCommands;
};