const Discord = require("discord.js");
const bot = new Discord.Client({disableEveryone: true});


bot.on("ready", async () => {
  console.log(`${bot.user.username} is online!`);

  bot.user.setActivity("Type #help ✔", {type: "Watching"});
});

bot.on("message", async message => {

  if (message.author.bot) return;
  if (message.channel.type === "dm") return;

  let prefix = '#';
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);
  

  if (cmd === `${prefix}help`){
    message.channel.send("```BOT-Commands: Prefix >>\n\navatar - Gets a user's avatar \nsay - {TEXT} u want type\nping - check your ping\nclear - Clean a message\nkick - kick member from server\nban - ban member from server```");
    message.delete();
    message.channel.send(text);
  }


  if(cmd === `${prefix}say`){
   if(!message.member.roles.some(r=>["OWNER", "ADMIN"].includes(r.name)) )
      return message.reply("Sorry, you don't have permissions to use this!");
  let text = args.slice(1).join(" ");
  message.delete();
  message.channel.send(text);
}

 if(cmd === `${prefix}ping`){
 message.channel.send(new Date().getTime() - message.createdTimestamp + " ms :satellite: ");

}


 if(cmd === `${prefix}clear`){
    const deleteCount = parseInt(args[0], 10);
    if(!deleteCount || deleteCount < 2 || deleteCount > 100)
      return message.reply("Please provide a number between 2 and 100 for the number of messages to delete");
    if(!message.member.roles.some(r=>["OWNER", "ADMIN"].includes(r.name)) )
      return message.reply("Sorry, you don't have permissions to use this!");
    const fetched = await message.channel.fetchMessages({count: deleteCount});
    message.channel.bulkDelete(fetched)
      .catch(error => message.reply(`Couldn't delete messages because of: ${error}`));
  }

 
 if(cmd === `${prefix}kick`){

    //!kick @daeshan askin for it

    let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!kUser) return message.channel.send("```md\n# Please mention one user in order to kick them!\n- kick [@user] [reason]```");
    let kReason = args.join(" ").slice(22);
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You Need To [KICK MEMBER] Permissions !");
    if(kUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("That person can't be kicked!");

    let kickEmbed = new Discord.RichEmbed()
    .setImage(message.author.avatarURL)
    .setColor("#635b0c")
    .addField("Kicked User", `${kUser}`)
    .addField("Kicked By", `<@${message.author.id}>`)
    .addField("Kicked In", message.channel)
    .addField("Time", message.createdAt)
    .addField("Reason", kReason);


    message.guild.member(kUser).kick(kReason);
    return message.channel.send(botembed);
  }  

 if(cmd === `${prefix}serverinfo`){

    let sicon = message.guild.iconURL;
    let serverembed = new Discord.RichEmbed()
    .setDescription("Server Info")
    .setColor("#f58be1")
    .setThumbnail(sicon)
    .addField("Server Name", message.guild.name)
    .addField("Created On", message.guild.createdAt)
    .addField("You Joined", message.member.joinedAt)
    .addField("Total Members", message.guild.memberCount);

    return message.channel.send(serverembed);
  } 

  if(cmd === `${prefix}botinfo`){

    let bicon = bot.user.displayAvatarURL;
    let botembed = new Discord.RichEmbed()
    .setTitle("Bot Information")
    .setColor("#ae67fc")
    .setThumbnail(bicon)
    .addField("Bot Name", bot.user.username)
    .addField("Created On", bot.user.createdAt);

    return message.channel.send(botembed);
  }

  if(cmd === `${prefix}report`){

    //!report @ned this is the reason

    let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!rUser) return message.channel.send("Couldn't find user.");
    let rreason = args.join(" ").slice(22);

    let reportEmbed = new Discord.RichEmbed()
    .setDescription("Reports")
    .setColor("#15f153")
    .addField("Reported User", `${rUser}`)
    .addField("Reported By", `${message.author}`)
    .addField("Channel", message.channel)
    .addField("Time", message.createdAt)
    .addField("Reason", rreason);

    let reportschannel = message.guild.channels.find(`name`, "reports");
    if(!reportschannel) return message.channel.send("Couldn't find reports channel.");


    message.delete().catch(O_o=>{});
    reportschannel.send(reportEmbed);

    return;
  }

  if(cmd === `${prefix}avatar`){

    let bicon = bot.user.displayAvatarURL;
    let botembed = new Discord.RichEmbed()
    .setImage(message.author.avatarURL.addField)
    .setColor("#ae67fc")
    .setFooter(`Powered By TaMoToJi`)

    return message.channel.send(botembed);
    message.delete();
    message.channel.send(text);
  }

  if(cmd === `${prefix}ban`){

    let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!bUser) return message.channel.send("```md\n# Please mention one user in order to kick them!\n- ban [@user] [reason]```");
    let bReason = args.join(" ").slice(22);
    if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.channel.send("You Need To [BAN MEMBER] Permissions !");
    if(bUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("you don't have permissions to use this");

    let banEmbed = new Discord.RichEmbed()
    .setTitle("~Ban~")
    .setColor("#FF0000")
    .addField("Banned User", `${bUser}`)
    .addField("Banned By", `<@${message.author.id}>`)
    .addField("Banned In", message.channel)
    .addField("Time", message.createdAt)
    .addField("Reason", bReason);

    message.guild.member(bUser).ban(bReason);
    return message.channel.send(botembed);


    return;
  }

  if(cmd === `${prefix}invite`){

    let bicon = bot.user.displayAvatarURL;
    let botembed = new Discord.RichEmbed()
    .setAuthor("TaMoToJi's Help Commands", "https://cdn.discordapp.com/avatars/438160518293880832/0301fdd6dffcaf6751d33a809a32941d.png?size=2048")
    .setColor("#ae67fc")
    .setTitle("Hello  !I’m TaMoToJi\nStandard Command List\n140+ commands , Music , Fun, Image , Moderation , General command , Use 24/7\nAll in one , All in TaMoToJo   \niUse #help [command] to get more info on a seacific command ")
    .setThumbnail(bicon)
    .addBlankField(true)
    .setDescription("[Click Here](https://tamotoji533.wixsite.com/healong) View To Website :globe_with_meridians:")
    .setImage("https://cdn.discordapp.com/attachments/364284401497931786/438579603465043975/Screenshot_2018-04-25-12-58-16.png")
    .setFooter("Powered By TaMoToJi", "https://cdn.discordapp.com/avatars/438160518293880832/0301fdd6dffcaf6751d33a809a32941d.png?size=2048")
    .addBlankField(true)

    return message.channel.send(botembed);

  }


});

bot.login(process.env.token);
