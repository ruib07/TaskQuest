const request = require('supertest');
const jwt = require('jwt-simple');
const uuid = require('uuid');
const app = require('../../src/app');

const route = '/v1/tasks';
const secret = 'userTaskQuest@202425';

const generateUniqueEmail = () => `${uuid.v4()}@gmail.com`;

let user;
let project;
let taskList;

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
});

test('Test #35 - Get tasks by task list ID', () => app.db('tasks')
  .insert({
    title: 'Login Implementation',
    description: 'Implement login functionality',
    task_list_id: taskList.id,
    assigned_to: user.id,
    status: 'Pending',
    due_date: '2024-11-05',
  }, ['task_list_id'])
  .then((taskRes) => request(app).get(`${route}/${taskRes[0].task_list_id}`)
    .set('Authorization', `bearer ${user.token}`))
  .then((res) => {
    expect(res.status).toBe(200);
  }));

test('Test #36 - Get tasks by user ID', () => app.db('tasks')
  .insert({
    title: 'Login Implementation',
    description: 'Implement login functionality',
    task_list_id: taskList.id,
    assigned_to: user.id,
    status: 'Pending',
    due_date: '2024-11-05',
  }, ['assigned_to'])
  .then((taskRes) => request(app).get(`${route}/user/${taskRes[0].assigned_to}`)
    .set('Authorization', `bearer ${user.token}`))
  .then((res) => {
    expect(res.status).toBe(200);
  }));

test('Test #37 - Get a task by ID', () => app.db('tasks')
  .insert({
    title: 'Login Implementation',
    description: 'Implement login functionality',
    task_list_id: taskList.id,
    assigned_to: user.id,
    status: 'Pending',
    due_date: '2024-11-05',
  }, ['id'])
  .then((taskRes) => request(app).get(`${route}/${taskRes[0].id}`)
    .set('Authorization', `bearer ${user.token}`))
  .then((res) => {
    expect(res.status).toBe(200);
  }));

test('Test #38 - Insert a new task', async () => {
  await request(app).post(route)
    .set('Authorization', `bearer ${user.token}`)
    .send({
      title: 'Login Implementation',
      description: 'Implement login functionality',
      task_list_id: taskList.id,
      assigned_to: user.id,
      status: 'Pending',
      due_date: '2024-11-05',
    })
    .then((res) => {
      expect(res.status).toBe(201);
    });
});

describe('Task creation validation', () => {
  const testTemplate = (newData, errorMessage) => request(app).post(route)
    .set('Authorization', `bearer ${user.token}`)
    .send({
      title: 'Login Implementation',
      description: 'Implement login functionality',
      task_list_id: taskList.id,
      assigned_to: user.id,
      status: 'Pending',
      due_date: '2024-11-05',
      ...newData,
    })
    .then((res) => {
      expect(res.status).toBe(400);
      expect(res.body.error).toBe(errorMessage);
    });

  test('Test #39 - Insert a task without a title', () => testTemplate({ title: null }, 'Title is required!'));
  test('Test #40 - Insert a task without a description', () => testTemplate({ description: null }, 'Description is required!'));
  test('Test #41 - Insert a task without a task list ID', () => testTemplate({ task_list_id: null }, 'Task List ID is required!'));
  test('Test #42 - Insert a task without a user assigned ID', () => testTemplate({ assigned_to: null }, 'User ID who the task was assigned is required!'));
  test('Test #43 - Insert a task without a status', () => testTemplate({ status: null }, 'Status is required!'));
  test('Test #44 - Insert a task without a due date', () => testTemplate({ due_date: null }, 'Due date is required!'));
});

test('Test #45 - Updating a task data', () => app.db('tasks')
  .insert({
    title: 'Login Implementation',
    description: 'Implement login functionality',
    task_list_id: taskList.id,
    assigned_to: user.id,
    status: 'Pending',
    due_date: '2024-11-05',
  }, ['id'])
  .then((taskRes) => request(app).put(`${route}/${taskRes[0].id}`)
    .set('Authorization', `bearer ${user.token}`)
    .send({
      title: 'Performance Upgrade',
      description: 'Upgrade the code to optimize performance',
      task_list_id: taskList.id,
      assigned_to: user.id,
      status: 'In Progress',
      due_date: '2024-11-20',
    }))
  .then((res) => {
    expect(res.status).toBe(200);
  }));

test('Test #46 - Deleting an task', async () => {
  const task = await app.db('tasks').insert({
    title: 'Login Implementation',
    description: 'Implement login functionality',
    task_list_id: taskList.id,
    assigned_to: user.id,
    status: 'Pending',
    due_date: '2024-11-05',
  }, ['id']);

  const res = await request(app).delete(`${route}/${task[0].id}`)
    .set('Authorization', `bearer ${user.token}`);

  expect(res.status).toBe(204);
});
