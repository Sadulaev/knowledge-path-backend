import { checkSchema } from "express-validator";
import appDataSource from "../data-source";
import { User } from "../entities/user.entity";

const isNameInUse = async (name: string) => {
    const userRep = appDataSource.getRepository(User);

    const userUsingSameName = await userRep.findOne({ where: { name } });

    return !!userUsingSameName;
}

const isEmailInUse = async (email: string) => {
    const userRep = appDataSource.getRepository(User)

    const userUsingSameEmail = await userRep.findOne({ where: { email } })

    return !!userUsingSameEmail;
}

const signUpValidationSchema = checkSchema({
    name: {
        in: ['body'],
        errorMessage: 'Invalid username',
        exists: {
            errorMessage: 'Name field is empty',
            options: { values: 'undefined' },
            bail: true
        },
        isString: {
            bail: true,
        },
        isLength: {
            errorMessage: 'Username must be at least 4 characters, but no longer than 16',
            options: {
                min: 4,
                max: 16,
            },
            bail: true
        },
        custom: {
            options: async (value) => {
                if (!/[a-zA-Z]/.test(value)) {
                    throw new Error('Username must contain at least one letter');
                }
                if (await isNameInUse(value)) {
                    throw new Error('Name is already in use')
                }
            },
            bail: true,
        },
    },
    email: {
        in: ['body'],
        errorMessage: 'Invalid email',
        exists: {
            errorMessage: 'Email field is empty',
            options: { values: 'undefined' },
            bail: true
        },
        isEmail: {
            errorMessage: 'Wrong email format',
            bail: true
        },
        custom: {
            options: async (value) => {
                if (await isEmailInUse(value)) {
                    throw new Error('Email is already in use')
                }
            },
            bail: true
        }
    },
    password: {
        in: ['body'],
        errorMessage: 'Invalid password',
        exists: {
            errorMessage: 'Password field is empty',
            options: { values: 'undefined' },
            bail: true
        },
        isString: {
            bail: true
        },
        // isStrongPassword: {
        //     errorMessage: 'Password is not secure',
        //     bail: true,
        // },
        isLength: {
            errorMessage: 'Password must be at least 8 characters but no longer than 16',
            options: {
                min: 8,
                max: 16
            },
            bail: true
        },
        custom: {
            options: (value) => /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]/.test(value),
            errorMessage: 'Password must contain letters and numbers',
            bail: true
        },
    }
})

export default signUpValidationSchema;