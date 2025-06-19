import * as dotenv from "dotenv";
dotenv.config();

export const env = {
    BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL! || 'http://localhost:3000',
    BACKEND_URL_PROTECTED: process.env.NEXT_PUBLIC_BACKEND_URL_PROTECTED! || 'http://localhost:3000',
    JWT_SECRET: process.env.JWT_SECRET! || 'flickstar'
}

