import { BankCommand } from "./BankCommand";
import { BankUser } from "./entity/User";
import { Response, Request } from "express"
export class LogOutCommand implements BankCommand {
    async execute(req: Request, res: Response): Promise<void> {
        req.session.destroy((err) => {
            res.status(200).send("Logged out");
        });

    }
}
