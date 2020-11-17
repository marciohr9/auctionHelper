import {Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import User from './user.entity';
import Item from './item.entity';
import Auction from './auction.entity';
import TimeLog from './timerLog.entity';

@Entity()
export default class Search {
    @PrimaryGeneratedColumn()
    id!: number;
    @Column({type: 'timestamp'})
    dateSearch!: Date;
    @ManyToOne(()=>User, user => user.searchs)
    user!: User;
    @ManyToOne(()=>Item, item => item.searchs)
    item!: Item;
    @ManyToMany(()=>Auction)
    @JoinTable()
    auctions!: Auction[];
    @Column(type => TimeLog)
    log!: TimeLog;
}