import appDataSource from "../data-source";
import { User } from "../entities/user.entity";
import { UserAuthType, UserSessionDataType, UserSignUpType } from "../types/user";
import jwt from 'jsonwebtoken';
import argon2 from 'argon2';
import { AuthData } from "../entities/auth.entity";

export class AuthController {

    async signUp(userInfo: UserSignUpType, userSession: UserSessionDataType) {
        try {
            const userRep = appDataSource.getRepository(User);
            const authRep = appDataSource.getRepository(AuthData)

            // Saving user's data in db
            const newUser = new User();
            newUser.name = userInfo.name;
            newUser.email = userInfo.email;
            newUser.password = await argon2.hash(userInfo.password);
            newUser.type = 'logged';
            newUser.isFirstEntrance = true;
            const savedUser = await userRep.save(newUser)

            // Creating jwt to sign in after signing up
            const secretKey = process.env.JWT_SECRET as string;
            const newToken = jwt.sign({ email: userInfo.email }, secretKey, { expiresIn: '24h' })

            // Saving user's token and session info in db
            const newAuth = new AuthData();
            newAuth.userId = savedUser.id;
            newAuth.token = newToken;
            newAuth.device = userSession.device;
            newAuth.ip = userSession.ip;

            const resultAuthRecord = await authRep.save(newAuth);

            return { token: resultAuthRecord.token }
        } catch (err) {
            const error = err as { message: string }
            throw new Error(error?.message)
        }
    }

    async signIn(userInfo: UserAuthType, userSession: UserSessionDataType) {
        try {
            const userRep = appDataSource.getRepository(User);
            const authDataRep = appDataSource.getRepository(AuthData);

            const userByEmail = await userRep.findOne({ where: { email: userInfo.email } });
            if (!userByEmail) {
                throw new Error('Invalid email or password')
            } else {
                const isPasswordCorrect = await argon2.verify(userByEmail.password, userInfo.password)

                if (!isPasswordCorrect) {
                    throw new Error('Invalid email or password')
                } else {
                    await authDataRep.delete({ device: userSession.device, ip: userSession.ip })

                    // Creating jwt to sign in after signing up
                    const secretKey = process.env.JWT_SECRET as string;
                    const newToken = jwt.sign({ email: userByEmail.email }, secretKey, { expiresIn: '24h' })

                    const newAuthData = new AuthData();
                    newAuthData.userId = userByEmail.id;
                    newAuthData.token = newToken;
                    newAuthData.device = userSession.device;
                    newAuthData.ip = userSession.ip;

                    const newRecord = await authDataRep.save(newAuthData)
                    return { token: newRecord.token }
                }
            }
        } catch (err) {
            const error = err as { message: string }
            throw new Error(`${error?.message}`)
        }
    }
}