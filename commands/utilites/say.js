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
		await message.delete()
        const sayembed = this.client.util.embed()
        	.setTitle(`${message.author.tag} Say's`)
			.setDescription(args.message)
        	.setTimestamp()
        	.setFooter(`${this.client.user.tag}`);

        if (!args.message) {
            return message.util.send(`${message.author}, Please specify something to say through me.`).then(m => m.delete({timeout: 5000}));
        }
        await message.util.send(sayembed)
	}
}

module.exports = SayCommand;
