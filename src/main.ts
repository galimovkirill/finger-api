import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';

import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger/swagger.json' assert { type: 'json' };

import router from './routes/_router.js';

import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());

/**
 * Swagger
 */
router.use('/swagger', swaggerUi.serve);
router.get('/swagger', swaggerUi.setup(swaggerDocument));

/**
 * Setup all routes inside /api folder
 */
app.use('/api', router);

const start = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URL || '');

        const PORT = process.env.PORT || '8000';

        app.listen(PORT, () => {
            console.log(`Server has been started on port - ${PORT}`);
        });
    } catch (error) {
        console.log(error);
    }
};

start();
