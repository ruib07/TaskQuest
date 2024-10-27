const ValidationError = require('../errors/validationError');

module.exports = (app) => {
  const findAll = (filter = {}) => app.db('tasks').where(filter);

  const find = (filter = {}) => app.db('tasks').where(filter).first();

  const save = (registerTask) => {
    if (!registerTask.title) throw new ValidationError('Title is required!');
    if (!registerTask.description) throw new ValidationError('Description is required!');
    if (!registerTask.task_list_id) throw new ValidationError('Task List ID is required!');
    if (!registerTask.assigned_to) throw new ValidationError('User ID who the task was assigned is required!');
    if (!registerTask.status) throw new ValidationError('Status is required!');
    if (!registerTask.due_date) throw new ValidationError('Due date is required!');

    return app.db('tasks').insert(registerTask, '*');
  };

  const update = (id, taskRes) => app.db('tasks')
    .where({ id })
    .update(taskRes, '*');

  const remove = (id) => app.db('tasks')
    .where({ id })
    .del();

  return {
    findAll,
    find,
    save,
    update,
    remove,
  };
};
