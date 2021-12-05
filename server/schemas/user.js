import yup from 'yup'
import isUUID from 'validator/lib/isUUID.js'

const userSchema = yup
    .object()
    .shape({
        id: yup.string().test({
            name: 'id',
            message: "${path} must be uuid", // eslint-disable-line
            test: value => (value ? isUUID(value, 4) : true)
        }),

        email: yup
            .string()
            .required()
            .email()
            .lowercase()
            .trim(),

        password: yup.string().when('$validatePassword', {
            is: true,
            then: yup
                .string()
                .required()
                .min(8)
                .max(30)
        }),

        username: yup
            .string()
            .required()
            .max(30)
            .default('')
            .trim(),

        roles: yup
            .string()
            .required()
            .lowercase()
            .trim(),

        active: yup
            .bool()
            .required()
    })
    .noUnknown()

export default userSchema
