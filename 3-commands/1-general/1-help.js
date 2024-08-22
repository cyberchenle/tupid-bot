const { SlashCommandBuilder } = require('discord.js');
const { helpMessage, commandMessage } = require('../../1-tools/embeds.js');

module.exports = {
    data: new SlashCommandBuilder()
            .setName('help')
            .setDescription('get a list of all available commands or information about one command')
            .addStringOption(option => option
            .setName('command')
                .setDescription('command to get information about')
                .setRequired(false)
            ),
    /**
     * 
     * @param {import('discord.js').CommandInteraction} interaction 
     */
    async execute(interaction) {
        const commandInput = interaction.options.getString('command');
            if(!commandInput) {
                const helpEmbed = await helpMessage(interaction);
                return interaction.reply({ embeds: [helpEmbed] });
            }
            await interaction.deferReply();
            let command = interaction.guild.commands.cache.find(c => c.name === commandInput);
            if(!command) {
                await interaction.guild.commands.fetch();
                command = interaction.guild.commands.cache.find(c => c.name === commandInput);
            }
            if(!command) return interaction.reply({ content: `i couldn't find the command ${commandInput}` });
            const commandEmbed = commandMessage(interaction, command.toJSON());
            return interaction.editReply({ embeds: [commandEmbed] });
    }
};