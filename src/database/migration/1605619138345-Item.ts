import {MigrationInterface, QueryRunner, Table, TableForeignKey, TableIndex} from "typeorm";

export class Item1605619138345 implements MigrationInterface {

    private itemTable = new Table({
        name: 'item',
        columns: [
            {
                name: 'id',
                type: 'int',
                isPrimary: true,
                isGenerated: true,
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
                enum: ['UNIQUE','SMALL','MEDIUM','NORMAL','LARGE','XLARGE'],
                isNullable: false,
                default: "'NORMAL'"
            },
            {
                name: 'image',
                type: 'varchar',
                isNullable: false,
            },
            {
                name: 'iconLabel',
                type: 'varchar',
                isNullable: false,
            },
            {
                name: 'logCreated_at',
                type: 'timestamp',
                isNullable: false,
                default: 'now()'
            },
            {
                name: 'logUpdated_at',
                type: 'timestamp',
                isNullable: false,
                default: 'now()'
            },
            {
                name: 'logDeleted_at',
                type: 'timestamp',
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
        await queryRunner.createForeignKey('auction', new TableForeignKey({
            columnNames: ['auctionItemId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'item'
        }));
        await queryRunner.createForeignKey('search', new TableForeignKey({
            columnNames: ['searchItemId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'item'
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropIndex('item','IDX_ITEM');
        await queryRunner.dropTable('item');
    }

}
