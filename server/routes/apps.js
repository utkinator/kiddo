import path from 'path'

import Router from 'koa-router'
import koaBody from 'koa-body'

import ctrl from '../controllers/apps.js'
import roles from '../utils/jwt-roles.js'

const router = new Router()

// Upload application
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

// ## ADMIN AREA ##
// List all apps
router.get('/apps', roles(['admin', 'moderator']), ctrl.getApps)
// Get app by Hash
router.get('/apps/:hash', roles(['admin', 'moderator']), ctrl.getAppByHash)
// Delete app by Hash
router.delete('/apps/:hash', roles(['admin']), ctrl.deleteAppByHash)

export default router.routes()
