// This is what we are doing it provides us with auto-completeion and a base (this is needed)
const { Command } = require('discord-akairo');
const { settings } = require('../../config.json');
const { MessageEmbed } = require('discord.js');

class InviteCommand extends Command {
    constructor() {
        // this is the command name it is assigned when loaded
        super('invite', {
            // aliases must also include the command name aliases is just the possible ways to execute teh command
           aliases: ['discord-invite'],
           clientPermissions: ['SEND_MESSAGES'],
           description: {
               content: 'Gives a permanet invite to the server.',
               usage: '',
               examples: ['']
           }
        });
    }

    // Here we put what code we want it to actually execute
    exec(message) {
        const embed = new MessageEmbed();
        embed.setAuthor(`${this.client.user.tag}`).setTitle(`Here is a invite to the discord server: ${settings.invite}.`).setThumbnail('https://cdn.discordapp.com/attachments/760853655192207381/768240668471590922/scdiscord.png');
        message.delete();
        return message.util.send(embed);
    }
}

// Here we export it so we can access the code and load it
module.exports = InviteCommand;