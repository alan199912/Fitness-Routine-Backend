import { MigrationInterface, QueryRunner } from 'typeorm';

export class insertDataDaysTable1676911138705 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`INSERT INTO days (name) VALUES ('Monday')`);
    await queryRunner.query(`INSERT INTO days (name) VALUES ('Tuesday')`);
    await queryRunner.query(`INSERT INTO days (name) VALUES ('Wednesday')`);
    await queryRunner.query(`INSERT INTO days (name) VALUES ('Thursday')`);
    await queryRunner.query(`INSERT INTO days (name) VALUES ('Friday')`);
    await queryRunner.query(`INSERT INTO days (name) VALUES ('Saturday')`);
    await queryRunner.query(`INSERT INTO days (name) VALUES ('Sunday')`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM days WHERE name = 'Monday'`);
    await queryRunner.query(`DELETE FROM days WHERE name = 'Tuesday'`);
    await queryRunner.query(`DELETE FROM days WHERE name = 'Wednesday'`);
    await queryRunner.query(`DELETE FROM days WHERE name = 'Thursday'`);
    await queryRunner.query(`DELETE FROM days WHERE name = 'Friday'`);
    await queryRunner.query(`DELETE FROM days WHERE name = 'Saturday'`);
    await queryRunner.query(`DELETE FROM days WHERE name = 'Sunday'`);
  }
}
