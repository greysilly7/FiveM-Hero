const { Listener } = require('discord-akairo');

class WelcomeListener extends Listener {
    constructor() {
        // name that will be displayed when loaded
        super('guildMemberAdd', {
            // emitter is the thing that is creating the event here it is the client
            emitter: 'client',
            // event is the event we are wanting to be sent
            event: 'guildMemberAdd'
        });
    }

    // Here we put what code we want it to actually execute
    async exec(member) {
            const welcomeEmbed = this.client.util.embed()
                .setTitle(`${member.user.tag} has joined!`)
                .setColor('GREEN')
                .setDescription(`Welcome ${member.user.tag} to West Life Roleplay.`)
                .setThumbnail(member.user.displayAvatarURL())
                .setFooter(`West Life Roleplay | FiveM-Hero`)
                .setTimestamp()
                // .setImage('')
            .addField('Account Created', `\`\`${new Date(member.user.createdTimestamp).toLocaleString([], { hour12: true})}\`\``);
            await member.guild.channels.cache.get('784261075364741162').send(welcomeEmbed)
            return member.roles.add('784262738791759883');

    }
}

// Here we export it so we can access the code and load it
module.exports = WelcomeListener;
