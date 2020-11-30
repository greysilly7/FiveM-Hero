// This is what we are doing it provides us with auto-completeion and a base (this is needed)
const { Command } = require('discord-akairo');

class RemoveRoleCommand extends Command {
    constructor() {
        // this is the command name it is assigned when loaded
        super('rmRole', {
            // aliases must also include the command name aliases is just the possible ways to execute teh command
            aliases: ['removerole', 'roleremove'],
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
				content: 'Romves a role from a user',
				usage: '!removerole',
				examples: ['!removerole @M3Owner2006#0572 754491339776851970']
			}
        });
    }

    // Here we put what code we want it to actually execute
	async exec(message, args) {
		await message.delete();
	
			if (!args.member) {
				return message.reply('You need to specify a user to remove a role from.');
			}
			
			if (!args.roleid) {
				return message.reply('You need to specify a role to remove.')
			}
			if (!message.guild.roles.cache.get(`${args.roleid}`)) {
				return message.reply(`I can\'t remove that role because that role id, ${args.roleid}, does not exist.`)
			}

			const hasroleEmbed = this.client.util.embed()
            	.setThumbnail('https://media.discordapp.net/attachments/754507634996019233/759716404638908426/scteamspeak.png')
            	.addField('I can\'t remove this role.', `I can\'t remove <@&${args.roleid}> from ${args.member} becuase they don\'t have that role.`)
            	.setColor('RED');

            if (!args.member.roles.cache.has(args.roleid)) {
                return message.util.send(hasroleEmbed)
			}
				
			const removeroleEmbed = this.client.util.embed()
				.setTitle('Removing Role')
				.setThumbnail('https://media.discordapp.net/attachments/754507634996019233/75971640468908426/scteamspeak.png')
				.addField('Removed From:', `${args.member}`, true)
				.addField('Removed By:', message.author, true)
				.addField('Role Removed: ', `<@&${args.roleid}>`, true )
				.setColor('RED');
				
			if (args.member.roles.cache.has(args.roleid)) {
				await args.member.roles.remove(args.roleid);
				await message.util.send(removeroleEmbed);
			}
        }
    }

// Here we export it so we can access the code and load it
module.exports = RemoveRoleCommand;