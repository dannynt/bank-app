import { getRepository } from "typeorm";
import { Transaction } from "./entity/Transaction";
import { BankUser } from "./entity/User";
import { TransactionStrategy } from "./TransactionStrategy";

export class OperationCreateTansaction extends TransactionStrategy {

    async allowed(user: BankUser, from: BankUser | undefined, to: BankUser, amount: number): Promise<{ "succ": boolean, "message": string }> {
        if (from == undefined) { // Seed transaction
            return { succ: user.isAdmin(), message: "User is not admin." };
        } else if (user.isAdmin()) {
            return { succ: true, message: "" }
        } else if (user.id == from.id && from.id != to.id) {
            return { succ: await this.hasFunds(from.id, amount), message: "You don't have enough funds." }
        } else {
            return { succ: false, message: "This command is not allowed!" }
        }
    }
    async doOperation(transaction: Transaction): Promise<boolean> {
        if (transaction.id != undefined) {
            return false;
        }
        const transRepository = getRepository(Transaction);
        await transRepository.save(transaction);
        if (transaction.fromid != undefined) {
            this.removeFunds(transaction.fromid, transaction.amount);
        }
        this.addFunds(transaction.toid, transaction.amount);
        return true;
    }

}