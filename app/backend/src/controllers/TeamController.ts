import { Request, Response } from 'express';
import TeamService from '../services/TeamService';

export default class TeamController {
  constructor(private teamService = new TeamService()) {}

  public async findAll(req: Request, res: Response) {
    const { status, data } = await this.teamService.findAll();
    return res.status(status).json(data);
  }
}
