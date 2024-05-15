import { find } from '../../../../core/DependencyInjection';
import { Database } from '../../../../database/Database';
import { Order, OrderPaymentMethod } from '../../entities/Order';
import { CreateOrderDTO, OrdersRepository, ordersRepositoryAlias } from '../OrdersRepository';

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
			userEmail: 'email@email.com',
			paymentMethod: OrderPaymentMethod.CASH,
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

describe('fetchItems', () => {
	it('should fetch items', async () => {
		const order1 = await repository.create({
			userName: 'Product 1',
			userAddress: 'address 1',
			userEmail: 'email@email.com',
			userPhone: '123456789',
			paymentMethod: OrderPaymentMethod.CASH,

			products: [
				{
					productId: 'Product 1',
					quantityOfProduct: 1,
				},
			],
		});

		const order2 = await repository.create({
			userName: 'Product 2',
			userAddress: 'address 2',
			userEmail: 'email@email.com',
			userPhone: '123456789',
			paymentMethod: OrderPaymentMethod.CASH,

			products: [
				{
					productId: 'Product 2',
					quantityOfProduct: 2,
				},
			],
		});

		const orders = await repository.fetchItems({ page: 1, pageSize: 1000 });

		await Database.source.getRepository(Order).delete(order1.id);
		await Database.source.getRepository(Order).delete(order2.id);

		expect(orders.map((order) => order.id)).toContain(order1.id);
	});

	describe('when filters by email', () => {
		it('should return orders with email provided', async () => {
			const order1 = await repository.create({
				userName: 'Product 1',
				userAddress: 'address 1',
				userEmail: 'email@email.com',
				userPhone: '123456789',
				paymentMethod: OrderPaymentMethod.CASH,

				products: [
					{
						productId: 'Product 1',
						quantityOfProduct: 1,
					},
				],
			});

			const order2 = await repository.create({
				userName: 'Product 2',
				userAddress: 'address 2',
				userEmail: 'email1@email.com',
				userPhone: '123456789',
				paymentMethod: OrderPaymentMethod.CASH,
				products: [
					{
						productId: 'Product 2',
						quantityOfProduct: 2,
					},
				],
			});

			const orders = await repository.fetchItems({ page: 1, pageSize: 1000, email: order1.userEmail });

			await Database.source.getRepository(Order).delete(order1.id);
			await Database.source.getRepository(Order).delete(order2.id);

			expect(orders.map((order) => order.id)).toContain(order1.id);
		});
	});
});

describe('findById', () => {
	it('should return null if order not exists', async () => {
		const order = await repository.findById('non-existing-id');

		expect(order).toBeNull();
	});

	it('should return order if founded', async () => {
		const newOrder: CreateOrderDTO = {
			userName: 'John Doe',
			userPhone: '123456789',
			userEmail: 'email@email.com',
			paymentMethod: OrderPaymentMethod.CASH,
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
			userAddress: 'John Doe Street',
		};

		const insertedOrder = await repository.create(newOrder);

		const order = await repository.findById(insertedOrder.id);

		await Database.source.getRepository(Order).delete(insertedOrder.id);

		expect(order).toMatchObject(insertedOrder);
	});
});

describe('updateById', () => {
	it('should update order', async () => {
		const order: CreateOrderDTO = {
			userName: 'John Doe',
			userPhone: '123456789',
			paymentMethod: OrderPaymentMethod.CASH,
			userEmail: 'iago@email.com',
			userAddress: 'John Doe Street',
			products: [],
		};

		const insertedOrder = await repository.create(order);

		await repository.updateById(insertedOrder.id, { userName: 'Iago' });

		const updatedOrder = await repository.findById(insertedOrder.id);

		await Database.source.getRepository(Order).delete(insertedOrder.id);

		expect(updatedOrder?.userName).toBe('Iago');
	});
});
