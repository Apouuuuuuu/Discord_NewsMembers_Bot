const Discord = require("discord.js")

const { EmbedBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');
const membersPath = path.join(__dirname, '..', 'data', 'members.json');

module.exports = {
    name: "newmembers",
    description: "Liste les membres ayant rejoint au cours des 7 derniers jours",
    permission: Discord.PermissionFlagsBits.ManageMessages,
    category: "📋・Information",
    async run(bot, message, args) {
        if (!fs.existsSync(membersPath)) {
            return message.reply("Aucune donnée de membre disponible.");
        }

        const oneWeekAgo = Date.now() - (7 * 24 * 60 * 60 * 1000);
        const membersData = JSON.parse(fs.readFileSync(membersPath));
        const recentMembers = membersData.filter(member => parseInt(member.joinedAt) > oneWeekAgo);

        if (recentMembers.length === 0) {
            return message.reply("Aucun nouveau membre n'a rejoint au cours des 7 derniers jours.");
        }

        const memberInfo = await Promise.all(recentMembers.map(async (member) => {
            try {
                const user = await bot.users.fetch(member.id);
                const joinDate = new Date(parseInt(member.joinedAt));
                const now = new Date();
                const timeDiff = now - joinDate;
                const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
                const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

                const formattedTime = `${days}J ${hours}H ${minutes}M ${seconds}S`;
                return {
                    name: user.toString(),
                    joinedAt: formattedTime
                };
            } catch (error) {
                console.error(`Impossible de récupérer le nom d'utilisateur pour ${member.id}`);
                return {
                    name: `**Membre introuvable ou a quitté le serveur :** <@${member.id}>`,
                    joinedAt: "Rejoint il y à : Inconnu"
                };
            }
        }));

        const embed = new EmbedBuilder()
            .setColor(bot.colorInformation)
            .setTitle("Nouveaux membres")
            .setDescription(memberInfo.map(info => `- ${info.name} (Rejoint il y à : ${info.joinedAt})`).join('\n')) 
            .setTimestamp();

        await message.reply({ embeds: [embed] });
    }
};
