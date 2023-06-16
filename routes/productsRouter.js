const express = require('express');
const { faker } = require('@faker-js/faker');

const router = express.Router();

// POST
router.post('/', (req, res) => {
  const body = req.body;
  res.status(201).json({
    message: 'created',
    data: body,
  });
});

// PUT -  Se usa para reemplazar completamente un recurso
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body;
  res.status(200).json({
    message: 'updated',
    id,
    data: body,
  });
});

// PATCH - Se usa para parchar o actualizar parcialmente el recurso
router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body;
  if (body.name === undefined) {
    res.status(500).json({
      message: 'Server Error',
    });
  }
  /**
   * En PUT, PATCH y DELETE, también se puede usar el status 204, que
   * indica que el servidor ha completado exitosamente la solicitud y
   * no hay contenido para enviar en el cuerpo de la respuesta
   */
  if (id) {
    res.status(204).json();
  }
});

// DELETE
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  res.status(200).json({
    message: 'deleted',
    id,
  });
});

// GET
router.get('/', (req, res) => {
  const { size } = req.query;

  const products = [];
  const limit = size || 10;
  for (let index = 0; index < limit; index++) {
    products.push({
      id: index + 1,
      name: faker.commerce.productName(),
      price: parseInt(faker.commerce.price(), 10),
      image: faker.image.url(),
    });
  }
  res.status(200).json(products);
});

router.get('/:id', (req, res) => {
  const { id } = req.params;

  const products = [];
  for (let index = 0; index < 10; index++) {
    products.push({
      id: index + 1,
      name: faker.commerce.productName(),
      price: parseInt(faker.commerce.price(), 10),
      image: faker.image.url(),
    });
  }
  const product = products.filter((p) => p.id === parseInt(id));
  if (product.length === 0) {
    res.status(404).json({
      message: 'Not Found',
    });
  }
  res.status(200).json(product[0]);
});

module.exports = router;
