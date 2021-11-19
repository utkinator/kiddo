import Koa from 'koa';

export default function createApp () {
    const app = new Koa();

    app.use(async ctx => {
        ctx.body = 'Hello From Kiddo Admin';
    });

    return app;
};