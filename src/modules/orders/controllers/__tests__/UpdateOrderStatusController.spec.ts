import request from 'supertest';

import { find } from '../../../../core/DependencyInjection';
import { app } from '../../../../server/app';
import { OrderStatus } from '../../entities/Order';
import { UpdateOrderStatusUseCase, UpdateOrderStatusUseCaseInput } from '../../usecases/UpdateOrderStatusUseCase';

const route = '/orders/:orderId/status';

describe('Schema validation', () => {
	it('should require necessary parameters', async () => {
		const response = await request(app).patch(route.replace(':orderId', '123')).send();

		expect(response.status).toBe(400);

		expect(response.body).toHaveProperty('newStatus');
	});
});

describe('Return 204', () => {
	const usecase = find(UpdateOrderStatusUseCase);
	const sampleOrderDTO: UpdateOrderStatusUseCaseInput = {
		newStatus: OrderStatus.DELIVERY_ROUTE,
		orderId: 'ORDER_ID',
	};

	it('should call usecase', async () => {
		jest.spyOn(usecase, 'execute').mockResolvedValue();

		const response = await request(app).patch(route.replace(':orderId', sampleOrderDTO.orderId)).send(sampleOrderDTO);

		expect(response.status).toBe(204);

		expect(usecase.execute).toBeCalledTimes(1);
		expect(usecase.execute).toBeCalledWith(sampleOrderDTO);
	});
});
