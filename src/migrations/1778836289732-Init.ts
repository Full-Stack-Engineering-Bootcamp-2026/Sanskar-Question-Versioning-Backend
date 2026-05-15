import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1778836289732 implements MigrationInterface {
    name = 'Init1778836289732'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`quiz_attempts\` DROP COLUMN \`questionVersionMap\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`quiz_attempts\` ADD \`questionVersionMap\` json NOT NULL`);
    }

}
