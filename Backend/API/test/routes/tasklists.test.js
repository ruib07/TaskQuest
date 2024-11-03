const request = require('supertest');
const jwt = require('jwt-simple');
const uuid = require('uuid');
const app = require('../../src/app');

const route = '/v1/tasklists';
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

test('Test #29 - Get task lists by project ID', () => app.db('task_lists')
  .insert({
    project_id: project.id,
    name: 'Coding',
  }, ['project_id'])
  .then((taskListRes) => request(app).get(`${route}/${taskListRes[0].project_id}`)
    .set('Authorization', `bearer ${user.token}`))
  .then((res) => {
    expect(res.status).toBe(200);
  }));

test('Test #30 - Insert a new task list', async () => {
  await request(app).post(route)
    .set('Authorization', `bearer ${user.token}`)
    .send({
      project_id: project.id,
      name: 'Coding',
    })
    .then((res) => {
      expect(res.status).toBe(201);
    });
});

describe('Task List creation validation', () => {
  const testTemplate = (newData, errorMessage) => request(app).post(route)
    .set('Authorization', `bearer ${user.token}`)
    .send({
      project_id: project.id,
      name: 'Coding',
      ...newData,
    })
    .then((res) => {
      expect(res.status).toBe(400);
      expect(res.body.error).toBe(errorMessage);
    });

  test('Test #31 - Insert a task list without a project ID', () => testTemplate({ project_id: null }, 'Project ID is required!'));
  test('Test #32 - Insert a task list without a name', () => testTemplate({ name: null }, 'Name is required!'));
});

test('Test #33 - Updating a task list data', () => app.db('task_lists')
  .insert({
    project_id: project.id,
    name: 'Coding',
  }, ['id'])
  .then((taskListRes) => request(app).put(`${route}/${taskListRes[0].id}`)
    .set('Authorization', `bearer ${user.token}`)
    .send({
      project_id: project.id,
      name: 'Unit Tests',
    }))
  .then((res) => {
    expect(res.status).toBe(200);
  }));

test('Test #34 - Deleting an task list', async () => {
  const taskList = await app.db('task_lists').insert({
    project_id: project.id,
    name: 'Coding',
  }, ['id']);

  const res = await request(app).delete(`${route}/${taskList[0].id}`)
    .set('Authorization', `bearer ${user.token}`);

  expect(res.status).toBe(204);
});
