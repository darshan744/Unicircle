import { pino } from 'pino'

const logger = pino({
  transport: {
    target: "pino-pretty",
    level: "debug",
    options: {
      translateTime: "SYS:standard",
      colorize: true,
    }
  }
})
export default logger;
