import express from 'express';
import mongoose from 'mongoose';

import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger/swagger.json' assert { type: 'json' };

import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(express.json());

/**
 * Base routes
 */
import userRoutes from './routes/UserRoutes.js';

const router = express.Router();
router.use('/user', userRoutes);

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
