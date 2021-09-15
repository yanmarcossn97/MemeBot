const Discord = require('discord.js');
const voiceDiscord = require('@discordjs/voice')
const prefix = '?'
const {token} = require('./config.json')
const client = new Discord.Client({intents: 32767});

client.on('ready', () => {
	console.log('Client is ready!')
})

client.on('messageCreate', async message => {
	function isCommand(command){
		return !!message.content.toLowerCase().startsWith(prefix + command);
	};

	if(isCommand('yamete')) {
		const channel = message.member.voice.channel;
		if(!channel) return message.channel.send('Join to a voice channel');

		var audio = 'https://www.myinstants.com/media/sounds/asus-yamete-kudasai.mp3'
		const player = voiceDiscord.createAudioPlayer();
		const resource = voiceDiscord.createAudioResource(audio);

		const connection = voiceDiscord.joinVoiceChannel({
			channelId: channel.id,
			guildId: message.guild.id,
			adapterCreator: message.guild.voiceAdapterCreator,
		});

		player.play(resource)
		connection.subscribe(player)

		player.on(voiceDiscord.AudioPlayerStatus.Idle, () => {
			connection.destroy()
		})
	}
})

client.login(token)