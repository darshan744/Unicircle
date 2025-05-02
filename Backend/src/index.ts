import app from './app'
import { userNameAvailable } from './Controllers/Auth.controller';
import envs from "./Environments";
import AuthRoutes from "./Routes/Auth.routes";
import UserRoute from './Routes/User.routes'

app.get("/" , (_ , res)=> {
    res.send("Server is running successfully")
})

app.use("/api/auth", AuthRoutes);
app.use("/api/users", UserRoute);
app.get("/api/username", userNameAvailable);
app.listen(envs.port, () => console.log(`Sever listening in http://localhost:${envs.port}`))