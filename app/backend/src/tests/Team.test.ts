import * as sinon from 'sinon';
import * as chai from 'chai';
import { app } from '../app';
import Example from '../database/models/ExampleModel';
import { Response } from 'superagent';
import SequelizeTeam from '../database/models/SequelizeTeam'
import { OK } from '../constants/httpCodes';

// @ts-ignore
import chaiHttp = require('chai-http');
import { teams } from './mocks/Team.mocks';
chai.use(chaiHttp);

const { expect } = chai;

describe('Team test', () => {
  describe('GET part from /teams', () => {
    it('return all books', async () => {
      sinon.stub(SequelizeTeam, 'findAll').resolves(teams as any)

      const { status, body } = await chai.request(app).get('/teams');

      expect(status).to.be.equal(OK);
      expect(body).to.be.deep.equal(teams);
    });
  });
});
