import { NextFunction, Request, Response, Router } from 'express';
import LoginController from '../controllers/LoginController';
import ValidateLogin from '../middleware/ValidateLogin';
import ValidateToken from '../middleware/ValidateToken';

const loginRouter = Router();
const loginController = new LoginController();

loginRouter.get(
  '/role',
  (req: Request, res: Response, next: NextFunction) => ValidateToken.verify(req, res, next),
  (req: Request, res: Response) => loginController.tokenIn(req, res),
);

loginRouter.post(
  '/',
  ValidateLogin.verify,
  ValidateLogin.validateFields,
  (req: Request, res: Response) => loginController.signIn(req, res),
);

export default loginRouter;
