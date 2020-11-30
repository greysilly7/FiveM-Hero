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
            category: 'admin',
            lock: true
        });
    }

    async exec(message, args) {
        await message.delete();
            if (!message.member.roles.cache.has('754474630953304116')) return message.util.send(`Sorry ${message.author}, you do not have the permission to run this command!`);
                message.guild.channels.cache.get('754504502815621191').send(`Server is shutting down. (${message.author.tag})`);
        }
    }

module.exports = StopCommand;