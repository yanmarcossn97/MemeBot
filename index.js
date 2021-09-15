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

	var audioLink = ''
	if(isCommand('yamete')) {
		audioLink = 'https://www.myinstants.com/media/sounds/asus-yamete-kudasai.mp3'
		playMeme(audioLink)
	} else if(isCommand('roblox')) {
		audioLink = 'https://www.myinstants.com/media/sounds/roblox-death-sound_1.mp3'
		playMeme(audioLink)
	} else if(isCommand('wow')) {
		audioLink = 'https://www.myinstants.com/media/sounds/anime-wow-sound-effect.mp3'
		playMeme(audioLink)
	} else if(isCommand('nemesis')) {
		audioLink = 'https://www.myinstants.com/media/sounds/tf_nemesis.mp3'
		playMeme(audioLink)
	} else if(isCommand('tuturu')) {
		audioLink = 'https://www.myinstants.com/media/sounds/tuturu_1.mp3'
		playMeme(audioLink)
	}

	function playMeme(audioLink) {
		const channel = message.member.voice.channel;
		if(!channel) return message.channel.send('Join to a voice channel');

		const player = voiceDiscord.createAudioPlayer();
		const resource = voiceDiscord.createAudioResource(audioLink);

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