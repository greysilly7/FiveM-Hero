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
<<<<<<< HEAD
        await message.member.roles.add('777325219101671430');
        return message.util.send(verifyEmbed);
=======
        await message.member.roles.add('784262597913346050');
        await message.util.send(verifyEmbed);
>>>>>>> b71aad0dc03cbd062ad06ff37c24d3acf044c05e
    }
}

module.exports = VerifyEmbedCommand
