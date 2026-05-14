import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1778749455523 implements MigrationInterface {
    name = 'Init1778749455523'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`question_options\` (\`id\` int NOT NULL AUTO_INCREMENT, \`optionText\` varchar(255) NOT NULL, \`questionVersionId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`quiz_questions\` (\`id\` varchar(36) NOT NULL, \`quizId\` int NULL, \`questionId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`quizzes\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`createdById\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`quiz_attempts\` (\`id\` varchar(36) NOT NULL, \`attemptNumber\` int NOT NULL, \`status\` enum ('IN_PROGRESS', 'SUBMITTED') NOT NULL DEFAULT 'IN_PROGRESS', \`questionVersionMap\` json NOT NULL, \`startedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`submittedAt\` datetime NULL, \`quizId\` int NULL, \`userId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`attempt_answers\` (\`id\` int NOT NULL AUTO_INCREMENT, \`questionSnapshot\` json NOT NULL, \`userAnswer\` json NOT NULL, \`attemptId\` varchar(36) NULL, \`questionId\` int NULL, \`questionVersionId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`question_versions\` (\`id\` int NOT NULL AUTO_INCREMENT, \`versionNumber\` int NOT NULL, \`questionText\` text NOT NULL, \`answerType\` enum ('SINGLE_SELECT', 'MULTI_SELECT', 'TEXT') NOT NULL, \`isActive\` tinyint NOT NULL DEFAULT 1, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`questionId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`questions\` (\`id\` int NOT NULL AUTO_INCREMENT, \`isDeleted\` tinyint NOT NULL DEFAULT 0, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`createdById\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`role\` enum ('ADMIN', 'USER') NOT NULL DEFAULT 'USER', \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`question_options\` ADD CONSTRAINT \`FK_9603921362dc02d60f7e779b6ea\` FOREIGN KEY (\`questionVersionId\`) REFERENCES \`question_versions\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`quiz_questions\` ADD CONSTRAINT \`FK_8889ccc5a40989ea308a588870e\` FOREIGN KEY (\`quizId\`) REFERENCES \`quizzes\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`quiz_questions\` ADD CONSTRAINT \`FK_2deb89a4271b6f0e1aa30c2b07a\` FOREIGN KEY (\`questionId\`) REFERENCES \`questions\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`quizzes\` ADD CONSTRAINT \`FK_e3eb6001c54316dd29d4ba32de4\` FOREIGN KEY (\`createdById\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`quiz_attempts\` ADD CONSTRAINT \`FK_23f2bbe9288b221b1b377372782\` FOREIGN KEY (\`quizId\`) REFERENCES \`quizzes\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`quiz_attempts\` ADD CONSTRAINT \`FK_ff7b1d71fabdc7e1f4aff552859\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`attempt_answers\` ADD CONSTRAINT \`FK_76e6a7dc4c1894250800077e79b\` FOREIGN KEY (\`attemptId\`) REFERENCES \`quiz_attempts\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`attempt_answers\` ADD CONSTRAINT \`FK_382ef7a450def2331b236e49268\` FOREIGN KEY (\`questionId\`) REFERENCES \`questions\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`attempt_answers\` ADD CONSTRAINT \`FK_c9d95a252926540d3239baba051\` FOREIGN KEY (\`questionVersionId\`) REFERENCES \`question_versions\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`question_versions\` ADD CONSTRAINT \`FK_78bb84eef58e712e849d491290d\` FOREIGN KEY (\`questionId\`) REFERENCES \`questions\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`questions\` ADD CONSTRAINT \`FK_0483ccbf84f12cc70caff7b9075\` FOREIGN KEY (\`createdById\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`questions\` DROP FOREIGN KEY \`FK_0483ccbf84f12cc70caff7b9075\``);
        await queryRunner.query(`ALTER TABLE \`question_versions\` DROP FOREIGN KEY \`FK_78bb84eef58e712e849d491290d\``);
        await queryRunner.query(`ALTER TABLE \`attempt_answers\` DROP FOREIGN KEY \`FK_c9d95a252926540d3239baba051\``);
        await queryRunner.query(`ALTER TABLE \`attempt_answers\` DROP FOREIGN KEY \`FK_382ef7a450def2331b236e49268\``);
        await queryRunner.query(`ALTER TABLE \`attempt_answers\` DROP FOREIGN KEY \`FK_76e6a7dc4c1894250800077e79b\``);
        await queryRunner.query(`ALTER TABLE \`quiz_attempts\` DROP FOREIGN KEY \`FK_ff7b1d71fabdc7e1f4aff552859\``);
        await queryRunner.query(`ALTER TABLE \`quiz_attempts\` DROP FOREIGN KEY \`FK_23f2bbe9288b221b1b377372782\``);
        await queryRunner.query(`ALTER TABLE \`quizzes\` DROP FOREIGN KEY \`FK_e3eb6001c54316dd29d4ba32de4\``);
        await queryRunner.query(`ALTER TABLE \`quiz_questions\` DROP FOREIGN KEY \`FK_2deb89a4271b6f0e1aa30c2b07a\``);
        await queryRunner.query(`ALTER TABLE \`quiz_questions\` DROP FOREIGN KEY \`FK_8889ccc5a40989ea308a588870e\``);
        await queryRunner.query(`ALTER TABLE \`question_options\` DROP FOREIGN KEY \`FK_9603921362dc02d60f7e779b6ea\``);
        await queryRunner.query(`DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`users\``);
        await queryRunner.query(`DROP TABLE \`users\``);
        await queryRunner.query(`DROP TABLE \`questions\``);
        await queryRunner.query(`DROP TABLE \`question_versions\``);
        await queryRunner.query(`DROP TABLE \`attempt_answers\``);
        await queryRunner.query(`DROP TABLE \`quiz_attempts\``);
        await queryRunner.query(`DROP TABLE \`quizzes\``);
        await queryRunner.query(`DROP TABLE \`quiz_questions\``);
        await queryRunner.query(`DROP TABLE \`question_options\``);
    }

}
