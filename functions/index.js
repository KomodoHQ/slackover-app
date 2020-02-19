const functions = require('firebase-functions');
const parseCommand = require('./src/parseCommand');
const importCommands = require('./src/importCommands');

exports.runCommand = functions.firestore.document('messages/{messageId}').onCreate(async (snapshot, context) => {
    
    const messageObject = snapshot.data();
    const commandObject = parseCommand.parse(messageObject);

    if (commandObject) {

        const commands = importCommands.import();

        if (commands[commandObject.command]){
            commands[commandObject.command](commandObject.stringArgs);
        }
        else {
            console.log('Unregistered command called', commandObject)
        } 
    }
});