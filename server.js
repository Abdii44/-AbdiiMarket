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
// TELEGRAM BOT
// ==================================================

let bot = null;

// Temporary order storage.
// This is kept in memory while the server is running.
const userOrders = new Map();


if (TELEGRAM_BOT_TOKEN) {

  bot = new TelegramBot(
    TELEGRAM_BOT_TOKEN,
    {
      polling: true
    }
  );

  console.log("🤖 Telegram bot started");


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
  // BUTTON HANDLER
  // ==================================================

  bot.on("callback_query", async (query) => {

    const chatId = query.message.chat.id;

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

Meeshaalee keenya website irratti ilaaluuf button armaan gadii cuqasi.

Yoo meeshaa addaa barbaadde, maqaa isaa naaf barreessi.

👇`,

          {
            parse_mode: "Markdown",

            reply_markup: {
              inline_keyboard: [

                [
                  {
                    text: "🛍️ Website Bani",
                    url: WEBSITE_URL
                  }
                ],

                [
                  {
                    text: "💰 Gatii Gaafadhu",
                    callback_data: "price"
                  }
                ],

                [
                  {
                    text: "📦 Order Godhi",
                    callback_data: "order"
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
      // PRICE
      // ==================================================

      if (action === "price") {

        await bot.sendMessage(

          chatId,

          `💰 *Gatii Gaafadhu*

Maqaa meeshaa barbaaddu naaf barreessi.

Fakkeenyaaf:

*“iPhone 13 Pro Max gatiin isaa meeqa?”*

ykn

*“Kophee Adidas meeqa?”*

Ani gaaffii kee fudhadhee siif deebisa. 👌`,

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
      // ORDER
      // ==================================================

      if (action === "order") {

        userOrders.set(
          chatId,
          {
            step: "product",
            product: "",
            name: "",
            phone: "",
            address: ""
          }
        );


        await bot.sendMessage(

          chatId,

          `📦 *Order Haaraa*

Mee jalqaba maqaa meeshaa ati bituu barbaaddu barreessi.

Fakkeenyaaf:

*“iPhone 13 Pro Max”*`,

          {
            parse_mode: "Markdown",

            reply_markup: {
              inline_keyboard: [
                [
                  {
                    text: "❌ Cancel",
                    callback_data: "cancel_order"
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

💬 Telegram irratti nu barreessi.

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
                    url: WEBSITE_URL
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
      // CART
      // ==================================================

      if (action === "cart") {

        await bot.sendMessage(

          chatId,

          `🛒 *Cart*

Amma cart kee keessatti meeshaan hin jiru.

Meeshaa tokko order gochuuf:

📦 *Order Godhi* tuqi.

Yookaan website keenya irraa meeshaalee ilaali.`,

          {
            parse_mode: "Markdown",

            reply_markup: {
              inline_keyboard: [

                [
                  {
                    text: "📦 Order Godhi",
                    callback_data: "order"
                  }
                ],

                [
                  {
                    text: "🛍️ Meeshaalee Ilaali",
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

      if (action === "cancel_order") {

        userOrders.delete(chatId);

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
      String(msg.text || "").trim();


    // Ignore /start because it has its own handler
    if (text === "/start") {
      return;
    }


    // ==================================================
    // ORDER FLOW
    // ==================================================

    const order =
      userOrders.get(chatId);


    if (order) {


      // STEP 1: PRODUCT
      if (order.step === "product") {

        order.product = text;

        order.step = "name";

        userOrders.set(
          chatId,
          order
        );


        await bot.sendMessage(

          chatId,

          `✅ Meeshaa:

*${text}*

Amma maqaa guutuu kee barreessi.`,

          {
            parse_mode: "Markdown",

            reply_markup: {
              inline_keyboard: [
                [
                  {
                    text: "❌ Cancel",
                    callback_data: "cancel_order"
                  }
                ]
              ]
            }

          }

        );

        return;
      }


      // STEP 2: NAME
      if (order.step === "name") {

        order.name = text;

        order.step = "phone";

        userOrders.set(
          chatId,
          order
        );


        await bot.sendMessage(

          chatId,

          `👤 Galatoomi *${text}*.

Amma lakkoofsa bilbila kee barreessi.`,

          {
            parse_mode: "Markdown",

            reply_markup: {
              inline_keyboard: [
                [
                  {
                    text: "❌ Cancel",
                    callback_data: "cancel_order"
                  }
                ]
              ]
            }

          }

        );

        return;
      }


      // STEP 3: PHONE
      if (order.step === "phone") {

        order.phone = text;

        order.step = "address";

        userOrders.set(
          chatId,
          order
        );


        await bot.sendMessage(

          chatId,

          `📞 Lakkoofsa kee galmeessineerra.

Amma *teessoo/geejjiba* ittiin argachuu barbaaddu barreessi.`,

          {
            parse_mode: "Markdown",

            reply_markup: {
              inline_keyboard: [
                [
                  {
                    text: "❌ Cancel",
                    callback_data: "cancel_order"
                  }
                ]
              ]
            }

          }

        );

        return;
      }


      // STEP 4: ADDRESS
      if (order.step === "address") {

        order.address = text;


        // SEND ORDER TO ADMIN
        if (ADMIN_CHAT_ID) {

          try {

            await bot.sendMessage(

              ADMIN_CHAT_ID,

              `🚨 *ORDER HAARAA*

🛍️ Meeshaa:
${order.product}

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
                parse_mode: "Markdown"
              }

            );

          } catch (adminError) {

            console.error(
              "ADMIN ORDER ERROR:",
              adminError
            );

          }

        }


        userOrders.delete(chatId);


        await bot.sendMessage(

          chatId,

          `🎉 *Order kee fudhanneerra!*

🛍️ Meeshaa: ${order.product}
👤 Maqaa: ${order.name}
📞 Bilbila: ${order.phone}
📍 Teessoo: ${order.address}

🙏 Galatoomi Abdii Market filachuu keetiif.

📞 Yoo gaaffii qabaatte nu qunnami.`,

          {
            parse_mode: "Markdown",

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
                    text: "🏠 Menu",
                    callback_data: "menu"
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


    // HELLO / GREETING
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
          parse_mode: "Markdown",
          ...mainMenu()
        }

      );

      return;
    }


    // PRICE QUESTIONS
    if (
      lower.includes("gatii") ||
      lower.includes("meeqa") ||
      lower.includes("price")
    ) {

      await bot.sendMessage(

        chatId,

        `💰 Gatii meeshaa barbaaddu baruuf maqaa meeshaa sana naaf barreessi.

Fakkeenyaaf:
*“iPhone 13 gatiin isaa meeqa?”*`,

        {
          parse_mode: "Markdown",
          ...mainMenu()
        }

      );

      return;
    }


    // ORDER QUESTIONS
    if (
      lower.includes("order") ||
      lower.includes("bituu") ||
      lower.includes("bitaa") ||
      lower.includes("ajaja")
    ) {

      userOrders.set(
        chatId,
        {
          step: "product",
          product: "",
          name: "",
          phone: "",
          address: ""
        }
      );


      await bot.sendMessage(

        chatId,

        `📦 *Order jalqabuuf* maqaa meeshaa ati barbaaddu barreessi.`,

        {
          parse_mode: "Markdown"
        }

      );

      return;
    }


    // DEFAULT AUTO REPLY
    await bot.sendMessage(

      chatId,

      `👋 Galatoomi nu qunnamuu keetiif!

Abdii Market keessatti maal barbaadda?

👇 Menu keessaa filadhu:`,

      {
        ...mainMenu()
      }

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

      success: true,

      message:
        "Abdii Market backend is running 🚀",

      chapa_key_loaded:
        Boolean(CHAPA_SECRET_KEY),

      telegram_bot_loaded:
        Boolean(TELEGRAM_BOT_TOKEN),

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

          success: false,

          message:
            "CHAPA_SECRET_KEY is missing on server."

        });

      }


      const order =
        req.body;


      if (!order) {

        return res.status(400).json({

          success: false,

          message:
            "Order data is missing."

        });

      }


      const amount =
        Number(order.amount);


      if (
        !Number.isFinite(amount) ||
        amount <= 0
      ) {

        return res.status(400).json({

          success: false,

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
              JSON.stringify(payload)

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
      "================================="
    );

  }
);
