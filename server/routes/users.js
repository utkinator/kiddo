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
router.get('/users', roles(['admin', 'moderator']), ctrl.getUsers)
// Get user by ID
router.get('/users/:id', roles(['admin', 'moderator']), ctrl.getUserById)
// Update user by ID
router.put('/users/:id', roles(['admin']), ctrl.updateUserById)
// Delete user by ID
router.delete('/users/:id', roles(['admin']), ctrl.deleteUserById)

export default router.routes()
