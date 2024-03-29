import Koa from 'koa'
import helmet from 'koa-helmet'
import bodyParser from 'koa-bodyparser'
import serve from 'koa-static'
import koaCompress from 'koa-compress'
import cors from 'kcors'
import { constants } from 'zlib'

import schemas from './schemas/index.js'

import jwt from './middleware/jwt.js'
import camelizeMiddleware from './middleware/camelize.js'
import userMiddleware from './middleware/user.js'

import routes from './routes/index.js'

function createApp () {
    const app = new Koa()

    schemas(app)

    app.use(koaCompress({
        gzip: {
            flush: constants.Z_SYNC_FLUSH
        },
        deflate: {
            flush: constants.Z_SYNC_FLUSH
        },
        br: false
    }))
    app.use(helmet())
    app.use(serve('dist/admin'))
    app.use(serve('public/apps'))
    app.use(
        cors({
            origin: '*',
            exposeHeaders: ['Authorization'],
            credentials: true,
            allowMethods: ['GET', 'PUT', 'POST', 'DELETE'],
            allowHeaders: ['Authorization', 'Content-Type'],
            keepHeadersOnError: true
        })
    )

    app.use(camelizeMiddleware)
    app.use(jwt)
    app.use(
        bodyParser({
            enableTypes: ['json', 'form', 'text'],
            jsonLimit: '2mb'
        })
    )
    app.use(userMiddleware)
    app.use(routes.routes())
    app.use(routes.allowedMethods())

    // app.use(async (ctx, next) => {
    //     ctx.redirect('/')

    //     await next()
    // })

    return app
}

export default createApp()
