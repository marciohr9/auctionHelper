import {MigrationInterface, QueryRunner, Table, TableForeignKey, TableIndex} from "typeorm";

export class Auction1605618385522 implements MigrationInterface {

    private auctionTable = new Table({
        name: 'auction',
        columns: [
            {
                name: 'id',
                type: 'int',
                isPrimary: true,
                isGenerated: true,
                generationStrategy: 'increment'
            },
            {
                name: 'auctionItemId',
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
                type: 'float',
                isNullable: true
            },
            {
                name: 'dateRegistered',
                type: 'timestamp',
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
    });

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(this.auctionTable,true);
        await queryRunner.createIndex('auction', new TableIndex({
            name: 'IDX_auctionSeller',
            columnNames: ['seller','realmName']
        }));
        await queryRunner.createIndex('auction', new TableIndex({
            name: 'IDX_auctionItem',
            columnNames: ['auctionItemId']
        }));
        
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable('item');
        const foreingKey = table!.foreignKeys.find(fk => fk.columnNames.indexOf('auctionItemId') !== -1);
        await queryRunner.dropForeignKey('item', foreingKey!);
        await queryRunner.dropIndex('auction', 'IDX_auctionSeller');
        await queryRunner.dropIndex('auction', 'IDX_auctionItem');
        await queryRunner.dropTable('auction');
    }
}
