const fs = require("fs");
const path = "users.json";

module.exports.config = { name:"elo" };

module.exports.onStart = async function({ api,event }) {

    try {

        let users = JSON.parse(fs.readFileSync(path));
        let uid = event.senderID;

        if(!users[uid]) users[uid]={elo:1000,wins:0,losses:0};

        let data = users[uid];

        api.sendMessage(
`⚔ ELO PROFILE

⭐ ELO: ${data.elo}
🏆 Wins: ${data.wins}
❌ Losses: ${data.losses}`,
        event.threadID,
        event.messageID);

    } catch(err){}
};
