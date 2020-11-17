import {MigrationInterface, QueryRunner, Table, TableForeignKey, TableIndex} from "typeorm";

export class Auction1605618385522 implements MigrationInterface {

    private auctionTable = new Table({
        name: 'auction',
        columns: [
            {
                name: 'id',
                type: 'int',
                isPrimary: true,
                generationStrategy: 'increment'
            },
            {
                name: 'itemId',
                type: 'int',
                isNullable: false
            },
            {
                name: 'quantity',
                type: 'int',
                isNullable: false
            },
            {
                name: 'buyout',
                type: 'float',
                isNullable: false
            },
            {
                name: 'duration',
                type: 'enum',
                enum: ['12','24','48'],
                isNullable: false
            },
            {
                name: 'bind',
                type: 'flaot',
                isNullable: true
            },
            {
                name: 'dateRegistered',
                type: 'timestamptz',
                isNullable: false
            },
            {
                name: 'seller',
                type: 'varchar',
                length: '100',
                isNullable: true
            },
            {
                name: 'realmName',
                type: 'varchar',
                length: '100',
                isNullable: false
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
    });

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(this.auctionTable,true);
        await queryRunner.createIndex('auction', new TableIndex({
            name: 'IDX_SELLER',
            columnNames: ['seller','realmName']
        }));
        await queryRunner.createIndex('auction', new TableIndex({
            name: 'IDX_ITEM',
            columnNames: ['itemId']
        }));
        await queryRunner.createForeignKey('auction', new TableForeignKey({
            columnNames: ['itemId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'item'
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable('item');
        const foreingKey = table!.foreignKeys.find(fk => fk.columnNames.indexOf('itemId') !== -1);
        await queryRunner.dropForeignKey('item', foreingKey!);
        await queryRunner.dropIndex('auction', 'IDX_SELLER');
        await queryRunner.dropIndex('auction', 'IDX_ITEM');
        await queryRunner.dropTable('auction');
    }
}
