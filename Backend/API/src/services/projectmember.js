const ValidationError = require('../errors/validationError');

module.exports = (app) => {
  const findAll = () => app.db('project_members');

  const save = (registerProjectMember) => {
    if (!registerProjectMember.project_id) throw new ValidationError('Project ID is required!');
    if (!registerProjectMember.user_id) throw new ValidationError('User ID is required!');
    if (!registerProjectMember.role) throw new ValidationError('Role is required!');

    return app.db('project_members').insert(registerProjectMember, '*');
  };

  const update = (id, projectMemberRes) => app.db('project_members')
    .where({ id })
    .update(projectMemberRes, '*');

  const remove = (id) => app.db('project_members')
    .where({ id })
    .del();

  return {
    findAll,
    save,
    update,
    remove,
  };
};
