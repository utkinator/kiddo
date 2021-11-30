import Router from 'koa-router'

import ctrl from '../controllers/users.js'
import auth from '../middleware/auth-required.js'
import roles from '../utils/jwt-roles.js'

const router = new Router()

// Login user [any]
router.post('/user/login', ctrl.login)
// Register new user [any]
router.post('/user', ctrl.post)
// Get authenticated user info
router.get('/user', auth, ctrl.get)
// Update authenticated user
router.put('/user', auth, ctrl.put)

// ## ADMIN AREA ##
// List all users
router.get('/users', roles('admin'), ctrl.getUsers)

export default router.routes()
