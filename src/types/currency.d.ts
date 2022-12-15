import { Document } from 'mongoose';

export interface ICurrency extends Document {
    name: string;
    code: string;
}

export type ICurrencyCandidate = Pick<ICurrency, 'name' | 'code'>;
