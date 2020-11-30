import {Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import User from './User';
import {Item} from './Item';
import {Auction} from './Auction';
import TimeLog from './timerLog';

@Entity()
class Search {
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
    auctions!: Array<Auction>;
    @Column(type => TimeLog)
    log!: TimeLog;
}

export default Search;