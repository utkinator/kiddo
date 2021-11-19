import Koa from 'koa'

function createApp () {
    const app = new Koa()

    app.use(async ctx => {
        ctx.body = 'Hello From Kiddo Server'
    })

    return app
}

export default createApp()
