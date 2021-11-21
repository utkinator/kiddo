export const up = async (knex) => {
    return knex.schema.createTable('roles', table => {
        table.increments('id').primary()
        table.string('role_name', 45).notNullable()
    })
}

export const down = async (knex) => {
    return knex.schema.dropTable('roles')
}
