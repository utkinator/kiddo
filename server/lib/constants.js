import moment from 'moment'

export const NODE_ENV = process.env.NODE_ENV || 'local'
export const CONTENT_REQUEST_TIMEOUT_MS = moment.duration(30, 'seconds').asMilliseconds()
export const SERVER_REQUEST_TIMEOUT_MS = moment.duration(10, 'minutes').asMilliseconds()
export const SERVICE_APP_PORT = parseInt(process.env.SERVICE_APP_PORT, 10) || 3000
export const SERVICE_ADMIN_PORT = parseInt(process.env.SERVICE_ADMIN_PORT, 10) || 3100
