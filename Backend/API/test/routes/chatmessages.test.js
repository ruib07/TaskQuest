const request = require('supertest');
const jwt = require('jwt-simple');
const uuid = require('uuid');
const app = require('../../src/app');

const route = '/v1/chatmessages';
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

test('Test #52 - Get all chat messages by project ID', () => app.db('chat_messages')
  .insert({
    project_id: project.id,
    sender_id: token.id,
    content: 'Hello. I need help to implement the new task. Can you help me please?',
  }, ['project_id'])
  .then((chatMessageRes) => request(app).get(`${route}/${chatMessageRes[0].project_id}`)
    .set('Authorization', `bearer ${token.token}`))
  .then((res) => {
    expect(res.status).toBe(200);
  }));

test('Test #53 - Insert a new chat message', async () => {
  await request(app).post(route)
    .set('Authorization', `bearer ${token.token}`)
    .send({
      project_id: project.id,
      sender_id: token.id,
      content: 'Hello. I need help to implement the new task. Can you help me please?',
    })
    .then((res) => {
      expect(res.status).toBe(201);
    });
});

describe('Chat Message creation validation', () => {
  const testTemplate = (newData, errorMessage) => request(app).post(route)
    .set('Authorization', `bearer ${token.token}`)
    .send({
      project_id: project.id,
      sender_id: token.id,
      content: 'Hello. I need help to implement the new task. Can you help me please?',
      ...newData,
    })
    .then((res) => {
      expect(res.status).toBe(400);
      expect(res.body.error).toBe(errorMessage);
    });

  test('Test #54 - Insert a chat message without a project ID', () => testTemplate({ project_id: null }, 'Project ID is required!'));
  test('Test #55 - Insert a chat message without a sender ID', () => testTemplate({ sender_id: null }, 'Sender ID is required!'));
  test('Test #56 - Insert a chat message withou a content', () => testTemplate({ content: null }, 'Content is required!'));
});
