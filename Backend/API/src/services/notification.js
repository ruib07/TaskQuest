module.exports = (app) => {
  const findAll = (filter = {}) => app.db('notifications').where(filter);

  const update = (id, notificationRes) => app.db('notifications')
    .where({ id })
    .update({ read: true, ...notificationRes }, '*');

  const remove = (id) => app.db('notifications')
    .where({ id })
    .del();

  return {
    findAll,
    update,
    remove,
  };
};
