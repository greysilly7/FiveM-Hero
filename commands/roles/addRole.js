// This is what we are doing it provides us with auto-completeion and a base (this is needed)
const { Command } = require('discord-akairo');

class AddRoleCommand extends Command {
    constructor() {
        // this is the command name it is assigned when loaded
        super('addRole', {
            // aliases must also include the command name aliases is just the possible ways to execute teh command
            aliases: ['addrole', 'roleadd'],
		    category: 'roles',
			args: [
				{
					id: 'member',
					type: 'member',
                },
                {
                    id: 'roleid',
                    type: 'string',
                }
			],
			clientPermissions: ['SEND_MESSAGES', 'MANAGE_ROLES'],
			userPermissions: ['MANAGE_ROLES'],
			description: {
				content: 'Adds a role to a user',
				usage: '!addrole',
				examples: ['!addrole @M3Owner2006#0572 754491339776851970']
			}
        });
    }

    // Here we put what code we want it to actually execute
	async exec(message, args) {
		await message.delete();
		if (message.member.roles.cache.has('754485247160221867')){

			if (!args.member) {
				return message.reply('You need to specify a user to add a role to.').then(m => m.delete({timeout: 5000}));
			}
				
			if (!args.roleid) {
				return message.reply('You need to specify a role to add.').then(m => m.delete({timeout: 5000}));
            }

            if (!message.guild.roles.cache.get(`${args.roleid}`)) {
				return message.reply(`I can\'t add that role because that role id, ${args.roleid}, does not exist.`).then(m => m.delete({timeout: 5000}));
			}
                
            const hasroleEmbed = this.client.util.embed()
            	.setThumbnail('https://media.discordapp.net/attachments/754507634996019233/759716404638908426/scteamspeak.png')
            	.addField('I can\'t add this role.', `I can\'t add <@&${args.roleid}> to ${args.member} because they already have that role.`)
				.setColor('RED');

            if (args.member.roles.cache.has(args.roleid)) {
                return message.util.send(hasroleEmbed)
            }

			const removeroleEmbed = this.client.util.embed()
				.setTitle('Adding Role')
				.setThumbnail('https://media.discordapp.net/attachments/754507634996019233/759716404638908426/scteamspeak.png')
				.addField('Added to:', `${args.member}`, true)
				.addField('Added By:', message.author, true)
				.addField('Role Added: ', `<@&${args.roleid}>`, true )
				.setColor('GREEN');
                
            if (!args.member.roles.cache.has(args.roleid)) {
                await args.member.roles.add(args.roleid);
                await message.util.send(removeroleEmbed);
			}
		}
    }
}
// Here we export it so we can access the code and load it
module.exports = AddRoleCommand;
