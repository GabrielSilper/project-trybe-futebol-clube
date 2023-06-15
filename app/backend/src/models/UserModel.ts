import IUser from '../Interfaces/IUser';
import { ICRUDModelReader } from '../Interfaces/ICRUDModel';
import SequelizeUser from '../database/models/SequelizeUser';

class UserModel implements ICRUDModelReader<IUser> {
  private model = SequelizeUser;

  async findAll(): Promise<IUser[]> {
    const usersData = await this.model.findAll();
    return usersData.map(({ dataValues }) => ({ ...dataValues }));
  }

  async findById(id: number): Promise<IUser | null> {
    const user = await this.model.findByPk(id);
    if (user) return user.dataValues;
    return user;
  }
}

export default UserModel;
