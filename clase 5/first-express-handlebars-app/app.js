const express = require('express');
const exphbs  = require('express-handlebars');
const mayusculas = require('./helpers/mayusculas');
const usuariosRouter = require('./routes/usuarios');
const ifEquals = require('./helpers/ifEquals');
const perfilRouter = require('./routes/perfil')
const productosRouter = require('./routes/productos');


const app = express();

// Configurar Handlebars como motor de vistas
app.engine('handlebars', exphbs.engine({
  defaultLayout: 'main',
  helpers: {
    // Aquí se registran helpers personalizados
      /* mayusculas: (texto) => {
        return texto.toUpperCase();
      } */
      mayusculas,
      ifEquals

  }
}));


app.set('view engine', 'handlebars');
app.set('views', './views');

// Ruta principal
app.get('/', (req, res) => {
  res.render('home', {
    nombre: 'Pablo'
  });
});

// Registrar router de usuarios
app.use(usuariosRouter);
app.use(perfilRouter);
app.use(productosRouter);


app.listen(3000, () => {
  console.log('Servidor escuchando en puerto 3000');
});