import { getRepository } from "typeorm";
import { Funds } from "./entity/Funds";
import { Transaction } from "./entity/Transaction";
import { BankUser } from "./entity/User";

export abstract class TransactionStrategy {
    abstract allowed(user: BankUser, from: BankUser | undefined, to: BankUser, amount: number): Promise<{ "succ": boolean, "message": string }>;
    abstract doOperation(user: Transaction): Promise<boolean>;

    async addFunds(userid: number, amount: number): Promise<boolean> {
        const fundsRepo = getRepository(Funds);
        const userfunds = await fundsRepo.findOne({ userid: userid });
        if (userfunds == undefined) {
            return false;
        }
        userfunds.addFunds(amount);
        fundsRepo.save(userfunds);
        return true;
    }
    async removeFunds(userid: number, amount: number): Promise<boolean> {
        return this.addFunds(userid, -amount);
    }
    async hasFunds(userid: number, amount: number): Promise<boolean> {
        const fundsRepo = getRepository(Funds);
        const userfunds = await fundsRepo.findOne({ userid: userid });
        if (userfunds == undefined) {
            return false;
        }
        return userfunds.amount >= amount;
    }
}