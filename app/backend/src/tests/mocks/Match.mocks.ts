const match1 = {
  id: 1,
  homeTeamId: 16,
  homeTeamGoals: 1,
  awayTeamId: 8,
  awayTeamGoals: 1,
  inProgress: false,
  homeTeam: {
    teamName: 'São Paulo',
  },
  awayTeam: {
    teamName: 'Grêmio',
  },
};

const match2 = {
  id: 41,
  homeTeamId: 16,
  homeTeamGoals: 2,
  awayTeamId: 9,
  awayTeamGoals: 0,
  inProgress: true,
  homeTeam: {
    teamName: 'São Paulo',
  },
  awayTeam: {
    teamName: 'Internacional',
  },
};

const match3 = {
  id: 1,
  homeTeamId: 3,
  homeTeamGoals: 0,
  awayTeamId: 1,
  awayTeamGoals: 0,
  inProgress: true,
  homeTeam: {
    teamName: 'Botafogo',
  },
  awayTeam: {
    teamName: 'Flamengo',
  },
};

const match3Att = {
  id: 1,
  homeTeamId: 3,
  homeTeamGoals: 5,
  awayTeamId: 1,
  awayTeamGoals: 0,
  inProgress: true,
  homeTeam: {
    teamName: 'Botafogo',
  },
  awayTeam: {
    teamName: 'Flamengo',
  },
};

export { match1, match2, match3, match3Att };
