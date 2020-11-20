const { Listener } = require('discord-akairo');
const { User } = require('discord.js');
const { GuildMember } = require('discord.js');
const { MessageEmbed } = require('discord.js');

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
            const welcomeEmbed = new MessageEmbed();
            welcomeEmbed.setTitle(`${member.user.tag} has joined!`);
            welcomeEmbed.setColor('GREEN');
            welcomeEmbed.setDescription(`Welcome ${member.user.tag} to SouthCity Roleplay.`);
            welcomeEmbed.setThumbnail(member.user.displayAvatarURL());
            welcomeEmbed.setFooter(`SouthCity Roleplay | FiveM-Hero`);
            welcomeEmbed.setTimestamp();
            welcomeEmbed.setImage('https://media.discordapp.net/attachments/754507634996019233/759716404638908426/scteamspeak.png')
            welcomeEmbed.addField('Account Created', `\`\`${new Date(member.user.createdTimestamp).toLocaleString([], { hour12: true})}\`\``);
            return this.client.guilds.cache.get('754470039373217892').channels.cache.get('754474499969122394').send(welcomeEmbed)
    }
}

// Here we export it so we can access the code and load it
module.exports = WelcomeListener;
