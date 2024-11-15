const ValidationError = require('../errors/validationError');

module.exports = (app) => {
  const findAll = (filter = {}) => app.db('notifications').where(filter);

  const save = (registerNotification) => {
    if (!registerNotification.user_id) throw new ValidationError('User ID is required!');
    if (!registerNotification.content) throw new ValidationError('Content is required!');
    if (registerNotification.read === undefined || registerNotification.read === null) {
      throw new ValidationError('Read notification is required!');
    }

    return app.db('notifications').insert(registerNotification, '*');
  };

  const update = (id, notificationRes) => app.db('notifications')
    .where({ id })
    .update({ read: true, ...notificationRes }, '*');

  const remove = (id) => app.db('notifications')
    .where({ id })
    .del();

  return {
    findAll,
    save,
    update,
    remove,
  };
};
