const Discord = module.require("discord.js");
const js = require("fs");
const api = "https://dreinchannel.github.io/whitelist/keys.json";
const snekfetch = require("snekfetch");
let profile = require("../profile.json");
module.exports.run = async (bot,message,args) => {
    let uid = message.author.id;
    let u = profile[uid];
    if(u.whitelist == 0) return;
    snekfetch.get(api).then(r => {
        let body = r.body;
        let id = Number(message.author.id);
        const embed = new Discord.RichEmbed()
        .setTitle("Drein's Bot")
        .setDescription("I sent you key. Check DM");
        message.channel.send(embed);
 
        let entry = body.find(post => post.id === id);
        const embed2 = new Discord.RichEmbed()
        .setTitle("Drein's Bot")
        .addField("Key:",entry.title);

        message.guild.member(message.author).sendEmbed(embed2);
    });
};
module.exports.help = {
    name: "getkey"
};