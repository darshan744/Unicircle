import { HttpStatusCode } from "./HttpStatusCode";

export class Exception extends Error {
  statusCode: number = 500;
  constructor(status: HttpStatusCode, message: string) {
    super(message);
    this.statusCode = status;
  }
}
