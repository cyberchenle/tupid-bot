const Emojis = {
	star: '931637469525471263',
	daisy: '931974562848059472',
	currency: '🪙',
	gems: '💎',
	one: "925531820341202985",
	two: "925531833129652344",
	three: "925531842554236928",
	four: "925531850431148072",
	five: "925531863936806912",
	six: "925531873541779477",
	seven: "925531882349821992",
	eight: "925531895318610001",
	nine: "925531905561071646",
};

module.exports = {
	/**
     *
     * @param {String} name
     * @param {import('discord.js').Client} client
     * @returns {import('discord.js').Emoji}
     */
	get(name, client) {
		if (!name || !client || !(typeof (name) === 'string')) {
			throw new TypeError(`A name string and a client object were not provided, received: name - ${name}/${typeof (name)}, client: ${typeof (client)}`);
		}
		let emoji = '';
		if (/\p{Extended_Pictographic}/u.test(Emojis[name])) {
			emoji = Emojis[name];
		}
		else {
			emoji = client.emojis.cache.get(Emojis[name]);
		}
		return emoji;
	},
};