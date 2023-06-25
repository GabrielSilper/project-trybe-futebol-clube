import { Request, Response } from 'express';
import LeaderboardService from '../services/LeaderboardService';

export default class LeaderboardController {
  constructor(private leaderboardService = new LeaderboardService()) {}

  public async homeValues(_req: Request, res: Response) {
    const { data, status } = await this.leaderboardService.homeValues();
    return res.status(status).json(data);
  }
}
