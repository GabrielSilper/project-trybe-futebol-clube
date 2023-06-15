import IUser from '../Interfaces/IUser';
import { ICRUDModelReader } from '../Interfaces/ICRUDModel';
import SequelizeUser from '../database/models/SequelizeUser';

class UserModel implements ICRUDModelReader<IUser> {
  private model = SequelizeUser;

  async findByEmail(email: string): Promise<IUser | null> {
    const user = await this.model.findOne({ where: { email } });
    if (user) return user.dataValues;
    return user;
  }
}

export default UserModel;
