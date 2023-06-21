import * as sinon from 'sinon';
import * as chai from 'chai';
import { app } from '../app';
import SequelizeMatch from '../database/models/SequelizeMatch';
import { CREATED, NOT_FOUND, OK, UNAUTHORIZED, UNPROCESSABLE_ENTITY } from '../constants/httpCodes';

// @ts-ignore
import chaiHttp = require('chai-http');
import {
  match1,
  match2,
  match3Att,
  newMatch,
  reqCreateMatch,
  reqWrongCreateMatch,
} from './mocks/Match.mocks';
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

  describe('POST part from /matches', () => {
    it('returns a created match', async () => {
      const jwt = new TokenJwt();
      sinon.stub(jwt, 'verifyToken').returns(userPartial);

      const createdMatch = SequelizeMatch.build(newMatch);
      sinon.stub(SequelizeMatch, 'create').resolves(createdMatch);

      const { status, body } = await chai
        .request(app)
        .post('/matches')
        .send(reqCreateMatch)
        .set({ Authorization: validToken });

      expect(status).to.be.equal(CREATED);
      expect(body).to.deep.equal(newMatch);
    });
    it('returns an error message: "Token not found".', async () => {
      const { status, body } = await chai
        .request(app)
        .post('/matches')
        .send(reqCreateMatch);

      expect(status).to.be.equal(UNAUTHORIZED);
      expect(body.message).to.be.equal('Token not found');
    });
    it('returns an error message: "Token must be a valid token".', async () => {
      const { status, body } = await chai
        .request(app)
        .post('/matches')
        .send(reqCreateMatch)
        .set({ Authorization: 'invalid' });

      expect(status).to.be.equal(UNAUTHORIZED);
      expect(body.message).to.be.equal('Token must be a valid token');
    });
    it('returns an error message: "It is not possible to create a match with two equal teams".', async () => {
      const jwt = new TokenJwt();
      sinon.stub(jwt, 'verifyToken').returns(userPartial);
      
      const { status, body } = await chai
        .request(app)
        .post('/matches')
        .send(reqWrongCreateMatch)
        .set({ Authorization: validToken });

      expect(status).to.be.equal(UNPROCESSABLE_ENTITY);
      expect(body.message).to.be.equal(
        'It is not possible to create a match with two equal teams'
      );
    });
    it('returns an error message: "There is no team with such id!".', async () => {
      const jwt = new TokenJwt();
      sinon.stub(jwt, 'verifyToken').returns(userPartial);
      
      sinon.stub(SequelizeMatch, 'findByPk').resolves(null);

      const { status, body } = await chai
        .request(app)
        .post('/matches')
        .send(reqCreateMatch)
        .set({ Authorization: validToken });

      expect(status).to.be.equal(NOT_FOUND);
      expect(body.message).to.be.equal('There is no team with such id!');
    });
  });
});
