const Emojis = {
	star: '1275506939589165076',
	arrow: '1275583569976365086',
	currency: '🪙',
	gem: '1275617040568291380',
	zero:'1275914897351245875',
	one: '1275914894633599079',
	two: '1275914890116333670',
	three: '1275914886911885323',
	four: '1275914883732471932',
	five: '1275914880993722400',
	six: '1275914879144034416',
	seven: '1275914875977203752',
	eight: '1275914871526920347',
	nine: '1275914868213551124',
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
			throw new TypeError(`A name string and a client object were not provided, received: name - ${name}/${typeof (name)}, client - ${typeof (client)}`);
		}
		let emoji = '';
		if (/\p{Extended_Pictographic}/u.test(Emojis[name])) {
			emoji = Emojis[name];
		}
		else {
			emoji = client.emojis.cache.get(Emojis[name]);
		}
		return emoji;
	}
}