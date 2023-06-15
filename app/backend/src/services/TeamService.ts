import ServiceData from '../Interfaces/ServiceData';
import ITeam from '../Interfaces/ITeam';
import TeamModel from '../models/TeamModel';
import { NOT_FOUND, OK } from '../constants/httpCodes';
import { ICRUDServiceReader } from '../Interfaces/ICRUDService';

export default class TeamService implements ICRUDServiceReader<ITeam> {
  constructor(private teamModel = new TeamModel()) {}

  public async findAll(): Promise<ServiceData<ITeam[]>> {
    const data = await this.teamModel.findAll();
    return { type: null, status: OK, data };
  }

  public async findById(id: number): Promise<ServiceData<ITeam>> {
    const team = await this.teamModel.findById(id);
    if (!team) {
      const message = `Book with id ${id} not found.`;
      return { type: 'NOT_FOUND', status: NOT_FOUND, data: { message } };
    }
    return { type: null, status: OK, data: team };
  }
}
