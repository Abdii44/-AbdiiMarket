const express = require("express");
const path = require("path");

const app = express();

const PORT = process.env.PORT || 10000;

const CHAPA_SECRET_KEY =
  process.env.CHAPA_SECRET_KEY;

const PUBLIC_BASE_URL =
  process.env.PUBLIC_BASE_URL ||
  "https://abdiimarket-089r.onrender.com";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve frontend
app.use(express.static(__dirname));


// ===============================
// HEALTH CHECK
// ===============================

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Abdii Market backend is running 🚀",
    chapa_key_loaded: Boolean(CHAPA_SECRET_KEY),
    base_url: PUBLIC_BASE_URL
  });
});


// ===============================
// CREATE CHAPA PAYMENT
// ===============================

app.post("/api/create-payment", async (req, res) => {

  try {

    console.log("Payment request received");

    // Check Chapa key
    if (!CHAPA_SECRET_KEY) {

      console.error(
        "CHAPA_SECRET_KEY is missing"
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


    const amount =
      Number(order.amount);


    if (!amount || amount <= 0) {

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
      customer.phone || "";


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


    console.log(
      "Initializing Chapa:",
      {
        tx_ref: txRef,
        amount: amount
      }
    );


    const response = await fetch(
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


    const data =
      await response.json();


    console.log(
      "Chapa response:",
      data
    );


    if (!response.ok) {

      return res.status(response.status).json({

        success: false,

        message:
          data?.message ||
          "Chapa payment initialization failed.",

        chapa:
          data

      });
    }


    const checkoutUrl =
      data?.data?.checkout_url ||
      data?.checkout_url;


    if (!checkoutUrl) {

      return res.status(500).json({

        success: false,

        message:
          "Chapa did not return checkout URL.",

        chapa:
          data

      });
    }


    return res.json({

      success: true,

      checkout_url:
        checkoutUrl,

      tx_ref:
        txRef

    });


  } catch (error) {

    console.error(
      "Payment error:",
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


// ===============================
// CHAPA CALLBACK
// ===============================

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


      console.log(
        "Verifying transaction:",
        txRef
      );


      const response = await fetch(

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


      const data =
        await response.json();


      console.log(
        "Chapa verification:",
        data
      );


      const status =
        data?.data?.status ||
        data?.status;


      if (
        status &&
        status.toLowerCase() ===
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
        "Callback error:",
        error
      );


      return res.redirect(
        "/?payment=failed"
      );

    }

  }
);


// ===============================
// ROOT
// ===============================

app.get("/", (req, res) => {

  res.sendFile(
    path.join(
      __dirname,
      "index.html"
    )
  );

});


// ===============================
// START SERVER
// ===============================

app.listen(
  PORT,
  "0.0.0.0",
  () => {

    console.log(
      `🚀 Abdii Market server running on port ${PORT}`
    );

    console.log(
      `🌍 Base URL: ${PUBLIC_BASE_URL}`
    );

    console.log(
      `🔐 Chapa key loaded: ${Boolean(CHAPA_SECRET_KEY)}`
    );

  }
);
