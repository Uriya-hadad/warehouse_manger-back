import {
    Column,
    Entity, Index, PrimaryGeneratedColumn
} from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Index('UQ_user_name', { unique: true })
    @Column()
    username: string;

    @Index('UQ_user_email', { unique: true })
    @Column()
    email: string;

    @Column({nullable: true})
    password: string;

    @Column({default:"Client"})
    role: string;

    @Column({default:false})
    confirmed: boolean;
}