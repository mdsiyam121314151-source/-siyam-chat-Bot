const moment = require("moment-timezone");
const fs = require("fs-extra");
const request = require("request");

module.exports.config = {
  name: "info",
  version: "2.6.0",
  hasPermssion: 0,
  credits: "FARHAN-KHAN",
  description: "Owner & bot information",
  commandCategory: "owner",
  usages: "",
  cooldowns: 20
};

module.exports.run = async function ({ api, event }) {

  const { threadID, messageID } = event;

  // ✅ AUTO CREATE CACHE FOLDER
  const cachePath = __dirname + "/cache";
  if (!fs.existsSync(cachePath)) {
    fs.mkdirSync(cachePath, { recursive: true });
  }

  // ================= OWNER INFO =================
  const ownerName = "UDAY HASAN SIYAM";
  const ownerAge = "17+";
  const ownerFB = "[https://facebook.com/61560326905548]";
  const ownerNumber = "+8801789138157";

  // ================= BOT INFO =================
  const botName = global.config.BOTNAME || "NIJHUM";
  const prefix = global.config.PREFIX || ".";
  const totalCommands = global.client.commands.size;

  // ================= TIME =================
  const now = moment().tz("Asia/Dhaka");
  const date = now.format("MMMM Do YYYY");
  const time = now.format("h:mm:ss A");

  // ================= UPTIME =================
  const uptime = process.uptime();
  const days = Math.floor(uptime / 86400);
  const hours = Math.floor((uptime % 86400) / 3600);
  const minutes = Math.floor((uptime % 3600) / 60);
  const seconds = Math.floor(uptime % 60);
  const uptimeString = `${days}d ${hours}h ${minutes}m ${seconds}s`;

  // ================= MEDIA =================
  const imgLink = "https://files.catbox.moe/8f2fc5.mp4";
  const filePath = cachePath + "/info.mp4";

  const callback = () => {
    api.sendMessage({
      body: `⋆✦⋆⎯⎯⎯⎯⎯⎯⎯⎯⎯⋆✦⋆
‎    ╭•┄┅══❁🌺❁══┅┄•╮
 •—»✨𝗢𝗪𝗡𝗘𝗥 𝗜𝗡𝗙𝗢✨«—•
‎    ╰•┄┅══❁🌺❁══┅┄•╯
‎⋆✦⋆⎯⎯⎯⎯⎯⎯⎯⎯⎯⋆✦⋆

╔══════════════════════╗
║ 👑 𝗢𝗪𝗡𝗘𝗥 ➤ 𝗨𝗗𝗔𝗬 𝗛𝗔𝗦𝗔𝗡 𝗦𝗜𝗬𝗔𝗠
║ 🤖 𝗕𝗢𝗧 ➤ ${botName}
╠══════════════════════╣
║ 🕌 𝗥𝗘𝗟𝗜𝗚𝗜𝗢𝗡 ➤ 𝗜𝗦𝗟𝗔𝗠
║ 🎂 𝗔𝗚𝗘 ➤ 𝟭𝟳+
║ 🚹 𝗚𝗘𝗡𝗗𝗘𝗥 ➤ 𝗠𝗔𝗟𝗘
╠══════════════════════╣
║ 🌐 𝗙𝗔𝗖𝗘𝗕𝗢𝗢𝗞 ↓
║ ➤ ${ownerFB}
║
║ 📞 𝗪𝗛𝗔𝗧𝗦𝗔𝗣𝗣 ↓
║ ➤ ${ownerNumber}
╠══════════════════════╣
║ ⚡ 𝗣𝗥𝗘𝗙𝗜𝗫 ➤ ${prefix}
║ 📦 𝗖𝗢𝗠𝗠𝗔𝗡𝗗𝗦 ➤ ${totalCommands}
║ 🚀 𝗣𝗜𝗡𝗚 ➤ ${Date.now() - event.timestamp}ms
╠══════════════════════╣
║ ⏳ 𝗨𝗣𝗧𝗜𝗠𝗘 ➤ ${uptimeString}
║ 🕒 𝗧𝗜𝗠𝗘 ➤ ${time}
║ 📅 𝗗𝗔𝗧𝗘 ➤ ${date}
╠══════════════════════╣
║ 🏠 𝗔𝗗𝗗𝗥𝗘𝗦𝗦
║ ➤ 𝗞𝗜𝗦𝗛𝗢𝗥𝗘𝗚𝗔𝗡𝗝
║ ➤ 𝗕𝗔𝗡𝗚𝗟𝗔𝗗𝗘𝗦𝗛
║
║ 💔 𝗦𝗧𝗔𝗧𝗨𝗦 ➤ 𝗦𝗜𝗡𝗚𝗟𝗘
║ 🧑‍🎓 𝗪𝗢𝗥𝗞 ➤ 𝗦𝗧𝗨𝗗𝗘𝗡𝗧
╠══════════════════════╣

⊱༅༎😽💚༅༎⊱
➤ আমি নিজের মতোই চলি 😎  
➤ আমি কপি না, আমি আলাদা 🔥  
➤ যারে ভালোবাসি, শেষ পর্যন্ত 🖤  
⊱༅༎😽💚༅༎⊱

╠══════════════════════╣
♡ 𝗧𝗛𝗔𝗡𝗞𝗦 𝗙𝗢𝗥 𝗨𝗦𝗜𝗡𝗚 ♡
      ♡ 𝗡𝗜𝗝𝗛𝗨𝗠 𝗕𝗢𝗧 ♡
╚══════════════════════╝`,
      attachment: fs.createReadStream(filePath)
    }, threadID, () => fs.unlinkSync(filePath), messageID);
  };

  return request(encodeURI(imgLink))
    .pipe(fs.createWriteStream(filePath))
    .on("close", callback);
};
