import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddIsOwnerIntoUsersTable1715118114538 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query('ALTER TABLE users ADD COLUMN isOwner BOOLEAN NOT NULL DEFAULT FALSE;');
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query('ALTER TABLE users DROP COLUMN isOwner;');
	}
}
