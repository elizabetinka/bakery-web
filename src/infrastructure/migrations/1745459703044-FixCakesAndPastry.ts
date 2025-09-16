import { MigrationInterface, QueryRunner } from "typeorm";

export class FixCakesAndPastry1745459703044 implements MigrationInterface {
    name = 'FixCakesAndPastry1745459703044'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pastry" ADD "isAvailable" boolean NOT NULL DEFAULT true`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pastry" DROP COLUMN "isAvailable"`);
    }

}
