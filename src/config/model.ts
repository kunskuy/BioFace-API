import dotenv from 'dotenv';
dotenv.config();

export const { MODEL_URL = '', PORT = 3000 } = process.env;
