
const express = require("express");
const path = require("path");
const TelegramBot = require("node-telegram-bot-api");

const app = express();

const PORT = process.env.PORT || 10000;

// ==================================================
// ENVIRONMENT VARIABLES
// ==================================================

const CHAPA_SECRET_KEY = process.env.CHAPA_SECRET_KEY;

const TELEGRAM_BOT_TOKEN =
  process.env.TELEGRAM_BOT_TOKEN;

const PUBLIC_BASE_URL =
  process.env.PUBLIC_BASE_URL ||
  "https://abdiimarket.onrender.com";

const WEBSITE_URL =
  process.env.WEBSITE_URL ||
  "https://abdiimarket.onrender.com";

const CONTACT_PHONE =
  process.env.CONTACT_PHONE ||
  "0930935333";

const ADMIN_CHAT_ID =
  process.env.ADMIN_CHAT_ID || "";


// ==================================================
// EXPRESS
// ==================================================

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));


// ==================================================
// PRODUCTS
// ==================================================

const PRODUCTS = [

  {
    name: "📱 iPhone 13 Pro Max",
    search: ["iphone 13 pro max", "iphone 13", "iphone"],
    details:
      "🎨 Color: Gold\n" +
      "🔋 Battery: 93% ✅\n" +
      "🔐 Face ID: Working ✅\n" +
      "🌈 True Tone: Working ✅\n" +
      "💾 Storage: 256GB ✅\n" +
      "✨ Condition: New",
    price: "102,000 ETB"
  },

  {
    name: "👟 Jordan 4",
    search: ["jordan 4", "jordan4"],
    details:
      "🎨 Color: Halluu garaagaraa qaba\n" +
      "📏 Size: 37 hanga 42\n" +
      "✨ Quality: Brand / Quality",
    price: "8,500 ETB / 5,500 ETB"
  },

  {
    name: "👟 Jordan 5",
    search: ["jordan 5", "jordan5"],
    details:
      "🎨 Color: Halluu garaagaraa qaba\n" +
      "📏 Size: 37 hanga 42\n" +
      "✨ Quality: Original Quality",
    price: "10,000 ETB"
  },

  {
    name: "👟 Air Force",
    search: ["air force", "airforce"],
    details:
      "🎨 Color: Halluu garaagaraa qaba\n" +
      "📏 Size: 35 hanga 42\n" +
      "✨ Quality: Original Quality",
    price: "7,500 ETB / 5,500 ETB"
  },

  {
    name: "⚽👕 Maliya Football Jersey",
    search: [
      "maliya",
      "jersey",
      "manchester united",
      "arsenal",
      "manchester city",
      "chelsea",
      "liverpool",
      "tottenham",
      "aston villa",
      "newcastle",
      "barcelona",
      "real madrid"
    ],
    details:
      "🎨 Color: Halluu garaagaraa qaba\n" +
      "✨ Quality: Original Quality\n\n" +
      "⚽ Kilaboota:\n" +
      "Manchester United\n" +
      "Arsenal\n" +
      "Manchester City\n" +
      "Chelsea\n" +
      "Liverpool\n" +
      "Tottenham\n" +
      "Aston Villa\n" +
      "Newcastle United\n" +
      "Barcelona\n" +
      "Real Madrid",
    price: "5,000 ETB / 3,000 ETB"
  },

  {
    name: "⌚ Men's New Fashion Watch",
    search: [
      "watch",
      "fashion watch",
      "men's watch",
      "mens watch"
    ],
    details:
      "✨ Quality: Brand / Quality\n" +
      "🎨 Color: Halluu garaagaraa qaba\n" +
      "🧩 Design: Design garaagaraa qaba",
    price:
      "30,000 / 15,000 / 10,000 / 8,000 / 5,500 / 5,000 / 3,499 / 2,999 ETB"
  },

  {
    name: "🎧 Lenovo Bluetooth Earbuds",
    search: [
      "lenovo earbuds",
      "lenovo bluetooth",
      "lenovo"
    ],
    details:
      "🏷️ Brand: Lenovo\n" +
      "📡 Bluetooth: Wireless Bluetooth\n" +
      "✨ Quality: Original",
    price: "4,500 ETB"
  },

  {
    name: "🎧 I13 Wireless Bluetooth Earphones",
    search: [
      "i13",
      "i13 earphones",
      "i13 wireless",
      "wireless earphones"
    ],
    details:
      "📡 Wireless Bluetooth\n" +
      "🎨 Color: Adii fi Gurraacha",
    price: "1,500 ETB"
  },

  {
    name: "👖 Jeans Suure Gorone",
    search: [
      "jeans",
      "suure gorone",
      "american jeans"
    ],
    details:
      "🏷️ Style: American\n" +
      "✨ Quality: Original Quality\n" +
      "🎨 Color: Halluu garaagaraa qaba\n" +
      "📏 Size: S, M, L",
    price: "5,500 ETB"
  },

  {
    name: "👖 Brand New Baggy Jeans",
    search: [
      "baggy jeans",
      "new baggy jeans"
    ],
    details:
      "✨ Quality: Original Quality / Brand\n" +
      "🎨 Color: Halluu garaagaraa qaba\n" +
      "📏 Size: S, M, L",
    price: "6,999 ETB"
  },

  {
    name: "👖 Brand New Baggy Tuta",
    search: [
      "baggy tuta",
      "tuta"
    ],
    details:
      "✨ Quality: Original Quality\n" +
      "🎨 Color: Halluu garaagaraa qaba\n" +
      "📏 Size: S, M, L",
    price: "3,999 ETB"
  },

  {
    name: "🎒 Bag Fashion",
    search: [
      "bag",
      "fashion bag",
      "laptop bag",
      "tablet bag"
    ],
    details:
      "💻 Kan laptop\n" +
      "📱 Kan tablet\n" +
      "👕 Kan uffataa\n" +
      "✨ Quality: Original\n" +
      "🎨 Color: Halluu garaagaraa qaba\n" +
      "🧩 Design: Design bareedaa garaagaraa qaba",
    price: "5,000 / 4,599 / 3,000 ETB"
  },

  {
    name: "📱 Samsung S22 Ultra 5G",
    search: [
      "samsung s22 ultra",
      "s22 ultra",
      "samsung"
    ],
    details:
      "✨ Condition: New Open Box\n" +
      "💾 Storage: 128GB / 256GB\n" +
      "🧠 RAM: 12GB\n" +
      "📶 Network: 5G\n" +
      "📲 SIM: Dual SIM\n" +
      "🔋 Battery: 5000mAh\n" +
      "🌍 Origin: Ireland",
    price: "75,000 ETB"
  },

  {
    name: "🎧 JBL Live Beam 3 Earbuds",
    search: [
      "jbl",
      "jbl earbuds",
      "live beam 3",
      "jbl live beam"
    ],
    details:
      "📦 Condition: Packed / New\n" +
      "🏷️ Brand: JBL Live Beam 3\n" +
      "📡 Type: Wireless Bluetooth Earbuds\n" +
      "🧠 Smart Features: Smart\n" +
      "🎨 Color: Halluu garaagaraa qaba",
    price: "5,999 ETB"
  },

  {
    name: "⛓️ Cuban Chain",
    search: [
      "cuban chain",
      "chain",
      "bracelet",
      "necklace"
    ],
    details:
      "✨ Quality: Original Quality\n" +
      "🎨 Color: Halluu garaagaraa qaba\n" +
      "📏 Dheeraa fi gabaabaa qaba\n" +
      "💪 Furdaa fi qal'aa qaba\n" +
      "🤲 Kan harkaaf qaba\n" +
      "📿 Kan mormaaf qaba",
    price: "3,000 / 2,000 / 1,500 ETB"
  }

];


// ==================================================
// TELEGRAM BOT
// ==================================================

let bot = null;

const userOrders = new Map();


// ==================================================
// MAIN MENU
// ==================================================

function mainMenu() {

  return {
    reply_markup: {
      inline_keyboard: [

        [
          {
            text: "🛍️ Meeshaalee Ilaali",
            callback_data: "products"
          }
        ],

        [
          {
            text: "💰 Gatii Gaafadhu",
            callback_data: "price"
          },
          {
            text: "📦 Order Godhi",
            callback_data: "order"
          }
        ],

        [
          {
            text: "🛒 Cart",
            callback_data: "cart"
          },
          {
            text: "📞 Nu Qunnami",
            callback_data: "contact"
          }
        ],

        [
          {
            text: "🌐 Website",
            url: WEBSITE_URL
          }
        ]

      ]
    }
  };

}


// ==================================================
// PRODUCT MENU
// ==================================================

function productMenu() {

  const buttons = PRODUCTS.map((product, index) => {

    return [
      {
        text: product.name,
        callback_data: `product_${index}`
      }
    ];

  });

  buttons.push([
    {
      text: "⬅️ Menu",
      callback_data: "menu"
    }
  ]);

  return {
    reply_markup: {
      inline_keyboard: buttons
    }
  };

}


// ==================================================
// START BOT
// ==================================================

if (TELEGRAM_BOT_TOKEN) {

  bot = new TelegramBot(
    TELEGRAM_BOT_TOKEN,
    {
      polling: true
    }
  );

  console.log("🤖 Telegram bot started");


  // ==================================================
  // /START
  // ==================================================

  bot.onText(/^\/start$/, async (msg) => {

    const chatId = msg.chat.id;

    userOrders.delete(chatId);

    await bot.sendMessage(

      chatId,

      `👋 *Baga gara Abdii Market dhuftan!*

🛍️ Meeshaalee qulqullina qaban bakka tokkotti argadhaa.

💰 Gatii madaalawaa
📦 Order salphaa
🚚 Geejjiba ni qabna
📞 Deeggarsa maamilaa

👇 Maal gochuu barbaadda?`,

      {
        parse_mode: "Markdown",
        ...mainMenu()
      }

    );

  });


  // ==================================================
  // CALLBACK BUTTONS
  // ==================================================

  bot.on("callback_query", async (query) => {

    const chatId =
      query.message.chat.id;

    const action =
      query.data;

    try {

      await bot.answerCallbackQuery(
        query.id
      );


      // ==================================================
      // PRODUCTS
      // ==================================================

      if (action === "products") {

        await bot.sendMessage(

          chatId,

          `🛍️ *Meeshaalee Abdii Market*

Meeshaa barbaaddu keessaa tokko filadhu 👇`,

          {
            parse_mode: "Markdown",
            ...productMenu()
          }

        );

        return;
      }


      // ==================================================
      // INDIVIDUAL PRODUCT
      // ==================================================

      if (
        action.startsWith("product_")
      ) {

        const index =
          Number(
            action.replace(
              "product_",
              ""
            )
          );

        const product =
          PRODUCTS[index];

        if (!product) {

          await bot.sendMessage(
            chatId,
            "❌ Product hin argamne."
          );

          return;
        }


        await bot.sendMessage(

          chatId,

          `🛍️ *${product.name}*

${product.details}

💰 *Gatii:* ${product.price}

📞 *Bilbila:* ${CONTACT_PHONE}
📍 *Location:* Addis Ababa`,

          {
            parse_mode: "Markdown",

            reply_markup: {
              inline_keyboard: [

                [
                  {
                    text: "📦 Meeshaa kana Order godhi",
                    callback_data:
                      `buy_${index}`
                  }
                ],

                [
                  {
                    text: "🛍️ Meeshaalee biroo",
                    callback_data: "products"
                  }
                ],

                [
                  {
                    text: "⬅️ Menu",
                    callback_data: "menu"
                  }
                ]

              ]
            }

          }

        );

        return;
      }


      // ==================================================
      // BUY PRODUCT
      // ==================================================

      if (
        action.startsWith("buy_")
      ) {

        const index =
          Number(
            action.replace(
              "buy_",
              ""
            )
          );

        const product =
          PRODUCTS[index];

        if (!product) {

          await bot.sendMessage(
            chatId,
            "❌ Product hin argamne."
          );

          return;
        }


        userOrders.set(

          chatId,

          {
            step: "name",
            product: product.name,
            price: product.price,
            name: "",
            phone: "",
            address: ""
          }

        );


        await bot.sendMessage(

          chatId,

          `📦 *Order jalqabame*

🛍️ Meeshaa:
${product.name}

💰 Gatii:
${product.price}

Amma maqaa guutuu kee barreessi.`,

          {
            parse_mode: "Markdown",

            reply_markup: {
              inline_keyboard: [
                [
                  {
                    text: "❌ Cancel",
                    callback_data:
                      "cancel_order"
                  }
                ]
              ]
            }

          }

        );

        return;
      }


      // ==================================================
      // PRICE
      // ==================================================

      if (action === "price") {

        await bot.sendMessage(

          chatId,

          `💰 *Gatii Gaafadhu*

Maqaa meeshaa barbaaddu naaf barreessi.

Fakkeenyaaf:

*“iPhone 13 Pro Max”*

ykn

*“Jordan 4”*

Ani gatii fi odeeffannoo isaa siif deebisa. 👌`,

          {
            parse_mode: "Markdown",

            reply_markup: {
              inline_keyboard: [
                [
                  {
                    text: "⬅️ Menu",
                    callback_data: "menu"
                  }
                ]
              ]
            }

          }

        );

        return;
      }


      // ==================================================
      // GENERAL ORDER
      // ==================================================

      if (action === "order") {

        userOrders.set(

          chatId,

          {
            step: "product",
            product: "",
            price: "",
            name: "",
            phone: "",
            address: ""
          }

        );


        await bot.sendMessage(

          chatId,

          `📦 *Order Haaraa*

Mee maqaa meeshaa ati bituu barbaaddu barreessi.

Fakkeenyaaf:

*“iPhone 13 Pro Max”*`,

          {
            parse_mode: "Markdown",

            reply_markup: {
              inline_keyboard: [
                [
                  {
                    text: "❌ Cancel",
                    callback_data:
                      "cancel_order"
                  }
                ]
              ]
            }

          }

        );

        return;
      }


      // ==================================================
      // CONTACT
      // ==================================================

      if (action === "contact") {

        await bot.sendMessage(

          chatId,

          `📞 *Nu Qunnami*

☎️ Bilbila: ${CONTACT_PHONE}

📍 Location: Addis Ababa

🛍️ Abdii Market
🌐 ${WEBSITE_URL}`,

          {
            parse_mode: "Markdown",

            reply_markup: {
              inline_keyboard: [

                [
                  {
                    text: "📞 Bilbila",
                    url:
                      `tel:${CONTACT_PHONE}`
                  }
                ],

                [
                  {
                    text: "🌐 Website",
                    url:
                      WEBSITE_URL
                  }
                ],

                [
                  {
                    text: "⬅️ Menu",
                    callback_data:
                      "menu"
                  }
                ]

              ]
            }

          }

        );

        return;
      }


      // ==================================================
      // CART
      // ==================================================

      if (action === "cart") {

        await bot.sendMessage(

          chatId,

          `🛒 *Cart*

Meeshaa tokko filadhu; achiis *Order* godhi.`,

          {
            parse_mode: "Markdown",

            reply_markup: {
              inline_keyboard: [

                [
                  {
                    text:
                      "🛍️ Meeshaalee Ilaali",
                    callback_data:
                      "products"
                  }
                ],

                [
                  {
                    text:
                      "📦 Order Godhi",
                    callback_data:
                      "order"
                  }
                ],

                [
                  {
                    text:
                      "⬅️ Menu",
                    callback_data:
                      "menu"
                  }
                ]

              ]
            }

          }

        );

        return;
      }


      // ==================================================
      // MENU
      // ==================================================

      if (action === "menu") {

        await bot.sendMessage(

          chatId,

          `🏠 *Abdii Market Menu*

👇 Waan barbaaddu filadhu:`,

          {
            parse_mode: "Markdown",
            ...mainMenu()
          }

        );

        return;
      }


      // ==================================================
      // CANCEL ORDER
      // ==================================================

      if (
        action === "cancel_order"
      ) {

        userOrders.delete(
          chatId
        );

        await bot.sendMessage(

          chatId,

          "❌ Order haqameera.",

          mainMenu()

        );

        return;
      }

    } catch (error) {

      console.error(
        "BUTTON ERROR:",
        error
      );

    }

  });


  // ==================================================
  // NORMAL MESSAGE / AUTO REPLY
  // ==================================================

  bot.on("message", async (msg) => {

    const chatId =
      msg.chat.id;

    const text =
      String(
        msg.text || ""
      ).trim();


    if (text === "/start") {
      return;
    }


    // ==================================================
    // ORDER FLOW
    // ==================================================

    const order =
      userOrders.get(chatId);


    if (order) {


      // --------------------------------------------------
      // PRODUCT
      // --------------------------------------------------

      if (
        order.step === "product"
      ) {

        const searchText =
          text.toLowerCase();

        const product =
          PRODUCTS.find((p) =>
            p.search.some((keyword) =>
              searchText.includes(
                keyword.toLowerCase()
              )
            )
          );


        if (product) {

          order.product =
            product.name;

          order.price =
            product.price;

          order.step =
            "name";

          userOrders.set(
            chatId,
            order
          );


          await bot.sendMessage(

            chatId,

            `✅ Meeshaa argame:

🛍️ *${product.name}*
💰 Gatii: *${product.price}*

Amma maqaa guutuu kee barreessi.`,

            {
              parse_mode: "Markdown"
            }

          );

          return;

        }


        await bot.sendMessage(

          chatId,

          `❌ Meeshaa ati barreessite hin argamne.

🛍️ Meeshaalee keenya ilaaluuf button kana tuqi.`,

          productMenu()

        );

        return;
      }


      // --------------------------------------------------
      // NAME
      // --------------------------------------------------

      if (
        order.step === "name"
      ) {

        order.name =
          text;

        order.step =
          "phone";

        userOrders.set(
          chatId,
          order
        );


        await bot.sendMessage(

          chatId,

          `👤 Galatoomi *${text}*.

Amma lakkoofsa bilbila kee barreessi.`,

          {
            parse_mode: "Markdown"
          }

        );

        return;
      }


      // --------------------------------------------------
      // PHONE
      // --------------------------------------------------

      if (
        order.step === "phone"
      ) {

        order.phone =
          text;

        order.step =
          "address";

        userOrders.set(
          chatId,
          order
        );


        await bot.sendMessage(

          chatId,

          `📞 Lakkoofsa kee galmeessineerra.

Amma *teessoo/geejjiba* ittiin argachuu barbaaddu barreessi.`,

          {
            parse_mode: "Markdown"
          }

        );

        return;
      }


      // --------------------------------------------------
      // ADDRESS
      // --------------------------------------------------

      if (
        order.step === "address"
      ) {

        order.address =
          text;


        // SEND TO ADMIN
        if (ADMIN_CHAT_ID) {

          try {

            await bot.sendMessage(

              ADMIN_CHAT_ID,

              `🚨 *ORDER HAARAA*

🛍️ Meeshaa:
${order.product}

💰 Gatii:
${order.price}

👤 Maqaa:
${order.name}

📞 Bilbila:
${order.phone}

📍 Teessoo:
${order.address}

👤 Telegram:
@${msg.from?.username || "NoUsername"}

🆔 Chat ID:
${chatId}`,

              {
                parse_mode:
                  "Markdown"
              }

            );

          } catch (adminError) {

            console.error(
              "ADMIN ORDER ERROR:",
              adminError
            );

          }

        }


        userOrders.delete(
          chatId
        );


        await bot.sendMessage(

          chatId,

          `🎉 *Order kee fudhanneerra!*

🛍️ Meeshaa:
${order.product}

💰 Gatii:
${order.price}

👤 Maqaa:
${order.name}

📞 Bilbila:
${order.phone}

📍 Teessoo:
${order.address}

🙏 Galatoomi Abdii Market filachuu keetiif.

📞 Yoo gaaffii qabaatte nu qunnami.`,

          {
            parse_mode:
              "Markdown",

            reply_markup: {
              inline_keyboard: [

                [
                  {
                    text:
                      "🛍️ Meeshaalee Ilaali",
                    callback_data:
                      "products"
                  }
                ],

                [
                  {
                    text:
                      "🏠 Menu",
                    callback_data:
                      "menu"
                  }
                ]

              ]
            }

          }

        );

        return;
      }

    }


    // ==================================================
    // NORMAL AUTO REPLY
    // ==================================================

    const lower =
      text.toLowerCase();


    // --------------------------------------------------
    // SEARCH PRODUCT
    // --------------------------------------------------

    const foundProduct =
      PRODUCTS.find((product) =>
        product.search.some((keyword) =>
          lower.includes(
            keyword.toLowerCase()
          )
        )
      );


    if (foundProduct) {

      const index =
        PRODUCTS.indexOf(
          foundProduct
        );


      await bot.sendMessage(

        chatId,

        `🛍️ *${foundProduct.name}*

${foundProduct.details}

💰 *Gatii:* ${foundProduct.price}

📞 *Bilbila:* ${CONTACT_PHONE}
📍 *Location:* Addis Ababa`,

        {
          parse_mode:
            "Markdown",

          reply_markup: {
            inline_keyboard: [

              [
                {
                  text:
                    "📦 Order godhi",
                  callback_data:
                    `buy_${index}`
                }
              ],

              [
                {
                  text:
                    "🛍️ Meeshaalee biroo",
                  callback_data:
                    "products"
                }
              ],

              [
                {
                  text:
                    "🏠 Menu",
                  callback_data:
                    "menu"
                }
              ]

            ]
          }

        }

      );

      return;
    }


    // --------------------------------------------------
    // GREETING
    // --------------------------------------------------

    if (
      lower.includes("akkam") ||
      lower.includes("hello") ||
      lower.includes("hi") ||
      lower.includes("salam") ||
      lower.includes("selam")
    ) {

      await bot.sendMessage(

        chatId,

        `👋 Akkam ${msg.from?.first_name || ""}!

Baga gara *Abdii Market* dhuftan. 🛍️

Maal isin gargaaruu danda'a?`,

        {
          parse_mode:
            "Markdown",

          ...mainMenu()
        }

      );

      return;
    }


    // --------------------------------------------------
    // PRICE
    // --------------------------------------------------

    if (
      lower.includes("gatii") ||
      lower.includes("meeqa") ||
      lower.includes("price")
    ) {

      await bot.sendMessage(

        chatId,

        `💰 Gatii meeshaa barbaaddu baruuf maqaa meeshaa sana naaf barreessi.

Fakkeenyaaf:

*“iPhone 13 Pro Max”*
*“Jordan 4”*
*“Samsung S22 Ultra”*`,

        {
          parse_mode:
            "Markdown",

          ...mainMenu()
        }

      );

      return;
    }


    // --------------------------------------------------
    // ORDER
    // --------------------------------------------------

    if (
      lower.includes("order") ||
      lower.includes("bituu") ||
      lower.includes("bitaa") ||
      lower.includes("ajaja")
    ) {

      userOrders.set(

        chatId,

        {
          step:
            "product",

          product:
            "",

          price:
            "",

          name:
            "",

          phone:
            "",

          address:
            ""
        }

      );


      await bot.sendMessage(

        chatId,

        `📦 *Order jalqabuuf*

Maqaa meeshaa ati barbaaddu barreessi.`,

        {
          parse_mode:
            "Markdown"
        }

      );

      return;
    }


    // --------------------------------------------------
    // DEFAULT
    // --------------------------------------------------

    await bot.sendMessage(

      chatId,

      `👋 Galatoomi nu qunnamuu keetiif!

Abdii Market keessatti maal barbaadda?

👇 Menu keessaa filadhu:`,

      mainMenu()

    );

  });


  // ==================================================
  // POLLING ERROR
  // ==================================================

  bot.on(
    "polling_error",
    (error) => {

      console.error(
        "TELEGRAM POLLING ERROR:",
        error.message
      );

    }
  );


} else {

  console.log(
    "⚠️ TELEGRAM_BOT_TOKEN is missing. Telegram bot disabled."
  );

}


// ==================================================
// HEALTH CHECK
// ==================================================

app.get(
  "/api/health",
  (req, res) => {

    res.json({

      success:
        true,

      message:
        "Abdii Market backend is running 🚀",

      chapa_key_loaded:
        Boolean(
          CHAPA_SECRET_KEY
        ),

      telegram_bot_loaded:
        Boolean(
          TELEGRAM_BOT_TOKEN
        ),

      products:
        PRODUCTS.length,

      base_url:
        PUBLIC_BASE_URL

    });

  }
);


// ==================================================
// CREATE CHAPA PAYMENT
// ==================================================

app.post(
  "/api/create-payment",
  async (req, res) => {

    try {

      if (!CHAPA_SECRET_KEY) {

        return res.status(500).json({

          success:
            false,

          message:
            "CHAPA_SECRET_KEY is missing on server."

        });

      }


      const order =
        req.body;


      if (!order) {

        return res.status(400).json({

          success:
            false,

          message:
            "Order data is missing."

        });

      }


      const amount =
        Number(
          order.amount
        );


      if (
        !Number.isFinite(amount) ||
        amount <= 0
      ) {

        return res.status(400).json({

          success:
            false,

          message:
            "Invalid payment amount."

        });

      }


      const customer =
        order.customer || {};


      const firstName =
        customer.firstName ||
        "Customer";


      const lastName =
        customer.lastName ||
        "Abdii";


      const phone =
        customer.phone ||
        "";


      const email =
        customer.email ||
        "customer@example.com";


      const txRef =
        order.orderId ||
        `ABD-${Date.now()}`;


      const callbackUrl =
        `${PUBLIC_BASE_URL}/api/chapa/callback`;


      const returnUrl =
        `${PUBLIC_BASE_URL}/?payment=success&tx_ref=${encodeURIComponent(txRef)}`;


      const payload = {

        amount:
          String(amount),

        currency:
          "ETB",

        email:
          email,

        first_name:
          firstName,

        last_name:
          lastName,

        phone_number:
          phone,

        tx_ref:
          txRef,

        callback_url:
          callbackUrl,

        return_url:
          returnUrl,

        customization: {

          title:
            "Abdii Market",

          description:
            "Payment for Abdii Market order"

        }

      };


      const chapaResponse =
        await fetch(

          "https://api.chapa.co/v1/transaction/initialize",

          {

            method:
              "POST",

            headers: {

              "Authorization":
                `Bearer ${CHAPA_SECRET_KEY}`,

              "Content-Type":
                "application/json"

            },

            body:
              JSON.stringify(
                payload
              )

          }

        );


      const chapaData =
        await chapaResponse.json();


      if (!chapaResponse.ok) {

        return res.status(
          chapaResponse.status
        ).json({

          success:
            false,

          message:
            chapaData?.message ||
            "Chapa payment initialization failed.",

          chapa:
            chapaData

        });

      }


      const checkoutUrl =
        chapaData?.data?.checkout_url ||
        chapaData?.checkout_url;


      if (!checkoutUrl) {

        return res.status(500).json({

          success:
            false,

          message:
            "Chapa did not return checkout URL.",

          chapa:
            chapaData

        });

      }


      return res.json({

        success:
          true,

        checkout_url:
          checkoutUrl,

        tx_ref:
          txRef

      });


    } catch (error) {

      console.error(
        "PAYMENT ERROR:",
        error
      );


      return res.status(500).json({

        success:
          false,

        message:
          "Payment could not be started.",

        error:
          error.message

      });

    }

  }
);


// ==================================================
// CHAPA CALLBACK / VERIFY
// ==================================================

app.get(
  "/api/chapa/callback",
  async (req, res) => {

    try {

      if (!CHAPA_SECRET_KEY) {

        return res.redirect(
          "/?payment=failed"
        );

      }


      const txRef =
        req.query.tx_ref ||
        req.query.trx_ref;


      if (!txRef) {

        return res.status(400).send(
          "Transaction reference missing."
        );

      }


      const verifyResponse =
        await fetch(

          `https://api.chapa.co/v1/transaction/verify/${encodeURIComponent(txRef)}`,

          {

            method:
              "GET",

            headers: {

              "Authorization":
                `Bearer ${CHAPA_SECRET_KEY}`,

              "Content-Type":
                "application/json"

            }

          }

        );


      const verifyData =
        await verifyResponse.json();


      const status =
        verifyData?.data?.status ||
        verifyData?.status ||
        "";


      if (
        String(status).toLowerCase() ===
        "success"
      ) {

        return res.redirect(

          `/?payment=success&tx_ref=${encodeURIComponent(txRef)}`

        );

      }


      return res.redirect(

        `/?payment=failed&tx_ref=${encodeURIComponent(txRef)}`

      );


    } catch (error) {

      console.error(
        "CALLBACK ERROR:",
        error
      );


      return res.redirect(
        "/?payment=failed"
      );

    }

  }
);


// ==================================================
// HOME PAGE
// ==================================================

app.get(
  "/",
  (req, res) => {

    res.sendFile(
      path.join(
        __dirname,
        "index.html"
      )
    );

  }
);


// ==================================================
// START SERVER
// ==================================================

app.listen(
  PORT,
  "0.0.0.0",
  () => {

    console.log(
      "================================="
    );

    console.log(
      "🚀 Abdii Market server running"
    );

    console.log(
      `🌐 Port: ${PORT}`
    );

    console.log(
      `🌍 URL: ${PUBLIC_BASE_URL}`
    );

    console.log(
      `🔐 Chapa key loaded: ${Boolean(CHAPA_SECRET_KEY)}`
    );

    console.log(
      `🤖 Telegram bot loaded: ${Boolean(TELEGRAM_BOT_TOKEN)}`
    );

    console.log(
      `🛍️ Products loaded: ${PRODUCTS.length}`
    );

    console.log(
      "================================="
    );

  }
);
