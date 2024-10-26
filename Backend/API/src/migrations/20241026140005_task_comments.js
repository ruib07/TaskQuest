exports.up = async (knex) => {
  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');

  return knex.schema.createTable('task_comments', (t) => {
    t.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
    t.uuid('task_id')
      .references('id')
      .inTable('tasks')
      .onDelete('CASCADE')
      .notNull();

    t.uuid('user_id')
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
      .notNull();

    t.string('content').notNull();
    t.timestamp('created_at').defaultTo(knex.fn.now()).notNull();

    t.index('task_id');
    t.index('user_id');
  });
};

exports.down = (knex) => knex.schema.dropTable('task_comments');
