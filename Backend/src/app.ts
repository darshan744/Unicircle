import express from "express";
import Logger from "./Middlewares/Logger";
import cookieParser from "cookie-parser";
import cors from 'cors'
const app = express();
app.use(cors({
    origin:"http://localhost:4200",
    credentials:true
}))
app.use(express.json());
app.use(Logger);
app.use(cookieParser());
export default app;