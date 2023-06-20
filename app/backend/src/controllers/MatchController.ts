import { Request, Response } from 'express';
import MatchService from '../services/MatchService';

export default class MatchController {
  constructor(private matchService = new MatchService()) {}

  async findAll(req: Request, res: Response) {
    const { inProgress } = req.query;
    if (inProgress) {
      const theBoolValue = inProgress === 'true';
      const { data, status } = await this.matchService.findAllFiltered(theBoolValue);
      return res.status(status).json(data);
    }
    const { data, status } = await this.matchService.findAll();
    return res.status(status).json(data);
  }

  async finishMatch(req: Request, res: Response) {
    const { id } = req.params;
    const { data, status } = await this.matchService.finishMatch(Number(id));
    return res.status(status).json({ message: data });
  }
}
