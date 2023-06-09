const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Servidor en express");
});
app.get("/home", (req, res) => {
  res.send("Home");
});
app.get("/products", (req, res) => {
  res.json({
    name: "Pantalon",
    price: 1500
  });
});

app.listen(port, () => {
  console.info(`✅ Server express on: http://localhost:${port}`);
});
