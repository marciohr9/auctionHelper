import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';
import TimeLog from './timerLog.entity';

@Entity()
class Auth {
    @PrimaryGeneratedColumn()
    id!: number;
    @Column({type: 'varchar', length: 250})
    googleToken!: string;
    @Column({type: 'varchar', length: 250})
    bnetToken!: string;
    @Column({type: 'varchar', length: 250})
    passwordToken!: string;
    @Column(type => TimeLog)
    log!: TimeLog;
}

export default Auth;