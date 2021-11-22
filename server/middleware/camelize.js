import _ from 'lodash'
import humps from 'humps'

export default async (ctx, next) => {
    await next()

    if (ctx.body && _.isObjectLike(ctx.body)) {
        ctx.body = humps.camelizeKeys(ctx.body)
    }
}
