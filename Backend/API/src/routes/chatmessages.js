const express = require('express');

module.exports = (app) => {
  const router = express.Router();

  router.get('/:project_id', (req, res, next) => {
    app.services.chatmessage.findAll({ project_id: req.params.project_id })
      .then((result) => res.status(200).json(result))
      .catch((error) => next(error));
  });

  router.post('/', (req, res, next) => {
    app.services.chatmessage.save(req.body)
      .then((result) => res.status(201).json(result))
      .catch((error) => next(error));
  });

  return router;
};
