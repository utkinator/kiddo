export const up = async (knex) => {
    return knex.schema.createTable('users', table => {
        table.uuid('id').primary()
        table.string('username')
        table.string('email').unique()
        table.string('password')
        table.string('roles', 45)
            .notNullable()
            .defaultTo('user')
        table.boolean('active').defaultTo(false)
        table.timestamps(false, true)
    })
}

export const down = async (knex) => {
    return knex.schema.dropTable('users')
}
