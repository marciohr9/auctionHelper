import {Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import User from './User.entity';
import {Item} from './Item.entity';
import {Auction} from './Auction.entity';
import TimeLog from './timerLog.entity';

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