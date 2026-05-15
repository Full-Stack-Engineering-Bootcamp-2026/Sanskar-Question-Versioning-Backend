import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1778836407588 implements MigrationInterface {
    name = 'Init1778836407588'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`attempt_answers\` DROP FOREIGN KEY \`FK_76e6a7dc4c1894250800077e79b\``);
        await queryRunner.query(`ALTER TABLE \`quiz_attempts\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`quiz_attempts\` DROP COLUMN \`id\``);
        await queryRunner.query(`ALTER TABLE \`quiz_attempts\` ADD \`id\` int NOT NULL PRIMARY KEY AUTO_INCREMENT`);
        await queryRunner.query(`ALTER TABLE \`attempt_answers\` DROP COLUMN \`attemptId\``);
        await queryRunner.query(`ALTER TABLE \`attempt_answers\` ADD \`attemptId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`attempt_answers\` ADD CONSTRAINT \`FK_76e6a7dc4c1894250800077e79b\` FOREIGN KEY (\`attemptId\`) REFERENCES \`quiz_attempts\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`attempt_answers\` DROP FOREIGN KEY \`FK_76e6a7dc4c1894250800077e79b\``);
        await queryRunner.query(`ALTER TABLE \`attempt_answers\` DROP COLUMN \`attemptId\``);
        await queryRunner.query(`ALTER TABLE \`attempt_answers\` ADD \`attemptId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`quiz_attempts\` DROP COLUMN \`id\``);
        await queryRunner.query(`ALTER TABLE \`quiz_attempts\` ADD \`id\` varchar(36) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`quiz_attempts\` ADD PRIMARY KEY (\`id\`)`);
        await queryRunner.query(`ALTER TABLE \`attempt_answers\` ADD CONSTRAINT \`FK_76e6a7dc4c1894250800077e79b\` FOREIGN KEY (\`attemptId\`) REFERENCES \`quiz_attempts\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
