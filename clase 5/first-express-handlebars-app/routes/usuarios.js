const express = require('express');

const router = express.Router();

// GET /usuarios
router.get('/usuarios', (req, res) => {

  // Datos simulados
  const usuarios = [
    {
      nombre: 'Pablo',
      email: 'pablo@mail.com'
    },
    {
      nombre: 'Ana',
      email: 'ana@mail.com'
    },
    {
      nombre: 'Juan',
      email: 'juan@mail.com'
    }
  ];

  // Renderizar la vista usuarios.handlebars
  res.render('usuarios', {
    usuarios
  });
});

module.exports = router;