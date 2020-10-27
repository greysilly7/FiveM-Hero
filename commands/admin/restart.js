const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js')
const { settings } = require('../../config.json')

class RestartCommand extends Command {
    constructor() {
        super('restart', {
           aliases: ['r'],
           channel: 'guild',
        description: {
            content: 'Shows the server restarting status',
            usage: '!r',
            examples: ['!r']
        },
        category: 'admin'
        });
    }

    async exec(message, args) {
        message.delete();
            if (message.member.guild.roles.cache.has('754474630953304116')) {
                    message.guild.channels.cache.get('754504502815621191').send(`<@&754491317412823050> Server is restarting. (${message.author.tag})`);
            } else {
                return message.channel.send(`Sorry ${message.author}, you do not have the permission to run this command!`);
            }
        }
    }

module.exports = RestartCommand;