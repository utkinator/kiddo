import config from 'config'
import jwt from 'jsonwebtoken'
import _ from 'lodash'

const generateJWTforUser = (user = {}) => {
    return Object.assign({}, user, {
        token: jwt.sign(
            {
                sub: _.pick(user, ['id', 'username', 'email']),
                role: _.pick(user, ['roles'])
            },
            config.get('secret'),
            {
                expiresIn: '1d'
            }
        )
    })
}

export default generateJWTforUser
