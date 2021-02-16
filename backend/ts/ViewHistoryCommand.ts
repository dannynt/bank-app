import { BankCommand } from "./BankCommand";
import { BankUser } from "./entity/User";
import { TransactionStrategy } from "./TransactionStrategy";
import { query, Request, Response } from "express";
import { History } from "./entity/History";
import { Transaction } from "./entity/Transaction";
import { getConnection, getRepository, SelectQueryBuilder } from "typeorm";
import { stringify } from "querystring";
import { Console } from "console";
export class ViewHistoryCommand implements BankCommand {
    executer(user: BankUser): string {
        throw new Error("Method not implemented.");
    }
    async execute(req: Request, res: Response) {
        if (req.session.role != "admin") {
            res.status(400).send("Access denied. //in half-life 1 announcer voice");
            return
        }


        var historyRepo = getRepository(History).createQueryBuilder("history").select(["history.transid", "history.amount", "history.description", "history.modifiedAt", "history.modification"]).orderBy("history.transid").addOrderBy("history.modifiedAt", "DESC");
        var all = await historyRepo.execute();

        res.status(200).send(all);
    }
}