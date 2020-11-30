const { Command } = require('discord-akairo');
const { RoleManager } = require('discord.js');
const ms = require('ms')

class MuteCommand extends Command {
	constructor() {
		super('mute', {
			aliases: ['mute'],
			category: 'admin',
			args: [
				{
					id: 'member',
					type: 'member',
                },
                {
                    id: 'time',
                    type: 'number',
                }
			],
			clientPermissions: ['SEND_MESSAGES', 'MANAGE_ROLES', 'MANAGE_CHANNELS'],
			description: {
				content: 'Mute a member.',
				usage: '!mute',
				examples: ['!mute @M3']
			}
		});
	}

	async exec(message, args) {
		await message.delete()
        if (!message.member.guild.roles.cache.has('754478736606363699')) return message.util.send(`${message.author}, You don't have the permissions to use that command.`);
            
            if(!args.member){
                return message.util.send(`${message.author}, please specify a user to mute.`);
            }

            if(!args.time) {
                return message.util.send(`${message.author}, please specify an amount of time to mute someone.`);
            }
                
            await message.util.send(`${args.member} has been muted for ${ms(ms(args.time))}.`);
            let muteRole = message.guild.roles.cache.find(role => role.name === 'muted');
            if (!muteRole) {
                try {
                    muteRole = await message.guild.roles.create({
                        data: {
                            name: 'muted',
                            color: '#000000',
                          },
                          reason: 'Needed to mute someone and the roles was not here -FiveM-Hero',
                    });

                    message.guild.channels.cache.forEach( (channel) => {
                        channel.updateOverwrite(muterole, {
                          SEND_MESSAGES: false,
                          ADD_REACTIONS: false,
                        });
                      });
                } catch (e) {
                    console.log(e.stack);
                }
            }
            await(args.member.roles.add(muterole.id));
            
            setTimeout(async () => {
                await args.member.roles.add('754491333955158116');
                await args.member.roles.remove(muteRole.id);
                args.member.message.send('You Have been unmuted.');
            }, ms(args.time));
	}
}

module.exports = MuteCommand;