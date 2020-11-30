import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {Item} from './Item.entity';
import TimeLog from './timerLog.entity';

@Entity()
class ReagentToItem{
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

export default ReagentToItem;