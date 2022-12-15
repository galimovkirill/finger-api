import { Document, Types } from 'mongoose';
import { ICurrency } from './currency.js';

export interface IAccount extends Document {
    name: string;
    initialBalance: number;
    balance: number;
    currencyCode: ICurrency['code'];
    userRef: Types.ObjectId;
}

export type IAccountCandidate = Pick<IAccount, 'name' | 'initialBalance' | 'currencyCode'>;
