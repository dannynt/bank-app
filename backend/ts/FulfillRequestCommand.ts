import { BankCommand } from "./BankCommand";
import { BankUser } from "./entity/User";
import { TransactionStrategy } from "./TransactionStrategy";
import { Request, Response } from "express";
import { Transaction } from "./entity/Transaction";
import {Requesting} from "./entity/Requesting";
import { getRepository } from "typeorm";
import { TransactionCommand } from "./TransactionCommand";
import * as cmds from "./Commands";
export class FulfillRequestCommand implements BankCommand {
    async execute(req: Request, res: Response) {
        let reqid = req.body.reqid;

        var reqRepo = getRepository(Requesting);
        var request = await reqRepo.findOne({id: reqid});

        if(request == undefined)
        {
            res.status(400).send("Didn't find the requested request");
            return;
        }
        
        if(request.fromid != req.session.userId)
        {
            res.status(400).send("User can only pay for requests made for them");
            return;
        }

        var userRepo = getRepository(BankUser);
        var fromuser = await userRepo.findOne({ id: request.fromid })
        var touser = await userRepo.findOne({ id: request.toid })

        if(!(fromuser && touser)){
            res.status(400).send("Something wrong with the users in the request");
            return;
        }

        req.body.from = fromuser.username;
        req.body.to = touser.username;
        req.body.amount = request.amount;
        req.body.description = request.description;

        await new TransactionCommand(new cmds.OperationCreateTansaction()).execute(req, res);
    }
}