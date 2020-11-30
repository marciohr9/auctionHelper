import {MigrationInterface, QueryRunner, Table, TableForeignKey, TableIndex} from "typeorm";

export class User1605618378992 implements MigrationInterface {

    private userTable = new Table({
        name: 'user',
        columns: [
            {
                name: 'id',
                type: 'int',
                isPrimary: true,
                isGenerated: true,
                generationStrategy: 'increment',
            },
            {
                name: 'uuid',
                type: 'varchar',
                isUnique: true,
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
                type: 'varchar',
                length: '50',
                isNullable: true,
                isUnique: true
            },
            {
                name: 'bnetId',
                type: 'varchar',
                length: '50',
                isNullable: false,
                isUnique: true           
            },
            {
                name: 'authId',
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
    });

    public async up(queryRunner: QueryRunner): Promise<void> {
        
        await queryRunner.createTable(this.userTable,true);

        await queryRunner.createIndex("user", new TableIndex({
            name: "IDX_searchUser",
            columnNames: ["name","email"]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable("auth");
        const foreingKey = table!.foreignKeys.find(fk => fk.columnNames.indexOf("authId") !== -1)
        await queryRunner.dropForeignKey('user', foreingKey!);
        await queryRunner.dropColumn('user', 'authId');
        await queryRunner.dropIndex('user','IDX_searchUser');
        await queryRunner.dropTable('user');
    }

}
