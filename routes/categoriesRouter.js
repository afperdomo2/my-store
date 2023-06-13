const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.json([
    { id: 1, description: "Categoria 1" },
    { id: 2, description: "Categoria 2" },
    { id: 3, description: "Categoria 3" },
  ]);
});

module.exports = router;
