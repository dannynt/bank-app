import { Request, Response } from "express";
import { DeleteResult, getRepository } from "typeorm";
import { validate } from "class-validator";
import { BankUser } from "./entity/User";
import { BankCommand } from "./BankCommand";

export class DeleteUserCommand implements BankCommand {

  async execute(req: Request, res: Response): Promise<void> {
    if (!req.body.user.isAdmin()) {
      res.status(401).send("This command is not allowed!");
      return;
    }
    //Get the ID from the url
    const id = req.body.id;
    if (!id) {
      res.status(402).send("id is not assigned!");
      return;
    }
    const userRepository = getRepository(BankUser);
    let user: BankUser;
    try {
      user = await userRepository.findOneOrFail(id);
    } catch (error) {
      res.status(401).send("User not found!");
    }
    userRepository.delete(id);

    res.status(201).send("User deleted!");
  }
}