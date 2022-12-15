import { Document } from 'mongoose';
import { ICurrency } from './base.js';

export interface IAccount extends Document {
    name: string;
    initialBalance: number;
    balance: number;
    currencyCode: ICurrency['code'];
}

export type IAccountCandidate = Pick<IAccount, 'name' | 'initialBalance' | 'currencyCode'>;
