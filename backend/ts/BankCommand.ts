import { BankUser } from "./entity/User";
import { Response, Request } from "express"

export abstract class BankCommand {
    async execute(req: Request, res: Response): Promise<void>{};
}