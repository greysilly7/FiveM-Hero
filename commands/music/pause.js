const { Command } = require('discord-akairo');

class PauseCommand extends Command {
	constructor() {
		super('pause', {
			aliases: ['pause'],
			category: 'music',
			clientPermissions: ['SPEAK', 'SEND_MESSAGES'],
			description: {
				content: 'Paues the currently playing music.',
				usage: '!pause',
				examples: ['!pause']
			}
		});
	}

	async exec(message, args) {
        const embed = this.client.util.embed();
        const {channel} = message.member.voice;
        if (!channel) {
            // IF AUTHOR IS NOT IN VOICE CHANNEL
            embed.setAuthor('YOU NEED TO BE IN VOICE CHANNEL :/');
            return message.util.send(embed);
          }
        const serverQueue = message.client.queue.get(message.guild.id);

        if (!serverQueue) {
            embed.setAuthor('There is nothing playing that i could pause');
            return message.util.send(embed);
        }
        
        if (serverQueue && serverQueue.playing) {
            serverQueue.playing = false;
            serverQueue.connection.dispatcher.pause(true);
        
            embed.setDescription('✅ | Paused The Current Playing Song');
            embed.setThumbnail(this.client.user.displayAvatarURL());
            return message.util.send(embed);
        }
	}
}

module.exports = PauseCommand;
