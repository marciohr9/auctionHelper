import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import Item from './item.entity';
import TimeLog from './timerLog.entity';

@Entity()
export default class ReagentToItem{
    @PrimaryGeneratedColumn()
    public id!: number;
    @Column()
    public craftedItemId!: number;
    @Column()
    public reagentItemId!: number;
    @Column()
    public quantity!: number;
    @ManyToOne(()=> Item, item => item.reagents)
    public item!: Item;
    @Column(type => TimeLog)
    log!: TimeLog;
}