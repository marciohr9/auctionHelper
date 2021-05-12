import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from 'typeorm';
import TimeLog from './timerLog.entity';

enum Roles {
    USER = 'USER',
    MANAGER = 'MANAGER',
    ADMIN = 'ADMIN'
}

@Entity()
class Auth extends BaseEntity{
    @PrimaryGeneratedColumn()
    id!: number;
    @Column({type: 'varchar', length: 250})
    googleToken!: string;
    @Column({type: 'varchar', length: 250})
    bnetToken!: string;
    @Column({type: 'varchar', length: 250})
    pwdHash!: string;
    @Column({
        type: "enum",
        enum: Roles,
        default: String(Roles.USER)
    })
    role!: string;
    @Column(type => TimeLog)
    log!: TimeLog;
}

export default Auth;