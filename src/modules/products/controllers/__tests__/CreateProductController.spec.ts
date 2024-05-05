import request from 'supertest';
import { v4 as uuid } from 'uuid';

import { find } from '../../../../core/DependencyInjection';
import { app } from '../../../../server/app';
import { TestUtils } from '../../../../utils/TestUtils';
import { Product } from '../../entities/Product';
import { CreateProductUseCase, CreateProductUseCaseInput } from '../../usecases/CreateProductUseCase';

let authToken: string;
const userId = '-1';
const route = '/product';

beforeAll(async () => {
	authToken = await TestUtils.generateAuthToken(userId);
});

describe('Schema validation', () => {
	it('should require auth token', async () => {
		const response = await request(app).post(route).send();

		expect(response.status).toBe(416);
	});

	it('should require necessary parameters', async () => {
		const response = await request(app).post(route).send().set({
			Authorization: authToken,
		});

		expect(response.status).toBe(400);

		expect(response.body).toHaveProperty('name');
		expect(response.body).toHaveProperty('description');
		expect(response.body).toHaveProperty('price');
		expect(response.body).not.toHaveProperty('imageUrl');
	});
});

describe('Return 201', () => {
	const usecase = find(CreateProductUseCase);
	const sampleProductDTO: CreateProductUseCaseInput = {
		description: 'description',
		name: 'name',
		price: 10,
		imageUrl: 'http://image.com/image.png',
		userId: uuid(),
	};

	it('should call usecase', async () => {
		const product = { id: uuid() } as Product;
		jest.spyOn(usecase, 'execute').mockResolvedValue(product);

		const response = await request(app).post(route).send({
			...sampleProductDTO,
		}).set({
			Authorization: authToken,
		});

		expect(response.status).toBe(201);
		expect(response.body).toEqual(product);

		expect(usecase.execute).toBeCalledTimes(1);
		expect(usecase.execute).toBeCalledWith({
			...sampleProductDTO,
			userId: expect.any(String),
		});
	});
});
