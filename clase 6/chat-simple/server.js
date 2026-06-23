const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "*" },
});

// Servir archivos estáticos
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  console.log("Conectado:", socket.id);

  socket.on("chat-message", (data) => {
    // agregamos el id del emisor
    io.emit("chat-message", {
      ...data,
      id: socket.id,
    });
  });
});

server.listen(3000, () => {
  console.log("Servidor en http://localhost:3000");
});