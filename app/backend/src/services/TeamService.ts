import ServiceData from '../Interfaces/ServiceData';
import IService from '../Interfaces/IService';
import ITeam from '../Interfaces/ITeam';
import IModel from '../Interfaces/IModel';
import TeamModel from '../models/TeamModel';
import { OK } from '../constants/httpCodes';

export default class TeamService implements IService<ITeam> {
  private teamModel: IModel<ITeam>;

  constructor() {
    this.teamModel = new TeamModel();
  }

  public async findAll(): Promise<ServiceData<ITeam[]>> {
    const data = await this.teamModel.findAll();
    return { type: null, status: OK, data };
  }
}
