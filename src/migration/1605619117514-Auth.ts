import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class Auth1605619117514 implements MigrationInterface {

    private authTable = new Table({
        name: 'auth',
        columns: [
            {
                name: 'id',
                type: 'int',
                isPrimary: true,
                generationStrategy: 'increment',
                isNullable: false
            },
            {
                name: 'bnetToken',
                type: 'varchar',
                length: '250',
                isNullable: true,
                isUnique: true
            },
            {
                name: 'googleToken',
                type: 'varchar',
                length: '250',
                isNullable: true,
                isUnique: true
            },
            {
                name: 'pwdHash',
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
        await queryRunner.createTable(this.authTable,true);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('auth');
    }

}
