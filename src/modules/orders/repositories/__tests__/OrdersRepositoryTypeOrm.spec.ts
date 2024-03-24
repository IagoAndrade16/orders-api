import { find } from '../../../../core/DependencyInjection';
import { Database } from '../../../../database/Database';
import { Order } from '../../entities/Order';
import { OrdersRepository, ordersRepositoryAlias } from '../OrdersRepository';

const repository = find<OrdersRepository>(ordersRepositoryAlias);

beforeAll(async () => {
	await Database.initialize();
});

afterAll(async () => {
	await Database.close();
});

describe('create', () => {
	it('should create a new order', async () => {
		const newOrder = {
			userName: 'John Doe',
			userPhone: '123456789',
			userAddress: 'John Doe Street',
			products: [
				{
					productId: 'Product 1',
					quantityOfProduct: 1,
				},
				{
					productId: 'Product 2',
					quantityOfProduct: 2,
				},
			],
		};
		const order = await repository.create(newOrder);

		await Database.source.getRepository(Order).delete(order.id);

		expect(order.id).toBeDefined();
		expect(order.userName).toBe(newOrder.userName);
		expect(order.userPhone).toBe(newOrder.userPhone);
		expect(order.userAddress).toBe(newOrder.userAddress);
		expect(order.products).toEqual(newOrder.products);
	});
});
