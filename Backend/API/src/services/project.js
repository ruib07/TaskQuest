const ValidationError = require('../errors/validationError');

module.exports = (app) => {
  const findAll = () => app.db('projects');

  const findAllByFilter = (filter = {}) => app.db('projects').where(filter);

  const find = (filter = {}) => app.db('projects').where(filter).first();

  const save = (registerProject) => {
    if (!registerProject.name) throw new ValidationError('Name is required!');
    if (!registerProject.description) throw new ValidationError('Description is required!');
    if (!registerProject.deadline) throw new ValidationError('Deadline is required!');
    if (!registerProject.created_by) throw new ValidationError('Project creator ID is required!');

    return app.db('projects').insert(registerProject, '*');
  };

  const update = (id, projectRes) => app.db('projects')
    .where({ id })
    .update(projectRes, '*');

  const remove = (id) => app.db('projects')
    .where({ id })
    .del();

  return {
    findAll,
    findAllByFilter,
    find,
    save,
    update,
    remove,
  };
};
