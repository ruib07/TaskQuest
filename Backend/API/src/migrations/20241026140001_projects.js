exports.up = async (knex) => {
  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');

  return knex.schema.createTable('projects', (t) => {
    t.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
    t.string('name', 100).notNull();
    t.string('description').notNull();
    t.date('deadline').notNull();
    t.timestamp('created_at').defaultTo(knex.fn.now()).notNull();

    t.uuid('created_by')
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
      .notNull();

    t.index('created_by');
  });
};

exports.down = (knex) => knex.schema.dropTable('projects');
