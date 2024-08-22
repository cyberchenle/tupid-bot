const { EmbedBuilder, inlineCode } = require('discord.js');
const { oneLineCommaLists } = require('common-tags');
const colors = require('./colors.json');
const emojis = require('./emojis.js');
const { readdirSync } = require('node:fs');

/**
 *
 * @param {import('discord.js').CommandInteraction} interaction
 * @returns {Promise<import('discord.js').EmbedBuilder>}
 */
exports.helpMessage = async function(interaction) {

	if (!interaction) {
		throw new TypeError(`An interaction object was not provided, received: interaction - ${typeof (interaction)}`);
	}

	let categories = [];
	let totalCommandsNumber = 0;
	const star = emojis.get('star', interaction.client);

	readdirSync('./3-commands').forEach( (dir) => {
		const commandFiles = readdirSync(`./3-commands/${dir}`).filter(file => file.endsWith(`.js`));
		let commands = commandFiles.map((command) => {
			const file = require(`./../3-commands/${dir}/${command}`);
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
	return new EmbedBuilder()
		.setTitle(`help panel ੭ ₊˚`)
	// set thumbnail later
		.addFields(categories)
		.setDescription(`use ${inlineCode(`/help <command>`)} to get more information about a command`)
		.setColor(colors.embed)
		.setFooter({ text: ` ⊹ﾟ⋆ ${totalCommandsNumber} commands listed ⋆ﾟ⊹ ` });
}

/**
 *
 * @param {import('discord.js').CommandInteraction} interaction
 * @param {JSON} command 
 * @returns {import('discord.js').EmbedBuilder}
 */
exports.commandMessage = function(interaction, command) {

	if (!interaction || !command) {
		throw new TypeError(`An interaction object and command object were not provided, received: interaction - ${typeof (interaction)}, command - ${typeof(command)}`);
	}

	const { name, description, options } = command;
    const { client } = interaction;
    const star = emojis.get('star', client);
    let includesChoices = false;
    let optional = false;
    let mandatory = false;
    let ignoreChoices = false;
    if(name === 'help' || name === 'color') ignoreChoices = true;
    /**
     * 
     * @param {String} name 
     * @param {[Object]} options 
     * @returns {String}
     */
    function usage(name, options) {
        let firstOption = true;
        if(!options || options.length < 1) {
            return `/${name}`;
        }
        return options.reduce((a, o) => {
            let choices = '';
            if(o.type === 2) {
                subUsage = usage(`${name} ${o.name}`, o.options);
                subUsage = subUsage.substring(1);
                return a += `/${subUsage}`;
            }
            if(o.type === 1) {
                subUsage = usage(o.name, o.options);
                subUsage = subUsage.substring(1);
                return a += `/${name} ${subUsage}\n`;
            }
            if(firstOption) {
                firstOption = false;
                a += `/${name}`;
            }
            if(o.choices && o.choices.length > 0 && !ignoreChoices || o.choices && o.choices.length > 0 && o.name === 'luminosity') {
                includesChoices = true;
                choices = o.choices.reduce((acc, c) => {
                    return acc += `${c.name} | `
                }, `: `);
                choices = choices.substring(0, choices.length - 3);
            }
            if(o.required === true) {
                mandatory = true;
                return a += ` \[${o.name}${choices}\]`
            } else {
                optional = true;
                return a += ` \<${o.name}${choices}\>`
            }
        }, ``);
    }
    let commandUsage = usage(name, options);
    let legend = '';
    if(mandatory) legend += `\n[argument] - mandatory`;
    if(optional) legend += `\n <argument> - optional`;
    if(includesChoices) legend += `\nargument: 1 | 2 - choices`;
    commandUsage = `${legend}\n\`${commandUsage}\``;
    return embed = new EmbedBuilder()
        .setTitle(`command ${name} ੭ ₊˚`)
        //add thumbnail later
        .setColor(colors.embed)
        .addFields(
            { name: `${star} description`, value: description, inline: false },
            { name: `${star} usage`, value: commandUsage, inline: false },
        );
}

/**
 *
 * @param {import('discord.js').CommandInteraction} interaction
 * @param {import('discord.js').GuildMember} member
 * @param {Boolean} global
 * @returns {import('discord.js').EmbedBuilder}
 */
exports.avatar = function(interaction, member, global = false) {
	if (!interaction || !member) {
		throw new TypeError(`An interaction and member objects were not provided, received: interaction - ${typeof (interaction)}, member: ${typeof (member)}`);
	}
	const star = emojis.get('star', interaction.client);
	const avatar = global ? member.user.displayAvatarURL({ forceStatic: false, size: 512, extension: 'png' }) : member.displayAvatarURL({ forceStatic: false, size: 512, extension: 'png' });
	const title = global ? `${star} ${member.displayName}'s global avatar` : `${star} ${member.displayName}'s avatar`;
	return new EmbedBuilder()
		.setTitle(title)
		.setColor(colors.embed)
		.setImage(avatar)
		.setFooter({ text: member.guild.name, iconURL: member.guild.iconURL({ dynamic: true }) });
};