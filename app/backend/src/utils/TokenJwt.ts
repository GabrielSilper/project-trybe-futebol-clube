import * as jsonwebtoken from 'jsonwebtoken';
import IUser from '../Interfaces/IUser';
import TokenFunctions from '../Interfaces/TokenFunctions';

class TokenJwt implements TokenFunctions<IUser> {
  private jwt = jsonwebtoken;
  private secret = process.env.JWT_SECRET || 'SECRET';

  createToken(data: Partial<IUser>): string {
    const token = this.jwt.sign(data, this.secret);
    return token;
  }

  verifyToken(token: string): Partial<IUser> {
    const partialUser = this.jwt.verify(token, this.secret);
    return partialUser as Partial<IUser>;
  }
}

export default TokenJwt;
