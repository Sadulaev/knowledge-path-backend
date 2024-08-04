export type ResponseError<T = any> = {
    status: number;
    message: number;
    data: T;
}

export type ValidationError = {
    name: string;
    email: string;
    password: string;
}