import request from 'supertest';
import { v4 as uuid } from 'uuid';

import { find } from '../../../../core/DependencyInjection';
import { app } from '../../../../server/app';
import { TestUtils } from '../../../../utils/TestUtils';
import { Product } from '../../entities/Product';
import { FetchProductsUseCase } from '../../usecases/FetchProductsUseCase';
import { UpdateProductUseCase, UpdateProductUseCaseInput } from '../../usecases/UpdateProductUseCase';

let authToken: string;
const userId = -1;
const page = 1;
const pageSize = 10;
const route = `/product?page=${page}&pageSize=${pageSize}`;

const usecase = find(FetchProductsUseCase);

beforeAll(async () => {
	authToken = await TestUtils.generateAuthToken(userId);
});

describe('Return 200', () => {
	it('should call usecase', async () => {
		const product = { id: uuid() } as Product;
		jest.spyOn(usecase, 'execute').mockResolvedValue({
			products: [product],
		});

		const response = await request(app).get(route).send();

		expect(response.status).toBe(200);
		expect(response.body).toEqual({
			products: [product],
		});

		expect(usecase.execute).toBeCalledTimes(1);
		expect(usecase.execute).toBeCalledWith({
			page,
			pageSize,
		});
	});
});
