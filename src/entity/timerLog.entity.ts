import {CreateDateColumn, DeleteDateColumn, UpdateDateColumn} from 'typeorm';

class TimeLog{
    @CreateDateColumn({
        nullable: false,
        name: "created_at"
    })
    createdAt!: Date;
    @UpdateDateColumn({
        nullable: false,
        name: "updated_at"
    })
    updatedAt!: Date;
    @DeleteDateColumn({
        name: "deleted_at"
    })
    deletedAt?: Date;
}

export default TimeLog;