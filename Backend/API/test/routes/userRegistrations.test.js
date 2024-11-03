const request = require('supertest');
const uuid = require('uuid');
const app = require('../../src/app');

const route = '/v1/userRegistrations';
const generateUniqueEmail = () => `${uuid.v4()}@gmail.com`;

test('Test #1 - Register a user', async () => {
  const userEmail = generateUniqueEmail();

  const res = await request(app).post(route)
    .send({
      name: 'Rui Barreto',
      email: userEmail,
      password: 'Rui@Barreto-123',
    });
  expect(res.status).toBe(201);
});

test('Test #1.1 - Save encripted password', async () => {
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

  test('Test #2 - Insert a user without name', () => testTemplate({ name: null }, 'Name is required!'));
  test('Test #3 - Insert a user without email', () => testTemplate({ email: null }, 'Email is required!'));
  test('Test #4 - Insert a user without password', () => testTemplate({ password: null }, 'Password is required!'));
});
