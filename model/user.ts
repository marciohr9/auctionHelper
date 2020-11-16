import {Column, Entity, Generated, JoinColumn, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn} from 'typeorm';
import Auth from './auth';
import Search from './search';

@Entity()
export default class User {
    @PrimaryGeneratedColumn()
    id!: number;
    @Column()
    @Generated('uuid')
    uuid!: string;
    @Column({unique: true})
    email!: string;
    @Column({type: 'varchar',length:100})
    name!: string;
    @Column({unique: true})
    phone!: number;
    @Column({unique: true})
    bnetID!: string;
    @OneToOne(()=> Auth)
    @JoinColumn()
    auth!: Auth;
    @OneToMany(() => Search, search => search.user)
    searchs!: Search[];
}