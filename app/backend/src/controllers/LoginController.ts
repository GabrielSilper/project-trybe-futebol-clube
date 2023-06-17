import { Request, Response } from 'express';
import LoginService from '../services/LoginService';

export default class LoginController {
  private loginService = new LoginService();

  async signIn(req: Request, res: Response) {
    const { status, data } = await this.loginService.signIn(req.body);
    return res.status(status).json(data);
  }

  tokenIn(req: Request, res: Response) {
    const token = req.headers.authorization as string;
    const { type, data, status } = this.loginService.tokenIn(token);
    if (type) {
      return res.status(status).json(data);
    }
    return res.status(status).json({ role: data });
  }
}
