import http from 'http'
import { pino } from 'pino'
import { createTerminus } from '@godaddy/terminus'
import { readFile } from 'fs/promises'

import {
    SERVER_REQUEST_TIMEOUT_MS
} from '../lib/constants.js'

import { getLogStream } from './get-log-stream.js'

export const startServer = (name, app, { port } = {}) => {
    const server = http.createServer(app.callback())

    const logger = pino({}, getLogStream(name))

    app.server = createTerminus(server, {
        signals: ['SIGTERM', 'SIGINT'],
        timeout: SERVER_REQUEST_TIMEOUT_MS,
        healthChecks: {
            '/status': healthCheck
        },
        beforeShutdown: () => logger.info(`Starting shutdown of ${name}`),
        onShutdown: () => logger.info(`Shutdown ${name}`),
        logger: logger.error.bind(logger)
    })

    app.server.listen(port)

    app.server.setTimeout(SERVER_REQUEST_TIMEOUT_MS)

    app.server.on('error', error => {
        if (error.syscall !== 'listen') {
            throw error
        }

        const bind = Number.isInteger(port) ? `Port ${port}` : `Pipe ${port}`

        if (error.code === 'EACCESS') {
            logger.error(`${name}: ${bind} requires elevated privileges`)
        } else if (error.code === 'EADDRINUSE') {
            logger.error(`${name}: ${bind} is already in use`)
        }

        throw error
    })

    app.server.on('listening', () => {
        const addr = app.server.address()
        const bind = addr.port ? `Port ${addr.port}` : `Pipe ${addr}`

        logger.info(`${name}: listening on ${bind}`)
    })

    return app.server
}

const healthCheck = async () => {
    const pkgJson = JSON.parse(
        await readFile(
            new URL('../../package.json', import.meta.url)
        )
    )

    return {
        name: pkgJson.name,
        version: pkgJson.version
    }
}
