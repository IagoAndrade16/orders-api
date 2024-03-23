import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUserIdToProductsTable1711209024851 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query('ALTER TABLE products ADD COLUMN userId VARCHAR(100) NOT NULL;');
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query('ALTER TABLE products DROP COLUMN userId;');
	}
}
