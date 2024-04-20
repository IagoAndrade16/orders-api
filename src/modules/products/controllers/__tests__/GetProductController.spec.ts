import request from 'supertest';
import { v4 as uuid } from 'uuid';

import { find } from '../../../../core/DependencyInjection';
import { app } from '../../../../server/app';
import { TestUtils } from '../../../../utils/TestUtils';
import { Product } from '../../entities/Product';
import { GetProductUseCase, GetProductUseCaseInput } from '../../usecases/GetProductUseCase';

let authToken: string;
const userId = -1;
const route = '/product/:id';

const usecase = find(GetProductUseCase);

beforeAll(async () => {
	authToken = await TestUtils.generateAuthToken(userId);
});

describe('Schema validation', () => {
	it('should not require parameters', async () => {
		const response = await request(app).get(route.replace(':id', '-1')).send().set({
			Authorization: authToken,
		});

		expect(response.body).not.toHaveProperty('id');
	});
});

it('should call usecase', async () => {
	const product: Product = {
		id: '1',
		name: 'Sample Product',
		description: 'Sample Description',
		price: 10.99,
		imageUrl: 'http://sample-image.com/image.png',
		userId: 'sample-user-id',
	} as Product;

	jest.spyOn(usecase, 'execute').mockResolvedValue({ product });

	const response = await request(app)
		.get(route.replace(':id', '1'))
		.set({
			Authorization: authToken,
		});

	expect(response.status).toBe(200);
	expect(response.body.product).toEqual(product);

	expect(usecase.execute).toBeCalledTimes(1);
	expect(usecase.execute).toBeCalledWith({ id: '1' });
});
