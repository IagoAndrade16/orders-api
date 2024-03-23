import request from 'supertest';
import { v4 as uuid } from 'uuid';

import { find } from '../../../../core/DependencyInjection';
import { app } from '../../../../server/app';
import { TestUtils } from '../../../../utils/TestUtils';
import { Product } from '../../entities/Product';
import { DeleteProductUseCase, DeleteProductUseCaseInput } from '../../usecases/DeleteProductUseCase';

let authToken: string;
const userId = -1;
const route = '/product/:id';

beforeAll(async () => {
	authToken = await TestUtils.generateAuthToken(userId);
});

describe('Schema validation', () => {
	it('should require auth token', async () => {
		const response = await request(app).delete(route.replace(':id', 'product-id')).send();

		expect(response.status).toBe(416);
	});
});

describe('Return 201', () => {
	const usecase = find(DeleteProductUseCase);

	it('should call usecase', async () => {
		jest.spyOn(usecase, 'execute').mockResolvedValue();

		const response = await request(app).delete(route.replace(':id', 'product-id')).send().set({
			Authorization: authToken,
		});

		expect(response.status).toBe(204);

		expect(usecase.execute).toBeCalledTimes(1);
		expect(usecase.execute).toBeCalledWith({
			productId: 'product-id',
			userId: expect.any(String),
		});
	});
});
