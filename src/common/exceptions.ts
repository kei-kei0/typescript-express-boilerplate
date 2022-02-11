import { NextFunction, Request, Response } from "express"

export class HttpException extends Error {
  statusCode: number
  message: string

  constructor(statusCode: number, message: string) {
    super(message)
    this.statusCode = statusCode
    this.message = message
  }
}

export default function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  console.log("executing errorHandler....")
  const statusCode: number = (err instanceof HttpException) ? err.statusCode : 500
  const message: string = (err instanceof HttpException) ? err.message : "Internal Server Error"
  res.status(statusCode).send({statusCode, message})
  next()
}
