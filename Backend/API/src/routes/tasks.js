const express = require('express');

module.exports = (app) => {
  const router = express.Router();

  router.get('/', (req, res, next) => {
    app.services.task.findAll({ task_list_id: req.params.task_list_id })
      .then((result) => res.status(200).json(result))
      .catch((error) => next(error));
  });

  router.get('/:id', (req, res, next) => {
    app.services.task.find({ id: req.params.id })
      .then((result) => res.status(200).json(result))
      .catch((error) => next(error));
  });

  router.post('/', (req, res, next) => {
    app.services.task.save(req.body)
      .then((result) => res.status(201).json(result))
      .catch((error) => next(error));
  });

  router.put('/:id', (req, res, next) => {
    app.services.task.update(req.params.id, req.body)
      .then((result) => res.status(201).json(result))
      .catch((error) => next(error));
  });

  router.delete('/:id', (req, res, next) => {
    app.services.task.remove(req.params.id)
      .then(() => res.status(204).send())
      .catch((error) => next(error));
  });

  return router;
};
