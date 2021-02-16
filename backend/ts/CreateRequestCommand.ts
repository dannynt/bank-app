import { BankCommand } from "./BankCommand";
import { BankUser } from "./entity/User";
import { TransactionStrategy } from "./TransactionStrategy";
import { Request, Response } from "express";
import {Requesting} from "./entity/Requesting";
import { getRepository } from "typeorm";
export class CreateRequestCommand implements BankCommand {
    executer(user: BankUser): string {
        throw new Error("Method not implemented.");
    }
    async execute(req: Request, res: Response) {
        let {from, amount, description, id } = req.body;

        var userRepo = getRepository(BankUser);
        var fromuser = await userRepo.findOne({ username: from})
        var touser = await userRepo.findOne({ id: req.session.userId })

        if (!(fromuser && touser && amount && description)) {
            res.status(400).send("Something went wrong with the creation of request.");
            return
        }

        if(fromuser.id == req.session.userId)
        {
            res.status(400).send("Can't request money from self.");
            return;
        }

        amount = Number(amount);
        if (amount < 0 || isNaN(amount)) {
            res.status(400).send("The amount entered is not correct.");
            return
        }

        const requesto = getRepository(Requesting)
        var request = new Requesting().setid(id).setAmount(amount).setDescription(description).setFrom(fromuser).setTo(touser.id);
        await requesto.save(request)
        res.status(201).send("Request created");
    }
}