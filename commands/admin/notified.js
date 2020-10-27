const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');

class NotifiedCommand extends Command {
    constructor() {
        super('notified', {
            aliases: ['notified'],
            category: 'admin',
            clientPermissions: ['SEND_MESSAGES', 'ADD_REACTIONS'],
        });
    }

    async exec(message, args) {
        message.delete()
        if (message.member.guild.roles.cache.has('754474630953304116')) {
            const suggestEmbed = new MessageEmbed();
            suggestEmbed.setTitle(`Notifications`);
            suggestEmbed.setDescription('Do you want to be notified when SCRP releases Announcements or Server Change\'s?');
            suggestEmbed.addField('If so, click the 🔔.');
            suggestEmbed.setImage('https://media.discordapp.net/attachments/754507634996019233/759716404638908426/scteamspeak.png');
            suggestEmbed.setColor('GREEN')
            message.guild.channels.cache.get('754502549624848565').send(suggestEmbed).then(async (message) => {
                await message.react('🔔');
                if (member.guild.message.react) {
                    member.roles.add('754491317412823050')
                };
                if (!member.guild.message.react){
                    member.roles.remove('754491317412823050')
                };
            });
        } else {
            return message.channel.send(`Sorry ${message.author}, you do not have the permission to run this command!`);
        }
    }
}

module.exports = NotifiedCommand;