const { Command } = require('discord-akairo');

class ENotifiedCommand extends Command {
    constructor() {
        super('enotified', {
            aliases: ['enotified'],
            category: 'roles',
            clientPermissions: ['SEND_MESSAGES', 'ADD_REACTIONS'],
        });
    }

    async exec(message, args) {
        message.delete()
        if (message.member.roles.cache.has('754474630953304116')) {
            const suggestEmbed = this.client.util.embed()
                .setTitle(`Event Notifications`)
                .setDescription('Do you want to be notified when we plan server events?')
                .addField('If so, click the 🔔.', '‎‎‎‎‎‎‏‏‎ ')
                .setImage('https://media.discordapp.net/attachments/754507634996019233/759716404638908426/scteamspeak.png')
                .setColor('GREEN');
            message.guild.channels.cache.get('754502549624848565').send(suggestEmbed).then(async (message) => {
                await message.react('🔔');
            });
        } else {
            return message.channel.send(`Sorry ${message.author}, you do not have the permission to run this command!`);
        }
    }
}

module.exports = ENotifiedCommand;