const { Command } = require('discord-akairo');

class PurgeCommand extends Command {
	constructor() {
		super('purge', {
			aliases: ['purge', 'clear'],
			category: 'utility',
			args: [
				{
					id: 'clearamount',
					type: 'number',
				}
			],
			clientPermissions: ['SEND_MESSAGES'],
			userPermissions: ['MANAGE_MESSAGES'],
			description: {
				content: 'Purges/Clears up to 100 messages at a time.',
				usage: '!purge',
				examples: ['!purge 100']
			}
		});
	}

	async exec(message, args) {
        	let deleteCount = Math.floor(parseInt(args.clearamount));
        	if (!deleteCount || deleteCount < 2 || deleteCount > 100) {
            	return message.reply('Please provide a number between 2 and 100 for the number of messages to delete').then(m => m.delete({timeout: 5000}));
        	}
        	// So we get our messages, and delete them. Simple enough, right?
        	let fetched = await message.channel.messages.fetch({limit: deleteCount});
			message.channel.bulkDelete(fetched)
			return message.util.send(`Succesfully deleted ${deleteCount} messages.`).then(m => m.delete({timeout: 5000})).catch((error) => message.reply(`Couldn't delete messages because of: ${error}`));
	}
}

module.exports = PurgeCommand;