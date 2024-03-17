import request from 'supertest';

import { find } from '../../../../core/DependencyInjection';
import { app } from '../../../../server/app';
import { CreateUserUseCase, CreateUserUseCaseInput } from '../../usecases/CreateUserUseCase';

const route = '/users';

describe('Schema validation', () => {
	it('should require necessary parameters', async () => {
		const response = await request(app).post(route).send();

		expect(response.status).toBe(400);

		expect(response.body).toHaveProperty('name');
		expect(response.body).toHaveProperty('password');
		expect(response.body).toHaveProperty('email');
	});

	describe('email', () => {
		it('should retun 400 if email is invalid', async () => {
			const response = await request(app).post(route).send({
				email: {},
			});

			expect(response.status).toBe(400);
			expect(response.body).toHaveProperty('email');
		});
	});
});

describe('Return 201', () => {
	const usecase = find(CreateUserUseCase);
	const sampleUserDTO: CreateUserUseCaseInput = {
		email: 'email@email.com',
		name: 'name',
		password: '12345678',
	};

	it('should call usecase', async () => {
		jest.spyOn(usecase, 'execute').mockResolvedValue();

		const response = await request(app).post(route).send(sampleUserDTO);

		expect(response.status).toBe(201);

		expect(usecase.execute).toBeCalledTimes(1);
		expect(usecase.execute).toBeCalledWith(sampleUserDTO);
	});
});
