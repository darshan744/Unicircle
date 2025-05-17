import { Request, Response, NextFunction } from "express";
import jwt, { TokenExpiredError } from "jsonwebtoken";
import envs from "../Environments";
import { Exception } from "../Util/Exception";
import { HttpStatusCode } from "../Util/HttpStatusCode";

/**
 * @Middleware
 * @description Checks for the token cookie
 * if not found send -> 401 
 */
export default function AuthMiddleware(req: Request, res: Response, next: NextFunction) {
    if ((req.url === '/api/auth/login' || req.url === '/api/auth/signup' || req.url === "/api/auth/refresh-token")) {
        return next();
    }
    const { token } = req.cookies;
    if (!token) {
        next(new Exception(HttpStatusCode.UNAUTHORIZED, "Auth token not found "))
        return;
    }
    try {
        const verifiedToken = jwt.verify(token, envs.secretKey);
        next();
    } catch (error) {
        const err = <TokenExpiredError>error;
        next(new Exception(HttpStatusCode.UNAUTHORIZED, err.message))
    }

}