import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { BankCommand } from "./BankCommand";
import { BankUser } from "./entity/User";
export class LoginCommand extends BankCommand {

  async execute(req: Request, res: Response): Promise<void> {
    const userRepository = getRepository(BankUser);
    let user = new BankUser()

    // in case user session already exists
    if (req.session.userId) {
      user = await userRepository.findOneOrFail({ where: { id: req.session.userId } });
      if (user) {
        res.status(200).send(await user.ToArr());
        return
      }
    }
    const { username, password } = req.body;
    if (!(username && password)) {
      res.status(400).send("Fill all the fields!");
      return;
    }

    try {
      //Get user from database
      user = await userRepository.findOneOrFail({ where: { username } });
    } catch (error) {
      res.status(401).send("Username or password is invalid!");
      return;
    }

    //Check if encrypted password match
    if (!user.checkIfUnencryptedPasswordIsValid(password)) {
      res.status(401).send("Username or password is invalid!");
      return;
    }

    req.session.userId = user.getId();
    req.session.role = user.getRole();
    //Send the jwt in the response
    res.header(200).send(await user.ToArr());
  };
}