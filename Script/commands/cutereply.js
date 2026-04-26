const fs = require("fs-extra");
const path = require("path");
const axios = require("axios");

const AUTHOR = "FARHAN-KHAN"; // 🔒 LOCKED AUTHOR

module.exports.config = {
  name: "cutereply",
  version: "2.1.0",
  author: AUTHOR,
  countDown: 0,
  role: 0,
  shortDescription: "Reply with text + image on trigger",
  longDescription: "Trigger মেসেজে reply দিয়ে text + image পাঠাবে",
  category: "system"
};

// 🔒 AUTHOR LOCK
if (module.exports.config.author !== AUTHOR) {
  console.log("❌ AUTHOR CHANGED! FILE LOCKED!");
  process.exit(1);
}

const cooldown = 10000;
const last = {};

// =======================
// ✨ TRIGGERS SAME রাখা হয়েছে
// =======================
const TRIGGERS = [
  {
    words: ["siyam", "Siyam", "সিয়াম ভাই", "সিয়াম"],
    text: "👉আমার বস🐮 亗𝐃𝐒 乂𝐒𝐈𝐘𝐀𝐌亗 এখন বিজি আছে । তার ইনবক্সে এ মেসেজ দিয়ে রাখো ‎‎‎‎‎‎‎‎‎[https://www.facebook.com/share/18K1jti9xb/] 🔰 ♪√বস ফ্রি হলে আসবে,! 😜🐒⚠️ সাবধান বুঝে শুনে নক দিও 😈🔥 👑 বস সিয়ামের গার্লফ্রেন্ড মাদিহা আছে 💖⚡",
    images: [
      "https://i.imgur.com/Q8IpXi2.jpeg"
    ]
  },
  {
    words: ["@নি্ঁঝু্ঁম্ঁ রা্ঁতে্ঁর্ঁ প্ঁরী্ঁ", "@নিঝুম", "@বট"],
    text: "-🤖 জানু, আমাকে মেনশন দিয়ে লাভ নাই 😏💬- কারণ আমি একটা ম্যাসেঞ্জার রোবট, শুধু মজার জন্য বানানো হইছে 😄⚡,🤖 আমাকে বানানো হয়েছে শুধুমাত্র আপনাদেরকে বিনোদনের জন্য, আমাকে বানিয়েছেন আমার বস সিয়াম হাসান-😽🫶 চাইলে আপনিও আপনার গ্রুপে নিতে পারেন [https://www.facebook.com/share/18K1jti9xb/",
    images: [
      "https://i.imgur.com/rkrXNso.jpeg",
      "https://i.imgur.com/zrpFJUc.jpeg"
    ]
  }
];

module.exports.onStart = async () => {};

// =======================
// 🔥 MIRAI CHAT HANDLER
// =======================
module.exports.onChat = async function ({ event, api }) {
  try {
    const { threadID, senderID } = event;
    const body = event.body?.toLowerCase().trim();
    if (!body) return;

    if (senderID == api.getCurrentUserID()) return;

    const now = Date.now();
    if (last[threadID] && now - last[threadID] < cooldown) return;

    let matched = null;

    for (const t of TRIGGERS) {
      if (t.words.some(w => body.includes(w.toLowerCase()))) {
        matched = t;
        break;
      }
    }

    if (!matched) return;

    last[threadID] = now;

    const imgUrl = matched.images[Math.floor(Math.random() * matched.images.length)];

    // 🔥 download via axios (Mirai friendly)
    const imgPath = path.join(__dirname, "cache", Date.now() + ".jpg");

    const response = await axios({
      url: imgUrl,
      method: "GET",
      responseType: "stream"
    });

    await new Promise((resolve, reject) => {
      const writer = fs.createWriteStream(imgPath);
      response.data.pipe(writer);
      writer.on("finish", resolve);
      writer.on("error", reject);
    });

    // 🔥 send message
    api.sendMessage({
      body: matched.text,
      attachment: fs.createReadStream(imgPath)
    }, threadID, () => fs.unlinkSync(imgPath));

  } catch (err) {
    console.log(err);
  }
};
