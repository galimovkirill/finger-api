import { IAccount } from '../types/account.js';

export class AccountDto {
    _id;
    name;
    initialBalance;
    balance;
    currencyCode;

    constructor(data: IAccount) {
        this._id = data._id;
        this.name = data.name;
        this.initialBalance = data.initialBalance;
        this.balance = data.balance;
        this.currencyCode = data.currencyCode;
    }
}
