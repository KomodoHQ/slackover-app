exports.parse = (messageObject) => {

  if (!messageObject || !messageObject.message) {
    return false;
  }

  if (!messageObject.message.startsWith("/")) {
    return false;
  }

  const commandRegex = /\/([a-zA-Z]+)\s(.*)?/g;
  const matches = commandRegex.exec(messageObject.message);

  if (!matches) {
    return false;
  }

  const structuredCommand = {
    command: matches[1],
    stringArgs: matches[2],
  };

  return structuredCommand;
};