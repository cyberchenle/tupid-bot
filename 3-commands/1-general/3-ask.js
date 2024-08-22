const { SlashCommandBuilder } = require('discord.js');
const colors = require('../../1-tools/colors.json');
const emojis = require('../../1-tools/emojis.js');

module.exports = {
    data: new SlashCommandBuilder()
            .setName('ask')
            .setDescription('get an answer to a yes or no question')
            .addStringOption(option => option
            .setName('yes-no-question')
                .setDescription('question to be answered')
                .setRequired(true)
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
		const question = interaction.options.getString('yes-no-question');
		let response = `${star} q: ${question}\n`;
		const answerYes = [
			`yeah, dear (✿◠‿◠)`,
			`my sources say yes („• ᴗ •„)`,
			`you may count on it! ≧◡≦`,
			`for sure! ヽ(o＾▽＾o)\ノ`,
			`without a doubt (╯✧▽✧)╯`,
			`most likely (\´ з \`)`,
		];
		const answerIdk = [
			`i don't know, i'm sorry (＞\﹏＜)`,
			`how am i supposed to know? (⇀‸↼‶)`,
			`heck if i know ╮( ˘ ､ ˘ )╭`,
			`my mind is blank (\×_\×)⌒☆`,
			`i have no clue (\⁄ \⁄•\⁄ω\⁄•\⁄ \⁄)`,
		];
		const answerNo = [
			`the outlook isn't looking good 〣( ºΔº )〣`,
			`my sources say no (｡╯︵╰｡)`,
			`i'm afraid not (╥\﹏╥)`,
			`NO (╮°-°)╮┳━━┳ ( ╯°□°)╯ ┻━━┻`,
			`of course not! (＃\`Д\´)`,
		];
		const value = ["Yes", "Idk", "No"];
		const choice = random(value);
		if (choice === value[0]) {
			response += `${star} a: ` + random(answerYes);
		}
		else if (choice === value[1]) {
			response += `${star} a: ` + random(answerIdk);
		}
		else if (choice === value[2]) {
			response += `${star} a: ` + random(answerNo);
		}
		const embed = new EmbedBuilder()
			.setColor(colors.embed)
			.setDescription(response);
		await interaction.reply({ embeds: [embed] });
    }
};