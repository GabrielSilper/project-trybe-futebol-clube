import { leaderboardHome } from '../constants/queries';
import theSequelize from '../database/models';
import ServiceData from '../Interfaces/ServiceData';
import { OK } from '../constants/httpCodes';
import SequelizeLeaderboard from '../database/models/SequelizeLeaderboard';
import { IStandEfficiency } from '../Interfaces/Stand';

export default class LeaderboardService {
  private sequelize = theSequelize;

  public async homeValues(): Promise<ServiceData<IStandEfficiency[]>> {
    const results = await this.sequelize.query(leaderboardHome, {
      model: SequelizeLeaderboard,
      mapToModel: true,
    });
    const standings = results.map(
      (stand): IStandEfficiency => ({
        ...stand.dataValues,
        totalPoints: Number(stand.totalPoints),
        totalVictories: Number(stand.totalVictories),
        totalDraws: Number(stand.totalDraws),
        totalLosses: Number(stand.totalLosses),
        goalsFavor: Number(stand.goalsFavor),
        goalsOwn: Number(stand.goalsOwn),
        goalsBalance: Number(stand.goalsBalance),
      }),
    );
    return { type: null, status: OK, data: standings };
  }
}
