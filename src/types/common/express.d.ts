declare namespace Express {
    interface Request {
        user?: {
            data: string;
            exp: number;
            iat: number;
        };
    }
}
