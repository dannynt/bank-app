import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    Unique,
    CreateDateColumn
} from "typeorm";

@Entity()
@Unique(["id"])
export class History {
    @PrimaryGeneratedColumn()
    id!: number;
    @Column()
    transid!: number;
    @Column()
    amount!: number;
    @Column()
    description!: string;
    @Column()
    modification!: string;
    @Column()
    @CreateDateColumn()
    modifiedAt!: Date;

    setTransId(transid: number) {
        this.transid = transid
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
    setModification(modification: string) {
        this.modification = modification
        return this
    }
    setid(id: number) {
        if (id != null) {
            this.id = id;
        }
        return this
    }
}
