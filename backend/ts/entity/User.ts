
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  CreateDateColumn,
  UpdateDateColumn,
  getRepository
} from "typeorm";
import { Length, IsNotEmpty } from "class-validator";
import * as bcrypt from "bcryptjs";
import { Funds } from "./Funds";

@Entity()
@Unique(["username"])
export class BankUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Length(4, 20)
  username: string;

  @Column()
  @Length(4, 100)
  password: string;

  @Column()
  @Length(1, 20)
  first_name: string;

  @Column()
  @Length(1, 20)
  last_name: string;

  @Column()
  @IsNotEmpty()
  role: string;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;

  hashPassword() {
    this.password = bcrypt.hashSync(this.password, 8);
  }

  checkIfUnencryptedPasswordIsValid(unencryptedPassword: string) {
    return bcrypt.compareSync(unencryptedPassword, this.password);
  }
  public getId(): number {
    return this.id;
  }
  public getRole(): string {
    return this.role;
  }
  public isAdmin(): boolean {
    return this.role === "admin";
  }
  public async ToArr() {
    if (this.isAdmin()) {
      return {
        username: this.username,
        first_name: this.first_name,
        last_name: this.last_name,
        role: this.role,
        id: this.id
      }
    }
    const funds = getRepository(Funds);
    var userfund = await funds.findOneOrFail({ where: { userid: this.id } });
    return {
      username: this.username,
      first_name: this.first_name,
      last_name: this.last_name,
      role: this.role,
      id: this.id,
      funds: userfund.amount
    }
  }
}

