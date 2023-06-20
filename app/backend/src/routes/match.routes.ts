import { NextFunction, Request, Response, Router } from 'express';
import MatchController from '../controllers/MatchController';
import ValidateToken from '../middleware/ValidateToken';

const matchRouter = Router();
const matchController = new MatchController();

matchRouter.get('/', (req: Request, res: Response) =>
  matchController.findAll(req, res));

matchRouter.patch(
  '/:id/finish',
  (req: Request, res: Response, next: NextFunction) => ValidateToken.verify(req, res, next),
  (req: Request, res: Response, next: NextFunction) => ValidateToken.isValid(req, res, next),
  (req: Request, res: Response) => matchController.finishMatch(req, res),
);

matchRouter.patch(
  '/:id',
  (req: Request, res: Response, next: NextFunction) => ValidateToken.verify(req, res, next),
  (req: Request, res: Response, next: NextFunction) => ValidateToken.isValid(req, res, next),
  (req: Request, res: Response) => matchController.update(req, res),
);

export default matchRouter;
