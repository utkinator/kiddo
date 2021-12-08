import Router from 'koa-router'

import users from './users.js'
import assets from './assets.js'

const router = new Router()
const api = new Router()

api.use(users)
api.use(assets)

router.use('/api', api.routes())

export default router
