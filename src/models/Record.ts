import { Schema, model } from 'mongoose';
import { IRecord } from '../types/record.js';

const RecordSchema = new Schema<IRecord>(
    {
        sum: { type: Number, default: 0 },
        accountId: { type: String, ref: 'Account', required: true },
        type: { type: String, required: true }
    },
    {
        versionKey: false
    }
);

export default model('Record', RecordSchema);
