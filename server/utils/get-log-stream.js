import tee from 'pino-tee'
import fs from 'fs'
import path from 'path'
import stream from 'stream'

export const getLogStream = name => {
    const logStream = tee(new stream.PassThrough())

    if (process.env.LOG_DIRECTORY) {
        logStream.tee(
            fs.createWriteStream(path.resolve(process.env.LOG_DIRECTORY, `${name}.log`)),
            line => line.level >= 30
        )
    }

    logStream.pipe(process.stdout)

    return logStream
}
