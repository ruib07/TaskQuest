exports.up = async (knex) => {
  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');

  return knex.schema.createTable('project_members', (t) => {
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

    t.string('role', 50).notNull();
    t.timestamp('joined_at').defaultTo(knex.fn.now()).notNull();

    t.unique(['project_id', 'user_id']);
  });
};

exports.down = (knex) => knex.schema.dropTable('project_members');
