import express from "express";
import Logger from "./Middlewares/Logger";
import cookieParser from "cookie-parser";
import cors from 'cors'
import { userNameAvailable } from './Controllers/Auth.controller';
import AuthRoutes from "./Routes/Auth.routes";
import UserRoute from './Routes/User.routes'
import errorHandler from "./Middlewares/ErrorHandler";

const app = express();
app.use(express.json());
app.use(
    cors({
        origin: "http://localhost:4200",
        credentials: true,
    })
);
app.use(Logger);
app.use(cookieParser());

app.get("/" , (_ , res)=> {
    res.send("Server is running successfully")
})

app.use("/api/auth", AuthRoutes);
app.use("/api/users", UserRoute);
app.get("/api/username", userNameAvailable);



//MUST BE LAST
app.use(errorHandler)

export default app;