const { Command } = require('discord-akairo');
const ytdl = require('ytdl-core');
const YoutubeAPI = require('simple-youtube-api');
const { secrets, settings } = require('../../config.json')
const youtube = new YoutubeAPI(secrets.YT_API);
const QUEUE_LIMIT = settings.QUEUE_LIMIT;

class PlayCommand extends Command {
	constructor() {
		super('play', {
			aliases: ['play'],
			category: 'music',
			args: [
				{
					id: 'song',
					type: 'string',
				}
			],
			clientPermissions: ['SPEAK', 'CONNECT'],
			description: {
				content: 'Plays a song from youtube',
				usage: '!play (Song)',
				examples: ['!play anime-thighs']
			}
		});
	}

	async exec(message, args) {
	}
}

module.exports = PlayCommand;
