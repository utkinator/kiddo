import yup from 'yup'
import isHash from 'validator/lib/isHash.js'

const appSchema = yup
    .object()
    .shape({
        hash: yup
            .string()
            .required()
            .trim()
            .test({
                name: 'hash',
                message: "${path} must be sha1 hash", // eslint-disable-line
                test: value => isHash(value, 'sha1')
            }),

        code: yup
            .string()
            .required()
            .lowercase()
            .trim(),

        version: yup
            .string()
            .required()
            .lowercase()
            .trim()
    })
    .noUnknown()

export default appSchema
