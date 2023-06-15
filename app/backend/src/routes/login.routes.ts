import { Request, Response, Router } from 'express';
import LoginController from '../controllers/LoginController';
import ValidateLogin from '../middleware/ValidateLogin';

const loginRouter = Router();
const loginController = new LoginController();

loginRouter.post('/', ValidateLogin.verify, (req: Request, res: Response) =>
  loginController.signIn(req, res));

export default loginRouter;
