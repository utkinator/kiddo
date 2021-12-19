import user from './user.js'
import app from './app.js'

export default (koaApp) => {
    koaApp.schemas = {
        user,
        app
    }
}
