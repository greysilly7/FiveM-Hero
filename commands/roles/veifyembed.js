const { Command } = require('discord-akairo');

class VerifyEmbedCommand extends Command {
    constructor() {
        super('verifyembed', {
            aliases: ['verifyembed'],
            category: 'roles',
            clientPermissions: ['SEND_MESSAGES'],
        });
    }

    async exec(message, args) {
        message.delete()
        if (message.member.roles.cache.has('754474630953304116')) {
            const suggestEmbed = this.client.util.embed()
                .setTitle(`Verify`)
                .setDescription('Please read all the server rules, rules found in \`❕server-information\`.')
                .addField('After reading the rules:', 'Please sign up for the CAD in \`❕server-information\`.‎‎‎‎‎‎‏‏‎')
                .addField('After signing up for the CAD:', 'You can now verify, to verify please type \`!verify\` below.')
                .setImage('https://media.discordapp.net/attachments/754507634996019233/759716404638908426/scteamspeak.png')
                .setColor('GREEN');
            message.guild.channels.cache.get('778014642307727360').send(suggestEmbed)
        } else {
            return message.util.send(`Sorry ${message.author}, you do not have the permission to run this command!`);
        }
    }
}

module.exports = VerifyEmbedCommand;