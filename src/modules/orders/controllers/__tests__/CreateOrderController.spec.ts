import request from 'supertest';
import { v4 as uuid } from 'uuid';

import { find } from '../../../../core/DependencyInjection';
import { app } from '../../../../server/app';
import { Order } from '../../entities/Order';
import { CreateOrderUseCase, CreateOrderUseCaseInput } from '../../usecases/CreateOrderUseCase';

const route = '/orders';

describe('Schema validation', () => {
	it('should require necessary parameters', async () => {
		const response = await request(app).post(route).send();

		expect(response.status).toBe(400);

		expect(response.body).toHaveProperty('userName');
		expect(response.body).toHaveProperty('userPhone');
		expect(response.body).toHaveProperty('userAddress');
		expect(response.body).toHaveProperty('products');
	});
});

describe('Return 201', () => {
	const usecase = find(CreateOrderUseCase);
	const sampleOrderDTO: CreateOrderUseCaseInput = {
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

	it('should call usecase', async () => {
		const order = { id: uuid() } as Order;
		jest.spyOn(usecase, 'execute').mockResolvedValue(order);

		const response = await request(app).post(route).send(sampleOrderDTO);

		expect(response.status).toBe(201);
		expect(response.body).toEqual(order);

		expect(usecase.execute).toBeCalledTimes(1);
		expect(usecase.execute).toBeCalledWith(sampleOrderDTO);
	});
});
