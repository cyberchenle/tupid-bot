const { Events } = require('discord.js');

module.exports = {
	name: Events.InteractionCreate,
	/**
	 *
	 * @param {import('discord.js').BaseInteraction} interaction
	 */
	async execute(interaction) {
	if (interaction.isChatInputCommand() || interaction.isAutocomplete()) {
		const { commandName, client } = interaction;

		let command = client.slashCommands.get(commandName);
		if (!command) {
			return interaction.reply(`no command matching ${commandName} was found.`);
		}
		try {
			await command.execute(interaction);
		}
		catch (error) {
			console.error(error);
			await interaction.reply({ content: 'there was an error while executing this command!' });
		}
	}
	}
};