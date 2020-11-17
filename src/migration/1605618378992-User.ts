import {MigrationInterface, QueryRunner, Table, TableForeignKey, TableIndex} from "typeorm";

export class User1605618378992 implements MigrationInterface {

    private userTable = new Table({
        name: 'user',
        columns: [
            {
                name: 'id',
                type: 'int',
                isPrimary: true,
                generationStrategy: 'increment',
            },
            {
                name: 'uuid',
                type: 'varchar',
                generationStrategy: 'uuid',
                default:'uuid_generate_v4()',
                isNullable: false
            },
            {
                name: 'name',
                type: 'varchar',
                length: '100',
                isNullable: false
            },
            {
                name: 'email',
                type: 'varchar',
                isNullable: false,
                isUnique: true
            },
            {
                name:'phone',
                type: 'int',
                isNullable: true,
                isUnique: true
            },
            {
                name: 'bnetId',
                type: 'varchar',
                isNullable: false,
                isUnique: true,
                length: '50'
            },
            {
                name: 'authId',
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
    });

    public async up(queryRunner: QueryRunner): Promise<void> {
        
        await queryRunner.createTable(this.userTable,true);

        await queryRunner.createIndex("user", new TableIndex({
            name: "IDX_USER",
            columnNames: ["name","email"]
        }));
        await queryRunner.createForeignKey("user", new TableForeignKey({
            columnNames: ['authId'],
            referencedColumnNames: ['id'],
            referencedTableName: "auth",
            onDelete: "CASCADE"
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable("auth");
        const foreingKey = table!.foreignKeys.find(fk => fk.columnNames.indexOf("authId") !== -1)
        await queryRunner.dropForeignKey('user', foreingKey!);
        await queryRunner.dropColumn('user', 'authId');
        await queryRunner.dropIndex('user','IDX_USER');
        await queryRunner.dropTable('user');
    }

}
