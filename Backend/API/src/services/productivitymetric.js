const ValidationError = require('../errors/validationError');

module.exports = (app) => {
  const findAll = (filter = {}) => app.db('productivity_metrics').where(filter);

  const save = (registerProductivityMetric) => {
    if (!registerProductivityMetric.project_id) throw new ValidationError('Project ID is required!');
    if (!registerProductivityMetric.user_id) throw new ValidationError('User ID is required!');
    if (!registerProductivityMetric.tasks_completed) throw new ValidationError('Completed tasks are required!');

    return app.db('productivity_metrics').insert(registerProductivityMetric, '*');
  };

  const update = (id, productivityMetricRes) => app.db('productivity_metrics')
    .where({ id })
    .update(productivityMetricRes, '*');

  return {
    findAll,
    save,
    update,
  };
};
