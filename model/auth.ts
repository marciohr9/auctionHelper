import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export default class Auth {
    @PrimaryGeneratedColumn()
    id!: number;
    @Column({type: 'varchar', length: 250})
    googleToken!: string;
    @Column({type: 'varchar', length: 250})
    bnetToken!: string;
    @Column({type: 'varchar', length: 250})
    passwordToken!: string;
}