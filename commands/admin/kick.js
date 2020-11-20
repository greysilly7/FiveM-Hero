const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js')
const { settings } = require('../../config.json')

class KickCommand extends Command {
    constructor() {
        super('kick', {
           aliases: ['kick'],
           channel: 'guild',
           args: [
            {
                id: 'member',
                type: 'member'
            },
            {
               id: 'reason',
               type: 'string',
               match: 'rest',
               default: 'No reason provided'
            }
        ],
        description: {
            content: 'Kicks a user',
            usage: 'kick {User} {reason}',
            examples: ['!kick @greysilly7 this is just a example calm down dude!']
        },
        category: 'admin'
        });
    }

    async exec(message, args) {
        message.delete();
        const allowedRoles = ['754478524248752159', '754475345931141133', '754475146038870167', '754474630953304116']
            if (allowedRoles.some(id => message.member.roles.cache.has(id))) {
                const member = message.mentions.members.first() || message.guild.members.cache.get(args.member);
                if (!member) {
                    return message.reply('Please mention a member of this server.');
                } else if (!member.kickable) {
                    return message.reply('I cannot kick this user! Do they have a higher role? Do I have kick permissions?'); 
                }
                
                // slice(1) removes the first part, which here should be the user mention or ID
                // join(' ') takes all the various parts to make it a single string.
                let reason = (args.reason);
                if (!reason) reason = 'No reason provided';
      
                // Now, time for a swift kick in the nuts!
                await member.kick(reason)
                    .catch((error) => message.reply(`Sorry ${message.author} I couldn't kick because of: ${error}`));
                message.util.send(`${member.user.tag} has been kicked by ${message.author} | Reason:  ${reason}`);
            } else {
                return message.util.send(`Sorry ${message.author}, you do not have the permission to run this command!`);
            }
    } 
}

module.exports = KickCommand;