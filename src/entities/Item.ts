import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {Auction} from './Auction';
import Icon from './icon';
import ReagentToItem from './Reagent';
import Search from './Search';
import TimeLog from './timerLog';

enum MaxStack {
    UNIQUE = 1,
    SMALL = 5,
    MEDIUM = 10,
    NORMAL = 20,
    LARGE = 100,
    XLARGE = 200
}
@Entity()
class Item {
    @PrimaryGeneratedColumn()
    id!: number;
    @Column({type: 'varchar', length: 100})
    name!: string;
    @Column({unique: true})
    wowId!: number;
    @Column({type: 'varchar', length: 250})
    description!:string;
    @Column()
    reagent!: boolean;
    @Column({type: 'float'})
    basePrice!: number
    @Column({
        type: "enum",
        enum: MaxStack,
        default: String(MaxStack.NORMAL)
    })
    maxStack!: MaxStack;
    @Column(type => Icon)
    icon!: Icon;
    @OneToMany(() => Search, search => search.item)
    searchs!: Search[];
    @OneToMany(() => Auction, auction => auction.item)
    auctions!: Auction[];
    @OneToMany(() => ReagentToItem, reagents => reagents.item)
    public reagents!: ReagentToItem[];
    @Column(type => TimeLog)
    log!: TimeLog;
}
export {
    Item,
    MaxStack
}