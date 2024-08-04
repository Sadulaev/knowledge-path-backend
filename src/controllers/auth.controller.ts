import appDataSource from "../data-source";
import { User } from "../entities/user.entity";
import { UserSessionData, UserSignUpType } from "../types/user";
import jwt from 'jsonwebtoken';
import argon2 from 'argon2';
import { AuthData } from "../entities/auth.entity";

export class AuthController {

    async signUp(userInfo: UserSignUpType, userSession: UserSessionData) {
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

            await authRep.save(newAuth);
        } catch (err) {
            console.log(err)
        }
    }
}