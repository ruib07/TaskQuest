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

  const userRegistration = await app.services.userRegistration.save({
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

test('Test #62 - Get all productivity metrics by project ID', () => app.db('productivity_metrics')
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

test('Test #63 - Get all productivity metrics by user ID', () => app.db('productivity_metrics')
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

test('Test #64 - Insert a new productivity metric', async () => {
  await request(app).post(route)
    .set('Authorization', `bearer ${user.token}`)
    .send({
      project_id: project.id,
      user_id: user.id,
      tasks_completed: 5,
    })
    .then((res) => {
      expect(res.status).toBe(201);
    });
});

describe('Productivity metric creation validation', () => {
  const testTemplate = (newData, errorMessage) => request(app).post(route)
    .set('Authorization', `bearer ${user.token}`)
    .send({
      project_id: project.id,
      user_id: user.id,
      tasks_completed: 5,
      ...newData,
    })
    .then((res) => {
      expect(res.status).toBe(400);
      expect(res.body.error).toBe(errorMessage);
    });

  test('Test #65 - Insert a productivity metric without a project ID', () => testTemplate({ project_id: null }, 'Project ID is required!'));
  test('Test #66 - Insert a productivity metric without a user ID', () => testTemplate({ user_id: null }, 'User ID is required!'));
  test('Test #67 - Insert a productivity metric withou a completed tasks', () => testTemplate({ tasks_completed: null }, 'Completed tasks are required!'));
});

test('Test #68 - Updating productivity metric data', () => app.db('productivity_metrics')
  .insert({
    project_id: project.id,
    user_id: user.id,
    tasks_completed: 5,
  }, ['id'])
  .then((productivityMetricRes) => request(app).put(`${route}/${productivityMetricRes[0].id}`)
    .set('Authorization', `bearer ${user.token}`)
    .send({
      project_id: project.id,
      user_id: user.id,
      tasks_completed: 10,
    }))
  .then((res) => {
    expect(res.status).toBe(200);
  }));
