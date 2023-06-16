import { NextFunction, Request, Response } from 'express';
import { BAD_REQUEST, UNAUTHORIZED } from '../constants/httpCodes';
import Login from '../Interfaces/Login';

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

  static validateFields(req: Request, res: Response, next: NextFunction) {
    const login: Login = req.body;
    const lengthRequired = 6;
    const emailRegex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    const isValidFields = emailRegex.test(login.email) && login.password.length > lengthRequired;

    if (!isValidFields) {
      const message = 'Invalid email or password';
      return res.status(UNAUTHORIZED).json({ message });
    }
    next();
  }
}
