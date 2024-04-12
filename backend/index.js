import express from 'express'
import cors from 'cors'
import { Server } from "socket.io";
import { createServer } from 'node:http'

const app = express();
app.use(cors());

const server = createServer(app)
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET","POST"]
  }
})

io.on('connection', (socket) => {
  console.log(`Usuario actual: ${socket.id}`)

  socket.on('join_room', (data) => {
    socket.join(data)
    console.log(`Usuario con ID: ${socket.id} se unió a la sala: ${data}`)
  })

  socket.on('ingreso_sala', (data) => {
    socket.join(data)
    console.log(`Usuario: ${socket.id} se unió a la sala: ${data}`)
  })

  socket.on('send_message', (data) => {
    console.log(`Mensaje enviado:`, data)
    socket.to(data.room).emit('recieve_message',data)
  })

  socket.on('send_file', (data) => {
    // Aquí puedes guardar el archivo o transmitirlo a otros clientes
    console.log('Archivo recibido:', data);
    // socket.to(data.room).emit('recieve_file',data)
  });

  socket.on('disconnect', () => {
    console.log('User disconnect', socket.id)
  })
});


const PORT = 3001;

server.listen(PORT, () => {
  console.log(`Server on in port: ${PORT}`)
})


