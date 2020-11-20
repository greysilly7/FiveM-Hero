const { Command } = require('discord-akairo');


class VerifyEmbedCommand extends Command {
    constructor() {
        super('verify', {
            aliases: ['verify'],
            category: 'roles',
            clientPermissions: ['SEND_MESSAGES'],
        });
    }

    async exec(message, args) {
        message.delete();
        message.member.roles.add('754491333955158116')
        message.guild.channels.cache.get('754507424374980651').send(`Welcome to the SouthCity Roleplay ${message.author}. We are happy to have you here. -SouthCity Roleplay Leadership`);;
    }
}

module.exports = VerifyEmbedCommand;