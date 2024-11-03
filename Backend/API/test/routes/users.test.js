const request = require('supertest');
const jwt = require('jwt-simple');
const uuid = require('uuid');
const app = require('../../src/app');

const route = '/v1/users';
const secret = 'userTaskQuest@202425';

const generateUniqueEmail = () => `${uuid.v4()}@gmail.com`;

let user;

beforeAll(async () => {
  const userEmail = generateUniqueEmail();

  const userRegistration = await app.services.userRegistration.save({
    name: 'Rui Barreto',
    email: userEmail,
    password: 'Rui@Barreto-123',
  });

  user = { ...userRegistration[0] };
  user.token = jwt.encode(user, secret);
});

test('Test #5 - Get all users', () => request(app).get(route)
  .set('Authorization', `bearer ${user.token}`)
  .then((res) => {
    expect(res.status).toBe(200);
  }));

test('Test #6 - Get user by his ID', () => {
  const userEmail = generateUniqueEmail();

  return app.db('users')
    .insert({
      name: 'Rui Barreto',
      email: userEmail,
      password: 'Rui@Barreto-123',
    }, ['id'])
    .then((userRes) => request(app).get(`${route}/${userRes[0].id}`)
      .set('Authorization', `bearer ${user.token}`))
    .then((res) => {
      expect(res.status).toBe(200);
    });
});

test('Test #7 - Updating user data', () => {
  const userEmail = generateUniqueEmail();

  return app.db('users')
    .insert({
      name: 'Rui Barreto',
      email: userEmail,
      password: 'Rui@Barreto-123',
    }, ['id'])
    .then((userRes) => request(app).put(`${route}/${userRes[0].id}`)
      .set('Authorization', `bearer ${user.token}`)
      .send({
        name: 'Mariana Oliveira',
        email: userEmail,
        password: 'Mariana@Oliveira-12',
      }))
    .then((res) => {
      expect(res.status).toBe(200);
    });
});

test('Test #8 - Deleting an user', async () => {
  const userEmail = generateUniqueEmail();

  const userDel = await app.db('users')
    .insert({
      name: 'Rui Barreto',
      email: userEmail,
      password: 'Rui@Barreto-123',
    }, ['id']);

  const res = await request(app).delete(`${route}/${userDel[0].id}`)
    .set('Authorization', `bearer ${user.token}`);

  expect(res.status).toBe(204);
});
