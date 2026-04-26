const fs = require("fs");
const path = require("path");

module.exports.config = {
  name: "filecmd",
  aliases: ["file2"],
  version: "2.0",
  hasPermssion: 2,
  credits: "FARHAN-KHAN + SIYAM EDIT",
  description: "View command source code",
  commandCategory: "owner",
  usages: "filecmd <commandName> [txt]",
  cooldowns: 5
};

module.exports.run = async function ({ api, event, args }) {
  const { threadID, messageID } = event;

  const cmdName = args[0];
  const sendAsFile = args[1] === "txt";

  if (!cmdName) {
    return api.sendMessage(
      "❌ | Command নাম দাও\nExample: filecmd help",
      threadID,
      messageID
    );
  }

  const cmdPath = path.join(__dirname, `${cmdName}.js`);

  if (!fs.existsSync(cmdPath)) {
    return api.sendMessage(
      `❌ | "${cmdName}" নামে কোনো ফাইল নাই`,
      threadID,
      messageID
    );
  }

  try {
    const code = fs.readFileSync(cmdPath, "utf8");

    // 🔥 যদি txt আকারে নিতে চায়
    if (sendAsFile) {
      const cacheDir = path.join(__dirname, "cache");
      if (!fs.existsSync(cacheDir)) fs.mkdirSync(cacheDir);

      const filePath = path.join(cacheDir, `${cmdName}.txt`);
      fs.writeFileSync(filePath, code);

      return api.sendMessage(
        {
          body: `📄 | ${cmdName}.js ফাইল txt আকারে দেওয়া হলো`,
          attachment: fs.createReadStream(filePath)
        },
        threadID,
        () => fs.unlinkSync(filePath),
        messageID
      );
    }

    // 🔥 ছোট হলে normal send
    if (code.length <= 4000) {
      return api.sendMessage(
        `📄 | ${cmdName}.js ফাইলের কোড:\n\n${code}`,
        threadID,
        messageID
      );
    }

    // 🔥 বড় হলে auto split
    const chunks = code.match(/[\s\S]{1,4000}/g);

    for (let i = 0; i < chunks.length; i++) {
      await new Promise(resolve => {
        api.sendMessage(
          `📄 | ${cmdName}.js (Part ${i + 1}/${chunks.length}):\n\n${chunks[i]}`,
          threadID,
          resolve
        );
      });
    }

  } catch (err) {
    console.error(err);
    return api.sendMessage(
      "❌ | ফাইল পড়তে সমস্যা হইছে",
      threadID,
      messageID
    );
  }
};
