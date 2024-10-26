exports.up = async (knex) => {
  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');

  return knex.schema.createTable('productivity_metrics', (t) => {
    t.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
    t.uuid('project_id')
      .references('id')
      .inTable('projects')
      .onDelete('CASCADE')
      .notNull();

    t.uuid('user_id')
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
      .notNull();

    t.integer('tasks_completed').notNull();
    t.timestamp('last_updated').defaultTo(knex.fn.now()).notNull();

    t.index('project_id');
    t.index('user_id');
  });
};

exports.down = (knex) => knex.schema.dropTable('productivity_metrics');
