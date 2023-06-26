import { Request, Response } from 'express';
import LeaderboardService from '../services/LeaderboardService';

export default class LeaderboardController {
  constructor(private leaderboardService = new LeaderboardService()) {}

  public async homeValues(_req: Request, res: Response) {
    const { data, status } = await this.leaderboardService.homeValues();
    return res.status(status).json(data);
  }

  public async awayValues(_req: Request, res: Response) {
    const { data, status } = await this.leaderboardService.awayValues();
    return res.status(status).json(data);
  }

  public async leaderboard(_req: Request, res: Response) {
    const { data, status } = await this.leaderboardService.leaderboard();
    return res.status(status).json(data);
  }
}
