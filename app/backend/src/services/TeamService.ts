import ServiceData from '../Interfaces/ServiceData';
import IService from '../Interfaces/IService';
import ITeam from '../Interfaces/ITeam';
import IModel from '../Interfaces/IModel';
import TeamModel from '../models/TeamModel';
import { NOT_FOUND, OK } from '../constants/httpCodes';

export default class TeamService implements IService<ITeam> {
  private teamModel: IModel<ITeam>;

  constructor() {
    this.teamModel = new TeamModel();
  }

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
