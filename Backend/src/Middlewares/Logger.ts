import { NextFunction, Request, Response } from "express";

export default function(req : Request , _ :Response , next:NextFunction) {
    console.log(`Endpoint : ${req.url} , Method : ${req.method}`);
    next();
}