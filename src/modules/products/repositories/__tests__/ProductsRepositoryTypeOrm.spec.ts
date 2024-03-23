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
