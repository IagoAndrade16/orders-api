import request from 'supertest';
import { v4 as uuid } from 'uuid';

import { find } from '../../../../core/DependencyInjection';
import { app } from '../../../../server/app';
import { TestUtils } from '../../../../utils/TestUtils';
import { Order } from '../../entities/Order';
import { FetchOrdersUseCase } from '../../usecases/FetchOrdersUseCase';

let authToken: string;
const userId = '-1';
const page = 1;
const pageSize = 10;
const route = `/orders/fetch?page=${page}&pageSize=${pageSize}`;

const usecase = find(FetchOrdersUseCase);

beforeAll(async () => {
	authToken = await TestUtils.generateAuthToken(userId);
});

describe('Return 200', () => {
	it('should call usecase', async () => {
		const order = { id: uuid() } as Order;
		jest.spyOn(usecase, 'execute').mockResolvedValue({
			order,
		} as any);

		const response = await request(app).post(route).send().set({ Authorization: authToken });

		expect(response.status).toBe(200);
		expect(response.body).toEqual({
			order,
		});

		expect(usecase.execute).toBeCalledTimes(1);
		expect(usecase.execute).toBeCalledWith({
			page,
			pageSize,
		});
	});
});
