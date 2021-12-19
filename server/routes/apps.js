import path from 'path'

import Router from 'koa-router'
import koaBody from 'koa-body'

import ctrl from '../controllers/apps.js'

const router = new Router()

router.post(
    '/apps/upload',
    koaBody({
        multipart: true,
        formidable: {
            uploadDir: path.join('./public/apps'),
            keepExtensions: true
        }
    }),
    ctrl.post
)

export default router.routes()
