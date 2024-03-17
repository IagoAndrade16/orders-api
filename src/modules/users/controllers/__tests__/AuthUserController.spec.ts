import request from 'supertest';

import { find } from '../../../../core/DependencyInjection';
import { app } from '../../../../server/app';
import { AuthUserUseCase } from '../../usecases/AuthUserUseCase';

const route = '/users/auth';

describe('Schema validation', () => {
	it('should return 401 if no header is provided', async () => {
		const response = await request(app).get(route);

		expect(response.status).toBe(401);
	});

	it('should return 401 if header has no username:password value', async () => {
		const response = await request(app).get(route).set({
			Authorization: 'Basic',
		});

		expect(response.status).toBe(401);
	});

	it('should return 401 if header has no username value', async () => {
		const response = await request(app).get(route).set({
			Authorization: `Basic ${Buffer.from(':password').toString('base64')}`,
		});

		expect(response.status).toBe(401);
	});
});

describe('Features', () => {
	it('should return auth use case res if succeded', async () => {
		const authUserUseCase = find(AuthUserUseCase);
		const authUserUseCaseRes = {} as any;
		jest.spyOn(authUserUseCase, 'execute').mockResolvedValueOnce(authUserUseCaseRes);

		const response = await request(app).get(route).set({
			Authorization: `Basic ${Buffer.from('username:password').toString('base64')}`,
		}).send();

		expect(authUserUseCase.execute).toBeCalledTimes(1);
		expect(authUserUseCase.execute).toBeCalledWith({
			email: 'username',
			password: 'password',
		});

		expect(response.status).toBe(200);
		expect(response.body.status).toEqual('OK');
		expect(response.body).toHaveProperty('result');
	});
});
