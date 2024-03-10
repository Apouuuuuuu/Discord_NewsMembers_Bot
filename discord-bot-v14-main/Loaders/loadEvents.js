const fs = require('fs');

module.exports = async bot => {
    fs.readdirSync("./Events").filter(f => f.endsWith(".js")).forEach(async file => {
        try {
            let event = require(`../Events/${file}`)
            if (typeof event !== 'function') return;
            bot.on(file.split(".js").join(""), (...args) => event(bot, ...args));
            console.log(`Evenement ${file} chargé avec succès.`)
        } catch (error) {
            console.log(`Erreur lors du chargement de l'événement ${file} :`, error);
        }
    })
}
