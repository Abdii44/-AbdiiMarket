const express = require("express");
const crypto = require("crypto");

const app = express();

app.use(express.json());
app.use(express.static("."));

const PORT = process.env.PORT || 3000;

const CHAPA_SECRET_KEY = process.env.CHAPA_SECRET_KEY;
const PUBLIC_BASE_URL = process.env.PUBLIC_BASE_URL;


/* =========================
   CREATE CHAPA PAYMENT
========================= */

app.post("/api/create-payment", async (req, res) => {

    try {

        if (!CHAPA_SECRET_KEY) {
            return res.status(500).json({
                success: false,
                error: "CHAPA_SECRET_KEY is missing"
            });
        }

        const order = req.body;

        if (
            !order ||
            !order.amount ||
            !order.customer ||
            !order.customer.firstName ||
            !order.customer.lastName ||
            !order.customer.phone
        ) {
            return res.status(400).json({
                success: false,
                error: "Invalid order information"
            });
        }


        /* Create unique transaction reference */

        const tx_ref =
            "ABD-" +
            Date.now() +
            "-" +
            crypto.randomBytes(4).toString("hex");


        const baseURL =
            PUBLIC_BASE_URL ||
            `http://localhost:${PORT}`;


        /* =========================
           CHAPA PAYMENT DATA
        ========================= */

        const payload = {

            amount: String(order.amount),

            currency: "ETB",

            email:
                order.customer.email ||
                "customer@abdiimarket.com",

            first_name:
                order.customer.firstName,

            last_name:
                order.customer.lastName,

            phone_number:
                order.customer.phone,

            tx_ref: tx_ref,

            callback_url:
                baseURL +
                "/api/chapa/callback",

            return_url:
                baseURL +
                "/payment-success?tx_ref=" +
                encodeURIComponent(tx_ref),

            customization: {

                title: "Abdii Market",

                description:
                    "Abdii Market Order Payment"

            }

        };


        /* =========================
           SEND TO CHAPA
        ========================= */

        const response = await fetch(
            "https://api.chapa.co/v1/transaction/initialize",
            {

                method: "POST",

                headers: {

                    "Authorization":
                        "Bearer " +
                        CHAPA_SECRET_KEY,

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

            return res.status(400).json({

                success: false,

                error:
                    data.message ||
                    "Chapa payment initialization failed"

            });

        }


        const checkout_url =
            data?.data?.checkout_url;


        if (!checkout_url) {

            return res.status(500).json({

                success: false,

                error:
                    "Chapa checkout URL not found"

            });

        }


        /* =========================
           SEND PAYMENT URL
        ========================= */

        res.json({

            success: true,

            tx_ref: tx_ref,

            checkout_url:
                checkout_url

        });


    } catch (error) {

        console.error(
            "Payment error:",
            error
        );

        res.status(500).json({

            success: false,

            error:
                "Server error"

        });

    }

});


/* =========================
   CHAPA CALLBACK
========================= */

app.get(
    "/api/chapa/callback",
    async (req, res) => {

        try {

            const tx_ref =
                req.query.tx_ref ||
                req.query.trx_ref;


            if (!tx_ref) {

                return res.status(400).json({

                    success: false,

                    error:
                        "Transaction reference missing"

                });

            }


            /* =========================
               VERIFY PAYMENT
            ========================= */

            const verifyResponse =
                await fetch(

                    "https://api.chapa.co/v1/transaction/verify/" +
                    encodeURIComponent(tx_ref),

                    {

                        method: "GET",

                        headers: {

                            "Authorization":
                                "Bearer " +
                                CHAPA_SECRET_KEY

                        }

                    }

                );


            const result =
                await verifyResponse.json();


            console.log(
                "Payment verification:",
                result
            );


            if (
                result?.status === "success" ||
                result?.data?.status === "success"
            ) {

                console.log(
                    "✅ PAYMENT SUCCESS:",
                    tx_ref
                );

                /*
                 * IMPORTANT:
                 * Later we will save the order
                 * into a database here.
                 */

            }


            res.json({

                success: true,

                transaction:
                    result

            });


        } catch (error) {

            console.error(
                "Verification error:",
                error
            );

            res.status(500).json({

                success: false,

                error:
                    "Payment verification failed"

            });

        }

    }
);


/* =========================
   PAYMENT SUCCESS PAGE
========================= */

app.get(
    "/payment-success",
    (req, res) => {

        const tx_ref =
            req.query.tx_ref || "";


        res.send(`

<!DOCTYPE html>

<html>

<head>

<meta charset="UTF-8">

<meta
name="viewport"
content="width=device-width,initial-scale=1.0"
>

<title>Abdii Market Payment</title>

<style>

body{

font-family:Arial,sans-serif;

background:#f5f6f8;

display:flex;

justify-content:center;

align-items:center;

min-height:100vh;

padding:20px;

}

.box{

background:white;

width:100%;

max-width:450px;

padding:30px;

border-radius:20px;

text-align:center;

box-shadow:
0 5px 25px
rgba(0,0,0,.1);

}

.icon{

font-size:65px;

}

h1{

margin:12px 0;

}

p{

color:#666;

line-height:1.5;

}

.ref{

background:#f1f1f1;

padding:12px;

border-radius:10px;

margin-top:20px;

font-weight:bold;

word-break:break-all;

}

a{

display:block;

margin-top:20px;

padding:14px;

background:#00c853;

color:#111;

text-decoration:none;

border-radius:10px;

font-weight:bold;

}

</style>

</head>


<body>


<div class="box">

<div class="icon">
✅
</div>

<h1>
Payment Completed
</h1>

<p>
Galatoomi! Kaffaltiin keessan
adeemsifameera.
</p>

<div class="ref">

Order Reference:<br>

${tx_ref}

</div>


<a href="/">
← Back to Abdii Market
</a>

</div>


</body>

</html>

`);

    }
);


/* =========================
   START SERVER
========================= */

app.listen(
    PORT,
    () => {

        console.log(
            "🚀 Abdii Market server running on port " +
            PORT
        );

    }
);
