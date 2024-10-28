const express = require('express');

module.exports = (app) => {
  const publicRouter = express.Router();
  const secureRouter = express.Router();

  publicRouter.use('/users', app.routes.users);
  publicRouter.use('/projects', app.routes.projects);
  publicRouter.use('/projectmembers', app.routes.projectmembers);
  publicRouter.use('/tasklists', app.routes.tasklists);
  publicRouter.use('/tasks', app.routes.tasks);
  publicRouter.use('/taskcomments', app.routes.taskcomments);
  publicRouter.use('/chatmessages', app.routes.chatmessages);
  publicRouter.use('/notifications', app.routes.notifications);
  publicRouter.use('/productivitymetrics', app.routes.productivitymetrics);

  app.use('/auth', app.routes.auths);

  app.use('/v1', publicRouter);
  app.use('/v1', app.config.passport.authenticate(), secureRouter);
};
