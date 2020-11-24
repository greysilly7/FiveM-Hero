const { Command } = require('discord-akairo');

class VolumeCommand extends Command {
	constructor() {
		super('volume', {
			aliases: ['volume'],
			category: 'music',
			clientPermissions: ['SPEAK', 'SEND_MESSAGES'],
			description: {
				content: 'Sets the volume of the music currently playing.',
				usage: '!volume <0-200>',
				examples: ['!volume <0-200>']
            },
            args: [
                {
                    id: 'volume',
                    type: 'number'
                }
            ]
		});
	}

	async exec(message, args) {
        /*
        if (!message.member.hasPermission('ADMINISTRATOR')) {
            // eslint-disable-next-line max-len
            if (message.author.id === '296042121297788931') break;
            return message.channel.send('You are not allowed to change the volume of the music');
        }
        */
        const embed = this.client.util.embed();
        const {channel} = message.member.voice;
        if (!channel) {
          // IF AUTHOR IS NOT IN VOICE CHANNEL
          embed.setAuthor('YOU NEED TO BE IN VOICE CHANNEL :/');
          return message.util.send(embed);
        }
        const serverQueue = this.client.queue.get(message.guild.id);
        if (!serverQueue) {
            embed.setAuthor('Bot is not playing anything');
            return message.util.send(embed);
        }
        if (!args.volume) {
            embed.setAuthor(`The Current Volume is ${serverQueue.volume}`);
            return message.util.send(embed);
          }
        
          if (isNaN(args.volume)) {
            embed.setAuthor('Please Use Numerical Values Only');
            return message.util.send(embed);
          }
        
          if (args.volume > 200) {
            embed.setAuthor('You will die if you reach the limit of 200 :)');
            return message.util.send(embed);
          }
        
          serverQueue.volume = args.volume;
          serverQueue.connection.dispatcher.setVolumeLogarithmic(args.volume / 100);
          embed.setDescription(`Set Volume to ${args.volume}`);
          embed.setThumbnail(this.client.user.displayAvatarURL());
          message.util.send(embed);
    }
}

module.exports = VolumeCommand;
