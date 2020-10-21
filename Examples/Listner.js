// This is what we are doing it provides us with auto-completeion and a base (this is needed)
const { Listener } = require('discord-akairo');

class ExampleListener extends Listener {
    constructor() {
        // name that will be displayed when loaded
        super('ready', {
            // emitter is the thing that is creating the event here it is the client
            emitter: 'client',
            // event is the event we are wanting to be sent
            event: 'ready'
        });
    }

    // Here we put what code we want it to actually execute
    exec() {
        //this logs "I'm ready!" to the console
        console.log('I\'m ready!');
    }
}

// Here we export it so we can access the code and load it
module.exports = ExampleListener;