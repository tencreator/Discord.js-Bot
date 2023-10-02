const { Events, AuditLogEvent, EmbedBuilder } = require('discord.js')
require('dotenv').config()
const logchannel = process.env.logchannel

module.exports = {
    name: Events.GuildMemberRemove,
    async execute(member) {
        member.guild.fetchAuditLogs({
            type: AuditLogEvent.MemberKick,
        })

        .then(async audit => {
            const { executor } = audit.entries.first()
            
            const name = member.user.username
            const id = member.user.id

            const mChannel = await member.guild.channels.cache.get(logchannel)

            const KickedMemberEmbed = new EmbedBuilder()
                .setColor('Red')
                .setTitle('Member Kicked')
                .addFields({ name: 'Member Name', value: `${name}`, inline: false })
                .addFields({ name: 'Member ID', value: `${id}`, inline: false })
                .addFields({ name: 'Kicked By', value: `${executor}`, inline: false })
                .setTimestamp()
                .setFooter({ text: 'Mod logs' })
            
            mChannel.send({ embeds: [KickedMemberEmbed] })
        })
    }
}