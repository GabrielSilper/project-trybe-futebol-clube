import * as sinon from 'sinon';
import * as chai from 'chai';
import { app } from '../app';
import SequelizeTeam from '../database/models/SequelizeTeam';
import { NOT_FOUND, OK } from '../constants/httpCodes';

// @ts-ignore
import chaiHttp = require('chai-http');
import { teams, team1 } from './mocks/Team.mocks';
chai.use(chaiHttp);

const { expect } = chai;

describe('Team test', () => {
  afterEach(() => {
    sinon.restore();
  })
  describe('GET part from /teams', () => {
    it('returns all books', async () => {
      sinon.stub(SequelizeTeam, 'findAll').resolves(teams as any);

      const { status, body } = await chai.request(app).get('/teams');

      expect(status).to.be.equal(OK);
      expect(body).to.be.deep.equal(teams);
    });

    it('returns an error message: "Book with id (?) not found."', async () => {
      sinon.stub(SequelizeTeam, 'findByPk').resolves(null);

      const { status, body } = await chai.request(app).get('/teams/1000');

      expect(status).to.be.equal(NOT_FOUND);
      expect(body.message).to.be.equal('Book with id 1000 not found.');
    });

    it('returns a book correctly', async () => {
      const theTeam = SequelizeTeam.build(team1)
      sinon.stub(SequelizeTeam, 'findByPk').resolves(theTeam);

      const { status, body } = await chai.request(app).get('/teams/:1');

      expect(status).to.be.equal(OK);
      expect(body).to.be.deep.equal(team1);
    });
  });
});
