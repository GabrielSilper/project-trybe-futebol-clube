import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';
import sequelize from '.';

class SequelizeLeaderboard extends Model<
InferAttributes<SequelizeLeaderboard>,
InferCreationAttributes<SequelizeLeaderboard>
> {
  // declare id: CreationOptional<number>;
  declare name: string;
  declare totalPoints: number;
  declare totalGames: number;
  declare totalVictories: number;
  declare totalDraws: number;
  declare totalLosses: number;
  declare goalsFavor: number;
  declare goalsOwn: number;
  declare goalsBalance: number;
  declare efficiency: string;
}

SequelizeLeaderboard.init(
  {
    name: DataTypes.INTEGER,
    totalPoints: DataTypes.INTEGER,
    totalGames: DataTypes.INTEGER,
    totalVictories: DataTypes.INTEGER,
    totalDraws: DataTypes.INTEGER,
    totalLosses: DataTypes.INTEGER,
    goalsFavor: DataTypes.INTEGER,
    goalsOwn: DataTypes.INTEGER,
    goalsBalance: DataTypes.INTEGER,
    efficiency: DataTypes.STRING,
  },
  { sequelize, timestamps: false },
);

export default SequelizeLeaderboard;
