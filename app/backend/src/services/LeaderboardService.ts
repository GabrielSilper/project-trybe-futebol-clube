import ServiceData from '../Interfaces/ServiceData';
import { OK } from '../constants/httpCodes';
import { IStandEfficiency } from '../Interfaces/Stand';
import LeaderboardModel from '../models/LeaderboardModel';

export default class LeaderboardService {
  constructor(private leaderboardModel = new LeaderboardModel()) {}

  public async homeValues(): Promise<ServiceData<IStandEfficiency[]>> {
    const standings = await this.leaderboardModel.homeValues();
    return { type: null, status: OK, data: standings };
  }

  public async awayValues(): Promise<ServiceData<IStandEfficiency[]>> {
    const standings = await this.leaderboardModel.awayValues();
    return { type: null, status: OK, data: standings };
  }
}
