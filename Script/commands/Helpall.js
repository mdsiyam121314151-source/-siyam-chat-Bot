const axios = require("axios");

module.exports = {
  config: {
    name: "helpall",
    version: "3.1.0",
    author: "UDAY HASAN SIYAM",
    countDown: 5,
    role: 0,
    shortDescription: {
      en: "Show all commands (Mirai Style)"
    },
    longDescription: {
      en: "Display full command list with Mirai design"
    },
    category: "system",
    guide: {
      en: "{pn}helpall / {pn}helpall <command>"
    }
  },

  onStart: async function ({ message, args, event, role }) {

    const prefix = global.GoatBot.config.prefix;
    const groupName = event.threadName || "UNKNOWN GROUP";

    // ✅ ONLY YOUR IMAGE
    const mediaLinks = [
      "https://files.catbox.moe/69brrg.jpg"
    ];

    const { commands, aliases } = global.GoatBot;

    // 🔥 MAIN MENU
    if (!args[0]) {

      let msg = `
╔═══❖ 🌟 𝐌𝐈𝐑𝐀𝐈 𝐇𝐄𝐋𝐏 𝐌𝐄𝐍𝐔 🌟 ❖═══╗

👑 GROUP : ${groupName}
⚙️ PREFIX : ${prefix}

╠═══════════════════════╣
`;

      const categories = {};

      for (const [name, cmd] of commands) {
        if (!cmd.config || cmd.config.role > role) continue;

        const category = (cmd.config.category || "OTHER").toUpperCase();
        if (!categories[category]) categories[category] = [];

        categories[category].push(name);
      }

      for (const cat of Object.keys(categories).sort()) {
        msg += `
╔═❖ ${cat} ❖═╗
`;
        for (const name of categories[cat].sort()) {
          msg += `║ ➤ ${name}\n`;
        }
        msg += `╚═══════════════╝\n`;
      }

      const total = Object.values(categories).reduce((a, b) => a + b.length, 0);

      msg += `
╠═══════════════════════╣
📊 TOTAL COMMANDS : ${total}

📖 USE : ${prefix}helpall <command>

👑 OWNER : 𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍
🌐 FB : [https://facebook.com/61560326905548]

╚═══❖ 🌟 END 🌟 ❖═══╝
`;

      try {
        const randomLink = mediaLinks[0]; // ✅ FIXED IMAGE
        const stream = await axios.get(randomLink, { responseType: "stream" }).then(res => res.data);

        return message.reply({
          body: msg,
          attachment: stream
        });

      } catch {
        return message.reply(msg);
      }
    }

    // 🔍 COMMAND INFO
    const cmdName = args[0].toLowerCase();
    const cmd = commands.get(cmdName) || commands.get(aliases.get(cmdName));

    if (!cmd) {
      return message.reply(`❌ Command "${cmdName}" not found`);
    }

    const cfg = cmd.config;

    const roleText =
      cfg.role == 0 ? "All Users" :
      cfg.role == 1 ? "Group Admin" :
      cfg.role == 2 ? "Bot Admin" : "Unknown";

    const usage = (cfg.guide?.en || "No guide")
      .replace(/{pn}/g, prefix)
      .replace(/{n}/g, cfg.name);

    const info = `
╔═══❖ 🔍 COMMAND INFO ❖═══╗

🔹 NAME : ${cfg.name}
📂 CATEGORY : ${cfg.category}

📜 DESCRIPTION :
${cfg.longDescription?.en || "No description"}

⚙️ USAGE :
${usage}

🔐 PERMISSION : ${roleText}
🔄 VERSION : ${cfg.version}

👑 AUTHOR : ${cfg.author}

╚═══════════════════════╝
`;

    return message.reply(info);
  }
};
