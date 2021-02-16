import { Session } from "inspector";
import { BankUser } from "../../ts/BankUser";
import { BankUser } from "../../ts/entity/User";
import{BankUser} from "../ts/BankUser";

declare module "express-session" {
    interface Session {
      userId:number;
      role:string;
    }
  }
  