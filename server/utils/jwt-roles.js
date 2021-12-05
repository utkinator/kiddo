import { AuthorizationError, AuthenticationError } from '../lib/errors.js'

const jwtRoles = (roles = []) => {
    return async function (ctx, next) {
        ctx.assert(ctx.state.user, new AuthenticationError())

        const userRoles = ctx.state.user.roles.split(',') || []
        const foundRoles = roles.filter(role => userRoles.some(userRole => userRole === role))

        if (!foundRoles.length) {
            ctx.throw(new AuthorizationError())
        }

        await next()
    }
}

export default jwtRoles
