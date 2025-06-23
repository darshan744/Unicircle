import { NextFunction, Request, Response } from "express";
import logger from '../Util/Logger'
export default function(req: Request, _: Response, next: NextFunction) {
    logger.info(`Endpoint : ${req.url} , Method : ${req.method}`)
    next();
}
