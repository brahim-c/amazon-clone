const functions = require("firebase-functions");

const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51HYuT7F7CYPluLVkQeTC0DBqLEbXxbxMNAxPunANcFetVKOsGTk29KeHtiLbWC3z4VyfzMbaUDmDH8ncc5Gl9xap00xdjX3dwp"
);

//API

//App config
const app = express();

//Middlewares
app.use(cors({ origin: true }));
app.use(express.json());

//API routes
app.get("/", (request, response) => response.status(200).send("hello world"));

app.post("/payments/create", async (request, reaponse) => {
  const total = request.query.total;
  console.log("Payment requst recieved for this amount >>>", total);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "usd",
  });

  //ok post request created
  reaponse.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});

//Listen command
exports.api = functions.https.onRequest(app);
