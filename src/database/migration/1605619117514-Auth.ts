import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class Auth1605619117514 implements MigrationInterface {

    private authTable = new Table({
        name: 'auth',
        columns: [
            {
                name: 'id',
                type: 'int',
                isPrimary: true,
                isGenerated: true,
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
        await queryRunner.createTable(this.authTable,true);
        await queryRunner.createForeignKey("user", new TableForeignKey({
            columnNames: ['authId'],
            referencedColumnNames: ['id'],
            referencedTableName: "auth",
            onDelete: "CASCADE"
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('auth');
    }

}
