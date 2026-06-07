const express = require('express');

const router = express.Router();

router.get('/productos', (req, res) => {

  // Base de datos simulada
  const productos = [
    { name: 'Notebook', price: 1200 },
    { name: 'Mouse', price: 25 },
    { name: 'Teclado', price: 50 },
    { name: 'Monitor', price: 300 },
    { name: 'Auriculares', price: 80 },
    { name: 'Webcam', price: 60 },
    { name: 'Impresora', price: 250 },
    { name: 'Tablet', price: 400 },
    { name: 'Parlante', price: 90 },
    { name: 'Disco SSD', price: 120 },
    { name: 'Memoria RAM', price: 75 },
    { name: 'Router WiFi', price: 55 }
  ];

  // Página actual recibida por query string
  // /productos?page=2
  const page = parseInt(req.query.page) || 1;

  // Cantidad de productos por página
  const limit = 5;

  // Cantidad total de páginas
  const totalPages = Math.ceil(productos.length / limit);

  // Índices para slice()
  const start = (page - 1) * limit;
  const end = start + limit;

  // Productos de la página actual
  const paginatedProducts = productos.slice(start, end);

  // URLs para navegación
  const prevUrl =
    page > 1
      ? `/productos?page=${page - 1}`
      : null;

  const nextUrl =
    page < totalPages
      ? `/productos?page=${page + 1}`
      : null;

  res.render('productos', {
    productos: paginatedProducts,
    currentPage: page,
    totalPages,
    prevUrl,
    nextUrl
  });
});

module.exports = router;