import request from 'supertest';
import { v4 as uuid } from 'uuid';

import { find } from '../../../../core/DependencyInjection';
import { app } from '../../../../server/app';
import { TestUtils } from '../../../../utils/TestUtils';
import { Product } from '../../entities/Product';
import { UpdateProductUseCase, UpdateProductUseCaseInput } from '../../usecases/UpdateProductUseCase';

let authToken: string;
const userId = -1;
const route = '/product/:id';

const usecase = find(UpdateProductUseCase);
const sampleProductDTO: UpdateProductUseCaseInput = {
	productId: uuid(),
	description: 'description',
	name: 'name',
	price: 10,
	imageUrl: 'http://image.com/image.png',
	userId: userId.toString(),
};

beforeAll(async () => {
	authToken = await TestUtils.generateAuthToken(userId);
});

describe('Schema validation', () => {
	it('should require auth token', async () => {
		const response = await request(app).patch(route.replace(':id', '1')).send();

		expect(response.status).toBe(416);
	});

	it('should not require parameters', async () => {
		jest.spyOn(usecase, 'execute').mockResolvedValue();

		const response = await request(app).patch(route.replace(':id', '-1')).send().set({
			Authorization: authToken,
		});

		expect(response.body).not.toHaveProperty('name');
		expect(response.body).not.toHaveProperty('description');
		expect(response.body).not.toHaveProperty('price');
		expect(response.body).not.toHaveProperty('imageUrl');
	});
});

describe('Return 201', () => {
	it('should call usecase', async () => {
		const product = { id: uuid() } as Product;
		jest.spyOn(usecase, 'execute').mockResolvedValue();

		const response = await request(app).patch(route.replace(':id', sampleProductDTO.productId)).send({
			...sampleProductDTO,
		}).set({
			Authorization: authToken,
		});

		expect(response.status).toBe(204);

		expect(usecase.execute).toBeCalledTimes(1);
		expect(usecase.execute).toBeCalledWith({
			...sampleProductDTO,
		});
	});
});
