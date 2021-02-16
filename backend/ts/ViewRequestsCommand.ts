import { BankCommand } from "./BankCommand";
import { BankUser } from "./entity/User";
import { TransactionStrategy } from "./TransactionStrategy";
import { query, Request, Response } from "express";
import { Requesting } from "./entity/Requesting";
import { getConnection, getRepository, SelectQueryBuilder } from "typeorm";
import { stringify } from "querystring";
import { Console } from "console";
export class ViewRequestsCommand implements BankCommand {
    executer(user: BankUser): string {
        throw new Error("Method not implemented.");
    }
    async execute(req: Request, res: Response) {
        let user: BankUser = req.body.user;

        var fromrepo = getRepository(Requesting)
            .createQueryBuilder("request")
            .innerJoinAndSelect(BankUser, "bfrom", "bfrom.id = request.fromid")
            .innerJoinAndSelect(BankUser, "bto", "bto.id = request.toid")
            .select(["bto.username", "bfrom.username", "request.amount", "request.description", "request.createdAt", "request.id"])
            .orderBy("request.createdAt")

        if (user.isAdmin()) {
            var all = await fromrepo.execute();
            res.status(200).send(all);
            return;
        }
        var userinfo = await fromrepo.where("bfrom.username = :name or bto.username = :name", { name: user.username }).execute()
        res.status(200).send(userinfo);
    }
}