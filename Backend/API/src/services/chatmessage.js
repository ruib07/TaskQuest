const ValidationError = require('../errors/validationError');

module.exports = (app) => {
  const findAll = (filter = {}) => app.db('chat_messages').where(filter);

  const save = (registerChatMessage) => {
    if (!registerChatMessage.project_id) throw new ValidationError('Project ID is required!');
    if (!registerChatMessage.sender_id) throw new ValidationError('Sender ID is required!');
    if (!registerChatMessage.content) throw new ValidationError('Content is required!');

    return app.db('chat_messages').insert(registerChatMessage, '*');
  };

  return {
    findAll,
    save,
  };
};
