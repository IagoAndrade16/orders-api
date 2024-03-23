import { Request, Response, NextFunction } from 'express';

import { find } from '../../core/DependencyInjection';
import { JwtProvider, jwtProviderAlias } from '../../providers/jwt/JwtProvider';
import { DomainError } from '../errors/DomainError';

export async function _ensureAuthenticated(req: Request, _res: Response, next: NextFunction): Promise<void> {
	const token = (req.headers.authorization ?? '').split(' ')[1] ?? '';
	if (!token) throw new DomainError(416, 'Unauthorized');

	const jwtProvider = find<JwtProvider>(jwtProviderAlias);
	const payload = await jwtProvider.verify(token);
	if (!payload) throw new DomainError(416, 'Unauthorized');

	const { sub } = payload as { sub: string };

	req.user = {
		id: sub,
	};

	return next();
}
