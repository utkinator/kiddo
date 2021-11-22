import Router from 'koa-router'

import users from './users.js'

const router = new Router()
const api = new Router()

api.use(users)

router.use('/api', api.routes())

export default router
