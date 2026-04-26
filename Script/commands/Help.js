// author: "SIYAM"

const axios = require("axios");
const fs = require("fs");
const path = require("path");

let xfont = null;
let yfont = null;
let categoryEmoji = null;

// 🎬 VIDEO LINK (UNCHANGED)
const HELP_GIF = "https://files.catbox.moe/dy5mqr.mp4";

// 🔒 AUTHOR LOCK
const AUTHOR_NAME = "SIYAM";
const FILE_PATH = __filename;

function checkAuthorLock() {
  try {
    const fileData = fs.readFileSync(FILE_PATH, "utf-8");
    if (!fileData.includes(`author: "${AUTHOR_NAME}"`)) {
      console.log("❌ AUTHOR CHANGED! FILE LOCKED.");
      return false;
    }
    return true;
  } catch {
    return false;
  }
}

// 🔥 AUTO DELETE SYSTEM
function sendAndDelete(api, msg, threadID) {
  api.sendMessage(msg, threadID, (err, info) => {
    if (!err) {
      setTimeout(() => {
        api.unsendMessage(info.messageID);
      }, 180000); // 3 মিনিট
    }
  });
}

// 🔥 LOAD RESOURCES
async function loadResources() {
  try {
    const [x, y, c] = await Promise.all([
      axios.get("https://raw.githubusercontent.com/Saim-x69x/sakura/main/xfont.json"),
      axios.get("https://raw.githubusercontent.com/Saim-x69x/sakura/main/yfont.json"),
      axios.get("https://raw.githubusercontent.com/Saim-x69x/sakura/main/category.json")
    ]);
    xfont = x.data;
    yfont = y.data;
    categoryEmoji = c.data;
  } catch {
    xfont = {};
    yfont = {};
    categoryEmoji = {};
  }
}

// 🔥 FONT STYLE
function fontConvert(text, type = "command") {
  const map = type === "category" ? xfont : yfont;
  return text.split("").map(c => map[c] || c).join("");
}

function getCategoryEmoji(cat) {
  return categoryEmoji?.[cat.toLowerCase()] || "🗂️";
}

function roleText(role) {
  const roles = { 0: "User", 1: "Admin Group", 2: "Admin Bot" };
  return roles[role] || "Unknown";
}

// 🔥 FIND COMMAND
function findCommand(name) {
  name = name.toLowerCase();
  const commands = global.client.commands;

  for (const [cmdName, cmd] of commands) {
    if (cmdName === name) return cmd;
    if (cmd.config.aliases?.includes(name)) return cmd;
  }
  return null;
}

module.exports.config = {
  name: "help",
  version: "3.0.0",
  hasPermssion: 0,
  credits: "SIYAM EDIT",
  description: "Premium Help Menu",
  commandCategory: "system",
  usages: "[command | -c category]",
  cooldowns: 5
};

// 🔥 MAIN RUN
module.exports.run = async function ({ api, event, args, permssion }) {
  const { threadID, messageID } = event;

  if (!checkAuthorLock()) {
    return sendAndDelete(api, "❌ FILE LOCKED!", threadID);
  }

  if (!xfont) await loadResources();

  const prefix = global.config.PREFIX || ",";
  const commands = global.client.commands;

  const categories = {};

  for (const [name, cmd] of commands) {
    if (cmd.config.hasPermssion > permssion) continue;

    const cat = (cmd.config.commandCategory || "OTHER").toUpperCase();

    if (!categories[cat]) categories[cat] = [];
    categories[cat].push(name);
  }

  // 📂 CATEGORY VIEW
  if (args[0] === "-c" && args[1]) {
    const cat = args[1].toUpperCase();

    if (!categories[cat])
      return sendAndDelete(api, `❌ Category "${cat}" not found`, threadID);

    let msg = `╭─────✰『 ${getCategoryEmoji(cat)} ${fontConvert(cat, "category")} 』\n`;

    for (const c of categories[cat])
      msg += `│⚡ ${fontConvert(c)}\n`;

    msg += `╰────────────✰\n`;
    msg += `> TOTAL: ${categories[cat].length}\n> PREFIX: ${prefix}`;

    const stream = (await axios.get(HELP_GIF, { responseType: "stream" })).data;

    return sendAndDelete(api, {
      body: msg,
      attachment: stream
    }, threadID);
  }

  // 📜 FULL LIST
  if (!args[0]) {
    let msg = `╭───────❁
│✨ ‿𝐃-𝐒 𝐒𝐈𝐘𝐀𝐌 𝗛𝗘𝗟𝗣 𝗟𝗜𝗦𝗧 ✨
╰────────────❁
`;

    for (const cat of Object.keys(categories)) {
      msg += `╭─────✰『 ${getCategoryEmoji(cat)} ${fontConvert(cat, "category")} 』\n`;

      for (const c of categories[cat])
        msg += `│⚡ ${fontConvert(c)}\n`;

      msg += `╰────────────✰\n`;
    }

    const total = Object.values(categories).reduce((a, b) => a + b.length, 0);

    msg += `╭─────✰[🌟 𝐄𝐍𝐉𝐎𝐘 🌟]
│> TOTAL COMMANDS: [${total}]
│
│> TYPE: [ ${prefix}help <command> ]
│
│> FB.LINK: [https://facebook.com/61560326905548]
╰────────────✰
`;

    msg += `╭─────✰
│ 💖 𝆠፝𝐒𝐈𝐘𝐀𝐌-𝗕𝗢𝗧 💖
╰────────────✰`;

    const stream = (await axios.get(HELP_GIF, { responseType: "stream" })).data;

    return sendAndDelete(api, {
      body: msg,
      attachment: stream
    }, threadID);
  }

  // 🔍 COMMAND INFO
  const cmd = findCommand(args[0]);

  if (!cmd)
    return sendAndDelete(api, "❌ Command not found", threadID);

  const c = cmd.config;

  let msg = `╭─── COMMAND INFO ───╮
🔹 Name : ${c.name}
📂 Category : ${c.commandCategory}
👥 Role : ${roleText(c.hasPermssion)}
📝 Description : ${c.description}
📖 Usage : ${prefix}${c.name}
╰──────────────────╯`;

  const stream = (await axios.get(HELP_GIF, { responseType: "stream" })).data;

  return sendAndDelete(api, {
    body: msg,
    attachment: stream
  }, threadID);
};
