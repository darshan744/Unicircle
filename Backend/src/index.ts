import app from './app'
import envs from "./Environments";
import logger from './Util/Logger'
app.listen(envs.port, () =>
  logger.info(
    `Sever listening in http://localhost:${envs.port}`
  ))
