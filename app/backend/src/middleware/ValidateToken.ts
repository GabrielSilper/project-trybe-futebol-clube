import { NextFunction, Request, Response } from 'express';
import { UNAUTHORIZED } from '../constants/httpCodes';
import TokenFunctions from '../Interfaces/TokenFunctions';
import TokenJwt from '../utils/TokenJwt';

export default class ValidateToken {
  private static tokenFunctions: TokenFunctions = new TokenJwt();

  static verify(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization;
    if (!token) {
      const message = 'Token not found';
      return res.status(UNAUTHORIZED).json({ message });
    }

    try {
      this.tokenFunctions.verifyToken(token);
    } catch (error) {
      const message = 'Token must be a valid token';
      return res.status(UNAUTHORIZED).json({ message });
    }

    next();
  }

  // static isValid(req: Request, res: Response, next: NextFunction) {
  //   const token = req.headers.authorization;
  //   if (token) {
  //     try {
  //       this.tokenFunctions.verifyToken(token);
  //     } catch (error) {
  //       const message = 'Token must be a valid token';
  //       return res.status(UNAUTHORIZED).json({ message });
  //     }
  //   }
  //   next();
  // }
}
