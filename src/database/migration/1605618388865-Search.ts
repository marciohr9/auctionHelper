import { table } from "console";
import {MigrationInterface, QueryRunner, Table, TableForeignKey, TableIndex} from "typeorm";

export class Search1605618388865 implements MigrationInterface {

    private searchTable = new Table({
        name: 'search',
        columns: [
            {
                name: 'id',
                type: 'int',
                isPrimary: true,
                isGenerated: true,
                generationStrategy: 'increment'
            },
            {
                name: 'dateSearch',
                type: 'timestamp',
                isNullable: false,
                default: 'now()'
            },
            {
                name: 'searchItemId',
                type: 'int',
                isNullable: false
            },
            {
                name: 'userId',
                type: 'int',
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
    })
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(this.searchTable, true);
        await queryRunner.createIndex('search', new TableIndex({
            name: 'IDX_searchedItem',
            columnNames: ['searchItemId']
        }));
        await queryRunner.createIndex('search', new TableIndex({
            name: 'IDX_searchUser',
            columnNames: ['userId']
        }));
        await queryRunner.createForeignKey('search', new TableForeignKey({
            columnNames: ['userId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'user'
        }));
        
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const tb1 = await queryRunner.getTable('user');
        const tb2 = await queryRunner.getTable('item');
        const fk1 = tb1!.foreignKeys.find(fk => fk.columnNames.indexOf('userId') !== -1);
        const fk2 = tb2!.foreignKeys.find(fk => fk.columnNames.indexOf('searchItemId') !== -1);
        await queryRunner.dropForeignKey('user', fk1!);
        await queryRunner.dropForeignKey('item', fk2!);
        await queryRunner.dropIndex('search', 'IDX_searchedItem');
        await queryRunner.dropIndex('search', 'IDX_searchUser');
        await queryRunner.dropTable('search');
    }
}
