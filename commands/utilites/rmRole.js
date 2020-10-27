// This is what we are doing it provides us with auto-completeion and a base (this is needed)
const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');

class RemoveRoleCommand extends Command {
    constructor() {
        // this is the command name it is assigned when loaded
        super('rmRole', {
            // aliases must also include the command name aliases is just the possible ways to execute teh command
            aliases: ['removerole', 'roleremove'],
		    category: 'utility',
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
			description: {
				content: 'Romves a role from a user',
				usage: '!removerole',
				examples: ['!removerole @M3Owner2006#0572 754491339776851970']
			}
        });
    }

    // Here we put what code we want it to actually execute
	async exec(message, args) {
		message.delete();
		const allowedRoles = ['754485247160221867']
			if (!allowedRoles.some(id => message.member.roles.cache.has(id))) return message.channel.send(`Sorry ${message.author}, you don\'t have the permissions to use that command.`);
				if (!args.member) {
					return message.reply('You need to specify a user to remove a role from.');
				}
				
				if (!args.roleid) {
					return message.reply('You need to specify a role to remove.')
				}

				if (!message.guild.roles.cache.get(`${args.roleid}`)) {
					return message.reply(`I can\'t remove that role because that role id, ${args.roleid}, does not exist.`)
				}

				const hasroleEmbed = new MessageEmbed();
                hasroleEmbed.setThumbnail('https://media.discordapp.net/attachments/754507634996019233/759716404638908426/scteamspeak.png');
                hasroleEmbed.addField('I can\'t remove this role.', `I can\'t remove <@&${args.roleid}> from ${args.member} becuase they don\'t have that role.`);
                hasroleEmbed.setColor('RED');

                if (!args.member.roles.cache.has(args.roleid)) {
                    return message.channel.send(hasroleEmbed)
				}
				
				const removeroleEmbed = new MessageEmbed();
				removeroleEmbed.setTitle('Removing Role');
				removeroleEmbed.setThumbnail('https://media.discordapp.net/attachments/754507634996019233/759716404638908426/scteamspeak.png')
				removeroleEmbed.addField('Removed From:', `${args.member}`, true);
				removeroleEmbed.addField('Removed By:', message.author, true);
				removeroleEmbed.addField('Role Removed: ', `<@&${args.roleid}>`, true );
				removeroleEmbed.setColor('RED');
				
				if (args.member.roles.cache.has(args.roleid)) {
					args.member.roles.remove(args.roleid);
					message.channel.send(removeroleEmbed);
				}
        }
    }

// Here we export it so we can access the code and load it
module.exports = RemoveRoleCommand;
