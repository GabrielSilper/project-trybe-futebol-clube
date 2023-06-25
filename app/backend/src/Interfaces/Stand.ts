export interface IStand {
  name: string,
  totalPoints: number,
  totalGames: number,
  totalVictories: number,
  totalDraws: number,
  totalLosses: number,
  goalsFavor: number,
  goalsOwn: number,
}

export interface IStandEfficiency extends IStand {
  goalsBalance: number,
  efficiency: string,
}
