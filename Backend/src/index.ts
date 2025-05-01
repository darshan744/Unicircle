import app from './app'
import envs from "./Environments";
import Logger from './Middlewares/Logger';
app.use(Logger);
app.get("/" , (_ , res)=> {
    res.send("Server is running successfully")
})

app.listen(envs.port, () => console.log(`Sever listening in http://localhost:${envs.port}`))