const {
  default: axios
} = require("axios");
const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.set("view engine", "ejs");

app.get("/login", async (req, res) => {
  const {
    code,
    shop
  } = req.query;
  const apiUrl = process.env.BACKEND_URL;
  const {
    data: barcodeData
  } = await axios.get(
    `${apiUrl}/bitlogin/api/login/whatsapp/barcode/${shop}?code=${code}`
  );

  res.render("whatsappLogin", {
    code,
    barcodeData,
    apiUrl
  });
});

app.get("/success", async (req, res) => {
  const {
    code,
    type
  } = req.query;
  const apiUrl = process.env.BACKEND_URL;
  const {
    data
  } = await axios.get(
    `${apiUrl}/bitlogin/api/login/whatsapp/status?code=${code}`
  );
  const whatsappNumber = process.env.WHATSAPP_NUMBER;
  res.render("successPage", {
    data,
    type,
    whatsappNumber
  });
})

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Success handler GET main",
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