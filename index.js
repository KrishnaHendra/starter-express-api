const express = require("express");
const app = express();

app.set("view engine", "ejs");

app.get("/login", (req, res) => {
  const { code, shop } = req.query;
  res.json({
    message: "Success",
    code,
    shop,
  });
  // res.render("whatsappLogin", { code });
});

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

const port = process.env.port;
app.listen(port, (req, res) => {
  console.log(`Server running on port ${port}`);
});
