const express = require('express');

module.exports = (app) => {
  const router = express.Router();

  router.get('/', (req, res, next) => {
    app.services.project.findAll()
      .then((result) => res.status(200).json(result))
      .catch((error) => next(error));
  });

  router.get('/:created_by', (req, res, next) => {
    app.services.project.findAllByFilter({ created_by: req.params.created_by })
      .then((result) => res.status(200).json(result))
      .catch((error) => next(error));
  });

  router.get('/byId/:id', (req, res, next) => {
    app.services.project.find({ id: req.params.id })
      .then((result) => res.status(200).json(result))
      .catch((error) => next(error));
  });

  router.post('/', (req, res, next) => {
    app.services.project.save(req.body)
      .then((result) => res.status(201).json(result))
      .catch((error) => next(error));
  });

  router.put('/:id', (req, res, next) => {
    app.services.project.update(req.params.id, req.body)
      .then((result) => res.status(200).json(result[0]))
      .catch((error) => next(error));
  });

  router.delete('/:id', (req, res, next) => {
    app.services.project.remove(req.params.id)
      .then(() => res.status(204).send())
      .catch((error) => next(error));
  });

  return router;
};
