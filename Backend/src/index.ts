import app from './app'
import envs from "./Environments";
app.listen(envs.port, () => console.log(`Sever listening in http://localhost:${envs.port}`))