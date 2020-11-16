import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import Item from './item';

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
}