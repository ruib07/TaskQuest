const request = require('supertest');
const jwt = require('jwt-simple');
const uuid = require('uuid');
const app = require('../../src/app');

const route = '/v1/projects';
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

test('Test #13 - Get all projects created by a user', () => app.db('projects')
  .insert({
    name: 'TaskQuest',
    description: 'A web app capable of managing all the projects of an company',
    deadline: '2024-10-28',
    created_by: user.id,
  }, ['created_by'])
  .then((projectRes) => request(app).get(`${route}/${projectRes[0].created_by}`)
    .set('Authorization', `bearer ${user.token}`))
  .then((res) => {
    expect(res.status).toBe(200);
  }));

test('Test #14 - Get a project by his ID', () => app.db('projects')
  .insert({
    name: 'TaskQuest',
    description: 'A web app capable of managing all the projects of an company',
    deadline: '2024-10-28',
    created_by: user.id,
  }, ['id'])
  .then((projectRes) => request(app).get(`${route}/byId/${projectRes[0].id}`)
    .set('Authorization', `bearer ${user.token}`))
  .then((res) => {
    expect(res.status).toBe(200);
  }));

test('Test #15 - Creating a project', async () => {
  await request(app).post(route)
    .set('Authorization', `bearer ${user.token}`)
    .send({
      name: 'TaskQuest',
      description: 'A web app capable of managing all the projects of an company',
      deadline: '2024-10-28',
      created_by: user.id,
    })
    .then((res) => {
      expect(res.status).toBe(201);
    });
});

describe('Project creation validation', () => {
  const testTemplate = (newData, errorMessage) => request(app).post(route)
    .set('Authorization', `bearer ${user.token}`)
    .send({
      name: 'TaskQuest',
      description: 'A web app capable of managing all the projects of an company',
      deadline: '2024-10-28',
      created_by: user.id,
      ...newData,
    })
    .then((res) => {
      expect(res.status).toBe(400);
      expect(res.body.error).toBe(errorMessage);
    });

  test('Test #16 - Insert a project without a name', () => testTemplate({ name: null }, 'Name is required!'));
  test('Test #17 - Insert a project without a description', () => testTemplate({ description: null }, 'Description is required!'));
  test('Test #18 - Insert a project without a deadline', () => testTemplate({ deadline: null }, 'Deadline is required!'));
  test('Test #19 - Insert a project without a creator ID', () => testTemplate({ created_by: null }, 'Project creator ID is required!'));
});

test('Test #20 - Updating project data', () => app.db('projects')
  .insert({
    name: 'TaskQuest',
    description: 'A web app capable of managing all the projects of an company',
    deadline: '2024-10-28',
    created_by: user.id,
  }, ['id'])
  .then((projectRes) => request(app).put(`${route}/${projectRes[0].id}`)
    .set('Authorization', `bearer ${user.token}`)
    .send({
      name: 'Planify',
      description: 'A web app capable of managing events',
      deadline: '2024-10-23',
      created_by: user.id,
    }))
  .then((res) => {
    expect(res.status).toBe(200);
  }));

test('Test #21 - Deleting an project', async () => {
  const project = await app.db('projects')
    .insert({
      name: 'TaskQuest',
      description: 'A web app capable of managing all the projects of an company',
      deadline: '2024-10-28',
      created_by: user.id,
    }, ['id']);

  const res = await request(app).delete(`${route}/${project[0].id}`)
    .set('Authorization', `bearer ${user.token}`);

  expect(res.status).toBe(204);
});
