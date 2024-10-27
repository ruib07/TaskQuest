const ValidationError = require('../errors/validationError');

module.exports = (app) => {
  const findAll = (filter = {}) => app.db('task_comments').where(filter);

  const save = (registerTaskComment) => {
    if (!registerTaskComment.task_id) throw new ValidationError('Task ID is required!');
    if (!registerTaskComment.user_id) throw new ValidationError('User ID is required!');
    if (!registerTaskComment.content) throw new ValidationError('Content is required!');

    return app.db('task_comments').insert(registerTaskComment, '*');
  };

  const remove = (id) => app.db('task_comments')
    .where({ id })
    .del();

  return {
    findAll,
    save,
    remove,
  };
};
