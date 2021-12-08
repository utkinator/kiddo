import fs from 'fs'
import os from 'os'
import path from 'path'
import tar from 'tar'
import checksum from 'checksum'

import { db } from '../lib/db.js'

const post = async (ctx) => {
    const file = ctx.request.files.file
    const reader = fs.createReadStream(file.path)
    const stream = fs.createWriteStream(path.join(os.tmpdir(), Math.random().toString()))

    reader.pipe(stream)

    const hash = checksum(file.name)
    const appUnpackedDir = path.join('./public/apps', hash)

    if (!fs.existsSync(appUnpackedDir)) {
        fs.mkdirSync(appUnpackedDir)
    }

    await tar.x(
        {
            file: path.join(file.path),
            strip: 4,
            C: appUnpackedDir
        }
    )

    fs.unlink(file.path, () => {
        console.log('file was deleted')
    })

    ctx.body = {}
}

export default {
    post
}
