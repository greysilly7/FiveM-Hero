const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');

class SuggestCommand extends Command {
    constructor() {
        super('suggest', {
            aliases: ['suggest'],
            category: 'utility',
            args: [
                {
                    id: 'suggest',
                    type: 'string',
                    match: 'rest'
                }
            ],
            clientPermissions: ['SEND_MESSAGES'],
            description: {
                content: 'Put\'s a suggestion into the Suggestion Channel',
                usage: '!suggest',
                examples: ['!suggest Add more cars']
            }
        });
    }

    async exec(message, args) {
        message.delete()

        if (!args.suggest) {
            return message.reply('Please state what you want to suggest.');
        }

        const suggestEmbed = new MessageEmbed();
        suggestEmbed.setTitle(`${message.author.tag} suggestion`);
        suggestEmbed.addField('Suggestion:', args.suggest);
        suggestEmbed.setFooter('✅ - Yes | ❌ No');
        suggestEmbed.setTimestamp();
        suggestEmbed.setThumbnail(message.author.displayAvatarURL());
        message.guild.channels.cache.get('754507734933569556').send(suggestEmbed).then(async (message) => {
            await message.react('✅');
            await message.react('❌');
        });
    }
}

module.exports = SuggestCommand;