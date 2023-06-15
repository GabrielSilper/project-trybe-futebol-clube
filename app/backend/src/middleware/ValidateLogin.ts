import { NextFunction, Request, Response } from 'express';
import { BAD_REQUEST } from '../constants/httpCodes';

export default class ValidateLogin {
  static verify(req: Request, res: Response, next: NextFunction) {
    const login = req.body;
    const requiredKeys = ['email', 'password'];
    const notFoundKey = requiredKeys.find((key) => !(key in login));
    const notFilledKey = requiredKeys.find((key) => login[key] === '');
    if (notFoundKey || notFilledKey) {
      const message = 'All fields must be filled';
      return res.status(BAD_REQUEST).json({ message });
    }

    next();
  }
}
