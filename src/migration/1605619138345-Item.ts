import {MigrationInterface, QueryRunner, Table, TableIndex} from "typeorm";

export class Item1605619138345 implements MigrationInterface {

    private itemTable = new Table({
        name: 'item',
        columns: [
            {
                name: 'id',
                type: 'int',
                isPrimary: true,
                generationStrategy: 'increment'
            },
            {
                name: 'name',
                type: 'varchar',
                length: '100',
                isNullable: false
            },
            {
                name: 'wowId',
                type: 'int',
                isNullable: false,
                isUnique: true
            },
            {
                name: 'description',
                type: 'varchar',
                length: '250',
                isNullable: true
            },
            {
                name: 'crafted',
                type: 'boolean',
                isNullable: false
            },
            {
                name: 'basePrice',
                type: 'float',
                isNullable: false,
                default: '0.01'
            },
            {
                name: 'maxStack',
                type: 'enum',
                enum: ['1','5','10','15','20','100','200'],
                isNullable: false,
                default: '20'
            },
            {
                name: 'image',
                type: 'varchar',
                isNullable: false,
            },
            {
                name: 'iconLabel',
                type: 'varchar',
                length: '250',
                isNullable: false,
                isUnique: true
            },
            {
                name: 'created_at',
                type: 'timestamptz',
                isNullable: false,
                default: 'now()'
            },
            {
                name: 'updated_at',
                type: 'timestamptz',
                isNullable: false,
                default: 'now()'
            },
            {
                name: 'deleted_at',
                type: 'timestamptz',
                isNullable: true
            }
        ]
    })

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(this.itemTable,true);
        await queryRunner.createIndex('item', new TableIndex({
            name: 'IDX_ITEM',
            columnNames: ['name','crafted','maxStack']
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropIndex('item','IDX_ITEM');
        await queryRunner.dropTable('item');
    }

}
