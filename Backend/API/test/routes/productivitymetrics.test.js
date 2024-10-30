const request = require('supertest');
const jwt = require('jwt-simple');
const uuid = require('uuid');
const app = require('../../src/app');

const route = '/v1/productivitymetrics';
const secret = 'userTaskQuest@202425';

const generateUniqueEmail = () => `${uuid.v4()}@gmail.com`;

let user;
let project;

beforeAll(async () => {
  const userEmail = generateUniqueEmail();

  const userRegistration = await app.services.user.save({
    name: 'Rui Barreto',
    email: userEmail,
    password: 'Rui@Barreto-123',
  });

  user = { ...userRegistration[0] };
  user.token = jwt.encode(user, secret);

  const projectRegistration = await app.services.project.save({
    name: 'TaskQuest',
    description: 'A web app capable of managing all the projects of an company',
    deadline: '2024-10-28',
    created_by: user.id,
  });

  project = { ...projectRegistration[0] };
});

test('Test #61 - Get all productivity metrics by project ID', () => app.db('productivity_metrics')
  .insert({
    project_id: project.id,
    user_id: user.id,
    tasks_completed: 10,
  }, ['project_id'])
  .then((productivityMetricRes) => request(app).get(`${route}/projects/${productivityMetricRes[0].project_id}`)
    .set('Authorization', `bearer ${user.token}`))
  .then((res) => {
    expect(res.status).toBe(200);
  }));

test('Test #62 - Get all productivity metrics by user ID', () => app.db('productivity_metrics')
  .insert({
    project_id: project.id,
    user_id: user.id,
    tasks_completed: 10,
  }, ['user_id'])
  .then((productivityMetricRes) => request(app).get(`${route}/users/${productivityMetricRes[0].user_id}`)
    .set('Authorization', `bearer ${user.token}`))
  .then((res) => {
    expect(res.status).toBe(200);
  }));
