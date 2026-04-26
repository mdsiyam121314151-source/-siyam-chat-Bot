const { writeFileSync, existsSync } = require("fs-extra");
const { resolve } = require("path");
const fs = require("fs");
const axios = require("axios");

module.exports.config = {
  name: "sadmin",
  version: "2.0.0",
  hasPermssion: 2,
  credits: "SHAHADAT SAHU + SIYAM EDIT",
  description: "Admin Management System",
  commandCategory: "Admin",
  usages: "[list | add | remove | only | boxonly | info]",
  cooldowns: 0,
  usePrefix: true,
  dependencies: { "fs-extra": "", "axios": "" }
};

module.exports.languages = {
  en: {
    listAdmin: "👑 Admin List:\n\n%1",
    noPermission: "❎ You don't have permission to use \"%1\"",
    addedAdmin: "✅ Added %1 admin(s):\n\n%2",
    removedAdmin: "✅ Removed %1 admin(s):\n\n%2",
    adminOnlyOn: "Admin-only mode enabled....🔓",
    adminOnlyOff: "Admin-only mode disabled✅",
    boxOnlyOn: "Group admin-only mode enabled....🔓",
    boxOnlyOff: "Group admin-only mode disabled✅",

    info: `👑 ╔═━━━💎 𝐏𝐑𝐄𝐌𝐈𝐔𝐌 𝐏𝐑𝐎𝐅𝐈𝐋𝐄 💎━━━═╗ 👑

✨ 𝐍𝐚𝐦𝐞: 𝐔𝐝𝐨𝐲 𝐇𝐚𝐬𝐚𝐧 𝐒𝐢𝐲𝐚𝐦
🎨 𝐑𝐨𝐥𝐞: 𝐅𝐫𝐨𝐧𝐭 𝐃𝐞𝐬𝐢𝐠𝐧𝐞𝐫 (VIP)

🏡 𝐋𝐨𝐜𝐚𝐭𝐢𝐨𝐧: Kishoreganj, Bangladesh
🎓 𝐂𝐥𝐚𝐬𝐬: 10
🎂 𝐀𝐠𝐞: 17+
🏫 𝐒𝐜𝐡𝐨𝐨𝐥: M A Mannan Manik High School
💔 𝐒𝐭𝐚𝐭𝐮𝐬: Single

🔗 Facebook:
facebook.com/61560326905548

📞 Contact:
+8801789138157

💎 Unique • Premium • Different 💎

👑 ╚═━━━💎 𝐒𝐈𝐘𝐀𝐌 𝐁𝐎𝐒𝐒 💎━━━═╝ 👑`
  }
};

module.exports.onLoad = () => {
  const path = resolve(__dirname, "cache", "data.json");
  if (!existsSync(path)) writeFileSync(path, JSON.stringify({ adminbox: {} }, null, 4));
};

module.exports.run = async function ({ api, event, args, Users, permssion, getText }) {
  const { threadID, messageID, mentions } = event;
  const content = args.slice(1);
  const mentionIDs = Object.keys(mentions);
  const { configPath } = global.client;

  delete require.cache[require.resolve(configPath)];
  const config = require(configPath);

  const ADMINBOT = global.config.ADMINBOT || config.ADMINBOT || [];

  const getUIDs = () => {
    if (event.type === "message_reply") return [event.messageReply.senderID];
    if (mentionIDs.length) return mentionIDs;
    if (!isNaN(content[0])) return [content[0]];
    return [];
  };

  switch (args[0]) {

    case "info": {
      // 👉 এখানে তোমার DIRECT IMAGE LINK বসাও
      const imgURL = "https://i.imgur.com/PUT_YOUR_DIRECT_LINK.png";

      const stream = (await axios.get(imgURL, { responseType: "stream" })).data;

      return api.sendMessage({
        body: getText("info"),
        attachment: stream
      }, threadID, messageID);
    }

    case "list":
    case "all": {
      const msg = [];
      for (const id of ADMINBOT) {
        const name = (await Users.getData(id)).name;
        msg.push(`• ${name}\nhttps://facebook.com/${id}`);
      }
      return api.sendMessage(getText("listAdmin", msg.join("\n\n")), threadID, messageID);
    }

    case "add": {
      if (permssion != 3) return api.sendMessage(getText("noPermission", "add"), threadID, messageID);
      const ids = getUIDs();
      const added = [];

      for (const id of ids) {
        if (!ADMINBOT.includes(id)) {
          ADMINBOT.push(id);
          config.ADMINBOT.push(id);
          const name = (await Users.getData(id)).name;
          added.push(`• ${name} (${id})`);
        }
      }

      writeFileSync(configPath, JSON.stringify(config, null, 4));
      return api.sendMessage(getText("addedAdmin", added.length, added.join("\n")), threadID, messageID);
    }

    case "remove":
    case "rm": {
      if (permssion != 3) return api.sendMessage(getText("noPermission", "remove"), threadID, messageID);
      const ids = getUIDs();
      const removed = [];

      for (const id of ids) {
        const index = ADMINBOT.indexOf(id);
        if (index !== -1) {
          ADMINBOT.splice(index, 1);
          config.ADMINBOT.splice(index, 1);
          const name = (await Users.getData(id)).name;
          removed.push(`• ${name} (${id})`);
        }
      }

      writeFileSync(configPath, JSON.stringify(config, null, 4));
      return api.sendMessage(getText("removedAdmin", removed.length, removed.join("\n")), threadID, messageID);
    }

    case "only": {
      if (permssion != 3) return api.sendMessage(getText("noPermission", "only"), threadID, messageID);
      config.adminOnly = !config.adminOnly;
      writeFileSync(configPath, JSON.stringify(config, null, 4));
      return api.sendMessage(config.adminOnly ? getText("adminOnlyOn") : getText("adminOnlyOff"), threadID, messageID);
    }

    case "boxonly": {
      if (permssion != 3) return api.sendMessage(getText("noPermission", "boxonly"), threadID, messageID);
      const path = resolve(__dirname, "cache", "data.json");
      delete require.cache[require.resolve(path)];
      const database = require(path);

      database.adminbox[threadID] = !database.adminbox[threadID];
      writeFileSync(path, JSON.stringify(database, null, 4));

      return api.sendMessage(
        database.adminbox[threadID] ? getText("boxOnlyOn") : getText("boxOnlyOff"),
        threadID,
        messageID
      );
    }

    default:
      return;
  }
};
