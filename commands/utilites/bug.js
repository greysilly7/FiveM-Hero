const { Command } = require('discord-akairo');

class BugCommand extends Command {
    constructor() {
        super('bug', {
            aliases: ['bug'],
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
                content: 'Put\'s a bug into the bugs channel',
                usage: '!bug',
                examples: ['!bug cars wont spawn']
            }
        });
    }

    async exec(message, args) {
        message.delete()

        if (!args.suggest) {
            return message.reply('Please state what you want to suggest.').then(m => m.delete({timeout: 5000}));
        }

        const suggestEmbed = this.client.util.embed()
            .setTitle(`${message.author.tag}'s Bug Report`)
            .addField('Bug:', args.suggest)
            .setFooter('✅ - Have seen this bug | ❌ - Have not seen this bug | 🙂 - Fixed')
            .setTimestamp()
            .setThumbnail(message.author.displayAvatarURL());
        message.guild.channels.cache.get('754507686321586277').send(suggestEmbed).then(async (message) => {
            await message.react('✅');
            await message.react('❌');
            await message.react('🙂');
        });
    }
}

module.exports = BugCommand;