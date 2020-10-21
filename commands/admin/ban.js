const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js')
const { settings } = require('../../config.json')

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
               match: 'rest',
               default: 'No reason provided'
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
        message.delete();
        const allowedRoles = ["754478524248752159", "754475345931141133", "754475146038870167", "754474630953304116"]
            if (allowedRoles.some(id => message.member.roles.cache.has(id))) {
                if (!args.member) {
                    return message.reply('Please mention a member of the server');
                  }
                  if (!args.member.bannable) {
                    return message.reply('I cannot ban this user! Do they have a higher role? Do I have ban permissions?');
                  }
                                  
                  const StaffLogEmbed = new MessageEmbed;
                  StaffLogEmbed.setThumbnail(args.member.avatarURL);
                  StaffLogEmbed.setTitle('Staff Action:', 'Ban');
                  StaffLogEmbed.setAuthor('Banned by:', message.author);
                  StaffLogEmbed.addField('Member Banned', `${args.member.username}`)
                  StaffLogEmbed.addField('Ban Reason', `${args.reason}`);
                  const ChannelEmbed = new MessageEmbed;
                  ChannelEmbed.setThumbnail(args.member.avatarURL);
                  ChannelEmbed.setTitle('User Banned');
                  ChannelEmbed.setAuthor(`${args.member.username}`);
                  ChannelEmbed.addField('Ban Reason:', `\`\`${args.reason}\`\``);
                  ChannelEmbed.addField('Banned by:', message.author);

                  await args.member.ban({reason: args.reason})
                      .catch((error) => message.reply(`Sorry ${message.author} I couldn't ban because of : ${error}`));
                    
                    message.guild.channels.cache.get(settings.staffLogs).send(StaffLogEmbed);
                    message.channel.send(ChannelEmbed);
            } else {
                return message.channel.send(`Sorry <@${message.author.id}>, you do not have the permission to run this command!`);
            }
        }
    }

module.exports = BanCommand;