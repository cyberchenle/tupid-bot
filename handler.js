const { readdirSync } = require('node:fs');
const { join } = require('node:path');

/**
 *
 * @param {import('discord.js').Client} client
 */
module.exports = (client) => {
	if (!client) {
		throw new TypeError(`A client object was not provided, received: client - ${typeof (client)}`);
	}
	const commandsPath = join(__dirname, '3-commands');
	console.log(`COMMANDS LOADED:`);
	readdirSync(commandsPath).forEach(dir => {
		const dirPath = join(commandsPath, dir);
		const commandFiles = readdirSync(dirPath).filter(file => file.endsWith(`.js`));
		for (const file of commandFiles) {
			const filePath = join(dirPath, file);
			const pull = require(filePath);
			if (pull.data?.name && pull.execute) {
				client.slashCommands.set(pull.data.name, pull);
				console.log(`» ${pull.data.name}`);
			}
		}
	});

	console.log('EVENTS LOADED:');
	const eventsPath = join(__dirname, '2-events');
	const eventFiles = readdirSync(eventsPath).filter(file => file.endsWith('.js'));
	for (const file of eventFiles) {
		const filePath = join(eventsPath, file);
		const pull = require(filePath);
		if (pull.name && pull.execute) {
			client.events.set(pull.name, pull);
			console.log(`» ${pull.name}`);
		}
	}
};