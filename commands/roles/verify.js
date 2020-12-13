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
        await message.delete();
        const verifyEmbed = this.client.util.embed()
            .setTitle(`You have been verified ${message.author.tag}`)
            .addField('Welcome to West Life Roleplay, We hope you have a great time!', '\u2800' , true)
            .setColor('RANDOM');
        await message.member.roles.add('777325219101671430');
        return message.util.send(verifyEmbed);
    }
}

module.exports = VerifyEmbedCommand