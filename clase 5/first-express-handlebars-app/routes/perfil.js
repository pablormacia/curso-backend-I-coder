const express = require('express');
const router = express.Router();

router.get('/perfil', (req, res) => {

  const usuario = {
    nombre: 'Pablo',
    rol: 'editor',
    autenticado: true
  };

  res.render('perfil', usuario);
});

module.exports = router;