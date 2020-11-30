import {Column, Entity, Generated, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn} from 'typeorm';
import Auth from './Auth';
import Search from './Search';
import TimeLog from './timerLog';

@Entity('user')
class User {
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
    phone!: string;
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

export default User;