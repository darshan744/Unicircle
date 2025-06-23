import { pino } from 'pino'
import envs from '../Environments'
type target = {
  target: string,
  options: {
    destination: string | number,
    mkdir?: boolean
  }
}
const fileTarget: target = {
  target: "pino/file", options: {
    destination: "../Logs/logs.log", mkdir: true
  }
}
const consoleTarget: target = {
  target: "pino-pretty",
  options: {
    destination: process.stdout.fd,
  }

}
const transport = pino.transport({
  targets: (envs.env === "PROD" ? [fileTarget] : [fileTarget, consoleTarget])
})

const logger = pino({
  level: "info",
}, transport)

export default logger;
