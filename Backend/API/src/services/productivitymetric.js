module.exports = (app) => {
  const findAll = (filter = {}) => app.db('productivity_metrics').where(filter);

  return {
    findAll,
  };
};
