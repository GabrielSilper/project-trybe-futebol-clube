import ServiceData from '../Interfaces/ServiceData';
import { OK } from '../constants/httpCodes';
import { ICRUDServiceReader } from '../Interfaces/ICRUDService';
import MatchModel from '../models/MatchModel';
import IMatch from '../Interfaces/IMatch';

export default class MatchService implements ICRUDServiceReader<IMatch> {
  constructor(private matchModel = new MatchModel()) {}

  public async findAll(): Promise<ServiceData<IMatch[]>> {
    const data = await this.matchModel.findAll();
    return { type: null, status: OK, data };
  }

  public async findAllFiltered(inProgress: boolean): Promise<ServiceData<IMatch[]>> {
    const allMatches = await this.matchModel.findAll();
    const data = allMatches.filter((match) => match.inProgress === inProgress);
    return { type: null, status: OK, data };
  }
}
