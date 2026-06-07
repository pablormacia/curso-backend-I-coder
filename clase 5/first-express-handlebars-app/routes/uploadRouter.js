const express = require('express');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

const router = express.Router();


// =====================================
// Configuración de almacenamiento
// =====================================

const storage = multer.diskStorage({

  // Carpeta donde guardar archivos
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },

  // Generar nombre único usando UUID
  filename: (req, file, cb) => {

    // Obtener extensión original
    const extension = path.extname(file.originalname);

    // Generar nombre único
    const fileName = `${uuidv4()}${extension}`;

    cb(null, fileName);
  }
});


// =====================================
// Validación de tipo de archivo
// =====================================

const fileFilter = (req, file, cb) => {

  const allowedTypes = [
    'image/jpeg',
    'image/png'
  ];

  if (allowedTypes.includes(file.mimetype)) {

    // Archivo aceptado
    cb(null, true);

  } else {

    // Archivo rechazado
    cb(
      new Error(
        'Solo se permiten imágenes JPEG y PNG'
      ),
      false
    );
  }
};


// =====================================
// Configuración de Multer
// =====================================

const upload = multer({

  storage,

  fileFilter,

  limits: {

    // 1.5 MB
    fileSize: 1.5 * 1024 * 1024
  }
});


// =====================================
// POST /upload
// =====================================

router.post('/upload', (req, res) => {

  upload.single('file')(req, res, (err) => {

    // Error generado por Multer
    if (err instanceof multer.MulterError) {

      if (err.code === 'LIMIT_FILE_SIZE') {

        return res.status(413).json({
          error: 'El archivo supera el límite de 1.5MB'
        });
      }

      return res.status(400).json({
        error: err.message
      });
    }

    // Error generado por fileFilter
    if (err) {

      return res.status(400).json({
        error: err.message
      });
    }

    // No llegó archivo
    if (!req.file) {

      return res.status(400).json({
        error: 'Debe enviar un archivo'
      });
    }

    // Éxito
    res.status(200).json({
      message: 'Archivo subido correctamente',
      filename: req.file.filename
    });
  });
});

module.exports = router;