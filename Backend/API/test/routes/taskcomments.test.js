const request = require('supertest');
const jwt = require('jwt-simple');
const uuid = require('uuid');
const app = require('../../src/app');

const route = '/v1/taskcomments';
const secret = 'userTaskQuest@202425';

const generateUniqueEmail = () => `${uuid.v4()}@gmail.com`;

let user;
let project;
let taskList;
let task;

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

  const taskListResgistration = await app.services.tasklist.save({
    project_id: project.id,
    name: 'Coding',
  });

  taskList = { ...taskListResgistration[0] };

  const taskRegistration = await app.services.task.save({
    title: 'Login Implementation',
    description: 'Implement login functionality',
    task_list_id: taskList.id,
    assigned_to: user.id,
    status: 'Pending',
    due_date: '2024-11-05',
  });

  task = { ...taskRegistration[0] };
});

test('Test #47 - Get all task comments by task ID', () => app.db('task_comments')
  .insert({
    task_id: task.id,
    user_id: user.id,
    content: 'Completed the initial implementation, but I still need to test a few scenarios. Planning to wrap this up by the end of the day.',
  }, ['task_id'])
  .then((taskCommentRes) => request(app).get(`${route}/${taskCommentRes[0].task_id}`)
    .set('Authorization', `bearer ${user.token}`))
  .then((res) => {
    expect(res.status).toBe(200);
  }));

test('Test #48 - Insert a new task comment', async () => {
  await request(app).post(route)
    .set('Authorization', `bearer ${user.token}`)
    .send({
      task_id: task.id,
      user_id: user.id,
      content: 'Completed the initial implementation, but I still need to test a few scenarios. Planning to wrap this up by the end of the day.',
    })
    .then((res) => {
      expect(res.status).toBe(201);
    });
});

describe('Task Comment creation validation', () => {
  const testTemplate = (newData, errorMessage) => request(app).post(route)
    .set('Authorization', `bearer ${user.token}`)
    .send({
      task_id: task.id,
      user_id: user.id,
      content: 'Completed the initial implementation, but I still need to test a few scenarios. Planning to wrap this up by the end of the day.',
      ...newData,
    })
    .then((res) => {
      expect(res.status).toBe(400);
      expect(res.body.error).toBe(errorMessage);
    });

  test('Test #49 - Insert a task comment without a task ID', () => testTemplate({ task_id: null }, 'Task ID is required!'));
  test('Test #50 - Insert a task comment without a user ID', () => testTemplate({ user_id: null }, 'User ID is required!'));
  test('Test #51 - Insert a task comment without a content', () => testTemplate({ content: null }, 'Content is required!'));
});

test('Test #52 - Deleting an task comment', async () => {
  const taskComment = await app.db('task_comments').insert({
    task_id: task.id,
    user_id: user.id,
    content: 'Completed the initial implementation, but I still need to test a few scenarios. Planning to wrap this up by the end of the day.',
  }, ['id']);

  const res = await request(app).delete(`${route}/${taskComment[0].id}`)
    .set('Authorization', `bearer ${user.token}`);

  expect(res.status).toBe(204);
});
