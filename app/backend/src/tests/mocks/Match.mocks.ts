import IMatch from '../../Interfaces/IMatch';

const match1 = {
  id: 1,
  homeTeamId: 16,
  homeTeamGoals: 1,
  awayTeamId: 8,
  awayTeamGoals: 1,
  inProgress: false,
};

const match2 = {
  id: 41,
  homeTeamId: 16,
  homeTeamGoals: 2,
  awayTeamId: 9,
  awayTeamGoals: 0,
  inProgress: true,
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
};

const newMatch: IMatch = {
  id: 50,
  homeTeamId: 16, // O valor deve ser o id do time
  awayTeamId: 8, // O valor deve ser o id do time
  homeTeamGoals: 2,
  awayTeamGoals: 2,
  inProgress: true,
};

const reqCreateMatch = {
  homeTeamId: 16, // O valor deve ser o id do time
  awayTeamId: 8, // O valor deve ser o id do time
  homeTeamGoals: 2,
  awayTeamGoals: 2,
};

const reqWrongCreateMatch = {
  homeTeamId: 8, // O valor deve ser o id do time
  awayTeamId: 8, // O valor deve ser o id do time
  homeTeamGoals: 2,
  awayTeamGoals: 2,
};

const reqWrongId = {
  homeTeamId: 1910, // O valor deve ser o id do time
  awayTeamId: 8, // O valor deve ser o id do time
  homeTeamGoals: 2,
  awayTeamGoals: 2,
};

export { match1, match2, match3, match3Att, reqCreateMatch, newMatch, reqWrongCreateMatch, reqWrongId };
