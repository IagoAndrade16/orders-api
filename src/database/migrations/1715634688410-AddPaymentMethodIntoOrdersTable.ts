import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddPaymentMethodIntoOrdersTable1715634688410 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query('ALTER TABLE orders ADD COLUMN paymentMethod ENUM("cash", "credit-card", "pix", "debit-card") NULL DEFAULT NULL;');
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query('ALTER TABLE orders DROP COLUMN paymentMethod;');
	}
}
