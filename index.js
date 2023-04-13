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

app.get("/view", async (req, res) => {
  const data = await axios.get(
    "https://api.bitbybit.studio/bitlogin/api/integrations"
  );
  res.render("testing", {
    data,
  });
});

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Success",
  });
});

app.get("/test", (req, res) => {
  res.status(200).json({
    message: "Success handler GET testing",
  });
});

const port = process.env.PORT;
app.listen(port, (req, res) => {
  console.log(`Server running on port ${port}`);
});
