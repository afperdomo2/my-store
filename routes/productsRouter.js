const express = require('express');

const ProductsService = require('../services/productsService');

const router = express.Router();
const service = new ProductsService();

// POST
router.post('/', async (req, res) => {
  const body = req.body;
  const newProduct = await service.create(body);
  res.status(201).json(newProduct);
});

// PUT -  Se usa para reemplazar completamente un recurso
// router.put('/:id', (req, res) => {
//   const { id } = req.params;
//   const body = req.body;
//   res.status(200).json({
//     message: 'updated',
//     id,
//     data: body,
//   });
// });

// PATCH - Se usa para parchar o actualizar parcialmente el recurso
router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const product = await service.update(id, body);
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
});

// DELETE
router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    await service.delete(id);
    /**
     * En PUT, PATCH y DELETE, también se puede usar el status 204, que
     * indica que el servidor ha completado exitosamente la solicitud y
     * no hay contenido para enviar en el cuerpo de la respuesta
     */
    res.status(204).json();
  } catch (error) {
    next(error);
  }
});

// GET
router.get('/', async (req, res) => {
  const products = await service.find();
  res.status(200).json(products);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const product = await service.findOne(id);
  res.status(200).json(product);
});

module.exports = router;
