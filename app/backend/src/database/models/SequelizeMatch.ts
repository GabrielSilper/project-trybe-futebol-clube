import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';
import sequelize from '.';
import SequelizeTeam from './SequelizeTeam';

class SequelizeMatch extends Model<
InferAttributes<SequelizeMatch>,
InferCreationAttributes<SequelizeMatch>
> {
  declare id: CreationOptional<number>;
  declare homeTeamId: number;
  declare homeTeamGoals: number;
  declare awayTeamId: number;
  declare awayTeamGoals: number;
  declare inProgress: boolean;
}

SequelizeMatch.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    homeTeamId: {
      type: DataTypes.INTEGER,
    },
    homeTeamGoals: {
      type: DataTypes.INTEGER,
    },
    awayTeamId: {
      type: DataTypes.INTEGER,
    },
    awayTeamGoals: {
      type: DataTypes.INTEGER,
    },
    inProgress: {
      type: DataTypes.BOOLEAN,
    },
  },
  {
    sequelize,
    modelName: 'matches',
    timestamps: false,
    underscored: true,
  },
);

SequelizeTeam.hasMany(SequelizeMatch, {
  foreignKey: 'home_team_id',
  as: 'matches',
});

SequelizeMatch.belongsTo(SequelizeTeam, {
  foreignKey: 'home_team_id',
  as: 'homeTeam',
});

SequelizeMatch.belongsTo(SequelizeTeam, {
  foreignKey: 'away_team_id',
  as: 'awayTeam',
});

export default SequelizeMatch;
