const { Command } = require('discord-akairo');

class VerifyEmbedCommand extends Command {
    constructor() {
        super('verify', {
            aliases: ['verify', 'verifyu'],
            category: 'roles',
            clientPermissions: ['SEND_MESSAGES', 'MANAGE_ROLES'],
        });
    }

    async exec(message, args) {
        message.delete();
        const verifyEmbed = this.client.util.embed()
            .setTitle(`You have been verified ${message.author.name}`)
            .addField('Welcome to West Life Roleplay, We hope you have a great time!')
            .setColor('RANDOM');
        message.member.roles.add('777325219101671430');
        message.util.send(verifyEmbed);
    }
}

module.exports = VerifyEmbedCommand