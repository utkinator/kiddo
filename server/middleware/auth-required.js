import { AuthenticationError } from '../lib/errors.js'

export default (ctx, next) => {
    ctx.assert(ctx.state.user, new AuthenticationError())

    return next()
}
