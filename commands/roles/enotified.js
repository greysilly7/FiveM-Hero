const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');

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
            const suggestEmbed = new MessageEmbed();
            suggestEmbed.setTitle(`Event Notifications`);
            suggestEmbed.setDescription('Do you want to be notified when we plan server events?');
            suggestEmbed.addField('If so, click the 🔔.', '‎‎‎‎‎‎‏‏‎ ');
            suggestEmbed.setImage('https://media.discordapp.net/attachments/754507634996019233/759716404638908426/scteamspeak.png');
            suggestEmbed.setColor('GREEN')
            message.guild.channels.cache.get('754502549624848565').send(suggestEmbed).then(async (message) => {
                await message.react('🔔');
            });
        } else {
            return message.channel.send(`Sorry ${message.author}, you do not have the permission to run this command!`);
        }
    }
}

module.exports = ENotifiedCommand;