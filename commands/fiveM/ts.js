const { Command } = require('discord-akairo');
const fetch = require('node-fetch');
const { promisify } = require('util')
promisify(fetch)
 // const { getUser } = require('../../libaries/fiveMPanelAPI');

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
		await message.delete()
		const user = await getUser(message.author.id)
		// console.log(await getUser(message.author.id));
		const tsembed = this.client.util.embed()
			.setTitle(`${message.author.tag}'s Trustscore`)
			.setFooter(`${this.client.user.tag}`)
			.setTimestamp()
			.addField('Ways to loose trust score:', '`Warnings: 2%` `Kick: 5%` `Ban: 10%`')
			.addField('Ways to gain trustscore', '`1 Hour of Playtime: 1%` `Commend: 5%`')
			.addField('Steam Name:', `\`\`${user.name}\`\``)
			.addField('Trustscore:', `\`\`${user.trustscore}%\`\``)
			.setThumbnail(message.author.displayAvatarURL());
		 if (user.trustscore > 85 && !message.member.roles.cache.has('754491302715850772')) {
			message.member.roles.add('754491302715850772').then(() => {
				return message.util.send(`${message.author} you have been whitelisted, CONGRATS!`)
			});
		}

		return message.util.send(tsembed).then(m => m.delete({timeout: 15000}));
	}
}

module.exports = TrustscoreCommand;

const getUser = async (userID) => {
	const userInfo = await fetch(`https://dev.fivempanel.com/api/v2/external/user?key=W3W9VQJQ2GDG3MKB6BXF&com=46C4A71648F21EC3D4DA5CE46C8EAB94&id=discord:${userID}`);
	let json = await userInfo.json();
	return json.data.user;
}