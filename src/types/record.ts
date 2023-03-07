import { Document } from 'mongoose';
import { IAccount } from './account.js';

export type IRecordType = 'income' | 'spending';

export interface IRecord extends Document {
    sum: number;
    accountId: IAccount['_id'];
    type: IRecordType;
}

export type IRecordCandidate = Pick<IRecord, 'sum' | 'accountId' | 'type'>;
