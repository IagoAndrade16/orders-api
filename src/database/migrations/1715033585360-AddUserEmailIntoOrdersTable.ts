import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUserEmailIntoOrdersTable1715033585360 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query('ALTER TABLE orders ADD COLUMN userEmail VARCHAR(100) NOT NULL;');
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query('ALTER TABLE orders DROP COLUMN userEmail;');
	}
}
