const { Command } = require('discord-akairo');
const ytdl = require('ytdl-core');
const YoutubeAPI = require('simple-youtube-api');
const { secrets, settings } = require('../../config.json');
const ytsr = require('ytsr');
const {play} = require('../../libaries/music');
const youtube = new YoutubeAPI(secrets.YT_API);
const QUEUE_LIMIT = settings.QUEUE_LIMIT;

class PlayCommand extends Command {
	constructor() {
		super('play', {
			aliases: ['play', 'p'],
			category: 'music',
			args: [
				{
					id: 'song',
					type: 'string'
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
		const embed = this.client.util.embed();
		if (!args.song.length) {
			// IF AUTHOR DIDENT GIVE URL OR NAME
			embed.setAuthor('WRONG SYNTAX : Type `play <URL> or text`');
			return message.util.send(embed);
		}

		const { channel } = message.member.voice;

		if (!channel) {
			// IF AUTHOR IS NOT IN VOICE CHANNEL
			embed.setAuthor('YOU NEED TO BE IN VOICE CHANNEL :/');
			return message.util.send(embed);
		}

		const videoPattern = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/gi;
		const playlistPattern = /^.*(youtu.be\/|list=)([^#\&\?]*).*/gi;
		const urlcheck = videoPattern.test(args.song);
	  
		if (!videoPattern.test(args.song) && playlistPattern.test(args.song)) {
		  embed.setAuthor('I am Unable To Play Playlist for now');
		  return message.util.send(embed);
		}

		const serverQueue = this.client.queue.get(message.guild.id);

		const queueConstruct = {
		  textChannel: message.channel,
		  channel,
		  connection: null,
		  songs: [],
		  loop: false,
		  volume: 20,
		  playing: true,
		};
	  
		const voteConstruct = {
		  vote: 0,
		  voters: [],
		};
	  
		let songData = null;
		let song = null;
	  
		if (urlcheck) {
		  try {
			songData = await ytdl.getInfo(args.song);
	  
			song = {
			  title: songData.videoDetails.title,
			  url: songData.videoDetails.video_url,
			  duration: songData.videoDetails.lengthSeconds,
			  thumbnail: songData.videoDetails.thumbnail.thumbnails[3].url,
			};
		  } catch (error) {
			if (message.include === 'copyright') {
			  return message
				  .reply('THERE IS COPYRIGHT CONTENT IN VIDEO -_-')
				  .catch(console.error);
			} else {
			  console.error(error);
			}
		  }
		} else {
		  try {
			const result = await youtube.searchVideos(args.song, 1);
			/*
			const options = {
			  limit: 1,
			}
			const result = await ytsr(args.song, options)
			*/
			songData = await ytdl.getInfo(result[0].url);

			song = {
			  title: songData.videoDetails.title,
			  url: songData.videoDetails.video_url,
			  duration: songData.videoDetails.lengthSeconds,
			  thumbnail: songData.videoDetails.thumbnail.thumbnails[3].url,
			};
		  } catch (error) {
			throw new Error(error)
			/*
			if (error.errors[1].domain === 'usageLimits') {
			  return message.channel.send('Your YT API limit is over and it will be restored under 24 hours');
			}
			*/
		  }
		}
		if (serverQueue) {
		  if (serverQueue.songs.length > Math.floor(QUEUE_LIMIT - 1) && QUEUE_LIMIT !== 0) {
			return message.util.send(`You can not add songs more than ${QUEUE_LIMIT} in queue`);
		  }
	  
	  
		  serverQueue.songs.push(song);
		  embed.setAuthor('Added New Song To Queue', this.client.user.displayAvatarURL());
		  embed.setDescription(`**[${song.title}](${song.url})**`);
		  embed.setThumbnail(song.thumbnail)
			  .setFooter('Likes - ' + songData.videoDetails.likes + ', Dislikes - ' + songData.videoDetails.dislikes);
	  
		  return serverQueue.textChannel
			  .send(embed)
			  .catch(console.error);
		} else {
		  queueConstruct.songs.push(song);
		}
	  
		if (!serverQueue) {
		  this.client.queue.set(message.guild.id, queueConstruct);
		}
		this.client.vote.set(message.guild.id, voteConstruct);
		if (!serverQueue) {
		  try {
			queueConstruct.connection = await channel.join();
			play(queueConstruct.songs[0], message);
		  } catch (error) {
			console.error(`Could not join voice channel: ${error}`);
			this.client.queue.delete(message.guild.id);
			await channel.leave();
			return message.channel
				.send({
				  embed: {
					description: `😭 | Could not join the channel: ${error}`,
					color: '#ff2050',
				  },
				})
				.catch(console.error);
		  }
		}
	}
}

module.exports = PlayCommand;
