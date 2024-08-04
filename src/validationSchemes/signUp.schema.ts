import { checkSchema } from "express-validator";
import appDataSource from "../data-source";
import { User } from "../entities/user.entity";

const isNameInUse = async (name: string) => {
    const userRep = appDataSource.getRepository(User)

    return !!userRep.findOne({ where: { name } })
}

const isEmailInUse = async (email: string) => {
    const userRep = appDataSource.getRepository(User)

    return !!userRep.findOne({ where: { email } })
}

const signUpValidationSchema = checkSchema({
    name: {
        errorMessage: 'Invalid username',
        isLength: {
            errorMessage: 'Username must be at least 4 characters, but no longer than 16',
            options: {
                min: 4,
                max: 16,
            }
        },
        isString: true,
        custom: {
            options: async (value) => {
                if (!/[a-zA-Z]/.test(value)) {
                    throw new Error('Username must contain at least one letter');
                }
                if (await isNameInUse(value)) {
                    throw new Error('Name is already in use')
                }
            },
        },
    },
    email: {
        errorMessage: 'Invalid email',
        isEmail: true,
        custom: {
            options: async (value) => {
                if (await isEmailInUse(value)) {
                    throw new Error('Email is already in use')
                }
            }
        }
    },
    password: {
        errorMessage: 'Invalid password',
        isLength: {
            errorMessage: 'Password must be at least 8 characters but no longer than 16',
            options: {
                min: 8,
                max: 16
            }
        },
        custom: {
            options: (value) => /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]/.test(value),
            errorMessage: 'Password must contain letters and numbers'
        },
        isStrongPassword: {
            errorMessage: 'Password is not secure'
        }
    }
})

export default signUpValidationSchema;