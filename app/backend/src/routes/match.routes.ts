import { NextFunction, Request, Response, Router } from 'express';
import MatchController from '../controllers/MatchController';
import ValidateToken from '../middleware/ValidateToken';
import ValidateMatch from '../middleware/ValidateMatch';

const matchRouter = Router();
const matchController = new MatchController();

matchRouter.get('/', (req: Request, res: Response) =>
  matchController.findAll(req, res));

matchRouter.patch(
  '/:id/finish',
  (req: Request, res: Response, next: NextFunction) => ValidateToken.verify(req, res, next),
  (req: Request, res: Response) => matchController.finishMatch(req, res),
);

matchRouter.patch(
  '/:id',
  (req: Request, res: Response, next: NextFunction) => ValidateToken.verify(req, res, next),
  (req: Request, res: Response) => matchController.update(req, res),
);

matchRouter.post(
  '/',
  (req: Request, res: Response, next: NextFunction) => ValidateToken.verify(req, res, next),
  (req: Request, res: Response, next: NextFunction) => ValidateMatch.verify(req, res, next),
  (req: Request, res: Response) => matchController.create(req, res),
);

export default matchRouter;
