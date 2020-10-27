const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js')

class PingCommand extends Command {
	constructor() {
		super('trustscore', {
			aliases: ['trustscore'],
			category: 'fivem',
			args: [
				{
					id: 'user',
					type: 'id',
				}
			],
			clientPermissions: ['SEND_MESSAGES'],
			description: {
				content: 'Finds your Trustscore',
				usage: '!trustscore',
				examples: ['!trustscore']
			}
		});
	}

	async exec(message, args) {
		message.delete()
        const tsembed = new MessageEmbed
        tsembed.setTitle
	}
}

module.exports = PingCommand;
