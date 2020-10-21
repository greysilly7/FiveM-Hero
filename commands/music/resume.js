const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');

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
        const embed = new MessageEmbed();
        const {channel} = message.member.voice;
        if (!channel) {
            // IF AUTHOR IS NOT IN VOICE CHANNEL
            embed.setAuthor('YOU NEED TO BE IN VOICE CHANNEL :/');
            return message.channel.send(embed);
        }

        const serverQueue = message.client.queue.get(message.guild.id);
        if (serverQueue && !serverQueue.playing) {
            serverQueue.playing = true;
            serverQueue.connection.dispatcher.resume();
            embed.setAuthor('✅ | Resumed the Paused Song');
            embed.setThumbnail(this.client.user.displayAvatarURL());
            return message.channel.send(embed);
        }
        embed.setDescription('There is nothing paused that i can resume');
        message.channel.send(embed);
    }
}

module.exports = ResumeCommand;
