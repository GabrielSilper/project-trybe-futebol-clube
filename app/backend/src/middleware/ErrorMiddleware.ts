import { NextFunction, Request, Response } from 'express';

export default class ErrorMiddleware {
  static errors(err: Error, _req: Request, res: Response, _next: NextFunction) {
    return res.status(500).send({
      message: 'Algo de errado aconteceu',
      err,
    });
  }
}
