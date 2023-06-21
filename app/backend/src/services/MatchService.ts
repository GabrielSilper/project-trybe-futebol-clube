import { NewEntity } from '../Interfaces';
import ServiceData from '../Interfaces/ServiceData';
import { CREATED, NOT_FOUND, OK } from '../constants/httpCodes';
import {
  ICRUDServiceReader,
  ICRUDServiceCreator,
} from '../Interfaces/ICRUDService';
import MatchModel from '../models/MatchModel';
import IMatch from '../Interfaces/IMatch';
import GoalsMatch from '../Interfaces/GoalsMatch';

export default class MatchService
implements ICRUDServiceReader<IMatch>, ICRUDServiceCreator<IMatch> {
  constructor(private matchModel = new MatchModel()) {}

  public async findAll(): Promise<ServiceData<IMatch[]>> {
    const data = await this.matchModel.findAll();
    return { type: null, status: OK, data };
  }

  public async findAllFiltered(
    inProgress: boolean,
  ): Promise<ServiceData<IMatch[]>> {
    const allMatches = await this.matchModel.findAll();
    const data = allMatches.filter((match) => match.inProgress === inProgress);
    return { type: null, status: OK, data };
  }

  public async finishMatch(id: number): Promise<ServiceData<string>> {
    await this.matchModel.finishMatch(id);
    return { type: null, status: OK, data: 'Finished' };
  }

  public async update(
    id: number,
    goals: GoalsMatch,
  ): Promise<ServiceData<IMatch>> {
    await this.matchModel.update(id, goals);
    const updatedMatch = await this.matchModel.findById(id);
    if (!updatedMatch) {
      const message = 'Match not found';
      return { type: 'NOT_FOUND', status: NOT_FOUND, data: { message } };
    }
    return { type: null, status: OK, data: updatedMatch };
  }

  public async create(data: NewEntity<IMatch>): Promise<ServiceData<IMatch>> {
    const homeTeam = await this.matchModel.findById(data.homeTeamId);
    const awayTeam = await this.matchModel.findById(data.awayTeamId);

    if (!homeTeam || !awayTeam) {
      const message = 'There is no team with such id!';
      return { type: 'NOT_FOUND', status: NOT_FOUND, data: { message } };
    }

    const newMatch = await this.matchModel.create(data);
    return { type: null, status: CREATED, data: newMatch };
  }
}
