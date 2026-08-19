const express = require("express");
const path = require("path");

const app = express();

const PORT = process.env.PORT || 10000;

// Chapa Secret Key - NEVER put the key directly in this file
const CHAPA_SECRET_KEY = process.env.CHAPA_SECRET_KEY;

// Your current Render URL
const PUBLIC_BASE_URL =
  process.env.PUBLIC_BASE_URL ||
  "https://abdiimarket-089r.onrender.com";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve index.html and other frontend files
app.use(express.static(__dirname));


// ==================================================
// HEALTH CHECK
// ==================================================

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Abdii Market backend is running 🚀",
    chapa_key_loaded: Boolean(CHAPA_SECRET_KEY),
    base_url: PUBLIC_BASE_URL
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


    // Check Secret Key
    if (!CHAPA_SECRET_KEY) {

      console.error(
        "ERROR: CHAPA_SECRET_KEY is missing"
      );

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


    // Amount
    const amount = Number(order.amount);


    if (!Number.isFinite(amount) || amount <= 0) {

      return res.status(400).json({
        success: false,
        message:
          "Invalid payment amount."
      });
    }


    // Customer information
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


    // Transaction reference
    const txRef =
      order.orderId ||
      `ABD-${Date.now()}`;


    // Callback URL
    const callbackUrl =
      `${PUBLIC_BASE_URL}/api/chapa/callback`;


    // Return URL
    const returnUrl =
      `${PUBLIC_BASE_URL}/?payment=success&tx_ref=${encodeURIComponent(txRef)}`;


    // Chapa payment data
    const payload = {

      amount: String(amount),

      currency: "ETB",

      email: email,

      first_name: firstName,

      last_name: lastName,

      phone_number: phone,

      tx_ref: txRef,

      callback_url: callbackUrl,

      return_url: returnUrl,

      customization: {

        title: "Abdii Market",

        description:
          "Payment for Abdii Market order"

      }

    };


    console.log("Sending payment to Chapa...");

    console.log({
      tx_ref: txRef,
      amount: amount,
      currency: "ETB"
    });


    // Send request to Chapa
    const chapaResponse = await fetch(
      "https://api.chapa.co/v1/transaction/initialize",
      {

        method: "POST",

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


    console.log(
      "Chapa response:",
      chapaData
    );


    // Chapa returned an error
    if (!chapaResponse.ok) {

      return res.status(chapaResponse.status).json({

        success: false,

        message:
          chapaData?.message ||
          "Chapa payment initialization failed.",

        chapa:
          chapaData

      });

    }


    // Get checkout URL
    const checkoutUrl =
      chapaData?.data?.checkout_url ||
      chapaData?.checkout_url;


    if (!checkoutUrl) {

      console.error(
        "Chapa checkout URL missing:",
        chapaData
      );

      return res.status(500).json({

        success: false,

        message:
          "Chapa did not return checkout URL.",

        chapa:
          chapaData

      });

    }


    console.log(
      "Payment initialized successfully."
    );


    // Send checkout URL to frontend
    return res.json({

      success: true,

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

      success: false,

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

        console.error(
          "CHAPA_SECRET_KEY missing during callback"
        );

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


      console.log(
        "Verifying transaction:",
        txRef
      );


      const verifyResponse =
        await fetch(

          `https://api.chapa.co/v1/transaction/verify/${encodeURIComponent(txRef)}`,

          {

            method: "GET",

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


      console.log(
        "Verification response:",
        verifyData
      );


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
      "================================="
    );

  }
);
