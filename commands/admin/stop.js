const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js')
const { settings } = require('../../config.json')

class StopCommand extends Command {
    constructor() {
        super('stop', {
           aliases: ['stop'],
           channel: 'guild',
        description: {
            content: 'Shows the server stoping status',
            usage: '!stop',
            examples: ['!stop']
        },
        category: 'admin'
        });
    }

    async exec(message, args) {
        message.delete();
            if (message.member.guild.roles.cache.has('754474630953304116')) {
                    message.guild.channels.cache.get('754504502815621191').send(`<@&754491317412823050> Server is shutting down. (${message.author.tag})`);
            } else {
                return message.channel.send(`Sorry ${message.author}, you do not have the permission to run this command!`);
            }
        }
    }

module.exports = StopCommand;