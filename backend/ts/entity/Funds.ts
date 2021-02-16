import { ISession } from "connect-typeorm";
import { Column, Entity, Index, PrimaryColumn, Unique } from "typeorm";
@Entity()
@Unique(["userid"])
export class Funds {
    @PrimaryColumn()
    public userid: number;
    @Column("int")
    public amount: number = 0;
    public setUser(id: number) {
        this.userid = id;
        return this
    }
    public addFunds(amount: number) {
        this.amount += amount;
    }
}