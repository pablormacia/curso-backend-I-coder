const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

// inicializamos socket.io sobre el servidor HTTP
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

// cuando un cliente se conecta
io.on("connection", (socket) => {
  console.log("Usuario conectado:", socket.id);

  // escuchar evento "message"
  socket.on("message", (data) => {
    console.log("Mensaje recibido:", data);

    // reenviar a todos los clientes conectados
    io.emit("message", data);
  });

  socket.on("disconnect", () => {
    console.log("Usuario desconectado:", socket.id);
  });
});

server.listen(3000, () => {
  console.log("Servidor en http://localhost:3000");
});