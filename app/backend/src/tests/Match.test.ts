import * as sinon from 'sinon';
import * as chai from 'chai';
import { app } from '../app';
import SequelizeMatch from '../database/models/SequelizeMatch';
import { NOT_FOUND, OK, UNAUTHORIZED } from '../constants/httpCodes';

// @ts-ignore
import chaiHttp = require('chai-http');
import { match1, match2, match3Att } from './mocks/Match.mocks';
import { userPartial, validToken } from './mocks/User.mocks';
import TokenJwt from '../utils/TokenJwt';
chai.use(chaiHttp);

const { expect } = chai;

describe('Match test', () => {
  afterEach(sinon.restore);
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

    it('returns matches filter by progress === true.', async () => {
      const matches = [
        SequelizeMatch.build(match1),
        SequelizeMatch.build(match2),
      ];
      sinon.stub(SequelizeMatch, 'findAll').resolves(matches);
      const { status, body } = await chai
        .request(app)
        .get('/matches?inProgress=true');

      expect(status).to.be.equal(OK);
      expect(body).to.deep.equal([match2]);
    });

    it('returns matches filter by progress === false.', async () => {
      const matches = [
        SequelizeMatch.build(match1),
        SequelizeMatch.build(match2),
      ];
      sinon.stub(SequelizeMatch, 'findAll').resolves(matches);
      const { status, body } = await chai
        .request(app)
        .get('/matches?inProgress=false');

      expect(status).to.be.equal(OK);
      expect(body).to.deep.equal([match1]);
    });
  });

  describe('PATCH part from /matches', () => {
    describe('update match in progress to finished', () => {
      it('returns a sucess message: "Finished".', async () => {
        const jwt = new TokenJwt();
        sinon.stub(jwt, 'verifyToken').returns(userPartial);
        sinon.stub(SequelizeMatch, 'update').resolves([1]);
        const { status, body } = await chai
          .request(app)
          .patch('/matches/1/finish')
          .set({ Authorization: validToken });

        expect(status).to.be.equal(OK);
        expect(body.message).to.be.equal('Finished');
      });

      it('returns a error message: "Token not found".', async () => {
        const { status, body } = await chai
          .request(app)
          .patch('/matches/1/finish');

        expect(status).to.be.equal(UNAUTHORIZED);
        expect(body.message).to.be.equal('Token not found');
      });

      it('returns a error message: "Token must be a valid token".', async () => {
        const { status, body } = await chai
          .request(app)
          .patch('/matches/1/finish')
          .set({ Authorization: 'invalid' });

        expect(status).to.be.equal(UNAUTHORIZED);
        expect(body.message).to.be.equal('Token must be a valid token');
      });
    });

    describe('update match goals', () => {
      it('returns an updated match.', async () => {
        const jwt = new TokenJwt();
        sinon.stub(jwt, 'verifyToken').returns(userPartial);
        sinon.stub(SequelizeMatch, 'update').resolves([1]);
        const updatedMatch = SequelizeMatch.build(match3Att);
        sinon.stub(SequelizeMatch, 'findByPk').resolves(updatedMatch);

        const { status, body } = await chai
          .request(app)
          .patch('/matches/1')
          .send({
            homeTeamGoals: 5,
            awayTeamGoals: 0,
          })
          .set({ Authorization: validToken });

        expect(status).to.be.equal(OK);
        expect(body).to.deep.equal(match3Att);
      });

      it('returns an error message: "Match not found".', async () => {
        const jwt = new TokenJwt();
        sinon.stub(jwt, 'verifyToken').returns(userPartial);
        sinon.stub(SequelizeMatch, 'update').resolves([1]);
        const updatedMatch = SequelizeMatch.build(match3Att);
        sinon.stub(SequelizeMatch, 'findByPk').resolves(null);

        const { status, body } = await chai
          .request(app)
          .patch('/matches/1')
          .send({
            homeTeamGoals: 5,
            awayTeamGoals: 0,
          })
          .set({ Authorization: validToken });

        expect(status).to.be.equal(NOT_FOUND);
        expect(body.message).to.be.equal('Match not found');
      });

      it('returns an error message: "Token not found".', async () => {
        const { status, body } = await chai.request(app).patch('/matches/1');

        expect(status).to.be.equal(UNAUTHORIZED);
        expect(body.message).to.be.equal('Token not found');
      });

      it('returns an error message: "Token must be a valid token".', async () => {
        const { status, body } = await chai
          .request(app)
          .patch('/matches/1')
          .set({ Authorization: 'invalid' });

        expect(status).to.be.equal(UNAUTHORIZED);
        expect(body.message).to.be.equal('Token must be a valid token');
      });
    });
  });

  describe('PATCH part from /matches', () => {
    it.skip('returns a created match', async () => {});
    it.skip('returns an error message: "Token not found".', async () => {});
    it.skip('returns an error message: "Token must be a valid token".', async () => {});
  });
});
