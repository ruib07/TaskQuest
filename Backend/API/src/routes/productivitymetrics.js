const express = require('express');

module.exports = (app) => {
  const router = express.Router();

  router.get('/projects/:project_id', (req, res, next) => {
    app.services.productivitymetric.findAll({ project_id: req.params.project_id })
      .then((result) => res.status(200).json(result))
      .catch((error) => next(error));
  });

  router.get('/users/:user_id', (req, res, next) => {
    app.services.productivitymetric.findAll({ user_id: req.params.user_id })
      .then((result) => res.status(200).json(result))
      .catch((error) => next(error));
  });

  return router;
};
