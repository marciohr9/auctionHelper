import {BaseEntity, Column, Entity, Generated, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn} from 'typeorm';
import Auth from './Auth.entity';
import Search from './Search.entity';
import TimeLog from './timerLog.entity';

@Entity()
class User extends BaseEntity{
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
    searchs!: Array<Search>;
    @Column(type => TimeLog)
    log!: TimeLog;
}

export default User;