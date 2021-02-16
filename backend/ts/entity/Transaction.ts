import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    Unique,
    CreateDateColumn
} from "typeorm";
import { BankUser } from "./User";

@Entity()
@Unique(["id"])
export class Transaction {
    @PrimaryGeneratedColumn()
    id!: number;
    @Column()
    fromid!: number;
    @Column()
    toid!: number;
    @Column()
    amount!: number;
    @Column()
    description!: string;
    @Column()
    @CreateDateColumn()
    createdAt!: Date;

    setFrom(fromUser: BankUser | undefined) {
        if (fromUser != undefined) {
            this.fromid = fromUser.id;
        }
        return this
    }
    setTo(toUser: number) {
        this.toid = toUser
        return this
    }
    setAmount(amount: number) {
        this.amount = amount
        return this
    }
    setDescription(description: string) {
        this.description = description
        return this
    }
    setid(id: number) {
        if (id != null) {
            this.id = id;
        }
        return this
    }
}
