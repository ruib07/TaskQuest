const request = require('supertest');
const jwt = require('jwt-simple');
const uuid = require('uuid');
const app = require('../../src/app');

const route = '/v1/notifications';
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

test('Test #59 - Get all notifications by user ID', () => app.db('notifications')
  .insert({
    user_id: user.id,
    content: 'New task for you: Implement login functionality',
    read: false,
  }, ['user_id'])
  .then((notificationRes) => request(app).get(`${route}/${notificationRes[0].user_id}`)
    .set('Authorization', `bearer ${user.token}`))
  .then((res) => {
    expect(res.status).toBe(200);
  }));

test('Test #60 - Insert a new notification', async () => {
  await request(app).post(route)
    .set('Authorization', `bearer ${user.token}`)
    .send({
      user_id: user.id,
      content: 'New task for you: Implement login functionality',
      read: false,
    })
    .then((res) => {
      expect(res.status).toBe(201);
    });
});

describe('Notification creation validation', () => {
  const testTemplate = (newData, errorMessage) => request(app).post(route)
    .set('Authorization', `bearer ${user.token}`)
    .send({
      user_id: user.id,
      content: 'New task for you: Implement login functionality',
      read: false,
      ...newData,
    })
    .then((res) => {
      expect(res.status).toBe(400);
      expect(res.body.error).toBe(errorMessage);
    });

  test('Test #61 - Insert a notification without user ID', () => testTemplate({ user_id: null }, 'User ID is required!'));
  test('Test #62 - Insert a notification without content', () => testTemplate({ content: null }, 'Content is required!'));
  test('Test #63 - Insert a notification without Read', () => testTemplate({ read: null }, 'Read notification is required!'));
});

test('Test #64 - Updating notification data', () => app.db('notifications')
  .insert({
    user_id: user.id,
    content: 'New task for you: Implement login functionality',
    read: false,
  }, ['id'])
  .then((notificationRes) => request(app).put(`${route}/${notificationRes[0].id}`)
    .set('Authorization', `bearer ${user.token}`)
    .send({
      user_id: user.id,
      content: 'New task for you: Implement login functionality',
      read: true,
    }))
  .then((res) => {
    expect(res.status).toBe(200);
  }));

test('Test #65 - Deleting an notification', async () => {
  const notification = await app.db('notifications')
    .insert({
      user_id: user.id,
      content: 'New task for you: Implement login functionality',
      read: true,
    }, ['id']);

  const res = await request(app).delete(`${route}/${notification[0].id}`)
    .set('Authorization', `bearer ${user.token}`);

  expect(res.status).toBe(204);
});
