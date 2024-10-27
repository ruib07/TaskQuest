const express = require('express');

module.exports = (app) => {
  const publicRouter = express.Router();
  const secureRouter = express.Router();

  publicRouter.use('/users', app.routes.users);
  publicRouter.use('/projects', app.routes.projects);
  publicRouter.use('/projectmembers', app.routes.projectmembers);

  app.use('/auth', app.routes.auths);

  app.use('/v1', publicRouter);
  app.use('/v1', app.config.passport.authenticate(), secureRouter);
};
