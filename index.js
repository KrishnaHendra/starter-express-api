const { default: axios } = require("axios");
const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.set("view engine", "ejs");

app.get("/login", async (req, res) => {
  try {
    const { code, shop } = req.query;
    const apiUrl = process.env.BACKEND_URL;
    const socketUrl = process.env.SOCKET_URL;
    const { data: barcodeData } = await axios.get(
      `${apiUrl}/bitlogin/api/login/whatsapp/barcode/${shop}?code=${code}`
    );

    res.render("whatsappLogin", {
      code,
      shop,
      barcodeData,
      apiUrl,
      socketUrl,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

app.get("/success", async (req, res) => {
  try {
    const { code, type } = req.query;
    const apiUrl = process.env.BACKEND_URL;
    const { data } = await axios.get(
      `${apiUrl}/bitlogin/api/login/whatsapp/status?code=${code}`
    );
    const whatsappNumber = process.env.WHATSAPP_NUMBER;
    res.render("successPage", {
      data,
      type,
      whatsappNumber,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Dashboard bitLogin Frontend",
  });
});

app.post("/shopify/customer", async (req, res) => {
  try {
    const { name, email, phone, domain } = req.body;
    const apiUrl = process.env.BACKEND_URL;
    
    const { data } = await axios.post(
      `${apiUrl}/bitlogin/api/shopify/customer`,
      {
        name,
        email,
        phone,
        domain,
      }
    );

    res.status(201).json(data);
  } catch (err) {
    next(err);
  }
});

const port = process.env.PORT;
app.listen(port, (req, res) => {
  console.log(`Server running on port ${port}`);
});
