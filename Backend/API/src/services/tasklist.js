const ValidationError = require('../errors/validationError');

module.exports = (app) => {
  const findAll = (filter = {}) => app.db('task_lists').where(filter);

  const save = (registerTaskList) => {
    if (!registerTaskList.project_id) throw new ValidationError('Project ID is required!');
    if (!registerTaskList.name) throw new ValidationError('Name is required!');

    return app.db('task_lists').insert(registerTaskList, '*');
  };

  const update = (id, taskListRes) => app.db('task_lists')
    .where({ id })
    .update(taskListRes, '*');

  const remove = (id) => app.db('task_lists')
    .where({ id })
    .del();

  return {
    findAll,
    save,
    update,
    remove,
  };
};
