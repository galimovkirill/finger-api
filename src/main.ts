import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import userRoutes from './routes/UserRoutes.js';

dotenv.config();

const PORT = process.env.PORT || '8000';

const app = express();
app.use(express.json());

const router = express.Router();
router.use('/user', userRoutes);

app.use('/api', router);

const start = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URL || '');

        app.listen(PORT, () => {
            console.log(`Server has been started on port - ${PORT}`);
        });
    } catch (error) {
        console.log(error);
    }
};

start();
