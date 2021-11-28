import _ from 'lodash'
import { db } from '../lib/db.js'

export default async (ctx, next) => {
    if (_.has(ctx, 'state.jwt.sub.id')) {
        ctx.state.user = await db('users')
            .first(
                'id',
                'email',
                'username',
                'created_at',
                'updated_at',
                'roles'
            )
            .where({ id: ctx.state.jwt.sub.id })
    }

    return next()
}
