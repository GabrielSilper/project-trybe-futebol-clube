import * as chai from 'chai';
import * as sinon from 'sinon';
import { app } from '../app';
import { INTERNAL_ERROR, OK } from '../constants/httpCodes';
import SequelizeUser from '../database/models/SequelizeUser';

// @ts-ignore
import chaiHttp = require('chai-http');
import { loginUser1 } from './mocks/User.mocks';
chai.use(chaiHttp);

const { expect } = chai;

describe('Error middleware test', () => {
  afterEach(() => {
    sinon.restore();
  });
  it('returns an error message: "Something is wrong"', async () => {
    sinon.stub(SequelizeUser, 'findOne').rejects(new Error('An error!'));

    const { status } = await chai
      .request(app)
      .post('/login')
      .send(loginUser1);

    expect(status).to.be.equal(INTERNAL_ERROR);
  });
});
