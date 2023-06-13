const express = require("express");
const { faker } = require("@faker-js/faker");

const router = express.Router();

router.get("/", (req, res) => {
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

router.get("/:id", (req, res) => {
  const { id } = req.params;
  res.json({ id, name: "Pantalon", price: 1500 });
});

module.exports = router;
