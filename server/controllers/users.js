import { v4 as uuidv4 } from 'uuid'
import humps from 'humps'
import bcrypt from 'bcrypt'
import moment from 'moment'
import _ from 'lodash'

import { db } from '../lib/db.js'
import generateJWTforUser from '../utils/generate-jwt-for-user.js'
import { ValidationError } from '../lib/errors.js'

const get = async (ctx) => {
    const user = generateJWTforUser(ctx.state.user)

    ctx.body = { user }
}

const post = async (ctx) => {
    const { body } = ctx.request
    const opts = {
        abortEarly: false,
        context: {
            validatePassword: true
        }
    }

    let user = {
        ...body,
        id: uuidv4(),
        roles: 'user',
        active: 0
    }

    user = await ctx.app.schemas.user.validate(user, opts)

    user.password = await bcrypt.hash(user.password, 10)

    await db('users').insert(humps.decamelizeKeys(user))

    user = generateJWTforUser(user)

    ctx.body = { user: _.omit(user, ['password']) }
}

const put = async (ctx) => {
    const { body: fields = {} } = ctx.request
    const opts = {
        abortEarly: false,
        context: {
            validatePassword: false
        }
    }

    if (fields.password) {
        opts.context.validatePassword = true
    }

    let user = Object.assign({}, ctx.state.user, fields)
    user = await ctx.app.schemas.user.validate(user, opts)

    if (fields.password) {
        user.password = await bcrypt.hash(user.password, 10)
    }

    user.updatedAt = moment().format('YYYY-MM-DD HH:mm:ss')

    await db('users')
        .where({ id: user.id })
        .update(humps.decamelizeKeys(user))

    user = generateJWTforUser(user)

    ctx.body = { user: _.omit(user, ['password']) }
}

const login = async (ctx) => {
    const { body } = ctx.request

    ctx.assert(
        _.isObject(body) && body.email && body.password,
        422,
        new ValidationError(['malformed request'], '', 'email or password')
    )

    let user = await db('users')
        .first()
        .where({ email: body.email })

    ctx.assert(
        user,
        401,
        new ValidationError(['is invalid'], '', 'email or password')
    )

    const isValid = await bcrypt.compare(body.password, user.password)

    ctx.assert(
        isValid,
        401,
        new ValidationError(['is invalid'], '', 'email or password')
    )

    user = generateJWTforUser(user)

    ctx.body = { user: _.omit(user, ['password']) }
}

const getUsers = async (ctx) => {
    const users = await db('users')
    const filteredUsers = _.map(users, user => _.omit(user, ['password']))

    ctx.body = { users: filteredUsers }
}

const getUserById = async (ctx) => {
    const user = await db('users')
        .first()
        .where({ id: ctx.params.id })

    ctx.body = {
        user: _.omit(user, ['password'])
    }
}

const updateUserById = async (ctx) => {
    const { body: fields = {} } = ctx.request

    let data = Object.assign({}, fields)

    data = await ctx.app.schemas.user.validate(data, {})

    data.updatedAt = moment().format('YYYY-MM-DD HH:mm:ss')

    await db('users')
        .first()
        .where({ id: ctx.params.id })
        .update(humps.decamelizeKeys(data))

    const user = await db('users')
        .first()
        .where({ id: ctx.params.id })

    ctx.body = {
        user: _.omit(user, ['password'])
    }
}

const deleteUserById = async (ctx) => {
    const currentUser = ctx.state.user

    if (currentUser.id === ctx.params.id) {
        const err = new Error('Could not delete yourself')

        ctx.status = 403
        ctx.body = err.message

        return
    }

    await db('users')
        .first()
        .where({ id: ctx.params.id })
        .del()

    ctx.body = {}
}

export default {
    get,
    post,
    put,
    login,
    getUsers,
    getUserById,
    updateUserById,
    deleteUserById
}
