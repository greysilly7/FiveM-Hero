const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');

class DisconnectCommand extends Command {
	constructor() {
		super('disconnect', {
			aliases: ['disconnect', 'leave'],
			category: 'music',
			clientPermissions: ['SPEAK', 'SEND_MESSAGES'],
			description: {
				content: 'Disconnect\'s the bot to stop the music',
				usage: '!disconnect',
				examples: ['!disconnect']
			}
		});
	}

	async exec(message, args) {
        const embed = new MessageEmbed();
        const {channel} = message.member.voice;
        if (!channel) {
                    // IF AUTHOR IS NOT IN VOICE CHANNEL
                    embed.setAuthor('YOU NEED TO BE IN VOICE CHANNEL :/');
                    return message.util.send(embed);
        }
      
        const serverQueue = this.client.queue.get(message.guild.id);
      
        if (!serverQueue) {
                    embed.setAuthor('There is nothing playing that i could stop');
                    return message.util.send(embed);
        }
      
        serverQueue.songs = [];
        serverQueue.connection.dispatcher.end();
	}
}

module.exports = DisconnectCommand;
