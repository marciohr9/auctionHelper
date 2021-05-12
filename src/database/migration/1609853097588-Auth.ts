import {MigrationInterface, QueryBuilder, QueryRunner, TableColumn} from "typeorm";

export class Auth1609853097588 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn("auth", new TableColumn({
            name: "role",
            type: "enum",
            enum: ['ADMIN','USER', 'MANAGER'],
            isNullable: false,
            default: "'USER'"
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("auth","role");
    }

}
