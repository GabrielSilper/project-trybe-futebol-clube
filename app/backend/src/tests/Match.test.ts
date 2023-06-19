import * as sinon from 'sinon';
import * as chai from 'chai';
import { app } from '../app';
import SequelizeMatch from '../database/models/SequelizeMatch';
import { OK } from '../constants/httpCodes';

// @ts-ignore
import chaiHttp = require('chai-http');
import { match1, match2 } from './mocks/Match.mocks';
chai.use(chaiHttp);

const { expect } = chai;

describe('Match test', () => {
  describe('GET part from /matches', () => {
    it('returns all matches.', async () => {
      const matches = [
        SequelizeMatch.build(match1),
        SequelizeMatch.build(match2),
      ];
      sinon.stub(SequelizeMatch, 'findAll').resolves(matches);
      const { status, body } = await chai.request(app).get('/matches');

      expect(status).to.be.equal(OK);
      expect(body).to.deep.equal([match1, match2]);
    });
  });
});
