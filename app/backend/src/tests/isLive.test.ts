import * as chai from 'chai';
import { app } from '../app';
import { OK } from '../constants/httpCodes';

// @ts-ignore
import chaiHttp = require('chai-http');
chai.use(chaiHttp);

const { expect } = chai;

describe('Is Ok test', () => {
  it('returns a message to confirm the app is OK.', async () => {
    const { status, body } = await chai.request(app).get('/');

    expect(status).to.be.equal(OK);
    expect(body.ok).to.be.true;
  });
});
