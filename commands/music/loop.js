const { Command } = require('discord-akairo');

class LoopCommand extends Command {
	constructor() {
		super('loop', {
			aliases: ['loop'],
			category: 'music',
			clientPermissions: ['SEND_MESSAGES', 'SPEAK'],
			description: {
				content: 'Loops curretnly playing music',
				usage: '!loop',
				examples: ['!loop']
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

        if (!serverQueue) {
            embed.setAuthor('There is nothing playing that i could loop');
            return message.util.send(embed);
        }

        // OOOOF
        serverQueue.loop = !serverQueue.loop;


        // eslint-disable-next-line max-len
        embed.setDescription(`Loop is now **${serverQueue.loop ? 'Enabled' : 'Disabled'}**`);
        embed.setThumbnail(this.client.user.displayAvatarURL());
        message.util.send(embed);
	}
}

module.exports = LoopCommand;
