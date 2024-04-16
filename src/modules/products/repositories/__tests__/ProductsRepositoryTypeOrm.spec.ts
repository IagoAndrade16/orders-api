import { find } from '../../../../core/DependencyInjection';
import { Database } from '../../../../database/Database';
import { ProductsRepository, productsRepositoryAlias } from '../ProductsRepository';

const repository = find<ProductsRepository>(productsRepositoryAlias);

beforeAll(async () => {
	await Database.initialize();
});

afterAll(async () => {
	await Database.close();
});

describe('insert', () => {
	it('should insert a product', async () => {
		const product = await repository.insert({
			name: 'Product',
			description: 'Description',
			price: 10,
			imageUrl: 'http://image.com/image.png',
			userId: 'user-id',
		});

		await Database.source.getRepository('Product').delete(product.id);

		expect(product).toMatchObject({
			id: expect.any(String),
			name: 'Product',
			description: 'Description',
			price: 10,
			imageUrl: 'http://image.com/image.png',
			createdAt: expect.any(Date),
			updatedAt: expect.any(Date),
		});
	});
});

describe('updateById', () => {
	it('should update a product', async () => {
		const product = await repository.insert({
			name: 'Product',
			description: 'Description',
			price: 10,
			imageUrl: 'http://image.com/image.png',
			userId: 'user-id',
		});

		await repository.updateById(product.id, {
			name: 'Product Updated',
			description: 'Description Updated',
			price: 20,
			imageUrl: 'http://image.com/image-updated.png',
		});

		const updatedProduct = await Database.source.getRepository('Product').findOne({
			where: {
				id: product.id,
			},
		});

		await Database.source.getRepository('Product').delete(product.id);

		expect(updatedProduct).toMatchObject({
			id: product.id,
			name: 'Product Updated',
			description: 'Description Updated',
			price: 20,
			imageUrl: 'http://image.com/image-updated.png',
			createdAt: expect.any(Date),
			updatedAt: expect.any(Date),
		});
	});
});

describe('findById', () => {
	it('should not find a product by id', async () => {
		const product = await repository.findById('id');

		expect(product).toBeNull();
	});

	it('should find a product by id', async () => {
		const product = await repository.insert({
			name: 'Product',
			description: 'Description',
			price: 10,
			imageUrl: 'http://image.com/image.png',
			userId: 'user-id',
		});

		const foundProduct = await repository.findById(product.id);

		await Database.source.getRepository('Product').delete(product.id);

		expect(foundProduct).toMatchObject({
			id: product.id,
			name: 'Product',
			description: 'Description',
			price: 10,
			imageUrl: 'http://image.com/image.png',
			createdAt: expect.any(Date),
			updatedAt: expect.any(Date),
		});
	});
});

describe('fetchItems', () => {
	it('should fetch items', async () => {
		const product1 = await repository.insert({
			name: 'Product 1',
			description: 'Description 1',
			price: 10,
			imageUrl: 'http://image.com/image1.png',
			userId: 'user-id',
		});

		const product2 = await repository.insert({
			name: 'Product 2',
			description: 'Description 2',
			price: 20,
			imageUrl: 'http://image.com/image2.png',
			userId: 'user-id',
		});

		const products = await repository.fetchItems({ page: 1, pageSize: 1000 });

		await Database.source.getRepository('Product').delete(product1.id);
		await Database.source.getRepository('Product').delete(product2.id);

		expect(products.map((product) => product.id)).toContain(product1.id);
	});

	describe('with name filter', () => {
		it('should fetch items', async () => {
			const product1 = await repository.insert({
				name: 'Product 1',
				description: 'Description 1',
				price: 10,
				imageUrl: 'http://image.com/image1.png',
				userId: 'user-id',
			});

			const product2 = await repository.insert({
				name: 'Product 2',
				description: 'Description 2',
				price: 20,
				imageUrl: 'http://image.com/image2.png',
				userId: 'user-id',
			});

			const products = await repository.fetchItems({ page: 1, pageSize: 1000, name: 'Product 1' });

			await Database.source.getRepository('Product').delete(product1.id);
			await Database.source.getRepository('Product').delete(product2.id);

			expect(products.map((product) => product.id)).toContain(product1.id);
		});
	});
});

describe('delete', () => {
	it('should delete a product', async () => {
		const product = await repository.insert({
			name: 'Product',
			description: 'Description',
			price: 10,
			imageUrl: 'http://image.com/image.png',
			userId: 'user-id',
		});

		await repository.delete(product.id);

		const deletedProduct = await Database.source.getRepository('Product').findOne({
			where: {
				id: product.id,
			},
		});

		await Database.source.getRepository('Product').delete(product.id);

		expect(deletedProduct).toMatchObject({
			id: product.id,
			deleted: true,
			deletedAt: expect.any(Date),
		});
	});
});

describe('countItems', () => {
	it('should count items', async () => {
		const product1 = await repository.insert({
			name: 'Product 1',
			description: 'Description 1',
			price: 10,
			imageUrl: 'http://image.com/image1.png',
			userId: 'user-id',
		});

		const product2 = await repository.insert({
			name: 'Product 2',
			description: 'Description 2',
			price: 20,
			imageUrl: 'http://image.com/image2.png',
			userId: 'user-id',
		});

		const count = await repository.countItems({});

		await Database.source.getRepository('Product').delete(product1.id);
		await Database.source.getRepository('Product').delete(product2.id);

		expect(count).toBeGreaterThanOrEqual(2);
	});

	describe('with name filter', () => {
		it('should count items', async () => {
			const product1 = await repository.insert({
				name: 'Product 1',
				description: 'Description 1',
				price: 10,
				imageUrl: 'http://image.com/image1.png',
				userId: 'user-id',
			});

			const product2 = await repository.insert({
				name: 'Product 2',
				description: 'Description 2',
				price: 20,
				imageUrl: 'http://image.com/image2.png',
				userId: 'user-id',
			});

			const count = await repository.countItems({ name: 'Product 1' });

			await Database.source.getRepository('Product').delete(product1.id);
			await Database.source.getRepository('Product').delete(product2.id);

			expect(count).toBe(1);
		});
	});
});
