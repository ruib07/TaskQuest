const request = require('supertest');
const jwt = require('jwt-simple');
const uuid = require('uuid');
const app = require('../../src/app');

const route = '/v1/users';
const secret = 'userTaskQuest@202425';

const generateUniqueEmail = () => `${uuid.v4()}@gmail.com`;

let token;

beforeAll(async () => {
  const userEmail = generateUniqueEmail();

  const userRegistration = await app.services.user.save({
    name: 'Rui Barreto',
    email: userEmail,
    password: 'Rui@Barreto-123',
  });

  token = { ...userRegistration[0] };
  token.token = jwt.encode(token, secret);
});

test('Test #1 - Get all users', () => request(app).get(route)
  .set('Authorization', `bearer ${token.token}`)
  .then((res) => {
    expect(res.status).toBe(200);
  }));

test('Test #2 - Get user by his ID', () => {
  const userEmail = generateUniqueEmail();

  return app.db('users')
    .insert({
      name: 'Rui Barreto',
      email: userEmail,
      password: 'Rui@Barreto-123',
    }, ['id'])
    .then((userRes) => request(app).get(`${route}/${userRes[0].id}`)
      .set('Authorization', `bearer ${token.token}`))
    .then((res) => {
      expect(res.status).toBe(200);
    });
});

test('Test #3 - Insert a user', async () => {
  const userEmail = generateUniqueEmail();

  const res = await request(app).post(route)
    .send({
      name: 'Rui Barreto',
      email: userEmail,
      password: 'Rui@Barreto-123',
    });
  expect(res.status).toBe(201);
});

test('Test #3.1 - Save encripted password', async () => {
  const userEmail = generateUniqueEmail();

  const res = await request(app).post(route)
    .send({
      name: 'Rui Barreto',
      email: userEmail,
      password: 'Rui@Barreto-123',
    });

  expect(res.status).toBe(201);

  const { id } = res.body[0];
  const userRegistrationDB = await app.services.user.find({ id });
  expect(userRegistrationDB.password).not.toBeUndefined();
  expect(userRegistrationDB.password).not.toBe('Rui@Barreto-123');
});

describe('User creation validation', () => {
  const userEmail = generateUniqueEmail();

  const testTemplate = (newData, errorMessage) => request(app).post(route)
    .send({
      name: 'Rui Barreto',
      email: userEmail,
      password: 'Rui@Barreto-123',
      ...newData,
    })
    .then((res) => {
      expect(res.status).toBe(400);
      expect(res.body.error).toBe(errorMessage);
    });

  test('Test #4 - Insert a user without name', () => testTemplate({ name: null }, 'Name is required!'));
  test('Test #5 - Insert a user without email', () => testTemplate({ email: null }, 'Email is required!'));
  test('Test #6 - Insert a user without password', () => testTemplate({ password: null }, 'Password is required!'));
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
      .set('Authorization', `bearer ${token.token}`)
      .send({
        name: 'Mariana Oliveira',
        email: userEmail,
        password: 'Mariana@Oliveira-12',
      }))
    .then((res) => {
      expect(res.status).toBe(200);
    });
});

test('Test #8 - Deleting an user', () => {
  const userEmail = generateUniqueEmail();

  return app.db('users')
    .insert({
      name: 'Rui Barreto',
      email: userEmail,
      password: 'Rui@Barreto-123',
    }, ['id'])
    .then((userRes) => request(app).delete(`${route}/${userRes[0].id}`)
      .set('Authorization', `bearer ${token.token}`)
      .send({
        name: 'User Deleted',
      }))
    .then((res) => {
      expect(res.status).toBe(204);
    });
});
