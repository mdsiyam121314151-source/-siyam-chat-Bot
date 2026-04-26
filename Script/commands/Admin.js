const axios = require("axios");
const request = require("request");
const fs = require("fs-extra");
const moment = require("moment-timezone");

module.exports.config = {
 name: "admin",
 version: "3.0.0",
 hasPermssion: 0,
 credits: "SIYAM PREMIUM",
 description: "VIP Owner Info (Image + Video)",
 commandCategory: "info",
 usages: "admin",
 cooldowns: 2
};

module.exports.run = async function({ api, event }) {
 const time = moment().tz("Asia/Dhaka").format("DD/MM/YYYY hh:mm:ss A");

 const callback = () => api.sendMessage({
 body: `
👑 ╔═━━━💎 𝐏𝐑𝐄𝐌𝐈𝐔𝐌 𝐎𝐖𝐍𝐄𝐑 💎━━━═╗ 👑

✨ 𝐍𝐀𝐌𝐄: 𝐔𝐃𝐎𝐘 𝐇𝐀𝐒𝐀𝐍 𝐒𝐈𝐘𝐀𝐌  
🎨 𝐑𝐎𝐋𝐄: 𝐅𝐑𝐎𝐍𝐓 𝐃𝐄𝐒𝐈𝐆𝐍𝐄𝐑 (VIP)

🏡 𝐋𝐎𝐂𝐀𝐓𝐈𝐎𝐍: Kishoreganj, Bangladesh  
🎓 𝐂𝐋𝐀𝐒𝐒: 10 | 🎂 𝐀𝐆𝐄: 17+  
🏫 𝐒𝐂𝐇𝐎𝐎𝐋: M A Mannan Manik High School  

🔗 𝐅𝐀𝐂𝐄𝐁𝐎𝐎𝐊:
facebook.com/61560326905548  

📞 𝐂𝐎𝐍𝐓𝐀𝐂𝐓:
+8801789138157  

💎 𝐕𝐈𝐁𝐄:
Unique • Premium • King Style 👑🔥

🕒 𝐔𝐏𝐃𝐀𝐓𝐄𝐃: ${time}

👑 ╚═━━━💎 𝐒𝐈𝐘𝐀𝐌 𝐁𝐎𝐒𝐒 💎━━━═╝ 👑
 `,
 attachment: [
   fs.createReadStream(__dirname + "/cache/owner.jpg"),
   fs.createReadStream(__dirname + "/cache/video.mp4")
 ]
 }, event.threadID, () => {
   fs.unlinkSync(__dirname + "/cache/owner.jpg");
   fs.unlinkSync(__dirname + "/cache/video.mp4");
 });

 // 👉 IMAGE LINK (চাইলে change করতে পারো)
 const imageURL = "https://i.imgur.com/idyXtoO.jpeg";

 // 👉 তোমার দেওয়া VIDEO LINK
 const videoURL = "https://files.catbox.moe/dy5mqr.mp4";

 // image download
 request(imageURL)
 .pipe(fs.createWriteStream(__dirname + '/cache/owner.jpg'))
 .on('close', () => {

   // video download
   request(videoURL)
   .pipe(fs.createWriteStream(__dirname + '/cache/video.mp4'))
   .on('close', () => callback());

 });

};
