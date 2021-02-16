//For quicker access add the needed classes here
//export {_classname} from "./_classname";
export { CreateUserCommand } from "./CreateUserCommand";
export { DeleteUserCommand } from "./DeleteUserCommand";

export { LogOutCommand } from "./LogOutCommand";
export { LoginCommand } from "./LoginCommand";

export { OperationCancelTransaction } from "./OperationCancelTransaction"
export { OperationChangeTransaction } from "./OperationChangeTransaction"
export { OperationCreateTansaction } from "./OperationCreateTransaction"
export {CreateRequestCommand} from "./CreateRequestCommand"
export {ViewRequestsCommand} from "./ViewRequestsCommand"
export {FulfillRequestCommand} from "./FulfillRequestCommand";
export {ViewHistoryCommand} from "./ViewHistoryCommand";

export { BankUser } from "./entity/User";
import { BankUser } from "./entity/User";
import { getRepository } from "typeorm";
import { request, Request, Response } from "express";
import { Requesting } from "./entity/Requesting";

export function UserToBankUser(user: BankUser) {
  return user;
}

export function GetUserFromId(req: Request, res: Response) {
  const userRepository = getRepository(BankUser);

  let user;
  //Trying to get the user from database by id
  var id = req.session.userId;
  try {
    user = userRepository.findOneOrFail({ where: { id } });
  } catch (error) {
    res.status(401).send("Couldn't get the user from database");
  }
  return user;
} 

export function DeleteRequest(reqid:number){
  const reqRepo = getRepository(Requesting);

  var request = reqRepo.findOne({id: reqid});
  if(request)
    reqRepo.delete({ id: reqid });
}