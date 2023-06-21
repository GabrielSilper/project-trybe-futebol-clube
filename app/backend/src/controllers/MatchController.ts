import { Request, Response } from 'express';
import MatchService from '../services/MatchService';
import { NewEntity } from '../Interfaces';
import IMatch from '../Interfaces/IMatch';

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

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { data, status } = await this.matchService.update(Number(id), req.body);
    return res.status(status).json(data);
  }

  async create(req: Request, res: Response) {
    const newMatch: NewEntity<IMatch> = {
      awayTeamGoals: Number(req.body.awayTeamGoals),
      homeTeamGoals: Number(req.body.homeTeamGoals),
      awayTeamId: Number(req.body.awayTeamId),
      homeTeamId: Number(req.body.homeTeamId),
      inProgress: true,
    };

    const { data, status } = await this.matchService.create(newMatch);
    return res.status(status).json(data);
  }
}
