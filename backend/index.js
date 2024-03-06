import express from 'express'
import http from 'http'
import cors from 'cors'
import  { Server }  from 'soket.io'

const app = express();
app.use(cors());

// app.get('/', (req, res) => {
//   res.send("Server chat encendido!")
// })

const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
})

io.on('connection', (socket) => {
  console.log(socket.id)
  socket.on('disconnect', () => {
    console.log('User disconnect', socket.id)
  })
});

const PORT = 3001;

server.listen(PORT, () => {
  console.log(`Server on in port: ${PORT}`)
})


