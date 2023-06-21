import { NextFunction, Request, Response } from 'express';
import { UNPROCESSABLE_ENTITY } from '../constants/httpCodes';

export default class ValidateMatch {
  public static verify(req: Request, res: Response, next: NextFunction) {
    const { homeTeamId, awayTeamId } = req.body;
    const isEqualTeams = Number(homeTeamId) === Number(awayTeamId);
    if (isEqualTeams) {
      const message = 'It is not possible to create a match with two equal teams';
      return res.status(UNPROCESSABLE_ENTITY).json({ message });
    }
    next();
  }
}
