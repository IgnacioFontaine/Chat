import express from 'express';
import http from 'http'
import cors from 'cors'

const app = express();
app.use(cors());

const server = http.createServer(app)

const PORT = 3001;

server.listen(PORT, () => {
  console.log(`Server on in port: ${PORT}`)
})
