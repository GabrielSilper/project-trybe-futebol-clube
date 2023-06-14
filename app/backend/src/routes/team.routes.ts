import { Request, Response, Router } from 'express';
import TeamController from '../controllers/TeamController';

const teamRouter = Router();
const teamController = new TeamController();

teamRouter.get('/', (req: Request, res: Response) =>
  teamController.findAll(req, res));

export default teamRouter;
