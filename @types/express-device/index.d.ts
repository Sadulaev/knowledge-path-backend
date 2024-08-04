// src/@types/express-device/index.d.ts

declare module 'express-device' {
    import { RequestHandler } from 'express';

    type DeviceType = 'phone' | 'tablet' | 'desktop' | 'tv' | 'bot' | 'car' | 'other' | 'unknown';

    interface Device {
        type: DeviceType;
        name: string;
        parser: any;
        is_mobile: boolean;
        is_tablet: boolean;
        is_desktop: boolean;
        is_tv: boolean;
    }

    export function capture(options?: any): RequestHandler;
}

declare namespace Express {
    import { Device } from 'express-device';

    export interface Request {
        device: Device;
    }
}