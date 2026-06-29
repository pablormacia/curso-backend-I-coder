import express from "express";

const router = express.Router();
import Producto from "../models/Producto.js";

// LISTAR + FILTRO
router.get("/", async (req, res) => {
  const categoria = req.query.categoria;

  const filtro = categoria ? { categoria } : {};

  const error = req.query.error;

  const productos = await Producto.find(filtro);

  res.render("productos", {
    productos,
    categoriaActual: categoria || "",
    error: error  ? "Datos inválidos": null
  });
});

// CREAR
router.post("/crear", async (req, res) => {
  const { nombre, categoria, precio, stock } = req.body;
  try {
    await Producto.create(req.body);
    return res.redirect("/productos");
  } catch (error) {
    console.error("Error al crear el producto:", error);
    return res.redirect("/productos?error=1");
  }
  res.redirect("/productos");
});

// ELIMINAR
router.post("/eliminar/:id", async (req, res) => {
  await Producto.deleteOne({ _id: req.params.id });
  res.redirect("/productos");
});

export default router;
