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
				content: 'Finds your the steam id of a user',
				usage: '!steam',
				examples: ['!steam @M3']
			}
		});
	}

	async exec(message, args) {
        message.delete()
        if (message.member.roles.cache.has('754485247160221867')){ 
		
            if(!args.member) {
                return message.reply('Please specify a user to find a steam id of.')
            }
		    const user = await getUser(args.member.id)
		    // console.log(await getUser(message.author.id));
            const tsembed = this.client.util.embed()
		        .setTitle(`${args.member.nickname}'s Information`)
		        .setFooter(`${this.client.user.tag}`)
		        .setTimestamp()
		        .addField('Minutes:', `\`\`${user.playtime}\`\``)
                .addField('Hours:', `\`\`${user.steam}%\`\``)
                .addField('Last Played:', `\`\`${user.discord}\`\``)
		        .setThumbnail(message.author.displayAvatarURL());
            return message.util.send(tsembed);
        
        } else {
            const user2 = await getUser(args.member.id)
            const ptembed = this.client.util.embed()
                .setTitle(`${message.author.tag}'s Playetime`)
                .setFooter(this.client.user.tag)
                .setTimestamp()
                .addField('Minutes:', `\`\`${user2.playtime}\`\``);
        } 
	}
}

module.exports = PlayTimeCommand;

const getUser = async (userID) => {
    const userInfo = await fetch(`https://dev.fivempanel.com/api/v2/external/user?key=W3W9VQJQ2GDG3MKB6BXF&com=0F027EF40A7C1A671DAE8CD711AC835A&id=discord:${userID}`);
    let json = await userInfo.json();
    return json.data.user;
}