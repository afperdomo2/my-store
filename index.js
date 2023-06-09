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
  res.json([
    { name: "Pantalon", price: 1500 },
    { name: "Pera", price: 10 },
  ]);
});
app.get("/products/:id", (req, res) => {
  const { id } = req.params;
  res.json({ id, name: "Pantalon", price: 1500 });
});

app.get("/categories/:categoryId/products/:productId", (req, res) =>{
  const {categoryId, productId} = req.params;
  res.json({
    categoryId,
    product: {
      productId,
      name: "Pantalon",
      price: 1500
    }
  });
});

app.listen(port, () => {
  console.info(`✅ Server express on: http://localhost:${port}`);
});
