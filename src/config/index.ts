//import 'dotenv/config';
import dotenv from 'dotenv';
dotenv.config();

export const config = {
    PORT: process.env.PORT ?? 3008,
    jwtToken: process.env.JWT_TOKEN,
    numberId: process.env.NUMBER_ID,
    verifyToken: process.env.VERIFY_TOKEN,
    version: "v20.0"
};
