const { Command } = require('discord-akairo');

class BanCommand extends Command {
    constructor() {
        super('ban', {
           aliases: ['ban'],
           channel: 'guild',
           args: [
            {
                id: 'member',
                type: 'member'
            },
            {
               id: 'reason',
               type: 'string',
               match: 'content'
            }
        ],
        description: {
            content: 'Bans a user',
            usage: 'ban {User} {reason}',
            examples: ['!ban @greysilly7 this is just a example calm down dude!']
        },
        category: 'admin'
        });
    }

    async exec(message, args) {
        const allowedRoles = ["754478524248752159", "754475345931141133", "754475146038870167", "754474630953304116"]
            if (allowedRoles.some(id => message.member.roles.cache.has(id))) {
                if (!args.member) {
                    return message.reply('Please mention a member of the server');
                  }
                  if (!args.member.bannable) {
                    return message.reply('I cannot ban this user! Do they have a higher role? Do I have ban permissions?');
                  }
                
                  if (!args.reason) reason = 'No reason provided';
                
                  await member.ban({reason: args.reason})
                      .catch((error) => message.reply(`Sorry ${message.author} I couldn't ban because of : ${error}`));
                  message.reply(`${member.user.tag} has been banned by ${message.author.tag} because: ${reason}`);
            } else {
                return message.channel.send(`Sorry <@${message.author.id}>, you do not have the permission to run this command!`);
            }
        }
    }

module.exports = BanCommand;