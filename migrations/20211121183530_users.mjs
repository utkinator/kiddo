export const up = async (knex) => {
    return knex.schema.createTable('users', table => {
        table.uuid('id').primary()
        table.string('username')
        table.string('email').unique()
        table.string('password')
        table.integer('role_id')
            .unsigned()
            .references('roles.id')
        table.timestamps(false, true)
    })
}

export const down = async (knex) => {
    return knex.schema.dropTable('users')
}
