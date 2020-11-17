import {Column, Entity, Generated, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn} from 'typeorm';
import Auth from './auth.entity';
import Search from './search.entity';
import TimeLog from './timerLog.entity';

@Entity('user')
export default class User {
    @PrimaryGeneratedColumn()
    id!: number;
    @Column({type: "uuid", unique: true})
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
    @OneToOne(()=> Auth,{cascade: true})
    @JoinColumn()
    auth!: Auth;
    @OneToMany(() => Search, search => search.user)
    searchs!: Search[];
    @Column(type => TimeLog)
    log!: TimeLog;
}