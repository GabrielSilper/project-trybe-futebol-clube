import * as sinon from 'sinon';
import * as chai from 'chai';
import { app } from '../app';
import SequelizeUser from '../database/models/SequelizeUser';
import { NOT_FOUND, OK } from '../constants/httpCodes';

// @ts-ignore
import chaiHttp = require('chai-http');
import { loginUser1, user1 } from './mocks/User.mocks';
chai.use(chaiHttp);

const { expect } = chai;

describe('Login test', () => {
  afterEach(() => {
    sinon.restore();
  });
  describe('POST part from /login', () => {
    it('returns a token after correctly login', async () => {
      const userMock = SequelizeUser.build(user1)
      sinon.stub(SequelizeUser, 'findOne').resolves(userMock);

      const { status, body } = await chai
        .request(app)
        .post('/login')
        .send(loginUser1);

        expect(status).to.be.equal(200)
        expect(body.token).not.to.be.undefined
    });

    it('', () => {
      
    })
  });
});
