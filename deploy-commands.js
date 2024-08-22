const { REST, Routes } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');
require('dotenv').config();

const commands = [];
const commandChoices = [];

const commandsPath = path.join(__dirname, '3-commands');
console.log(`COMMANDS:`)
fs.readdirSync(commandsPath).forEach(dir => {
	const dirPath = path.join(commandsPath, dir);
	const commandFiles = fs.readdirSync(dirPath).filter(file => file.endsWith(`.js`));
	for (const file of commandFiles) {
		const filePath = path.join(dirPath, file);
		const pull = require(filePath);
		if (pull.data?.name && pull.execute) {
			commands.push(pull.data.toJSON());
			commandChoices.push({ name: pull.data.name, value: pull.data.name });
			console.log(`» ${pull.data.name}`);
		}
	}
});

// add choices to the help command
try {
	commands.find(cmd => cmd.name === 'help').options.find(o => o.name === 'command').choices = commandChoices;
}
catch (err) {
	console.error('error adding choices to help command', err);
}

const rest = new REST({ version: '10' }).setToken(process.env.BOT_TOKEN);

(async () => {
	try {
		console.log(`started refreshing ${commands.length} application (/) commands.`);

		const data = await rest.put(
			Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
			{ body: commands },
		);

		console.log(`successfully reloaded ${data.length} application (/) commands.`);
	}
	catch (error) {
		console.error(error);
	}
})();