import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateOrdersTable1711301120411 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'orders',
				columns: [
					{
						name: 'id',
						type: 'varchar',
						isPrimary: true,
						length: '100',
					},
					{
						name: 'userName',
						type: 'varchar',
						length: '100',
					},
					{
						name: 'userPhone',
						type: 'varchar',
						length: '45',
					},
					{
						name: 'userAddress',
						type: 'text',
					},
					{
						name: 'products',
						type: 'json',
					},
					{
						name: 'createdAt',
						type: 'datetime',
						default: 'now()',
					},
					{
						name: 'updatedAt',
						type: 'datetime',
						default: 'now()',
					},
				],
			}),
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('orders');
	}
}
