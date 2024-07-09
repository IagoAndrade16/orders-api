import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddShippingIdInOrdersTable1720533540149 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			'ALTER TABLE orders ADD COLUMN shippingId VARCHAR(100) NOT NULL;',
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			'ALTER TABLE orders DROP COLUMN shippingId;',
		);
	}
}
