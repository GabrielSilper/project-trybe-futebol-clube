import UserModel from '../models/UserModel';
import ServiceData from '../Interfaces/ServiceData';
import { OK, UNAUTHORIZED } from '../constants/httpCodes';
import Login from '../Interfaces/Login';
import Token from '../Interfaces/Token';
import { Encrypter } from '../Interfaces/Encrypter';
import Bcrypt from '../utils/Bcrypt';
import TokenFunctions from '../Interfaces/TokenFunctions';
import TokenJwt from '../utils/TokenJwt';

export default class LoginService {
  private userModel = new UserModel();

  constructor(
    private encrypter: Encrypter = new Bcrypt(),
    private tokenFunctions: TokenFunctions = new TokenJwt(),
  ) {}

  async signIn(login: Login): Promise<ServiceData<Token>> {
    const user = await this.userModel.findByEmail(login.email);
    if (!user) {
      const message = 'Invalid email or password';
      return { type: 'UNAUTHORIZED', status: UNAUTHORIZED, data: { message } };
    }
    const isValid = await this.encrypter.compare(login.password, user.password);
    if (!isValid) {
      const message = 'Invalid email or password';
      return { type: 'UNAUTHORIZED', status: UNAUTHORIZED, data: { message } };
    }
    const { role, email } = user;
    const token = this.tokenFunctions.createToken({ role, email });
    return { type: null, status: OK, data: { token } };
  }

  tokenIn(token: string): ServiceData<string> {
    const { role } = this.tokenFunctions.verifyToken(token);
    return { type: null, status: OK, data: role };
  }
}
