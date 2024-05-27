import request from 'supertest';

import { find } from '../../../../core/DependencyInjection';
import { app } from '../../../../server/app';
import { TestUtils } from '../../../../utils/TestUtils';
import { OrderPaymentMethod, OrderStatus } from '../../entities/Order';
import { GetSingleOrderUseCase, GetSingleOrderUseCaseInput, GetSingleOrderUseCaseOutput } from '../../usecases/GetSingleOrderUseCase';

const route = '/orders/:id';

const userId = '-1';
let authToken: string;
beforeAll(async () => {
	authToken = await TestUtils.generateAuthToken(userId);
});

describe('Return 200', () => {
	const usecase = find(GetSingleOrderUseCase);
	const sampleOrderDTO: GetSingleOrderUseCaseInput = {
		orderId: '1',
	};

	it('should call usecase', async () => {
		jest.spyOn(usecase, 'execute').mockResolvedValue({
			createdAt: '2021-09-01T00:00:00.000Z',
			userAddress: 'address',
			userName: 'name',
			userEmail: 'email',
			products: [],
			userPhone: 'phone',
			paymentMethod: OrderPaymentMethod.CASH,
			id: '1',
			status: OrderStatus.DELIVERY_ROUTE,
		} as GetSingleOrderUseCaseOutput);

		const response = await request(app).get(route.replace(':id', '1')).set({
			Authorization: `${authToken}`,
		}).send(sampleOrderDTO);

		expect(response.status).toBe(200);
		expect(response.body).toEqual({
			createdAt: expect.any(String),
			id: '1',
			userAddress: 'address',
			userName: 'name',
			userPhone: 'phone',
			paymentMethod: OrderPaymentMethod.CASH,
			userEmail: 'email',
			products: [],
			status: OrderStatus.DELIVERY_ROUTE,
		});

		expect(usecase.execute).toBeCalledTimes(1);
		expect(usecase.execute).toBeCalledWith(sampleOrderDTO);
	});
});
