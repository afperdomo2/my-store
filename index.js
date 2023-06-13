const express = require("express");
const { faker } = require("@faker-js/faker");

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Servidor en express");
});
app.get("/home", (req, res) => {
  res.send("Home");
});

app.get("/products", (req, res) => {
  const { size } = req.query;

  const products = [];
  const limit = size || 10;
  for (let index = 0; index < limit; index++) {
    products.push({
      name: faker.commerce.productName(),
      price: parseInt(faker.commerce.price(), 10),
      image: faker.image.url(),
    });
  }
  res.json(products);
});

app.get("/products/:id", (req, res) => {
  const { id } = req.params;
  res.json({ id, name: "Pantalon", price: 1500 });
});

app.get("/categories/:categoryId/products/:productId", (req, res) => {
  const { categoryId, productId } = req.params;
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
