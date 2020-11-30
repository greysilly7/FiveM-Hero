const { Listener } = require('discord-akairo');
const { settings, game } = require('../../config.json');

class ReadyListener extends Listener {
	constructor() {
		super('ready', {
			emitter: 'client',
			event: 'ready'
		});
	}

	async exec() {
		let commandSize = this.client.commandHandler.modules.size;
		let clientTag = this.client.user.tag;
		let guildSize = this.client.guilds.cache.size;
		let userSize = this.client.users.cache.size;
		let channelSize = this.client.channels.cache.size;
		let profilePicture = this.client.user.displayAvatarURL();
		let clientID = this.client.user.id;
        // let author = this.client.users.resolve(settings.ownerID).tag.toLowerCase();
        // let author = this.client.users.resolve('688238554769653771').tag;


		//  Send stats to the console
		console.log('===========[ READY ]===========');
		console.log(`\x1b[32mLogged in as \x1b[34m${clientTag}\x1b[0m! (\x1b[33m${clientID}\x1b[0m)`);
		console.log(`Ready to serve in \x1b[33m${channelSize}\x1b[0m channels on \x1b[33m${guildSize}\x1b[0m servers, for a total of \x1b[33m${userSize}\x1b[0m users.`);
		console.log(`There is \x1b[33m${commandSize}\x1b[0m command loaded`);
		console.log(`${this.client.readyAt}`);

		//Bot status
		await setStatus(this.client);
		// Change status every 30 minutes
		setInterval(async () => {
			await setStatus(this.client);
		}, 1800000);

		async function setStatus(client) {
			let owner = client.users.resolve(client.ownerID);
			let random = Math.floor((Math.random() * 3));
			if (random === 0) { // Random "Watching" status taken from json
				console.log('Status type: \x1b[32mWatching\x1b[0m');
				
				let status = game.watching[Math.floor((Math.random() * game.watching.length))];
				status = status.replace('${prefix}', settings.prefix[0]);
						
				await client.user.setActivity(`${status} | My prefix is: ${settings.prefix[0]} `, {type: 'WATCHING'});
			} else if (random === 1) { // Random "Playing" status taken from json
				console.log('Status type: \x1b[32mPlaying\x1b[0m');
				
				let status = game.playing[Math.floor((Math.random() * game.playing.length))];
				status = status.replace('${prefix}', settings.prefix[0]);
						
				await client.user.setActivity(`${status} | My prefix is: ${settings.prefix[0]}`, {type: 'PLAYING'});
			} /* else if (random === 2 && owner.presence.activities != null) { // Bot owner status
				console.log('Status type: \x1b[32mCopying owner status\x1b[0m');
				// Get elapsed time from when the activity started		
				let diffMins = 0;
				if (owner.presence.activities[0])  {
					if (owner.presence.activities[0].timestamps) {
						let diffMs = (new Date() - owner.presence.activities[0].timestamps.start);
						diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000);
					}
					client.user.setActivity(`${owner.presence.activities[0].name}\nfor ${diffMins} minutes | My prefix is: ${prefix[0]}`, owner.presence.activities[0]);
				}
            } */
		}
        
		// Expose stats

		console.log('===========[ READY ]===========');

		let logFunc = console.log;
		console.log = function(){
			if (process.argv.includes('--debug')) {
				const date = new Date;
				const hours = `${date.getHours()}`.padStart(2, '0');
				const minutes = `${date.getMinutes()}`.padStart(2, '0');
				const seconds = `${date.getSeconds()}`.padStart(2, '0');
				logFunc.apply(console, [`[${hours}:${minutes}:${seconds}] [LOG] `].concat([].slice.call(arguments)));
			}
		};

		if (process.argv.includes('--debug'))
			console.log('Logging enabled');



		let errorFunc = console.error;
		console.error = function(){
			const date = new Date;
			const hours = `${date.getHours()}`.padStart(2, '0');
			const minutes = `${date.getMinutes()}`.padStart(2, '0');
			const seconds = `${date.getSeconds()}`.padStart(2, '0');
			errorFunc.apply(console, [`[${hours}:${minutes}:${seconds}] [ERROR] `].concat([].slice.call(arguments)));
		};
	}
}

module.exports = ReadyListener;