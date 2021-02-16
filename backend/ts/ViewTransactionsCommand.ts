import { BankCommand } from "./BankCommand";
import { BankUser } from "./entity/User";
import { TransactionStrategy } from "./TransactionStrategy";
import { query, Request, Response } from "express";
import { Transaction } from "./entity/Transaction";
import { getConnection, getRepository, SelectQueryBuilder } from "typeorm";
import { stringify } from "querystring";
import { Console } from "console";
export class ViewTransactionsCommand implements BankCommand {
    executer(user: BankUser): string {
        throw new Error("Method not implemented.");
    }
    async execute(req: Request, res: Response) {
        let user: BankUser = req.body.user;

        var fromrepo = getRepository(Transaction)
            .createQueryBuilder("trans")
            .innerJoinAndSelect(BankUser, "bfrom", "bfrom.id = trans.fromid")
            .innerJoinAndSelect(BankUser, "bto", "bto.id = trans.toid")
            .select(["bto.username", "bfrom.username", "trans.amount", "trans.description", "trans.createdAt", "trans.id"])
            .orderBy("trans.createdAt")

        if (user.isAdmin()) {
            var all = await fromrepo.execute();
            res.status(200).send(all);
            return;
        }
        var fromuser = await fromrepo.where("bfrom.username = :name or bto.username = :name", { name: user.username }).execute()
        res.status(200).send(fromuser);
    }
}