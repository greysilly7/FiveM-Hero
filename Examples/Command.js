// This is what we are doing it provides us with auto-completeion and a base (this is needed)
const { Command } = require('discord-akairo');

class ExampleCommand extends Command {
    constructor() {
        // this is the command name it is assigned when loaded
        super('ping', {
            // aliases must also include the command name aliases is just the possible ways to execute teh command
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

    // Here we put what code we want it to actually execute
	async exec(message, args) {
		if (args.lazyping) return message.channel.send('Ping him yourself you lazy ass');
		return message.util.reply('Pong!').then(sent => {
			const timeDiff = (sent.editedAt || sent.createdAt) - (message.editedAt || message.createdAt);
			const text = `🔂\u2000**RTT**: ${timeDiff} ms\n💟\u2000**Heartbeat**: ${Math.round(this.client.ws.ping)} ms`;
			return message.util.reply(`Pong!\n${text}`);
		});
	}
}

// Here we export it so we can access the code and load it
module.exports = ExampleCommand;