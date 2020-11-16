import {Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import User from './user';
import Item from './item';
import Auction from './auction';

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
}