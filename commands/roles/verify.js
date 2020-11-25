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
        message.member.roles.add('777325219101671430');
        message.util.send(`\`\`Welcome to the West Life Roleplay ${message.author}. We are happy to have you here.\`\`);
    }
}

module.exports = VerifyEmbedCommand;