// Author: Greysilly7
// Notes: M3 Do not touch this file

const { AkairoClient, CommandHandler, InhibitorHandler, ListenerHandler } = require('discord-akairo');
const { settings, directoryRelated } = require('../config.json');
const path = require('path');
const { Collection } = require('discord.js')
/*
const fs = require('fs')


if (!fs.existsSync('../config.json')) {
    throw new Error('I am sorry sirs I could not find a config!');
}
*/

class FIVEMHEROCLIENT extends AkairoClient {
    constructor() {
        super({
            ownerID: settings.ownerIDs,
        }, {
            disableMentions: 'everyone'
        });

        this.commandHandler = new CommandHandler(this, {
            directory: path.join(directoryRelated.commandsDir),
            prefix: settings.prefix,
            argumentDefaults: {
				prompt: {
					timeout: 'Time ran out, command has been cancelled.',
					ended: 'Too many retries, command has been cancelled.',
					retry: 'Could not find your argument, please try again! Say `cancel` to stop the command',
					cancel: 'Command has been cancelled.',
					retries: 4,
					time: 30000
				}
			},
			commandUtil: true,
			commandUtilLifetime: 60000,
			allowMention: true,
			handleEdits: true,
			ignorePermissions: settings.ownerID,
			ignoreCooldown: settings.ownerID,
        });

        this.inhibitorHandler = new InhibitorHandler(this, {
            directory: directoryRelated.inhibitorsDir,
        });

        this.listenerHandler = new ListenerHandler(this, {
            directory: directoryRelated.listnersDir,
        });
    }
    async login (token) {
        this.commandHandler.useListenerHandler(this.listenerHandler).useInhibitorHandler(this.inhibitorHandler);
        this.commandHandler.loadAll();
        this.inhibitorHandler.loadAll();
        this.listenerHandler.setEmitters({
            commandHandler: this.commandHandler,
            inhibitorHandler: this.inhibitorHandler,
            listenerHandler: this.listenerHandler
        }).loadAll();
        return super.login(token)
    }

    queue = new Collection();
    vote = new Collection();
    wait = require('util').promisify(setTimeout);
}

module.exports.FIVEMHEROCLIENT = FIVEMHEROCLIENT;