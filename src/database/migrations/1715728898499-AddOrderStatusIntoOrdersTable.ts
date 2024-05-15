import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddOrderStatusIntoOrdersTable1715728898499 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query('ALTER TABLE orders ADD COLUMN status VARCHAR(255) NULL DEFAULT NULL;');
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query('ALTER TABLE orders DROP COLUMN status;');
	}
}
