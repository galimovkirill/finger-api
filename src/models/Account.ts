import { model, Schema } from 'mongoose';
import { IAccount } from '../types/account.js';

const AccountSchema = new Schema<IAccount>(
    {
        name: { type: String, required: true },
        initialBalance: { type: Number, default: 0 },
        balance: { type: Number, default: 0 },
        currencyCode: { type: String, ref: 'Currency', index: true, required: true },
        userRef: { type: Schema.Types.ObjectId, ref: 'User', required: true, select: false }
    },
    {
        versionKey: false
    }
);

export default model('Account', AccountSchema);
