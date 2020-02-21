exports.commandName = 'log';

exports.command = (stringArgs) => {
  console.log('Called log command');
  console.log(stringArgs);
};
