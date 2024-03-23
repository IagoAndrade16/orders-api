import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddDeletedColumnToProductsTable1711208892603 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query('ALTER TABLE products ADD COLUMN deleted BOOLEAN DEFAULT FALSE;');
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query('ALTER TABLE products DROP COLUMN deleted;');
	}
}
