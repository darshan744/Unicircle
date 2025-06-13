import express from "express";
import Logger from "./Middlewares/Logger";
import cookieParser from "cookie-parser";
import cors from 'cors'
import { userNameAvailable } from './Controllers/Auth.controller';
import AuthRoutes from "./Routes/Auth.routes";
import UserRoute from './Routes/User.routes'
import errorHandler from "./Middlewares/ErrorHandler";
import GroupRoutes from "./Routes/Groups.routes";
import AdminRoutes from './Routes/Admin.routes'
import PostRoutes from './Routes/Post.routes'
import AuthMiddleware from "./Middlewares/Auth";
import helment from 'helmet'
import { rateLimiter } from './Options/Ratelimit'
const app = express();
app.use(express.json());

app.use(
    cors({
        origin: "http://localhost:4200",
        credentials: true,
    })
);
app.use(helment());
app.use(cookieParser());
app.use(Logger);
app.use(AuthMiddleware)
app.get("/", (_, res) => {
    res.send("Server is running successfully")
})
app.use("/api", rateLimiter);
app.use("/api/auth", AuthRoutes);
app.use("/api/users", UserRoute);
app.get("/api/username", userNameAvailable);
app.use("/api/groups", GroupRoutes)
app.use("/api/admin", AdminRoutes)
app.use("/api/posts", PostRoutes)

//MUST BE LAST
app.use(errorHandler)

export default app;
