import SequelizeLeaderboard from '../database/models/SequelizeLeaderboard';
import theSequelize from '../database/models';
import { leaderboardAway, leaderboardHome } from '../constants/queries';
import { IStandEfficiency } from '../Interfaces/Stand';
import LeaderboardFunctions from '../utils/LeaderboardFunctions';

export default class LeaderboardModel {
  private sequelize = theSequelize;

  public async homeValues(): Promise<IStandEfficiency[]> {
    const results = await this.sequelize.query(leaderboardHome, {
      model: SequelizeLeaderboard,
      mapToModel: true,
    });
    const standings = LeaderboardFunctions.mapTypes(results);
    return standings;
  }

  public async awayValues(): Promise<IStandEfficiency[]> {
    const results = await this.sequelize.query(leaderboardAway, {
      model: SequelizeLeaderboard,
      mapToModel: true,
    });
    const standings = LeaderboardFunctions.mapTypes(results);
    return standings;
  }

  public async leaderboard(): Promise<IStandEfficiency[]> {
    const homeResults = await this.sequelize.query(leaderboardHome, {
      model: SequelizeLeaderboard,
      mapToModel: true,
    });
    const awayResults = await this.sequelize.query(leaderboardAway, {
      model: SequelizeLeaderboard,
      mapToModel: true,
    });
    const home = LeaderboardFunctions.mapTypes(homeResults);
    const away = LeaderboardFunctions.mapTypes(awayResults);
    const sumResult = LeaderboardFunctions.sumLeaderboards(home, away);
    LeaderboardFunctions.sortLeaderboard(sumResult);
    return sumResult;
  }
}
