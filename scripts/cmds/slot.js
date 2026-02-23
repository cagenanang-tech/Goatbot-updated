const fs = require("fs");
const path = "users.json";

module.exports.config = { name:"slot", cooldowns:5 };

module.exports.onStart = async function({ api,event,args }) {

    try {
        let users = JSON.parse(fs.readFileSync(path));
        let uid = event.senderID;

        if (!users[uid]) users[uid] = { money:1000 };

        let bet = parseInt(args[0])||0;

        if (users[uid].money < bet)
            return api.sendMessage("❌ Not enough balance!", event.threadID);

        let symbols = ["🍒","🍋","🍉","💎","⭐"];

        let spin = Array.from({length:3},()=>symbols[Math.floor(Math.random()*symbols.length)]);
        let win = spin.every(v=>v===spin[0]);

        if(bet>0) users[uid].money += win ? bet*2 : -bet;

        fs.writeFileSync(path, JSON.stringify(users,null,2));

        api.sendMessage(`🎰 ${spin.join(" | ")}`, event.threadID);

    } catch(err){}
};
