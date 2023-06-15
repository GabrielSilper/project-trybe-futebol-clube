import * as sinon from 'sinon';
import * as chai from 'chai';
import { app } from '../app';
import SequelizeUser from '../database/models/SequelizeUser';
import { BAD_REQUEST, OK } from '../constants/httpCodes';

// @ts-ignore
import chaiHttp = require('chai-http');
import { loginUser1, loginWithoutEmail, user1 } from './mocks/User.mocks';
chai.use(chaiHttp);

const { expect } = chai;

describe('Login test', () => {
  afterEach(() => {
    sinon.restore();
  });
  describe('POST part from /login', () => {
    it('returns a token after correctly login', async () => {
      const userMock = SequelizeUser.build(user1);
      sinon.stub(SequelizeUser, 'findOne').resolves(userMock);

      const { status, body } = await chai
        .request(app)
        .post('/login')
        .send(loginUser1);

      expect(status).to.be.equal(OK);
      expect(body.token).not.to.be.undefined;
    });

    it('returns an error message: "All fields must be filled"', async () => {
      const { status, body } = await chai
        .request(app)
        .post('/login')
        .send(loginWithoutEmail);

      expect(status).to.be.equal(BAD_REQUEST);
      expect(body.message).to.be.equal('All fields must be filled');
    });
  });
});
