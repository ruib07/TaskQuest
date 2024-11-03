const express = require('express');

module.exports = (app) => {
  const publicRouter = express.Router();
  const secureRouter = express.Router();

  app.use('/auth', app.routes.auths);

  publicRouter.use('/userRegistrations', app.routes.userRegistrations);

  secureRouter.use('/users', app.routes.users);
  secureRouter.use('/projects', app.routes.projects);
  secureRouter.use('/projectmembers', app.routes.projectmembers);
  secureRouter.use('/tasklists', app.routes.tasklists);
  secureRouter.use('/tasks', app.routes.tasks);
  secureRouter.use('/taskcomments', app.routes.taskcomments);
  secureRouter.use('/chatmessages', app.routes.chatmessages);
  secureRouter.use('/notifications', app.routes.notifications);
  secureRouter.use('/productivitymetrics', app.routes.productivitymetrics);

  app.use('/v1', publicRouter);
  app.use('/v1', app.config.passport.authenticate(), secureRouter);
};
