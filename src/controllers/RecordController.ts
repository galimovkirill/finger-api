import { Request, Response } from 'express';
import Account from '../models/Account.js';
import Record from '../models/Record.js';
import { IAccount } from '../types/account.js';
import { IRecordCandidate } from '../types/record.js';
import { getCurrentUser } from './utils/common.js';

class RecordController {
    async createRecord(req: Request<unknown, unknown, IRecordCandidate>, res: Response) {
        try {
            const { sum, accountId, type } = req.body;

            const record = new Record({ sum, accountId, type });
            await record.save();

            await Account.findOneAndUpdate({ _id: accountId }, { $inc: { balance: type === 'spending' ? sum * -1 : sum } });

            return res.json({ record });
        } catch (error) {
            console.log(error);
        }
    }

    async deleteRecord(req: Request, res: Response) {
        try {
            const { recordId } = req.body;
            const record = await Record.findById(recordId);

            if (!record) {
                return res.sendStatus(400);
            }

            await Account.findOneAndUpdate(
                { _id: record.accountId },
                { $inc: { balance: record.type === 'income' ? record.sum * -1 : record.sum } }
            );
            await record.delete();

            return res.sendStatus(200);
        } catch (error) {
            console.log(error);
        }
    }

    async getRecordsByAccountId(req: Request<{ accountId: IAccount['_id'] }>, res: Response) {
        try {
            const currentUser = await getCurrentUser(req);
            if (!currentUser) {
                return res.sendStatus(403);
            }

            const { accountId } = req.params;
            const account = await Account.findById(accountId).select('+userRef');

            if (!account) {
                return res.sendStatus(400);
            }

            if (!account.userRef.equals(currentUser._id)) {
                return res.sendStatus(403);
            }

            const records = await Record.find({ accountId });

            return res.json({ records });
        } catch (error) {
            console.log(error);
        }
    }

    // getRecordById() {}
}

export default new RecordController();
