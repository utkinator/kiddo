import Router from 'koa-router'

import users from './users.js'
import apps from './apps.js'

const router = new Router()
const api = new Router()

api.use(users)
api.use(apps)

router.use('/api', api.routes())

export default router
