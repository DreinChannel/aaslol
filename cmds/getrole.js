const Discord = module.require("discord.js");
const js = require("fs");
const api = "https://dreinchannel.github.io/whitelist/keys.json";
const snekfetch = require("snekfetch");
let profile = require("../profile.json");
module.exports.run = async (bot,message,args) => {
    let uid = message.author.id;
    let u = profile[uid];
    if(u.whitelist == 0) return;
    message.guild.member(message.author).addRole('656844131523362816');
    const embed = new Discord.RichEmbed()
    .setTitle("Drein's Bot")
    .setDescription("I gave you the role.");
    message.channel.send(embed);
};
module.exports.help = {
    name: "getrole"
};