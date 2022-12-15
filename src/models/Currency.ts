import { Schema, model } from 'mongoose';
import { ICurrency } from '../types/currency.js';

const CurrencySchema = new Schema<ICurrency>(
    {
        code: { type: String, required: true, unique: true },
        name: { type: String, required: true }
    },
    {
        versionKey: false
    }
);

export default model('Currency', CurrencySchema);
