exports.up = async (knex) => {
  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');

  return knex.schema.createTable('chat_messages', (t) => {
    t.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
    t.uuid('project_id')
      .references('id')
      .inTable('projects')
      .onDelete('CASCADE')
      .notNull();

    t.uuid('sender_id')
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
      .notNull();

    t.string('content').notNull();
    t.timestamp('sent_at').defaultTo(knex.fn.now()).notNull();

    t.index('project_id');
    t.index('sender_id');
  });
};

exports.down = (knex) => knex.schema.dropTable('chat_messages');
