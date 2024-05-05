import request from 'supertest';
import { v4 as uuid } from 'uuid';

import { find } from '../../../../core/DependencyInjection';
import { app } from '../../../../server/app';
import { TestUtils } from '../../../../utils/TestUtils';
import { Product } from '../../entities/Product';
import { FetchProductsUseCase } from '../../usecases/FetchProductsUseCase';

let authToken: string;
const userId = '-1';
const page = 1;
const pageSize = 10;
const route = `/product/list?page=${page}&pageSize=${pageSize}`;

const usecase = find(FetchProductsUseCase);

beforeAll(async () => {
	authToken = await TestUtils.generateAuthToken(userId);
});

describe('Return 200', () => {
	it('should call usecase', async () => {
		const product = { id: uuid() } as Product;
		jest.spyOn(usecase, 'execute').mockResolvedValue({
			products: [product],
			quantity: 1,
		});

		const response = await request(app).post(route).send();

		expect(response.status).toBe(200);
		expect(response.body).toEqual({
			products: [product],
			quantity: 1,
		});

		expect(usecase.execute).toBeCalledTimes(1);
		expect(usecase.execute).toBeCalledWith({
			page,
			pageSize,
			name: undefined,
		});
	});
});
