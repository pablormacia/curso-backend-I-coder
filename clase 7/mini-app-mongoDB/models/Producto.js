import mongoose from 'mongoose';

const productoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },

  categoria: {
    type: String,
    required: true
  },

  precio: {
    type: Number,
    required: true,
    min: 0
  },

  stock: {
    type: Number,
    required: true,
    min: 0
  }
});

const Producto = mongoose.model("Producto", productoSchema);

export default Producto;