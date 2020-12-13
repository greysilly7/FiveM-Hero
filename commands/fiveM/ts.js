const { Command } = require('discord-akairo');
const fetch = require('node-fetch');
const { promisify } = require('util')
promisify(fetch)

class TrustscoreCommand extends Command {
	constructor() {
		super('trustscore', {
			aliases: ['trustscore', 'ts'],
			category: 'fivem',
			clientPermissions: ['SEND_MESSAGES'],
			description: {
				content: 'Finds your Trustscore',
				usage: '!trustscore',
				examples: ['!trustscore']
			}
		});
	}

	async exec(message) {
		await message.delete();

		const user = await getUser(message.author.id);

		const tsembed = this.client.util.embed()
			.setTitle(`${message.author.tag}'s Trustscore`)
			.setFooter(`${this.client.user.tag}`)
			.setTimestamp()
			.addField('Ways to loose trust score:', '`Warnings: 2%` `Kick: 5%` `Ban: 10%`')
			.addField('Ways to gain trustscore', '`1 Hour of Playtime: 1%` `Commend: 5%`')
			.addField('Steam Name:', `\`\`${user.user.name}\`\``)
			.addField('Trustscore:', `\`\`${user.user.trustscore}%\`\``)
			.setThumbnail(message.author.displayAvatarURL());

		if (user.user.trustscore > 90 && user.commends.length > 1 && !message.member.roles.cache.has('784258845228662814')) {
			message.member.roles.add('784258845228662814')
			return message.util.send(this.client.util.embed().setTitle('Congratulations!').setDescription('You have earned Civillian II'));
		} else return message.util.send(tsembed).then(m => m.delete({timeout: 15000}));
	}
}

module.exports = TrustscoreCommand;

const getUser = async (userID) => {
	const userInfo = await fetch(`https://dev.fivempanel.com/api/v2/external/user?key=34GXCRPDWPJ63A3U9EW8WD&com=46C4A71648F21EC3D4DA5CE46C8EAB94&id=discord:${userID}`);
	let json = await userInfo.json();
	return json.data;
}