import IUser from '../../Interfaces/IUser';
import Login from '../../Interfaces/Login';
import { TokenPayload } from '../../Interfaces/TokenPayload';

const user1: IUser = {
  id: 1,
  username: 'Admin',
  role: 'admin',
  email: 'admin@admin.com',
  password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW',
};

const userPartial: TokenPayload = {
  role: 'admin',
  email: 'admin@admin.com',
};

const loginUser1: Login = {
  email: 'admin@admin.com',
  password: 'secret_admin',
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
  password: 'secret_admin',
};

const loginNoLength = {
  email: 'admin@admin.com',
  password: 'secre',
};

const validToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJBZG1pbiIsImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjg2OTMzNjM0fQ.CXTMK1h2Oqe3hdwD7UETW6DY25a-IHJo-u3EPRABs-k';

export {
  user1,
  loginUser1,
  loginWithoutEmail,
  loginEmailInvalid,
  loginNoLength,
  loginNonexistent,
  loginWrongPassword,
  validToken,
  userPartial
};
