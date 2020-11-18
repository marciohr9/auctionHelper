import {MigrationInterface, QueryRunner, Table, TableForeignKey, TableIndex} from "typeorm";

export class SearchAuctions1605619316121 implements MigrationInterface {

    private searchAuctionTable = new Table({
        name: 'searchAuction',
        columns: [
            {
                name: 'id',
                type: 'int',
                isPrimary: true,
                generationStrategy: 'increment'
            },
            {
                name: 'searchId',
                type: 'int',
                isNullable: false
            },
            {
                name: 'auctionId',
                type: 'int',
                isNullable: false
            },
            {
                name: 'created_at',
                type: 'timestamp',
                isNullable: false,
                default: 'now()'
            },
            {
                name: 'updated_at',
                type: 'timestamp',
                isNullable: false,
                default: 'now()'
            },
            {
                name: 'deleted_at',
                type: 'timestamp',
                isNullable: true
            }
        ]
    })

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(this.searchAuctionTable, true);
        await queryRunner.createIndex('searchAuction', new TableIndex({
            name: 'IDX_searchs',
            columnNames: ['searchId']
        }));
        await queryRunner.createForeignKey('searchAuction', new TableForeignKey({
            columnNames: ['searchId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'search'
        }));
        await queryRunner.createForeignKey('searchAuction', new TableForeignKey({
            columnNames: ['auctionId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'auction'
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const tb1 = await queryRunner.getTable('search');
        const tb2 = await queryRunner.getTable('auction');
        const fk1 = tb1!.foreignKeys.find(fk => fk.columnNames.indexOf('searchId') !== -1);
        const fk2 = tb2!.foreignKeys.find(fk => fk.columnNames.indexOf('auctionId') !== -1);
        await queryRunner.dropForeignKey('search', fk1!);
        await queryRunner.dropForeignKey('auction', fk2!);
        await queryRunner.dropIndex('searchAuction', 'IDX_searchs');
        await queryRunner.dropTable('searchAuction');
    }

}
