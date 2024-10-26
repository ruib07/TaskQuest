exports.up = async (knex) => {
  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');

  return knex.schema.createTable('tasks', (t) => {
    t.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
    t.string('title', 100).notNull();
    t.string('description').notNull();
    t.uuid('task_list_id')
      .references('id')
      .inTable('task_lists')
      .onDelete('CASCADE')
      .notNull();

    t.uuid('assigned_to')
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
      .notNull();

    t.string('status', 50).notNull();
    t.date('due_date').notNull();
    t.timestamp('created_at').defaultTo(knex.fn.now()).notNull();

    t.index('task_list_id');
  });
};

exports.down = (knex) => knex.schema.dropTable('tasks');
