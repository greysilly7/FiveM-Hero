// This is what we are doing it provides us with auto-completeion and a base (this is needed)
const { Command } = require('discord-akairo');
const { settings } = require('../../config.json');

class InviteCommand extends Command {
    constructor() {
        // this is the command name it is assigned when loaded
        super('invite', {
            // aliases must also include the command name aliases is just the possible ways to execute teh command
           aliases: ['discord-invite'],
           clientPermissions: ['SEND_MESSAGES'],
           description: {
               content: 'Gives a permanent invite to the server.',
               usage: '',
               examples: ['']
           }
        });
    }

    // Here we put what code we want it to actually execute
    async exec(message) {
        const embed = this.client.util.embed()
            .setAuthor(`${this.client.user.tag}`).setTitle(`Here is a invite to the discord server: ${settings.invite}.`);
        await message.delete();
        return message.util.send(embed);
    }
}

// Here we export it so we can access the code and load it
module.exports = InviteCommand;