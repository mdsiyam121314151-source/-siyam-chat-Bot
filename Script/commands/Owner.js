const fs = require("fs-extra");
const request = require("request");
const path = require("path");

module.exports.config = {
  name: "owner",
  version: "1.3.2",
  hasPermssion: 0,
  credits: "Farhan-Khan",
  description: "Owner information with image",
  commandCategory: "Information",
  usages: "",
  cooldowns: 5
};

module.exports.run = async function ({ api, event }) {

  const ownerText = 
`╔═══❖𝗢𝗪𝗡𝗘𝗥 𝗜𝗡𝗙𝗢❖═══╗
 
 ‎⋆✦⋆⎯⎯⎯⎯⎯⎯⎯⎯⎯⋆✦⋆ 
  [🤖]↓:𝐁𝐎𝐓→𝐀𝐃𝐌𝐈𝐍:↓
  ➤ 『 𝐔𝐃𝐀𝐘 𝐇𝐀𝐒𝐀𝐍 𝐒𝐈𝐘𝐀𝐌 』
 ‎⋆✦⋆⎯⎯⎯⎯⎯⎯⎯⎯⎯⋆✦⋆

╠══❖『𝐁𝐈𝐎 𝐀𝐃𝐌𝐈𝐍』❖══╣
 ⊱༅༎😽💚༅༎⊱

-আমি নিজের মতোই চলি 😎🔥  
-আমি কপি না, আমি আলাদা 🖤  
-যারে ভালোবাসি, শেষ পর্যন্ত 💯  

  ⊱༅༎😽💚༅༎⊱
╠═════════════════╣

[🏠]↓:𝐀𝐃𝐃𝐑𝐄𝐒𝐒:↓
➤ 『 𝐊𝐈𝐒𝐇𝐎𝐑𝐄𝐆𝐀𝐍𝐉 』
‎
⋆✦⋆⎯⎯⎯⎯⎯⎯⎯⎯⎯⋆✦⋆

[🕋]↓:𝐑𝐄𝐋𝐈𝐆𝐈𝐎𝐍:↓
➤ 『 𝐈𝐒𝐋𝐀𝐌 』

‎⋆✦⋆⎯⎯⎯⎯⎯⎯⎯⎯⎯⋆✦⋆

[🚻]↓:𝐆𝐄𝐍𝐃𝐄𝐑:↓
➤ 『 𝐌𝐀𝐋𝐄 』

‎⋆✦⋆⎯⎯⎯⎯⎯⎯⎯⎯⎯⋆✦⋆

[💞]↓:𝐑𝐑𝐄𝐋𝐀𝐓𝐈𝐎𝐍𝐒𝐇𝐈𝐏:↓
➤ 『 𝐒𝐈𝐍𝐆𝐋𝐄 』

‎⋆✦⋆⎯⎯⎯⎯⎯⎯⎯⎯⎯⋆✦⋆

[🧑‍🎓]↓:𝐖𝐎𝐑𝐊:↓
➤ 『 𝐒𝐓𝐔𝐃𝐄𝐍𝐓 』

‎⋆✦⋆═══🅲🅾🅽🆃🅰🅲🆃═══⋆✦⋆

[📞] 𝗪𝗛𝗔𝗧𝗦𝗔𝗣𝗣
➤ https://wa.me/+8801789138157

[🌍] 𝐅𝐀𝐂𝐄𝐁𝐎𝐎𝐊 𝐈𝐃 (❶)
➤ https://facebook.com/61560326905548

[🌍] 𝐅𝐀𝐂𝐄𝐁𝐎𝐎𝐊 𝐈𝐃 (❷)
➤ https://facebook.com/61560326905548

╚═══❖𝗧𝗛𝗔𝗡𝗞 𝗬𝗢𝗨❖═══╝`;

  const cacheDir = path.join(__dirname, "cache");
  const imgPath = path.join(cacheDir, "owner.jpg");

  // ✅ cache auto create
  if (!fs.existsSync(cacheDir)) {
    fs.mkdirSync(cacheDir, { recursive: true });
  }

  // ✅ SAME IMAGE (UNCHANGED)
  const imgLink = "https://i.ibb.co/k2v8jSjW/image0.jpg";

  const callback = () => {
    api.sendMessage(
      {
        body: ownerText,
        attachment: fs.createReadStream(imgPath)
      },
      event.threadID,
      () => fs.unlinkSync(imgPath),
      event.messageID
    );
  };

  request(encodeURI(imgLink))
    .pipe(fs.createWriteStream(imgPath))
    .on("close", callback)
    .on("error", () => {
      api.sendMessage(ownerText, event.threadID, event.messageID);
    });
};
