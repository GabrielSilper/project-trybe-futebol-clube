import IMatch from '../Interfaces/IMatch';
import { ICRUDModelCreator, ICRUDModelReader } from '../Interfaces/ICRUDModel';
import SequelizeTeam from '../database/models/SequelizeTeam';
import SequelizeMatch from '../database/models/SequelizeMatch';
import GoalsMatch from '../Interfaces/GoalsMatch';
import { NewEntity } from '../Interfaces';

export default class MatchModel
implements ICRUDModelReader<IMatch>, ICRUDModelCreator<IMatch> {
  private model = SequelizeMatch;

  public async findAll(): Promise<IMatch[]> {
    const data = await this.model.findAll({
      include: [
        {
          model: SequelizeTeam,
          as: 'homeTeam',
          attributes: { exclude: ['id'] },
        },
        {
          model: SequelizeTeam,
          as: 'awayTeam',
          attributes: { exclude: ['id'] },
        },
      ],
      attributes: { exclude: ['home_team_id', 'away_team_id'] },
    });
    return data.map(({ dataValues }) => ({ ...dataValues }));
  }

  public async finishMatch(id: number): Promise<void> {
    await this.model.update({ inProgress: false }, { where: { id } });
  }

  public async update(
    id: number,
    { homeTeamGoals, awayTeamGoals }: GoalsMatch,
  ): Promise<void> {
    await this.model.update(
      { homeTeamGoals, awayTeamGoals },
      { where: { id } },
    );
  }

  public async findById(id: number): Promise<IMatch | null> {
    const match = this.model.findByPk(id, {
      include: [
        {
          model: SequelizeTeam,
          as: 'homeTeam',
          attributes: { exclude: ['id'] },
        },
        {
          model: SequelizeTeam,
          as: 'awayTeam',
          attributes: { exclude: ['id'] },
        },
      ],
      attributes: { exclude: ['home_team_id', 'away_team_id'] },
    });
    return match;
  }

  async create(data: NewEntity<IMatch>): Promise<IMatch> {
    const newMatch = await this.model.create({ ...data });
    return newMatch.dataValues;
  }
}
