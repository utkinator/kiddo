import { AuthorizationError } from '../lib/errors.js'

const jwtRoles = roles => {
    return async function (ctx, next) {
        if (typeof roles === 'string') {
            roles = [roles]
        }

        if (!ctx.state || !ctx.state.user) {
            await next()

            return
        }

        const userRoles = ctx.state.user.roles.split(',') || []
        const foundRoles = roles.filter(role => userRoles.some(userRole => userRole === role))

        if (!foundRoles.length) {
            ctx.throw(new AuthorizationError())
        }

        await next()
    }
}

export default jwtRoles
