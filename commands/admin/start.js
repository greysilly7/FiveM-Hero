const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js')
const { settings } = require('../../config.json')

class StartCommand extends Command {
    constructor() {
        super('start', {
            aliases: ['start'],
            channel: 'guild',
            description: {
                content: 'Shows the server starting status',
                usage: '!start',
                examples: ['!start']
            },
            category: 'admin',
            lock: true
        });
    }

    async exec(message, args) {
        await message.delete();
            if (message.member.roles.cache.has('754474630953304116')) {
                    message.guild.channels.cache.get('754504502815621191').send(`Server is starting up. (${message.author.tag})`);
            } else {
                return message.util.send(`Sorry ${message.author}, you do not have the permission to run this command!`);
            }
        }
    }

module.exports = StartCommand;