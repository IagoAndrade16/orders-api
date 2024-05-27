import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateProductsReporTable1716844727041 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'products_report',
				columns: [
					{
						name: 'id',
						type: 'varchar',
						isPrimary: true,
						length: '100',
					},
					{
						name: 'productId',
						type: 'varchar',
						length: '100',
					},
					{
						name: 'quantity',
						type: 'int',
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
					},
				],
			}),
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('products_report');
	}
}
