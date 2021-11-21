export const seed = async (knex) => {
    await knex('roles').del()

    await knex('roles').insert([
        { role_name: 'admin' },
        { role_name: 'user' },
        { role_name: 'moderator' }
    ])
}
