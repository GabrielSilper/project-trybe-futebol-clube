import * as sinon from 'sinon';
import * as chai from 'chai';
import { app } from '../app';
import SequelizeUser from '../database/models/SequelizeUser';
import { BAD_REQUEST, OK, UNAUTHORIZED } from '../constants/httpCodes';

// @ts-ignore
import chaiHttp = require('chai-http');
import {
  loginEmailInvalid,
  loginNoLength,
  loginNonexistent,
  loginUser1,
  loginWithoutEmail,
  loginWrongPassword,
  user1,
} from './mocks/User.mocks';
chai.use(chaiHttp);

const { expect } = chai;

describe('Login test', () => {
  beforeEach(() => {
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

    describe('returns an error message: "Invalid email or password"', () => {
      it('invalid email format.', async () => {
        const { status, body } = await chai
          .request(app)
          .post('/login')
          .send(loginEmailInvalid);

        expect(status).to.be.equal(UNAUTHORIZED);
        expect(body.message).to.be.equal('Invalid email or password');
      });

      it('invalid password format.', async () => {
        const { status, body } = await chai
          .request(app)
          .post('/login')
          .send(loginNoLength);

        expect(status).to.be.equal(UNAUTHORIZED);
        expect(body.message).to.be.equal('Invalid email or password');
      });

      it('email does not exist in the database.', async () => {
        sinon.stub(SequelizeUser, 'findOne').resolves(null);
        const { status, body } = await chai
          .request(app)
          .post('/login')
          .send(loginNonexistent);

        // expect(status).to.be.equal(UNAUTHORIZED);
        expect(body.message).to.be.equal('Invalid email or password');
      });

      it('incorrect password.', async () => {
        const userMock = SequelizeUser.build(user1);
        sinon.stub(SequelizeUser, 'findOne').resolves(userMock);
        const { status, body } = await chai
          .request(app)
          .post('/login')
          .send(loginWrongPassword);

        expect(status).to.be.equal(UNAUTHORIZED);
        expect(body.message).to.be.equal('Invalid email or password');
      });
    });
  });
});
