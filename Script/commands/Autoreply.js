const axios = require("axios");

const apiList = "https://raw.githubusercontent.com/shahadat-sahu/SAHU-API/refs/heads/main/SAHU-API.json";

const getMainAPI = async () => (await axios.get(apiList)).data.simsimi;

module.exports.config = {
  name: "autoreplybot",
  version: "2.0.0",
  hasPermssion: 0,
  credits: "SHAHADAT SAHU",
  usePrefix: false,
  commandCategory: "Chat",
  cooldowns: 0
};

module.exports.handleEvent = async function ({ api, event }) {
  const { threadID, messageID, body, senderID } = event;
  if (!body) return;

  const msg = body.toLowerCase().trim();

  const responses = {

    "কেমন আছো": `
😂💞 আলহামদুলিল্লাহ ভালো জান..?
😜📲 আমার বস সিয়াম কে হাঙ্গা করবা নাকি!
😏👻 আগে ফেসবুকে নক দাও—
😘 https://facebook.com/61560326905548
`,

    "": "হুম আমি ও তোমাকে Miss করি... কিন্তু সাহু বস বেশি করে 😏💖",

    "kiss me": `
🤬 কিস দিস না!
😷 তোর মুখে দূর গন্ধ!
🪥 দাঁত ব্রাশ কর আগে!
👉 https://facebook.com/61560326905548
`,

    "👍": `
😎🚫 সিয়াম বস গ্রুপে হাত মারতে মানা করছে..!
🐸🤣 বুঝছস তো?
👉 https://facebook.com/61560326905548
`,

    "hi": `
😜 এত হাই-হ্যালো কর ক্যান প্রিও!
🫵 একটু থামো তো!
👉 https://facebook.com/61560326905548
`,

    "হাই": `
😜 এত হাই-হ্যালো কর ক্যান প্রিও!
🫵 একটু থামো তো!
👉 https://facebook.com/61560326905548
`,

    "বস": `
👑🔥 𝑴𝒚 𝑩𝒐𝒔𝒔 𝑺𝒊𝒚𝒂𝒎
😎💎 একটাই বস!
`,

    "ভার্চুয়াল কিং": `
😏👑 ভার্চুয়াল টপ কিং—আমার বস সিয়াম
🔥💎 তুই তো ওর লেভেলেই নাই!
🚫😤 যা ভাগ!
👉 https://facebook.com/61560326905548
`,

    "good morning": `
🌞 GOOD MORNING
🪥 আগে দাঁত ব্রাশ কর!
😚 তারপর খাও!
👉 https://facebook.com/61560326905548
`,

    "good night": `
💤 Sweet Dream babu…
😏 আগে সিয়াম বস কে GN বল!
👉 https://facebook.com/61560326905548
`,

    "siyam": `
👑 উনি এখন বিজি আছে!
😘 যা বলবা আমাকে বলো…
📲 না হলে ইনবক্সে নক দাও
👉 https://facebook.com/61560326905548
`,

    "owner": `
👑 𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍
📘 Facebook:
👉 https://facebook.com/61560326905548
📞 +8801789138157
`,

    "admin": `
😎 He is 𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍
👑 সবাই তাকে Admin হিসেবে চেনে!
👉 https://facebook.com/61560326905548
`,

    "😁": `
😂 এত হাসো কেন জান..?
😏 সব দাঁত দেখা যাচ্ছে!
💋 একটা উম্মাহ দাও বসকে!
👉 https://facebook.com/61560326905548
`,

    "chup": `
😏 তুই চুপ কর?
🔥 না, আমি চুপ করবো না!
💔 বসকে প্রেম করাই দাওনি!
👉 https://facebook.com/61560326905548
`,

    "Assalamualaikum": `
❤️‍🩹 Walaikumassalam
👉 https://facebook.com/61560326905548
`,

    "thanks": `
🐸🥵 এত ধন্যবাদ না দিয়ে…
😏 তোর গার্লফ্রেন্ড বসকে দে!
👉 https://facebook.com/61560326905548
`,

    "i love you": `
😻 মেয়ে হলে বস 𝐒𝐈𝐘𝐀𝐌 এর ইনবক্সে যাও!
👉 https://facebook.com/61560326905548
`,

    "by": `
🌚 কোথায় যাস?
🌶️ কোনো মেয়ের সাথে চিপায়?
👉 https://facebook.com/61560326905548
`,

    "🤣": `
🌚 ভাই এত হাসিস না!
🤣 একটু থাম!
`,

    "বট ফট": `
😏 বট ফট বলস?
🤣 কেরে অপমান করছিস!
🤖 সাবধানে কথা বল ভাই!
👉 https://facebook.com/61560326905548
`,

    "কিরে বট": `
😽 হ্যাঁ বলো…
😘 উম্মাহ নাও আগে!
👉 https://facebook.com/61560326905548
`
  };

  // 🔥 ALIAS SYSTEM
  const aliases = {
    "hi": ["hi", "hii", "hello", "hey", "হাই"],
    "কিরে বট": ["কিরে বট", "kire bot", "bot"],
    "siyam": ["siyam", "siam", "সিয়াম"],
    "good morning": ["good morning", "gm"],
    "good night": ["good night", "gn"],
    "thanks": ["thanks", "thank you"],
    "i love you": ["i love you", "love you"],
    "Assalamualaikum": ["assalamualaikum", "aslamu"]
  };

  let key = null;

  for (const main in aliases) {
    if (aliases[main].includes(msg)) {
      key = main;
      break;
    }
  }

  if (!key && responses[msg]) key = msg;
  if (!key) return;

  return api.sendMessage(responses[key], threadID, messageID);
};

module.exports.run = async function ({ api, event }) {
  return module.exports.handleEvent({ api, event });
};
