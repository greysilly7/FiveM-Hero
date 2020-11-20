const { Command } = require('discord-akairo');

class PingCommand extends Command {
	constructor() {
		super('ping', {
			aliases: ['ping'],
			category: 'utility',
			args: [
				{
					id: 'lazyping',
					type: 'string',
				}
			],
			clientPermissions: ['SEND_MESSAGES'],
			description: {
				content: 'Ping the bot',
				usage: '',
				examples: ['']
			}
		});
	}

	async exec(message, args) {
		message.delete()
		if (args.lazyping) return message.util.send('Ping him yourself you lazy ass.');
		return message.util.reply('Pong!').then(sent => {
			const timeDiff = (sent.editedAt || sent.createdAt) - (message.editedAt || message.createdAt);
			const text = `🔂\u2000**RTT**: ${timeDiff} ms\n💟\u2000**Heartbeat**: ${Math.round(this.client.ws.ping)} ms`;
			return message.util.reply(`Pong!\n${text}`).then(m => m.delete({timeout: 10000}));
		});
	}
}

module.exports = PingCommand;
