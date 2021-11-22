const setupMysql = opts => ({
    client: 'mysql2',
    version: '5.7',
    migrations: {
        directory: './migrations',
        loadExtensions: ['.mjs']
    },
    seeds: {
        directory: './seeds',
        loadExtensions: ['.mjs']
    },
    connection: {
        host: process.env.DB_HOST,
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT,
        database: process.env.DB_NAME,
        charset: 'utf8',
        timezone: 'UTC'
    },
    pool: {
        afterCreate: (connection, done) => {
            connection.query('set session sql_mode="TRADITIONAL";', err => {
                done(err, connection)
            })
        }
    },
    debug: false,
    ...opts
})

export default {
    development: setupMysql({
        connection: {
            host: process.env.DB_HOST || 'localhost',
            user: process.env.DB_USERNAME || 'root',
            password: process.env.DB_PASSWORD || 'poseur',
            port: process.env.DB_PORT || '3306',
            database: 'kiddo'
        }
    })
}
