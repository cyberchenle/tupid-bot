const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const colors = require('../../1-tools/colors.json');
const emojis = require('../../1-tools/emojis.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('pick')
		.setDescription('get a pick between 2-10 options')
		.addStringOption(option => option
			.setName('1')
			.setDescription('first option')
			.setRequired(true),
		)
		.addStringOption(option => option
			.setName('2')
			.setDescription('second option')
			.setRequired(true),
		)
		.addStringOption(option => option
			.setName('3')
			.setDescription('third option'),
		)
		.addStringOption(option => option
			.setName('4')
			.setDescription('fourth option'),
		)
		.addStringOption(option => option
			.setName('5')
			.setDescription('fifth option'),
		)
		.addStringOption(option => option
			.setName('6')
			.setDescription('sixth option'),
		)
		.addStringOption(option => option
			.setName('7')
			.setDescription('seventh option'),
		)
		.addStringOption(option => option
			.setName('8')
			.setDescription('eighth option'),
		)
		.addStringOption(option => option
			.setName('9')
			.setDescription('ninth option'),
		)
		.addStringOption(option => option
			.setName('10')
			.setDescription('tenth option'),
		),
	/**
     *
     * @param {import('discord.js').CommandInteraction} interaction
     */
	async execute(interaction) {
		/**
         *
         * @param {Array} array
         */
		function random(array) {
			return array[Math.floor(Math.random() * array.length)];
		}
		const star = emojis.get('star', interaction.client);
		const optionsArray = this.data.options.reduce((acc, o) => {
			const input = interaction.options.getString(o.name);
			if (input) {
				return [...acc, input];
			}
			else {
				return acc;
			}
		}, []);
		let optionsList = optionsArray.reduce((acc, o) => {
			return acc += `${o}; `;
		}, '');
		optionsList = optionsList.substring(0, optionsList.length - 2);

		const embed = new EmbedBuilder()
			.setColor(colors.embed)
			.setDescription(`hmm, out of all these options...\n\n— ${optionsList} ✿\n\n${star} **i pick ${random(optionsArray)} !!**`);
		await interaction.reply({ embeds: [embed] });
	},
};