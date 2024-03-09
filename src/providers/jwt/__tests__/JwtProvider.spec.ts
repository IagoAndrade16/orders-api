import { decode } from 'jsonwebtoken';

import { find } from '../../../core/DependencyInjection';
import { Environment } from '../../../core/Environment';
import { JwtProvider, jwtProviderAlias } from '../JwtProvider';

describe('JwtProvider', () => {
	it('should return token with correct expiration', async () => {
		const jwtProvider = find<JwtProvider>(jwtProviderAlias);

		const jwtRes = await jwtProvider.generate({
			subject: 'test',
			data: {
				foo: 'bar',
			},
		});

		const tokenExpTimeInSecs = 60 * Environment.vars.JWT_EXP_IN_MINUTES;
		const dateNowInSecs = Math.floor(new Date().getTime() / 1000);
		const tokenExactCorrectExp = dateNowInSecs + tokenExpTimeInSecs;

		const { exp: generatedTokenExp, sub } = decode(jwtRes.token) as { exp: number, sub: string };
		expect(Math.abs(generatedTokenExp - tokenExactCorrectExp)).toBeLessThanOrEqual(10);
		expect(Math.abs(jwtRes.expInSecs - tokenExactCorrectExp)).toBeLessThanOrEqual(10);
		expect(sub).toEqual('test');

		const { foo } = decode(jwtRes.token) as { foo: string };
		expect(foo).toEqual('bar');
	});
});
