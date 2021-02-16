import { BankCommand } from "./BankCommand";
import { BankUser } from "./entity/User";
import { TransactionStrategy } from "./TransactionStrategy";
import { Request, Response } from "express";
import { Transaction } from "./entity/Transaction";
import { getRepository } from "typeorm";
import * as cmds from "./Commands";
export class TransactionCommand implements BankCommand {
    private operation: TransactionStrategy;

    constructor(operation: TransactionStrategy) {
        this.operation = operation;
    }
    executer(user: BankUser): string {
        throw new Error("Method not implemented.");
    }
    async execute(req: Request, res: Response) {
        let { from, to, amount, description, id } = req.body;
        
        var userRepo = getRepository(BankUser);
        var fromuser = await userRepo.findOne({ username: from })
        var touser = await userRepo.findOne({ username: to })
        if (!(touser && amount && description)) {
            res.status(400).send("Something went wrong with transaction.");
            return
        }
        amount = Number(amount);
        if (amount < 0 || isNaN(amount)) {
            res.status(400).send("The amount entered is not correct.");
            return
        }
        var allowable = await this.operation.allowed(req.body.user, fromuser, touser, amount)
        if (!allowable.succ) {
            res.status(401).send(allowable.message);
            return
        }

        //meaning it is made by admin and show the admin to user
        if(fromuser==undefined || from == 0)
            fromuser = req.body.user;
        
        var transact = new Transaction().setid(id).setAmount(amount).setDescription(description).setFrom(fromuser).setTo(touser.id);
        if (await this.operation.doOperation(transact)) {
            res.status(201).send("Transaction successful");
            if(req.body.reqid)
                cmds.DeleteRequest(req.body.reqid);
        } else {
            res.status(400).send("Transaction wasn't successful.");
        }

    }
}