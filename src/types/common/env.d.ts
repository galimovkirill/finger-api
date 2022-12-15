import { Secret } from 'jsonwebtoken';

export {};

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            PORT: number;
            MONGO_DB_URL: string;
            JWT_SECRET_KEY: Secret;
        }
    }
}
