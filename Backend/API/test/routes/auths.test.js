const request = require('supertest');
const uuid = require('uuid');
const app = require('../../src/app');

const signinRoute = '/auth/signin';
const signupRoute = '/auth/signup';
const byIdRoute = '/v1/users/:id';

const generateUniqueEmail = () => `${uuid.v4()}@gmail.com`;

test('Test #9 - Receiving token when a user authenticates', () => {
  const userEmail = generateUniqueEmail();

  return app.services.userRegistration.save({
    name: 'Rui Auth',
    email: userEmail,
    password: 'Rui@Barreto-123',
  })
    .then(() => request(app).post(signinRoute)
      .send({
        email: userEmail,
        password: 'Rui@Barreto-123',
      }))
    .then((res) => {
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('token');
    });
});

test('Test #10 - Wrong authentication attempt for users', () => {
  const userEmail = generateUniqueEmail();

  return app.services.userRegistration.save({
    name: 'Rui Auth',
    email: userEmail,
    password: 'Rui@Barreto-123',
  })
    .then(() => request(app).post(signinRoute)
      .send({
        email: userEmail,
        password: 'Rui@Barreto-12',
      }))
    .then((res) => {
      expect(res.status).toBe(400);
      expect(res.body.error).toBe('Invalid authentication!');
    });
});

test('Test #11 - Access protected user routes', () => request(app).post(byIdRoute)
  .then((res) => {
    expect(res.status).toBe(401);
  }));

test('Test #12 - Creating a user', () => {
  const userEmail = generateUniqueEmail();

  return request(app).post(signupRoute)
    .send({
      name: 'Rui Auth',
      email: userEmail,
      password: 'Rui@Barreto-123',
    })
    .then((res) => {
      expect(res.status).toBe(201);
    });
});
