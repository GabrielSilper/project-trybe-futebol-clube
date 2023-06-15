import { NextFunction, Request, Response } from 'express';
import { INTERNAL_ERROR } from '../constants/httpCodes';

export default class ErrorMiddleware {
  static errors(err: Error, _req: Request, res: Response, _next: NextFunction) {
    return res.status(INTERNAL_ERROR).send({
      message: 'Something is wrong',
      err,
    });
  }
}
