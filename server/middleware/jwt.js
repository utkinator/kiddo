import koaJwt from 'koa-jwt'
import config from 'config'

export default koaJwt({
    getToken (ctx, opts) {
        const { authorization } = ctx.header

        if (authorization && authorization.split(' ')[0] === 'Bearer') {
            return authorization.split(' ')[1]
        }

        return null
    },
    secret: config.get('secret'),
    passthrough: true,
    key: 'jwt'
})
