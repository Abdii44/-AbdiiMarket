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
  "https://abdiimarket-089r.onrender.com";


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

if (TELEGRAM_BOT_TOKEN) {

  bot = new TelegramBot(
    TELEGRAM_BOT_TOKEN,
    {
      polling: true
    }
  );

  console.log("🤖 Telegram bot started");


  // /start
  bot.onText(/^\/start$/, async (msg) => {

    const chatId = msg.chat.id;

    await bot.sendMessage(
      chatId,

      `👋 Baga gara Abdii Market dhuftan!

🛍️ Meeshaalee qulqullina qaban argadhaa.

💰 Gatii madaalawaa
🚚 Geejjiba ni qabna
📞 Gaaffii yoo qabaattan nu barreessaa.

👇 Website keenya daawwadhaa:`,

      {
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: "🛍️ Abdii Market",
                url: "https://abdiimarket-089r.onrender.com"
              }
            ]
          ]
        }
      }
    );

  });


  // EVERY MESSAGE AUTO REPLY
  bot.on("message", async (msg) => {

    // /start already handled above
    if (msg.text === "/start") {
      return;
    }

    const chatId = msg.chat.id;

    const text =
      msg.text ||
      "";


    console.log(
      `Telegram message from ${msg.from?.first_name || "User"}: ${text}`
    );


    await bot.sendMessage(

      chatId,

      `👋 Akkam ${msg.from?.first_name || ""}!

Galatoomi Abdii Market qunnamuu keessaniif. 🛍️

Meeshaa barbaaddan ykn gaaffii keessan asitti barreessaa.

👇 Abdii Market daawwadhaa:`,

      {
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: "🛍️ Abdii Market",
                url: "https://abdiimarket-089r.onrender.com"
              }
            ]
          ]
        }
      }

    );

  });


} else {

  console.log(
    "⚠️ TELEGRAM_BOT_TOKEN is missing. Telegram bot disabled."
  );

}


// ==================================================
// HEALTH CHECK
// ==================================================

app.get("/api/health", (req, res) => {

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

});


// ==================================================
// CREATE CHAPA PAYMENT
// ==================================================

app.post("/api/create-payment", async (req, res) => {

  try {

    console.log("=================================");
    console.log("NEW PAYMENT REQUEST");
    console.log("=================================");


    if (!CHAPA_SECRET_KEY) {

      return res.status(500).json({

        success: false,

        message:
          "CHAPA_SECRET_KEY is missing on server."

      });

    }


    const order = req.body;


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

});


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

app.get("/", (req, res) => {

  res.sendFile(
    path.join(
      __dirname,
      "index.html"
    )
  );

});


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
