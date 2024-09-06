// npm i ts-node -D
// npm i mocha -D
// npm i @types/mocha -D
// npm i chai@4 -D
// npm i @types/chai -D
// npm i supertest -D
// npm i @types/supertest -D

import { describe, it } from 'mocha';
import { expect } from 'chai';
import supertest from 'supertest';
import { server } from '../src/app';
import { DestinationModel } from '../src/3-models/destination-model';
import path from 'path';

describe('Testing DestinationController', () => {
  let token: string;

  before(async () => {
    const response = await supertest(server).post('/api/login').send({ email: 'khaya@gmail.com', password: 'a1234' });
    token = response.body;
  });

  it('Should return destinations array', async () => {
    const response = await supertest(server).get('/api/destinations').set('Authorization', `bearer ${token}`);
    const destinations: DestinationModel[] = response.body;
    expect(destinations.length).to.be.greaterThanOrEqual(1);

    expect(destinations[0]).to.be.contain.keys('id', 'destination', 'description', 'fromDate', 'untilDate', 'price', 'imageName', 'isLiked', 'likesCount');
  });
  it('Should return a single destination', async () => {
    const response = await supertest(server).get('/api/destinations/108').set('Authorization', `bearer ${token}`);
    const destination: DestinationModel = response.body;
    expect(destination).to.not.be.empty;
    expect(destination).to.contain.keys('id', 'destination', 'description', 'fromDate', 'untilDate', 'price', 'imageName');
  });

  it('Should add a new destination', async () => {
    const response = await supertest(server)
      .post('/api/destinations')
      .set('Authorization', 'Bearer ' + token)
      .field('destination', 'מרוקו')
      .field('description', 'מסע מופלא בהרים למחוזות חדשים')
      .field('fromDate', '2025-04-21')
      .field('untilDate', '2025-04-30')
      .field('price', 1000)
      .attach('image', path.join(__dirname, 'testPicture.jpeg'));
    console.log('res:', response);
    const addedDestination = response.body;
    expect(response.status).to.equal(201);
    expect(addedDestination).to.contain.keys('id', 'destination', 'description', 'fromDate', 'untilDate', 'price', 'imageName');
  });

  it('Should response with 404 error', async () => {
    const response = await supertest(server).get('/api/nothing-here');
    expect(response.status).to.equal(404);
  });
});
