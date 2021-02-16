import { getRepository } from "typeorm";
import { History } from "./entity/History";
import { Transaction } from "./entity/Transaction";
import { BankUser } from "./entity/User";
import { TransactionStrategy } from "./TransactionStrategy";

export class OperationCancelTransaction extends TransactionStrategy {
    async allowed(user: BankUser, from: BankUser | undefined, to: BankUser, amount: number): Promise<{ "succ": boolean, "message": string }> {
        return { succ: user.isAdmin(), message: "This command is not allowed!" }
    }
    async doOperation(transaction: Transaction): Promise<boolean> {
        if (transaction.id == undefined) {
            return false;
        }
        const historyRepository = getRepository(History);
        const transRepository = getRepository(Transaction);
        const oldtrans = await transRepository.findOne({ id: transaction.id });
        if (oldtrans == undefined) {
            return false;
        }
        var history = new History().setTransId(oldtrans.id).setAmount(oldtrans.amount).setDescription(oldtrans.description).setModification('cancelled');
        await historyRepository.save(history);
        await transRepository.delete(transaction.id);
        if (transaction.fromid != undefined) {
            this.addFunds(transaction.fromid, transaction.amount);
        }
        this.removeFunds(transaction.toid, transaction.amount);
        return true
    }
}