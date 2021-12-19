export const up = async (knex) => {
    return knex.schema.createTable('apps', table => {
        table.string('hash').primary()
        table.string('code').notNullable()
        table.string('version').notNullable()
        table.timestamps(false, true)
    })
}

export const down = async (knex) => {
    return knex.schema.dropTable('apps')
}
