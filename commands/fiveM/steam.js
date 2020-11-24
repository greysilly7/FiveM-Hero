const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js')
const fetch = require('node-fetch');
const { promisify } = require('util')
promisify(fetch)
 // const { getUser } = require('../../libaries/fiveMPanelAPI');

class SteamCommand extends Command {
	constructor() {
		super('steam', {
			aliases: ['steam'],
            category: 'fivem',
            args: [
				{
					id: 'member',
					type: 'member',
                }
            ],
			clientPermissions: ['SEND_MESSAGES'],
			description: {
				content: 'Finds your the steam id of a user',
				usage: '!steam',
				examples: ['!steam @M3']
			}
		});
	}

	async exec(message, args) {
        message.delete()
        if (!message.member.roles.cache.has('754485247160221867')){ 
			message.util.send(`Sorry ${message.author}, you don\'t have the permissions to use that command.`).then(m => m.delete({timeout: 5000}));
		};
        if(!args.member) {
            return message.reply('Please specify a user to find a steam id of.')
        }
		const user = await getUser(args.member.id)
		// console.log(await getUser(message.author.id));
        const tsembed = this.client.util.embed()
			.setTitle(`${args.member.nickname}'s Information`)
			.setFooter(`${this.client.user.tag}`)
			.setTimestamp()
			.addField('Steam Name:', `\`\`${user.name}\`\``)
        	.addField('Steam ID:', `\`\`${user.steam}%\`\``)
        	.addField('Discord ID:', `\`\`${user.discord}\`\``)
			.setThumbnail(message.author.displayAvatarURL());
		return message.util.send(tsembed).then(m => m.delete({timeout: 15000}));
	}
}

module.exports = SteamCommand;

const getUser = async (userID) => {
    const userInfo = await fetch(`https://dev.fivempanel.com/api/v2/external/user?key=W3W9VQJQ2GDG3MKB6BXF&com=0F027EF40A7C1A671DAE8CD711AC835A&id=discord:${userID}`);
    let json = await userInfo.json();
    return json.data.user;
    // if(typeof(userInfo) === null) return 0
    // return userInfo;
}