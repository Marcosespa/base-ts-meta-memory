import 'dotenv/config';
// #dede
export const config = {
    PORT: process.env.PORT ?? 3008,
    jwtToken: process.env.jwtToken,
    numberId: process.env.numberId,
    verifyToken: process.env.verifyToken,
    version: "v20.0"
};
