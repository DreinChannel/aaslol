const Discord = module.require("discord.js");
const js = require("fs");
const api = "https://dreinchannel.github.io/whitelist/keys.json";
const snekfetch = require("snekfetch");
let profile = require("../profile.json");
module.exports.run = async (bot,message,args) => {
    let uid = message.author.id;
    let u = profile[uid];
    if(u.whitelist == 0) return;
    const embed = new Discord.RichEmbed()
    .setTitle("Drein's Bot")
    .setDescription("I sent you the script. Check DM");
    message.channel.send(embed);
    const embed2 = new Discord.RichEmbed()
    .setTitle("Drein's Bot")
    .addField("Script:","`loadstring(game:HttpGet('https://pastebin.com/raw/iTn0PFVD'))()`");
    message.author.send(embed2);
};
module.exports.help = {
    name: "getscript"
};