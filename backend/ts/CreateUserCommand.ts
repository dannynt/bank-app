import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { validate } from "class-validator";

import { BankUser } from "./entity/User";
import { Funds } from "./entity/Funds"
import { BankCommand } from "./BankCommand";

export class CreateUserCommand implements BankCommand {
  async execute(req: Request, res: Response): Promise<void> {
    if (!req.body.user.isAdmin()) {
      res.status(401).send("This command is not allowed");
      return;
    }
    let user = new BankUser();
    user.username = req.body.username;
    user.password = req.body.password;
    user.first_name = req.body.first_name;
    user.last_name = req.body.last_name;
    user.role = req.body.role;

    //Validade if the parameters are ok
    const errors = await validate(user);
    if (errors.length > 0) {
      res.status(402).send(errors);
      return;
    }
    //Hash the password, to securely store on DB
    user.hashPassword();
    //Try to save. If fails, the username is already in use
    const userRepository = getRepository(BankUser);
    try {
      await userRepository.save(user);
      if (user.role == "user") {
        const fundsRepo = getRepository(Funds);
        fundsRepo.save(new Funds().setUser(user.id))
      }
    } catch (e) {
      res.status(401).send("User already exists!");
      return;
    }

    //If all ok, send 201 response
    res.status(201).send("User created successfully!");
  }
}