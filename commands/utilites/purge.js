const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');

class PurgeCommand extends Command {
	constructor() {
		super('purge', {
			aliases: ['purge', 'clear'],
			category: 'utility',
			args: [
				{
					id: 'clearamount',
					type: 'string',
				}
			],
			clientPermissions: ['SEND_MESSAGES'],
			description: {
				content: 'Purges/Clears up to 100 messages at a time.',
				usage: '!purge',
				examples: ['!purge 100']
			}
		});
	}

	async exec(message, args) {
		message.delete()
        const allowedRoles = ['754478736606363699']
        if (!allowedRoles.some(id => message.member.roles.cache.has(id))) return message.reply('You don\'t have the permissions to use that command.');
        let deleteCount = args.clearamount;
        if (!deleteCount || deleteCount < 2 || deleteCount > 100) {
            return message.reply('Please provide a number between 2 and 100 for the number of messages to delete');
          }
          // So we get our messages, and delete them. Simple enough, right?
          const fetched = await message.channel.messages.fetch({limit: deleteCount});
          message.channel.bulkDelete(fetched)
              .catch((error) => message.reply(`Couldn't delete messages because of: ${error}`));
	}
}

module.exports = PurgeCommand;
