import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddCreatedAtUpdatedAtToUsersDays1677451551595 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
          ALTER TABLE users_days
          ADD COLUMN createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          ADD COLUMN updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
          ALTER TABLE users_days
          DROP COLUMN createdAt,
          DROP COLUMN updatedAt
        `);
  }
}
