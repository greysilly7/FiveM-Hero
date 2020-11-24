const { Command } = require('discord-akairo');

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
            return message.reply('Please state what you want to suggest.').then(m => m.delete({timeout: 5000}));
        }

        const suggestEmbed = this.client.util.embed()
            .setTitle(`${message.author.tag}'s Suggestion`)
            .addField('Suggestion:', args.suggest)
            .setFooter('✅ - Yes | ❌ No')
            .setTimestamp()
            .setThumbnail(message.author.displayAvatarURL());
        message.guild.channels.cache.get('754507734933569556').send(suggestEmbed).then(async (message) => {
            await message.react('✅');
            await message.react('❌');
        });
    }
}

module.exports = SuggestCommand;