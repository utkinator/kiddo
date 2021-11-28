import Koa from 'koa'
import serve from 'koa-static'

function createApp () {
    const app = new Koa()

    app.use(serve('dist/kiddo'))

    return app
}

export default createApp()
