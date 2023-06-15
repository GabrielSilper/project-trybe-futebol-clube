import ITeam from '../Interfaces/ITeam';
import SequelizeTeam from '../database/models/SequelizeTeam';
import { ICRUDModelReader } from '../Interfaces/ICRUDModel';

export default class TeamModel implements ICRUDModelReader<ITeam> {
  private model = SequelizeTeam;

  public async findAll(): Promise<ITeam[]> {
    const data = await this.model.findAll();
    return data.map(({ id, teamName }) => ({ id, teamName }));
  }

  public async findById(id: number): Promise<ITeam | null> {
    const data = await this.model.findByPk(id);
    if (data) {
      return { ...data.dataValues };
    }
    return data;
  }
}
