/**
 * @name christmascountdownbot
 * @author eartharoid <contact@eartharoid.me>
 * @copyright 2020 Isaac Saunders (eartharoid)
 * @license GPL-3.0
 */

const { Command } = require('discord-akairo');
const { Embed } = require('../../bot');

const I18n = require('../../locales');

class PingCommand extends Command {
	constructor() {
		super('ping', {
			aliases: ['ping'],
			description: {
				content: 'Show bot ping and shard info.',
			},
			clientPermissions: ['EMBED_LINKS', 'SEND_MESSAGES'],
		});
	}

	async exec(message) {
		const { client } = message;
		let uSettings = await message.author.settings(),
			gSettings = await message.guild?.settings();
		
		const i18n = new I18n(uSettings?.locale || gSettings?.locale || 'en-GB');

		let embed = new Embed()
			.setTitle(i18n.__('general.ping.title'))
			.addField(i18n.__('general.ping.fields.shard_num.title'), i18n.__('general.ping.fields.shard_num.text', client.shard.ids, client.ws.shards.size), false)
			.addField(i18n.__('general.ping.fields.avg_ping'), client.ws.ping + 'ms', true)
			.addField(i18n.__('general.ping.fields.shard_ping'), client.ws.shards.get(client.shard.ids[0]).ping + 'ms', true);
		let m = await message.util.send(embed);

		// ❯ return a promise
		return message.util.edit(embed.addField(i18n.__('general.ping.fields.latency'), m.createdTimestamp - message.createdTimestamp  + 'ms', true));
		// m.edit
	}
}

module.exports = PingCommand;