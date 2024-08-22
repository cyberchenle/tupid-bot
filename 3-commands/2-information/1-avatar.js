const { SlashCommandBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');
const { avatar } = require('../../1-tools/embeds.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('avatar')
		.setDescription('get the avatar of a member of the server')
		.addUserOption(option => option
			.setName('member')
			.setDescription('member to show the avatar of')
			.setRequired(false),
		)
		.addBooleanOption(option => option
			.setName('global')
			.setDescription('whether to get the global avatar')
			.setRequired(false),
		),
	/**
     *
     * @param {import('discord.js').CommandInteraction} interaction
     */
	async execute(interaction) {
		let global = interaction.options.getBoolean('global');
		if (global == null) global = false;
		const user = interaction.options.getUser('member');
		const member = user ? interaction.guild.members.cache.get(user.id) : interaction.member;
		if (!member) {
			return interaction.reply(`that user isn't in the server!`);
		}
		await interaction.deferReply();
		const embed = avatar(interaction, member, global);
		let holder;
		if (global === true) {
			holder = member.user;
		}
		else {
			holder = member;
		}
		const gifButton = new ButtonBuilder()
			.setLabel('GIF')
			.setStyle(ButtonStyle.Link)
			.setURL(holder.displayAvatarURL({ forceStatic: false, extension: 'gif' }));
		if (holder.displayAvatarURL({ forceStatic: false, extension: 'png' }).endsWith('.png')) {
			gifButton.setDisabled(true);
		}
		const pngButton = new ButtonBuilder()
			.setLabel('PNG')
			.setStyle(ButtonStyle.Link)
			.setURL(holder.displayAvatarURL({ forceStatic: true, extension: 'png' }));
		const jpgButton = new ButtonBuilder()
			.setLabel('JPG')
			.setStyle(ButtonStyle.Link)
			.setURL(holder.displayAvatarURL({ forceStatic: true, extension: 'jpg' }));
		const webpButton = new ButtonBuilder()
			.setLabel('WEBP')
			.setStyle(ButtonStyle.Link)
			.setURL(holder.displayAvatarURL({ forceStatic: true, extension: 'webp' }));
		const row = new ActionRowBuilder()
			.addComponents(
				gifButton,
				pngButton,
				jpgButton,
				webpButton,
			);
		return await interaction.editReply({ embeds: [embed], components: [row] });
	},
};