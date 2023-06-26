import SequelizeLeaderboard from '../database/models/SequelizeLeaderboard';
import { IStand, IStandEfficiency } from '../Interfaces/Stand';

export default class LeaderboardFunctions {
  static getEfficiency(stand: IStand) {
    const { totalPoints, totalGames } = stand;
    const efficiency = (totalPoints / (totalGames * 3)) * 100;
    return efficiency.toFixed(2);
  }

  static mapTypes(leaderboard: SequelizeLeaderboard[]): IStandEfficiency[] {
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
        efficiency: LeaderboardFunctions.getEfficiency(stand),
      }),
    );
    return standings;
  }

  static sumStands(home: IStand, away: IStand): IStandEfficiency {
    const sumStand: IStand = {
      name: home.name,
      totalGames: home.totalGames + away.totalGames,
      totalPoints: home.totalPoints + away.totalPoints,
      totalVictories: home.totalVictories + away.totalVictories,
      totalDraws: home.totalDraws + away.totalDraws,
      totalLosses: home.totalLosses + away.totalLosses,
      goalsBalance: home.goalsBalance + away.goalsBalance,
      goalsFavor: home.goalsFavor + away.goalsFavor,
      goalsOwn: home.goalsOwn + away.goalsOwn,
    };
    return {
      ...sumStand,
      efficiency: LeaderboardFunctions.getEfficiency(sumStand),
    };
  }

  static sumLeaderboards(home: IStand[], away: IStand[]): IStandEfficiency[] {
    const sumResult = home.map((stand): IStandEfficiency => {
      const findStandAway = away.find(
        (standAway) => standAway.name === stand.name,
      );
      return LeaderboardFunctions.sumStands(stand, findStandAway as IStand);
    });
    return sumResult;
  }

  static sortLeaderboard(leaderboard: IStandEfficiency[]): void {
    leaderboard.sort((a, b) => {
      if (a.totalPoints > b.totalPoints) return -1;
      if (a.totalPoints < b.totalPoints) return 1;
      if (a.goalsBalance > b.goalsBalance) return -1;
      if (a.goalsBalance < b.goalsBalance) return 1;
      if (a.goalsFavor > b.goalsFavor) return -1;
      if (a.goalsFavor < b.goalsFavor) return 1;
      return 0;
    });
  }
}
