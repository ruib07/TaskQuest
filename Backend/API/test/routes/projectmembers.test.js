const request = require('supertest');
const jwt = require('jwt-simple');
const uuid = require('uuid');
const app = require('../../src/app');

const route = '/v1/projectmembers';
const secret = 'userTaskQuest@202425';

const generateUniqueEmail = () => `${uuid.v4()}@gmail.com`;

let token;
let project;

beforeAll(async () => {
  const userEmail = generateUniqueEmail();

  const userRegistration = await app.services.user.save({
    name: 'Rui Barreto',
    email: userEmail,
    password: 'Rui@Barreto-123',
  });

  token = { ...userRegistration[0] };
  token.token = jwt.encode(token, secret);

  const projectRegistration = await app.services.project.save({
    name: 'TaskQuest',
    description: 'A web app capable of managing all the projects of an company',
    deadline: '2024-10-28',
    created_by: token.id,
  });

  project = { ...projectRegistration[0] };
});

test('Test #22 - Get all project members by Project ID', async () => {
  await app.db('project_members').where({ project_id: project.id }).del();

  await app.db('project_members').insert({
    project_id: project.id,
    user_id: token.id,
    role: 'Full-Stack Developer',
  });

  const res = await request(app).get(`${route}/${project.id}`)
    .set('Authorization', `bearer ${token.token}`);
  expect(res.status).toBe(200);
});

test('Test #23 - Insert a new project member', async () => {
  await app.db('project_members').where({ project_id: project.id, user_id: token.id }).del();

  const res = await request(app).post(route)
    .set('Authorization', `bearer ${token.token}`)
    .send({
      project_id: project.id,
      user_id: token.id,
      role: 'Full-Stack Developer',
    });
  expect(res.status).toBe(201);
});

describe('Project Member creation validation', () => {
  const testTemplate = (newData, errorMessage) => request(app).post(route)
    .set('Authorization', `bearer ${token.token}`)
    .send({
      project_id: project.id,
      user_id: token.id,
      role: 'Full-Stack Developer',
      ...newData,
    })
    .then((res) => {
      expect(res.status).toBe(400);
      expect(res.body.error).toBe(errorMessage);
    });

  test('Test #24 - Insert a project member without a project ID', () => testTemplate({ project_id: null }, 'Project ID is required!'));
  test('Test #25 - Insert a project member without a user ID', () => testTemplate({ user_id: null }, 'User ID is required!'));
  test('Test #26 - Insert a project member without a role', () => testTemplate({ role: null }, 'Role is required!'));
});

test('Test #27 - Updating a project member data', async () => {
  await app.db('project_members').where({ project_id: project.id, user_id: token.id }).del();

  const projectMember = await app.db('project_members').insert({
    project_id: project.id,
    user_id: token.id,
    role: 'Full-Stack Developer',
  }, ['id']);

  const res = await request(app).put(`${route}/${projectMember[0].id}`)
    .set('Authorization', `bearer ${token.token}`)
    .send({
      project_id: project.id,
      user_id: token.id,
      role: 'Scrum Master',
    });
  expect(res.status).toBe(200);
});

test('Test #28 - Deleting a project member', async () => {
  await app.db('project_members').where({ project_id: project.id, user_id: token.id }).del();

  const projectMember = await app.db('project_members').insert({
    project_id: project.id,
    user_id: token.id,
    role: 'Full-Stack Developer',
  }, ['id']);

  const res = await request(app).delete(`${route}/${projectMember[0].id}`)
    .set('Authorization', `bearer ${token.token}`);
  expect(res.status).toBe(204);
});
