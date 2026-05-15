import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1778823266311 implements MigrationInterface {
    name = 'Init1778823266311'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`quizzes\` ADD \`isDeleted\` tinyint NOT NULL DEFAULT 0`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`quizzes\` DROP COLUMN \`isDeleted\``);
    }

}
