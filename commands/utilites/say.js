const { Command } = require('discord-akairo');

class SayCommand extends Command {
	constructor() {
		super('say', {
			aliases: ['say'],
			category: 'utility',
			args: [
				{
					id: 'message',
					type: 'string',
				}
			],
			clientPermissions: ['SEND_MESSAGES'],
			description: {
				content: 'Make an embed with a custom message',
				usage: '!say',
				examples: ['!say test']
			}
		});
	}

	async exec(message, args) {
		message.delete()
        const sayembed = this.client.util.embed()
        	.setTitle(`${message.author.tag} Say's`);
        	sayembed.setDescription(args.message);
        	sayembed.setThumbnail('https://media.discordapp.net/attachments/759629923811065886/765087779016278016/scdiscord.png');
        	sayembed.setTimestamp();
        	sayembed.setFooter(`${this.client.user.tag}`)

        if (!args.message) {
            return message.util.send(`${message.auhtor}, Please specify something to say through me.`).then(m => m.delete({timeout: 5000}));
        }

        message.channel.send(sayembed)
	}
}

module.exports = SayCommand;
