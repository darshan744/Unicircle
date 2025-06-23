import app from './app'
import envs from "./Environments";
import logger from './Util/Logger'

import { Server } from 'socket.io'
import server from './app'

const io = new Server(server);

io.on('connection', (socket) => {
  socket.on('chat:send', () => {
    console.log("Socket : " + socket)
  })
})

app.listen(envs.port, () =>
  logger.info(
    `Sever listening in http://localhost:${envs.port}`
  ))
