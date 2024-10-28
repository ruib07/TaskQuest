const request = require('supertest');
const jwt = require('jwt-simple');
const uuid = require('uuid');
const app = require('../../src/app');

const route = '/v1/projects';
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

test('Test #13 - Get all projects created by a user', () => app.db('projects')
  .insert({
    name: 'TaskQuest',
    description: 'A web app capable of managing all the projects of an company',
    deadline: '2024-10-28',
    created_by: token.id,
  }, ['created_by'])
  .then((projectRes) => request(app).get(`${route}/${projectRes[0].created_by}`)
    .set('Authorization', `bearer ${token.token}`))
  .then((res) => {
    expect(res.status).toBe(200);
  }));

test('Test #14 - Get a project by his ID', () => app.db('projects')
  .insert({
    name: 'TaskQuest',
    description: 'A web app capable of managing all the projects of an company',
    deadline: '2024-10-28',
    created_by: token.id,
  }, ['id'])
  .then((projectRes) => request(app).get(`${route}/${projectRes[0].id}`)
    .set('Authorization', `bearer ${token.token}`))
  .then((res) => {
    expect(res.status).toBe(200);
  }));

test('Test #15 - Creating a project', async () => {
  await request(app).post(route)
    .set('Authorization', `bearer ${token.token}`)
    .send({
      name: 'TaskQuest',
      description: 'A web app capable of managing all the projects of an company',
      deadline: '2024-10-28',
      created_by: token.id,
    })
    .then((res) => {
      expect(res.status).toBe(201);
    });
});

describe('Project creation validation', () => {
  const testTemplate = (newData, errorMessage) => request(app).post(route)
    .set('Authorization', `bearer ${token.token}`)
    .send({
      name: 'TaskQuest',
      description: 'A web app capable of managing all the projects of an company',
      deadline: '2024-10-28',
      created_by: token.id,
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
    created_by: token.id,
  }, ['id'])
  .then((projectRes) => request(app).put(`${route}/${projectRes[0].id}`)
    .set('Authorization', `bearer ${token.token}`)
    .send({
      name: 'Planify',
      description: 'A web app capable of managing events',
      deadline: '2024-10-23',
      created_by: token.id,
    }))
  .then((res) => {
    expect(res.status).toBe(200);
  }));

test('Test #21 - Deleting an project', () => app.db('projects')
  .insert({
    name: 'TaskQuest',
    description: 'A web app capable of managing all the projects of an company',
    deadline: '2024-10-28',
    created_by: token.id,
  }, ['id'])
  .then((projectRes) => request(app).delete(`${route}/${projectRes[0].id}`)
    .set('Authorization', `bearer ${token.token}`)
    .send({
      name: 'Project Deleted',
    }))
  .then((res) => {
    expect(res.status).toBe(204);
  }));
