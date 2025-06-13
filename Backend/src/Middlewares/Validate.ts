import { ZodSchema } from "zod";
import { NextFunction, Request, Response } from 'express'
import { Exception } from "../Util/Exception";
import { HttpStatusCode } from "../Util/HttpStatusCode";

export const validateSchema = (schema: ZodSchema) =>
  (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      return next(new Exception(HttpStatusCode.CONFLICT, "Invalid Request"))
    }
  }
