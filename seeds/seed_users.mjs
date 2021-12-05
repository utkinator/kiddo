export const seed = async (knex) => {
    await knex('users').del()

    await knex('users').insert([
        {
            id: '37659297-3645-44b1-b994-ba92bc95615e',
            username: 'Vitaliy Utkin',
            email: 'v@v.com',
            password: '$2b$10$v7w.PC4lr/9lHZY4Qh.6S.w38NjDQX4PkeXpl.GoAr/9BmVB0/YjC',
            roles: 'admin',
            active: true
        },
        {
            id: '0d139e90-4bb3-4888-a7ec-c318668b10e8',
            username: 'Boris',
            email: 'b@b.com',
            password: '$2b$10$v7w.PC4lr/9lHZY4Qh.6S.w38NjDQX4PkeXpl.GoAr/9BmVB0/YjC',
            roles: 'user',
            active: true
        },
        {
            id: 'd2977ba7-9e8d-4bf8-84a0-00c624d43f17',
            username: 'Denis',
            email: 'd@d.com',
            password: '$2b$10$v7w.PC4lr/9lHZY4Qh.6S.w38NjDQX4PkeXpl.GoAr/9BmVB0/YjC',
            roles: 'user,moderator',
            active: true
        }
    ])
}
