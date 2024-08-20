const { EmbedBuilder } = require('discord.js');
const colors = require('../1-tools/colors.json');
const emojis = require('../1-tools/emojis');

/**
 *
 * @param {import('discord.js').CommandInteraction} interaction
 * @returns {Promise<EmbedBuilder>}
 */
exports.helpMessage = async function(interaction) {
	let mod = false;
	let categories = [];
	let totalCommandsNumber = 0;
	let paths = ['1-base'];
	const { client, guild } = interaction;
	const star = emojis.get('star', client);
	const color = colors.get('embed', client, guild.id);
	if (interaction.memberPermissions.has(PermissionFlagsBits.ManageGuild, true)) {
		mod = true;
	}
	else {
		//if has a mod role mod = true;
	}
	if (mod === true) {
		paths.push('2-mod');
	}
	for (let path of paths) {
		fs.readdirSync(`./4-commands/${path}`).forEach( async (dir) => {
			const commandFiles = fs.readdirSync(`./4-commands/${path}/${dir}`).filter(file => file.endsWith('.js'));
			let commands = commandFiles.map((command) => {
				const file = require(`./../4-commands/${path}/${dir}/${command}`);
				if (file.data?.name && file.execute) {
					return inlineCode(`/${file.data.name}`)
				}
			});
			commands = commands.filter(string => string !== undefined);
			if (commands.length > 0) {
				let categoryName = dir.substring(2);
				categoryName = categoryName.replace(/-+/g, ' ');
				const fieldName = `${star} ${categoryName} (${commands.length})`;
				const data = {
					name: fieldName,
					value: oneLineCommaLists`${commands}`,
					inline: true
				};
				totalCommandsNumber += commands.length;
				categories.push(data);
			}
		});
	}
	return new EmbedBuilder()
		.setTitle(`help panel ੭ ₊˚`)
	// set thumbnail later
		.addFields(categories)
		.setDescription(`use ${inlineCode(`/help <command>`)} to get more information about a command`)
		.setColor(color)
		.setFooter({ text: `⊹ﾟ⋆ ${totalCommandsNumber} commands listed ⋆ﾟ⊹` });
}