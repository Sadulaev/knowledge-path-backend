import { AuthData } from "../entities/auth.entity";
import appDataSource from "../data-source";

export class UserController {
    async getProfile(token: string) {
        try {
            const authDataRep = appDataSource.getRepository(AuthData);

        } catch (err) {
            console.log(err);

        }
    }
}