const fs = require('node:fs');
const path = require('node:path');

/**
 *
 * @param {import('discord.js').Client} client
 */
module.exports = (client) => {
	if (!client) {
		throw new TypeError(`A client object was not provided, received: client - ${typeof (client)}`);
	}
	const commandsPath = path.join(__dirname, '4-commands');
	console.log(`COMMANDS LOADED:`);
	fs.readdirSync(commandsPath).forEach(dir => {
		const dirPath = path.join(commandsPath, dir);
		const commandFiles = fs.readdirSync(dirPath).filter(file => file.endsWith(`.js`));
		for (const file of commandFiles) {
			const filePath = path.join(dirPath, file);
			const pull = require(filePath);
			if (pull.data?.name && pull.execute) {
				client.allCommands.set(pull.data.name, pull);
				console.log(`» ${pull.data.name}`);
			}
		}
	});

	console.log('EVENTS LOADED:');
	const eventsPath = path.join(__dirname, '3-events');
	const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));
	for (const file of eventFiles) {
		const filePath = path.join(eventsPath, file);
		const pull = require(filePath);
		if (pull.name && pull.execute) {
			client.events.set(pull.name, pull);
			console.log(`» ${pull.name}`);
		}
	}
};