import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import Item from './item.entity';
import TimeLog from './timerLog.entity';

export enum Duration{
    SHORT = 12,
    LONG = 24,
    VERYLONG = 48,
}

@Entity()
export default class Auction {
    @PrimaryGeneratedColumn()
    id!: number;
    @Column()
    quantity!: number;
    @Column({type: 'float'})
    buyout!: number;
    @Column()
    seller!: string;
    @Column()
    realm!: string;
    @Column({type: 'float', nullable: true})
    bind?: number;
    @Column({type: 'timestamp'})
    dateRegistered!: string;
    @Column({
        type: "enum",
        enum: Duration
    })
    duration!: Duration;
    @ManyToOne(() => Item, item => item.auctions)
    item!: Item;
    @Column(type => TimeLog)
    log!: TimeLog;
}