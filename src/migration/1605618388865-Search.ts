import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class Search1605618388865 implements MigrationInterface {

    private searchTable = new Table({
        name: 'search',
        columns: [
            {
                name: 'id',
                type: 'int',
                isPrimary: true,
                generationStrategy: 'increment'
            },
            {
                name: 'dateSearch',
                type: 'timestamptz',
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
        await queryRunner.createTable(this.searchTable, true);
        
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
