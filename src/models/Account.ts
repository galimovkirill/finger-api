import { model, Schema } from 'mongoose';
import { IAccount } from '../types/account.js';

const AccountSchema = new Schema<IAccount>(
    {
        name: { type: String, required: true },
        initialBalance: { type: Number, default: 0 },
        balance: { type: Number, default: 0 },
        currencyCode: { type: String, required: true }
    },
    {
        versionKey: false
    }
);

export default model('Account', AccountSchema);
