import Router from 'koa-router'

import ctrl from '../controllers/users.js'
import auth from '../middleware/auth-required.js'
import roles from '../utils/jwt-roles.js'

const router = new Router()

router.post('/users/login', ctrl.login)
router.post('/users', ctrl.post)
router.get('/users', roles('admin'), ctrl.getUsers)

router.get('/user', auth, ctrl.get)
router.put('/user', auth, ctrl.put)

export default router.routes()
