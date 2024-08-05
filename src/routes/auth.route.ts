import { Request, Response, Router } from 'express';
import { ResponseError } from '../types/response';
import signUpValidationSchema from '../validationSchemes/signUp.schema';
import { AuthController } from '../controllers/auth.controller';
import { validationResult } from 'express-validator';
import formatValidationResult from '../helpers/formatValidationResult';
import device from 'express-device'

const router = Router();

router.use(device.capture());

const authController = new AuthController();

router.post('/auth/sign-up', signUpValidationSchema, async (req: Request, res: Response) => {
    try {
        const validationErrors = formatValidationResult(validationResult(req).array())

        if (validationErrors) {
            res.status(400).json(validationErrors)
        } else {
            const authResult = await authController.signUp(req.body, { device: req.device?.name, ip: req.headers['x-forwarded-for']?.toString() || req.socket.remoteAddress || 'not-defined' });
            res.status(201).send({ token: authResult.token })
        }
    } catch (err) {
        const error = err as ResponseError;
        res.status(400).send({ message: error.message })
    }
});

router.post('/auth/sign-in', async (req: Request, res: Response) => {
    try {
        const authResult = await authController.signIn(req.body, { device: req.device?.name, ip: req.headers['x-forwarded-for']?.toString() || req.socket.remoteAddress || 'not-defined' })
        res.status(201).send({ token: authResult.token })
    } catch (err) {
        console.log(err)
        const error = err as ResponseError;
        res.status(400).send({ message: error.message })
    }
})


export default router;
