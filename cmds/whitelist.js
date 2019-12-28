const Discord = module.require("discord.js");
const js = require("fs");
const api = "https://dreinchannel.github.io/whitelist/keys.json";
const snekfetch = require("snekfetch");
let profile = require("../profile.json");
module.exports.run = async (bot,message,args) => {
    let uid = message.author.id;
    let user = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    let u = profile[user.id]
    const embed = new Discord.RichEmbed()
    .setTitle("Drein's Bot")
    .setDescription("Successfully whitelisted.");
    if(message.guild.member(message.author).hasPermission('ADMINISTRATOR'));
    u.whitelist = 1;
    message.channel.send(embed);
};
module.exports.help = {
    name: "whitelist"
};