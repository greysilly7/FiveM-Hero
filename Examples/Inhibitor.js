// This is what we are doing it provides us with auto-completeion and a base (this is needed)
const { Inhibitor } = require('discord-akairo');

class ExampleInhibitor extends Inhibitor {
    constructor() {
        // inhibitor name
        super('blacklist', {
            // reason for doing this
            reason: 'blacklist'
        })
    }

    // this is the actual code we want to execute
    exec(message) {
        // He's a meanie!
        const blacklist = ['81440962496172032'];
        return blacklist.includes(message.author.id);
    }
}

// Here we export it so we can access the code and load it
module.exports = ExampleInhibitor;