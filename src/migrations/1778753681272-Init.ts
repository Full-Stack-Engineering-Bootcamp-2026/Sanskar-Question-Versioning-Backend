import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1778753681272 implements MigrationInterface {
    name = 'Init1778753681272'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`question_options\` ADD \`publicId\` varchar(36) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`question_options\` ADD UNIQUE INDEX \`IDX_5001341ebb96c8cb46df45ffe8\` (\`publicId\`)`);
        await queryRunner.query(`ALTER TABLE \`quiz_questions\` ADD \`publicId\` varchar(36) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`quiz_questions\` ADD UNIQUE INDEX \`IDX_d51e7b1462e5c8df0759aa0b84\` (\`publicId\`)`);
        await queryRunner.query(`ALTER TABLE \`quizzes\` ADD \`publicId\` varchar(36) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`quizzes\` ADD UNIQUE INDEX \`IDX_afcbf19a5c6140f08f104bf394\` (\`publicId\`)`);
        await queryRunner.query(`ALTER TABLE \`quiz_attempts\` ADD \`publicId\` varchar(36) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`quiz_attempts\` ADD UNIQUE INDEX \`IDX_08244e7c9ab304266e6b4cca28\` (\`publicId\`)`);
        await queryRunner.query(`ALTER TABLE \`attempt_answers\` ADD \`publicId\` varchar(36) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`attempt_answers\` ADD UNIQUE INDEX \`IDX_cbfd5b7084020b42351f8400a4\` (\`publicId\`)`);
        await queryRunner.query(`ALTER TABLE \`question_versions\` ADD \`publicId\` varchar(36) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`question_versions\` ADD UNIQUE INDEX \`IDX_8000c759356795cc12d7f5addc\` (\`publicId\`)`);
        await queryRunner.query(`ALTER TABLE \`questions\` ADD \`publicId\` varchar(36) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`questions\` ADD UNIQUE INDEX \`IDX_668f5eb70e40649990ab58f839\` (\`publicId\`)`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`publicId\` varchar(36) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD UNIQUE INDEX \`IDX_9099c98f00a1b5aca6b8f7f04a\` (\`publicId\`)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` DROP INDEX \`IDX_9099c98f00a1b5aca6b8f7f04a\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`publicId\``);
        await queryRunner.query(`ALTER TABLE \`questions\` DROP INDEX \`IDX_668f5eb70e40649990ab58f839\``);
        await queryRunner.query(`ALTER TABLE \`questions\` DROP COLUMN \`publicId\``);
        await queryRunner.query(`ALTER TABLE \`question_versions\` DROP INDEX \`IDX_8000c759356795cc12d7f5addc\``);
        await queryRunner.query(`ALTER TABLE \`question_versions\` DROP COLUMN \`publicId\``);
        await queryRunner.query(`ALTER TABLE \`attempt_answers\` DROP INDEX \`IDX_cbfd5b7084020b42351f8400a4\``);
        await queryRunner.query(`ALTER TABLE \`attempt_answers\` DROP COLUMN \`publicId\``);
        await queryRunner.query(`ALTER TABLE \`quiz_attempts\` DROP INDEX \`IDX_08244e7c9ab304266e6b4cca28\``);
        await queryRunner.query(`ALTER TABLE \`quiz_attempts\` DROP COLUMN \`publicId\``);
        await queryRunner.query(`ALTER TABLE \`quizzes\` DROP INDEX \`IDX_afcbf19a5c6140f08f104bf394\``);
        await queryRunner.query(`ALTER TABLE \`quizzes\` DROP COLUMN \`publicId\``);
        await queryRunner.query(`ALTER TABLE \`quiz_questions\` DROP INDEX \`IDX_d51e7b1462e5c8df0759aa0b84\``);
        await queryRunner.query(`ALTER TABLE \`quiz_questions\` DROP COLUMN \`publicId\``);
        await queryRunner.query(`ALTER TABLE \`question_options\` DROP INDEX \`IDX_5001341ebb96c8cb46df45ffe8\``);
        await queryRunner.query(`ALTER TABLE \`question_options\` DROP COLUMN \`publicId\``);
    }

}
