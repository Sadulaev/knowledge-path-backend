import express, { Request, Response } from 'express';
import { ResponseError } from '../types/response';
import signUpValidationSchema from '../validationSchemes/signUp.schema';
import { AuthController } from '../controllers/auth.controller';
import device from 'express-device'

const app = express();
app.use(device.capture());

const authController = new AuthController();

app.post('/user/sign-up', signUpValidationSchema, async (req: Request, res: Response) => {
    try {
        await authController.signUp(req.body, { device: req.device.name, ip: req.headers['x-forwarded-for']?.toString() || req.socket.remoteAddress || 'not-defined' });
        res.status(201).send({ token: '123' })
    } catch (err) {
        const error = err as ResponseError;
        res.status(400).send(error)
    }
})

