const { Command } = require('discord-akairo');

class ResumeCommand extends Command {
	constructor() {
		super('resume', {
			aliases: ['resume'],
			category: 'music',
			clientPermissions: ['SPEAK', 'SEND_MESSAGES'],
			description: {
				content: 'Resumes the currently playing music.',
				usage: '!resume',
				examples: ['!resume']
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

        const serverQueue = this.client.queue.get(message.guild.id);
        if (serverQueue && !serverQueue.playing) {
            serverQueue.playing = true;
            serverQueue.connection.dispatcher.resume();
            embed.setAuthor('✅ | Resumed the Paused Song');
            embed.setThumbnail(this.client.user.displayAvatarURL());
            return message.util.send(embed);
        }
        embed.setDescription('There is nothing paused that i can resume');
        message.util.send(embed);
    }
}

module.exports = ResumeCommand;
