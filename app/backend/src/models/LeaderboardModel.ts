import SequelizeLeaderboard from '../database/models/SequelizeLeaderboard';
import theSequelize from '../database/models';
import { leaderboardAway2, leaderboardHome2 } from '../constants/queries';
import { IStand, IStandEfficiency } from '../Interfaces/Stand';

export default class LeaderboardModel {
  private sequelize = theSequelize;

  private static mapTypes(leaderboard: SequelizeLeaderboard[]): IStandEfficiency[] {
    const standings = leaderboard.map(
      (stand): IStandEfficiency => ({
        ...stand.dataValues,
        totalPoints: Number(stand.totalPoints),
        totalVictories: Number(stand.totalVictories),
        totalDraws: Number(stand.totalDraws),
        totalLosses: Number(stand.totalLosses),
        goalsFavor: Number(stand.goalsFavor),
        goalsOwn: Number(stand.goalsOwn),
        goalsBalance: Number(stand.goalsBalance),
        efficiency: LeaderboardModel.getEfficiency(stand).toFixed(2),
      }),
    );
    return standings;
  }

  private static getEfficiency(stand: IStand) {
    const { totalPoints, totalGames } = stand;
    return (totalPoints / (totalGames * 3)) * 100;
  }

  public async homeValues(): Promise<IStandEfficiency[]> {
    const results = await this.sequelize.query(leaderboardHome2, {
      model: SequelizeLeaderboard,
      mapToModel: true,
    });
    const standings = LeaderboardModel.mapTypes(results);
    return standings;
  }

  public async awayValues(): Promise<IStandEfficiency[]> {
    const results = await this.sequelize.query(leaderboardAway2, {
      model: SequelizeLeaderboard,
      mapToModel: true,
    });
    const standings = LeaderboardModel.mapTypes(results);
    return standings;
  }
}
