const ytdlDiscord = require('ytdl-core-discord');
const {MessageEmbed} = require('discord.js');

module.exports = {
  async play(song, message) {
    const stream = await ytdlDiscord(song.url, {
      highWaterMark: 1 << 25,
    });
    const queue = message.client.queue.get(message.guild.id);
    const embed = new MessageEmbed();

    if (!song) {
      queue.channel.leave();
      this.client.queue.delete(message.guild.id);
      embed.setAuthor('MUSIC QUEUE IS ENDED NOW :/');
      return queue.textChannel
          .send(embed)
          .catch(console.error);
    }

    try {
    } catch (error) {
      if (queue) {
        queue.songs.shift();
        await module.exports.play(queue.songs[0], message);
      }

      if (error.message.includes === 'copyright') {
        return message.channel.send('THIS VIDEO CONTAINS COPYRIGHT CONTENT');
      } else {
        console.error(error);
      }
    }

    const dispatcher = queue.connection
        .play(stream, {type: 'opus'})
        .on('finish', () => {
          if (queue.loop) {
            const lastsong = queue.songs.shift();
            queue.songs.push(lastsong);
            module.exports.play(queue.songs[0], message);
          } else {
            queue.songs.shift();
            module.exports.play(queue.songs[0], message);
          }
        })
        .on('error', console.error);

    dispatcher.setVolumeLogarithmic(queue.volume / 100); // VOLUME
    // eslint-disable-next-line max-len
    embed.setAuthor('Started Playing Song', message.client.user.displayAvatarURL())
        .setDescription(`**[${song.title}](${song.url})**`);

    queue.textChannel
        .send(embed)
        .catch((err) => message.channel.send('UNABLE TO PLAY SONG'));
  },
};