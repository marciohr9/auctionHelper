import {Column} from 'typeorm';

export default class Icon {
    @Column()
    foto!: string;
    @Column()
    iconLabel!: string;
}