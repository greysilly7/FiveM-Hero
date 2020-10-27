// This is what we are doing it provides us with auto-completeion and a base (this is needed)
const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');

class AddRoleCommand extends Command {
    constructor() {
        // this is the command name it is assigned when loaded
        super('addRole', {
            // aliases must also include the command name aliases is just the possible ways to execute teh command
            aliases: ['addrole', 'roleadd'],
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
				content: 'Adds a role to a user',
				usage: '!addrole',
				examples: ['!addrole @M3Owner2006#0572 754491339776851970']
			}
        });
    }

    // Here we put what code we want it to actually execute
	async exec(message, args) {
		message.delete();
		const allowedRoles = ['754485247160221867']
			if (!allowedRoles.some(id => message.member.roles.cache.has(id))) return message.channel.send(`Sorry ${message.author}, you don\'t have the permissions to use that command.`);
				if (!message.guild.channel.cache.get('754506290142904350')) return message.reply('No')
				
				if (!args.member) {
					return message.reply('You need to specify a user to add a role to.');
				}
				
				if (!args.roleid) {
					return message.reply('You need to specify a role to add.')
                }

                if (!message.guild.roles.cache.get(`${args.roleid}`)) {
					return message.reply(`I can\'t add that role because that role id, ${args.roleid}, does not exist.`)
				}
                
                const hasroleEmbed = new MessageEmbed();
                hasroleEmbed.setThumbnail('https://media.discordapp.net/attachments/754507634996019233/759716404638908426/scteamspeak.png');
                hasroleEmbed.addField('I can\'t add this role.', `I can\'t add <@&${args.roleid}> to ${args.member} becuase they already have that role.`);
                hasroleEmbed.setColor('RED');

                if (args.member.roles.cache.has(args.roleid)) {
                    return message.channel.send(hasroleEmbed)
                }

				const removeroleEmbed = new MessageEmbed();
				removeroleEmbed.setTitle('Adding Role');
				removeroleEmbed.setThumbnail('https://media.discordapp.net/attachments/754507634996019233/759716404638908426/scteamspeak.png')
				removeroleEmbed.addField('Added to:', `${args.member}`, true);
				removeroleEmbed.addField('Added By:', message.author, true);
				removeroleEmbed.addField('Role Added: ', `<@&${args.roleid}>`, true );
				removeroleEmbed.setColor('GREEN');
                
                if (!args.member.roles.cache.has(args.roleid)) {
                    args.member.roles.add(args.roleid);
                    message.channel.send(removeroleEmbed);
                }
        }
    }

// Here we export it so we can access the code and load it
module.exports = AddRoleCommand;
