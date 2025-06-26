import envs from "./Environments";
import logger from './Util/Logger'

import { Server } from 'socket.io'
import app from './app'
import { createServer } from "node:http";

const server = createServer(app)
const io = new Server(server, {
  cors: {
    origin: "http://localhost:4200",
    credentials: true,
  }
});

io.on('connection', (socket) => {
  console.log("Connection recieved")
  socket.on("chat:send", () => {
    console.log(socket.id)
  })
})

server.listen(envs.port, () =>
  logger.info(
    `Sever listening in http://localhost:${envs.port}`
  ))
