import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateShippingTable1720048702051 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'shipping',
				columns: [
					{
						name: 'id',
						type: 'varchar',
						isPrimary: true,
						length: '100',
					},
					{
						name: 'city',
						type: 'varchar',
						length: '100',
					},
					{
						name: 'value',
						type: 'float',
					},
					{
						name: 'createdAt',
						type: 'timestamp',
						default: 'now()',
					},
					{
						name: 'updatedAt',
						type: 'timestamp',
						default: 'now()',
						onUpdate: 'CURRENT_TIMESTAMP',
					},
				],
			}),
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('shipping');
	}
}
