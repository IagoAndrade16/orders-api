import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddDeletedAtColumnToProductsTable1711208926263 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query('ALTER TABLE products ADD COLUMN deletedAt DATETIME NULL DEFAULT NULL;');
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query('ALTER TABLE products DROP COLUMN deletedAt;');
	}
}
