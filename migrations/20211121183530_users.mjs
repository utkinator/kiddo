export const up = async (knex) => {
    return knex.schema.createTable('users', table => {
        table.increments('id').primary()
        table.string('username')
        table.string('email')
        table.integer('role_id')
            .unsigned()
            .references('roles.id')
        table.datetime('createdAt').notNullable()
        table.datetime('updatedAt').notNullable()
    })
}

export const down = async (knex) => {
    return knex.schema.dropTable('users')
}
