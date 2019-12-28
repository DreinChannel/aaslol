const Discord = require('discord.js');
const bot = new Discord.Client();
bot.commands = new Discord.Collection();
const fs = require('fs');
let config = require('./botconfig.json');
let token = config.token;
let prefix = config.prefix;
let profile = require('./profile.json');

fs.readdir('./cmds/',(err,files)=>{
    if(err) console.log(err);
    let jsfiles = files.filter(f => f.split(".").pop() === "js");
    if(jsfiles.length <=0) console.log("Нет комманд для загрузки");
    console.log(`Загружено ${jsfiles.length} комманд`);
    jsfiles.forEach((f,i) =>{
        let props = require(`./cmds/${f}`);
        console.log(`${i+1}.${f} Загружен!`);
        bot.commands.set(props.help.name,props);
    })
})

const activities_list = [
    "With DreinScripts | !buy", 
    "With Drein Hub | !buy",
    "With Drein's Scripts | !buy", 
    "With Drein's Hub | !buy",
    "With Drein Scripts | !buy"
    ];

bot.on('ready', () => {
  console.log(`Bot ${bot.user.username} is online!`);
  bot.generateInvite(["ADMINISTRATOR"]).then(link =>{
      console.log(link);
  })
  setInterval(() => {
    const index = Math.floor(Math.random() * (activities_list.length - 1) + 1); // generates a random number between 1 and the length of the activities array list (in this case 5).
    bot.user.setActivity(activities_list[index]); // sets bot's activities to one of the phrases in the arraylist.
}, 10000)
});

bot.on('message', async message => {
    if(message.author.bot) return;
    if(message.channel.type == 'dm') return;
    let uid = message.author.id;
    if(!profile[uid]){
        profile[uid] ={
            whitelist:0,
        };
    };
    let u = profile[uid];
    fs.writeFile('./profile.json',JSON.stringify(profile),(err)=>{
        if(err) console.log(err);
    })
    let user = message.author.username;
    let userid = message.author.id;
    let messageArray = message.content.split(" ");
    let command = messageArray[0].toLowerCase()
    let args = messageArray.slice(1);
    if(!message.content.startsWith(prefix)) return;
    let cmd = bot.commands.get(command.slice(prefix.length));
    if(cmd) cmd.run(bot,message,args);
});

bot.login(token);