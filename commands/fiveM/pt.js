const { Command } = require('discord-akairo');
const fetch = require('node-fetch');
const { promisify } = require('util')
promisify(fetch)
 // const { getUser } = require('../../libaries/fiveMPanelAPI');

class PlayTimeCommand extends Command {
	constructor() {
		super('pt', {
			aliases: ['pt'],
            category: 'fivem',
            args: [
                {
                    id: 'member',
                    type: 'member',
                }
            ],
			clientPermissions: ['SEND_MESSAGES'],
			description: {
				content: 'Fetches your PlayTime',
				usage: '!steam',
				examples: ['!steam @Greysilly7']
			}
		});
	}

	async exec(message, args) {
        await message.delete()
            if(args.member === null || args.member === undefined) {
                const user0 = await getUser(message.author.id)
                // console.log(await getUser(message.author.id));
                const embed = this.client.util.embed()
                    .setTitle(`${args.member.nickname}'s Information`)
                    .setFooter(`${this.client.user.tag}`)
                    .setTimestamp()
                    .addField('Minutes:', `\`\`${user0.playtime}\`\``)
                    .addField('Hours:', `\`\`${user0.steam}%\`\``)
                    .addField('Last Played:', `\`\`${user0.discord}\`\``)
                    .setThumbnail(message.author.displayAvatarURL());
                return message.util.send(embed);
            } else {
            const user1 = await getUser(args.member.id);
            const embed = this.client.util.embed()
                .setTitle(`${args.member.nickname}'s Information`)
                .setFooter(`${this.client.user.tag}`)
                .setTimestamp()
                .addField('Minutes:', `\`\`${user1.playtime}\`\``)
                .addField('Hours:', `\`\`${user1.steam}%\`\``)
                .addField('Last Played:', `\`\`${user1.discord}\`\``)
                .setThumbnail(message.author.displayAvatarURL());
            return message.util.send(embed)
        } 
	}
}

module.exports = PlayTimeCommand;

const getUser = async (userID) => {
    const userInfo = await fetch(`https://dev.fivempanel.com/api/v2/external/user?key=34GXCRPDWPJ63A3U9EW8WD&com=46C4A71648F21EC3D4DA5CE46C8EAB94&id=discord:${userID}`);
    let json = await userInfo.json();
    return json.data.user;
}