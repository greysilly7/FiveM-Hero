const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js')
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
		message.delete()
		if (!message.channel.id === '754508050471059567') {
			message.util.send('No').then(m => m.delete({timeout: 10000}))
		};
		const user = await getUser(message.author.id)
		// console.log(await getUser(message.author.id));
        const tsembed = new MessageEmbed();
		tsembed.setTitle(`${message.author.tag}'s Trustscore`);
		tsembed.setFooter(`${this.client.user.tag}`);
		tsembed.setTimestamp();
		tsembed.addField('Ways to loose trust score:', '`Warnings: 2%` `Kick: 5%` `Ban: 10%`');
		tsembed.addField('Ways to gain trustscore', '`1 Hour of Playtime: 1%` `Commend: 5%`');
		tsembed.addField('Steam Name:', `\`\`${user.name}\`\``);
		tsembed.addField('Trustscore:', `\`\`${user.trustscore}%\`\``);
		tsembed.setThumbnail(message.author.displayAvatarURL());
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
    const userInfo = await fetch(`https://dev.fivempanel.com/api/v2/external/user?key=W3W9VQJQ2GDG3MKB6BXF&com=0F027EF40A7C1A671DAE8CD711AC835A&id=discord:${userID}`);
    let json = await userInfo.json();
    return json.data.user;
    // if(typeof(userInfo) === null) return 0
    // return userInfo;
}