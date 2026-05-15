import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1778822925621 implements MigrationInterface {
    name = 'Init1778822925621'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`quiz_questions\` ADD \`orderIndex\` int NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`quiz_questions\` DROP COLUMN \`orderIndex\``);
    }

}
