const express = require("express");
const { faker } = require("@faker-js/faker");

const router = express.Router();

// POST
router.post("/", (req, res) => {
  const body = req.body;
  res.json({
    message: "created",
    data: body
  });
});

// PUT -  Se usa para reemplazar completamente un recurso
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const body = req.body;
  res.json({
    message: "updated",
    id,
    data: body
  });
});

// PATCH - Se usa para parchar o actualizar parcialmente el recurso
router.patch("/:id", (req, res) => {
  const { id } = req.params;
  const body = req.body;
  res.json({
    message: "updated",
    id,
    data: body
  });
});

// DELETE
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  res.json({
    message: "deleted",
    id
  });
});

// GET
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
