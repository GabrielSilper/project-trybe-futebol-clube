import ITeam from '../Interfaces/ITeam';
import IModel from '../Interfaces/IModel';
import SequelizeTeam from '../database/models/SequelizeTeam';

export default class TeamModel implements IModel<ITeam> {
  private model = SequelizeTeam;

  async findAll(): Promise<ITeam[]> {
    const data = await this.model.findAll();
    return data.map(({ id, teamName }) => ({ id, teamName }));
  }
}
