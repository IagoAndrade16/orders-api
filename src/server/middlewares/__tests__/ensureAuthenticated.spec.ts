import { Request, Response } from 'express';

import { find } from '../../../core/DependencyInjection';
import { JwtProvider, jwtProviderAlias } from '../../../providers/jwt/JwtProvider';
import { DomainError } from '../../errors/DomainError';
import * as myModule from '../ensureAuthenticated';

const jwtProvider = find<JwtProvider>(jwtProviderAlias);

describe('_ensureAuthenticated', () => {
	it('should throw 416 if no token is provided', async () => {
		const req = {
			headers: {
				authorization: '',
			},
		};
		const res = {};
		const next = jest.fn();

		await expect(
			myModule._ensureAuthenticated(req as Request, res as Response, next),
		).rejects.toMatchObject(new DomainError(416, 'Unauthorized'));
	});

	it('should throw 416 if token is invalid', async () => {
		const req = {
			headers: {
				authorization: 'Bearer 123',
			},
		};
		const res = {};
		const next = jest.fn();

		jest.spyOn(jwtProvider, 'verify').mockResolvedValue(null);

		await expect(
			myModule._ensureAuthenticated(req as Request, res as Response, next),
		).rejects.toMatchObject(new DomainError(416, 'Unauthorized'));

		expect(jwtProvider.verify).toBeCalledWith('123');
	});
});
