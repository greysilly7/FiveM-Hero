const { Command } = require('discord-akairo');

class GiveawayCommand extends Command {
	constructor() {
		super('giveaway', {
			aliases: ['ga'],
			category: 'giveaway',
			args: [
				{
					id: 'time',
					type: 'number',
					default: 36000000,
				},
				{
					id: 'content',
					type: 'string',
					match: 'rest',
				}
			],
			clientPermissions: ['SEND_MESSAGES', 'ADD_REACTION'],
			description: {
				content: 'Set up a giveaway',
				usage: '!ga',
				examples: ['!ga Discord Nitro']
			}
		});
	}

	async exec(message, args) {
		message.delete()
		if (!message.member.guild.roles.cache.has('770406007482220634')) return message.channel.send(`Sorry ${message.author}, you do not have the permission to run this command!`);
            const giveawayEmbed = this.client.util.embed()
            	.setTitle(`New Giveaway by: ${message.author.tag}`)
            	.setThumbnail('https://memberpress.com/wp-content/uploads/2020/04/male-hand-holding-megaphone-with-giveaway-speech-bubble-loudspeaker-vector-id1197835447-1024x576.jpg')
            	.setColor('GREEN')
				.addField('Giveaway Description', args.content)
				.addField('Time Left:', args.time)
            	.setFooter('To enter the giveaway, press the 🎁 below.');
            message.guild.channels.cache.get('770358236485255168').send(giveawayEmbed).then(message.guild.channels.cache.get('770358236485255168').send('<@&770407237441159208> A New giveaway has been made.')).then(async (message) => {
				await message.react('🎁');
				const filter = (reaction, user) => reaction.emoji.name === '🎁'
				const collector = message.awaitReactions(filter, { time: args.time });
				collector.on('collect', async (reaction, user) => {
					await this.client.entries.push(user.id);
				});
				collector.on('end', collected => {
					let rand = Math.floor(Math.random() * this.client.entries.length);
					let winner = this.client.entries[rand]
					winner = message.guild.members.cache.find((name) => name.id === winner.id)
					const winnerEmbed = this.client.util.embed()
						.setThumbnail(winner.avatarURL)
						.addField('Winner: ', winner)
						.addField(winner, ',won: ', args.content);
					message.guild.channels.cache.get('770358236485255168').send(winnerEmbed);
					
				});
			});
	}
}

module.exports = GiveawayCommand;
