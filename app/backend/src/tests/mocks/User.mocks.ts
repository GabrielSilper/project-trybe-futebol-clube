import IUser from '../../Interfaces/IUser';
import Login from '../../Interfaces/Login';

const user1: IUser = {
  id: 1,
  username: 'Admin',
  role: 'admin',
  email: 'admin@admin.com',
  password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW',
};

const loginUser1: Login = {
  email: 'admin@admin.com',
  password: "secret_admin",
};

const loginWrongPassword = {
  email: 'admin@admin.com',
  password: 'secasdasdin',
};

const loginNonexistent = {
  email: 'naoexiste@naoexiste.com',
  password: 'naoexisteasdasd',
};

const loginWithoutEmail = {
  password: 'secret_admin',
};

const loginEmailInvalid = {
  email: '@test.com',
};

const loginNoLength = {
  email: 'admin@admin.com',
  password: 'secre',
};

export {
  user1,
  loginUser1,
  loginWithoutEmail,
  loginEmailInvalid,
  loginNoLength,
  loginNonexistent,
  loginWrongPassword
};
