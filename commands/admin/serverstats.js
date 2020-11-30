const { Command } = require('discord-akairo');

class ServerStatsCommand extends Command {
    constructor() {
        super('serverstats', {
            aliases: ['serverstats'],
            category: 'admin',
            clientPermissions: ['SEND_MESSAGES', 'ADD_REACTIONS'],
        });
    }

    async exec(message, args) {
        await message.delete()
        if (message.member.roles.cache.has('754474630953304116')) {
            
        } else {
            return message.util.send(`Sorry ${message.author}, you do not have the permission to run this command!`);
        }
    }
}

module.exports = ServerStatsCommand;