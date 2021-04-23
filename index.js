const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");
const privateMessage = require("./private-message");
const command = require("./command");

client.on("ready", () => {
  console.log("The client is ready!");

  command(client, "sunucu-bilgi", (message) => {
    client.guilds.cache.forEach((guild) => {
      message.channel.send(
        `\`${guild.name}\` ${guild.memberCount} kişiden oluşuyor.`
      );
    });
  });

  command(client, "temizle", (message) => {
    if (message.member.hasPermission("Administrator")) {
      const number = message.content.replace("!temizle ", "");

      if (isNaN(number)) message.channel.send("Geçerli bir sayı giriniz.");
      if (number > 100) message.channel.send("100'den küçük bir sayı giriniz.");
      if (number < 2) message.channel.send("1'den büyük bir sayı giriniz.");

      message.channel.messages.fetch({ limit: number }).then((messages) => {
        message.channel.bulkDelete(messages);
      });
    }
  });

  command(client, ["kt", "kanalı-temizle", "temizle"], (message) => {
    if (message.member.hasPermission("Administrator")) {
      message.channel.messages.fetch().then((results) => {
        message.channel.bulkDelete(results);
      });
    }
  });
  command(client, "durum", (message) => {
    const content = message.content.replace("!durum ", "");

    client.user.setPresence({
      activity: {
        name: content,
        type: 0,
      },
    });
    if (content === "!durum") {
      client.user.setPresence({
        activity: {
          name: "",
          type: 0,
        },
      });
    }
  });
  command(client, "gömülü", (message) => {
    const logo =
      "https://yt3.ggpht.com/ytc/AAUvwnjJcNyl0gDpJG-MTPUIDBCSKHKDgqYCIKu27ntv=s88-c-k-c0x00ffffff-no-rj";
    const embed = new Discord.MessageEmbed()
      .setTitle("Youtube Kanalımız")
      .setURL("https://www.youtube.com/channel/UCnZw8EJIzA7oBMb_7Fa6xew")
      .setAuthor(message.author.username)
      .setImage(logo)
      .setColor("#24ADF3");

    message.channel.send(embed);
  });
  command(client, "gömülü-video", (message) => {
    const embed = (new Discord.MessageEmbed().setColor("#24ADF3").video =
      "https://www.youtube.com/watch?v=WS-HyULrmcI");

    message.channel.send(`Yeni video yayında :\n${embed}`);
  });

  privateMessage(
    client,
    "!yardım",
    `
sunucu-bilgi : sunucu bilgisini gösterir.
durum : bot durumunu değiştirir.
kt,kanalı-temizle,temizle : kanal mesajlarını temizler.
yardım : komut listesini gösterir.
gömülü : gömülü içerik gösterir.
gömülü-video : gömülü video gösterir.
    `
  );
});

client.on("message", (message) => {
  if (
    message.content === "sa" ||
    message.content === "Sa" ||
    message.content === "SA" ||
    message.content === "Selam" ||
    message.content === "Selamünaleyküm" ||
    message.content === "merhaba" ||
    message.content === "Merhaba"
  ) {
    message.channel.send("Aleyküm selam. Hoş geldin.");
  }
  else if(
    message.content === "günaydın" ||
    message.content === "Günaydın" ||
    message.content === "günaydın." ||
    message.content == "Günaydın."
  )
  {
    var today = new Date();
    var today_str = "";
    switch (today.getDay()) {
      case 1:
        today_str = "Pazartesi";
        break;
      case 2:
        today_str = "Salı";
        break;
      case 3:
        today_str = "Çarşamba";
        break;
      case 4:
        today_str = "Perşembe";
        break;
      case 5:
        today_str = "Cuma";
        break;
      case 6:
        today_str = "Cumartesi";
        break;
      case 7:
        today_str = "Pazar";

    }
    message.channel.send(`Hayırlı sabahlar. Bugün günlerden ${today_str}.`);
	  message.react('🙂');
  }
});

client.login(config.token);
