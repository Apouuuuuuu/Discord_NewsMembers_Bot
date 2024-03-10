const fs = require('fs');
const path = require('path');
const membersPath = path.join(__dirname, '..', 'data', 'members.json');

module.exports = async (bot, member) => {
    if (!fs.existsSync(membersPath)) {
        fs.writeFileSync(membersPath, '[]');
    }

    const membersData = JSON.parse(fs.readFileSync(membersPath));
    membersData.push({
        id: member.id,
        joinedAt: member.joinedTimestamp
    });

    fs.writeFileSync(membersPath, JSON.stringify(membersData, null, 2)); 
};
