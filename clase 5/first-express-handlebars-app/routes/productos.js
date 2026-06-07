const express = require('express');

const router = express.Router();

router.get('/productos', (req, res) => {

  const productos = [
    {
      name: 'Notebook',
      price: 1200
    },
    {
      name: 'Mouse',
      price: 25
    },
    {
      name: 'Teclado',
      price: 50
    }
  ];

  res.render('productos', {
    productos
  });
});

module.exports = router;