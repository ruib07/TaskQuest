const express = require('express');

module.exports = (app) => {
  const router = express.Router();

  router.get('/:user_id', (req, res, next) => {
    app.services.notification.findAll({ user_id: req.params.user_id })
      .then((result) => res.status(200).json(result))
      .catch((error) => next(error));
  });

  router.post('/', (req, res, next) => {
    app.services.notification.save(req.body)
      .then((result) => res.status(201).json(result))
      .catch((error) => next(error));
  });

  router.put('/:id', (req, res, next) => {
    app.services.notification.update(req.params.id, req.body)
      .then((result) => res.status(200).json(result[0]))
      .catch((error) => next(error));
  });

  router.delete('/:id', (req, res, next) => {
    app.services.notification.remove(req.params.id)
      .then(() => res.status(204).send())
      .catch((error) => next(error));
  });

  return router;
};
