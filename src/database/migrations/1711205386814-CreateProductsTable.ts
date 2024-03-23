import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateProductsTable1711205386814 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'products',
				columns: [
					{
						name: 'id',
						type: 'varchar',
						isPrimary: true,
						length: '100',
					},
					{
						name: 'name',
						type: 'varchar',
						length: '100',
						isNullable: false,
					},
					{
						name: 'description',
						type: 'text',
						isNullable: false,
					},
					{
						name: 'price',
						type: 'float',
						isNullable: false,
						default: 0,
					},
					{
						name: 'imageUrl',
						type: 'text',
						isNullable: true,
						default: null,
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
		await queryRunner.dropTable('products');
	}
}
