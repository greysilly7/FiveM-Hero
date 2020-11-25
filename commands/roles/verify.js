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
        message.member.roles.add('777325219101671430')
        message.utils.send(`Welcome to the SouthCity Roleplay ${message.author}. We are happy to have you here. -West Life Roleplay`);;
    }
}

module.exports = VerifyEmbedCommand;