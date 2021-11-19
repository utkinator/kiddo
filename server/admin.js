import Koa from 'koa'

function createApp () {
    const app = new Koa()

    app.use(async ctx => {
        ctx.body = 'Hello From Kiddo Admin'
    })

    return app
}

export default createApp()
