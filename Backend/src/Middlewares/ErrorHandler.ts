import { Request, Response, NextFunction } from "express";

const errorHandler = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.log(err.message);

  res
    .status("statusCode" in err ? Number(err.statusCode) : 500)
    .json({ message: err.message, err });
};
export default errorHandler;
