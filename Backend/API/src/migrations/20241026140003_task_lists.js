exports.up = async (knex) => {
  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');

  return knex.schema.createTable('task_lists', (t) => {
    t.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
    t.uuid('project_id')
      .references('id')
      .inTable('projects')
      .onDelete('CASCADE')
      .notNull();

    t.string('name', 100).notNull();
    t.timestamp('created_at').defaultTo(knex.fn.now()).notNull();

    t.index('project_id');
  });
};

exports.down = (knex) => knex.schema.dropTable('task_lists');
