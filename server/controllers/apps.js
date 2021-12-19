import fs from 'fs'
import os from 'os'
import path from 'path'
import tar from 'tar'
import humps from 'humps'

import { db } from '../lib/db.js'

const post = async (ctx) => {
    const { body } = ctx.request
    const {
        code,
        version,
        hash
    } = body

    try {
        const appUnpackedDir = path.join('./public/apps', hash)

        const file = ctx.request.files.file
        const reader = fs.createReadStream(file.path)
        const stream = fs.createWriteStream(path.join(os.tmpdir(), Math.random().toString()))

        reader.pipe(stream)

        if (!fs.existsSync(appUnpackedDir)) {
            fs.mkdirSync(appUnpackedDir)
        }

        await tar.x(
            {
                file: path.join(file.path),
                strip: 5,
                C: appUnpackedDir
            }
        )

        fs.unlink(file.path, _ => {})

        let app = {
            code,
            version,
            hash
        }

        app = await ctx.app.schemas.app.validate(app)

        await db('apps').insert(humps.decamelizeKeys(app))

        ctx.body = { app: app }
    } catch (error) {
        ctx.throw(`Error happened while uploading '${code}:${version} application', ${error}`)
    }
}

export default {
    post
}
