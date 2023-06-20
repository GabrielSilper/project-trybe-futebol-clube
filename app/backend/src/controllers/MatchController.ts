import { Request, Response } from 'express';
import MatchService from '../services/MatchService';

export default class MatchController {
  constructor(private matchService = new MatchService()) {}

  async findAll(req: Request, res: Response) {
    const { data, status } = await this.matchService.findAll();
    return res.status(status).json(data);
  }
}
