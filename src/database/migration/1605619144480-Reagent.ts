import {MigrationInterface, QueryRunner, Table, TableForeignKey, TableIndex} from "typeorm";

export class Reagent1605619144480 implements MigrationInterface {

    private reagentTable = new Table({
        name: 'reagentToItem',
        columns: [
            {
                name: 'id',
                type: 'int',
                isPrimary: true,
                generationStrategy: 'increment'
            },
            {
                name: 'craftedId',
                type: 'int',
                isNullable: false
            },
            {
                name: 'reagentId',
                type: 'int',
                isNullable: false
            },
            {
                name: 'quantity',
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
        await queryRunner.createTable(this.reagentTable, true);
        await queryRunner.createIndex('reagentToItem', new TableIndex({
            name: 'IDX_Reagents',
            columnNames: ['craftedId']
        }));
        await queryRunner.createIndex('reagentToItem', new TableIndex({
            name: 'IDX_Crafteds',
            columnNames: ['reagentId']
        }));
        await queryRunner.createForeignKey('reagentToItem', new TableForeignKey({
            columnNames: ['craftedId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'item'
        }));
        await queryRunner.createForeignKey('reagentToItem', new TableForeignKey({
            columnNames: ['reagentId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'item'
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable('item')
        const foreingKey1 = table!.foreignKeys.find(fk => fk.columnNames.indexOf("reagentId") !== -1);
        const foreingKey2 = table!.foreignKeys.find(fk => fk.columnNames.indexOf("craftedId") !== -1);
        await queryRunner.dropForeignKey('item', foreingKey1!);
        await queryRunner.dropForeignKey('item', foreingKey2!);
        await queryRunner.dropIndex('reagentToItem', 'IDX_Reagents');
        await queryRunner.dropIndex('reagentToItem', 'IDX_Crafteds');
        await queryRunner.dropTable('reagentToItem');
    }

}
