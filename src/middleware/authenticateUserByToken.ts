import { Request } from "express";
import jwt from 'jsonwebtoken';
import appDataSource from "../data-source";
import { AuthData } from "../entities/auth.entity";
import { User } from "entities/user.entity";

export default async (req: Request, res: Response, next: () => void) => {
    const isBearer = !!(req.headers.authorization?.split(' ')[0] === 'Bearer')
    const token = req.headers.authorization?.split(' ')[1];
    const jwtSecret = process.env.JWT_SECRET as string;

    if (isBearer && token?.length) {
        const authRep = appDataSource.getRepository(AuthData);
        const userRep = appDataSource.getRepository(User)

        jwt.verify(token, jwtSecret, async (err, decoded) => {
            if (err) {
                throw new Error('Session is expired. Please login again');
            } else if (decoded) {
                const jwtBody = decoded as { email: string };
                const userByEmail = await userRep.findOne({ where: { email: jwtBody?.email } })

                if (userByEmail) {
                    const authData = await authRep.findOne({ where: { userId: userByEmail.id } });

                    if (authData) {
                        next();
                    } else {
                        throw new Error('Session is expired. Please login again')
                    }
                } else {
                    throw new Error('Session is expired. Please login again')
                }
            }
        });
        next()

    }
}